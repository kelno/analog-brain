import ICardSet from '../../interfaces/ICardSet';

const analogBrainCardsFrench: ICardSet = {
  id: 'ludo_fr',
  title: 'Ludo',
  lang: 'fr',
  isDefaultForLanguage: true,
  cards: [
    {
      id: '0-1',
      title: "Qu'est-ce qu'il se passe ?",
      items: [
        { text: 'Inconfort sensoriel', nextCardId: '1-1' },
        { text: 'Tensions et douleurs', nextCardId: '1-3' },
        { text: 'Dans la tête (moral/humeur)', nextCardId: '1-2' },
        { text: "Je m'ennuie (à mourir)", nextCardId: '1-4' },
      ],
    },
    {
      id: '1-1',
      title: 'Inconfort sensoriel',
      items: [
        { text: "J'ai froid", nextCardId: '2-1' },
        { text: "J'ai chaud", nextCardId: '2-11' },
        { text: "J'ai faim", nextCardId: '2-2' },
        { text: "J'ai soif", nextCardId: '2-12' },
        { text: "J'ai envie d'aller aux wc", nextCardId: '2-3' },
        { text: "J'ai mal quelque part", nextCardId: '2-4' },
        { text: 'Je me sens fatigué', nextCardId: '2-5' },
        { text: 'Je me sens sale', nextCardId: '2-6' },
        { text: 'Ca me gratte', nextCardId: '2-7' },
        { text: 'Je sens une odeur', nextCardId: '2-8' },
        { text: 'Le bruit me dérange', nextCardId: '2-9' },
        { text: 'Hyperventilation', nextCardId: '2-10' },
      ],
    },
    {
      id: '1-2',
      title: 'Dans la tête (moral/humeur)',
      items: [
        { text: 'Irritabilité facile / Tout me soule', nextCardId: '' },
        { text: 'Pensées négatives/sombres qui bouclent', nextCardId: '' },
        { text: 'Pensées anxieuses qui bouclent', nextCardId: '' },
        { text: 'Envie de taper/casser', nextCardId: '' },
        { text: 'Sensation de trop plein dans la tête', nextCardId: '' },
        { text: 'Je me sens vide/vidé.e', nextCardId: '' },
        { text: 'Je sens plus mon corps', nextCardId: '' },
        { text: 'Je me sens épuisé.e', nextCardId: '' },
      ],
    },
    {
      id: '1-3',
      title: 'Tensions et douleurs',
      items: [
        { text: 'Tension dans les épaules/le cou', nextCardId: '' },
        { text: 'Mal aux yeux / yeux gonflés', nextCardId: '' },
        { text: 'Mal de tête', nextCardId: '' },
        { text: 'Tension dans la colonne vertébrale', nextCardId: '' },
        { text: 'Mal au ventre', nextCardId: '' },
        { text: 'Ventre qui gonfle', nextCardId: '' },
      ],
    },
    {
      id: '1-4',
      title: "Je m'ennuie à mourir",
      items: [{ text: '', nextCardId: '' }],
    },
    {
      id: '2-1',
      title: "J'ai chaud/froid ?",
      items: [
        { text: '- Je prends un/des vêtements', nextCardId: 'end' },
        { text: '- Je prends une couverture', nextCardId: 'end' },
        { text: '- Je règle le chauffage', nextCardId: 'end' },
      ],
    },
    {
      id: '2-2',
      title: "J'ai faim/soif",
      items: [],
    },
    {
      id: '2-3',
      title: "J'ai envie d'aller aux wc ?",
      items: [],
    },
    {
      id: '2-4',
      title: "J'ai mal quelque part",
      items: [],
    },
    {
      id: '2-5',
      title: "J'ai sommeil",
      items: [],
    },
    {
      id: '2-6',
      title: 'Je me sens sale',
      items: [],
    },
    {
      id: 'end',
      title: 'Bravo !',
      items: [{ text: '( ˶ˆᗜˆ˵ ) ' }],
    },
  ],
};

export default analogBrainCardsFrench;
