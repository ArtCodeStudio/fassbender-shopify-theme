class Shopify {

  public moneyFormat = '${{amount}}';

  /**
   * Money format handler
   * @see shopify's option_selection.js
   * @param cents
   * @param format
   */
  public formatMoney(cents, format) {
    if (typeof cents === 'string') { cents = cents.replace('.', ''); }
    let value = '';
    const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    const formatString = (format || this.moneyFormat);

    function defaultOption(opt, def) {
      return (typeof opt === 'undefined' ? def : opt);
    }

    const formatWithDelimiters = (numb: number, precision, thousands?, decimal?) => {
      precision = defaultOption(precision, 2);
      thousands = defaultOption(thousands, ',');
      decimal   = defaultOption(decimal, '.');

      if (isNaN(numb) || numb == null) { return '0'; }

      const numStr = (numb / 100.0).toFixed(precision);

      const parts = numStr.split('.');
      const dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
      const cent = parts[1] ? (decimal + parts[1]) : '';

      return dollars + cent;
    };

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
    }

    return formatString.replace(placeholderRegex, value);
  }
}
