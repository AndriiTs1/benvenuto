export type Lettera = {
  lettera: string;
  nome: string;
  esempio: string;
  straniera: boolean;
  nota?: string;
};

export const ALFABETO: Lettera[] = [
  { lettera: "A", nome: "a", esempio: "amico", straniera: false },
  { lettera: "B", nome: "bi", esempio: "bambino", straniera: false },
  { lettera: "C", nome: "ci", esempio: "casa", straniera: false },
  { lettera: "D", nome: "di", esempio: "donna", straniera: false },
  { lettera: "E", nome: "e", esempio: "euro", straniera: false },
  { lettera: "F", nome: "effe", esempio: "famiglia", straniera: false },
  { lettera: "G", nome: "gi", esempio: "gatto", straniera: false },
  { lettera: "H", nome: "acca", esempio: "hotel", straniera: false, nota: "Non si pronuncia" },
  { lettera: "I", nome: "i", esempio: "isola", straniera: false },
  { lettera: "L", nome: "elle", esempio: "libro", straniera: false },
  { lettera: "M", nome: "emme", esempio: "mamma", straniera: false },
  { lettera: "N", nome: "enne", esempio: "notte", straniera: false },
  { lettera: "O", nome: "o", esempio: "occhio", straniera: false },
  { lettera: "P", nome: "pi", esempio: "pane", straniera: false },
  { lettera: "Q", nome: "cu", esempio: "quattro", straniera: false, nota: "Quasi sempre seguita da U" },
  { lettera: "R", nome: "erre", esempio: "Roma", straniera: false },
  { lettera: "S", nome: "esse", esempio: "sole", straniera: false },
  { lettera: "T", nome: "ti", esempio: "treno", straniera: false },
  { lettera: "U", nome: "u", esempio: "uva", straniera: false },
  { lettera: "V", nome: "vu", esempio: "vino", straniera: false },
  { lettera: "Z", nome: "zeta", esempio: "zucchero", straniera: false },
  { lettera: "J", nome: "i lunga", esempio: "jeans", straniera: true },
  { lettera: "K", nome: "cappa", esempio: "kiwi", straniera: true },
  { lettera: "W", nome: "doppia vu", esempio: "web", straniera: true },
  { lettera: "X", nome: "ics", esempio: "taxi", straniera: true },
  { lettera: "Y", nome: "ipsilon", esempio: "yogurt", straniera: true },
];
