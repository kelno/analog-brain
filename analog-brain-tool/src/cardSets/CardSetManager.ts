import { ICardSet, SetId } from '../interfaces/ICardSet';
import { LangId } from '../components/BrainTool/store/BrainContextData';
import { BrainToolError, BrainToolErrorType } from '../components/BrainTool/BrainToolErrorHandler';
import { DataValidator } from '../dataValidation/DataValidator';
import stripJsonComments from 'strip-json-comments';

interface FetchResult {
  cardSets: ICardSet[];
  errors: string[];
}

class CardSetsLoadingState {
  constructor(loadingUrl: string, promise: Promise<FetchResult>) {
    this.loadingUrl = loadingUrl;
    this.promise = promise;
    this.updateId = crypto.randomUUID();
  };

  public updateId: string;
  public loadingUrl: string;
  public promise: Promise<FetchResult>;
}

export class CardSetManager {
  private _processedSets: Record<LangId, ICardSet[]> = {};
  private _updateId: string = "";
  private _loadedUrl: string = "";
  private _errors: string[] = []; // loading errors
  private _pendingLoadState: CardSetsLoadingState | undefined = undefined; // exists only while loading

  private fetchAndParseJSONC = async (url: string, errorType: BrainToolErrorType ) : Promise<any> => {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      throw new BrainToolError(
        `CardSetManager: Failed to fetch json file (error ${response.status}:${response.statusText}) from ${url}`,
        errorType,
      );
    }
    
    return await response.text()
    .then(text => {
      try {
        return JSON.parse(stripJsonComments(text));
      } catch (parseError) {
        throw new Error(
          `JSON parse error: ${
            parseError instanceof Error 
              ? parseError.message 
              : 'Unknown parsing error'
          }`
        );
      }
    })
    .catch((error: unknown) => {
      throw new BrainToolError(
        error instanceof Error
          ? error.message
          : 'Unknown error',
          errorType,
      );
    });
  }

  private fetchCardSets = async (indexUrl: string, dataValidator: DataValidator): Promise<FetchResult> => {
    console.debug(`CardSetManager: Fetching card sets from ${indexUrl}`);

    const indexData = await this.fetchAndParseJSONC(indexUrl, BrainToolErrorType.FAILED_TO_FETCH_INDEX);
   
    const cardSets: ICardSet[] = [];
    let errors = [];

    const getFileUrl = (fileName: string) => {
      // Get the base URL from the index file location
      const baseUrl = indexUrl.substring(0, indexUrl.lastIndexOf('/') + 1);
      return `${baseUrl}${fileName}`;
    }
    
    for (const fileName of indexData.files) {
      try {
        const cardSet = await this.fetchAndParseJSONC(getFileUrl(fileName), BrainToolErrorType.FAILED_TO_FETCH_SET) as ICardSet;
       
        const result = dataValidator.validateCardSetJSON(cardSet);
        if (!result.isValid) {  
          const errorMsg = `Invalid card set JSON schema: ${URL}. Error: ${JSON.stringify(result.errorMessages)}`;
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

  // return lastUpdateId, an id unique refreshed everytime loadCardSets finishes loading.
  public async loadCardSets(indexUrl: string, dataValidator: DataValidator) {
    console.debug(`loadCardSets triggered with index ${indexUrl}`);

    // are already loading this?
    if (this._pendingLoadState?.loadingUrl == indexUrl) {
      await this._pendingLoadState.promise;
      return this._pendingLoadState.updateId;
    }

    // else, start loading it
    const promise = this.fetchCardSets(indexUrl, dataValidator);
    this._pendingLoadState = new CardSetsLoadingState(indexUrl, promise);
    const { cardSets: fetchedSets, errors } = await promise;
    
    this._processedSets = fetchedSets.reduce((acc, set) => {
      const result = dataValidator.validateCardSetData(set);
      if (!result.isValid) {  
        console.error(`Invalid card set in database: ${set.title} (id: ${set.id}). Errors:`); 
        console.error(result.errorMessages);
        return acc; 
      }

      if (!acc[set.lang]) acc[set.lang] = [];
      if (set.isDefaultForLanguage) acc[set.lang].unshift(set);
      else acc[set.lang].push(set);

      return acc;
    }, {} as Record<LangId, ICardSet[]>);

    this._loadedUrl = indexUrl;
    this._errors = errors;
    this._updateId = this._pendingLoadState.updateId;
    this._pendingLoadState = undefined;
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

  // empty string if never loaded. Refreshed every time loadCardSets finishes loading succesfully. 
  public get lastUpdateId() {
    return this._updateId;
  }

  // Url of last triggered loading, updated on success
  // empty string if never loaded
  public get loadedUrl() {
    return this._loadedUrl;
  }

  // Array of errors during last load. Empty if no error. 
  public get errors() {
    return this._errors;
  }
}
