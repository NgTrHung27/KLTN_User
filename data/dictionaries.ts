import "server-only";

const dictionaries = {
  en: () => import("../messages/en.json").then((module) => module.default),
  vi: () => import("../messages/vi.json").then((module) => module.default),
};

export type Lang = keyof typeof dictionaries;
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export type DictionaryLanguage = UnwrapPromise<
  ReturnType<typeof dictionaries.en>
>;

export const getDictionary = async (locale: Lang) => {
  const dictionaryModule = await dictionaries[locale]();
  return dictionaryModule;
};
