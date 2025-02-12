import ICardSet from '../interfaces/ICardSet';

export const analogBrainCards: ICardSet = {
  title: 'Analog Brain', // also used as id
  cards: [
    {
      id: '0-1',
      title: 'Do you know what you want?',
      items: [
        { text: 'Yes', nextCardId: '0-2' },
        { text: 'No', nextCardId: '0-3' },
      ],
    },
    {
      id: '0-2',
      title: 'What do you want to do? ',
      items: [
        { text: 'I’m bored and I want to do something', nextCardId: '2-1' },
        { text: 'I’m having emotions and need to deal with them', nextCardId: '1-1' },
        { text: 'I am procrastinating and want to stop', nextCardId: '1-12' },
        { text: 'I am in pain', nextCardId: '5-1' },
        { text: 'I want to sleep', nextCardId: '5-12' },
        { text: 'I want to clean', nextCardId: '4-2' },
        { text: 'I want to eat', nextCardId: '4-7' },
      ],
    },
    {
      id: '0-3',
      title: 'How are you feeling?',
      items: [
        /*...*/
      ],
    },
  ],
};

export const analogBrainCardsFrench: ICardSet = {
  title: 'Analog Brain (Français)',
  cards: [
    {
      id: '0-1',
      title: 'Est-ce que vous savez ce que vous voulez ?',
      items: [
        { text: 'Oui', nextCardId: '0-2' },
        { text: 'Non', nextCardId: '0-3' },
      ],
    },
  ],
};

// The first one will be the default set
export const availableSets: ICardSet[] = [analogBrainCards, analogBrainCardsFrench];
