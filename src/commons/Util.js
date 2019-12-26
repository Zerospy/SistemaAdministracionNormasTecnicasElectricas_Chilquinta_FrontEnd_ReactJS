import numeral from 'numeral';
// import es from 'numeral/locales/es';
import Constantes from 'Constantes';
import moment from 'moment';

// load a locale
numeral.register('locale', 'es', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    currency: {
        symbol: '$'
    }
});

// switch between locales
numeral.locale('es');

export const formatDate = date =>
    moment(date)
        .utc()
        .format(Constantes.DATE_FORMAT);

export const formatDateTime = date =>
    moment(date)
        .utc()
        .format(Constantes.DATETIME_FORMAT);

export const formatDateWithPattern = (date, pattern, format) =>
    moment(date, pattern)
        .utc()
        .format(format);

export const numberFormat = (number, formatIn) => {
    const format = formatIn || '0,0.[00]';

    return numeral()
        .set(number)
        .format(format);
};

export const firstLetterString = (string) => {
    const format = string.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')

    return format
};

export const inputDecimalFormat = (number, cantidadDecimales) => {
    cantidadDecimales = cantidadDecimales ? cantidadDecimales : 2;

    if (number === null) {
        number = 0;
    } else if (!isNaN(number) && parseFloat(number) > 0) {
        number = parseFloat(number).toFixed(cantidadDecimales);
    }

    number = number.toString().replace(/\D/g, '');

    number = parseFloat(number);

    if (!isNaN(number)) {
        number = parseFloat(number) / Math.pow(10, cantidadDecimales);
    }

    return numeral()
        .set(number)
        .format(Constantes.DECIMAL_FORMAT);
};

export const removeNumberFormat = number => {
    if (number === null) {
        return 0;
    }

    numeral.locale('es');

    if (numeral.locale() === 'es') {
        number = number.toString().replace(/[^0-9,]/g, '');
        number = number.toString().replace(/,/g, '.');
    }

    return numeral()
        .set(number)
        .value();
};

export const leftPadding = (string, length, strPadding) => {
    const strLength = string.toString().length;
    strPadding = strPadding.toString();

    return strLength < length
        ? leftPadding(strPadding + string, length, strPadding)
        : string.toString();
};

export const rightPadding = (string, length, strPadding) => {
    const strLength = string.toString().length;
    strPadding = strPadding.toString();

    return strLength < length
        ? rightPadding(string + strPadding, length, strPadding)
        : string.toString();
};

export const crossMultiplication = (firstTerm, secondTerm, thirdTerm) => {
    firstTerm = parseFloat(firstTerm, 10);
    secondTerm = parseFloat(secondTerm, 10);
    thirdTerm = parseFloat(thirdTerm, 10);

    const result = (firstTerm * secondTerm) / thirdTerm;

    return parseFloat(parseFloat(result, 10).toFixed(Constantes.TOTAL_TRIAL_DECIMALS)) 
    // numberFormat(result, Constantes.DECIMAL_FORMAT);
};
