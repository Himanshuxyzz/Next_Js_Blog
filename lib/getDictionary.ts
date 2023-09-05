const dictionaries: any = {
  en: () => import("./../dictonaries/en.json").then((module) => module.default),
  de: () => import("./../dictonaries/de.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  if (!locale || locale === undefined) {
    return dictionaries["en"]() as any;
  } else {
    return dictionaries[locale as "en" | "de"]() as any;
  }
};
