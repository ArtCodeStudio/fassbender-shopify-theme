/**
 * Replaces all occurrences of a string with a substring.
 * @see https://help.shopify.com/en/themes/liquid/filters/string-filters#replace
 */
export const replace = (str: string, value: string, replaceValue: string) => {
  return str.replace(new RegExp(value, 'g'), replaceValue);
};
