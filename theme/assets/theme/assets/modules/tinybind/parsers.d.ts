/**
 * Used also in parsers.parseType
 * TODO outsource
 */
export declare const PRIMITIVE = 0;
export declare const KEYPATH = 1;
export declare const TEXT = 0;
export declare const BINDING = 1;
/**
 * Parser and tokenizer for getting the type and value from a string.
 * @param string
 */
export declare function parseType(string: string): {
    type: number;
    value: any;
};
export interface ITokens {
    type: number;
    value: string;
}
/**
 * Template parser and tokenizer for mustache-style text content bindings.
 * Parses the template and returns a set of tokens, separating static portions
 * of text from binding declarations.
 * @param template
 * @param delimiters
 */
export declare function parseTemplate(template: string, delimiters: string[]): ITokens[];
