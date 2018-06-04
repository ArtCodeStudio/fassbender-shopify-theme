/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Rivets.TypeParser
// ---------------------

// Parser and tokenizer for getting the type and value of a primitive or keypath.
class TypeParser {

  static types = {
    primitive: 0,
    keypath: 1
  };

  static parse(string) {
    if (/^'.*'$|^".*"$/.test(string)) {
      return {
        type: this.types.primitive,
        value: string.slice(1, -1)
      };
    } else if (string === 'true') {
      return {
        type: this.types.primitive,
        value: true
      };
    } else if (string === 'false') {
      return {
        type: this.types.primitive,
        value: false
      };
    } else if (string === 'null') {
      return {
        type: this.types.primitive,
        value: null
      };
    } else if (string === 'undefined') {
      return {
        type: this.types.primitive,
        value: undefined
      };
    } else if (string === '') {
      return {
        type: this.types.primitive,
        value: undefined
      };
    } else if (isNaN(Number(string)) === false) {
      return {
        type: this.types.primitive,
        value: Number(string)
      };
    } else {
      return {
        type: this.types.keypath,
        value: string
      };
    }
  }
};

// Rivets.TextTemplateParser
// -------------------------

// Rivets.js text template parser and tokenizer for mustache-style text content
// binding declarations.
class TextTemplateParser {

  static types = {
    text: 0,
    binding: 1
  };


  // Parses the template and returns a set of tokens, separating static portions
  // of text from binding declarations.
  static parse(template, delimiters) {
    const tokens = [];
    const { length } = template;
    let index = 0;
    let lastIndex = 0;

    while (lastIndex < length) {
      index = template.indexOf(delimiters[0], lastIndex);

      if (index < 0) {
        tokens.push({type: this.types.text, value: template.slice(lastIndex)});
        break;
      } else {
        if ((index > 0) && (lastIndex < index)) {
          tokens.push({type: this.types.text, value: template.slice(lastIndex, index)});
        }

        lastIndex = index + delimiters[0].length;
        index = template.indexOf(delimiters[1], lastIndex);

        if (index < 0) {
          const substring = template.slice(lastIndex - delimiters[1].length);
          const lastToken = tokens[tokens.length - 1];

          if ((lastToken != null ? lastToken.type : undefined) === this.types.text) {
            lastToken.value += substring;
          } else {
            tokens.push({type: this.types.text, value: substring});
          }

          break;
        }

        const value = template.slice(lastIndex, index).trim();
        tokens.push({type: this.types.binding, value});
        lastIndex = index + delimiters[1].length;
      }
    }

    return tokens;
  }
};


export { TypeParser, TextTemplateParser };