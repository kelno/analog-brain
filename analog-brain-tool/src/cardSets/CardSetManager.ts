import { ICardSet, SetId } from '../interfaces/ICardSet';
import { LangId } from '../store/BrainContextData';
import { BrainToolError, BrainToolErrorType } from '../components/BrainTool/BrainToolErrorHandler';
import { DataValidator } from '../utils/DataValidation/DataValidator';

export class CardSetManager {
  private _processedSets: Record<LangId, ICardSet[]> = {};
  private _updateId: string = "";
  private _loadedUrl: string = "";

  private fetchCardSets = async (indexUrl: string): Promise<ICardSet[]> => {
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

    const indexData = await response.json();
    const cardSets: ICardSet[] = [];

    // Get the base URL from the index file location
    const baseUrl = indexUrl.substring(0, indexUrl.lastIndexOf('/') + 1);

    for (const fileName of indexData.files) {
      try {
        const response = await fetch(`${baseUrl}${fileName}`, { cache: 'no-store' });
        if (!response.ok) {
          throw new BrainToolError(
            `CardSetManager: Failed to fetch card set ${fileName}`,
            BrainToolErrorType.FAILED_TO_FETCH_SET,
          );
        }
        const cardSet = (await response.json()) as ICardSet;

        cardSets.push(cardSet);
      } catch (error) {
        // TODO: Can't print an error this way
        console.error(`CardSetManager: Error fetching card set ${fileName}: ${error}`);
      }
    }
    return cardSets;
  }

  // return lastUpdateId
  public async loadCardSets(indexUrl: string) {
    const fetchedSets = await this.fetchCardSets(indexUrl);
    
    this._processedSets = fetchedSets.reduce((acc, set) => {
      const result = DataValidator.validateCardSet(set);
      if (!result.isValid) {  
        console.error(`Invalid card set in database: ${set.title} (id: ${set.id}). Error: ${result.errorMessage}`); 
        return acc; 
      }

      if (!acc[set.lang]) acc[set.lang] = [];
      if (set.isDefaultForLanguage) acc[set.lang].unshift(set);
      else acc[set.lang].push(set);

      return acc;
    }, {} as Record<LangId, ICardSet[]>);

    this._updateId = crypto.randomUUID();
    this._loadedUrl = indexUrl;
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

  // empty string if never loaded
  public get lastUpdateId() {
    return this._updateId;
  }

  // empty string if never loaded
  public get loadedUrl() {
    return this._loadedUrl;
  }
}
