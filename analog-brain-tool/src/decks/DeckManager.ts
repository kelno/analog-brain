import { IDeck, DeckId } from '../types/Deck/IDeck';
import { LangId } from '../components/BrainTool/store/BrainContextData';
import { BrainToolError, BrainToolErrorType } from '../components/BrainTool/BrainToolErrorHandler';
import { DataValidator } from '../dataValidation/DataValidator';
import stripJsonComments from 'strip-json-comments';

interface FetchResult {
  decks: IDeck[];
  errors: string[];
}

class DecksLoadingState {
  constructor(loadingUrl: string, promise: Promise<FetchResult>) {
    this.loadingUrl = loadingUrl;
    this.promise = promise;
    this.updateId = crypto.randomUUID();
  };

  public updateId: string;
  public loadingUrl: string;
  public promise: Promise<FetchResult>;
}

export class DeckManager {
  private _processedDecks: Record<LangId, IDeck[]> = {};
  private _updateId: string = "";
  private _loadedUrl: string = "";
  private _errors: string[] = []; // loading errors
  private _pendingLoadState: DecksLoadingState | undefined = undefined; // exists only while loading

  private fetchAndParseJSONC = async (url: string, errorType: BrainToolErrorType ) : Promise<any> => {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      throw new BrainToolError(
        `DeckManager: Failed to fetch json file (error ${response.status}:${response.statusText}) from ${url}`,
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

  private fetchDecks = async (indexUrl: string, dataValidator: DataValidator): Promise<FetchResult> => {
    console.debug(`DeckManager: Fetching decks from ${indexUrl}`);

    const indexData = await this.fetchAndParseJSONC(indexUrl, BrainToolErrorType.FAILED_TO_FETCH_INDEX);
   
    const decks: IDeck[] = [];
    let errors = [];

    const getFileUrl = (fileName: string) => {
      // Get the base URL from the index file location
      const baseUrl = indexUrl.substring(0, indexUrl.lastIndexOf('/') + 1);
      return `${baseUrl}${fileName}`;
    }
    
    for (const fileName of indexData.files) {
      try {
        const deck = await this.fetchAndParseJSONC(getFileUrl(fileName), BrainToolErrorType.FAILED_TO_FETCH_DECK) as IDeck;
       
        const result = dataValidator.validateDeckJSON(deck);
        if (!result.isValid) {  
          const errorMsg = `Invalid card deck JSON schema: ${URL}. Error: ${JSON.stringify(result.errorMessages)}`;
          console.error(errorMsg); 
          errors.push(errorMsg);
          continue;
        }

        decks.push(deck);
      } catch (error) {
        // TODO: Can't print an error this way
        const errorMsg = `DeckManager: Error fetching card deck ${fileName}: ${error}`;
        console.error(errorMsg);
        errors.push(errorMsg);
      }
    }
    return { decks: decks, errors: errors };
  }

  // return lastUpdateId, an id unique refreshed everytime loadDecks finishes loading.
  public async loadDecks(indexUrl: string, dataValidator: DataValidator) {
    console.debug(`loadDecks triggered with index ${indexUrl}`);

    // are already loading this?
    if (this._pendingLoadState?.loadingUrl == indexUrl) {
      await this._pendingLoadState.promise;
      return this._pendingLoadState.updateId;
    }

    // else, start loading it
    const promise = this.fetchDecks(indexUrl, dataValidator);
    this._pendingLoadState = new DecksLoadingState(indexUrl, promise);
    const { decks: fetchedDecks, errors } = await promise;
    
    this._processedDecks = fetchedDecks.reduce((acc, deck) => {
      const result = dataValidator.validateDeckData(deck);
      if (!result.isValid) {  
        console.error(`Invalid card deck in database: ${deck.title} (id: ${deck.id}). Errors:`); 
        console.error(result.errorMessages);
        return acc; 
      }

      if (!acc[deck.lang]) acc[deck.lang] = [];
      if (deck.isDefaultForLanguage) acc[deck.lang].unshift(deck);
      else acc[deck.lang].push(deck);

      return acc;
    }, {} as Record<LangId, IDeck[]>);

    this._loadedUrl = indexUrl;
    this._errors = errors;
    this._updateId = this._pendingLoadState.updateId;
    this._pendingLoadState = undefined;
    return this._updateId;
  }

  public getAvailableDecks(lang: LangId): Readonly<IDeck[]> | undefined {
    return this._processedDecks[lang];
  }

  public getDeckById(lang: LangId, id: DeckId): IDeck | undefined {
    return this._processedDecks[lang]?.find((deck) => deck.id === id);
  }

  public getDefaultDeckForLanguage(lang: LangId): IDeck | undefined {
    return this._processedDecks[lang]?.[0];
  }

  public getAvailableSetsPerLanguage(): Readonly<Record<LangId, IDeck[]>> {
     return this._processedDecks;
  }

  // empty string if never loaded. Refreshed every time loadDecks finishes loading succesfully. 
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
