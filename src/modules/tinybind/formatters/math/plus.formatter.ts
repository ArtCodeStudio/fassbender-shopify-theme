/**
 * Adds a number to an output.
 * @see https://help.shopify.com/themes/liquid/filters/math-filters#plus
 */
export const plus = (a: string | number, b: string | number) => {
  return Number(a) + Number(b);
};
