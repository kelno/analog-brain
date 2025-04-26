import { ICard } from "../Card";
import IDeck from "./IDeck";

export const DeckUtils = {
  findCard: (deck: IDeck, cardId: string): ICard | undefined => {
      return deck.cards.find(card => card.id === cardId);
  },

  isEmpty: (deck: IDeck): boolean => {
      return deck.cards.length === 0;
  },
};

