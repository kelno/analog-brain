import { ICardSet, SetId } from '../interfaces/ICardSet';
import { LangId } from '../store/BrainContextData';
import { BrainToolError, BrainToolErrorType } from '../components/BrainTool/BrainToolErrorHandler';
import { DataValidator } from '../utils/DataValidation/DataValidator';

interface FetchResult {
  cardSets: ICardSet[];
  errors: string[];
}

export class CardSetManager {
  private _processedSets: Record<LangId, ICardSet[]> = {};
  private _updateId: string = "";
  private _loadedUrl: string = "";
  private _errors: string[] = []; // loading errors

  private fetchCardSets = async (indexUrl: string): Promise<FetchResult> => {
    console.debug(`CardSetManager: Fetching card sets from ${indexUrl}`);
    const response = await fetch(indexUrl, { cache: 'no-store' });
    if (!response.ok) {
      console.error(`CardSetManager: Failed to fetch index file from url ${indexUrl}`)
      console.error(response);
      throw new BrainToolError(
        `CardSetManager: Failed to fetch index file (error ${response.status}:${response.statusText}) from ${indexUrl}`,
        BrainToolErrorType.FAILED_TO_FETCH_INDEX,
      );
    }

    let indexLoadError: BrainToolError|undefined =  undefined;
    const indexData = await response.json().catch(er => {  
      const error = `Failed to decode index json: ${er.message}`;
      console.error(error);
      indexLoadError = new BrainToolError(
        error,
        BrainToolErrorType.FAILED_TO_FETCH_INDEX,
      ); 
    });
    if (indexLoadError)
      throw indexLoadError;

    const cardSets: ICardSet[] = [];
    let errors = [];

    // Get the base URL from the index file location
    const baseUrl = indexUrl.substring(0, indexUrl.lastIndexOf('/') + 1);

    for (const fileName of indexData.files) {
      try {
        const URL = `${baseUrl}${fileName}`;
        const response = await fetch(`${URL}`, { cache: 'no-store' });
        if (!response.ok) {
          throw new BrainToolError(
            `CardSetManager: Failed to fetch card set ${fileName}`,
            BrainToolErrorType.FAILED_TO_FETCH_SET,
          );
        }
        const cardSet = (await response.json()) as ICardSet;
        const result = DataValidator.validateCardSetJSON(cardSet);
        if (!result.isValid) {  
          const errorMsg = `Invalid card set JSON schema: ${URL}. Error: ${result.errorMessage}`;
          console.error(errorMsg); 
          errors.push(errorMsg);
          continue;
        }

        cardSets.push(cardSet);
      } catch (error) {
        // TODO: Can't print an error this way
        const errorMsg = `CardSetManager: Error fetching card set ${fileName}: ${error}`;
        console.error(errorMsg);
        errors.push(errorMsg);
      }
    }
    return { cardSets: cardSets, errors: errors };
  }

  // return lastUpdateId
  public async loadCardSets(indexUrl: string) {
    // clear state
    this._errors = [];
    this._updateId = crypto.randomUUID();
    this._loadedUrl = indexUrl;

    const { cardSets: fetchedSets, errors } = await this.fetchCardSets(indexUrl);
    
    this._processedSets = fetchedSets.reduce((acc, set) => {
      const result = DataValidator.validateCardSetData(set);
      if (!result.isValid) {  
        console.error(`Invalid card set in database: ${set.title} (id: ${set.id}). Error: ${result.errorMessage}`); 
        return acc; 
      }

      if (!acc[set.lang]) acc[set.lang] = [];
      if (set.isDefaultForLanguage) acc[set.lang].unshift(set);
      else acc[set.lang].push(set);

      return acc;
    }, {} as Record<LangId, ICardSet[]>);

    this._errors = errors;
    return this._updateId;
  }

  public getAvailableSets(lang: LangId): Readonly<ICardSet[]> | undefined {
    return this._processedSets[lang];
  }

  public getSetById(lang: LangId, id: SetId): ICardSet | undefined {
    return this._processedSets[lang]?.find((set) => set.id === id);
  }

  public getDefaultSetForLanguage(lang: LangId): ICardSet | undefined {
    return this._processedSets[lang]?.[0];
  }

  public getAvailableSetsPerLanguage(): Readonly<Record<LangId, ICardSet[]>> {
     return this._processedSets;
  }

  // empty string if never loaded. Refreshed every time loadCardSets is called (even if error occurs).
  public get lastUpdateId() {
    return this._updateId;
  }

  // Url of last triggered loading. 
  // empty string if never loaded
  // Updated on failure as well.
  public get loadedUrl() {
    return this._loadedUrl;
  }

  // Array of errors during last load. Empty if no error. 
  public get errors() {
    return this._errors;
  }
}
