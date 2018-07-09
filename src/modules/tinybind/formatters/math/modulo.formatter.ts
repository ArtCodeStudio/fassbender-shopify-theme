/**
 * Divides an output by a number and returns the remainder.
 * @see https://help.shopify.com/themes/liquid/filters/math-filters#modulo
 */
export const modulo = (a: string | number, b: string | number) => {
  return Number(a) % Number(b);
};
