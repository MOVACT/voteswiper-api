export const getTranslatedValue = (
    column: TranslatedColumn,
    locale: string,
    defaultValue?: string
): string => {
    if (column[locale]) {
        return column[locale];
    }

    if (defaultValue) {
        return defaultValue;
    }

    return '';
};
