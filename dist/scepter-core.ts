(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["scepter-core"] = factory();
	else
		root["scepter-core"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 711:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Default values for all Dinero objects.
 *
 * You can override default values for all subsequent Dinero objects by changing them directly on the global `Dinero` object.
 * Existing instances won't be affected.
 *
 * @property {Number} defaultAmount - The default amount for new Dinero objects (see {@link module:Dinero Dinero} for format).
 * @property {String} defaultCurrency - The default currency for new Dinero objects (see {@link module:Dinero Dinero} for format).
 * @property {Number} defaultPrecision - The default precision for new Dinero objects (see {@link module:Dinero Dinero} for format).
 *
 * @example
 * // Will set currency to 'EUR' for all Dinero objects.
 * Dinero.defaultCurrency = 'EUR'
 *
 * @type {Object}
 */
var Defaults = {
  defaultAmount: 0,
  defaultCurrency: 'USD',
  defaultPrecision: 2
};
/**
 * Global settings for all Dinero objects.
 *
 * You can override global values for all subsequent Dinero objects by changing them directly on the global `Dinero` object.
 * Existing instances won't be affected.
 *
 * @property {String}  globalLocale - The global locale for new Dinero objects (see {@link module:Dinero~setLocale setLocale} for format).
 * @property {String}  globalFormat - The global format for new Dinero objects (see {@link module:Dinero~toFormat toFormat} for format).
 * @property {String}  globalRoundingMode - The global rounding mode for new Dinero objects (see {@link module:Dinero~multiply multiply} or {@link module:Dinero~divide divide} for format).
 * @property {String}  globalFormatRoundingMode - The global rounding mode to format new Dinero objects (see {@link module:Dinero~toFormat toFormat} or {@link module:Dinero~toRoundedUnit toRoundedUnit} for format).
 * @property {(String|Promise)}  globalExchangeRatesApi.endpoint - The global exchange rate API endpoint for new Dinero objects, or the global promise that resolves to the exchanges rates (see {@link module:Dinero~convert convert} for format).
 * @property {String}  globalExchangeRatesApi.propertyPath - The global exchange rate API property path for new Dinero objects (see {@link module:Dinero~convert convert} for format).
 * @property {Object}  globalExchangeRatesApi.headers - The global exchange rate API headers for new Dinero objects (see {@link module:Dinero~convert convert} for format).
 *
 * @example
 * // Will set locale to 'fr-FR' for all Dinero objects.
 * Dinero.globalLocale = 'fr-FR'
 * @example
 * // Will set global exchange rate API parameters for all Dinero objects.
 * Dinero.globalExchangeRatesApi = {
 *  endpoint: 'https://yourexchangerates.api/latest?base={{from}}',
 *  propertyPath: 'data.rates.{{to}}',
 *  headers: {
 *    'user-key': 'xxxxxxxxx'
 *  }
 * }
 *
 * @type {Object}
 */

var Globals = {
  globalLocale: 'en-US',
  globalFormat: '$0,0.00',
  globalRoundingMode: 'HALF_EVEN',
  globalFormatRoundingMode: 'HALF_AWAY_FROM_ZERO',
  globalExchangeRatesApi: {
    endpoint: undefined,
    headers: undefined,
    propertyPath: undefined
  }
};

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/**
 * Static methods for Dinero.
 * @ignore
 *
 * @type {Object}
 */
var Static = {
  /**
   * Returns an array of Dinero objects, normalized to the same precision (the highest).
   *
   * @memberof module:Dinero
   * @method
   *
   * @param {Dinero[]} objects - An array of Dinero objects
   *
   * @example
   * // returns an array of Dinero objects
   * // both with a precision of 3
   * // and an amount of 1000
   * Dinero.normalizePrecision([
   *   Dinero({ amount: 100, precision: 2 }),
   *   Dinero({ amount: 1000, precision: 3 })
   * ])
   *
   * @return {Dinero[]}
   */
  normalizePrecision: function normalizePrecision(objects) {
    var highestPrecision = objects.reduce(function (a, b) {
      return Math.max(a.getPrecision(), b.getPrecision());
    });
    return objects.map(function (object) {
      return object.getPrecision() !== highestPrecision ? object.convertPrecision(highestPrecision) : object;
    });
  },

  /**
   * Returns the smallest Dinero object from an array of Dinero objects
   *
   * @memberof module:Dinero
   * @method
   *
   * @param {Dinero[]} objects - An array of Dinero objects
   *
   * @example
   * // returns the smallest Dinero object with amount of 500 from an array of Dinero objects with different precisions
   * Dinero.minimum([
   *   Dinero({ amount: 500, precision: 3 }),
   *   Dinero({ amount: 100, precision: 2 })
   * ])
   * @example
   * // returns the smallest Dinero object with amount of 50 from an array of Dinero objects
   * Dinero.minimum([
   *   Dinero({ amount: 50 }),
   *   Dinero({ amount: 100 })
   * ])
   *
   * @return {Dinero[]}
   */
  minimum: function minimum(objects) {
    var _objects = _toArray(objects),
        firstObject = _objects[0],
        tailObjects = _objects.slice(1);

    var currentMinimum = firstObject;
    tailObjects.forEach(function (obj) {
      currentMinimum = currentMinimum.lessThan(obj) ? currentMinimum : obj;
    });
    return currentMinimum;
  },

  /**
   * Returns the biggest Dinero object from an array of Dinero objects
   *
   * @memberof module:Dinero
   * @method
   *
   * @param {Dinero[]} objects - An array of Dinero objects
   *
   * @example
   * // returns the biggest Dinero object with amount of 20, from an array of Dinero objects with different precisions
   * Dinero.maximum([
   *   Dinero({ amount: 20, precision: 2 }),
   *   Dinero({ amount: 150, precision: 3 })
   * ])
   * @example
   * // returns the biggest Dinero object with amount of 100, from an array of Dinero objects
   * Dinero.maximum([
   *   Dinero({ amount: 100 }),
   *   Dinero({ amount: 50 })
   * ])
   *
   * @return {Dinero[]}
   */
  maximum: function maximum(objects) {
    var _objects2 = _toArray(objects),
        firstObject = _objects2[0],
        tailObjects = _objects2.slice(1);

    var currentMaximum = firstObject;
    tailObjects.forEach(function (obj) {
      currentMaximum = currentMaximum.greaterThan(obj) ? currentMaximum : obj;
    });
    return currentMaximum;
  }
};

/**
 * Returns whether a value is numeric.
 * @ignore
 *
 * @param  {} value - The value to test.
 *
 * @return {Boolean}
 */
function isNumeric(value) {
  return !isNaN(parseInt(value)) && isFinite(value);
}
/**
 * Returns whether a value is a percentage.
 * @ignore
 *
 * @param  {}  percentage - The percentage to test.
 *
 * @return {Boolean}
 */

function isPercentage(percentage) {
  return isNumeric(percentage) && percentage <= 100 && percentage >= 0;
}
/**
 * Returns whether an array of ratios is valid.
 * @ignore
 *
 * @param  {}  ratios - The ratios to test.
 *
 * @return {Boolean}
 */

function areValidRatios(ratios) {
  return ratios.length > 0 && ratios.every(function (ratio) {
    return ratio >= 0;
  }) && ratios.some(function (ratio) {
    return ratio > 0;
  });
}
/**
 * Returns whether a value is even.
 * @ignore
 *
 * @param  {Number} value - The value to test.
 *
 * @return {Boolean}
 */

function isEven(value) {
  return value % 2 === 0;
}
/**
 * Returns whether a value is a float.
 * @ignore
 *
 * @param  {}  value - The value to test.
 *
 * @return {Boolean}
 */

function isFloat(value) {
  return isNumeric(value) && !Number.isInteger(value);
}
/**
 * Returns how many fraction digits a number has.
 * @ignore
 *
 * @param  {Number} [number=0] - The number to test.
 *
 * @return {Number}
 */

function countFractionDigits() {
  var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var stringRepresentation = number.toString();

  if (stringRepresentation.indexOf('e-') > 0) {
    // It's too small for a normal string representation, e.g. 1e-7 instead of 0.00000001
    return parseInt(stringRepresentation.split('e-')[1]);
  } else {
    var fractionDigits = stringRepresentation.split('.')[1];
    return fractionDigits ? fractionDigits.length : 0;
  }
}
/**
 * Returns whether a number is half.
 * @ignore
 *
 * @param {Number} number - The number to test.
 *
 * @return {Number}
 */

function isHalf(number) {
  return Math.abs(number) % 1 === 0.5;
}
/**
 * Fetches a JSON resource.
 * @ignore
 *
 * @param  {String} url - The resource to fetch.
 * @param  {Object} [options.headers] - The headers to pass.
 *
 * @throws {Error} If `request.status` is lesser than 200 or greater or equal to 400.
 * @throws {Error} If network fails.
 *
 * @return {JSON}
 */

function getJSON(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve, reject) {
    var request = Object.assign(new XMLHttpRequest(), {
      onreadystatechange: function onreadystatechange() {
        if (request.readyState === 4) {
          if (request.status >= 200 && request.status < 400) resolve(JSON.parse(request.responseText));else reject(new Error(request.statusText));
        }
      },
      onerror: function onerror() {
        reject(new Error('Network error'));
      }
    });
    request.open('GET', url, true);
    setXHRHeaders(request, options.headers);
    request.send();
  });
}
/**
 * Returns an XHR object with attached headers.
 * @ignore
 *
 * @param {XMLHttpRequest} xhr - The XHR request to set headers to.
 * @param {Object} headers - The headers to set.
 *
 * @return {XMLHttpRequest}
 */

function setXHRHeaders(xhr) {
  var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  for (var header in headers) {
    xhr.setRequestHeader(header, headers[header]);
  }

  return xhr;
}
/**
 * Returns whether a value is undefined.
 * @ignore
 *
 * @param {} value - The value to test.
 *
 * @return {Boolean}
 */

function isUndefined(value) {
  return typeof value === 'undefined';
}
/**
 * Returns an object flattened to one level deep.
 * @ignore
 *
 * @param {Object} object - The object to flatten.
 * @param {String} separator - The separator to use between flattened nodes.
 *
 * @return {Object}
 */

function flattenObject(object) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';
  var finalObject = {};
  Object.entries(object).forEach(function (item) {
    if (_typeof(item[1]) === 'object') {
      var flatObject = flattenObject(item[1]);
      Object.entries(flatObject).forEach(function (node) {
        finalObject[item[0] + separator + node[0]] = node[1];
      });
    } else {
      finalObject[item[0]] = item[1];
    }
  });
  return finalObject;
}
/**
 * Returns whether a value is thenable.
 * @ignore
 *
 * @param {} value - The value to test.
 *
 * @return {Boolean}
 */

function isThenable(value) {
  return Boolean(value) && (_typeof(value) === 'object' || typeof value === 'function') && typeof value.then === 'function';
}

function Calculator() {
  var floatMultiply = function floatMultiply(a, b) {
    var getFactor = function getFactor(number) {
      return Math.pow(10, countFractionDigits(number));
    };

    var factor = Math.max(getFactor(a), getFactor(b));
    return Math.round(a * factor) * Math.round(b * factor) / (factor * factor);
  };

  var roundingModes = {
    HALF_ODD: function HALF_ODD(number) {
      var rounded = Math.round(number);
      return isHalf(number) ? isEven(rounded) ? rounded - 1 : rounded : rounded;
    },
    HALF_EVEN: function HALF_EVEN(number) {
      var rounded = Math.round(number);
      return isHalf(number) ? isEven(rounded) ? rounded : rounded - 1 : rounded;
    },
    HALF_UP: function HALF_UP(number) {
      return Math.round(number);
    },
    HALF_DOWN: function HALF_DOWN(number) {
      return isHalf(number) ? Math.floor(number) : Math.round(number);
    },
    HALF_TOWARDS_ZERO: function HALF_TOWARDS_ZERO(number) {
      return isHalf(number) ? Math.sign(number) * Math.floor(Math.abs(number)) : Math.round(number);
    },
    HALF_AWAY_FROM_ZERO: function HALF_AWAY_FROM_ZERO(number) {
      return isHalf(number) ? Math.sign(number) * Math.ceil(Math.abs(number)) : Math.round(number);
    },
    DOWN: function DOWN(number) {
      return Math.floor(number);
    }
  };
  return {
    /**
     * Returns the sum of two numbers.
     * @ignore
     *
     * @param {Number} a - The first number to add.
     * @param {Number} b - The second number to add.
     *
     * @return {Number}
     */
    add: function add(a, b) {
      return a + b;
    },

    /**
     * Returns the difference of two numbers.
     * @ignore
     *
     * @param {Number} a - The first number to subtract.
     * @param {Number} b - The second number to subtract.
     *
     * @return {Number}
     */
    subtract: function subtract(a, b) {
      return a - b;
    },

    /**
     * Returns the product of two numbers.
     * @ignore
     *
     * @param {Number} a - The first number to multiply.
     * @param {Number} b - The second number to multiply.
     *
     * @return {Number}
     */
    multiply: function multiply(a, b) {
      return isFloat(a) || isFloat(b) ? floatMultiply(a, b) : a * b;
    },

    /**
     * Returns the quotient of two numbers.
     * @ignore
     *
     * @param {Number} a - The first number to divide.
     * @param {Number} b - The second number to divide.
     *
     * @return {Number}
     */
    divide: function divide(a, b) {
      return a / b;
    },

    /**
     * Returns the remainder of two numbers.
     * @ignore
     *
     * @param  {Number} a - The first number to divide.
     * @param  {Number} b - The second number to divide.
     *
     * @return {Number}
     */
    modulo: function modulo(a, b) {
      return a % b;
    },

    /**
     * Returns a rounded number based off a specific rounding mode.
     * @ignore
     *
     * @param {Number} number - The number to round.
     * @param {String} [roundingMode='HALF_EVEN'] - The rounding mode to use.
     *
     * @returns {Number}
     */
    round: function round(number) {
      var roundingMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'HALF_EVEN';
      return roundingModes[roundingMode](number);
    }
  };
}

var calculator = Calculator();
function Format(format) {
  var matches = /^(?:(\$|USD)?0(?:(,)0)?(\.)?(0+)?|0(?:(,)0)?(\.)?(0+)?\s?(dollar)?)$/gm.exec(format);
  return {
    /**
     * Returns the matches.
     * @ignore
     *
     * @return {Array}
     */
    getMatches: function getMatches() {
      return matches !== null ? matches.slice(1).filter(function (match) {
        return !isUndefined(match);
      }) : [];
    },

    /**
     * Returns the amount of fraction digits to display.
     * @ignore
     *
     * @return {Number}
     */
    getMinimumFractionDigits: function getMinimumFractionDigits() {
      var decimalPosition = function decimalPosition(match) {
        return match === '.';
      };

      return !isUndefined(this.getMatches().find(decimalPosition)) ? this.getMatches()[calculator.add(this.getMatches().findIndex(decimalPosition), 1)].split('').length : 0;
    },

    /**
     * Returns the currency display mode.
     * @ignore
     *
     * @return {String}
     */
    getCurrencyDisplay: function getCurrencyDisplay() {
      var modes = {
        USD: 'code',
        dollar: 'name',
        $: 'symbol'
      };
      return modes[this.getMatches().find(function (match) {
        return match === 'USD' || match === 'dollar' || match === '$';
      })];
    },

    /**
     * Returns the formatting style.
     * @ignore
     *
     * @return {String}
     */
    getStyle: function getStyle() {
      return !isUndefined(this.getCurrencyDisplay(this.getMatches())) ? 'currency' : 'decimal';
    },

    /**
     * Returns whether grouping should be used or not.
     * @ignore
     *
     * @return {Boolean}
     */
    getUseGrouping: function getUseGrouping() {
      return !isUndefined(this.getMatches().find(function (match) {
        return match === ',';
      }));
    }
  };
}

function CurrencyConverter(options) {
  /* istanbul ignore next */
  var mergeTags = function mergeTags() {
    var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var tags = arguments.length > 1 ? arguments[1] : undefined;

    for (var tag in tags) {
      string = string.replace("{{".concat(tag, "}}"), tags[tag]);
    }

    return string;
  };
  /* istanbul ignore next */


  var getRatesFromRestApi = function getRatesFromRestApi(from, to) {
    return getJSON(mergeTags(options.endpoint, {
      from: from,
      to: to
    }), {
      headers: options.headers
    });
  };

  return {
    /**
     * Returns the exchange rate.
     * @ignore
     *
     * @param  {String} from - The base currency.
     * @param  {String} to   - The destination currency.
     *
     * @return {Promise}
     */
    getExchangeRate: function getExchangeRate(from, to) {
      return (isThenable(options.endpoint) ? options.endpoint : getRatesFromRestApi(from, to)).then(function (data) {
        return flattenObject(data)[mergeTags(options.propertyPath, {
          from: from,
          to: to
        })];
      });
    }
  };
}

/**
 * Performs an assertion.
 * @ignore
 *
 * @param  {Boolean} condition - The expression to assert.
 * @param  {String}  errorMessage - The message to throw if the assertion fails
 * @param  {ErrorConstructor}   [ErrorType=Error] - The error to throw if the assertion fails.
 *
 * @throws {Error} If `condition` returns `false`.
 */

function assert(condition, errorMessage) {
  var ErrorType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Error;
  if (!condition) throw new ErrorType(errorMessage);
}
/**
 * Asserts a value is a percentage.
 * @ignore
 *
 * @param  {}  percentage - The percentage to test.
 *
 * @throws {RangeError} If `percentage` is out of range.
 */

function assertPercentage(percentage) {
  assert(isPercentage(percentage), 'You must provide a numeric value between 0 and 100.', RangeError);
}
/**
 * Asserts an array of ratios is valid.
 * @ignore
 *
 * @param  {}  ratios - The ratios to test.
 *
 * @throws {TypeError} If `ratios` are invalid.
 */

function assertValidRatios(ratios) {
  assert(areValidRatios(ratios), 'You must provide a non-empty array of numeric values greater than 0.', TypeError);
}
/**
 * Asserts a value is an integer.
 * @ignore
 *
 * @param  {}  number - The value to test.
 *
 * @throws {TypeError}
 */

function assertInteger(number) {
  assert(Number.isInteger(number), 'You must provide an integer.', TypeError);
}

var calculator$1 = Calculator();
/**
 * A Dinero object is an immutable data structure representing a specific monetary value.
 * It comes with methods for creating, parsing, manipulating, testing, transforming and formatting them.
 *
 * A Dinero object has:
 *
 * * An `amount`, expressed in minor currency units, as an integer.
 * * A `currency`, expressed as an {@link https://en.wikipedia.org/wiki/ISO_4217#Active_codes ISO 4217 currency code}.
 * * A `precision`, expressed as an integer, to represent the number of decimal places in the `amount`.
 *   This is helpful when you want to represent fractional minor currency units (e.g.: $10.4545).
 *   You can also use it to represent a currency with a different [exponent](https://en.wikipedia.org/wiki/ISO_4217#Treatment_of_minor_currency_units_.28the_.22exponent.22.29) than `2` (e.g.: Iraqi dinar with 1000 fils in 1 dinar (exponent of `3`), Japanese yen with no sub-units (exponent of `0`)).
 * * An optional `locale` property that affects how output strings are formatted.
 *
 * Here's an overview of the public API:
 *
 * * **Access:** {@link module:Dinero~getAmount getAmount}, {@link module:Dinero~getCurrency getCurrency}, {@link module:Dinero~getLocale getLocale} and {@link module:Dinero~getPrecision getPrecision}.
 * * **Manipulation:** {@link module:Dinero~add add}, {@link module:Dinero~subtract subtract}, {@link module:Dinero~multiply multiply}, {@link module:Dinero~divide divide}, {@link module:Dinero~percentage percentage}, {@link module:Dinero~allocate allocate} and {@link module:Dinero~convert convert}.
 * * **Testing:** {@link module:Dinero~equalsTo equalsTo}, {@link module:Dinero~lessThan lessThan}, {@link module:Dinero~lessThanOrEqual lessThanOrEqual}, {@link module:Dinero~greaterThan greaterThan}, {@link module:Dinero~greaterThanOrEqual greaterThanOrEqual}, {@link module:Dinero~isZero isZero}, {@link module:Dinero~isPositive isPositive}, {@link module:Dinero~isNegative isNegative}, {@link module:Dinero~hasSubUnits hasSubUnits}, {@link module:Dinero~hasSameCurrency hasSameCurrency} and {@link module:Dinero~hasSameAmount hasSameAmount}.
 * * **Configuration:** {@link module:Dinero~setLocale setLocale}.
 * * **Conversion & formatting:** {@link module:Dinero~toFormat toFormat}, {@link module:Dinero~toUnit toUnit}, {@link module:Dinero~toRoundedUnit toRoundedUnit}, {@link module:Dinero~toObject toObject}, {@link module:Dinero~toJSON toJSON}, {@link module:Dinero~convertPrecision convertPrecision} and {@link module:Dinero.normalizePrecision normalizePrecision}.
 *
 * Dinero.js uses `number`s under the hood, so it's constrained by the [double-precision floating-point format](https://en.wikipedia.org/wiki/Double-precision_floating-point_format). Using values over [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number/MAX_SAFE_INTEGER) or below [`Number.MIN_SAFE_INTEGER`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number/MIN_SAFE_INTEGER) will yield unpredictable results.
 * Same goes with performing calculations: once the internal `amount` value exceeds those limits, precision is no longer guaranteed.
 *
 * @module Dinero
 * @param  {Number} [options.amount=0] - The amount in minor currency units (as an integer).
 * @param  {String} [options.currency='USD'] - An ISO 4217 currency code.
 * @param  {String} [options.precision=2] - The number of decimal places to represent.
 *
 * @throws {TypeError} If `amount` or `precision` is invalid. Integers over [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number/MAX_SAFE_INTEGER) or below [`Number.MIN_SAFE_INTEGER`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number/MIN_SAFE_INTEGER) are considered valid, even though they can lead to imprecise amounts.
 *
 * @return {Object}
 */

var Dinero = function Dinero(options) {
  var _Object$assign = Object.assign({}, {
    amount: Dinero.defaultAmount,
    currency: Dinero.defaultCurrency,
    precision: Dinero.defaultPrecision
  }, options),
      amount = _Object$assign.amount,
      currency = _Object$assign.currency,
      precision = _Object$assign.precision;

  assertInteger(amount);
  assertInteger(precision);
  var globalLocale = Dinero.globalLocale,
      globalFormat = Dinero.globalFormat,
      globalRoundingMode = Dinero.globalRoundingMode,
      globalFormatRoundingMode = Dinero.globalFormatRoundingMode;
  var globalExchangeRatesApi = Object.assign({}, Dinero.globalExchangeRatesApi);
  /**
   * Uses ES5 function notation so `this` can be passed through call, apply and bind
   * @ignore
   */

  var create = function create(options) {
    var obj = Object.assign({}, Object.assign({}, {
      amount: amount,
      currency: currency,
      precision: precision
    }, options), Object.assign({}, {
      locale: this.locale
    }, options));
    return Object.assign(Dinero({
      amount: obj.amount,
      currency: obj.currency,
      precision: obj.precision
    }), {
      locale: obj.locale
    });
  };
  /**
   * Uses ES5 function notation so `this` can be passed through call, apply and bind
   * @ignore
   */


  var assertSameCurrency = function assertSameCurrency(comparator) {
    assert(this.hasSameCurrency(comparator), 'You must provide a Dinero instance with the same currency.', TypeError);
  };

  return {
    /**
     * Returns the amount.
     *
     * @example
     * // returns 500
     * Dinero({ amount: 500 }).getAmount()
     *
     * @return {Number}
     */
    getAmount: function getAmount() {
      return amount;
    },

    /**
     * Returns the currency.
     *
     * @example
     * // returns 'EUR'
     * Dinero({ currency: 'EUR' }).getCurrency()
     *
     * @return {String}
     */
    getCurrency: function getCurrency() {
      return currency;
    },

    /**
     * Returns the locale.
     *
     * @example
     * // returns 'fr-FR'
     * Dinero().setLocale('fr-FR').getLocale()
     *
     * @return {String}
     */
    getLocale: function getLocale() {
      return this.locale || globalLocale;
    },

    /**
     * Returns a new Dinero object with an embedded locale.
     *
     * @param {String} newLocale - The new locale as an {@link http://tools.ietf.org/html/rfc5646 BCP 47 language tag}.
     *
     * @example
     * // Returns a Dinero object with locale 'ja-JP'
     * Dinero().setLocale('ja-JP')
     *
     * @return {Dinero}
     */
    setLocale: function setLocale(newLocale) {
      return create.call(this, {
        locale: newLocale
      });
    },

    /**
     * Returns the precision.
     *
     * @example
     * // returns 3
     * Dinero({ precision: 3 }).getPrecision()
     *
     * @return {Number}
     */
    getPrecision: function getPrecision() {
      return precision;
    },

    /**
     * Returns a new Dinero object with a new precision and a converted amount.
     *
     * By default, fractional minor currency units are rounded using the **half to even** rule ([banker's rounding](http://wiki.c2.com/?BankersRounding)).
     * This can be necessary when you need to convert objects to a smaller precision.
     *
     * Rounding *can* lead to accuracy issues as you chain many times. Consider a minimal amount of subsequent conversions for safer results.
     * You can also specify a different `roundingMode` to better fit your needs.
     *
     * @param {Number} newPrecision - The new precision.
     * @param {String} [roundingMode='HALF_EVEN'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'`, `'HALF_AWAY_FROM_ZERO'` or `'DOWN'`.
     *
     * @example
     * // Returns a Dinero object with precision 3 and amount 1000
     * Dinero({ amount: 100, precision: 2 }).convertPrecision(3)
     *
     * @throws {TypeError} If `newPrecision` is invalid.
     *
     * @return {Dinero}
     */
    convertPrecision: function convertPrecision(newPrecision) {
      var roundingMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalFormatRoundingMode;
      assertInteger(newPrecision);
      return create.call(this, {
        amount: calculator$1.round(calculator$1.multiply(this.getAmount(), Math.pow(10, calculator$1.subtract(newPrecision, this.getPrecision()))), roundingMode),
        precision: newPrecision
      });
    },

    /**
     * Returns a new Dinero object that represents the sum of this and an other Dinero object.
     *
     * If Dinero objects have a different `precision`, they will be first converted to the highest.
     *
     * @param {Dinero} addend - The Dinero object to add.
     *
     * @example
     * // returns a Dinero object with amount 600
     * Dinero({ amount: 400 }).add(Dinero({ amount: 200 }))
     * @example
     * // returns a Dinero object with amount 144545 and precision 4
     * Dinero({ amount: 400 }).add(Dinero({ amount: 104545, precision: 4 }))
     *
     * @throws {TypeError} If `addend` has a different currency.
     *
     * @return {Dinero}
     */
    add: function add(addend) {
      assertSameCurrency.call(this, addend);
      var addends = Dinero.normalizePrecision([this, addend]);
      return create.call(this, {
        amount: calculator$1.add(addends[0].getAmount(), addends[1].getAmount()),
        precision: addends[0].getPrecision()
      });
    },

    /**
     * Returns a new Dinero object that represents the difference of this and an other Dinero object.
     *
     * If Dinero objects have a different `precision`, they will be first converted to the highest.
     *
     * @param  {Dinero} subtrahend - The Dinero object to subtract.
     *
     * @example
     * // returns a Dinero object with amount 200
     * Dinero({ amount: 400 }).subtract(Dinero({ amount: 200 }))
     * @example
     * // returns a Dinero object with amount 64545 and precision 4
     * Dinero({ amount: 104545, precision: 4 }).subtract(Dinero({ amount: 400 }))
     *
     * @throws {TypeError} If `subtrahend` has a different currency.
     *
     * @return {Dinero}
     */
    subtract: function subtract(subtrahend) {
      assertSameCurrency.call(this, subtrahend);
      var subtrahends = Dinero.normalizePrecision([this, subtrahend]);
      return create.call(this, {
        amount: calculator$1.subtract(subtrahends[0].getAmount(), subtrahends[1].getAmount()),
        precision: subtrahends[0].getPrecision()
      });
    },

    /**
     * Returns a new Dinero object that represents the multiplied value by the given factor.
     *
     * By default, fractional minor currency units are rounded using the **half to even** rule ([banker's rounding](http://wiki.c2.com/?BankersRounding)).
     *
     * Rounding *can* lead to accuracy issues as you chain many times. Consider a minimal amount of subsequent calculations for safer results.
     * You can also specify a different `roundingMode` to better fit your needs.
     *
     * @param  {Number} multiplier - The factor to multiply by.
     * @param  {String} [roundingMode='HALF_EVEN'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'`, `'HALF_AWAY_FROM_ZERO'` or `'DOWN'`.
     *
     * @example
     * // returns a Dinero object with amount 1600
     * Dinero({ amount: 400 }).multiply(4)
     * @example
     * // returns a Dinero object with amount 800
     * Dinero({ amount: 400 }).multiply(2.001)
     * @example
     * // returns a Dinero object with amount 801
     * Dinero({ amount: 400 }).multiply(2.00125, 'HALF_UP')
     *
     * @return {Dinero}
     */
    multiply: function multiply(multiplier) {
      var roundingMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalRoundingMode;
      return create.call(this, {
        amount: calculator$1.round(calculator$1.multiply(this.getAmount(), multiplier), roundingMode)
      });
    },

    /**
     * Returns a new Dinero object that represents the divided value by the given factor.
     *
     * By default, fractional minor currency units are rounded using the **half to even** rule ([banker's rounding](http://wiki.c2.com/?BankersRounding)).
     *
     * Rounding *can* lead to accuracy issues as you chain many times. Consider a minimal amount of subsequent calculations for safer results.
     * You can also specify a different `roundingMode` to better fit your needs.
     *
     * As rounding is applied, precision may be lost in the process. If you want to accurately split a Dinero object, use {@link module:Dinero~allocate allocate} instead.
     *
     * @param  {Number} divisor - The factor to divide by.
     * @param  {String} [roundingMode='HALF_EVEN'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'`, `'HALF_AWAY_FROM_ZERO'` or `'DOWN'`.
     *
     * @example
     * // returns a Dinero object with amount 100
     * Dinero({ amount: 400 }).divide(4)
     * @example
     * // returns a Dinero object with amount 52
     * Dinero({ amount: 105 }).divide(2)
     * @example
     * // returns a Dinero object with amount 53
     * Dinero({ amount: 105 }).divide(2, 'HALF_UP')
     *
     * @return {Dinero}
     */
    divide: function divide(divisor) {
      var roundingMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalRoundingMode;
      return create.call(this, {
        amount: calculator$1.round(calculator$1.divide(this.getAmount(), divisor), roundingMode)
      });
    },

    /**
     * Returns a new Dinero object that represents a percentage of this.
     *
     * As rounding is applied, precision may be lost in the process. If you want to accurately split a Dinero object, use {@link module:Dinero~allocate allocate} instead.
     *
     * @param  {Number} percentage - The percentage to extract (between 0 and 100).
     * @param  {String} [roundingMode='HALF_EVEN'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'`, `'HALF_AWAY_FROM_ZERO'` or `'DOWN'`.
     *
     * @example
     * // returns a Dinero object with amount 5000
     * Dinero({ amount: 10000 }).percentage(50)
     * @example
     * // returns a Dinero object with amount 29
     * Dinero({ amount: 57 }).percentage(50, "HALF_ODD")
     *
     * @throws {RangeError} If `percentage` is out of range.
     *
     * @return {Dinero}
     */
    percentage: function percentage(_percentage) {
      var roundingMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalRoundingMode;
      assertPercentage(_percentage);
      return this.multiply(calculator$1.divide(_percentage, 100), roundingMode);
    },

    /**
     * Allocates the amount of a Dinero object according to a list of ratios.
     *
     * Sometimes you need to split monetary values but percentages can't cut it without adding or losing pennies.
     * A good example is invoicing: let's say you need to bill $1,000.03 and you want a 50% downpayment.
     * If you use {@link module:Dinero~percentage percentage}, you'll get an accurate Dinero object but the amount won't be billable: you can't split a penny.
     * If you round it, you'll bill a penny extra.
     * With {@link module:Dinero~allocate allocate}, you can split a monetary amount then distribute the remainder as evenly as possible.
     *
     * You can use percentage style or ratio style for `ratios`: `[25, 75]` and `[1, 3]` will do the same thing.
     *
     * Since v1.8.0, you can use zero ratios (such as [0, 50, 50]). If there's a remainder to distribute, zero ratios are skipped and return a Dinero object with amount zero.
     *
     * @param  {Number[]} ratios - The ratios to allocate the money to.
     *
     * @example
     * // returns an array of two Dinero objects
     * // the first one with an amount of 502
     * // the second one with an amount of 501
     * Dinero({ amount: 1003 }).allocate([50, 50])
     * @example
     * // returns an array of two Dinero objects
     * // the first one with an amount of 25
     * // the second one with an amount of 75
     * Dinero({ amount: 100 }).allocate([1, 3])
     * @example
     * // since version 1.8.0
     * // returns an array of three Dinero objects
     * // the first one with an amount of 0
     * // the second one with an amount of 502
     * // the third one with an amount of 501
     * Dinero({ amount: 1003 }).allocate([0, 50, 50])
     *
     * @throws {TypeError} If ratios are invalid.
     *
     * @return {Dinero[]}
     */
    allocate: function allocate(ratios) {
      var _this = this;

      assertValidRatios(ratios);
      var total = ratios.reduce(function (a, b) {
        return calculator$1.add(a, b);
      });
      var remainder = this.getAmount();
      var shares = ratios.map(function (ratio) {
        var share = Math.floor(calculator$1.divide(calculator$1.multiply(_this.getAmount(), ratio), total));
        remainder = calculator$1.subtract(remainder, share);
        return create.call(_this, {
          amount: share
        });
      });
      var i = 0;

      while (remainder > 0) {
        if (ratios[i] > 0) {
          shares[i] = shares[i].add(create.call(this, {
            amount: 1
          }));
          remainder = calculator$1.subtract(remainder, 1);
        }

        i += 1;
      }

      return shares;
    },

    /**
     * Returns a Promise containing a new Dinero object converted to another currency.
     *
     * You have two options to provide the exchange rates:
     *
     * 1. **Use an exchange rate REST API, and let Dinero handle the fetching and conversion.**
     *   This is a simple option if you have access to an exchange rate REST API and want Dinero to do the rest.
     * 2. **Fetch the exchange rates on your own and provide them directly.**
     *   This is useful if you're fetching your rates from somewhere else (a file, a database), use a different protocol or query language than REST (SOAP, GraphQL) or want to fetch rates once and cache them instead of making new requests every time.
     *
     * **If you want to use a REST API**, you must provide a third-party endpoint yourself. Dinero doesn't come bundled with an exchange rates endpoint.
     *
     * Here are some exchange rate APIs you can use:
     *
     * * [Fixer](https://fixer.io)
     * * [Open Exchange Rates](https://openexchangerates.org)
     * * [Coinbase](https://api.coinbase.com/v2/exchange-rates)
     * * More [foreign](https://github.com/toddmotto/public-apis#currency-exchange) and [crypto](https://github.com/toddmotto/public-apis#cryptocurrency) exchange rate APIs.
     *
     * **If you want to fetch your own rates and provide them directly**, you need to pass a promise that resolves to the exchanges rates.
     *
     * In both cases, you need to specify at least:
     *
     * * a **destination currency**: the currency in which you want to convert your Dinero object. You can specify it with `currency`.
     * * an **endpoint**: the API URL to query exchange rates, with parameters, or a promise that resolves to the exchange rates. You can specify it with `options.endpoint`.
     * * a **property path**: the path to access the wanted rate in your API's JSON response (or the custom promise's payload). For example, with a response of:
     * ```json
     * {
     *     "data": {
     *       "base": "USD",
     *       "destination": "EUR",
     *       "rate": "0.827728919"
     *     }
     * }
     * ```
     * Then the property path is `'data.rate'`. You can specify it with `options.propertyPath`.
     *
     * The base currency (the one of your Dinero object) and the destination currency can be used as "merge tags" with the mustache syntax, respectively `{{from}}` and `{{to}}`.
     * You can use these tags to refer to these values in `options.endpoint` and `options.propertyPath`.
     *
     * For example, if you need to specify the base currency as a query parameter, you can do the following:
     *
     * ```js
     * {
     *   endpoint: 'https://yourexchangerates.api/latest?base={{from}}'
     * }
     * ```
     *
     * @param  {String} currency - The destination currency, expressed as an {@link https://en.wikipedia.org/wiki/ISO_4217#Active_codes ISO 4217 currency code}.
     * @param  {(String|Promise)} options.endpoint - The API endpoint to retrieve exchange rates. You can substitute this with a promise that resolves to the exchanges rates if you already have them.
     * @param  {String} [options.propertyPath='rates.{{to}}'] - The property path to the rate.
     * @param  {Object} [options.headers] - The HTTP headers to provide, if needed.
     * @param  {String} [options.roundingMode='HALF_EVEN'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'`, `'HALF_AWAY_FROM_ZERO'` or `'DOWN'`.
     *
     * @example
     * // your global API parameters
     * Dinero.globalExchangeRatesApi = { ... }
     *
     * // returns a Promise containing a Dinero object with the destination currency
     * // and the initial amount converted to the new currency.
     * Dinero({ amount: 500 }).convert('EUR')
     * @example
     * // returns a Promise containing a Dinero object,
     * // with specific API parameters and rounding mode for this specific instance.
     * Dinero({ amount: 500 })
     *   .convert('XBT', {
     *     endpoint: 'https://yourexchangerates.api/latest?base={{from}}',
     *     propertyPath: 'data.rates.{{to}}',
     *     headers: {
     *       'user-key': 'xxxxxxxxx'
     *     },
     *     roundingMode: 'HALF_UP'
     *   })
     * @example
     * // usage with exchange rates provided as a custom promise
     * // using the default `propertyPath` format (so it doesn't have to be specified)
     * const rates = {
     *   rates: {
     *     EUR: 0.81162
     *   }
     * }
     *
     * Dinero({ amount: 500 })
     *   .convert('EUR', {
     *     endpoint: new Promise(resolve => resolve(rates))
     *   })
     * @example
     * // usage with Promise.prototype.then and Promise.prototype.catch
     * Dinero({ amount: 500 })
     *   .convert('EUR')
     *   .then(dinero => {
     *     dinero.getCurrency() // returns 'EUR'
     *   })
     *   .catch(err => {
     *     // handle errors
     *   })
     * @example
     * // usage with async/await
     * (async () => {
     *   const price = await Dinero({ amount: 500 }).convert('EUR')
     *   price.getCurrency() // returns 'EUR'
     * })()
     *
     * @return {Promise}
     */
    convert: function convert(currency) {
      var _this2 = this;

      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$endpoint = _ref.endpoint,
          endpoint = _ref$endpoint === void 0 ? globalExchangeRatesApi.endpoint : _ref$endpoint,
          _ref$propertyPath = _ref.propertyPath,
          propertyPath = _ref$propertyPath === void 0 ? globalExchangeRatesApi.propertyPath || 'rates.{{to}}' : _ref$propertyPath,
          _ref$headers = _ref.headers,
          headers = _ref$headers === void 0 ? globalExchangeRatesApi.headers : _ref$headers,
          _ref$roundingMode = _ref.roundingMode,
          roundingMode = _ref$roundingMode === void 0 ? globalRoundingMode : _ref$roundingMode;

      var options = Object.assign({}, {
        endpoint: endpoint,
        propertyPath: propertyPath,
        headers: headers,
        roundingMode: roundingMode
      });
      return CurrencyConverter(options).getExchangeRate(this.getCurrency(), currency).then(function (rate) {
        assert(!isUndefined(rate), "No rate was found for the destination currency \"".concat(currency, "\"."), TypeError);
        return create.call(_this2, {
          amount: calculator$1.round(calculator$1.multiply(_this2.getAmount(), parseFloat(rate)), options.roundingMode),
          currency: currency
        });
      });
    },

    /**
     * Checks whether the value represented by this object equals to the other.
     *
     * @param  {Dinero} comparator - The Dinero object to compare to.
     *
     * @example
     * // returns true
     * Dinero({ amount: 500, currency: 'EUR' }).equalsTo(Dinero({ amount: 500, currency: 'EUR' }))
     * @example
     * // returns false
     * Dinero({ amount: 500, currency: 'EUR' }).equalsTo(Dinero({ amount: 800, currency: 'EUR' }))
     * @example
     * // returns false
     * Dinero({ amount: 500, currency: 'USD' }).equalsTo(Dinero({ amount: 500, currency: 'EUR' }))
     * @example
     * // returns false
     * Dinero({ amount: 500, currency: 'USD' }).equalsTo(Dinero({ amount: 800, currency: 'EUR' }))
     * @example
     * // returns true
     * Dinero({ amount: 1000, currency: 'EUR', precision: 2 }).equalsTo(Dinero({ amount: 10000, currency: 'EUR', precision: 3 }))
     * @example
     * // returns false
     * Dinero({ amount: 10000, currency: 'EUR', precision: 2 }).equalsTo(Dinero({ amount: 10000, currency: 'EUR', precision: 3 }))
     *
     * @return {Boolean}
     */
    equalsTo: function equalsTo(comparator) {
      return this.hasSameAmount(comparator) && this.hasSameCurrency(comparator);
    },

    /**
     * Checks whether the value represented by this object is less than the other.
     *
     * @param  {Dinero} comparator - The Dinero object to compare to.
     *
     * @example
     * // returns true
     * Dinero({ amount: 500 }).lessThan(Dinero({ amount: 800 }))
     * @example
     * // returns false
     * Dinero({ amount: 800 }).lessThan(Dinero({ amount: 500 }))
     * @example
     * // returns true
     * Dinero({ amount: 5000, precision: 3 }).lessThan(Dinero({ amount: 800 }))
     * @example
     * // returns false
     * Dinero({ amount: 800 }).lessThan(Dinero({ amount: 5000, precision: 3 }))
     *
     * @throws {TypeError} If `comparator` has a different currency.
     *
     * @return {Boolean}
     */
    lessThan: function lessThan(comparator) {
      assertSameCurrency.call(this, comparator);
      var comparators = Dinero.normalizePrecision([this, comparator]);
      return comparators[0].getAmount() < comparators[1].getAmount();
    },

    /**
     * Checks whether the value represented by this object is less than or equal to the other.
     *
     * @param  {Dinero} comparator - The Dinero object to compare to.
     *
     * @example
     * // returns true
     * Dinero({ amount: 500 }).lessThanOrEqual(Dinero({ amount: 800 }))
     * @example
     * // returns true
     * Dinero({ amount: 500 }).lessThanOrEqual(Dinero({ amount: 500 }))
     * @example
     * // returns false
     * Dinero({ amount: 500 }).lessThanOrEqual(Dinero({ amount: 300 }))
     * @example
     * // returns true
     * Dinero({ amount: 5000, precision: 3 }).lessThanOrEqual(Dinero({ amount: 800 }))
     * @example
     * // returns true
     * Dinero({ amount: 5000, precision: 3 }).lessThanOrEqual(Dinero({ amount: 500 }))
     * @example
     * // returns false
     * Dinero({ amount: 800 }).lessThanOrEqual(Dinero({ amount: 5000, precision: 3 }))
     *
     * @throws {TypeError} If `comparator` has a different currency.
     *
     * @return {Boolean}
     */
    lessThanOrEqual: function lessThanOrEqual(comparator) {
      assertSameCurrency.call(this, comparator);
      var comparators = Dinero.normalizePrecision([this, comparator]);
      return comparators[0].getAmount() <= comparators[1].getAmount();
    },

    /**
     * Checks whether the value represented by this object is greater than the other.
     *
     * @param  {Dinero} comparator - The Dinero object to compare to.
     *
     * @example
     * // returns false
     * Dinero({ amount: 500 }).greaterThan(Dinero({ amount: 800 }))
     * @example
     * // returns true
     * Dinero({ amount: 800 }).greaterThan(Dinero({ amount: 500 }))
     * @example
     * // returns true
     * Dinero({ amount: 800 }).greaterThan(Dinero({ amount: 5000, precision: 3 }))
     * @example
     * // returns false
     * Dinero({ amount: 5000, precision: 3 }).greaterThan(Dinero({ amount: 800 }))
     *
     * @throws {TypeError} If `comparator` has a different currency.
     *
     * @return {Boolean}
     */
    greaterThan: function greaterThan(comparator) {
      assertSameCurrency.call(this, comparator);
      var comparators = Dinero.normalizePrecision([this, comparator]);
      return comparators[0].getAmount() > comparators[1].getAmount();
    },

    /**
     * Checks whether the value represented by this object is greater than or equal to the other.
     *
     * @param  {Dinero} comparator - The Dinero object to compare to.
     *
     * @example
     * // returns true
     * Dinero({ amount: 500 }).greaterThanOrEqual(Dinero({ amount: 300 }))
     * @example
     * // returns true
     * Dinero({ amount: 500 }).greaterThanOrEqual(Dinero({ amount: 500 }))
     * @example
     * // returns false
     * Dinero({ amount: 500 }).greaterThanOrEqual(Dinero({ amount: 800 }))
     * @example
     * // returns true
     * Dinero({ amount: 800 }).greaterThanOrEqual(Dinero({ amount: 5000, precision: 3 }))
     * @example
     * // returns true
     * Dinero({ amount: 500 }).greaterThanOrEqual(Dinero({ amount: 5000, precision: 3 }))
     * @example
     * // returns false
     * Dinero({ amount: 5000, precision: 3 }).greaterThanOrEqual(Dinero({ amount: 800 }))
     *
     * @throws {TypeError} If `comparator` has a different currency.
     *
     * @return {Boolean}
     */
    greaterThanOrEqual: function greaterThanOrEqual(comparator) {
      assertSameCurrency.call(this, comparator);
      var comparators = Dinero.normalizePrecision([this, comparator]);
      return comparators[0].getAmount() >= comparators[1].getAmount();
    },

    /**
     * Checks if the value represented by this object is zero.
     *
     * @example
     * // returns true
     * Dinero({ amount: 0 }).isZero()
     * @example
     * // returns false
     * Dinero({ amount: 100 }).isZero()
     *
     * @return {Boolean}
     */
    isZero: function isZero() {
      return this.getAmount() === 0;
    },

    /**
     * Checks if the value represented by this object is positive.
     *
     * @example
     * // returns false
     * Dinero({ amount: -10 }).isPositive()
     * @example
     * // returns true
     * Dinero({ amount: 10 }).isPositive()
     * @example
     * // returns true
     * Dinero({ amount: 0 }).isPositive()
     *
     * @return {Boolean}
     */
    isPositive: function isPositive() {
      return this.getAmount() >= 0;
    },

    /**
     * Checks if the value represented by this object is negative.
     *
     * @example
     * // returns true
     * Dinero({ amount: -10 }).isNegative()
     * @example
     * // returns false
     * Dinero({ amount: 10 }).isNegative()
     * @example
     * // returns false
     * Dinero({ amount: 0 }).isNegative()
     *
     * @return {Boolean}
     */
    isNegative: function isNegative() {
      return this.getAmount() < 0;
    },

    /**
     * Checks if this has minor currency units.
     * Deprecates {@link module:Dinero~hasCents hasCents}.
     *
     * @example
     * // returns false
     * Dinero({ amount: 1100 }).hasSubUnits()
     * @example
     * // returns true
     * Dinero({ amount: 1150 }).hasSubUnits()
     *
     * @return {Boolean}
     */
    hasSubUnits: function hasSubUnits() {
      return calculator$1.modulo(this.getAmount(), Math.pow(10, precision)) !== 0;
    },

    /**
     * Checks if this has minor currency units.
     *
     * @deprecated since version 1.4.0, will be removed in 2.0.0
     * Use {@link module:Dinero~hasSubUnits hasSubUnits} instead.
     *
     * @example
     * // returns false
     * Dinero({ amount: 1100 }).hasCents()
     * @example
     * // returns true
     * Dinero({ amount: 1150 }).hasCents()
     *
     * @return {Boolean}
     */
    hasCents: function hasCents() {
      return calculator$1.modulo(this.getAmount(), Math.pow(10, precision)) !== 0;
    },

    /**
     * Checks whether the currency represented by this object equals to the other.
     *
     * @param  {Dinero}  comparator - The Dinero object to compare to.
     *
     * @example
     * // returns true
     * Dinero({ amount: 2000, currency: 'EUR' }).hasSameCurrency(Dinero({ amount: 1000, currency: 'EUR' }))
     * @example
     * // returns false
     * Dinero({ amount: 1000, currency: 'EUR' }).hasSameCurrency(Dinero({ amount: 1000, currency: 'USD' }))
     *
     * @return {Boolean}
     */
    hasSameCurrency: function hasSameCurrency(comparator) {
      return this.getCurrency() === comparator.getCurrency();
    },

    /**
     * Checks whether the amount represented by this object equals to the other.
     *
     * @param  {Dinero}  comparator - The Dinero object to compare to.
     *
     * @example
     * // returns true
     * Dinero({ amount: 1000, currency: 'EUR' }).hasSameAmount(Dinero({ amount: 1000 }))
     * @example
     * // returns false
     * Dinero({ amount: 2000, currency: 'EUR' }).hasSameAmount(Dinero({ amount: 1000, currency: 'EUR' }))
     * @example
     * // returns true
     * Dinero({ amount: 1000, currency: 'EUR', precision: 2 }).hasSameAmount(Dinero({ amount: 10000, precision: 3 }))
     * @example
     * // returns false
     * Dinero({ amount: 10000, currency: 'EUR', precision: 2 }).hasSameAmount(Dinero({ amount: 10000, precision: 3 }))
     *
     * @return {Boolean}
     */
    hasSameAmount: function hasSameAmount(comparator) {
      var comparators = Dinero.normalizePrecision([this, comparator]);
      return comparators[0].getAmount() === comparators[1].getAmount();
    },

    /**
     * Returns this object formatted as a string.
     *
     * The format is a mask which defines how the output string will be formatted.
     * It defines whether to display a currency, in what format, how many fraction digits to display and whether to use grouping separators.
     * The output is formatted according to the applying locale.
     *
     * Object                       | Format            | String
     * :--------------------------- | :---------------- | :---
     * `Dinero({ amount: 500050 })` | `'$0,0.00'`       | $5,000.50
     * `Dinero({ amount: 500050 })` | `'$0,0'`          | $5,001
     * `Dinero({ amount: 500050 })` | `'$0'`            | $5001
     * `Dinero({ amount: 500050 })` | `'$0.0'`          | $5000.5
     * `Dinero({ amount: 500050 })` | `'USD0,0.0'`      | USD5,000.5
     * `Dinero({ amount: 500050 })` | `'0,0.0 dollar'`  | 5,000.5 dollars
     *
     * Don't try to substitute the `$` sign or the `USD` code with your target currency, nor adapt the format string to the exact format you want.
     * The format is a mask which defines a pattern and returns a valid, localized currency string.
     * If you want to display the object in a custom way, either use {@link module:Dinero~getAmount getAmount}, {@link module:Dinero~toUnit toUnit} or {@link module:Dinero~toRoundedUnit toRoundedUnit} and manipulate the output string as you wish.
     *
     * {@link module:Dinero~toFormat toFormat} wraps around `Number.prototype.toLocaleString`. For that reason, **format will vary depending on how it's implemented in the end user's environment**.
     *
     * You can also use `toLocaleString` directly:
     * `Dinero().toRoundedUnit(digits, roundingMode).toLocaleString(locale, options)`.
     *
     * By default, amounts are rounded using the **half away from zero** rule ([commercial rounding](https://en.wikipedia.org/wiki/Rounding#Round_half_away_from_zero)).
     * You can also specify a different `roundingMode` to better fit your needs.
     *
     * @param  {String} [format='$0,0.00'] - The format mask to format to.
     * @param  {String} [roundingMode='HALF_AWAY_FROM_ZERO'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'`, `'HALF_AWAY_FROM_ZERO'` or `'DOWN'`.
     *
     * @example
     * // returns $2,000
     * Dinero({ amount: 200000 }).toFormat('$0,0')
     * @example
     * // returns €50.5
     * Dinero({ amount: 5050, currency: 'EUR' }).toFormat('$0,0.0')
     * @example
     * // returns 100 euros
     * Dinero({ amount: 10000, currency: 'EUR' }).setLocale('fr-FR').toFormat('0,0 dollar')
     * @example
     * // returns 2000
     * Dinero({ amount: 200000, currency: 'EUR' }).toFormat()
     * @example
     * // returns $10
     * Dinero({ amount: 1050 }).toFormat('$0', 'HALF_EVEN')
     *
     * @return {String}
     */
    toFormat: function toFormat() {
      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : globalFormat;
      var roundingMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalFormatRoundingMode;
      var formatter = Format(format);
      return this.toRoundedUnit(formatter.getMinimumFractionDigits(), roundingMode).toLocaleString(this.getLocale(), {
        currencyDisplay: formatter.getCurrencyDisplay(),
        useGrouping: formatter.getUseGrouping(),
        minimumFractionDigits: formatter.getMinimumFractionDigits(),
        style: formatter.getStyle(),
        currency: this.getCurrency()
      });
    },

    /**
     * Returns the amount represented by this object in units.
     *
     * @example
     * // returns 10.5
     * Dinero({ amount: 1050 }).toUnit()
     * @example
     * // returns 10.545
     * Dinero({ amount: 10545, precision: 3 }).toUnit()
     *
     * @return {Number}
     */
    toUnit: function toUnit() {
      return calculator$1.divide(this.getAmount(), Math.pow(10, precision));
    },

    /**
     * Returns the amount represented by this object in rounded units.
     *
     * By default, the method uses the **half away from zero** rule ([commercial rounding](https://en.wikipedia.org/wiki/Rounding#Round_half_away_from_zero)).
     * You can also specify a different `roundingMode` to better fit your needs.
     *
     * @example
     * // returns 10.6
     * Dinero({ amount: 1055 }).toRoundedUnit(1)
     * @example
     * // returns 10
     * Dinero({ amount: 1050 }).toRoundedUnit(0, 'HALF_EVEN')
     *
     * @param  {Number} digits - The number of fraction digits to round to.
     * @param  {String} [roundingMode='HALF_AWAY_FROM_ZERO'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'`, `'HALF_AWAY_FROM_ZERO'` or `'DOWN'`.
     *
     * @return {Number}
     */
    toRoundedUnit: function toRoundedUnit(digits) {
      var roundingMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalFormatRoundingMode;
      var factor = Math.pow(10, digits);
      return calculator$1.divide(calculator$1.round(calculator$1.multiply(this.toUnit(), factor), roundingMode), factor);
    },

    /**
     * Returns the object's data as an object literal.
     *
     * @example
     * // returns { amount: 500, currency: 'EUR', precision: 2 }
     * Dinero({ amount: 500, currency: 'EUR', precision: 2 }).toObject()
     *
     * @return {Object}
     */
    toObject: function toObject() {
      return {
        amount: amount,
        currency: currency,
        precision: precision
      };
    },

    /**
     * Returns the object's data as an object literal.
     *
     * Alias of {@link module:Dinero~toObject toObject}.
     * It is defined so that calling `JSON.stringify` on a Dinero object will automatically extract the relevant data.
     *
     * @example
     * // returns '{"amount":500,"currency":"EUR","precision":2}'
     * JSON.stringify(Dinero({ amount: 500, currency: 'EUR', precision: 2 }))
     *
     * @return {Object}
     */
    toJSON: function toJSON() {
      return this.toObject();
    }
  };
};

var dinero = Object.assign(Dinero, Defaults, Globals, Static);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dinero);


/***/ }),

/***/ 624:
/***/ ((module) => {


/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),

/***/ 490:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// these aren't really private, but nor are they really useful to document

/**
 * @private
 */
var LuxonError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(LuxonError, _Error);

  function LuxonError() {
    return _Error.apply(this, arguments) || this;
  }

  return LuxonError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * @private
 */


var InvalidDateTimeError = /*#__PURE__*/function (_LuxonError) {
  _inheritsLoose(InvalidDateTimeError, _LuxonError);

  function InvalidDateTimeError(reason) {
    return _LuxonError.call(this, "Invalid DateTime: " + reason.toMessage()) || this;
  }

  return InvalidDateTimeError;
}(LuxonError);
/**
 * @private
 */

var InvalidIntervalError = /*#__PURE__*/function (_LuxonError2) {
  _inheritsLoose(InvalidIntervalError, _LuxonError2);

  function InvalidIntervalError(reason) {
    return _LuxonError2.call(this, "Invalid Interval: " + reason.toMessage()) || this;
  }

  return InvalidIntervalError;
}(LuxonError);
/**
 * @private
 */

var InvalidDurationError = /*#__PURE__*/function (_LuxonError3) {
  _inheritsLoose(InvalidDurationError, _LuxonError3);

  function InvalidDurationError(reason) {
    return _LuxonError3.call(this, "Invalid Duration: " + reason.toMessage()) || this;
  }

  return InvalidDurationError;
}(LuxonError);
/**
 * @private
 */

var ConflictingSpecificationError = /*#__PURE__*/function (_LuxonError4) {
  _inheritsLoose(ConflictingSpecificationError, _LuxonError4);

  function ConflictingSpecificationError() {
    return _LuxonError4.apply(this, arguments) || this;
  }

  return ConflictingSpecificationError;
}(LuxonError);
/**
 * @private
 */

var InvalidUnitError = /*#__PURE__*/function (_LuxonError5) {
  _inheritsLoose(InvalidUnitError, _LuxonError5);

  function InvalidUnitError(unit) {
    return _LuxonError5.call(this, "Invalid unit " + unit) || this;
  }

  return InvalidUnitError;
}(LuxonError);
/**
 * @private
 */

var InvalidArgumentError = /*#__PURE__*/function (_LuxonError6) {
  _inheritsLoose(InvalidArgumentError, _LuxonError6);

  function InvalidArgumentError() {
    return _LuxonError6.apply(this, arguments) || this;
  }

  return InvalidArgumentError;
}(LuxonError);
/**
 * @private
 */

var ZoneIsAbstractError = /*#__PURE__*/function (_LuxonError7) {
  _inheritsLoose(ZoneIsAbstractError, _LuxonError7);

  function ZoneIsAbstractError() {
    return _LuxonError7.call(this, "Zone is an abstract class") || this;
  }

  return ZoneIsAbstractError;
}(LuxonError);

/**
 * @private
 */
var n = "numeric",
    s = "short",
    l = "long";
var DATE_SHORT = {
  year: n,
  month: n,
  day: n
};
var DATE_MED = {
  year: n,
  month: s,
  day: n
};
var DATE_MED_WITH_WEEKDAY = {
  year: n,
  month: s,
  day: n,
  weekday: s
};
var DATE_FULL = {
  year: n,
  month: l,
  day: n
};
var DATE_HUGE = {
  year: n,
  month: l,
  day: n,
  weekday: l
};
var TIME_SIMPLE = {
  hour: n,
  minute: n
};
var TIME_WITH_SECONDS = {
  hour: n,
  minute: n,
  second: n
};
var TIME_WITH_SHORT_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  timeZoneName: s
};
var TIME_WITH_LONG_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  timeZoneName: l
};
var TIME_24_SIMPLE = {
  hour: n,
  minute: n,
  hourCycle: "h23"
};
var TIME_24_WITH_SECONDS = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23"
};
var TIME_24_WITH_SHORT_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23",
  timeZoneName: s
};
var TIME_24_WITH_LONG_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23",
  timeZoneName: l
};
var DATETIME_SHORT = {
  year: n,
  month: n,
  day: n,
  hour: n,
  minute: n
};
var DATETIME_SHORT_WITH_SECONDS = {
  year: n,
  month: n,
  day: n,
  hour: n,
  minute: n,
  second: n
};
var DATETIME_MED = {
  year: n,
  month: s,
  day: n,
  hour: n,
  minute: n
};
var DATETIME_MED_WITH_SECONDS = {
  year: n,
  month: s,
  day: n,
  hour: n,
  minute: n,
  second: n
};
var DATETIME_MED_WITH_WEEKDAY = {
  year: n,
  month: s,
  day: n,
  weekday: s,
  hour: n,
  minute: n
};
var DATETIME_FULL = {
  year: n,
  month: l,
  day: n,
  hour: n,
  minute: n,
  timeZoneName: s
};
var DATETIME_FULL_WITH_SECONDS = {
  year: n,
  month: l,
  day: n,
  hour: n,
  minute: n,
  second: n,
  timeZoneName: s
};
var DATETIME_HUGE = {
  year: n,
  month: l,
  day: n,
  weekday: l,
  hour: n,
  minute: n,
  timeZoneName: l
};
var DATETIME_HUGE_WITH_SECONDS = {
  year: n,
  month: l,
  day: n,
  weekday: l,
  hour: n,
  minute: n,
  second: n,
  timeZoneName: l
};

/**
 * @private
 */
// TYPES

function isUndefined(o) {
  return typeof o === "undefined";
}
function isNumber(o) {
  return typeof o === "number";
}
function isInteger(o) {
  return typeof o === "number" && o % 1 === 0;
}
function isString(o) {
  return typeof o === "string";
}
function isDate(o) {
  return Object.prototype.toString.call(o) === "[object Date]";
} // CAPABILITIES

function hasRelative() {
  try {
    return typeof Intl !== "undefined" && !!Intl.RelativeTimeFormat;
  } catch (e) {
    return false;
  }
} // OBJECTS AND ARRAYS

function maybeArray(thing) {
  return Array.isArray(thing) ? thing : [thing];
}
function bestBy(arr, by, compare) {
  if (arr.length === 0) {
    return undefined;
  }

  return arr.reduce(function (best, next) {
    var pair = [by(next), next];

    if (!best) {
      return pair;
    } else if (compare(best[0], pair[0]) === best[0]) {
      return best;
    } else {
      return pair;
    }
  }, null)[1];
}
function pick(obj, keys) {
  return keys.reduce(function (a, k) {
    a[k] = obj[k];
    return a;
  }, {});
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
} // NUMBERS AND STRINGS

function integerBetween(thing, bottom, top) {
  return isInteger(thing) && thing >= bottom && thing <= top;
} // x % n but takes the sign of n instead of x

function floorMod(x, n) {
  return x - n * Math.floor(x / n);
}
function padStart(input, n) {
  if (n === void 0) {
    n = 2;
  }

  var minus = input < 0 ? "-" : "";
  var target = minus ? input * -1 : input;
  var result;

  if (target.toString().length < n) {
    result = ("0".repeat(n) + target).slice(-n);
  } else {
    result = target.toString();
  }

  return "" + minus + result;
}
function parseInteger(string) {
  if (isUndefined(string) || string === null || string === "") {
    return undefined;
  } else {
    return parseInt(string, 10);
  }
}
function parseMillis(fraction) {
  // Return undefined (instead of 0) in these cases, where fraction is not set
  if (isUndefined(fraction) || fraction === null || fraction === "") {
    return undefined;
  } else {
    var f = parseFloat("0." + fraction) * 1000;
    return Math.floor(f);
  }
}
function roundTo(number, digits, towardZero) {
  if (towardZero === void 0) {
    towardZero = false;
  }

  var factor = Math.pow(10, digits),
      rounder = towardZero ? Math.trunc : Math.round;
  return rounder(number * factor) / factor;
} // DATE BASICS

function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}
function daysInMonth(year, month) {
  var modMonth = floorMod(month - 1, 12) + 1,
      modYear = year + (month - modMonth) / 12;

  if (modMonth === 2) {
    return isLeapYear(modYear) ? 29 : 28;
  } else {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
  }
} // covert a calendar object to a local timestamp (epoch, but with the offset baked in)

function objToLocalTS(obj) {
  var d = Date.UTC(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute, obj.second, obj.millisecond); // for legacy reasons, years between 0 and 99 are interpreted as 19XX; revert that

  if (obj.year < 100 && obj.year >= 0) {
    d = new Date(d);
    d.setUTCFullYear(d.getUTCFullYear() - 1900);
  }

  return +d;
}
function weeksInWeekYear(weekYear) {
  var p1 = (weekYear + Math.floor(weekYear / 4) - Math.floor(weekYear / 100) + Math.floor(weekYear / 400)) % 7,
      last = weekYear - 1,
      p2 = (last + Math.floor(last / 4) - Math.floor(last / 100) + Math.floor(last / 400)) % 7;
  return p1 === 4 || p2 === 3 ? 53 : 52;
}
function untruncateYear(year) {
  if (year > 99) {
    return year;
  } else return year > 60 ? 1900 + year : 2000 + year;
} // PARSING

function parseZoneInfo(ts, offsetFormat, locale, timeZone) {
  if (timeZone === void 0) {
    timeZone = null;
  }

  var date = new Date(ts),
      intlOpts = {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };

  if (timeZone) {
    intlOpts.timeZone = timeZone;
  }

  var modified = _extends({
    timeZoneName: offsetFormat
  }, intlOpts);

  var parsed = new Intl.DateTimeFormat(locale, modified).formatToParts(date).find(function (m) {
    return m.type.toLowerCase() === "timezonename";
  });
  return parsed ? parsed.value : null;
} // signedOffset('-5', '30') -> -330

function signedOffset(offHourStr, offMinuteStr) {
  var offHour = parseInt(offHourStr, 10); // don't || this because we want to preserve -0

  if (Number.isNaN(offHour)) {
    offHour = 0;
  }

  var offMin = parseInt(offMinuteStr, 10) || 0,
      offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
  return offHour * 60 + offMinSigned;
} // COERCION

function asNumber(value) {
  var numericValue = Number(value);
  if (typeof value === "boolean" || value === "" || Number.isNaN(numericValue)) throw new InvalidArgumentError("Invalid unit value " + value);
  return numericValue;
}
function normalizeObject(obj, normalizer) {
  var normalized = {};

  for (var u in obj) {
    if (hasOwnProperty(obj, u)) {
      var v = obj[u];
      if (v === undefined || v === null) continue;
      normalized[normalizer(u)] = asNumber(v);
    }
  }

  return normalized;
}
function formatOffset(offset, format) {
  var hours = Math.trunc(Math.abs(offset / 60)),
      minutes = Math.trunc(Math.abs(offset % 60)),
      sign = offset >= 0 ? "+" : "-";

  switch (format) {
    case "short":
      return "" + sign + padStart(hours, 2) + ":" + padStart(minutes, 2);

    case "narrow":
      return "" + sign + hours + (minutes > 0 ? ":" + minutes : "");

    case "techie":
      return "" + sign + padStart(hours, 2) + padStart(minutes, 2);

    default:
      throw new RangeError("Value format " + format + " is out of range for property format");
  }
}
function timeObject(obj) {
  return pick(obj, ["hour", "minute", "second", "millisecond"]);
}
var ianaRegex = /[A-Za-z_+-]{1,256}(:?\/[A-Za-z_+-]{1,256}(\/[A-Za-z_+-]{1,256})?)?/;

/**
 * @private
 */


var monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function months(length) {
  switch (length) {
    case "narrow":
      return [].concat(monthsNarrow);

    case "short":
      return [].concat(monthsShort);

    case "long":
      return [].concat(monthsLong);

    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    default:
      return null;
  }
}
var weekdaysLong = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];
function weekdays(length) {
  switch (length) {
    case "narrow":
      return [].concat(weekdaysNarrow);

    case "short":
      return [].concat(weekdaysShort);

    case "long":
      return [].concat(weekdaysLong);

    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];

    default:
      return null;
  }
}
var meridiems = ["AM", "PM"];
var erasLong = ["Before Christ", "Anno Domini"];
var erasShort = ["BC", "AD"];
var erasNarrow = ["B", "A"];
function eras(length) {
  switch (length) {
    case "narrow":
      return [].concat(erasNarrow);

    case "short":
      return [].concat(erasShort);

    case "long":
      return [].concat(erasLong);

    default:
      return null;
  }
}
function meridiemForDateTime(dt) {
  return meridiems[dt.hour < 12 ? 0 : 1];
}
function weekdayForDateTime(dt, length) {
  return weekdays(length)[dt.weekday - 1];
}
function monthForDateTime(dt, length) {
  return months(length)[dt.month - 1];
}
function eraForDateTime(dt, length) {
  return eras(length)[dt.year < 0 ? 0 : 1];
}
function formatRelativeTime(unit, count, numeric, narrow) {
  if (numeric === void 0) {
    numeric = "always";
  }

  if (narrow === void 0) {
    narrow = false;
  }

  var units = {
    years: ["year", "yr."],
    quarters: ["quarter", "qtr."],
    months: ["month", "mo."],
    weeks: ["week", "wk."],
    days: ["day", "day", "days"],
    hours: ["hour", "hr."],
    minutes: ["minute", "min."],
    seconds: ["second", "sec."]
  };
  var lastable = ["hours", "minutes", "seconds"].indexOf(unit) === -1;

  if (numeric === "auto" && lastable) {
    var isDay = unit === "days";

    switch (count) {
      case 1:
        return isDay ? "tomorrow" : "next " + units[unit][0];

      case -1:
        return isDay ? "yesterday" : "last " + units[unit][0];

      case 0:
        return isDay ? "today" : "this " + units[unit][0];

    }
  }

  var isInPast = Object.is(count, -0) || count < 0,
      fmtValue = Math.abs(count),
      singular = fmtValue === 1,
      lilUnits = units[unit],
      fmtUnit = narrow ? singular ? lilUnits[1] : lilUnits[2] || lilUnits[1] : singular ? units[unit][0] : unit;
  return isInPast ? fmtValue + " " + fmtUnit + " ago" : "in " + fmtValue + " " + fmtUnit;
}

function stringifyTokens(splits, tokenToString) {
  var s = "";

  for (var _iterator = _createForOfIteratorHelperLoose(splits), _step; !(_step = _iterator()).done;) {
    var token = _step.value;

    if (token.literal) {
      s += token.val;
    } else {
      s += tokenToString(token.val);
    }
  }

  return s;
}

var _macroTokenToFormatOpts = {
  D: DATE_SHORT,
  DD: DATE_MED,
  DDD: DATE_FULL,
  DDDD: DATE_HUGE,
  t: TIME_SIMPLE,
  tt: TIME_WITH_SECONDS,
  ttt: TIME_WITH_SHORT_OFFSET,
  tttt: TIME_WITH_LONG_OFFSET,
  T: TIME_24_SIMPLE,
  TT: TIME_24_WITH_SECONDS,
  TTT: TIME_24_WITH_SHORT_OFFSET,
  TTTT: TIME_24_WITH_LONG_OFFSET,
  f: DATETIME_SHORT,
  ff: DATETIME_MED,
  fff: DATETIME_FULL,
  ffff: DATETIME_HUGE,
  F: DATETIME_SHORT_WITH_SECONDS,
  FF: DATETIME_MED_WITH_SECONDS,
  FFF: DATETIME_FULL_WITH_SECONDS,
  FFFF: DATETIME_HUGE_WITH_SECONDS
};
/**
 * @private
 */

var Formatter = /*#__PURE__*/function () {
  Formatter.create = function create(locale, opts) {
    if (opts === void 0) {
      opts = {};
    }

    return new Formatter(locale, opts);
  };

  Formatter.parseFormat = function parseFormat(fmt) {
    var current = null,
        currentFull = "",
        bracketed = false;
    var splits = [];

    for (var i = 0; i < fmt.length; i++) {
      var c = fmt.charAt(i);

      if (c === "'") {
        if (currentFull.length > 0) {
          splits.push({
            literal: bracketed,
            val: currentFull
          });
        }

        current = null;
        currentFull = "";
        bracketed = !bracketed;
      } else if (bracketed) {
        currentFull += c;
      } else if (c === current) {
        currentFull += c;
      } else {
        if (currentFull.length > 0) {
          splits.push({
            literal: false,
            val: currentFull
          });
        }

        currentFull = c;
        current = c;
      }
    }

    if (currentFull.length > 0) {
      splits.push({
        literal: bracketed,
        val: currentFull
      });
    }

    return splits;
  };

  Formatter.macroTokenToFormatOpts = function macroTokenToFormatOpts(token) {
    return _macroTokenToFormatOpts[token];
  };

  function Formatter(locale, formatOpts) {
    this.opts = formatOpts;
    this.loc = locale;
    this.systemLoc = null;
  }

  var _proto = Formatter.prototype;

  _proto.formatWithSystemDefault = function formatWithSystemDefault(dt, opts) {
    if (this.systemLoc === null) {
      this.systemLoc = this.loc.redefaultToSystem();
    }

    var df = this.systemLoc.dtFormatter(dt, _extends({}, this.opts, opts));
    return df.format();
  };

  _proto.formatDateTime = function formatDateTime(dt, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var df = this.loc.dtFormatter(dt, _extends({}, this.opts, opts));
    return df.format();
  };

  _proto.formatDateTimeParts = function formatDateTimeParts(dt, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var df = this.loc.dtFormatter(dt, _extends({}, this.opts, opts));
    return df.formatToParts();
  };

  _proto.resolvedOptions = function resolvedOptions(dt, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var df = this.loc.dtFormatter(dt, _extends({}, this.opts, opts));
    return df.resolvedOptions();
  };

  _proto.num = function num(n, p) {
    if (p === void 0) {
      p = 0;
    }

    // we get some perf out of doing this here, annoyingly
    if (this.opts.forceSimple) {
      return padStart(n, p);
    }

    var opts = _extends({}, this.opts);

    if (p > 0) {
      opts.padTo = p;
    }

    return this.loc.numberFormatter(opts).format(n);
  };

  _proto.formatDateTimeFromString = function formatDateTimeFromString(dt, fmt) {
    var _this = this;

    var knownEnglish = this.loc.listingMode() === "en",
        useDateTimeFormatter = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory",
        string = function string(opts, extract) {
      return _this.loc.extract(dt, opts, extract);
    },
        formatOffset = function formatOffset(opts) {
      if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
        return "Z";
      }

      return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
    },
        meridiem = function meridiem() {
      return knownEnglish ? meridiemForDateTime(dt) : string({
        hour: "numeric",
        hourCycle: "h12"
      }, "dayperiod");
    },
        month = function month(length, standalone) {
      return knownEnglish ? monthForDateTime(dt, length) : string(standalone ? {
        month: length
      } : {
        month: length,
        day: "numeric"
      }, "month");
    },
        weekday = function weekday(length, standalone) {
      return knownEnglish ? weekdayForDateTime(dt, length) : string(standalone ? {
        weekday: length
      } : {
        weekday: length,
        month: "long",
        day: "numeric"
      }, "weekday");
    },
        maybeMacro = function maybeMacro(token) {
      var formatOpts = Formatter.macroTokenToFormatOpts(token);

      if (formatOpts) {
        return _this.formatWithSystemDefault(dt, formatOpts);
      } else {
        return token;
      }
    },
        era = function era(length) {
      return knownEnglish ? eraForDateTime(dt, length) : string({
        era: length
      }, "era");
    },
        tokenToString = function tokenToString(token) {
      // Where possible: http://cldr.unicode.org/translation/date-time-1/date-time#TOC-Standalone-vs.-Format-Styles
      switch (token) {
        // ms
        case "S":
          return _this.num(dt.millisecond);

        case "u": // falls through

        case "SSS":
          return _this.num(dt.millisecond, 3);
        // seconds

        case "s":
          return _this.num(dt.second);

        case "ss":
          return _this.num(dt.second, 2);
        // minutes

        case "m":
          return _this.num(dt.minute);

        case "mm":
          return _this.num(dt.minute, 2);
        // hours

        case "h":
          return _this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);

        case "hh":
          return _this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);

        case "H":
          return _this.num(dt.hour);

        case "HH":
          return _this.num(dt.hour, 2);
        // offset

        case "Z":
          // like +6
          return formatOffset({
            format: "narrow",
            allowZ: _this.opts.allowZ
          });

        case "ZZ":
          // like +06:00
          return formatOffset({
            format: "short",
            allowZ: _this.opts.allowZ
          });

        case "ZZZ":
          // like +0600
          return formatOffset({
            format: "techie",
            allowZ: _this.opts.allowZ
          });

        case "ZZZZ":
          // like EST
          return dt.zone.offsetName(dt.ts, {
            format: "short",
            locale: _this.loc.locale
          });

        case "ZZZZZ":
          // like Eastern Standard Time
          return dt.zone.offsetName(dt.ts, {
            format: "long",
            locale: _this.loc.locale
          });
        // zone

        case "z":
          // like America/New_York
          return dt.zoneName;
        // meridiems

        case "a":
          return meridiem();
        // dates

        case "d":
          return useDateTimeFormatter ? string({
            day: "numeric"
          }, "day") : _this.num(dt.day);

        case "dd":
          return useDateTimeFormatter ? string({
            day: "2-digit"
          }, "day") : _this.num(dt.day, 2);
        // weekdays - standalone

        case "c":
          // like 1
          return _this.num(dt.weekday);

        case "ccc":
          // like 'Tues'
          return weekday("short", true);

        case "cccc":
          // like 'Tuesday'
          return weekday("long", true);

        case "ccccc":
          // like 'T'
          return weekday("narrow", true);
        // weekdays - format

        case "E":
          // like 1
          return _this.num(dt.weekday);

        case "EEE":
          // like 'Tues'
          return weekday("short", false);

        case "EEEE":
          // like 'Tuesday'
          return weekday("long", false);

        case "EEEEE":
          // like 'T'
          return weekday("narrow", false);
        // months - standalone

        case "L":
          // like 1
          return useDateTimeFormatter ? string({
            month: "numeric",
            day: "numeric"
          }, "month") : _this.num(dt.month);

        case "LL":
          // like 01, doesn't seem to work
          return useDateTimeFormatter ? string({
            month: "2-digit",
            day: "numeric"
          }, "month") : _this.num(dt.month, 2);

        case "LLL":
          // like Jan
          return month("short", true);

        case "LLLL":
          // like January
          return month("long", true);

        case "LLLLL":
          // like J
          return month("narrow", true);
        // months - format

        case "M":
          // like 1
          return useDateTimeFormatter ? string({
            month: "numeric"
          }, "month") : _this.num(dt.month);

        case "MM":
          // like 01
          return useDateTimeFormatter ? string({
            month: "2-digit"
          }, "month") : _this.num(dt.month, 2);

        case "MMM":
          // like Jan
          return month("short", false);

        case "MMMM":
          // like January
          return month("long", false);

        case "MMMMM":
          // like J
          return month("narrow", false);
        // years

        case "y":
          // like 2014
          return useDateTimeFormatter ? string({
            year: "numeric"
          }, "year") : _this.num(dt.year);

        case "yy":
          // like 14
          return useDateTimeFormatter ? string({
            year: "2-digit"
          }, "year") : _this.num(dt.year.toString().slice(-2), 2);

        case "yyyy":
          // like 0012
          return useDateTimeFormatter ? string({
            year: "numeric"
          }, "year") : _this.num(dt.year, 4);

        case "yyyyyy":
          // like 000012
          return useDateTimeFormatter ? string({
            year: "numeric"
          }, "year") : _this.num(dt.year, 6);
        // eras

        case "G":
          // like AD
          return era("short");

        case "GG":
          // like Anno Domini
          return era("long");

        case "GGGGG":
          return era("narrow");

        case "kk":
          return _this.num(dt.weekYear.toString().slice(-2), 2);

        case "kkkk":
          return _this.num(dt.weekYear, 4);

        case "W":
          return _this.num(dt.weekNumber);

        case "WW":
          return _this.num(dt.weekNumber, 2);

        case "o":
          return _this.num(dt.ordinal);

        case "ooo":
          return _this.num(dt.ordinal, 3);

        case "q":
          // like 1
          return _this.num(dt.quarter);

        case "qq":
          // like 01
          return _this.num(dt.quarter, 2);

        case "X":
          return _this.num(Math.floor(dt.ts / 1000));

        case "x":
          return _this.num(dt.ts);

        default:
          return maybeMacro(token);
      }
    };

    return stringifyTokens(Formatter.parseFormat(fmt), tokenToString);
  };

  _proto.formatDurationFromString = function formatDurationFromString(dur, fmt) {
    var _this2 = this;

    var tokenToField = function tokenToField(token) {
      switch (token[0]) {
        case "S":
          return "millisecond";

        case "s":
          return "second";

        case "m":
          return "minute";

        case "h":
          return "hour";

        case "d":
          return "day";

        case "M":
          return "month";

        case "y":
          return "year";

        default:
          return null;
      }
    },
        tokenToString = function tokenToString(lildur) {
      return function (token) {
        var mapped = tokenToField(token);

        if (mapped) {
          return _this2.num(lildur.get(mapped), token.length);
        } else {
          return token;
        }
      };
    },
        tokens = Formatter.parseFormat(fmt),
        realTokens = tokens.reduce(function (found, _ref) {
      var literal = _ref.literal,
          val = _ref.val;
      return literal ? found : found.concat(val);
    }, []),
        collapsed = dur.shiftTo.apply(dur, realTokens.map(tokenToField).filter(function (t) {
      return t;
    }));

    return stringifyTokens(tokens, tokenToString(collapsed));
  };

  return Formatter;
}();

var Invalid = /*#__PURE__*/function () {
  function Invalid(reason, explanation) {
    this.reason = reason;
    this.explanation = explanation;
  }

  var _proto = Invalid.prototype;

  _proto.toMessage = function toMessage() {
    if (this.explanation) {
      return this.reason + ": " + this.explanation;
    } else {
      return this.reason;
    }
  };

  return Invalid;
}();

/**
 * @interface
 */

var Zone = /*#__PURE__*/function () {
  function Zone() {}

  var _proto = Zone.prototype;

  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  _proto.offsetName = function offsetName(ts, opts) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Returns the offset's value as a string
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  ;

  _proto.formatOffset = function formatOffset(ts, format) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  ;

  _proto.offset = function offset(ts) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  ;

  _proto.equals = function equals(otherZone) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  ;

  _createClass(Zone, [{
    key: "type",
    get:
    /**
     * The type of zone
     * @abstract
     * @type {string}
     */
    function get() {
      throw new ZoneIsAbstractError();
    }
    /**
     * The name of this zone.
     * @abstract
     * @type {string}
     */

  }, {
    key: "name",
    get: function get() {
      throw new ZoneIsAbstractError();
    }
    /**
     * Returns whether the offset is known to be fixed for the whole year.
     * @abstract
     * @type {boolean}
     */

  }, {
    key: "isUniversal",
    get: function get() {
      throw new ZoneIsAbstractError();
    }
  }, {
    key: "isValid",
    get: function get() {
      throw new ZoneIsAbstractError();
    }
  }]);

  return Zone;
}();

var singleton$1 = null;
/**
 * Represents the local zone for this JavaScript environment.
 * @implements {Zone}
 */

var SystemZone = /*#__PURE__*/function (_Zone) {
  _inheritsLoose(SystemZone, _Zone);

  function SystemZone() {
    return _Zone.apply(this, arguments) || this;
  }

  var _proto = SystemZone.prototype;

  /** @override **/
  _proto.offsetName = function offsetName(ts, _ref) {
    var format = _ref.format,
        locale = _ref.locale;
    return parseZoneInfo(ts, format, locale);
  }
  /** @override **/
  ;

  _proto.formatOffset = function formatOffset$1(ts, format) {
    return formatOffset(this.offset(ts), format);
  }
  /** @override **/
  ;

  _proto.offset = function offset(ts) {
    return -new Date(ts).getTimezoneOffset();
  }
  /** @override **/
  ;

  _proto.equals = function equals(otherZone) {
    return otherZone.type === "system";
  }
  /** @override **/
  ;

  _createClass(SystemZone, [{
    key: "type",
    get:
    /** @override **/
    function get() {
      return "system";
    }
    /** @override **/

  }, {
    key: "name",
    get: function get() {
      return new Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    /** @override **/

  }, {
    key: "isUniversal",
    get: function get() {
      return false;
    }
  }, {
    key: "isValid",
    get: function get() {
      return true;
    }
  }], [{
    key: "instance",
    get:
    /**
     * Get a singleton instance of the local zone
     * @return {SystemZone}
     */
    function get() {
      if (singleton$1 === null) {
        singleton$1 = new SystemZone();
      }

      return singleton$1;
    }
  }]);

  return SystemZone;
}(Zone);

var matchingRegex = RegExp("^" + ianaRegex.source + "$");
var dtfCache = {};

function makeDTF(zone) {
  if (!dtfCache[zone]) {
    dtfCache[zone] = new Intl.DateTimeFormat("en-US", {
      hourCycle: "h23",
      timeZone: zone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }

  return dtfCache[zone];
}

var typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};

function hackyOffset(dtf, date) {
  var formatted = dtf.format(date).replace(/\u200E/g, ""),
      parsed = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(formatted),
      fMonth = parsed[1],
      fDay = parsed[2],
      fYear = parsed[3],
      fHour = parsed[4],
      fMinute = parsed[5],
      fSecond = parsed[6];
  return [fYear, fMonth, fDay, fHour, fMinute, fSecond];
}

function partsOffset(dtf, date) {
  var formatted = dtf.formatToParts(date),
      filled = [];

  for (var i = 0; i < formatted.length; i++) {
    var _formatted$i = formatted[i],
        type = _formatted$i.type,
        value = _formatted$i.value,
        pos = typeToPos[type];

    if (!isUndefined(pos)) {
      filled[pos] = parseInt(value, 10);
    }
  }

  return filled;
}

var ianaZoneCache = {};
/**
 * A zone identified by an IANA identifier, like America/New_York
 * @implements {Zone}
 */

var IANAZone = /*#__PURE__*/function (_Zone) {
  _inheritsLoose(IANAZone, _Zone);

  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  IANAZone.create = function create(name) {
    if (!ianaZoneCache[name]) {
      ianaZoneCache[name] = new IANAZone(name);
    }

    return ianaZoneCache[name];
  }
  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  ;

  IANAZone.resetCache = function resetCache() {
    ianaZoneCache = {};
    dtfCache = {};
  }
  /**
   * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
   * @param {string} s - The string to check validity on
   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
   * @example IANAZone.isValidSpecifier("Fantasia/Castle") //=> true
   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
   * @return {boolean}
   */
  ;

  IANAZone.isValidSpecifier = function isValidSpecifier(s) {
    return !!(s && s.match(matchingRegex));
  }
  /**
   * Returns whether the provided string identifies a real zone
   * @param {string} zone - The string to check
   * @example IANAZone.isValidZone("America/New_York") //=> true
   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
   * @return {boolean}
   */
  ;

  IANAZone.isValidZone = function isValidZone(zone) {
    try {
      new Intl.DateTimeFormat("en-US", {
        timeZone: zone
      }).format();
      return true;
    } catch (e) {
      return false;
    }
  } // Etc/GMT+8 -> -480

  /** @ignore */
  ;

  IANAZone.parseGMTOffset = function parseGMTOffset(specifier) {
    if (specifier) {
      var match = specifier.match(/^Etc\/GMT(0|[+-]\d{1,2})$/i);

      if (match) {
        return -60 * parseInt(match[1]);
      }
    }

    return null;
  };

  function IANAZone(name) {
    var _this;

    _this = _Zone.call(this) || this;
    /** @private **/

    _this.zoneName = name;
    /** @private **/

    _this.valid = IANAZone.isValidZone(name);
    return _this;
  }
  /** @override **/


  var _proto = IANAZone.prototype;

  /** @override **/
  _proto.offsetName = function offsetName(ts, _ref) {
    var format = _ref.format,
        locale = _ref.locale;
    return parseZoneInfo(ts, format, locale, this.name);
  }
  /** @override **/
  ;

  _proto.formatOffset = function formatOffset$1(ts, format) {
    return formatOffset(this.offset(ts), format);
  }
  /** @override **/
  ;

  _proto.offset = function offset(ts) {
    var date = new Date(ts);
    if (isNaN(date)) return NaN;

    var dtf = makeDTF(this.name),
        _ref2 = dtf.formatToParts ? partsOffset(dtf, date) : hackyOffset(dtf, date),
        year = _ref2[0],
        month = _ref2[1],
        day = _ref2[2],
        hour = _ref2[3],
        minute = _ref2[4],
        second = _ref2[5];

    var asUTC = objToLocalTS({
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
      second: second,
      millisecond: 0
    });
    var asTS = +date;
    var over = asTS % 1000;
    asTS -= over >= 0 ? over : 1000 + over;
    return (asUTC - asTS) / (60 * 1000);
  }
  /** @override **/
  ;

  _proto.equals = function equals(otherZone) {
    return otherZone.type === "iana" && otherZone.name === this.name;
  }
  /** @override **/
  ;

  _createClass(IANAZone, [{
    key: "type",
    get: function get() {
      return "iana";
    }
    /** @override **/

  }, {
    key: "name",
    get: function get() {
      return this.zoneName;
    }
    /** @override **/

  }, {
    key: "isUniversal",
    get: function get() {
      return false;
    }
  }, {
    key: "isValid",
    get: function get() {
      return this.valid;
    }
  }]);

  return IANAZone;
}(Zone);

var singleton = null;
/**
 * A zone with a fixed offset (meaning no DST)
 * @implements {Zone}
 */

var FixedOffsetZone = /*#__PURE__*/function (_Zone) {
  _inheritsLoose(FixedOffsetZone, _Zone);

  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  FixedOffsetZone.instance = function instance(offset) {
    return offset === 0 ? FixedOffsetZone.utcInstance : new FixedOffsetZone(offset);
  }
  /**
   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
   * @param {string} s - The offset string to parse
   * @example FixedOffsetZone.parseSpecifier("UTC+6")
   * @example FixedOffsetZone.parseSpecifier("UTC+06")
   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
   * @return {FixedOffsetZone}
   */
  ;

  FixedOffsetZone.parseSpecifier = function parseSpecifier(s) {
    if (s) {
      var r = s.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);

      if (r) {
        return new FixedOffsetZone(signedOffset(r[1], r[2]));
      }
    }

    return null;
  };

  function FixedOffsetZone(offset) {
    var _this;

    _this = _Zone.call(this) || this;
    /** @private **/

    _this.fixed = offset;
    return _this;
  }
  /** @override **/


  var _proto = FixedOffsetZone.prototype;

  /** @override **/
  _proto.offsetName = function offsetName() {
    return this.name;
  }
  /** @override **/
  ;

  _proto.formatOffset = function formatOffset$1(ts, format) {
    return formatOffset(this.fixed, format);
  }
  /** @override **/
  ;

  /** @override **/
  _proto.offset = function offset() {
    return this.fixed;
  }
  /** @override **/
  ;

  _proto.equals = function equals(otherZone) {
    return otherZone.type === "fixed" && otherZone.fixed === this.fixed;
  }
  /** @override **/
  ;

  _createClass(FixedOffsetZone, [{
    key: "type",
    get: function get() {
      return "fixed";
    }
    /** @override **/

  }, {
    key: "name",
    get: function get() {
      return this.fixed === 0 ? "UTC" : "UTC" + formatOffset(this.fixed, "narrow");
    }
  }, {
    key: "isUniversal",
    get: function get() {
      return true;
    }
  }, {
    key: "isValid",
    get: function get() {
      return true;
    }
  }], [{
    key: "utcInstance",
    get:
    /**
     * Get a singleton instance of UTC
     * @return {FixedOffsetZone}
     */
    function get() {
      if (singleton === null) {
        singleton = new FixedOffsetZone(0);
      }

      return singleton;
    }
  }]);

  return FixedOffsetZone;
}(Zone);

/**
 * A zone that failed to parse. You should never need to instantiate this.
 * @implements {Zone}
 */

var InvalidZone = /*#__PURE__*/function (_Zone) {
  _inheritsLoose(InvalidZone, _Zone);

  function InvalidZone(zoneName) {
    var _this;

    _this = _Zone.call(this) || this;
    /**  @private */

    _this.zoneName = zoneName;
    return _this;
  }
  /** @override **/


  var _proto = InvalidZone.prototype;

  /** @override **/
  _proto.offsetName = function offsetName() {
    return null;
  }
  /** @override **/
  ;

  _proto.formatOffset = function formatOffset() {
    return "";
  }
  /** @override **/
  ;

  _proto.offset = function offset() {
    return NaN;
  }
  /** @override **/
  ;

  _proto.equals = function equals() {
    return false;
  }
  /** @override **/
  ;

  _createClass(InvalidZone, [{
    key: "type",
    get: function get() {
      return "invalid";
    }
    /** @override **/

  }, {
    key: "name",
    get: function get() {
      return this.zoneName;
    }
    /** @override **/

  }, {
    key: "isUniversal",
    get: function get() {
      return false;
    }
  }, {
    key: "isValid",
    get: function get() {
      return false;
    }
  }]);

  return InvalidZone;
}(Zone);

/**
 * @private
 */
function normalizeZone(input, defaultZone) {
  var offset;

  if (isUndefined(input) || input === null) {
    return defaultZone;
  } else if (input instanceof Zone) {
    return input;
  } else if (isString(input)) {
    var lowered = input.toLowerCase();
    if (lowered === "local" || lowered === "system") return defaultZone;else if (lowered === "utc" || lowered === "gmt") return FixedOffsetZone.utcInstance;else if ((offset = IANAZone.parseGMTOffset(input)) != null) {
      // handle Etc/GMT-4, which V8 chokes on
      return FixedOffsetZone.instance(offset);
    } else if (IANAZone.isValidSpecifier(lowered)) return IANAZone.create(input);else return FixedOffsetZone.parseSpecifier(lowered) || new InvalidZone(input);
  } else if (isNumber(input)) {
    return FixedOffsetZone.instance(input);
  } else if (typeof input === "object" && input.offset && typeof input.offset === "number") {
    // This is dumb, but the instanceof check above doesn't seem to really work
    // so we're duck checking it
    return input;
  } else {
    return new InvalidZone(input);
  }
}

var now = function now() {
  return Date.now();
},
    defaultZone = "system",
    defaultLocale = null,
    defaultNumberingSystem = null,
    defaultOutputCalendar = null,
    throwOnInvalid;
/**
 * Settings contains static getters and setters that control Luxon's overall behavior. Luxon is a simple library with few options, but the ones it does have live here.
 */


var Settings = /*#__PURE__*/function () {
  function Settings() {}

  /**
   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  Settings.resetCaches = function resetCaches() {
    Locale.resetCache();
    IANAZone.resetCache();
  };

  _createClass(Settings, null, [{
    key: "now",
    get:
    /**
     * Get the callback for returning the current timestamp.
     * @type {function}
     */
    function get() {
      return now;
    }
    /**
     * Set the callback for returning the current timestamp.
     * The function should return a number, which will be interpreted as an Epoch millisecond count
     * @type {function}
     * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
     * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
     */
    ,
    set: function set(n) {
      now = n;
    }
    /**
     * Set the default time zone to create DateTimes in. Does not affect existing instances.
     * Use the value "system" to reset this value to the system's time zone.
     * @type {string}
     */

  }, {
    key: "defaultZone",
    get:
    /**
     * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
     * The default value is the system's time zone (the one set on the machine that runs this code).
     * @type {Zone}
     */
    function get() {
      return normalizeZone(defaultZone, SystemZone.instance);
    }
    /**
     * Get the default locale to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    ,
    set: function set(zone) {
      defaultZone = zone;
    }
  }, {
    key: "defaultLocale",
    get: function get() {
      return defaultLocale;
    }
    /**
     * Set the default locale to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    ,
    set: function set(locale) {
      defaultLocale = locale;
    }
    /**
     * Get the default numbering system to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */

  }, {
    key: "defaultNumberingSystem",
    get: function get() {
      return defaultNumberingSystem;
    }
    /**
     * Set the default numbering system to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    ,
    set: function set(numberingSystem) {
      defaultNumberingSystem = numberingSystem;
    }
    /**
     * Get the default output calendar to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */

  }, {
    key: "defaultOutputCalendar",
    get: function get() {
      return defaultOutputCalendar;
    }
    /**
     * Set the default output calendar to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    ,
    set: function set(outputCalendar) {
      defaultOutputCalendar = outputCalendar;
    }
    /**
     * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
     * @type {boolean}
     */

  }, {
    key: "throwOnInvalid",
    get: function get() {
      return throwOnInvalid;
    }
    /**
     * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
     * @type {boolean}
     */
    ,
    set: function set(t) {
      throwOnInvalid = t;
    }
  }]);

  return Settings;
}();

var _excluded = ["base"];
var intlDTCache = {};

function getCachedDTF(locString, opts) {
  if (opts === void 0) {
    opts = {};
  }

  var key = JSON.stringify([locString, opts]);
  var dtf = intlDTCache[key];

  if (!dtf) {
    dtf = new Intl.DateTimeFormat(locString, opts);
    intlDTCache[key] = dtf;
  }

  return dtf;
}

var intlNumCache = {};

function getCachedINF(locString, opts) {
  if (opts === void 0) {
    opts = {};
  }

  var key = JSON.stringify([locString, opts]);
  var inf = intlNumCache[key];

  if (!inf) {
    inf = new Intl.NumberFormat(locString, opts);
    intlNumCache[key] = inf;
  }

  return inf;
}

var intlRelCache = {};

function getCachedRTF(locString, opts) {
  if (opts === void 0) {
    opts = {};
  }

  var _opts = opts;
      _opts.base;
      var cacheKeyOpts = _objectWithoutPropertiesLoose(_opts, _excluded); // exclude `base` from the options


  var key = JSON.stringify([locString, cacheKeyOpts]);
  var inf = intlRelCache[key];

  if (!inf) {
    inf = new Intl.RelativeTimeFormat(locString, opts);
    intlRelCache[key] = inf;
  }

  return inf;
}

var sysLocaleCache = null;

function systemLocale() {
  if (sysLocaleCache) {
    return sysLocaleCache;
  } else {
    sysLocaleCache = new Intl.DateTimeFormat().resolvedOptions().locale;
    return sysLocaleCache;
  }
}

function parseLocaleString(localeStr) {
  // I really want to avoid writing a BCP 47 parser
  // see, e.g. https://github.com/wooorm/bcp-47
  // Instead, we'll do this:
  // a) if the string has no -u extensions, just leave it alone
  // b) if it does, use Intl to resolve everything
  // c) if Intl fails, try again without the -u
  var uIndex = localeStr.indexOf("-u-");

  if (uIndex === -1) {
    return [localeStr];
  } else {
    var options;
    var smaller = localeStr.substring(0, uIndex);

    try {
      options = getCachedDTF(localeStr).resolvedOptions();
    } catch (e) {
      options = getCachedDTF(smaller).resolvedOptions();
    }

    var _options = options,
        numberingSystem = _options.numberingSystem,
        calendar = _options.calendar; // return the smaller one so that we can append the calendar and numbering overrides to it

    return [smaller, numberingSystem, calendar];
  }
}

function intlConfigString(localeStr, numberingSystem, outputCalendar) {
  if (outputCalendar || numberingSystem) {
    localeStr += "-u";

    if (outputCalendar) {
      localeStr += "-ca-" + outputCalendar;
    }

    if (numberingSystem) {
      localeStr += "-nu-" + numberingSystem;
    }

    return localeStr;
  } else {
    return localeStr;
  }
}

function mapMonths(f) {
  var ms = [];

  for (var i = 1; i <= 12; i++) {
    var dt = DateTime.utc(2016, i, 1);
    ms.push(f(dt));
  }

  return ms;
}

function mapWeekdays(f) {
  var ms = [];

  for (var i = 1; i <= 7; i++) {
    var dt = DateTime.utc(2016, 11, 13 + i);
    ms.push(f(dt));
  }

  return ms;
}

function listStuff(loc, length, defaultOK, englishFn, intlFn) {
  var mode = loc.listingMode(defaultOK);

  if (mode === "error") {
    return null;
  } else if (mode === "en") {
    return englishFn(length);
  } else {
    return intlFn(length);
  }
}

function supportsFastNumbers(loc) {
  if (loc.numberingSystem && loc.numberingSystem !== "latn") {
    return false;
  } else {
    return loc.numberingSystem === "latn" || !loc.locale || loc.locale.startsWith("en") || new Intl.DateTimeFormat(loc.intl).resolvedOptions().numberingSystem === "latn";
  }
}
/**
 * @private
 */


var PolyNumberFormatter = /*#__PURE__*/function () {
  function PolyNumberFormatter(intl, forceSimple, opts) {
    this.padTo = opts.padTo || 0;
    this.floor = opts.floor || false;

    if (!forceSimple) {
      var intlOpts = {
        useGrouping: false
      };
      if (opts.padTo > 0) intlOpts.minimumIntegerDigits = opts.padTo;
      this.inf = getCachedINF(intl, intlOpts);
    }
  }

  var _proto = PolyNumberFormatter.prototype;

  _proto.format = function format(i) {
    if (this.inf) {
      var fixed = this.floor ? Math.floor(i) : i;
      return this.inf.format(fixed);
    } else {
      // to match the browser's numberformatter defaults
      var _fixed = this.floor ? Math.floor(i) : roundTo(i, 3);

      return padStart(_fixed, this.padTo);
    }
  };

  return PolyNumberFormatter;
}();
/**
 * @private
 */


var PolyDateFormatter = /*#__PURE__*/function () {
  function PolyDateFormatter(dt, intl, opts) {
    this.opts = opts;
    var z;

    if (dt.zone.isUniversal) {
      // UTC-8 or Etc/UTC-8 are not part of tzdata, only Etc/GMT+8 and the like.
      // That is why fixed-offset TZ is set to that unless it is:
      // 1. Representing offset 0 when UTC is used to maintain previous behavior and does not become GMT.
      // 2. Unsupported by the browser:
      //    - some do not support Etc/
      //    - < Etc/GMT-14, > Etc/GMT+12, and 30-minute or 45-minute offsets are not part of tzdata
      var gmtOffset = -1 * (dt.offset / 60);
      var offsetZ = gmtOffset >= 0 ? "Etc/GMT+" + gmtOffset : "Etc/GMT" + gmtOffset;
      var isOffsetZoneSupported = IANAZone.isValidZone(offsetZ);

      if (dt.offset !== 0 && isOffsetZoneSupported) {
        z = offsetZ;
        this.dt = dt;
      } else {
        // Not all fixed-offset zones like Etc/+4:30 are present in tzdata.
        // So we have to make do. Two cases:
        // 1. The format options tell us to show the zone. We can't do that, so the best
        // we can do is format the date in UTC.
        // 2. The format options don't tell us to show the zone. Then we can adjust them
        // the time and tell the formatter to show it to us in UTC, so that the time is right
        // and the bad zone doesn't show up.
        z = "UTC";

        if (opts.timeZoneName) {
          this.dt = dt;
        } else {
          this.dt = dt.offset === 0 ? dt : DateTime.fromMillis(dt.ts + dt.offset * 60 * 1000);
        }
      }
    } else if (dt.zone.type === "system") {
      this.dt = dt;
    } else {
      this.dt = dt;
      z = dt.zone.name;
    }

    var intlOpts = _extends({}, this.opts);

    if (z) {
      intlOpts.timeZone = z;
    }

    this.dtf = getCachedDTF(intl, intlOpts);
  }

  var _proto2 = PolyDateFormatter.prototype;

  _proto2.format = function format() {
    return this.dtf.format(this.dt.toJSDate());
  };

  _proto2.formatToParts = function formatToParts() {
    return this.dtf.formatToParts(this.dt.toJSDate());
  };

  _proto2.resolvedOptions = function resolvedOptions() {
    return this.dtf.resolvedOptions();
  };

  return PolyDateFormatter;
}();
/**
 * @private
 */


var PolyRelFormatter = /*#__PURE__*/function () {
  function PolyRelFormatter(intl, isEnglish, opts) {
    this.opts = _extends({
      style: "long"
    }, opts);

    if (!isEnglish && hasRelative()) {
      this.rtf = getCachedRTF(intl, opts);
    }
  }

  var _proto3 = PolyRelFormatter.prototype;

  _proto3.format = function format(count, unit) {
    if (this.rtf) {
      return this.rtf.format(count, unit);
    } else {
      return formatRelativeTime(unit, count, this.opts.numeric, this.opts.style !== "long");
    }
  };

  _proto3.formatToParts = function formatToParts(count, unit) {
    if (this.rtf) {
      return this.rtf.formatToParts(count, unit);
    } else {
      return [];
    }
  };

  return PolyRelFormatter;
}();
/**
 * @private
 */


var Locale = /*#__PURE__*/function () {
  Locale.fromOpts = function fromOpts(opts) {
    return Locale.create(opts.locale, opts.numberingSystem, opts.outputCalendar, opts.defaultToEN);
  };

  Locale.create = function create(locale, numberingSystem, outputCalendar, defaultToEN) {
    if (defaultToEN === void 0) {
      defaultToEN = false;
    }

    var specifiedLocale = locale || Settings.defaultLocale; // the system locale is useful for human readable strings but annoying for parsing/formatting known formats

    var localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale());
    var numberingSystemR = numberingSystem || Settings.defaultNumberingSystem;
    var outputCalendarR = outputCalendar || Settings.defaultOutputCalendar;
    return new Locale(localeR, numberingSystemR, outputCalendarR, specifiedLocale);
  };

  Locale.resetCache = function resetCache() {
    sysLocaleCache = null;
    intlDTCache = {};
    intlNumCache = {};
    intlRelCache = {};
  };

  Locale.fromObject = function fromObject(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        locale = _ref.locale,
        numberingSystem = _ref.numberingSystem,
        outputCalendar = _ref.outputCalendar;

    return Locale.create(locale, numberingSystem, outputCalendar);
  };

  function Locale(locale, numbering, outputCalendar, specifiedLocale) {
    var _parseLocaleString = parseLocaleString(locale),
        parsedLocale = _parseLocaleString[0],
        parsedNumberingSystem = _parseLocaleString[1],
        parsedOutputCalendar = _parseLocaleString[2];

    this.locale = parsedLocale;
    this.numberingSystem = numbering || parsedNumberingSystem || null;
    this.outputCalendar = outputCalendar || parsedOutputCalendar || null;
    this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);
    this.weekdaysCache = {
      format: {},
      standalone: {}
    };
    this.monthsCache = {
      format: {},
      standalone: {}
    };
    this.meridiemCache = null;
    this.eraCache = {};
    this.specifiedLocale = specifiedLocale;
    this.fastNumbersCached = null;
  }

  var _proto4 = Locale.prototype;

  _proto4.listingMode = function listingMode(defaultOK) {

    var isActuallyEn = this.isEnglish();
    var hasNoWeirdness = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
    return isActuallyEn && hasNoWeirdness ? "en" : "intl";
  };

  _proto4.clone = function clone(alts) {
    if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
      return this;
    } else {
      return Locale.create(alts.locale || this.specifiedLocale, alts.numberingSystem || this.numberingSystem, alts.outputCalendar || this.outputCalendar, alts.defaultToEN || false);
    }
  };

  _proto4.redefaultToEN = function redefaultToEN(alts) {
    if (alts === void 0) {
      alts = {};
    }

    return this.clone(_extends({}, alts, {
      defaultToEN: true
    }));
  };

  _proto4.redefaultToSystem = function redefaultToSystem(alts) {
    if (alts === void 0) {
      alts = {};
    }

    return this.clone(_extends({}, alts, {
      defaultToEN: false
    }));
  };

  _proto4.months = function months$1(length, format, defaultOK) {
    var _this = this;

    if (format === void 0) {
      format = false;
    }

    if (defaultOK === void 0) {
      defaultOK = true;
    }

    return listStuff(this, length, defaultOK, months, function () {
      var intl = format ? {
        month: length,
        day: "numeric"
      } : {
        month: length
      },
          formatStr = format ? "format" : "standalone";

      if (!_this.monthsCache[formatStr][length]) {
        _this.monthsCache[formatStr][length] = mapMonths(function (dt) {
          return _this.extract(dt, intl, "month");
        });
      }

      return _this.monthsCache[formatStr][length];
    });
  };

  _proto4.weekdays = function weekdays$1(length, format, defaultOK) {
    var _this2 = this;

    if (format === void 0) {
      format = false;
    }

    if (defaultOK === void 0) {
      defaultOK = true;
    }

    return listStuff(this, length, defaultOK, weekdays, function () {
      var intl = format ? {
        weekday: length,
        year: "numeric",
        month: "long",
        day: "numeric"
      } : {
        weekday: length
      },
          formatStr = format ? "format" : "standalone";

      if (!_this2.weekdaysCache[formatStr][length]) {
        _this2.weekdaysCache[formatStr][length] = mapWeekdays(function (dt) {
          return _this2.extract(dt, intl, "weekday");
        });
      }

      return _this2.weekdaysCache[formatStr][length];
    });
  };

  _proto4.meridiems = function meridiems$1(defaultOK) {
    var _this3 = this;

    if (defaultOK === void 0) {
      defaultOK = true;
    }

    return listStuff(this, undefined, defaultOK, function () {
      return meridiems;
    }, function () {
      // In theory there could be aribitrary day periods. We're gonna assume there are exactly two
      // for AM and PM. This is probably wrong, but it's makes parsing way easier.
      if (!_this3.meridiemCache) {
        var intl = {
          hour: "numeric",
          hourCycle: "h12"
        };
        _this3.meridiemCache = [DateTime.utc(2016, 11, 13, 9), DateTime.utc(2016, 11, 13, 19)].map(function (dt) {
          return _this3.extract(dt, intl, "dayperiod");
        });
      }

      return _this3.meridiemCache;
    });
  };

  _proto4.eras = function eras$1(length, defaultOK) {
    var _this4 = this;

    if (defaultOK === void 0) {
      defaultOK = true;
    }

    return listStuff(this, length, defaultOK, eras, function () {
      var intl = {
        era: length
      }; // This is problematic. Different calendars are going to define eras totally differently. What I need is the minimum set of dates
      // to definitely enumerate them.

      if (!_this4.eraCache[length]) {
        _this4.eraCache[length] = [DateTime.utc(-40, 1, 1), DateTime.utc(2017, 1, 1)].map(function (dt) {
          return _this4.extract(dt, intl, "era");
        });
      }

      return _this4.eraCache[length];
    });
  };

  _proto4.extract = function extract(dt, intlOpts, field) {
    var df = this.dtFormatter(dt, intlOpts),
        results = df.formatToParts(),
        matching = results.find(function (m) {
      return m.type.toLowerCase() === field;
    });
    return matching ? matching.value : null;
  };

  _proto4.numberFormatter = function numberFormatter(opts) {
    if (opts === void 0) {
      opts = {};
    }

    // this forcesimple option is never used (the only caller short-circuits on it, but it seems safer to leave)
    // (in contrast, the rest of the condition is used heavily)
    return new PolyNumberFormatter(this.intl, opts.forceSimple || this.fastNumbers, opts);
  };

  _proto4.dtFormatter = function dtFormatter(dt, intlOpts) {
    if (intlOpts === void 0) {
      intlOpts = {};
    }

    return new PolyDateFormatter(dt, this.intl, intlOpts);
  };

  _proto4.relFormatter = function relFormatter(opts) {
    if (opts === void 0) {
      opts = {};
    }

    return new PolyRelFormatter(this.intl, this.isEnglish(), opts);
  };

  _proto4.isEnglish = function isEnglish() {
    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us");
  };

  _proto4.equals = function equals(other) {
    return this.locale === other.locale && this.numberingSystem === other.numberingSystem && this.outputCalendar === other.outputCalendar;
  };

  _createClass(Locale, [{
    key: "fastNumbers",
    get: function get() {
      if (this.fastNumbersCached == null) {
        this.fastNumbersCached = supportsFastNumbers(this);
      }

      return this.fastNumbersCached;
    }
  }]);

  return Locale;
}();

/*
 * This file handles parsing for well-specified formats. Here's how it works:
 * Two things go into parsing: a regex to match with and an extractor to take apart the groups in the match.
 * An extractor is just a function that takes a regex match array and returns a { year: ..., month: ... } object
 * parse() does the work of executing the regex and applying the extractor. It takes multiple regex/extractor pairs to try in sequence.
 * Extractors can take a "cursor" representing the offset in the match to look at. This makes it easy to combine extractors.
 * combineExtractors() does the work of combining them, keeping track of the cursor through multiple extractions.
 * Some extractions are super dumb and simpleParse and fromStrings help DRY them.
 */

function combineRegexes() {
  for (var _len = arguments.length, regexes = new Array(_len), _key = 0; _key < _len; _key++) {
    regexes[_key] = arguments[_key];
  }

  var full = regexes.reduce(function (f, r) {
    return f + r.source;
  }, "");
  return RegExp("^" + full + "$");
}

function combineExtractors() {
  for (var _len2 = arguments.length, extractors = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    extractors[_key2] = arguments[_key2];
  }

  return function (m) {
    return extractors.reduce(function (_ref, ex) {
      var mergedVals = _ref[0],
          mergedZone = _ref[1],
          cursor = _ref[2];

      var _ex = ex(m, cursor),
          val = _ex[0],
          zone = _ex[1],
          next = _ex[2];

      return [_extends({}, mergedVals, val), mergedZone || zone, next];
    }, [{}, null, 1]).slice(0, 2);
  };
}

function parse(s) {
  if (s == null) {
    return [null, null];
  }

  for (var _len3 = arguments.length, patterns = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    patterns[_key3 - 1] = arguments[_key3];
  }

  for (var _i = 0, _patterns = patterns; _i < _patterns.length; _i++) {
    var _patterns$_i = _patterns[_i],
        regex = _patterns$_i[0],
        extractor = _patterns$_i[1];
    var m = regex.exec(s);

    if (m) {
      return extractor(m);
    }
  }

  return [null, null];
}

function simpleParse() {
  for (var _len4 = arguments.length, keys = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    keys[_key4] = arguments[_key4];
  }

  return function (match, cursor) {
    var ret = {};
    var i;

    for (i = 0; i < keys.length; i++) {
      ret[keys[i]] = parseInteger(match[cursor + i]);
    }

    return [ret, null, cursor + i];
  };
} // ISO and SQL parsing


var offsetRegex = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,
    isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,
    isoTimeRegex = RegExp("" + isoTimeBaseRegex.source + offsetRegex.source + "?"),
    isoTimeExtensionRegex = RegExp("(?:T" + isoTimeRegex.source + ")?"),
    isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,
    isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/,
    isoOrdinalRegex = /(\d{4})-?(\d{3})/,
    extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekDay"),
    extractISOOrdinalData = simpleParse("year", "ordinal"),
    sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/,
    // dumbed-down version of the ISO one
sqlTimeRegex = RegExp(isoTimeBaseRegex.source + " ?(?:" + offsetRegex.source + "|(" + ianaRegex.source + "))?"),
    sqlTimeExtensionRegex = RegExp("(?: " + sqlTimeRegex.source + ")?");

function int(match, pos, fallback) {
  var m = match[pos];
  return isUndefined(m) ? fallback : parseInteger(m);
}

function extractISOYmd(match, cursor) {
  var item = {
    year: int(match, cursor),
    month: int(match, cursor + 1, 1),
    day: int(match, cursor + 2, 1)
  };
  return [item, null, cursor + 3];
}

function extractISOTime(match, cursor) {
  var item = {
    hours: int(match, cursor, 0),
    minutes: int(match, cursor + 1, 0),
    seconds: int(match, cursor + 2, 0),
    milliseconds: parseMillis(match[cursor + 3])
  };
  return [item, null, cursor + 4];
}

function extractISOOffset(match, cursor) {
  var local = !match[cursor] && !match[cursor + 1],
      fullOffset = signedOffset(match[cursor + 1], match[cursor + 2]),
      zone = local ? null : FixedOffsetZone.instance(fullOffset);
  return [{}, zone, cursor + 3];
}

function extractIANAZone(match, cursor) {
  var zone = match[cursor] ? IANAZone.create(match[cursor]) : null;
  return [{}, zone, cursor + 1];
} // ISO time parsing


var isoTimeOnly = RegExp("^T?" + isoTimeBaseRegex.source + "$"); // ISO duration parsing

var isoDuration = /^-?P(?:(?:(-?\d{1,9})Y)?(?:(-?\d{1,9})M)?(?:(-?\d{1,9})W)?(?:(-?\d{1,9})D)?(?:T(?:(-?\d{1,9})H)?(?:(-?\d{1,9})M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,9}))?S)?)?)$/;

function extractISODuration(match) {
  var s = match[0],
      yearStr = match[1],
      monthStr = match[2],
      weekStr = match[3],
      dayStr = match[4],
      hourStr = match[5],
      minuteStr = match[6],
      secondStr = match[7],
      millisecondsStr = match[8];
  var hasNegativePrefix = s[0] === "-";
  var negativeSeconds = secondStr && secondStr[0] === "-";

  var maybeNegate = function maybeNegate(num, force) {
    if (force === void 0) {
      force = false;
    }

    return num !== undefined && (force || num && hasNegativePrefix) ? -num : num;
  };

  return [{
    years: maybeNegate(parseInteger(yearStr)),
    months: maybeNegate(parseInteger(monthStr)),
    weeks: maybeNegate(parseInteger(weekStr)),
    days: maybeNegate(parseInteger(dayStr)),
    hours: maybeNegate(parseInteger(hourStr)),
    minutes: maybeNegate(parseInteger(minuteStr)),
    seconds: maybeNegate(parseInteger(secondStr), secondStr === "-0"),
    milliseconds: maybeNegate(parseMillis(millisecondsStr), negativeSeconds)
  }];
} // These are a little braindead. EDT *should* tell us that we're in, say, America/New_York
// and not just that we're in -240 *right now*. But since I don't think these are used that often
// I'm just going to ignore that


var obsOffsets = {
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};

function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  var result = {
    year: yearStr.length === 2 ? untruncateYear(parseInteger(yearStr)) : parseInteger(yearStr),
    month: monthsShort.indexOf(monthStr) + 1,
    day: parseInteger(dayStr),
    hour: parseInteger(hourStr),
    minute: parseInteger(minuteStr)
  };
  if (secondStr) result.second = parseInteger(secondStr);

  if (weekdayStr) {
    result.weekday = weekdayStr.length > 3 ? weekdaysLong.indexOf(weekdayStr) + 1 : weekdaysShort.indexOf(weekdayStr) + 1;
  }

  return result;
} // RFC 2822/5322


var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;

function extractRFC2822(match) {
  var weekdayStr = match[1],
      dayStr = match[2],
      monthStr = match[3],
      yearStr = match[4],
      hourStr = match[5],
      minuteStr = match[6],
      secondStr = match[7],
      obsOffset = match[8],
      milOffset = match[9],
      offHourStr = match[10],
      offMinuteStr = match[11],
      result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  var offset;

  if (obsOffset) {
    offset = obsOffsets[obsOffset];
  } else if (milOffset) {
    offset = 0;
  } else {
    offset = signedOffset(offHourStr, offMinuteStr);
  }

  return [result, new FixedOffsetZone(offset)];
}

function preprocessRFC2822(s) {
  // Remove comments and folding whitespace and replace multiple-spaces with a single space
  return s.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
} // http date


var rfc1123 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,
    rfc850 = /^(Monday|Tuesday|Wedsday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,
    ascii = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;

function extractRFC1123Or850(match) {
  var weekdayStr = match[1],
      dayStr = match[2],
      monthStr = match[3],
      yearStr = match[4],
      hourStr = match[5],
      minuteStr = match[6],
      secondStr = match[7],
      result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, FixedOffsetZone.utcInstance];
}

function extractASCII(match) {
  var weekdayStr = match[1],
      monthStr = match[2],
      dayStr = match[3],
      hourStr = match[4],
      minuteStr = match[5],
      secondStr = match[6],
      yearStr = match[7],
      result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, FixedOffsetZone.utcInstance];
}

var isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
var isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
var isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
var isoTimeCombinedRegex = combineRegexes(isoTimeRegex);
var extractISOYmdTimeAndOffset = combineExtractors(extractISOYmd, extractISOTime, extractISOOffset);
var extractISOWeekTimeAndOffset = combineExtractors(extractISOWeekData, extractISOTime, extractISOOffset);
var extractISOOrdinalDateAndTime = combineExtractors(extractISOOrdinalData, extractISOTime, extractISOOffset);
var extractISOTimeAndOffset = combineExtractors(extractISOTime, extractISOOffset);
/**
 * @private
 */

function parseISODate(s) {
  return parse(s, [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset], [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDateAndTime], [isoTimeCombinedRegex, extractISOTimeAndOffset]);
}
function parseRFC2822Date(s) {
  return parse(preprocessRFC2822(s), [rfc2822, extractRFC2822]);
}
function parseHTTPDate(s) {
  return parse(s, [rfc1123, extractRFC1123Or850], [rfc850, extractRFC1123Or850], [ascii, extractASCII]);
}
function parseISODuration(s) {
  return parse(s, [isoDuration, extractISODuration]);
}
var extractISOTimeOnly = combineExtractors(extractISOTime);
function parseISOTimeOnly(s) {
  return parse(s, [isoTimeOnly, extractISOTimeOnly]);
}
var sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
var sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);
var extractISOYmdTimeOffsetAndIANAZone = combineExtractors(extractISOYmd, extractISOTime, extractISOOffset, extractIANAZone);
var extractISOTimeOffsetAndIANAZone = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
function parseSQL(s) {
  return parse(s, [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeOffsetAndIANAZone], [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]);
}

var INVALID$2 = "Invalid Duration"; // unit conversion constants

var lowOrderMatrix = {
  weeks: {
    days: 7,
    hours: 7 * 24,
    minutes: 7 * 24 * 60,
    seconds: 7 * 24 * 60 * 60,
    milliseconds: 7 * 24 * 60 * 60 * 1000
  },
  days: {
    hours: 24,
    minutes: 24 * 60,
    seconds: 24 * 60 * 60,
    milliseconds: 24 * 60 * 60 * 1000
  },
  hours: {
    minutes: 60,
    seconds: 60 * 60,
    milliseconds: 60 * 60 * 1000
  },
  minutes: {
    seconds: 60,
    milliseconds: 60 * 1000
  },
  seconds: {
    milliseconds: 1000
  }
},
    casualMatrix = _extends({
  years: {
    quarters: 4,
    months: 12,
    weeks: 52,
    days: 365,
    hours: 365 * 24,
    minutes: 365 * 24 * 60,
    seconds: 365 * 24 * 60 * 60,
    milliseconds: 365 * 24 * 60 * 60 * 1000
  },
  quarters: {
    months: 3,
    weeks: 13,
    days: 91,
    hours: 91 * 24,
    minutes: 91 * 24 * 60,
    seconds: 91 * 24 * 60 * 60,
    milliseconds: 91 * 24 * 60 * 60 * 1000
  },
  months: {
    weeks: 4,
    days: 30,
    hours: 30 * 24,
    minutes: 30 * 24 * 60,
    seconds: 30 * 24 * 60 * 60,
    milliseconds: 30 * 24 * 60 * 60 * 1000
  }
}, lowOrderMatrix),
    daysInYearAccurate = 146097.0 / 400,
    daysInMonthAccurate = 146097.0 / 4800,
    accurateMatrix = _extends({
  years: {
    quarters: 4,
    months: 12,
    weeks: daysInYearAccurate / 7,
    days: daysInYearAccurate,
    hours: daysInYearAccurate * 24,
    minutes: daysInYearAccurate * 24 * 60,
    seconds: daysInYearAccurate * 24 * 60 * 60,
    milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1000
  },
  quarters: {
    months: 3,
    weeks: daysInYearAccurate / 28,
    days: daysInYearAccurate / 4,
    hours: daysInYearAccurate * 24 / 4,
    minutes: daysInYearAccurate * 24 * 60 / 4,
    seconds: daysInYearAccurate * 24 * 60 * 60 / 4,
    milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1000 / 4
  },
  months: {
    weeks: daysInMonthAccurate / 7,
    days: daysInMonthAccurate,
    hours: daysInMonthAccurate * 24,
    minutes: daysInMonthAccurate * 24 * 60,
    seconds: daysInMonthAccurate * 24 * 60 * 60,
    milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1000
  }
}, lowOrderMatrix); // units ordered by size


var orderedUnits$1 = ["years", "quarters", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"];
var reverseUnits = orderedUnits$1.slice(0).reverse(); // clone really means "create another instance just like this one, but with these changes"

function clone$1(dur, alts, clear) {
  if (clear === void 0) {
    clear = false;
  }

  // deep merge for vals
  var conf = {
    values: clear ? alts.values : _extends({}, dur.values, alts.values || {}),
    loc: dur.loc.clone(alts.loc),
    conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy
  };
  return new Duration(conf);
}

function antiTrunc(n) {
  return n < 0 ? Math.floor(n) : Math.ceil(n);
} // NB: mutates parameters


function convert(matrix, fromMap, fromUnit, toMap, toUnit) {
  var conv = matrix[toUnit][fromUnit],
      raw = fromMap[fromUnit] / conv,
      sameSign = Math.sign(raw) === Math.sign(toMap[toUnit]),
      // ok, so this is wild, but see the matrix in the tests
  added = !sameSign && toMap[toUnit] !== 0 && Math.abs(raw) <= 1 ? antiTrunc(raw) : Math.trunc(raw);
  toMap[toUnit] += added;
  fromMap[fromUnit] -= added * conv;
} // NB: mutates parameters


function normalizeValues(matrix, vals) {
  reverseUnits.reduce(function (previous, current) {
    if (!isUndefined(vals[current])) {
      if (previous) {
        convert(matrix, vals, previous, vals, current);
      }

      return current;
    } else {
      return previous;
    }
  }, null);
}
/**
 * A Duration object represents a period of time, like "2 months" or "1 day, 1 hour". Conceptually, it's just a map of units to their quantities, accompanied by some additional configuration and methods for creating, parsing, interrogating, transforming, and formatting them. They can be used on their own or in conjunction with other Luxon types; for example, you can use {@link DateTime.plus} to add a Duration object to a DateTime, producing another DateTime.
 *
 * Here is a brief overview of commonly used methods and getters in Duration:
 *
 * * **Creation** To create a Duration, use {@link Duration.fromMillis}, {@link Duration.fromObject}, or {@link Duration.fromISO}.
 * * **Unit values** See the {@link Duration#years}, {@link Duration.months}, {@link Duration#weeks}, {@link Duration#days}, {@link Duration#hours}, {@link Duration#minutes}, {@link Duration#seconds}, {@link Duration#milliseconds} accessors.
 * * **Configuration** See  {@link Duration#locale} and {@link Duration#numberingSystem} accessors.
 * * **Transformation** To create new Durations out of old ones use {@link Duration#plus}, {@link Duration#minus}, {@link Duration#normalize}, {@link Duration#set}, {@link Duration#reconfigure}, {@link Duration#shiftTo}, and {@link Duration#negate}.
 * * **Output** To convert the Duration into other representations, see {@link Duration#as}, {@link Duration#toISO}, {@link Duration#toFormat}, and {@link Duration#toJSON}
 *
 * There's are more methods documented below. In addition, for more information on subtler topics like internationalization and validity, see the external documentation.
 */


var Duration = /*#__PURE__*/function () {
  /**
   * @private
   */
  function Duration(config) {
    var accurate = config.conversionAccuracy === "longterm" || false;
    /**
     * @access private
     */

    this.values = config.values;
    /**
     * @access private
     */

    this.loc = config.loc || Locale.create();
    /**
     * @access private
     */

    this.conversionAccuracy = accurate ? "longterm" : "casual";
    /**
     * @access private
     */

    this.invalid = config.invalid || null;
    /**
     * @access private
     */

    this.matrix = accurate ? accurateMatrix : casualMatrix;
    /**
     * @access private
     */

    this.isLuxonDuration = true;
  }
  /**
   * Create Duration from a number of milliseconds.
   * @param {number} count of milliseconds
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */


  Duration.fromMillis = function fromMillis(count, opts) {
    return Duration.fromObject({
      milliseconds: count
    }, opts);
  }
  /**
   * Create a Duration from a JavaScript object with keys like 'years' and 'hours'.
   * If this object is empty then a zero milliseconds duration is returned.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.years
   * @param {number} obj.quarters
   * @param {number} obj.months
   * @param {number} obj.weeks
   * @param {number} obj.days
   * @param {number} obj.hours
   * @param {number} obj.minutes
   * @param {number} obj.seconds
   * @param {number} obj.milliseconds
   * @param {Object} [opts=[]] - options for creating this Duration
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  ;

  Duration.fromObject = function fromObject(obj, opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (obj == null || typeof obj !== "object") {
      throw new InvalidArgumentError("Duration.fromObject: argument expected to be an object, got " + (obj === null ? "null" : typeof obj));
    }

    return new Duration({
      values: normalizeObject(obj, Duration.normalizeUnit),
      loc: Locale.fromObject(opts),
      conversionAccuracy: opts.conversionAccuracy
    });
  }
  /**
   * Create a Duration from an ISO 8601 duration string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
   * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
   * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
   * @return {Duration}
   */
  ;

  Duration.fromISO = function fromISO(text, opts) {
    var _parseISODuration = parseISODuration(text),
        parsed = _parseISODuration[0];

    if (parsed) {
      return Duration.fromObject(parsed, opts);
    } else {
      return Duration.invalid("unparsable", "the input \"" + text + "\" can't be parsed as ISO 8601");
    }
  }
  /**
   * Create a Duration from an ISO 8601 time string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
   * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @return {Duration}
   */
  ;

  Duration.fromISOTime = function fromISOTime(text, opts) {
    var _parseISOTimeOnly = parseISOTimeOnly(text),
        parsed = _parseISOTimeOnly[0];

    if (parsed) {
      return Duration.fromObject(parsed, opts);
    } else {
      return Duration.invalid("unparsable", "the input \"" + text + "\" can't be parsed as ISO 8601");
    }
  }
  /**
   * Create an invalid Duration.
   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Duration}
   */
  ;

  Duration.invalid = function invalid(reason, explanation) {
    if (explanation === void 0) {
      explanation = null;
    }

    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the Duration is invalid");
    }

    var invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

    if (Settings.throwOnInvalid) {
      throw new InvalidDurationError(invalid);
    } else {
      return new Duration({
        invalid: invalid
      });
    }
  }
  /**
   * @private
   */
  ;

  Duration.normalizeUnit = function normalizeUnit(unit) {
    var normalized = {
      year: "years",
      years: "years",
      quarter: "quarters",
      quarters: "quarters",
      month: "months",
      months: "months",
      week: "weeks",
      weeks: "weeks",
      day: "days",
      days: "days",
      hour: "hours",
      hours: "hours",
      minute: "minutes",
      minutes: "minutes",
      second: "seconds",
      seconds: "seconds",
      millisecond: "milliseconds",
      milliseconds: "milliseconds"
    }[unit ? unit.toLowerCase() : unit];
    if (!normalized) throw new InvalidUnitError(unit);
    return normalized;
  }
  /**
   * Check if an object is a Duration. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  ;

  Duration.isDuration = function isDuration(o) {
    return o && o.isLuxonDuration || false;
  }
  /**
   * Get  the locale of a Duration, such 'en-GB'
   * @type {string}
   */
  ;

  var _proto = Duration.prototype;

  /**
   * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
   * * `S` for milliseconds
   * * `s` for seconds
   * * `m` for minutes
   * * `h` for hours
   * * `d` for days
   * * `M` for months
   * * `y` for years
   * Notes:
   * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
   * * The duration will be converted to the set of units in the format string using {@link Duration.shiftTo} and the Durations's conversion accuracy setting.
   * @param {string} fmt - the format string
   * @param {Object} opts - options
   * @param {boolean} [opts.floor=true] - floor numerical values
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
   * @return {string}
   */
  _proto.toFormat = function toFormat(fmt, opts) {
    if (opts === void 0) {
      opts = {};
    }

    // reverse-compat since 1.2; we always round down now, never up, and we do it by default
    var fmtOpts = _extends({}, opts, {
      floor: opts.round !== false && opts.floor !== false
    });

    return this.isValid ? Formatter.create(this.loc, fmtOpts).formatDurationFromString(this, fmt) : INVALID$2;
  }
  /**
   * Returns a JavaScript object with this Duration's values.
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
   * @return {Object}
   */
  ;

  _proto.toObject = function toObject() {
    if (!this.isValid) return {};
    return _extends({}, this.values);
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
   * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
   * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
   * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
   * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
   * @return {string}
   */
  ;

  _proto.toISO = function toISO() {
    // we could use the formatter, but this is an easier way to get the minimum string
    if (!this.isValid) return null;
    var s = "P";
    if (this.years !== 0) s += this.years + "Y";
    if (this.months !== 0 || this.quarters !== 0) s += this.months + this.quarters * 3 + "M";
    if (this.weeks !== 0) s += this.weeks + "W";
    if (this.days !== 0) s += this.days + "D";
    if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) s += "T";
    if (this.hours !== 0) s += this.hours + "H";
    if (this.minutes !== 0) s += this.minutes + "M";
    if (this.seconds !== 0 || this.milliseconds !== 0) // this will handle "floating point madness" by removing extra decimal places
      // https://stackoverflow.com/questions/588004/is-floating-point-math-broken
      s += roundTo(this.seconds + this.milliseconds / 1000, 3) + "S";
    if (s === "P") s += "T0S";
    return s;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
   * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
   * @return {string}
   */
  ;

  _proto.toISOTime = function toISOTime(opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (!this.isValid) return null;
    var millis = this.toMillis();
    if (millis < 0 || millis >= 86400000) return null;
    opts = _extends({
      suppressMilliseconds: false,
      suppressSeconds: false,
      includePrefix: false,
      format: "extended"
    }, opts);
    var value = this.shiftTo("hours", "minutes", "seconds", "milliseconds");
    var fmt = opts.format === "basic" ? "hhmm" : "hh:mm";

    if (!opts.suppressSeconds || value.seconds !== 0 || value.milliseconds !== 0) {
      fmt += opts.format === "basic" ? "ss" : ":ss";

      if (!opts.suppressMilliseconds || value.milliseconds !== 0) {
        fmt += ".SSS";
      }
    }

    var str = value.toFormat(fmt);

    if (opts.includePrefix) {
      str = "T" + str;
    }

    return str;
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
   * @return {string}
   */
  ;

  _proto.toJSON = function toJSON() {
    return this.toISO();
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
   * @return {string}
   */
  ;

  _proto.toString = function toString() {
    return this.toISO();
  }
  /**
   * Returns an milliseconds value of this Duration.
   * @return {number}
   */
  ;

  _proto.toMillis = function toMillis() {
    return this.as("milliseconds");
  }
  /**
   * Returns an milliseconds value of this Duration. Alias of {@link toMillis}
   * @return {number}
   */
  ;

  _proto.valueOf = function valueOf() {
    return this.toMillis();
  }
  /**
   * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  ;

  _proto.plus = function plus(duration) {
    if (!this.isValid) return this;
    var dur = friendlyDuration(duration),
        result = {};

    for (var _iterator = _createForOfIteratorHelperLoose(orderedUnits$1), _step; !(_step = _iterator()).done;) {
      var k = _step.value;

      if (hasOwnProperty(dur.values, k) || hasOwnProperty(this.values, k)) {
        result[k] = dur.get(k) + this.get(k);
      }
    }

    return clone$1(this, {
      values: result
    }, true);
  }
  /**
   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  ;

  _proto.minus = function minus(duration) {
    if (!this.isValid) return this;
    var dur = friendlyDuration(duration);
    return this.plus(dur.negate());
  }
  /**
   * Scale this Duration by the specified amount. Return a newly-constructed Duration.
   * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits(x => x * 2) //=> { hours: 2, minutes: 60 }
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits((x, u) => u === "hour" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
   * @return {Duration}
   */
  ;

  _proto.mapUnits = function mapUnits(fn) {
    if (!this.isValid) return this;
    var result = {};

    for (var _i = 0, _Object$keys = Object.keys(this.values); _i < _Object$keys.length; _i++) {
      var k = _Object$keys[_i];
      result[k] = asNumber(fn(this.values[k], k));
    }

    return clone$1(this, {
      values: result
    }, true);
  }
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example Duration.fromObject({years: 2, days: 3}).get('years') //=> 2
   * @example Duration.fromObject({years: 2, days: 3}).get('months') //=> 0
   * @example Duration.fromObject({years: 2, days: 3}).get('days') //=> 3
   * @return {number}
   */
  ;

  _proto.get = function get(unit) {
    return this[Duration.normalizeUnit(unit)];
  }
  /**
   * "Set" the values of specified units. Return a newly-constructed Duration.
   * @param {Object} values - a mapping of units to numbers
   * @example dur.set({ years: 2017 })
   * @example dur.set({ hours: 8, minutes: 30 })
   * @return {Duration}
   */
  ;

  _proto.set = function set(values) {
    if (!this.isValid) return this;

    var mixed = _extends({}, this.values, normalizeObject(values, Duration.normalizeUnit));

    return clone$1(this, {
      values: mixed
    });
  }
  /**
   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
   * @example dur.reconfigure({ locale: 'en-GB' })
   * @return {Duration}
   */
  ;

  _proto.reconfigure = function reconfigure(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        locale = _ref.locale,
        numberingSystem = _ref.numberingSystem,
        conversionAccuracy = _ref.conversionAccuracy;

    var loc = this.loc.clone({
      locale: locale,
      numberingSystem: numberingSystem
    }),
        opts = {
      loc: loc
    };

    if (conversionAccuracy) {
      opts.conversionAccuracy = conversionAccuracy;
    }

    return clone$1(this, opts);
  }
  /**
   * Return the length of the duration in the specified unit.
   * @param {string} unit - a unit such as 'minutes' or 'days'
   * @example Duration.fromObject({years: 1}).as('days') //=> 365
   * @example Duration.fromObject({years: 1}).as('months') //=> 12
   * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
   * @return {number}
   */
  ;

  _proto.as = function as(unit) {
    return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
  }
  /**
   * Reduce this Duration to its canonical representation in its current units.
   * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
   * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
   * @return {Duration}
   */
  ;

  _proto.normalize = function normalize() {
    if (!this.isValid) return this;
    var vals = this.toObject();
    normalizeValues(this.matrix, vals);
    return clone$1(this, {
      values: vals
    }, true);
  }
  /**
   * Convert this Duration into its representation in a different set of units.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
   * @return {Duration}
   */
  ;

  _proto.shiftTo = function shiftTo() {
    for (var _len = arguments.length, units = new Array(_len), _key = 0; _key < _len; _key++) {
      units[_key] = arguments[_key];
    }

    if (!this.isValid) return this;

    if (units.length === 0) {
      return this;
    }

    units = units.map(function (u) {
      return Duration.normalizeUnit(u);
    });
    var built = {},
        accumulated = {},
        vals = this.toObject();
    var lastUnit;

    for (var _iterator2 = _createForOfIteratorHelperLoose(orderedUnits$1), _step2; !(_step2 = _iterator2()).done;) {
      var k = _step2.value;

      if (units.indexOf(k) >= 0) {
        lastUnit = k;
        var own = 0; // anything we haven't boiled down yet should get boiled to this unit

        for (var ak in accumulated) {
          own += this.matrix[ak][k] * accumulated[ak];
          accumulated[ak] = 0;
        } // plus anything that's already in this unit


        if (isNumber(vals[k])) {
          own += vals[k];
        }

        var i = Math.trunc(own);
        built[k] = i;
        accumulated[k] = own - i; // we'd like to absorb these fractions in another unit
        // plus anything further down the chain that should be rolled up in to this

        for (var down in vals) {
          if (orderedUnits$1.indexOf(down) > orderedUnits$1.indexOf(k)) {
            convert(this.matrix, vals, down, built, k);
          }
        } // otherwise, keep it in the wings to boil it later

      } else if (isNumber(vals[k])) {
        accumulated[k] = vals[k];
      }
    } // anything leftover becomes the decimal for the last unit
    // lastUnit must be defined since units is not empty


    for (var key in accumulated) {
      if (accumulated[key] !== 0) {
        built[lastUnit] += key === lastUnit ? accumulated[key] : accumulated[key] / this.matrix[lastUnit][key];
      }
    }

    return clone$1(this, {
      values: built
    }, true).normalize();
  }
  /**
   * Return the negative of this Duration.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
   * @return {Duration}
   */
  ;

  _proto.negate = function negate() {
    if (!this.isValid) return this;
    var negated = {};

    for (var _i2 = 0, _Object$keys2 = Object.keys(this.values); _i2 < _Object$keys2.length; _i2++) {
      var k = _Object$keys2[_i2];
      negated[k] = -this.values[k];
    }

    return clone$1(this, {
      values: negated
    }, true);
  }
  /**
   * Get the years.
   * @type {number}
   */
  ;

  /**
   * Equality check
   * Two Durations are equal iff they have the same units and the same values for each unit.
   * @param {Duration} other
   * @return {boolean}
   */
  _proto.equals = function equals(other) {
    if (!this.isValid || !other.isValid) {
      return false;
    }

    if (!this.loc.equals(other.loc)) {
      return false;
    }

    function eq(v1, v2) {
      // Consider 0 and undefined as equal
      if (v1 === undefined || v1 === 0) return v2 === undefined || v2 === 0;
      return v1 === v2;
    }

    for (var _iterator3 = _createForOfIteratorHelperLoose(orderedUnits$1), _step3; !(_step3 = _iterator3()).done;) {
      var u = _step3.value;

      if (!eq(this.values[u], other.values[u])) {
        return false;
      }
    }

    return true;
  };

  _createClass(Duration, [{
    key: "locale",
    get: function get() {
      return this.isValid ? this.loc.locale : null;
    }
    /**
     * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
     *
     * @type {string}
     */

  }, {
    key: "numberingSystem",
    get: function get() {
      return this.isValid ? this.loc.numberingSystem : null;
    }
  }, {
    key: "years",
    get: function get() {
      return this.isValid ? this.values.years || 0 : NaN;
    }
    /**
     * Get the quarters.
     * @type {number}
     */

  }, {
    key: "quarters",
    get: function get() {
      return this.isValid ? this.values.quarters || 0 : NaN;
    }
    /**
     * Get the months.
     * @type {number}
     */

  }, {
    key: "months",
    get: function get() {
      return this.isValid ? this.values.months || 0 : NaN;
    }
    /**
     * Get the weeks
     * @type {number}
     */

  }, {
    key: "weeks",
    get: function get() {
      return this.isValid ? this.values.weeks || 0 : NaN;
    }
    /**
     * Get the days.
     * @type {number}
     */

  }, {
    key: "days",
    get: function get() {
      return this.isValid ? this.values.days || 0 : NaN;
    }
    /**
     * Get the hours.
     * @type {number}
     */

  }, {
    key: "hours",
    get: function get() {
      return this.isValid ? this.values.hours || 0 : NaN;
    }
    /**
     * Get the minutes.
     * @type {number}
     */

  }, {
    key: "minutes",
    get: function get() {
      return this.isValid ? this.values.minutes || 0 : NaN;
    }
    /**
     * Get the seconds.
     * @return {number}
     */

  }, {
    key: "seconds",
    get: function get() {
      return this.isValid ? this.values.seconds || 0 : NaN;
    }
    /**
     * Get the milliseconds.
     * @return {number}
     */

  }, {
    key: "milliseconds",
    get: function get() {
      return this.isValid ? this.values.milliseconds || 0 : NaN;
    }
    /**
     * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
     * on invalid DateTimes or Intervals.
     * @return {boolean}
     */

  }, {
    key: "isValid",
    get: function get() {
      return this.invalid === null;
    }
    /**
     * Returns an error code if this Duration became invalid, or null if the Duration is valid
     * @return {string}
     */

  }, {
    key: "invalidReason",
    get: function get() {
      return this.invalid ? this.invalid.reason : null;
    }
    /**
     * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
     * @type {string}
     */

  }, {
    key: "invalidExplanation",
    get: function get() {
      return this.invalid ? this.invalid.explanation : null;
    }
  }]);

  return Duration;
}();
function friendlyDuration(durationish) {
  if (isNumber(durationish)) {
    return Duration.fromMillis(durationish);
  } else if (Duration.isDuration(durationish)) {
    return durationish;
  } else if (typeof durationish === "object") {
    return Duration.fromObject(durationish);
  } else {
    throw new InvalidArgumentError("Unknown duration argument " + durationish + " of type " + typeof durationish);
  }
}

var INVALID$1 = "Invalid Interval"; // checks if the start is equal to or before the end

function validateStartEnd(start, end) {
  if (!start || !start.isValid) {
    return Interval.invalid("missing or invalid start");
  } else if (!end || !end.isValid) {
    return Interval.invalid("missing or invalid end");
  } else if (end < start) {
    return Interval.invalid("end before start", "The end of an interval must be after its start, but you had start=" + start.toISO() + " and end=" + end.toISO());
  } else {
    return null;
  }
}
/**
 * An Interval object represents a half-open interval of time, where each endpoint is a {@link DateTime}. Conceptually, it's a container for those two endpoints, accompanied by methods for creating, parsing, interrogating, comparing, transforming, and formatting them.
 *
 * Here is a brief overview of the most commonly used methods and getters in Interval:
 *
 * * **Creation** To create an Interval, use {@link Interval.fromDateTimes}, {@link Interval.after}, {@link Interval.before}, or {@link Interval.fromISO}.
 * * **Accessors** Use {@link Interval#start} and {@link Interval#end} to get the start and end.
 * * **Interrogation** To analyze the Interval, use {@link Interval#count}, {@link Interval#length}, {@link Interval#hasSame}, {@link Interval#contains}, {@link Interval#isAfter}, or {@link Interval#isBefore}.
 * * **Transformation** To create other Intervals out of this one, use {@link Interval#set}, {@link Interval#splitAt}, {@link Interval#splitBy}, {@link Interval#divideEqually}, {@link Interval#merge}, {@link Interval#xor}, {@link Interval#union}, {@link Interval#intersection}, or {@link Interval#difference}.
 * * **Comparison** To compare this Interval to another one, use {@link Interval#equals}, {@link Interval#overlaps}, {@link Interval#abutsStart}, {@link Interval#abutsEnd}, {@link Interval#engulfs}
 * * **Output** To convert the Interval into other representations, see {@link Interval#toString}, {@link Interval#toISO}, {@link Interval#toISODate}, {@link Interval#toISOTime}, {@link Interval#toFormat}, and {@link Interval#toDuration}.
 */


var Interval = /*#__PURE__*/function () {
  /**
   * @private
   */
  function Interval(config) {
    /**
     * @access private
     */
    this.s = config.start;
    /**
     * @access private
     */

    this.e = config.end;
    /**
     * @access private
     */

    this.invalid = config.invalid || null;
    /**
     * @access private
     */

    this.isLuxonInterval = true;
  }
  /**
   * Create an invalid Interval.
   * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Interval}
   */


  Interval.invalid = function invalid(reason, explanation) {
    if (explanation === void 0) {
      explanation = null;
    }

    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the Interval is invalid");
    }

    var invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

    if (Settings.throwOnInvalid) {
      throw new InvalidIntervalError(invalid);
    } else {
      return new Interval({
        invalid: invalid
      });
    }
  }
  /**
   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
   * @param {DateTime|Date|Object} start
   * @param {DateTime|Date|Object} end
   * @return {Interval}
   */
  ;

  Interval.fromDateTimes = function fromDateTimes(start, end) {
    var builtStart = friendlyDateTime(start),
        builtEnd = friendlyDateTime(end);
    var validateError = validateStartEnd(builtStart, builtEnd);

    if (validateError == null) {
      return new Interval({
        start: builtStart,
        end: builtEnd
      });
    } else {
      return validateError;
    }
  }
  /**
   * Create an Interval from a start DateTime and a Duration to extend to.
   * @param {DateTime|Date|Object} start
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  ;

  Interval.after = function after(start, duration) {
    var dur = friendlyDuration(duration),
        dt = friendlyDateTime(start);
    return Interval.fromDateTimes(dt, dt.plus(dur));
  }
  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  ;

  Interval.before = function before(end, duration) {
    var dur = friendlyDuration(duration),
        dt = friendlyDateTime(end);
    return Interval.fromDateTimes(dt.minus(dur), dt);
  }
  /**
   * Create an Interval from an ISO 8601 string.
   * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
   * @param {string} text - the ISO string to parse
   * @param {Object} [opts] - options to pass {@link DateTime.fromISO} and optionally {@link Duration.fromISO}
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {Interval}
   */
  ;

  Interval.fromISO = function fromISO(text, opts) {
    var _split = (text || "").split("/", 2),
        s = _split[0],
        e = _split[1];

    if (s && e) {
      var start, startIsValid;

      try {
        start = DateTime.fromISO(s, opts);
        startIsValid = start.isValid;
      } catch (e) {
        startIsValid = false;
      }

      var end, endIsValid;

      try {
        end = DateTime.fromISO(e, opts);
        endIsValid = end.isValid;
      } catch (e) {
        endIsValid = false;
      }

      if (startIsValid && endIsValid) {
        return Interval.fromDateTimes(start, end);
      }

      if (startIsValid) {
        var dur = Duration.fromISO(e, opts);

        if (dur.isValid) {
          return Interval.after(start, dur);
        }
      } else if (endIsValid) {
        var _dur = Duration.fromISO(s, opts);

        if (_dur.isValid) {
          return Interval.before(end, _dur);
        }
      }
    }

    return Interval.invalid("unparsable", "the input \"" + text + "\" can't be parsed as ISO 8601");
  }
  /**
   * Check if an object is an Interval. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  ;

  Interval.isInterval = function isInterval(o) {
    return o && o.isLuxonInterval || false;
  }
  /**
   * Returns the start of the Interval
   * @type {DateTime}
   */
  ;

  var _proto = Interval.prototype;

  /**
   * Returns the length of the Interval in the specified unit.
   * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
   * @return {number}
   */
  _proto.length = function length(unit) {
    if (unit === void 0) {
      unit = "milliseconds";
    }

    return this.isValid ? this.toDuration.apply(this, [unit]).get(unit) : NaN;
  }
  /**
   * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
   * Unlike {@link Interval#length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
   * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
   * @param {string} [unit='milliseconds'] - the unit of time to count.
   * @return {number}
   */
  ;

  _proto.count = function count(unit) {
    if (unit === void 0) {
      unit = "milliseconds";
    }

    if (!this.isValid) return NaN;
    var start = this.start.startOf(unit),
        end = this.end.startOf(unit);
    return Math.floor(end.diff(start, unit).get(unit)) + 1;
  }
  /**
   * Returns whether this Interval's start and end are both in the same unit of time
   * @param {string} unit - the unit of time to check sameness on
   * @return {boolean}
   */
  ;

  _proto.hasSame = function hasSame(unit) {
    return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, unit) : false;
  }
  /**
   * Return whether this Interval has the same start and end DateTimes.
   * @return {boolean}
   */
  ;

  _proto.isEmpty = function isEmpty() {
    return this.s.valueOf() === this.e.valueOf();
  }
  /**
   * Return whether this Interval's start is after the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  ;

  _proto.isAfter = function isAfter(dateTime) {
    if (!this.isValid) return false;
    return this.s > dateTime;
  }
  /**
   * Return whether this Interval's end is before the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  ;

  _proto.isBefore = function isBefore(dateTime) {
    if (!this.isValid) return false;
    return this.e <= dateTime;
  }
  /**
   * Return whether this Interval contains the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  ;

  _proto.contains = function contains(dateTime) {
    if (!this.isValid) return false;
    return this.s <= dateTime && this.e > dateTime;
  }
  /**
   * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
   * @param {Object} values - the values to set
   * @param {DateTime} values.start - the starting DateTime
   * @param {DateTime} values.end - the ending DateTime
   * @return {Interval}
   */
  ;

  _proto.set = function set(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        start = _ref.start,
        end = _ref.end;

    if (!this.isValid) return this;
    return Interval.fromDateTimes(start || this.s, end || this.e);
  }
  /**
   * Split this Interval at each of the specified DateTimes
   * @param {...DateTime} dateTimes - the unit of time to count.
   * @return {Array}
   */
  ;

  _proto.splitAt = function splitAt() {
    var _this = this;

    if (!this.isValid) return [];

    for (var _len = arguments.length, dateTimes = new Array(_len), _key = 0; _key < _len; _key++) {
      dateTimes[_key] = arguments[_key];
    }

    var sorted = dateTimes.map(friendlyDateTime).filter(function (d) {
      return _this.contains(d);
    }).sort(),
        results = [];
    var s = this.s,
        i = 0;

    while (s < this.e) {
      var added = sorted[i] || this.e,
          next = +added > +this.e ? this.e : added;
      results.push(Interval.fromDateTimes(s, next));
      s = next;
      i += 1;
    }

    return results;
  }
  /**
   * Split this Interval into smaller Intervals, each of the specified length.
   * Left over time is grouped into a smaller interval
   * @param {Duration|Object|number} duration - The length of each resulting interval.
   * @return {Array}
   */
  ;

  _proto.splitBy = function splitBy(duration) {
    var dur = friendlyDuration(duration);

    if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) {
      return [];
    }

    var s = this.s,
        idx = 1,
        next;
    var results = [];

    while (s < this.e) {
      var added = this.start.plus(dur.mapUnits(function (x) {
        return x * idx;
      }));
      next = +added > +this.e ? this.e : added;
      results.push(Interval.fromDateTimes(s, next));
      s = next;
      idx += 1;
    }

    return results;
  }
  /**
   * Split this Interval into the specified number of smaller intervals.
   * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
   * @return {Array}
   */
  ;

  _proto.divideEqually = function divideEqually(numberOfParts) {
    if (!this.isValid) return [];
    return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
  }
  /**
   * Return whether this Interval overlaps with the specified Interval
   * @param {Interval} other
   * @return {boolean}
   */
  ;

  _proto.overlaps = function overlaps(other) {
    return this.e > other.s && this.s < other.e;
  }
  /**
   * Return whether this Interval's end is adjacent to the specified Interval's start.
   * @param {Interval} other
   * @return {boolean}
   */
  ;

  _proto.abutsStart = function abutsStart(other) {
    if (!this.isValid) return false;
    return +this.e === +other.s;
  }
  /**
   * Return whether this Interval's start is adjacent to the specified Interval's end.
   * @param {Interval} other
   * @return {boolean}
   */
  ;

  _proto.abutsEnd = function abutsEnd(other) {
    if (!this.isValid) return false;
    return +other.e === +this.s;
  }
  /**
   * Return whether this Interval engulfs the start and end of the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  ;

  _proto.engulfs = function engulfs(other) {
    if (!this.isValid) return false;
    return this.s <= other.s && this.e >= other.e;
  }
  /**
   * Return whether this Interval has the same start and end as the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  ;

  _proto.equals = function equals(other) {
    if (!this.isValid || !other.isValid) {
      return false;
    }

    return this.s.equals(other.s) && this.e.equals(other.e);
  }
  /**
   * Return an Interval representing the intersection of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
   * Returns null if the intersection is empty, meaning, the intervals don't intersect.
   * @param {Interval} other
   * @return {Interval}
   */
  ;

  _proto.intersection = function intersection(other) {
    if (!this.isValid) return this;
    var s = this.s > other.s ? this.s : other.s,
        e = this.e < other.e ? this.e : other.e;

    if (s >= e) {
      return null;
    } else {
      return Interval.fromDateTimes(s, e);
    }
  }
  /**
   * Return an Interval representing the union of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
   * @param {Interval} other
   * @return {Interval}
   */
  ;

  _proto.union = function union(other) {
    if (!this.isValid) return this;
    var s = this.s < other.s ? this.s : other.s,
        e = this.e > other.e ? this.e : other.e;
    return Interval.fromDateTimes(s, e);
  }
  /**
   * Merge an array of Intervals into a equivalent minimal set of Intervals.
   * Combines overlapping and adjacent Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  ;

  Interval.merge = function merge(intervals) {
    var _intervals$sort$reduc = intervals.sort(function (a, b) {
      return a.s - b.s;
    }).reduce(function (_ref2, item) {
      var sofar = _ref2[0],
          current = _ref2[1];

      if (!current) {
        return [sofar, item];
      } else if (current.overlaps(item) || current.abutsStart(item)) {
        return [sofar, current.union(item)];
      } else {
        return [sofar.concat([current]), item];
      }
    }, [[], null]),
        found = _intervals$sort$reduc[0],
        final = _intervals$sort$reduc[1];

    if (final) {
      found.push(final);
    }

    return found;
  }
  /**
   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  ;

  Interval.xor = function xor(intervals) {
    var _Array$prototype;

    var start = null,
        currentCount = 0;

    var results = [],
        ends = intervals.map(function (i) {
      return [{
        time: i.s,
        type: "s"
      }, {
        time: i.e,
        type: "e"
      }];
    }),
        flattened = (_Array$prototype = Array.prototype).concat.apply(_Array$prototype, ends),
        arr = flattened.sort(function (a, b) {
      return a.time - b.time;
    });

    for (var _iterator = _createForOfIteratorHelperLoose(arr), _step; !(_step = _iterator()).done;) {
      var i = _step.value;
      currentCount += i.type === "s" ? 1 : -1;

      if (currentCount === 1) {
        start = i.time;
      } else {
        if (start && +start !== +i.time) {
          results.push(Interval.fromDateTimes(start, i.time));
        }

        start = null;
      }
    }

    return Interval.merge(results);
  }
  /**
   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
   * @param {...Interval} intervals
   * @return {Array}
   */
  ;

  _proto.difference = function difference() {
    var _this2 = this;

    for (var _len2 = arguments.length, intervals = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      intervals[_key2] = arguments[_key2];
    }

    return Interval.xor([this].concat(intervals)).map(function (i) {
      return _this2.intersection(i);
    }).filter(function (i) {
      return i && !i.isEmpty();
    });
  }
  /**
   * Returns a string representation of this Interval appropriate for debugging.
   * @return {string}
   */
  ;

  _proto.toString = function toString() {
    if (!this.isValid) return INVALID$1;
    return "[" + this.s.toISO() + " \u2013 " + this.e.toISO() + ")";
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  ;

  _proto.toISO = function toISO(opts) {
    if (!this.isValid) return INVALID$1;
    return this.s.toISO(opts) + "/" + this.e.toISO(opts);
  }
  /**
   * Returns an ISO 8601-compliant string representation of date of this Interval.
   * The time components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {string}
   */
  ;

  _proto.toISODate = function toISODate() {
    if (!this.isValid) return INVALID$1;
    return this.s.toISODate() + "/" + this.e.toISODate();
  }
  /**
   * Returns an ISO 8601-compliant string representation of time of this Interval.
   * The date components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime.toISO}
   * @return {string}
   */
  ;

  _proto.toISOTime = function toISOTime(opts) {
    if (!this.isValid) return INVALID$1;
    return this.s.toISOTime(opts) + "/" + this.e.toISOTime(opts);
  }
  /**
   * Returns a string representation of this Interval formatted according to the specified format string.
   * @param {string} dateFormat - the format string. This string formats the start and end time. See {@link DateTime.toFormat} for details.
   * @param {Object} opts - options
   * @param {string} [opts.separator =  ' – '] - a separator to place between the start and end representations
   * @return {string}
   */
  ;

  _proto.toFormat = function toFormat(dateFormat, _temp2) {
    var _ref3 = _temp2 === void 0 ? {} : _temp2,
        _ref3$separator = _ref3.separator,
        separator = _ref3$separator === void 0 ? " – " : _ref3$separator;

    if (!this.isValid) return INVALID$1;
    return "" + this.s.toFormat(dateFormat) + separator + this.e.toFormat(dateFormat);
  }
  /**
   * Return a Duration representing the time spanned by this interval.
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
   * @return {Duration}
   */
  ;

  _proto.toDuration = function toDuration(unit, opts) {
    if (!this.isValid) {
      return Duration.invalid(this.invalidReason);
    }

    return this.e.diff(this.s, unit, opts);
  }
  /**
   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
   * @param {function} mapFn
   * @return {Interval}
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
   */
  ;

  _proto.mapEndpoints = function mapEndpoints(mapFn) {
    return Interval.fromDateTimes(mapFn(this.s), mapFn(this.e));
  };

  _createClass(Interval, [{
    key: "start",
    get: function get() {
      return this.isValid ? this.s : null;
    }
    /**
     * Returns the end of the Interval
     * @type {DateTime}
     */

  }, {
    key: "end",
    get: function get() {
      return this.isValid ? this.e : null;
    }
    /**
     * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
     * @type {boolean}
     */

  }, {
    key: "isValid",
    get: function get() {
      return this.invalidReason === null;
    }
    /**
     * Returns an error code if this Interval is invalid, or null if the Interval is valid
     * @type {string}
     */

  }, {
    key: "invalidReason",
    get: function get() {
      return this.invalid ? this.invalid.reason : null;
    }
    /**
     * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
     * @type {string}
     */

  }, {
    key: "invalidExplanation",
    get: function get() {
      return this.invalid ? this.invalid.explanation : null;
    }
  }]);

  return Interval;
}();

/**
 * The Info class contains static methods for retrieving general time and date related data. For example, it has methods for finding out if a time zone has a DST, for listing the months in any supported locale, and for discovering which of Luxon features are available in the current environment.
 */

var Info = /*#__PURE__*/function () {
  function Info() {}

  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  Info.hasDST = function hasDST(zone) {
    if (zone === void 0) {
      zone = Settings.defaultZone;
    }

    var proto = DateTime.now().setZone(zone).set({
      month: 12
    });
    return !zone.isUniversal && proto.offset !== proto.set({
      month: 6
    }).offset;
  }
  /**
   * Return whether the specified zone is a valid IANA specifier.
   * @param {string} zone - Zone to check
   * @return {boolean}
   */
  ;

  Info.isValidIANAZone = function isValidIANAZone(zone) {
    return IANAZone.isValidSpecifier(zone) && IANAZone.isValidZone(zone);
  }
  /**
   * Converts the input into a {@link Zone} instance.
   *
   * * If `input` is already a Zone instance, it is returned unchanged.
   * * If `input` is a string containing a valid time zone name, a Zone instance
   *   with that name is returned.
   * * If `input` is a string that doesn't refer to a known time zone, a Zone
   *   instance with {@link Zone.isValid} == false is returned.
   * * If `input is a number, a Zone instance with the specified fixed offset
   *   in minutes is returned.
   * * If `input` is `null` or `undefined`, the default zone is returned.
   * @param {string|Zone|number} [input] - the value to be converted
   * @return {Zone}
   */
  ;

  Info.normalizeZone = function normalizeZone$1(input) {
    return normalizeZone(input, Settings.defaultZone);
  }
  /**
   * Return an array of standalone month names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @example Info.months()[0] //=> 'January'
   * @example Info.months('short')[0] //=> 'Jan'
   * @example Info.months('numeric')[0] //=> '1'
   * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
   * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
   * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
   * @return {Array}
   */
  ;

  Info.months = function months(length, _temp) {
    if (length === void 0) {
      length = "long";
    }

    var _ref = _temp === void 0 ? {} : _temp,
        _ref$locale = _ref.locale,
        locale = _ref$locale === void 0 ? null : _ref$locale,
        _ref$numberingSystem = _ref.numberingSystem,
        numberingSystem = _ref$numberingSystem === void 0 ? null : _ref$numberingSystem,
        _ref$locObj = _ref.locObj,
        locObj = _ref$locObj === void 0 ? null : _ref$locObj,
        _ref$outputCalendar = _ref.outputCalendar,
        outputCalendar = _ref$outputCalendar === void 0 ? "gregory" : _ref$outputCalendar;

    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length);
  }
  /**
   * Return an array of format month names.
   * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
   * changes the string.
   * See {@link Info#months}
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @return {Array}
   */
  ;

  Info.monthsFormat = function monthsFormat(length, _temp2) {
    if (length === void 0) {
      length = "long";
    }

    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$locale = _ref2.locale,
        locale = _ref2$locale === void 0 ? null : _ref2$locale,
        _ref2$numberingSystem = _ref2.numberingSystem,
        numberingSystem = _ref2$numberingSystem === void 0 ? null : _ref2$numberingSystem,
        _ref2$locObj = _ref2.locObj,
        locObj = _ref2$locObj === void 0 ? null : _ref2$locObj,
        _ref2$outputCalendar = _ref2.outputCalendar,
        outputCalendar = _ref2$outputCalendar === void 0 ? "gregory" : _ref2$outputCalendar;

    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length, true);
  }
  /**
   * Return an array of standalone week names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @example Info.weekdays()[0] //=> 'Monday'
   * @example Info.weekdays('short')[0] //=> 'Mon'
   * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
   * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
   * @return {Array}
   */
  ;

  Info.weekdays = function weekdays(length, _temp3) {
    if (length === void 0) {
      length = "long";
    }

    var _ref3 = _temp3 === void 0 ? {} : _temp3,
        _ref3$locale = _ref3.locale,
        locale = _ref3$locale === void 0 ? null : _ref3$locale,
        _ref3$numberingSystem = _ref3.numberingSystem,
        numberingSystem = _ref3$numberingSystem === void 0 ? null : _ref3$numberingSystem,
        _ref3$locObj = _ref3.locObj,
        locObj = _ref3$locObj === void 0 ? null : _ref3$locObj;

    return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length);
  }
  /**
   * Return an array of format week names.
   * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
   * changes the string.
   * See {@link Info#weekdays}
   * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale=null] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @return {Array}
   */
  ;

  Info.weekdaysFormat = function weekdaysFormat(length, _temp4) {
    if (length === void 0) {
      length = "long";
    }

    var _ref4 = _temp4 === void 0 ? {} : _temp4,
        _ref4$locale = _ref4.locale,
        locale = _ref4$locale === void 0 ? null : _ref4$locale,
        _ref4$numberingSystem = _ref4.numberingSystem,
        numberingSystem = _ref4$numberingSystem === void 0 ? null : _ref4$numberingSystem,
        _ref4$locObj = _ref4.locObj,
        locObj = _ref4$locObj === void 0 ? null : _ref4$locObj;

    return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length, true);
  }
  /**
   * Return an array of meridiems.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.meridiems() //=> [ 'AM', 'PM' ]
   * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
   * @return {Array}
   */
  ;

  Info.meridiems = function meridiems(_temp5) {
    var _ref5 = _temp5 === void 0 ? {} : _temp5,
        _ref5$locale = _ref5.locale,
        locale = _ref5$locale === void 0 ? null : _ref5$locale;

    return Locale.create(locale).meridiems();
  }
  /**
   * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
   * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.eras() //=> [ 'BC', 'AD' ]
   * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
   * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
   * @return {Array}
   */
  ;

  Info.eras = function eras(length, _temp6) {
    if (length === void 0) {
      length = "short";
    }

    var _ref6 = _temp6 === void 0 ? {} : _temp6,
        _ref6$locale = _ref6.locale,
        locale = _ref6$locale === void 0 ? null : _ref6$locale;

    return Locale.create(locale, null, "gregory").eras(length);
  }
  /**
   * Return the set of available features in this environment.
   * Some features of Luxon are not available in all environments. For example, on older browsers, timezone support is not available. Use this function to figure out if that's the case.
   * Keys:
   * * `relative`: whether this environment supports relative time formatting
   * @example Info.features() //=> { intl: true, intlTokens: false, zones: true, relative: false }
   * @return {Object}
   */
  ;

  Info.features = function features() {
    return {
      relative: hasRelative()
    };
  };

  return Info;
}();

function dayDiff(earlier, later) {
  var utcDayStart = function utcDayStart(dt) {
    return dt.toUTC(0, {
      keepLocalTime: true
    }).startOf("day").valueOf();
  },
      ms = utcDayStart(later) - utcDayStart(earlier);

  return Math.floor(Duration.fromMillis(ms).as("days"));
}

function highOrderDiffs(cursor, later, units) {
  var differs = [["years", function (a, b) {
    return b.year - a.year;
  }], ["quarters", function (a, b) {
    return b.quarter - a.quarter;
  }], ["months", function (a, b) {
    return b.month - a.month + (b.year - a.year) * 12;
  }], ["weeks", function (a, b) {
    var days = dayDiff(a, b);
    return (days - days % 7) / 7;
  }], ["days", dayDiff]];
  var results = {};
  var lowestOrder, highWater;

  for (var _i = 0, _differs = differs; _i < _differs.length; _i++) {
    var _differs$_i = _differs[_i],
        unit = _differs$_i[0],
        differ = _differs$_i[1];

    if (units.indexOf(unit) >= 0) {
      var _cursor$plus;

      lowestOrder = unit;
      var delta = differ(cursor, later);
      highWater = cursor.plus((_cursor$plus = {}, _cursor$plus[unit] = delta, _cursor$plus));

      if (highWater > later) {
        var _cursor$plus2;

        cursor = cursor.plus((_cursor$plus2 = {}, _cursor$plus2[unit] = delta - 1, _cursor$plus2));
        delta -= 1;
      } else {
        cursor = highWater;
      }

      results[unit] = delta;
    }
  }

  return [cursor, results, highWater, lowestOrder];
}

function _diff (earlier, later, units, opts) {
  var _highOrderDiffs = highOrderDiffs(earlier, later, units),
      cursor = _highOrderDiffs[0],
      results = _highOrderDiffs[1],
      highWater = _highOrderDiffs[2],
      lowestOrder = _highOrderDiffs[3];

  var remainingMillis = later - cursor;
  var lowerOrderUnits = units.filter(function (u) {
    return ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0;
  });

  if (lowerOrderUnits.length === 0) {
    if (highWater < later) {
      var _cursor$plus3;

      highWater = cursor.plus((_cursor$plus3 = {}, _cursor$plus3[lowestOrder] = 1, _cursor$plus3));
    }

    if (highWater !== cursor) {
      results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
    }
  }

  var duration = Duration.fromObject(results, opts);

  if (lowerOrderUnits.length > 0) {
    var _Duration$fromMillis;

    return (_Duration$fromMillis = Duration.fromMillis(remainingMillis, opts)).shiftTo.apply(_Duration$fromMillis, lowerOrderUnits).plus(duration);
  } else {
    return duration;
  }
}

var numberingSystems = {
  arab: "[\u0660-\u0669]",
  arabext: "[\u06F0-\u06F9]",
  bali: "[\u1B50-\u1B59]",
  beng: "[\u09E6-\u09EF]",
  deva: "[\u0966-\u096F]",
  fullwide: "[\uFF10-\uFF19]",
  gujr: "[\u0AE6-\u0AEF]",
  hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
  khmr: "[\u17E0-\u17E9]",
  knda: "[\u0CE6-\u0CEF]",
  laoo: "[\u0ED0-\u0ED9]",
  limb: "[\u1946-\u194F]",
  mlym: "[\u0D66-\u0D6F]",
  mong: "[\u1810-\u1819]",
  mymr: "[\u1040-\u1049]",
  orya: "[\u0B66-\u0B6F]",
  tamldec: "[\u0BE6-\u0BEF]",
  telu: "[\u0C66-\u0C6F]",
  thai: "[\u0E50-\u0E59]",
  tibt: "[\u0F20-\u0F29]",
  latn: "\\d"
};
var numberingSystemsUTF16 = {
  arab: [1632, 1641],
  arabext: [1776, 1785],
  bali: [6992, 7001],
  beng: [2534, 2543],
  deva: [2406, 2415],
  fullwide: [65296, 65303],
  gujr: [2790, 2799],
  khmr: [6112, 6121],
  knda: [3302, 3311],
  laoo: [3792, 3801],
  limb: [6470, 6479],
  mlym: [3430, 3439],
  mong: [6160, 6169],
  mymr: [4160, 4169],
  orya: [2918, 2927],
  tamldec: [3046, 3055],
  telu: [3174, 3183],
  thai: [3664, 3673],
  tibt: [3872, 3881]
};
var hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");
function parseDigits(str) {
  var value = parseInt(str, 10);

  if (isNaN(value)) {
    value = "";

    for (var i = 0; i < str.length; i++) {
      var code = str.charCodeAt(i);

      if (str[i].search(numberingSystems.hanidec) !== -1) {
        value += hanidecChars.indexOf(str[i]);
      } else {
        for (var key in numberingSystemsUTF16) {
          var _numberingSystemsUTF = numberingSystemsUTF16[key],
              min = _numberingSystemsUTF[0],
              max = _numberingSystemsUTF[1];

          if (code >= min && code <= max) {
            value += code - min;
          }
        }
      }
    }

    return parseInt(value, 10);
  } else {
    return value;
  }
}
function digitRegex(_ref, append) {
  var numberingSystem = _ref.numberingSystem;

  if (append === void 0) {
    append = "";
  }

  return new RegExp("" + numberingSystems[numberingSystem || "latn"] + append);
}

var MISSING_FTP = "missing Intl.DateTimeFormat.formatToParts support";

function intUnit(regex, post) {
  if (post === void 0) {
    post = function post(i) {
      return i;
    };
  }

  return {
    regex: regex,
    deser: function deser(_ref) {
      var s = _ref[0];
      return post(parseDigits(s));
    }
  };
}

var NBSP = String.fromCharCode(160);
var spaceOrNBSP = "( |" + NBSP + ")";
var spaceOrNBSPRegExp = new RegExp(spaceOrNBSP, "g");

function fixListRegex(s) {
  // make dots optional and also make them literal
  // make space and non breakable space characters interchangeable
  return s.replace(/\./g, "\\.?").replace(spaceOrNBSPRegExp, spaceOrNBSP);
}

function stripInsensitivities(s) {
  return s.replace(/\./g, "") // ignore dots that were made optional
  .replace(spaceOrNBSPRegExp, " ") // interchange space and nbsp
  .toLowerCase();
}

function oneOf(strings, startIndex) {
  if (strings === null) {
    return null;
  } else {
    return {
      regex: RegExp(strings.map(fixListRegex).join("|")),
      deser: function deser(_ref2) {
        var s = _ref2[0];
        return strings.findIndex(function (i) {
          return stripInsensitivities(s) === stripInsensitivities(i);
        }) + startIndex;
      }
    };
  }
}

function offset(regex, groups) {
  return {
    regex: regex,
    deser: function deser(_ref3) {
      var h = _ref3[1],
          m = _ref3[2];
      return signedOffset(h, m);
    },
    groups: groups
  };
}

function simple(regex) {
  return {
    regex: regex,
    deser: function deser(_ref4) {
      var s = _ref4[0];
      return s;
    }
  };
}

function escapeToken(value) {
  return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}

function unitForToken(token, loc) {
  var one = digitRegex(loc),
      two = digitRegex(loc, "{2}"),
      three = digitRegex(loc, "{3}"),
      four = digitRegex(loc, "{4}"),
      six = digitRegex(loc, "{6}"),
      oneOrTwo = digitRegex(loc, "{1,2}"),
      oneToThree = digitRegex(loc, "{1,3}"),
      oneToSix = digitRegex(loc, "{1,6}"),
      oneToNine = digitRegex(loc, "{1,9}"),
      twoToFour = digitRegex(loc, "{2,4}"),
      fourToSix = digitRegex(loc, "{4,6}"),
      literal = function literal(t) {
    return {
      regex: RegExp(escapeToken(t.val)),
      deser: function deser(_ref5) {
        var s = _ref5[0];
        return s;
      },
      literal: true
    };
  },
      unitate = function unitate(t) {
    if (token.literal) {
      return literal(t);
    }

    switch (t.val) {
      // era
      case "G":
        return oneOf(loc.eras("short", false), 0);

      case "GG":
        return oneOf(loc.eras("long", false), 0);
      // years

      case "y":
        return intUnit(oneToSix);

      case "yy":
        return intUnit(twoToFour, untruncateYear);

      case "yyyy":
        return intUnit(four);

      case "yyyyy":
        return intUnit(fourToSix);

      case "yyyyyy":
        return intUnit(six);
      // months

      case "M":
        return intUnit(oneOrTwo);

      case "MM":
        return intUnit(two);

      case "MMM":
        return oneOf(loc.months("short", true, false), 1);

      case "MMMM":
        return oneOf(loc.months("long", true, false), 1);

      case "L":
        return intUnit(oneOrTwo);

      case "LL":
        return intUnit(two);

      case "LLL":
        return oneOf(loc.months("short", false, false), 1);

      case "LLLL":
        return oneOf(loc.months("long", false, false), 1);
      // dates

      case "d":
        return intUnit(oneOrTwo);

      case "dd":
        return intUnit(two);
      // ordinals

      case "o":
        return intUnit(oneToThree);

      case "ooo":
        return intUnit(three);
      // time

      case "HH":
        return intUnit(two);

      case "H":
        return intUnit(oneOrTwo);

      case "hh":
        return intUnit(two);

      case "h":
        return intUnit(oneOrTwo);

      case "mm":
        return intUnit(two);

      case "m":
        return intUnit(oneOrTwo);

      case "q":
        return intUnit(oneOrTwo);

      case "qq":
        return intUnit(two);

      case "s":
        return intUnit(oneOrTwo);

      case "ss":
        return intUnit(two);

      case "S":
        return intUnit(oneToThree);

      case "SSS":
        return intUnit(three);

      case "u":
        return simple(oneToNine);
      // meridiem

      case "a":
        return oneOf(loc.meridiems(), 0);
      // weekYear (k)

      case "kkkk":
        return intUnit(four);

      case "kk":
        return intUnit(twoToFour, untruncateYear);
      // weekNumber (W)

      case "W":
        return intUnit(oneOrTwo);

      case "WW":
        return intUnit(two);
      // weekdays

      case "E":
      case "c":
        return intUnit(one);

      case "EEE":
        return oneOf(loc.weekdays("short", false, false), 1);

      case "EEEE":
        return oneOf(loc.weekdays("long", false, false), 1);

      case "ccc":
        return oneOf(loc.weekdays("short", true, false), 1);

      case "cccc":
        return oneOf(loc.weekdays("long", true, false), 1);
      // offset/zone

      case "Z":
      case "ZZ":
        return offset(new RegExp("([+-]" + oneOrTwo.source + ")(?::(" + two.source + "))?"), 2);

      case "ZZZ":
        return offset(new RegExp("([+-]" + oneOrTwo.source + ")(" + two.source + ")?"), 2);
      // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
      // because we don't have any way to figure out what they are

      case "z":
        return simple(/[a-z_+-/]{1,256}?/i);

      default:
        return literal(t);
    }
  };

  var unit = unitate(token) || {
    invalidReason: MISSING_FTP
  };
  unit.token = token;
  return unit;
}

var partTypeStyleToTokenVal = {
  year: {
    "2-digit": "yy",
    numeric: "yyyyy"
  },
  month: {
    numeric: "M",
    "2-digit": "MM",
    short: "MMM",
    long: "MMMM"
  },
  day: {
    numeric: "d",
    "2-digit": "dd"
  },
  weekday: {
    short: "EEE",
    long: "EEEE"
  },
  dayperiod: "a",
  dayPeriod: "a",
  hour: {
    numeric: "h",
    "2-digit": "hh"
  },
  minute: {
    numeric: "m",
    "2-digit": "mm"
  },
  second: {
    numeric: "s",
    "2-digit": "ss"
  }
};

function tokenForPart(part, locale, formatOpts) {
  var type = part.type,
      value = part.value;

  if (type === "literal") {
    return {
      literal: true,
      val: value
    };
  }

  var style = formatOpts[type];
  var val = partTypeStyleToTokenVal[type];

  if (typeof val === "object") {
    val = val[style];
  }

  if (val) {
    return {
      literal: false,
      val: val
    };
  }

  return undefined;
}

function buildRegex(units) {
  var re = units.map(function (u) {
    return u.regex;
  }).reduce(function (f, r) {
    return f + "(" + r.source + ")";
  }, "");
  return ["^" + re + "$", units];
}

function match(input, regex, handlers) {
  var matches = input.match(regex);

  if (matches) {
    var all = {};
    var matchIndex = 1;

    for (var i in handlers) {
      if (hasOwnProperty(handlers, i)) {
        var h = handlers[i],
            groups = h.groups ? h.groups + 1 : 1;

        if (!h.literal && h.token) {
          all[h.token.val[0]] = h.deser(matches.slice(matchIndex, matchIndex + groups));
        }

        matchIndex += groups;
      }
    }

    return [matches, all];
  } else {
    return [matches, {}];
  }
}

function dateTimeFromMatches(matches) {
  var toField = function toField(token) {
    switch (token) {
      case "S":
        return "millisecond";

      case "s":
        return "second";

      case "m":
        return "minute";

      case "h":
      case "H":
        return "hour";

      case "d":
        return "day";

      case "o":
        return "ordinal";

      case "L":
      case "M":
        return "month";

      case "y":
        return "year";

      case "E":
      case "c":
        return "weekday";

      case "W":
        return "weekNumber";

      case "k":
        return "weekYear";

      case "q":
        return "quarter";

      default:
        return null;
    }
  };

  var zone;

  if (!isUndefined(matches.Z)) {
    zone = new FixedOffsetZone(matches.Z);
  } else if (!isUndefined(matches.z)) {
    zone = IANAZone.create(matches.z);
  } else {
    zone = null;
  }

  if (!isUndefined(matches.q)) {
    matches.M = (matches.q - 1) * 3 + 1;
  }

  if (!isUndefined(matches.h)) {
    if (matches.h < 12 && matches.a === 1) {
      matches.h += 12;
    } else if (matches.h === 12 && matches.a === 0) {
      matches.h = 0;
    }
  }

  if (matches.G === 0 && matches.y) {
    matches.y = -matches.y;
  }

  if (!isUndefined(matches.u)) {
    matches.S = parseMillis(matches.u);
  }

  var vals = Object.keys(matches).reduce(function (r, k) {
    var f = toField(k);

    if (f) {
      r[f] = matches[k];
    }

    return r;
  }, {});
  return [vals, zone];
}

var dummyDateTimeCache = null;

function getDummyDateTime() {
  if (!dummyDateTimeCache) {
    dummyDateTimeCache = DateTime.fromMillis(1555555555555);
  }

  return dummyDateTimeCache;
}

function maybeExpandMacroToken(token, locale) {
  if (token.literal) {
    return token;
  }

  var formatOpts = Formatter.macroTokenToFormatOpts(token.val);

  if (!formatOpts) {
    return token;
  }

  var formatter = Formatter.create(locale, formatOpts);
  var parts = formatter.formatDateTimeParts(getDummyDateTime());
  var tokens = parts.map(function (p) {
    return tokenForPart(p, locale, formatOpts);
  });

  if (tokens.includes(undefined)) {
    return token;
  }

  return tokens;
}

function expandMacroTokens(tokens, locale) {
  var _Array$prototype;

  return (_Array$prototype = Array.prototype).concat.apply(_Array$prototype, tokens.map(function (t) {
    return maybeExpandMacroToken(t, locale);
  }));
}
/**
 * @private
 */


function explainFromTokens(locale, input, format) {
  var tokens = expandMacroTokens(Formatter.parseFormat(format), locale),
      units = tokens.map(function (t) {
    return unitForToken(t, locale);
  }),
      disqualifyingUnit = units.find(function (t) {
    return t.invalidReason;
  });

  if (disqualifyingUnit) {
    return {
      input: input,
      tokens: tokens,
      invalidReason: disqualifyingUnit.invalidReason
    };
  } else {
    var _buildRegex = buildRegex(units),
        regexString = _buildRegex[0],
        handlers = _buildRegex[1],
        regex = RegExp(regexString, "i"),
        _match = match(input, regex, handlers),
        rawMatches = _match[0],
        matches = _match[1],
        _ref6 = matches ? dateTimeFromMatches(matches) : [null, null],
        result = _ref6[0],
        zone = _ref6[1];

    if (hasOwnProperty(matches, "a") && hasOwnProperty(matches, "H")) {
      throw new ConflictingSpecificationError("Can't include meridiem when specifying 24-hour format");
    }

    return {
      input: input,
      tokens: tokens,
      regex: regex,
      rawMatches: rawMatches,
      matches: matches,
      result: result,
      zone: zone
    };
  }
}
function parseFromTokens(locale, input, format) {
  var _explainFromTokens = explainFromTokens(locale, input, format),
      result = _explainFromTokens.result,
      zone = _explainFromTokens.zone,
      invalidReason = _explainFromTokens.invalidReason;

  return [result, zone, invalidReason];
}

var nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
    leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];

function unitOutOfRange(unit, value) {
  return new Invalid("unit out of range", "you specified " + value + " (of type " + typeof value + ") as a " + unit + ", which is invalid");
}

function dayOfWeek(year, month, day) {
  var js = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return js === 0 ? 7 : js;
}

function computeOrdinal(year, month, day) {
  return day + (isLeapYear(year) ? leapLadder : nonLeapLadder)[month - 1];
}

function uncomputeOrdinal(year, ordinal) {
  var table = isLeapYear(year) ? leapLadder : nonLeapLadder,
      month0 = table.findIndex(function (i) {
    return i < ordinal;
  }),
      day = ordinal - table[month0];
  return {
    month: month0 + 1,
    day: day
  };
}
/**
 * @private
 */


function gregorianToWeek(gregObj) {
  var year = gregObj.year,
      month = gregObj.month,
      day = gregObj.day,
      ordinal = computeOrdinal(year, month, day),
      weekday = dayOfWeek(year, month, day);
  var weekNumber = Math.floor((ordinal - weekday + 10) / 7),
      weekYear;

  if (weekNumber < 1) {
    weekYear = year - 1;
    weekNumber = weeksInWeekYear(weekYear);
  } else if (weekNumber > weeksInWeekYear(year)) {
    weekYear = year + 1;
    weekNumber = 1;
  } else {
    weekYear = year;
  }

  return _extends({
    weekYear: weekYear,
    weekNumber: weekNumber,
    weekday: weekday
  }, timeObject(gregObj));
}
function weekToGregorian(weekData) {
  var weekYear = weekData.weekYear,
      weekNumber = weekData.weekNumber,
      weekday = weekData.weekday,
      weekdayOfJan4 = dayOfWeek(weekYear, 1, 4),
      yearInDays = daysInYear(weekYear);
  var ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 3,
      year;

  if (ordinal < 1) {
    year = weekYear - 1;
    ordinal += daysInYear(year);
  } else if (ordinal > yearInDays) {
    year = weekYear + 1;
    ordinal -= daysInYear(weekYear);
  } else {
    year = weekYear;
  }

  var _uncomputeOrdinal = uncomputeOrdinal(year, ordinal),
      month = _uncomputeOrdinal.month,
      day = _uncomputeOrdinal.day;

  return _extends({
    year: year,
    month: month,
    day: day
  }, timeObject(weekData));
}
function gregorianToOrdinal(gregData) {
  var year = gregData.year,
      month = gregData.month,
      day = gregData.day;
  var ordinal = computeOrdinal(year, month, day);
  return _extends({
    year: year,
    ordinal: ordinal
  }, timeObject(gregData));
}
function ordinalToGregorian(ordinalData) {
  var year = ordinalData.year,
      ordinal = ordinalData.ordinal;

  var _uncomputeOrdinal2 = uncomputeOrdinal(year, ordinal),
      month = _uncomputeOrdinal2.month,
      day = _uncomputeOrdinal2.day;

  return _extends({
    year: year,
    month: month,
    day: day
  }, timeObject(ordinalData));
}
function hasInvalidWeekData(obj) {
  var validYear = isInteger(obj.weekYear),
      validWeek = integerBetween(obj.weekNumber, 1, weeksInWeekYear(obj.weekYear)),
      validWeekday = integerBetween(obj.weekday, 1, 7);

  if (!validYear) {
    return unitOutOfRange("weekYear", obj.weekYear);
  } else if (!validWeek) {
    return unitOutOfRange("week", obj.week);
  } else if (!validWeekday) {
    return unitOutOfRange("weekday", obj.weekday);
  } else return false;
}
function hasInvalidOrdinalData(obj) {
  var validYear = isInteger(obj.year),
      validOrdinal = integerBetween(obj.ordinal, 1, daysInYear(obj.year));

  if (!validYear) {
    return unitOutOfRange("year", obj.year);
  } else if (!validOrdinal) {
    return unitOutOfRange("ordinal", obj.ordinal);
  } else return false;
}
function hasInvalidGregorianData(obj) {
  var validYear = isInteger(obj.year),
      validMonth = integerBetween(obj.month, 1, 12),
      validDay = integerBetween(obj.day, 1, daysInMonth(obj.year, obj.month));

  if (!validYear) {
    return unitOutOfRange("year", obj.year);
  } else if (!validMonth) {
    return unitOutOfRange("month", obj.month);
  } else if (!validDay) {
    return unitOutOfRange("day", obj.day);
  } else return false;
}
function hasInvalidTimeData(obj) {
  var hour = obj.hour,
      minute = obj.minute,
      second = obj.second,
      millisecond = obj.millisecond;
  var validHour = integerBetween(hour, 0, 23) || hour === 24 && minute === 0 && second === 0 && millisecond === 0,
      validMinute = integerBetween(minute, 0, 59),
      validSecond = integerBetween(second, 0, 59),
      validMillisecond = integerBetween(millisecond, 0, 999);

  if (!validHour) {
    return unitOutOfRange("hour", hour);
  } else if (!validMinute) {
    return unitOutOfRange("minute", minute);
  } else if (!validSecond) {
    return unitOutOfRange("second", second);
  } else if (!validMillisecond) {
    return unitOutOfRange("millisecond", millisecond);
  } else return false;
}

var INVALID = "Invalid DateTime";
var MAX_DATE = 8.64e15;

function unsupportedZone(zone) {
  return new Invalid("unsupported zone", "the zone \"" + zone.name + "\" is not supported");
} // we cache week data on the DT object and this intermediates the cache


function possiblyCachedWeekData(dt) {
  if (dt.weekData === null) {
    dt.weekData = gregorianToWeek(dt.c);
  }

  return dt.weekData;
} // clone really means, "make a new object with these modifications". all "setters" really use this
// to create a new object while only changing some of the properties


function clone(inst, alts) {
  var current = {
    ts: inst.ts,
    zone: inst.zone,
    c: inst.c,
    o: inst.o,
    loc: inst.loc,
    invalid: inst.invalid
  };
  return new DateTime(_extends({}, current, alts, {
    old: current
  }));
} // find the right offset a given local time. The o input is our guess, which determines which
// offset we'll pick in ambiguous cases (e.g. there are two 3 AMs b/c Fallback DST)


function fixOffset(localTS, o, tz) {
  // Our UTC time is just a guess because our offset is just a guess
  var utcGuess = localTS - o * 60 * 1000; // Test whether the zone matches the offset for this ts

  var o2 = tz.offset(utcGuess); // If so, offset didn't change and we're done

  if (o === o2) {
    return [utcGuess, o];
  } // If not, change the ts by the difference in the offset


  utcGuess -= (o2 - o) * 60 * 1000; // If that gives us the local time we want, we're done

  var o3 = tz.offset(utcGuess);

  if (o2 === o3) {
    return [utcGuess, o2];
  } // If it's different, we're in a hole time. The offset has changed, but the we don't adjust the time


  return [localTS - Math.min(o2, o3) * 60 * 1000, Math.max(o2, o3)];
} // convert an epoch timestamp into a calendar object with the given offset


function tsToObj(ts, offset) {
  ts += offset * 60 * 1000;
  var d = new Date(ts);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
    second: d.getUTCSeconds(),
    millisecond: d.getUTCMilliseconds()
  };
} // convert a calendar object to a epoch timestamp


function objToTS(obj, offset, zone) {
  return fixOffset(objToLocalTS(obj), offset, zone);
} // create a new DT instance by adding a duration, adjusting for DSTs


function adjustTime(inst, dur) {
  var oPre = inst.o,
      year = inst.c.year + Math.trunc(dur.years),
      month = inst.c.month + Math.trunc(dur.months) + Math.trunc(dur.quarters) * 3,
      c = _extends({}, inst.c, {
    year: year,
    month: month,
    day: Math.min(inst.c.day, daysInMonth(year, month)) + Math.trunc(dur.days) + Math.trunc(dur.weeks) * 7
  }),
      millisToAdd = Duration.fromObject({
    years: dur.years - Math.trunc(dur.years),
    quarters: dur.quarters - Math.trunc(dur.quarters),
    months: dur.months - Math.trunc(dur.months),
    weeks: dur.weeks - Math.trunc(dur.weeks),
    days: dur.days - Math.trunc(dur.days),
    hours: dur.hours,
    minutes: dur.minutes,
    seconds: dur.seconds,
    milliseconds: dur.milliseconds
  }).as("milliseconds"),
      localTS = objToLocalTS(c);

  var _fixOffset = fixOffset(localTS, oPre, inst.zone),
      ts = _fixOffset[0],
      o = _fixOffset[1];

  if (millisToAdd !== 0) {
    ts += millisToAdd; // that could have changed the offset by going over a DST, but we want to keep the ts the same

    o = inst.zone.offset(ts);
  }

  return {
    ts: ts,
    o: o
  };
} // helper useful in turning the results of parsing into real dates
// by handling the zone options


function parseDataToDateTime(parsed, parsedZone, opts, format, text) {
  var setZone = opts.setZone,
      zone = opts.zone;

  if (parsed && Object.keys(parsed).length !== 0) {
    var interpretationZone = parsedZone || zone,
        inst = DateTime.fromObject(parsed, _extends({}, opts, {
      zone: interpretationZone
    }));
    return setZone ? inst : inst.setZone(zone);
  } else {
    return DateTime.invalid(new Invalid("unparsable", "the input \"" + text + "\" can't be parsed as " + format));
  }
} // if you want to output a technical format (e.g. RFC 2822), this helper
// helps handle the details


function toTechFormat(dt, format, allowZ) {
  if (allowZ === void 0) {
    allowZ = true;
  }

  return dt.isValid ? Formatter.create(Locale.create("en-US"), {
    allowZ: allowZ,
    forceSimple: true
  }).formatDateTimeFromString(dt, format) : null;
} // technical time formats (e.g. the time part of ISO 8601), take some options
// and this commonizes their handling


function toTechTimeFormat(dt, _ref) {
  var _ref$suppressSeconds = _ref.suppressSeconds,
      suppressSeconds = _ref$suppressSeconds === void 0 ? false : _ref$suppressSeconds,
      _ref$suppressMillisec = _ref.suppressMilliseconds,
      suppressMilliseconds = _ref$suppressMillisec === void 0 ? false : _ref$suppressMillisec,
      includeOffset = _ref.includeOffset,
      _ref$includePrefix = _ref.includePrefix,
      includePrefix = _ref$includePrefix === void 0 ? false : _ref$includePrefix,
      _ref$includeZone = _ref.includeZone,
      includeZone = _ref$includeZone === void 0 ? false : _ref$includeZone,
      _ref$spaceZone = _ref.spaceZone,
      spaceZone = _ref$spaceZone === void 0 ? false : _ref$spaceZone,
      _ref$format = _ref.format,
      format = _ref$format === void 0 ? "extended" : _ref$format;
  var fmt = format === "basic" ? "HHmm" : "HH:mm";

  if (!suppressSeconds || dt.second !== 0 || dt.millisecond !== 0) {
    fmt += format === "basic" ? "ss" : ":ss";

    if (!suppressMilliseconds || dt.millisecond !== 0) {
      fmt += ".SSS";
    }
  }

  if ((includeZone || includeOffset) && spaceZone) {
    fmt += " ";
  }

  if (includeZone) {
    fmt += "z";
  } else if (includeOffset) {
    fmt += format === "basic" ? "ZZZ" : "ZZ";
  }

  var str = toTechFormat(dt, fmt);

  if (includePrefix) {
    str = "T" + str;
  }

  return str;
} // defaults for unspecified units in the supported calendars


var defaultUnitValues = {
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
},
    defaultWeekUnitValues = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
},
    defaultOrdinalUnitValues = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}; // Units in the supported calendars, sorted by bigness

var orderedUnits = ["year", "month", "day", "hour", "minute", "second", "millisecond"],
    orderedWeekUnits = ["weekYear", "weekNumber", "weekday", "hour", "minute", "second", "millisecond"],
    orderedOrdinalUnits = ["year", "ordinal", "hour", "minute", "second", "millisecond"]; // standardize case and plurality in units

function normalizeUnit(unit) {
  var normalized = {
    year: "year",
    years: "year",
    month: "month",
    months: "month",
    day: "day",
    days: "day",
    hour: "hour",
    hours: "hour",
    minute: "minute",
    minutes: "minute",
    quarter: "quarter",
    quarters: "quarter",
    second: "second",
    seconds: "second",
    millisecond: "millisecond",
    milliseconds: "millisecond",
    weekday: "weekday",
    weekdays: "weekday",
    weeknumber: "weekNumber",
    weeksnumber: "weekNumber",
    weeknumbers: "weekNumber",
    weekyear: "weekYear",
    weekyears: "weekYear",
    ordinal: "ordinal"
  }[unit.toLowerCase()];
  if (!normalized) throw new InvalidUnitError(unit);
  return normalized;
} // this is a dumbed down version of fromObject() that runs about 60% faster
// but doesn't do any validation, makes a bunch of assumptions about what units
// are present, and so on.
// this is a dumbed down version of fromObject() that runs about 60% faster
// but doesn't do any validation, makes a bunch of assumptions about what units
// are present, and so on.


function quickDT(obj, opts) {
  var zone = normalizeZone(opts.zone, Settings.defaultZone),
      loc = Locale.fromObject(opts),
      tsNow = Settings.now();
  var ts, o; // assume we have the higher-order units

  if (!isUndefined(obj.year)) {
    for (var _iterator = _createForOfIteratorHelperLoose(orderedUnits), _step; !(_step = _iterator()).done;) {
      var u = _step.value;

      if (isUndefined(obj[u])) {
        obj[u] = defaultUnitValues[u];
      }
    }

    var invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);

    if (invalid) {
      return DateTime.invalid(invalid);
    }

    var offsetProvis = zone.offset(tsNow);

    var _objToTS = objToTS(obj, offsetProvis, zone);

    ts = _objToTS[0];
    o = _objToTS[1];
  } else {
    ts = tsNow;
  }

  return new DateTime({
    ts: ts,
    zone: zone,
    loc: loc,
    o: o
  });
}

function diffRelative(start, end, opts) {
  var round = isUndefined(opts.round) ? true : opts.round,
      format = function format(c, unit) {
    c = roundTo(c, round || opts.calendary ? 0 : 2, true);
    var formatter = end.loc.clone(opts).relFormatter(opts);
    return formatter.format(c, unit);
  },
      differ = function differ(unit) {
    if (opts.calendary) {
      if (!end.hasSame(start, unit)) {
        return end.startOf(unit).diff(start.startOf(unit), unit).get(unit);
      } else return 0;
    } else {
      return end.diff(start, unit).get(unit);
    }
  };

  if (opts.unit) {
    return format(differ(opts.unit), opts.unit);
  }

  for (var _iterator2 = _createForOfIteratorHelperLoose(opts.units), _step2; !(_step2 = _iterator2()).done;) {
    var unit = _step2.value;
    var count = differ(unit);

    if (Math.abs(count) >= 1) {
      return format(count, unit);
    }
  }

  return format(start > end ? -0 : 0, opts.units[opts.units.length - 1]);
}

function lastOpts(argList) {
  var opts = {},
      args;

  if (argList.length > 0 && typeof argList[argList.length - 1] === "object") {
    opts = argList[argList.length - 1];
    args = Array.from(argList).slice(0, argList.length - 1);
  } else {
    args = Array.from(argList);
  }

  return [opts, args];
}
/**
 * A DateTime is an immutable data structure representing a specific date and time and accompanying methods. It contains class and instance methods for creating, parsing, interrogating, transforming, and formatting them.
 *
 * A DateTime comprises of:
 * * A timestamp. Each DateTime instance refers to a specific millisecond of the Unix epoch.
 * * A time zone. Each instance is considered in the context of a specific zone (by default the local system's zone).
 * * Configuration properties that effect how output strings are formatted, such as `locale`, `numberingSystem`, and `outputCalendar`.
 *
 * Here is a brief overview of the most commonly used functionality it provides:
 *
 * * **Creation**: To create a DateTime from its components, use one of its factory class methods: {@link DateTime.local}, {@link DateTime.utc}, and (most flexibly) {@link DateTime.fromObject}. To create one from a standard string format, use {@link DateTime.fromISO}, {@link DateTime.fromHTTP}, and {@link DateTime.fromRFC2822}. To create one from a custom string format, use {@link DateTime.fromFormat}. To create one from a native JS date, use {@link DateTime.fromJSDate}.
 * * **Gregorian calendar and time**: To examine the Gregorian properties of a DateTime individually (i.e as opposed to collectively through {@link DateTime#toObject}), use the {@link DateTime#year}, {@link DateTime#month},
 * {@link DateTime#day}, {@link DateTime#hour}, {@link DateTime#minute}, {@link DateTime#second}, {@link DateTime#millisecond} accessors.
 * * **Week calendar**: For ISO week calendar attributes, see the {@link DateTime#weekYear}, {@link DateTime#weekNumber}, and {@link DateTime#weekday} accessors.
 * * **Configuration** See the {@link DateTime#locale} and {@link DateTime#numberingSystem} accessors.
 * * **Transformation**: To transform the DateTime into other DateTimes, use {@link DateTime#set}, {@link DateTime#reconfigure}, {@link DateTime#setZone}, {@link DateTime#setLocale}, {@link DateTime.plus}, {@link DateTime#minus}, {@link DateTime#endOf}, {@link DateTime#startOf}, {@link DateTime#toUTC}, and {@link DateTime#toLocal}.
 * * **Output**: To convert the DateTime to other representations, use the {@link DateTime#toRelative}, {@link DateTime#toRelativeCalendar}, {@link DateTime#toJSON}, {@link DateTime#toISO}, {@link DateTime#toHTTP}, {@link DateTime#toObject}, {@link DateTime#toRFC2822}, {@link DateTime#toString}, {@link DateTime#toLocaleString}, {@link DateTime#toFormat}, {@link DateTime#toMillis} and {@link DateTime#toJSDate}.
 *
 * There's plenty others documented below. In addition, for more information on subtler topics like internationalization, time zones, alternative calendars, validity, and so on, see the external documentation.
 */


var DateTime = /*#__PURE__*/function () {
  /**
   * @access private
   */
  function DateTime(config) {
    var zone = config.zone || Settings.defaultZone;
    var invalid = config.invalid || (Number.isNaN(config.ts) ? new Invalid("invalid input") : null) || (!zone.isValid ? unsupportedZone(zone) : null);
    /**
     * @access private
     */

    this.ts = isUndefined(config.ts) ? Settings.now() : config.ts;
    var c = null,
        o = null;

    if (!invalid) {
      var unchanged = config.old && config.old.ts === this.ts && config.old.zone.equals(zone);

      if (unchanged) {
        var _ref2 = [config.old.c, config.old.o];
        c = _ref2[0];
        o = _ref2[1];
      } else {
        var ot = zone.offset(this.ts);
        c = tsToObj(this.ts, ot);
        invalid = Number.isNaN(c.year) ? new Invalid("invalid input") : null;
        c = invalid ? null : c;
        o = invalid ? null : ot;
      }
    }
    /**
     * @access private
     */


    this._zone = zone;
    /**
     * @access private
     */

    this.loc = config.loc || Locale.create();
    /**
     * @access private
     */

    this.invalid = invalid;
    /**
     * @access private
     */

    this.weekData = null;
    /**
     * @access private
     */

    this.c = c;
    /**
     * @access private
     */

    this.o = o;
    /**
     * @access private
     */

    this.isLuxonDateTime = true;
  } // CONSTRUCT

  /**
   * Create a DateTime for the current instant, in the system's time zone.
   *
   * Use Settings to override these default values if needed.
   * @example DateTime.now().toISO() //~> now in the ISO format
   * @return {DateTime}
   */


  DateTime.now = function now() {
    return new DateTime({});
  }
  /**
   * Create a local DateTime
   * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month, 1-indexed
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @example DateTime.local()                                  //~> now
   * @example DateTime.local({ zone: "America/New_York" })      //~> now, in US east coast time
   * @example DateTime.local(2017)                              //~> 2017-01-01T00:00:00
   * @example DateTime.local(2017, 3)                           //~> 2017-03-01T00:00:00
   * @example DateTime.local(2017, 3, 12, { locale: "fr" })     //~> 2017-03-12T00:00:00, with a French locale
   * @example DateTime.local(2017, 3, 12, 5)                    //~> 2017-03-12T05:00:00
   * @example DateTime.local(2017, 3, 12, 5, { zone: "utc" })   //~> 2017-03-12T05:00:00, in UTC
   * @example DateTime.local(2017, 3, 12, 5, 45)                //~> 2017-03-12T05:45:00
   * @example DateTime.local(2017, 3, 12, 5, 45, 10)            //~> 2017-03-12T05:45:10
   * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765)       //~> 2017-03-12T05:45:10.765
   * @return {DateTime}
   */
  ;

  DateTime.local = function local() {
    var _lastOpts = lastOpts(arguments),
        opts = _lastOpts[0],
        args = _lastOpts[1],
        year = args[0],
        month = args[1],
        day = args[2],
        hour = args[3],
        minute = args[4],
        second = args[5],
        millisecond = args[6];

    return quickDT({
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
      second: second,
      millisecond: millisecond
    }, opts);
  }
  /**
   * Create a DateTime in UTC
   * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @param {Object} options - configuration options for the DateTime
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @example DateTime.utc()                                              //~> now
   * @example DateTime.utc(2017)                                          //~> 2017-01-01T00:00:00Z
   * @example DateTime.utc(2017, 3)                                       //~> 2017-03-01T00:00:00Z
   * @example DateTime.utc(2017, 3, 12)                                   //~> 2017-03-12T00:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5)                                //~> 2017-03-12T05:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45)                            //~> 2017-03-12T05:45:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, { locale: "fr" })          //~> 2017-03-12T05:45:00Z with a French locale
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10)                        //~> 2017-03-12T05:45:10Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765, { locale: "fr" }) //~> 2017-03-12T05:45:10.765Z with a French locale
   * @return {DateTime}
   */
  ;

  DateTime.utc = function utc() {
    var _lastOpts2 = lastOpts(arguments),
        opts = _lastOpts2[0],
        args = _lastOpts2[1],
        year = args[0],
        month = args[1],
        day = args[2],
        hour = args[3],
        minute = args[4],
        second = args[5],
        millisecond = args[6];

    opts.zone = FixedOffsetZone.utcInstance;
    return quickDT({
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
      second: second,
      millisecond: millisecond
    }, opts);
  }
  /**
   * Create a DateTime from a JavaScript Date object. Uses the default zone.
   * @param {Date} date - a JavaScript Date object
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @return {DateTime}
   */
  ;

  DateTime.fromJSDate = function fromJSDate(date, options) {
    if (options === void 0) {
      options = {};
    }

    var ts = isDate(date) ? date.valueOf() : NaN;

    if (Number.isNaN(ts)) {
      return DateTime.invalid("invalid input");
    }

    var zoneToUse = normalizeZone(options.zone, Settings.defaultZone);

    if (!zoneToUse.isValid) {
      return DateTime.invalid(unsupportedZone(zoneToUse));
    }

    return new DateTime({
      ts: ts,
      zone: zoneToUse,
      loc: Locale.fromObject(options)
    });
  }
  /**
   * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} milliseconds - a number of milliseconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @return {DateTime}
   */
  ;

  DateTime.fromMillis = function fromMillis(milliseconds, options) {
    if (options === void 0) {
      options = {};
    }

    if (!isNumber(milliseconds)) {
      throw new InvalidArgumentError("fromMillis requires a numerical input, but received a " + typeof milliseconds + " with value " + milliseconds);
    } else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) {
      // this isn't perfect because because we can still end up out of range because of additional shifting, but it's a start
      return DateTime.invalid("Timestamp out of range");
    } else {
      return new DateTime({
        ts: milliseconds,
        zone: normalizeZone(options.zone, Settings.defaultZone),
        loc: Locale.fromObject(options)
      });
    }
  }
  /**
   * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} seconds - a number of seconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @return {DateTime}
   */
  ;

  DateTime.fromSeconds = function fromSeconds(seconds, options) {
    if (options === void 0) {
      options = {};
    }

    if (!isNumber(seconds)) {
      throw new InvalidArgumentError("fromSeconds requires a numerical input");
    } else {
      return new DateTime({
        ts: seconds * 1000,
        zone: normalizeZone(options.zone, Settings.defaultZone),
        loc: Locale.fromObject(options)
      });
    }
  }
  /**
   * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.year - a year, such as 1987
   * @param {number} obj.month - a month, 1-12
   * @param {number} obj.day - a day of the month, 1-31, depending on the month
   * @param {number} obj.ordinal - day of the year, 1-365 or 366
   * @param {number} obj.weekYear - an ISO week year
   * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
   * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
   * @param {number} obj.hour - hour of the day, 0-23
   * @param {number} obj.minute - minute of the hour, 0-59
   * @param {number} obj.second - second of the minute, 0-59
   * @param {number} obj.millisecond - millisecond of the second, 0-999
   * @param {Object} opts - options for creating this DateTime
   * @param {string|Zone} [opts.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
   * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'utc' }),
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'local' })
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'America/New_York' })
   * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
   * @return {DateTime}
   */
  ;

  DateTime.fromObject = function fromObject(obj, opts) {
    if (opts === void 0) {
      opts = {};
    }

    obj = obj || {};
    var zoneToUse = normalizeZone(opts.zone, Settings.defaultZone);

    if (!zoneToUse.isValid) {
      return DateTime.invalid(unsupportedZone(zoneToUse));
    }

    var tsNow = Settings.now(),
        offsetProvis = zoneToUse.offset(tsNow),
        normalized = normalizeObject(obj, normalizeUnit),
        containsOrdinal = !isUndefined(normalized.ordinal),
        containsGregorYear = !isUndefined(normalized.year),
        containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day),
        containsGregor = containsGregorYear || containsGregorMD,
        definiteWeekDef = normalized.weekYear || normalized.weekNumber,
        loc = Locale.fromObject(opts); // cases:
    // just a weekday -> this week's instance of that weekday, no worries
    // (gregorian data or ordinal) + (weekYear or weekNumber) -> error
    // (gregorian month or day) + ordinal -> error
    // otherwise just use weeks or ordinals or gregorian, depending on what's specified

    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
      throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
    }

    if (containsGregorMD && containsOrdinal) {
      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
    }

    var useWeekData = definiteWeekDef || normalized.weekday && !containsGregor; // configure ourselves to deal with gregorian dates or week stuff

    var units,
        defaultValues,
        objNow = tsToObj(tsNow, offsetProvis);

    if (useWeekData) {
      units = orderedWeekUnits;
      defaultValues = defaultWeekUnitValues;
      objNow = gregorianToWeek(objNow);
    } else if (containsOrdinal) {
      units = orderedOrdinalUnits;
      defaultValues = defaultOrdinalUnitValues;
      objNow = gregorianToOrdinal(objNow);
    } else {
      units = orderedUnits;
      defaultValues = defaultUnitValues;
    } // set default values for missing stuff


    var foundFirst = false;

    for (var _iterator3 = _createForOfIteratorHelperLoose(units), _step3; !(_step3 = _iterator3()).done;) {
      var u = _step3.value;
      var v = normalized[u];

      if (!isUndefined(v)) {
        foundFirst = true;
      } else if (foundFirst) {
        normalized[u] = defaultValues[u];
      } else {
        normalized[u] = objNow[u];
      }
    } // make sure the values we have are in range


    var higherOrderInvalid = useWeekData ? hasInvalidWeekData(normalized) : containsOrdinal ? hasInvalidOrdinalData(normalized) : hasInvalidGregorianData(normalized),
        invalid = higherOrderInvalid || hasInvalidTimeData(normalized);

    if (invalid) {
      return DateTime.invalid(invalid);
    } // compute the actual time


    var gregorian = useWeekData ? weekToGregorian(normalized) : containsOrdinal ? ordinalToGregorian(normalized) : normalized,
        _objToTS2 = objToTS(gregorian, offsetProvis, zoneToUse),
        tsFinal = _objToTS2[0],
        offsetFinal = _objToTS2[1],
        inst = new DateTime({
      ts: tsFinal,
      zone: zoneToUse,
      o: offsetFinal,
      loc: loc
    }); // gregorian data + weekday serves only to validate


    if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) {
      return DateTime.invalid("mismatched weekday", "you can't specify both a weekday of " + normalized.weekday + " and a date of " + inst.toISO());
    }

    return inst;
  }
  /**
   * Create a DateTime from an ISO 8601 string
   * @param {string} text - the ISO string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} [opts.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [opts.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromISO('2016-05-25T09:08:34.123')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
   * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
   * @example DateTime.fromISO('2016-W05-4')
   * @return {DateTime}
   */
  ;

  DateTime.fromISO = function fromISO(text, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var _parseISODate = parseISODate(text),
        vals = _parseISODate[0],
        parsedZone = _parseISODate[1];

    return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text);
  }
  /**
   * Create a DateTime from an RFC 2822 string
   * @param {string} text - the RFC 2822 string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
   * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
   * @return {DateTime}
   */
  ;

  DateTime.fromRFC2822 = function fromRFC2822(text, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var _parseRFC2822Date = parseRFC2822Date(text),
        vals = _parseRFC2822Date[0],
        parsedZone = _parseRFC2822Date[1];

    return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text);
  }
  /**
   * Create a DateTime from an HTTP header date
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @param {string} text - the HTTP header date
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
   * @return {DateTime}
   */
  ;

  DateTime.fromHTTP = function fromHTTP(text, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var _parseHTTPDate = parseHTTPDate(text),
        vals = _parseHTTPDate[0],
        parsedZone = _parseHTTPDate[1];

    return parseDataToDateTime(vals, parsedZone, opts, "HTTP", opts);
  }
  /**
   * Create a DateTime from an input string and format string.
   * Defaults to en-US if no locale has been specified, regardless of the system's locale. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/parsing?id=table-of-tokens).
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @return {DateTime}
   */
  ;

  DateTime.fromFormat = function fromFormat(text, fmt, opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (isUndefined(text) || isUndefined(fmt)) {
      throw new InvalidArgumentError("fromFormat requires an input string and a format");
    }

    var _opts = opts,
        _opts$locale = _opts.locale,
        locale = _opts$locale === void 0 ? null : _opts$locale,
        _opts$numberingSystem = _opts.numberingSystem,
        numberingSystem = _opts$numberingSystem === void 0 ? null : _opts$numberingSystem,
        localeToUse = Locale.fromOpts({
      locale: locale,
      numberingSystem: numberingSystem,
      defaultToEN: true
    }),
        _parseFromTokens = parseFromTokens(localeToUse, text, fmt),
        vals = _parseFromTokens[0],
        parsedZone = _parseFromTokens[1],
        invalid = _parseFromTokens[2];

    if (invalid) {
      return DateTime.invalid(invalid);
    } else {
      return parseDataToDateTime(vals, parsedZone, opts, "format " + fmt, text);
    }
  }
  /**
   * @deprecated use fromFormat instead
   */
  ;

  DateTime.fromString = function fromString(text, fmt, opts) {
    if (opts === void 0) {
      opts = {};
    }

    return DateTime.fromFormat(text, fmt, opts);
  }
  /**
   * Create a DateTime from a SQL date, time, or datetime
   * Defaults to en-US if no locale has been specified, regardless of the system's locale
   * @param {string} text - the string to parse
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @example DateTime.fromSQL('2017-05-15')
   * @example DateTime.fromSQL('2017-05-15 09:12:34')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
   * @example DateTime.fromSQL('09:12:34.342')
   * @return {DateTime}
   */
  ;

  DateTime.fromSQL = function fromSQL(text, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var _parseSQL = parseSQL(text),
        vals = _parseSQL[0],
        parsedZone = _parseSQL[1];

    return parseDataToDateTime(vals, parsedZone, opts, "SQL", text);
  }
  /**
   * Create an invalid DateTime.
   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {DateTime}
   */
  ;

  DateTime.invalid = function invalid(reason, explanation) {
    if (explanation === void 0) {
      explanation = null;
    }

    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the DateTime is invalid");
    }

    var invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

    if (Settings.throwOnInvalid) {
      throw new InvalidDateTimeError(invalid);
    } else {
      return new DateTime({
        invalid: invalid
      });
    }
  }
  /**
   * Check if an object is a DateTime. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  ;

  DateTime.isDateTime = function isDateTime(o) {
    return o && o.isLuxonDateTime || false;
  } // INFO

  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
   * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
   * @return {number}
   */
  ;

  var _proto = DateTime.prototype;

  _proto.get = function get(unit) {
    return this[unit];
  }
  /**
   * Returns whether the DateTime is valid. Invalid DateTimes occur when:
   * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
   * * The DateTime was created by an operation on another invalid date
   * @type {boolean}
   */
  ;

  /**
   * Returns the resolved Intl options for this DateTime.
   * This is useful in understanding the behavior of formatting methods
   * @param {Object} opts - the same options as toLocaleString
   * @return {Object}
   */
  _proto.resolvedLocaleOptions = function resolvedLocaleOptions(opts) {
    if (opts === void 0) {
      opts = {};
    }

    var _Formatter$create$res = Formatter.create(this.loc.clone(opts), opts).resolvedOptions(this),
        locale = _Formatter$create$res.locale,
        numberingSystem = _Formatter$create$res.numberingSystem,
        calendar = _Formatter$create$res.calendar;

    return {
      locale: locale,
      numberingSystem: numberingSystem,
      outputCalendar: calendar
    };
  } // TRANSFORM

  /**
   * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
   *
   * Equivalent to {@link DateTime.setZone}('utc')
   * @param {number} [offset=0] - optionally, an offset from UTC in minutes
   * @param {Object} [opts={}] - options to pass to `setZone()`
   * @return {DateTime}
   */
  ;

  _proto.toUTC = function toUTC(offset, opts) {
    if (offset === void 0) {
      offset = 0;
    }

    if (opts === void 0) {
      opts = {};
    }

    return this.setZone(FixedOffsetZone.instance(offset), opts);
  }
  /**
   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
   *
   * Equivalent to `setZone('local')`
   * @return {DateTime}
   */
  ;

  _proto.toLocal = function toLocal() {
    return this.setZone(Settings.defaultZone);
  }
  /**
   * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
   *
   * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link DateTime.plus}. You may wish to use {@link DateTime.toLocal} and {@link DateTime.toUTC} which provide simple convenience wrappers for commonly used zones.
   * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link DateTime.Zone} class.
   * @param {Object} opts - options
   * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
   * @return {DateTime}
   */
  ;

  _proto.setZone = function setZone(zone, _temp) {
    var _ref3 = _temp === void 0 ? {} : _temp,
        _ref3$keepLocalTime = _ref3.keepLocalTime,
        keepLocalTime = _ref3$keepLocalTime === void 0 ? false : _ref3$keepLocalTime,
        _ref3$keepCalendarTim = _ref3.keepCalendarTime,
        keepCalendarTime = _ref3$keepCalendarTim === void 0 ? false : _ref3$keepCalendarTim;

    zone = normalizeZone(zone, Settings.defaultZone);

    if (zone.equals(this.zone)) {
      return this;
    } else if (!zone.isValid) {
      return DateTime.invalid(unsupportedZone(zone));
    } else {
      var newTS = this.ts;

      if (keepLocalTime || keepCalendarTime) {
        var offsetGuess = zone.offset(this.ts);
        var asObj = this.toObject();

        var _objToTS3 = objToTS(asObj, offsetGuess, zone);

        newTS = _objToTS3[0];
      }

      return clone(this, {
        ts: newTS,
        zone: zone
      });
    }
  }
  /**
   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
   * @param {Object} properties - the properties to set
   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
   * @return {DateTime}
   */
  ;

  _proto.reconfigure = function reconfigure(_temp2) {
    var _ref4 = _temp2 === void 0 ? {} : _temp2,
        locale = _ref4.locale,
        numberingSystem = _ref4.numberingSystem,
        outputCalendar = _ref4.outputCalendar;

    var loc = this.loc.clone({
      locale: locale,
      numberingSystem: numberingSystem,
      outputCalendar: outputCalendar
    });
    return clone(this, {
      loc: loc
    });
  }
  /**
   * "Set" the locale. Returns a newly-constructed DateTime.
   * Just a convenient alias for reconfigure({ locale })
   * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
   * @return {DateTime}
   */
  ;

  _proto.setLocale = function setLocale(locale) {
    return this.reconfigure({
      locale: locale
    });
  }
  /**
   * "Set" the values of specified units. Returns a newly-constructed DateTime.
   * You can only set units with this method; for "setting" metadata, see {@link DateTime.reconfigure} and {@link DateTime.setZone}.
   * @param {Object} values - a mapping of units to numbers
   * @example dt.set({ year: 2017 })
   * @example dt.set({ hour: 8, minute: 30 })
   * @example dt.set({ weekday: 5 })
   * @example dt.set({ year: 2005, ordinal: 234 })
   * @return {DateTime}
   */
  ;

  _proto.set = function set(values) {
    if (!this.isValid) return this;
    var normalized = normalizeObject(values, normalizeUnit),
        settingWeekStuff = !isUndefined(normalized.weekYear) || !isUndefined(normalized.weekNumber) || !isUndefined(normalized.weekday),
        containsOrdinal = !isUndefined(normalized.ordinal),
        containsGregorYear = !isUndefined(normalized.year),
        containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day),
        containsGregor = containsGregorYear || containsGregorMD,
        definiteWeekDef = normalized.weekYear || normalized.weekNumber;

    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
      throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
    }

    if (containsGregorMD && containsOrdinal) {
      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
    }

    var mixed;

    if (settingWeekStuff) {
      mixed = weekToGregorian(_extends({}, gregorianToWeek(this.c), normalized));
    } else if (!isUndefined(normalized.ordinal)) {
      mixed = ordinalToGregorian(_extends({}, gregorianToOrdinal(this.c), normalized));
    } else {
      mixed = _extends({}, this.toObject(), normalized); // if we didn't set the day but we ended up on an overflow date,
      // use the last day of the right month

      if (isUndefined(normalized.day)) {
        mixed.day = Math.min(daysInMonth(mixed.year, mixed.month), mixed.day);
      }
    }

    var _objToTS4 = objToTS(mixed, this.o, this.zone),
        ts = _objToTS4[0],
        o = _objToTS4[1];

    return clone(this, {
      ts: ts,
      o: o
    });
  }
  /**
   * Add a period of time to this DateTime and return the resulting DateTime
   *
   * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @example DateTime.now().plus(123) //~> in 123 milliseconds
   * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
   * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
   * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
   * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
   * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
   * @return {DateTime}
   */
  ;

  _proto.plus = function plus(duration) {
    if (!this.isValid) return this;
    var dur = friendlyDuration(duration);
    return clone(this, adjustTime(this, dur));
  }
  /**
   * Subtract a period of time to this DateTime and return the resulting DateTime
   * See {@link DateTime.plus}
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   @return {DateTime}
  */
  ;

  _proto.minus = function minus(duration) {
    if (!this.isValid) return this;
    var dur = friendlyDuration(duration).negate();
    return clone(this, adjustTime(this, dur));
  }
  /**
   * "Set" this DateTime to the beginning of a unit of time.
   * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
   * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
   * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
   * @return {DateTime}
   */
  ;

  _proto.startOf = function startOf(unit) {
    if (!this.isValid) return this;
    var o = {},
        normalizedUnit = Duration.normalizeUnit(unit);

    switch (normalizedUnit) {
      case "years":
        o.month = 1;
      // falls through

      case "quarters":
      case "months":
        o.day = 1;
      // falls through

      case "weeks":
      case "days":
        o.hour = 0;
      // falls through

      case "hours":
        o.minute = 0;
      // falls through

      case "minutes":
        o.second = 0;
      // falls through

      case "seconds":
        o.millisecond = 0;
        break;
      // no default, invalid units throw in normalizeUnit()
    }

    if (normalizedUnit === "weeks") {
      o.weekday = 1;
    }

    if (normalizedUnit === "quarters") {
      var q = Math.ceil(this.month / 3);
      o.month = (q - 1) * 3 + 1;
    }

    return this.set(o);
  }
  /**
   * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
   * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
   * @return {DateTime}
   */
  ;

  _proto.endOf = function endOf(unit) {
    var _this$plus;

    return this.isValid ? this.plus((_this$plus = {}, _this$plus[unit] = 1, _this$plus)).startOf(unit).minus(1) : this;
  } // OUTPUT

  /**
   * Returns a string representation of this DateTime formatted according to the specified format string.
   * **You may not want this.** See {@link DateTime.toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
   * @param {string} fmt - the format string
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
   * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
   * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
   * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
   * @return {string}
   */
  ;

  _proto.toFormat = function toFormat(fmt, opts) {
    if (opts === void 0) {
      opts = {};
    }

    return this.isValid ? Formatter.create(this.loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt) : INVALID;
  }
  /**
   * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
   * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
   * of the DateTime in the assigned locale.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param formatOpts {Object} - Intl.DateTimeFormat constructor options and configuration options
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toLocaleString(); //=> 4/20/2017
   * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
   * @example DateTime.now().toLocaleString({ locale: 'en-gb' }); //=> '20/04/2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
   * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
   * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
   * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
   * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
   * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); //=> '11:32'
   * @return {string}
   */
  ;

  _proto.toLocaleString = function toLocaleString(formatOpts, opts) {
    if (formatOpts === void 0) {
      formatOpts = DATE_SHORT;
    }

    if (opts === void 0) {
      opts = {};
    }

    return this.isValid ? Formatter.create(this.loc.clone(opts), formatOpts).formatDateTime(this) : INVALID;
  }
  /**
   * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
   * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
   * @example DateTime.now().toLocaleParts(); //=> [
   *                                   //=>   { type: 'day', value: '25' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'month', value: '05' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'year', value: '1982' }
   *                                   //=> ]
   */
  ;

  _proto.toLocaleParts = function toLocaleParts(opts) {
    if (opts === void 0) {
      opts = {};
    }

    return this.isValid ? Formatter.create(this.loc.clone(opts), opts).formatDateTimeParts(this) : [];
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc(1982, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
   * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
   * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
   * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
   * @return {string}
   */
  ;

  _proto.toISO = function toISO(opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (!this.isValid) {
      return null;
    }

    return this.toISODate(opts) + "T" + this.toISOTime(opts);
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's date component
   * @param {Object} opts - options
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
   * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
   * @return {string}
   */
  ;

  _proto.toISODate = function toISODate(_temp3) {
    var _ref5 = _temp3 === void 0 ? {} : _temp3,
        _ref5$format = _ref5.format,
        format = _ref5$format === void 0 ? "extended" : _ref5$format;

    var fmt = format === "basic" ? "yyyyMMdd" : "yyyy-MM-dd";

    if (this.year > 9999) {
      fmt = "+" + fmt;
    }

    return toTechFormat(this, fmt);
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's week date
   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
   * @return {string}
   */
  ;

  _proto.toISOWeekDate = function toISOWeekDate() {
    return toTechFormat(this, "kkkk-'W'WW-c");
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's time component
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
   * @return {string}
   */
  ;

  _proto.toISOTime = function toISOTime(_temp4) {
    var _ref6 = _temp4 === void 0 ? {} : _temp4,
        _ref6$suppressMillise = _ref6.suppressMilliseconds,
        suppressMilliseconds = _ref6$suppressMillise === void 0 ? false : _ref6$suppressMillise,
        _ref6$suppressSeconds = _ref6.suppressSeconds,
        suppressSeconds = _ref6$suppressSeconds === void 0 ? false : _ref6$suppressSeconds,
        _ref6$includeOffset = _ref6.includeOffset,
        includeOffset = _ref6$includeOffset === void 0 ? true : _ref6$includeOffset,
        _ref6$includePrefix = _ref6.includePrefix,
        includePrefix = _ref6$includePrefix === void 0 ? false : _ref6$includePrefix,
        _ref6$format = _ref6.format,
        format = _ref6$format === void 0 ? "extended" : _ref6$format;

    return toTechTimeFormat(this, {
      suppressSeconds: suppressSeconds,
      suppressMilliseconds: suppressMilliseconds,
      includeOffset: includeOffset,
      includePrefix: includePrefix,
      format: format
    });
  }
  /**
   * Returns an RFC 2822-compatible string representation of this DateTime, always in UTC
   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
   * @return {string}
   */
  ;

  _proto.toRFC2822 = function toRFC2822() {
    return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in HTTP headers.
   * Specifically, the string conforms to RFC 1123.
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
   * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
   * @return {string}
   */
  ;

  _proto.toHTTP = function toHTTP() {
    return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Date
   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
   * @return {string}
   */
  ;

  _proto.toSQLDate = function toSQLDate() {
    return toTechFormat(this, "yyyy-MM-dd");
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Time
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @example DateTime.utc().toSQL() //=> '05:15:16.345'
   * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
   * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
   * @example DateTime.now().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
   * @return {string}
   */
  ;

  _proto.toSQLTime = function toSQLTime(_temp5) {
    var _ref7 = _temp5 === void 0 ? {} : _temp5,
        _ref7$includeOffset = _ref7.includeOffset,
        includeOffset = _ref7$includeOffset === void 0 ? true : _ref7$includeOffset,
        _ref7$includeZone = _ref7.includeZone,
        includeZone = _ref7$includeZone === void 0 ? false : _ref7$includeZone;

    return toTechTimeFormat(this, {
      includeOffset: includeOffset,
      includeZone: includeZone,
      spaceZone: true
    });
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
   * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
   * @return {string}
   */
  ;

  _proto.toSQL = function toSQL(opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (!this.isValid) {
      return null;
    }

    return this.toSQLDate() + " " + this.toSQLTime(opts);
  }
  /**
   * Returns a string representation of this DateTime appropriate for debugging
   * @return {string}
   */
  ;

  _proto.toString = function toString() {
    return this.isValid ? this.toISO() : INVALID;
  }
  /**
   * Returns the epoch milliseconds of this DateTime. Alias of {@link DateTime.toMillis}
   * @return {number}
   */
  ;

  _proto.valueOf = function valueOf() {
    return this.toMillis();
  }
  /**
   * Returns the epoch milliseconds of this DateTime.
   * @return {number}
   */
  ;

  _proto.toMillis = function toMillis() {
    return this.isValid ? this.ts : NaN;
  }
  /**
   * Returns the epoch seconds of this DateTime.
   * @return {number}
   */
  ;

  _proto.toSeconds = function toSeconds() {
    return this.isValid ? this.ts / 1000 : NaN;
  }
  /**
   * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
   * @return {string}
   */
  ;

  _proto.toJSON = function toJSON() {
    return this.toISO();
  }
  /**
   * Returns a BSON serializable equivalent to this DateTime.
   * @return {Date}
   */
  ;

  _proto.toBSON = function toBSON() {
    return this.toJSDate();
  }
  /**
   * Returns a JavaScript object with this DateTime's year, month, day, and so on.
   * @param opts - options for generating the object
   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
   * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
   * @return {Object}
   */
  ;

  _proto.toObject = function toObject(opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (!this.isValid) return {};

    var base = _extends({}, this.c);

    if (opts.includeConfig) {
      base.outputCalendar = this.outputCalendar;
      base.numberingSystem = this.loc.numberingSystem;
      base.locale = this.loc.locale;
    }

    return base;
  }
  /**
   * Returns a JavaScript Date equivalent to this DateTime.
   * @return {Date}
   */
  ;

  _proto.toJSDate = function toJSDate() {
    return new Date(this.isValid ? this.ts : NaN);
  } // COMPARE

  /**
   * Return the difference between two DateTimes as a Duration.
   * @param {DateTime} otherDateTime - the DateTime to compare this one to
   * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example
   * var i1 = DateTime.fromISO('1982-05-25T09:45'),
   *     i2 = DateTime.fromISO('1983-10-14T10:30');
   * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
   * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
   * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
   * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
   * @return {Duration}
   */
  ;

  _proto.diff = function diff(otherDateTime, unit, opts) {
    if (unit === void 0) {
      unit = "milliseconds";
    }

    if (opts === void 0) {
      opts = {};
    }

    if (!this.isValid || !otherDateTime.isValid) {
      return Duration.invalid("created by diffing an invalid DateTime");
    }

    var durOpts = _extends({
      locale: this.locale,
      numberingSystem: this.numberingSystem
    }, opts);

    var units = maybeArray(unit).map(Duration.normalizeUnit),
        otherIsLater = otherDateTime.valueOf() > this.valueOf(),
        earlier = otherIsLater ? this : otherDateTime,
        later = otherIsLater ? otherDateTime : this,
        diffed = _diff(earlier, later, units, durOpts);

    return otherIsLater ? diffed.negate() : diffed;
  }
  /**
   * Return the difference between this DateTime and right now.
   * See {@link DateTime.diff}
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  ;

  _proto.diffNow = function diffNow(unit, opts) {
    if (unit === void 0) {
      unit = "milliseconds";
    }

    if (opts === void 0) {
      opts = {};
    }

    return this.diff(DateTime.now(), unit, opts);
  }
  /**
   * Return an Interval spanning between this DateTime and another DateTime
   * @param {DateTime} otherDateTime - the other end point of the Interval
   * @return {Interval}
   */
  ;

  _proto.until = function until(otherDateTime) {
    return this.isValid ? Interval.fromDateTimes(this, otherDateTime) : this;
  }
  /**
   * Return whether this DateTime is in the same unit of time as another DateTime.
   * Higher-order units must also be identical for this function to return `true`.
   * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link DateTime.setZone} to convert one of the dates if needed.
   * @param {DateTime} otherDateTime - the other DateTime
   * @param {string} unit - the unit of time to check sameness on
   * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
   * @return {boolean}
   */
  ;

  _proto.hasSame = function hasSame(otherDateTime, unit) {
    if (!this.isValid) return false;
    var inputMs = otherDateTime.valueOf();
    var otherZoneDateTime = this.setZone(otherDateTime.zone, {
      keepLocalTime: true
    });
    return otherZoneDateTime.startOf(unit) <= inputMs && inputMs <= otherZoneDateTime.endOf(unit);
  }
  /**
   * Equality check
   * Two DateTimes are equal iff they represent the same millisecond, have the same zone and location, and are both valid.
   * To compare just the millisecond values, use `+dt1 === +dt2`.
   * @param {DateTime} other - the other DateTime
   * @return {boolean}
   */
  ;

  _proto.equals = function equals(other) {
    return this.isValid && other.isValid && this.valueOf() === other.valueOf() && this.zone.equals(other.zone) && this.loc.equals(other.loc);
  }
  /**
   * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
   * platform supports Intl.RelativeTimeFormat. Rounds down by default.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
   * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
   * @param {boolean} [options.round=true] - whether to round the numbers in the output.
   * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
   * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
   * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
   * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
   * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
   * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
   */
  ;

  _proto.toRelative = function toRelative(options) {
    if (options === void 0) {
      options = {};
    }

    if (!this.isValid) return null;
    var base = options.base || DateTime.fromObject({}, {
      zone: this.zone
    }),
        padding = options.padding ? this < base ? -options.padding : options.padding : 0;
    var units = ["years", "months", "days", "hours", "minutes", "seconds"];
    var unit = options.unit;

    if (Array.isArray(options.unit)) {
      units = options.unit;
      unit = undefined;
    }

    return diffRelative(base, this.plus(padding), _extends({}, options, {
      numeric: "always",
      units: units,
      unit: unit
    }));
  }
  /**
   * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
   * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
   * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
   * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
   */
  ;

  _proto.toRelativeCalendar = function toRelativeCalendar(options) {
    if (options === void 0) {
      options = {};
    }

    if (!this.isValid) return null;
    return diffRelative(options.base || DateTime.fromObject({}, {
      zone: this.zone
    }), this, _extends({}, options, {
      numeric: "auto",
      units: ["years", "months", "days"],
      calendary: true
    }));
  }
  /**
   * Return the min of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
   * @return {DateTime} the min DateTime, or undefined if called with no argument
   */
  ;

  DateTime.min = function min() {
    for (var _len = arguments.length, dateTimes = new Array(_len), _key = 0; _key < _len; _key++) {
      dateTimes[_key] = arguments[_key];
    }

    if (!dateTimes.every(DateTime.isDateTime)) {
      throw new InvalidArgumentError("min requires all arguments be DateTimes");
    }

    return bestBy(dateTimes, function (i) {
      return i.valueOf();
    }, Math.min);
  }
  /**
   * Return the max of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
   * @return {DateTime} the max DateTime, or undefined if called with no argument
   */
  ;

  DateTime.max = function max() {
    for (var _len2 = arguments.length, dateTimes = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      dateTimes[_key2] = arguments[_key2];
    }

    if (!dateTimes.every(DateTime.isDateTime)) {
      throw new InvalidArgumentError("max requires all arguments be DateTimes");
    }

    return bestBy(dateTimes, function (i) {
      return i.valueOf();
    }, Math.max);
  } // MISC

  /**
   * Explain how a string would be parsed by fromFormat()
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see description)
   * @param {Object} options - options taken by fromFormat()
   * @return {Object}
   */
  ;

  DateTime.fromFormatExplain = function fromFormatExplain(text, fmt, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$locale = _options.locale,
        locale = _options$locale === void 0 ? null : _options$locale,
        _options$numberingSys = _options.numberingSystem,
        numberingSystem = _options$numberingSys === void 0 ? null : _options$numberingSys,
        localeToUse = Locale.fromOpts({
      locale: locale,
      numberingSystem: numberingSystem,
      defaultToEN: true
    });
    return explainFromTokens(localeToUse, text, fmt);
  }
  /**
   * @deprecated use fromFormatExplain instead
   */
  ;

  DateTime.fromStringExplain = function fromStringExplain(text, fmt, options) {
    if (options === void 0) {
      options = {};
    }

    return DateTime.fromFormatExplain(text, fmt, options);
  } // FORMAT PRESETS

  /**
   * {@link DateTime.toLocaleString} format like 10/14/1983
   * @type {Object}
   */
  ;

  _createClass(DateTime, [{
    key: "isValid",
    get: function get() {
      return this.invalid === null;
    }
    /**
     * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
     * @type {string}
     */

  }, {
    key: "invalidReason",
    get: function get() {
      return this.invalid ? this.invalid.reason : null;
    }
    /**
     * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
     * @type {string}
     */

  }, {
    key: "invalidExplanation",
    get: function get() {
      return this.invalid ? this.invalid.explanation : null;
    }
    /**
     * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
     *
     * @type {string}
     */

  }, {
    key: "locale",
    get: function get() {
      return this.isValid ? this.loc.locale : null;
    }
    /**
     * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
     *
     * @type {string}
     */

  }, {
    key: "numberingSystem",
    get: function get() {
      return this.isValid ? this.loc.numberingSystem : null;
    }
    /**
     * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
     *
     * @type {string}
     */

  }, {
    key: "outputCalendar",
    get: function get() {
      return this.isValid ? this.loc.outputCalendar : null;
    }
    /**
     * Get the time zone associated with this DateTime.
     * @type {Zone}
     */

  }, {
    key: "zone",
    get: function get() {
      return this._zone;
    }
    /**
     * Get the name of the time zone.
     * @type {string}
     */

  }, {
    key: "zoneName",
    get: function get() {
      return this.isValid ? this.zone.name : null;
    }
    /**
     * Get the year
     * @example DateTime.local(2017, 5, 25).year //=> 2017
     * @type {number}
     */

  }, {
    key: "year",
    get: function get() {
      return this.isValid ? this.c.year : NaN;
    }
    /**
     * Get the quarter
     * @example DateTime.local(2017, 5, 25).quarter //=> 2
     * @type {number}
     */

  }, {
    key: "quarter",
    get: function get() {
      return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
    }
    /**
     * Get the month (1-12).
     * @example DateTime.local(2017, 5, 25).month //=> 5
     * @type {number}
     */

  }, {
    key: "month",
    get: function get() {
      return this.isValid ? this.c.month : NaN;
    }
    /**
     * Get the day of the month (1-30ish).
     * @example DateTime.local(2017, 5, 25).day //=> 25
     * @type {number}
     */

  }, {
    key: "day",
    get: function get() {
      return this.isValid ? this.c.day : NaN;
    }
    /**
     * Get the hour of the day (0-23).
     * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
     * @type {number}
     */

  }, {
    key: "hour",
    get: function get() {
      return this.isValid ? this.c.hour : NaN;
    }
    /**
     * Get the minute of the hour (0-59).
     * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
     * @type {number}
     */

  }, {
    key: "minute",
    get: function get() {
      return this.isValid ? this.c.minute : NaN;
    }
    /**
     * Get the second of the minute (0-59).
     * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
     * @type {number}
     */

  }, {
    key: "second",
    get: function get() {
      return this.isValid ? this.c.second : NaN;
    }
    /**
     * Get the millisecond of the second (0-999).
     * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
     * @type {number}
     */

  }, {
    key: "millisecond",
    get: function get() {
      return this.isValid ? this.c.millisecond : NaN;
    }
    /**
     * Get the week year
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
     * @type {number}
     */

  }, {
    key: "weekYear",
    get: function get() {
      return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
    }
    /**
     * Get the week number of the week year (1-52ish).
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
     * @type {number}
     */

  }, {
    key: "weekNumber",
    get: function get() {
      return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
    }
    /**
     * Get the day of the week.
     * 1 is Monday and 7 is Sunday
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2014, 11, 31).weekday //=> 4
     * @type {number}
     */

  }, {
    key: "weekday",
    get: function get() {
      return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
    }
    /**
     * Get the ordinal (meaning the day of the year)
     * @example DateTime.local(2017, 5, 25).ordinal //=> 145
     * @type {number|DateTime}
     */

  }, {
    key: "ordinal",
    get: function get() {
      return this.isValid ? gregorianToOrdinal(this.c).ordinal : NaN;
    }
    /**
     * Get the human readable short month name, such as 'Oct'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
     * @type {string}
     */

  }, {
    key: "monthShort",
    get: function get() {
      return this.isValid ? Info.months("short", {
        locObj: this.loc
      })[this.month - 1] : null;
    }
    /**
     * Get the human readable long month name, such as 'October'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).monthLong //=> October
     * @type {string}
     */

  }, {
    key: "monthLong",
    get: function get() {
      return this.isValid ? Info.months("long", {
        locObj: this.loc
      })[this.month - 1] : null;
    }
    /**
     * Get the human readable short weekday, such as 'Mon'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
     * @type {string}
     */

  }, {
    key: "weekdayShort",
    get: function get() {
      return this.isValid ? Info.weekdays("short", {
        locObj: this.loc
      })[this.weekday - 1] : null;
    }
    /**
     * Get the human readable long weekday, such as 'Monday'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
     * @type {string}
     */

  }, {
    key: "weekdayLong",
    get: function get() {
      return this.isValid ? Info.weekdays("long", {
        locObj: this.loc
      })[this.weekday - 1] : null;
    }
    /**
     * Get the UTC offset of this DateTime in minutes
     * @example DateTime.now().offset //=> -240
     * @example DateTime.utc().offset //=> 0
     * @type {number}
     */

  }, {
    key: "offset",
    get: function get() {
      return this.isValid ? +this.o : NaN;
    }
    /**
     * Get the short human name for the zone's current offset, for example "EST" or "EDT".
     * Defaults to the system's locale if no locale has been specified
     * @type {string}
     */

  }, {
    key: "offsetNameShort",
    get: function get() {
      if (this.isValid) {
        return this.zone.offsetName(this.ts, {
          format: "short",
          locale: this.locale
        });
      } else {
        return null;
      }
    }
    /**
     * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
     * Defaults to the system's locale if no locale has been specified
     * @type {string}
     */

  }, {
    key: "offsetNameLong",
    get: function get() {
      if (this.isValid) {
        return this.zone.offsetName(this.ts, {
          format: "long",
          locale: this.locale
        });
      } else {
        return null;
      }
    }
    /**
     * Get whether this zone's offset ever changes, as in a DST.
     * @type {boolean}
     */

  }, {
    key: "isOffsetFixed",
    get: function get() {
      return this.isValid ? this.zone.isUniversal : null;
    }
    /**
     * Get whether the DateTime is in a DST.
     * @type {boolean}
     */

  }, {
    key: "isInDST",
    get: function get() {
      if (this.isOffsetFixed) {
        return false;
      } else {
        return this.offset > this.set({
          month: 1
        }).offset || this.offset > this.set({
          month: 5
        }).offset;
      }
    }
    /**
     * Returns true if this DateTime is in a leap year, false otherwise
     * @example DateTime.local(2016).isInLeapYear //=> true
     * @example DateTime.local(2013).isInLeapYear //=> false
     * @type {boolean}
     */

  }, {
    key: "isInLeapYear",
    get: function get() {
      return isLeapYear(this.year);
    }
    /**
     * Returns the number of days in this DateTime's month
     * @example DateTime.local(2016, 2).daysInMonth //=> 29
     * @example DateTime.local(2016, 3).daysInMonth //=> 31
     * @type {number}
     */

  }, {
    key: "daysInMonth",
    get: function get() {
      return daysInMonth(this.year, this.month);
    }
    /**
     * Returns the number of days in this DateTime's year
     * @example DateTime.local(2016).daysInYear //=> 366
     * @example DateTime.local(2013).daysInYear //=> 365
     * @type {number}
     */

  }, {
    key: "daysInYear",
    get: function get() {
      return this.isValid ? daysInYear(this.year) : NaN;
    }
    /**
     * Returns the number of weeks in this DateTime's year
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2004).weeksInWeekYear //=> 53
     * @example DateTime.local(2013).weeksInWeekYear //=> 52
     * @type {number}
     */

  }, {
    key: "weeksInWeekYear",
    get: function get() {
      return this.isValid ? weeksInWeekYear(this.weekYear) : NaN;
    }
  }], [{
    key: "DATE_SHORT",
    get: function get() {
      return DATE_SHORT;
    }
    /**
     * {@link DateTime.toLocaleString} format like 'Oct 14, 1983'
     * @type {Object}
     */

  }, {
    key: "DATE_MED",
    get: function get() {
      return DATE_MED;
    }
    /**
     * {@link DateTime.toLocaleString} format like 'Fri, Oct 14, 1983'
     * @type {Object}
     */

  }, {
    key: "DATE_MED_WITH_WEEKDAY",
    get: function get() {
      return DATE_MED_WITH_WEEKDAY;
    }
    /**
     * {@link DateTime.toLocaleString} format like 'October 14, 1983'
     * @type {Object}
     */

  }, {
    key: "DATE_FULL",
    get: function get() {
      return DATE_FULL;
    }
    /**
     * {@link DateTime.toLocaleString} format like 'Tuesday, October 14, 1983'
     * @type {Object}
     */

  }, {
    key: "DATE_HUGE",
    get: function get() {
      return DATE_HUGE;
    }
    /**
     * {@link DateTime.toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "TIME_SIMPLE",
    get: function get() {
      return TIME_SIMPLE;
    }
    /**
     * {@link DateTime.toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "TIME_WITH_SECONDS",
    get: function get() {
      return TIME_WITH_SECONDS;
    }
    /**
     * {@link DateTime.toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "TIME_WITH_SHORT_OFFSET",
    get: function get() {
      return TIME_WITH_SHORT_OFFSET;
    }
    /**
     * {@link DateTime.toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "TIME_WITH_LONG_OFFSET",
    get: function get() {
      return TIME_WITH_LONG_OFFSET;
    }
    /**
     * {@link DateTime.toLocaleString} format like '09:30', always 24-hour.
     * @type {Object}
     */

  }, {
    key: "TIME_24_SIMPLE",
    get: function get() {
      return TIME_24_SIMPLE;
    }
    /**
     * {@link DateTime.toLocaleString} format like '09:30:23', always 24-hour.
     * @type {Object}
     */

  }, {
    key: "TIME_24_WITH_SECONDS",
    get: function get() {
      return TIME_24_WITH_SECONDS;
    }
    /**
     * {@link DateTime.toLocaleString} format like '09:30:23 EDT', always 24-hour.
     * @type {Object}
     */

  }, {
    key: "TIME_24_WITH_SHORT_OFFSET",
    get: function get() {
      return TIME_24_WITH_SHORT_OFFSET;
    }
    /**
     * {@link DateTime.toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
     * @type {Object}
     */

  }, {
    key: "TIME_24_WITH_LONG_OFFSET",
    get: function get() {
      return TIME_24_WITH_LONG_OFFSET;
    }
    /**
     * {@link DateTime.toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_SHORT",
    get: function get() {
      return DATETIME_SHORT;
    }
    /**
     * {@link DateTime.toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_SHORT_WITH_SECONDS",
    get: function get() {
      return DATETIME_SHORT_WITH_SECONDS;
    }
    /**
     * {@link DateTime.toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_MED",
    get: function get() {
      return DATETIME_MED;
    }
    /**
     * {@link DateTime.toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_MED_WITH_SECONDS",
    get: function get() {
      return DATETIME_MED_WITH_SECONDS;
    }
    /**
     * {@link DateTime.toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_MED_WITH_WEEKDAY",
    get: function get() {
      return DATETIME_MED_WITH_WEEKDAY;
    }
    /**
     * {@link DateTime.toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_FULL",
    get: function get() {
      return DATETIME_FULL;
    }
    /**
     * {@link DateTime.toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_FULL_WITH_SECONDS",
    get: function get() {
      return DATETIME_FULL_WITH_SECONDS;
    }
    /**
     * {@link DateTime.toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_HUGE",
    get: function get() {
      return DATETIME_HUGE;
    }
    /**
     * {@link DateTime.toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_HUGE_WITH_SECONDS",
    get: function get() {
      return DATETIME_HUGE_WITH_SECONDS;
    }
  }]);

  return DateTime;
}();
function friendlyDateTime(dateTimeish) {
  if (DateTime.isDateTime(dateTimeish)) {
    return dateTimeish;
  } else if (dateTimeish && dateTimeish.valueOf && isNumber(dateTimeish.valueOf())) {
    return DateTime.fromJSDate(dateTimeish);
  } else if (dateTimeish && typeof dateTimeish === "object") {
    return DateTime.fromObject(dateTimeish);
  } else {
    throw new InvalidArgumentError("Unknown datetime argument: " + dateTimeish + ", of type " + typeof dateTimeish);
  }
}

var VERSION = "2.0.2";

exports.DateTime = DateTime;
exports.Duration = Duration;
exports.FixedOffsetZone = FixedOffsetZone;
exports.IANAZone = IANAZone;
exports.Info = Info;
exports.Interval = Interval;
exports.InvalidZone = InvalidZone;
exports.Settings = Settings;
exports.SystemZone = SystemZone;
exports.VERSION = VERSION;
exports.Zone = Zone;
//# sourceMappingURL=luxon.js.map


/***/ }),

/***/ 893:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BAD_DELIMITERS": () => (/* binding */ ie),
/* harmony export */   "BUTTON_TYPE": () => (/* binding */ ee),
/* harmony export */   "CSVDownloader": () => (/* binding */ te),
/* harmony export */   "CSVReader": () => (/* binding */ G),
/* harmony export */   "DefaultDelimiter": () => (/* binding */ ce),
/* harmony export */   "LINK_TYPE": () => (/* binding */ Z),
/* harmony export */   "LocalChunkSize": () => (/* binding */ le),
/* harmony export */   "RECORD_SEP": () => (/* binding */ ae),
/* harmony export */   "UNIT_SEP": () => (/* binding */ se),
/* harmony export */   "WORKERS_SUPPORTED": () => (/* binding */ ue),
/* harmony export */   "jsonToCSV": () => (/* binding */ oe),
/* harmony export */   "readRemoteFile": () => (/* binding */ ne),
/* harmony export */   "readString": () => (/* binding */ re)
/* harmony export */ });
/* harmony import */ var stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(86);
/* harmony import */ var stream__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(stream__WEBPACK_IMPORTED_MODULE_0__);
"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof __webpack_require__.g?__webpack_require__.g:"undefined"!=typeof self&&self;var t={exports:{}},r=t.exports=function t(){var r="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==r?r:{};function n(){var e=r.URL||r.webkitURL||null,n=t.toString();return u.BLOB_URL||(u.BLOB_URL=e.createObjectURL(new Blob(["(",n,")();"],{type:"text/javascript"})))}var o=!r.document&&!!r.postMessage,i=o&&/blob:/i.test((r.location||{}).protocol),a={},s=0,u={};if(u.parse=c,u.unparse=f,u.RECORD_SEP=String.fromCharCode(30),u.UNIT_SEP=String.fromCharCode(31),u.BYTE_ORDER_MARK="\ufeff",u.BAD_DELIMITERS=["\r","\n",'"',u.BYTE_ORDER_MARK],u.WORKERS_SUPPORTED=!o&&!!r.Worker,u.NODE_STREAM_INPUT=1,u.LocalChunkSize=10485760,u.RemoteChunkSize=5242880,u.DefaultDelimiter=",",u.Parser=b,u.ParserHandle=g,u.NetworkStreamer=d,u.FileStreamer=h,u.StringStreamer=v,u.ReadableStreamStreamer=y,"undefined"==typeof PAPA_BROWSER_CONTEXT&&(u.DuplexStreamStreamer=m),r.jQuery){var l=r.jQuery;l.fn.parse=function(e){var t=e.config||{},n=[];return this.each((function(e){if("INPUT"!==l(this).prop("tagName").toUpperCase()||"file"!==l(this).attr("type").toLowerCase()||!r.FileReader||!this.files||0===this.files.length)return!0;for(var o=0;o<this.files.length;o++)n.push({file:this.files[o],inputElem:this,instanceConfig:l.extend({},t)})})),o(),this;function o(){if(0!==n.length){var t=n[0];if(j(e.before)){var r=e.before(t.file,t.inputElem);if("object"==typeof r){if("abort"===r.action)return void i("AbortError",t.file,t.inputElem,r.reason);if("skip"===r.action)return void a();"object"==typeof r.config&&(t.instanceConfig=l.extend(t.instanceConfig,r.config))}else if("skip"===r)return void a()}var o=t.instanceConfig.complete;t.instanceConfig.complete=function(e){j(o)&&o(e,t.file,t.inputElem),a()},u.parse(t.file,t.instanceConfig)}else j(e.complete)&&e.complete()}function i(t,r,n,o){j(e.error)&&e.error({name:t},r,n,o)}function a(){n.splice(0,1),o()}}}function c(e,t){var n=(t=t||{}).dynamicTyping||!1;if(j(n)&&(t.dynamicTypingFunction=n,n={}),t.dynamicTyping=n,t.transform=!!j(t.transform)&&t.transform,t.worker&&u.WORKERS_SUPPORTED){var o=C();return o.userStep=t.step,o.userChunk=t.chunk,o.userComplete=t.complete,o.userError=t.error,t.step=j(t.step),t.chunk=j(t.chunk),t.complete=j(t.complete),t.error=j(t.error),delete t.worker,void o.postMessage({input:e,config:t,workerId:o.id})}var i=null;return e===u.NODE_STREAM_INPUT&&"undefined"==typeof PAPA_BROWSER_CONTEXT?(i=new m(t)).getStream():("string"==typeof e?i=t.download?new d(t):new v(t):!0===e.readable&&j(e.read)&&j(e.on)?i=new y(t):(r.File&&e instanceof File||e instanceof Object)&&(i=new h(t)),i.stream(e))}function f(e,t){var r=!1,n=!0,o=",",i="\r\n",a='"',s=a+a,l=!1,c=null,f=!1;d();var p=new RegExp(_(a),"g");if("string"==typeof e&&(e=JSON.parse(e)),Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return h(null,e,l);if("object"==typeof e[0])return h(c||Object.keys(e[0]),e,l)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:"object"==typeof e.data[0]?Object.keys(e.data[0]):[]),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),h(e.fields||[],e.data||[],l);throw new Error("Unable to serialize unrecognized input");function d(){if("object"==typeof t){if("string"!=typeof t.delimiter||u.BAD_DELIMITERS.filter((function(e){return-1!==t.delimiter.indexOf(e)})).length||(o=t.delimiter),("boolean"==typeof t.quotes||"function"==typeof t.quotes||Array.isArray(t.quotes))&&(r=t.quotes),"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(l=t.skipEmptyLines),"string"==typeof t.newline&&(i=t.newline),"string"==typeof t.quoteChar&&(a=t.quoteChar),"boolean"==typeof t.header&&(n=t.header),Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty");c=t.columns}void 0!==t.escapeChar&&(s=t.escapeChar+a),"boolean"==typeof t.escapeFormulae&&(f=t.escapeFormulae)}}function h(e,t,r){var a="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var s=Array.isArray(e)&&e.length>0,u=!Array.isArray(t[0]);if(s&&n){for(var l=0;l<e.length;l++)l>0&&(a+=o),a+=v(e[l],l);t.length>0&&(a+=i)}for(var c=0;c<t.length;c++){var f=s?e.length:t[c].length,p=!1,d=s?0===Object.keys(t[c]).length:0===t[c].length;if(r&&!s&&(p="greedy"===r?""===t[c].join("").trim():1===t[c].length&&0===t[c][0].length),"greedy"===r&&s){for(var h=[],y=0;y<f;y++){var m=u?e[y]:y;h.push(t[c][m])}p=""===h.join("").trim()}if(!p){for(var g=0;g<f;g++){g>0&&!d&&(a+=o);var _=s&&u?e[g]:g;a+=v(t[c][_],g)}c<t.length-1&&(!r||f>0&&!d)&&(a+=i)}}return a}function v(e,t){if(null==e)return"";if(e.constructor===Date)return JSON.stringify(e).slice(1,25);!0===f&&"string"==typeof e&&null!==e.match(/^[=+\-@].*$/)&&(e="'"+e);var n=e.toString().replace(p,s);return"boolean"==typeof r&&r||"function"==typeof r&&r(e,t)||Array.isArray(r)&&r[t]||y(n,u.BAD_DELIMITERS)||n.indexOf(o)>-1||" "===n.charAt(0)||" "===n.charAt(n.length-1)?a+n+a:n}function y(e,t){for(var r=0;r<t.length;r++)if(e.indexOf(t[r])>-1)return!0;return!1}}function p(e){function t(e){var t=O(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null),this._handle=new g(t),this._handle.streamer=this,this._config=t}this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},t.call(this,e),this.parseChunk=function(e,t){if(this.isFirstChunk&&j(this._config.beforeFirstChunk)){var n=this._config.beforeFirstChunk(e);void 0!==n&&(e=n)}this.isFirstChunk=!1,this._halted=!1;var o=this._partialLine+e;this._partialLine="";var a=this._handle.parse(o,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var s=a.meta.cursor;this._finished||(this._partialLine=o.substring(s-this._baseIndex),this._baseIndex=s),a&&a.data&&(this._rowCount+=a.data.length);var l=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(i)r.postMessage({results:a,workerId:u.WORKER_ID,finished:l});else if(j(this._config.chunk)&&!t){if(this._config.chunk(a,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);a=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(a.data),this._completeResults.errors=this._completeResults.errors.concat(a.errors),this._completeResults.meta=a.meta),this._completed||!l||!j(this._config.complete)||a&&a.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),l||a&&a.meta.paused||this._nextChunk(),a}this._halted=!0},this._sendError=function(e){j(this._config.error)?this._config.error(e):i&&this._config.error&&r.postMessage({workerId:u.WORKER_ID,error:e,finished:!1})}}function d(e){var t;function r(e){var t=e.getResponseHeader("Content-Range");return null===t?-1:parseInt(t.substring(t.lastIndexOf("/")+1))}(e=e||{}).chunkSize||(e.chunkSize=u.RemoteChunkSize),p.call(this,e),this._nextChunk=o?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(t=new XMLHttpRequest,this._config.withCredentials&&(t.withCredentials=this._config.withCredentials),o||(t.onload=S(this._chunkLoaded,this),t.onerror=S(this._chunkError,this)),t.open(this._config.downloadRequestBody?"POST":"GET",this._input,!o),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var r in e)t.setRequestHeader(r,e[r])}if(this._config.chunkSize){var n=this._start+this._config.chunkSize-1;t.setRequestHeader("Range","bytes="+this._start+"-"+n)}try{t.send(this._config.downloadRequestBody)}catch(e){this._chunkError(e.message)}o&&0===t.status&&this._chunkError()}},this._chunkLoaded=function(){4===t.readyState&&(t.status<200||t.status>=400?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:t.responseText.length,this._finished=!this._config.chunkSize||this._start>=r(t),this.parseChunk(t.responseText)))},this._chunkError=function(e){var r=t.statusText||e;this._sendError(new Error(r))}}function h(e){var t,r;(e=e||{}).chunkSize||(e.chunkSize=u.LocalChunkSize),p.call(this,e);var n="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,r=e.slice||e.webkitSlice||e.mozSlice,n?((t=new FileReader).onload=S(this._chunkLoaded,this),t.onerror=S(this._chunkError,this)):t=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var o=Math.min(this._start+this._config.chunkSize,this._input.size);e=r.call(e,this._start,o)}var i=t.readAsText(e,this._config.encoding);n||this._chunkLoaded({target:{result:i}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(t.error)}}function v(e){var t;e=e||{},p.call(this,e),this.stream=function(e){return t=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e,r=this._config.chunkSize;return r?(e=t.substring(0,r),t=t.substring(r)):(e=t,t=""),this._finished=!t,this.parseChunk(e)}}}function y(e){e=e||{},p.call(this,e);var t=[],r=!0,n=!1;this.pause=function(){p.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){p.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){n&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):r=!0},this._streamData=S((function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),r&&(r=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(e){this._streamError(e)}}),this),this._streamError=S((function(e){this._streamCleanUp(),this._sendError(e)}),this),this._streamEnd=S((function(){this._streamCleanUp(),n=!0,this._streamData("")}),this),this._streamCleanUp=S((function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)}),this)}function m(t){var r=(stream__WEBPACK_IMPORTED_MODULE_0___default().Duplex),n=O(t),o=!0,i=!1,a=[],s=null;this._onCsvData=function(e){var t=e.data;s.push(t)||this._handle.paused()||this._handle.pause()},this._onCsvComplete=function(){s.push(null)},n.step=S(this._onCsvData,this),n.complete=S(this._onCsvComplete,this),p.call(this,n),this._nextChunk=function(){i&&1===a.length&&(this._finished=!0),a.length?a.shift()():o=!0},this._addToParseQueue=function(e,t){a.push(S((function(){if(this.parseChunk("string"==typeof e?e:e.toString(n.encoding)),j(t))return t()}),this)),o&&(o=!1,this._nextChunk())},this._onRead=function(){this._handle.paused()&&this._handle.resume()},this._onWrite=function(e,t,r){this._addToParseQueue(e,r)},this._onWriteComplete=function(){i=!0,this._addToParseQueue("")},this.getStream=function(){return s},(s=new r({readableObjectMode:!0,decodeStrings:!1,read:S(this._onRead,this),write:S(this._onWrite,this)})).once("finish",S(this._onWriteComplete,this))}function g(e){var t,r,n,o=Math.pow(2,53),i=-o,a=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,s=/^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/,l=this,c=0,f=0,p=!1,d=!1,h=[],v={data:[],errors:[],meta:{}};if(j(e.step)){var y=e.step;e.step=function(t){if(v=t,R())C();else{if(C(),0===v.data.length)return;c+=t.data.length,e.preview&&c>e.preview?r.abort():(v.data=v.data[0],y(v,l))}}}function m(t){return"greedy"===e.skipEmptyLines?""===t.join("").trim():1===t.length&&0===t[0].length}function g(e){if(a.test(e)){var t=parseFloat(e);if(t>i&&t<o)return!0}return!1}function C(){if(v&&n&&(A("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+u.DefaultDelimiter+"'"),n=!1),e.skipEmptyLines)for(var t=0;t<v.data.length;t++)m(v.data[t])&&v.data.splice(t--,1);return R()&&w(),S()}function R(){return e.header&&0===h.length}function w(){if(v)if(Array.isArray(v.data[0])){for(var t=0;R()&&t<v.data.length;t++)v.data[t].forEach(r);v.data.splice(0,1)}else v.data.forEach(r);function r(t,r){j(e.transformHeader)&&(t=e.transformHeader(t,r)),h.push(t)}}function k(t){return e.dynamicTypingFunction&&void 0===e.dynamicTyping[t]&&(e.dynamicTyping[t]=e.dynamicTypingFunction(t)),!0===(e.dynamicTyping[t]||e.dynamicTyping)}function E(e,t){return k(e)?"true"===t||"TRUE"===t||"false"!==t&&"FALSE"!==t&&(g(t)?parseFloat(t):s.test(t)?new Date(t):""===t?null:t):t}function S(){if(!v||!e.header&&!e.dynamicTyping&&!e.transform)return v;function t(t,r){var n,o=e.header?{}:[];for(n=0;n<t.length;n++){var i=n,a=t[n];e.header&&(i=n>=h.length?"__parsed_extra":h[n]),e.transform&&(a=e.transform(a,i)),a=E(i,a),"__parsed_extra"===i?(o[i]=o[i]||[],o[i].push(a)):o[i]=a}return e.header&&(n>h.length?A("FieldMismatch","TooManyFields","Too many fields: expected "+h.length+" fields but parsed "+n,f+r):n<h.length&&A("FieldMismatch","TooFewFields","Too few fields: expected "+h.length+" fields but parsed "+n,f+r)),o}var r=1;return!v.data.length||Array.isArray(v.data[0])?(v.data=v.data.map(t),r=v.data.length):v.data=t(v.data,0),e.header&&v.meta&&(v.meta.fields=h),f+=r,v}function P(t,r,n,o,i){var a,s,l,c;i=i||[",","\t","|",";",u.RECORD_SEP,u.UNIT_SEP];for(var f=0;f<i.length;f++){var p=i[f],d=0,h=0,v=0;l=void 0;for(var y=new b({comments:o,delimiter:p,newline:r,preview:10}).parse(t),g=0;g<y.data.length;g++)if(n&&m(y.data[g]))v++;else{var _=y.data[g].length;h+=_,void 0!==l?_>0&&(d+=Math.abs(_-l),l=_):l=_}y.data.length>0&&(h/=y.data.length-v),(void 0===s||d<=s)&&(void 0===c||h>c)&&h>1.99&&(s=d,a=p,c=h)}return e.delimiter=a,{successful:!!a,bestDelimiter:a}}function x(e,t){e=e.substring(0,1048576);var r=new RegExp(_(t)+"([^]*?)"+_(t),"gm"),n=(e=e.replace(r,"")).split("\r"),o=e.split("\n"),i=o.length>1&&o[0].length<n[0].length;if(1===n.length||i)return"\n";for(var a=0,s=0;s<n.length;s++)"\n"===n[s][0]&&a++;return a>=n.length/2?"\r\n":"\r"}function A(e,t,r,n){var o={type:e,code:t,message:r};void 0!==n&&(o.row=n),v.errors.push(o)}this.parse=function(o,i,a){var s=e.quoteChar||'"';if(e.newline||(e.newline=x(o,s)),n=!1,e.delimiter)j(e.delimiter)&&(e.delimiter=e.delimiter(o),v.meta.delimiter=e.delimiter);else{var l=P(o,e.newline,e.skipEmptyLines,e.comments,e.delimitersToGuess);l.successful?e.delimiter=l.bestDelimiter:(n=!0,e.delimiter=u.DefaultDelimiter),v.meta.delimiter=e.delimiter}var c=O(e);return e.preview&&e.header&&c.preview++,t=o,r=new b(c),v=r.parse(t,i,a),C(),p?{meta:{paused:!0}}:v||{meta:{paused:!1}}},this.paused=function(){return p},this.pause=function(){p=!0,r.abort(),t=j(e.chunk)?"":t.substring(r.getCharIndex())},this.resume=function(){l.streamer._halted?(p=!1,l.streamer.parseChunk(t,!0)):setTimeout(l.resume,3)},this.aborted=function(){return d},this.abort=function(){d=!0,r.abort(),v.meta.aborted=!0,j(e.complete)&&e.complete(v),t=""}}function _(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function b(e){var t,r=(e=e||{}).delimiter,n=e.newline,o=e.comments,i=e.step,a=e.preview,s=e.fastMode,l=t=void 0===e.quoteChar?'"':e.quoteChar;if(void 0!==e.escapeChar&&(l=e.escapeChar),("string"!=typeof r||u.BAD_DELIMITERS.indexOf(r)>-1)&&(r=","),o===r)throw new Error("Comment character same as delimiter");!0===o?o="#":("string"!=typeof o||u.BAD_DELIMITERS.indexOf(o)>-1)&&(o=!1),"\n"!==n&&"\r"!==n&&"\r\n"!==n&&(n="\n");var c=0,f=!1;this.parse=function(e,u,p){if("string"!=typeof e)throw new Error("Input must be a string");var d=e.length,h=r.length,v=n.length,y=o.length,m=j(i);c=0;var g=[],b=[],C=[],R=0;if(!e)return B();if(s||!1!==s&&-1===e.indexOf(t)){for(var w=e.split(n),k=0;k<w.length;k++){if(C=w[k],c+=C.length,k!==w.length-1)c+=n.length;else if(p)return B();if(!o||C.substring(0,y)!==o){if(m){if(g=[],I(C.split(r)),L(),f)return B()}else I(C.split(r));if(a&&k>=a)return g=g.slice(0,a),B(!0)}}return B()}for(var E=e.indexOf(r,c),O=e.indexOf(n,c),S=new RegExp(_(l)+_(t),"g"),P=e.indexOf(t,c);;)if(e[c]!==t)if(o&&0===C.length&&e.substring(c,c+y)===o){if(-1===O)return B();c=O+v,O=e.indexOf(n,c),E=e.indexOf(r,c)}else if(-1!==E&&(E<O||-1===O))C.push(e.substring(c,E)),c=E+h,E=e.indexOf(r,c);else{if(-1===O)break;if(C.push(e.substring(c,O)),T(O+v),m&&(L(),f))return B();if(a&&g.length>=a)return B(!0)}else for(P=c,c++;;){if(-1===(P=e.indexOf(t,P+1)))return p||b.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:g.length,index:c}),D();if(P===d-1)return D(e.substring(c,P).replace(S,t));if(t!==l||e[P+1]!==l){if(t===l||0===P||e[P-1]!==l){-1!==E&&E<P+1&&(E=e.indexOf(r,P+1)),-1!==O&&O<P+1&&(O=e.indexOf(n,P+1));var x=F(-1===O?E:Math.min(E,O));if(e[P+1+x]===r){C.push(e.substring(c,P).replace(S,t)),c=P+1+x+h,e[P+1+x+h]!==t&&(P=e.indexOf(t,c)),E=e.indexOf(r,c),O=e.indexOf(n,c);break}var A=F(O);if(e.substring(P+1+A,P+1+A+v)===n){if(C.push(e.substring(c,P).replace(S,t)),T(P+1+A+v),E=e.indexOf(r,c),P=e.indexOf(t,c),m&&(L(),f))return B();if(a&&g.length>=a)return B(!0);break}b.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:g.length,index:c}),P++}}else P++}return D();function I(e){g.push(e),R=c}function F(t){var r=0;if(-1!==t){var n=e.substring(P+1,t);n&&""===n.trim()&&(r=n.length)}return r}function D(t){return p||(void 0===t&&(t=e.substring(c)),C.push(t),c=d,I(C),m&&L()),B()}function T(t){c=t,I(C),C=[],O=e.indexOf(n,c)}function B(e){return{data:g,errors:b,meta:{delimiter:r,linebreak:n,aborted:f,truncated:!!e,cursor:R+(u||0)}}}function L(){i(B()),g=[],b=[]}},this.abort=function(){f=!0},this.getCharIndex=function(){return c}}function C(){if(!u.WORKERS_SUPPORTED)return!1;var e=n(),t=new r.Worker(e);return t.onmessage=R,t.id=s++,a[t.id]=t,t}function R(e){var t=e.data,r=a[t.workerId],n=!1;if(t.error)r.userError(t.error,t.file);else if(t.results&&t.results.data){var o={abort:function(){n=!0,w(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:k,resume:k};if(j(r.userStep)){for(var i=0;i<t.results.data.length&&(r.userStep({data:t.results.data[i],errors:t.results.errors,meta:t.results.meta},o),!n);i++);delete t.results}else j(r.userChunk)&&(r.userChunk(t.results,o,t.file),delete t.results)}t.finished&&!n&&w(t.workerId,t.results)}function w(e,t){var r=a[e];j(r.userComplete)&&r.userComplete(t),r.terminate(),delete a[e]}function k(){throw new Error("Not implemented.")}function E(e){var t=e.data;if(void 0===u.WORKER_ID&&t&&(u.WORKER_ID=t.workerId),"string"==typeof t.input)r.postMessage({workerId:u.WORKER_ID,results:u.parse(t.input,t.config),finished:!0});else if(r.File&&t.input instanceof File||t.input instanceof Object){var n=u.parse(t.input,t.config);n&&r.postMessage({workerId:u.WORKER_ID,results:n,finished:!0})}}function O(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var r in e)t[r]=O(e[r]);return t}function S(e,t){return function(){e.apply(t,arguments)}}function j(e){return"function"==typeof e}return i&&(r.onmessage=E),d.prototype=Object.create(p.prototype),d.prototype.constructor=d,h.prototype=Object.create(p.prototype),h.prototype.constructor=h,v.prototype=Object.create(v.prototype),v.prototype.constructor=v,y.prototype=Object.create(p.prototype),y.prototype.constructor=y,"undefined"==typeof PAPA_BROWSER_CONTEXT&&(m.prototype=Object.create(p.prototype),m.prototype.constructor=m),u}(),n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)};function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}function i(e,t){for(var r=0,n=t.length,o=e.length;r<n;r++,o++)e[o]=t[r];return e}var a={exports:{}},s={},u=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable;function f(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}var p=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var r,n,o=f(e),i=1;i<arguments.length;i++){for(var a in r=Object(arguments[i]))l.call(r,a)&&(o[a]=r[a]);if(u){n=u(r);for(var s=0;s<n.length;s++)c.call(r,n[s])&&(o[n[s]]=r[n[s]])}}return o},d=p,h=60103,v=60106;
/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */s.Fragment=60107,s.StrictMode=60108,s.Profiler=60114;var y=60109,m=60110,g=60112;s.Suspense=60113;var _=60115,b=60116;if("function"==typeof Symbol&&Symbol.for){var C=Symbol.for;h=C("react.element"),v=C("react.portal"),s.Fragment=C("react.fragment"),s.StrictMode=C("react.strict_mode"),s.Profiler=C("react.profiler"),y=C("react.provider"),m=C("react.context"),g=C("react.forward_ref"),s.Suspense=C("react.suspense"),_=C("react.memo"),b=C("react.lazy")}var R="function"==typeof Symbol&&Symbol.iterator;function w(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var k={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E={};function O(e,t,r){this.props=e,this.context=t,this.refs=E,this.updater=r||k}function S(){}function j(e,t,r){this.props=e,this.context=t,this.refs=E,this.updater=r||k}O.prototype.isReactComponent={},O.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(w(85));this.updater.enqueueSetState(this,e,t,"setState")},O.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},S.prototype=O.prototype;var P=j.prototype=new S;P.constructor=j,d(P,O.prototype),P.isPureReactComponent=!0;var x={current:null},A=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};function F(e,t,r){var n,o={},i=null,a=null;if(null!=t)for(n in void 0!==t.ref&&(a=t.ref),void 0!==t.key&&(i=""+t.key),t)A.call(t,n)&&!I.hasOwnProperty(n)&&(o[n]=t[n]);var s=arguments.length-2;if(1===s)o.children=r;else if(1<s){for(var u=Array(s),l=0;l<s;l++)u[l]=arguments[l+2];o.children=u}if(e&&e.defaultProps)for(n in s=e.defaultProps)void 0===o[n]&&(o[n]=s[n]);return{$$typeof:h,type:e,key:i,ref:a,props:o,_owner:x.current}}function D(e){return"object"==typeof e&&null!==e&&e.$$typeof===h}var T=/\/+/g;function B(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function L(e,t,r,n,o){var i=typeof e;"undefined"!==i&&"boolean"!==i||(e=null);var a=!1;if(null===e)a=!0;else switch(i){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case h:case v:a=!0}}if(a)return o=o(a=e),e=""===n?"."+B(a,0):n,Array.isArray(o)?(r="",null!=e&&(r=e.replace(T,"$&/")+"/"),L(o,t,r,"",(function(e){return e}))):null!=o&&(D(o)&&(o=function(e,t){return{$$typeof:h,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(o,r+(!o.key||a&&a.key===o.key?"":(""+o.key).replace(T,"$&/")+"/")+e)),t.push(o)),1;if(a=0,n=""===n?".":n+":",Array.isArray(e))for(var s=0;s<e.length;s++){var u=n+B(i=e[s],s);a+=L(i,t,r,u,o)}else if("function"==typeof(u=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=R&&e[R]||e["@@iterator"])?e:null}(e)))for(e=u.call(e),s=0;!(i=e.next()).done;)a+=L(i=i.value,t,r,u=n+B(i,s++),o);else if("object"===i)throw t=""+e,Error(w(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return a}function $(e,t,r){if(null==e)return e;var n=[],o=0;return L(e,n,"","",(function(e){return t.call(r,e,o++)})),n}function N(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var M={current:null};function z(){var e=M.current;if(null===e)throw Error(w(321));return e}var U={ReactCurrentDispatcher:M,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:x,IsSomeRendererActing:{current:!1},assign:d};s.Children={map:$,forEach:function(e,t,r){$(e,(function(){t.apply(this,arguments)}),r)},count:function(e){var t=0;return $(e,(function(){t++})),t},toArray:function(e){return $(e,(function(e){return e}))||[]},only:function(e){if(!D(e))throw Error(w(143));return e}},s.Component=O,s.PureComponent=j,s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=U,s.cloneElement=function(e,t,r){if(null==e)throw Error(w(267,e));var n=d({},e.props),o=e.key,i=e.ref,a=e._owner;if(null!=t){if(void 0!==t.ref&&(i=t.ref,a=x.current),void 0!==t.key&&(o=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(u in t)A.call(t,u)&&!I.hasOwnProperty(u)&&(n[u]=void 0===t[u]&&void 0!==s?s[u]:t[u])}var u=arguments.length-2;if(1===u)n.children=r;else if(1<u){s=Array(u);for(var l=0;l<u;l++)s[l]=arguments[l+2];n.children=s}return{$$typeof:h,type:e.type,key:o,ref:i,props:n,_owner:a}},s.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:m,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:y,_context:e},e.Consumer=e},s.createElement=F,s.createFactory=function(e){var t=F.bind(null,e);return t.type=e,t},s.createRef=function(){return{current:null}},s.forwardRef=function(e){return{$$typeof:g,render:e}},s.isValidElement=D,s.lazy=function(e){return{$$typeof:b,_payload:{_status:-1,_result:e},_init:N}},s.memo=function(e,t){return{$$typeof:_,type:e,compare:void 0===t?null:t}},s.useCallback=function(e,t){return z().useCallback(e,t)},s.useContext=function(e,t){return z().useContext(e,t)},s.useDebugValue=function(){},s.useEffect=function(e,t){return z().useEffect(e,t)},s.useImperativeHandle=function(e,t,r){return z().useImperativeHandle(e,t,r)},s.useLayoutEffect=function(e,t){return z().useLayoutEffect(e,t)},s.useMemo=function(e,t){return z().useMemo(e,t)},s.useReducer=function(e,t,r){return z().useReducer(e,t,r)},s.useRef=function(e){return z().useRef(e)},s.useState=function(e){return z().useState(e)},s.version="17.0.2";var q,W={};
/** @license React v17.0.2
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */q=W, false&&0, true?a.exports=s:0;var V=a.exports;function H(e){var t=1024,r=1048576,n=1073741824;if(e<r){var o=Number((e/t).toFixed(0));return o<=0?e+" B":o+" KB"}return e<n?(e/r).toFixed(0)+" MB":e<1099511627776?(e/n).toFixed(0)+" GB":""}function K(e,t){var r=!1;"#"==e[0]&&(e=e.slice(1),r=!0);var n=parseInt(e,16),o=(n>>16)+t;o>255?o=255:o<0&&(o=0);var i=(n>>8&255)+t;i>255?i=255:i<0&&(i=0);var a=(255&n)+t;return a>255?a=255:a<0&&(a=0),(r?"#":"")+(a|i<<8|o<<16).toString(16)}function Y(e){return V.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"23",height:"23",viewBox:"0 0 512 512"},V.createElement("path",{fill:e.color,d:"M504.1 256C504.1 119 393 7.9 256 7.9S7.9 119 7.9 256 119 504.1 256 504.1 504.1 393 504.1 256z"}),V.createElement("path",{fill:"#FFF",d:"M285 256l72.5-84.2c7.9-9.2 6.9-23-2.3-31-9.2-7.9-23-6.9-30.9 2.3L256 222.4l-68.2-79.2c-7.9-9.2-21.8-10.2-31-2.3-9.2 7.9-10.2 21.8-2.3 31L227 256l-72.5 84.2c-7.9 9.2-6.9 23 2.3 31 4.1 3.6 9.2 5.3 14.3 5.3 6.2 0 12.3-2.6 16.6-7.6l68.2-79.2 68.2 79.2c4.3 5 10.5 7.6 16.6 7.6 5.1 0 10.2-1.7 14.3-5.3 9.2-7.9 10.2-21.8 2.3-31L285 256z"}))}var Q={progressBar:{borderRadius:3,boxShadow:"inset 0 1px 3px rgba(0, 0, 0, .2)",bottom:14,position:"absolute",width:"80%"},buttonProgressBar:{position:"inherit",width:"100%"},progressBarFill:{backgroundColor:"#659cef",borderRadius:3,height:10,transition:"width 500ms ease-in-out"}},J=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.render=function(){var e=this.props,t=e.style,r=e.progressBar,n=e.displayProgressBarStatus,o=e.isButtonProgressBar;return V.createElement("div",{style:Object.assign({},Q.progressBar,o&&Q.buttonProgressBar)},V.createElement("span",{style:Object.assign({},Q.progressBarFill,t,{width:r+"%",display:n})}))},t}(V.Component),X={dropArea:{alignItems:"center",borderStyle:"dashed",borderWidth:2,borderRadius:20,borderColor:"#CCC",display:"flex",flexDirection:"column",height:"100%",justifyContent:"center",padding:20},dropAreaDefaultBorderColor:{borderColor:"#CCC"},inputFile:{display:"none"},highlight:{borderColor:"#686868"},unhighlight:{borderColor:"#CCC"},dropFile:{background:"linear-gradient(to bottom, #EEE, #DDD)",borderRadius:20,display:"block",height:120,width:100,paddingLeft:10,paddingRight:10,position:"relative",zIndex:10},column:{alignItems:"center",display:"flex",flexDirection:"column",justifyContent:"center"},fileSizeInfo:{backgroundColor:"rgba(255, 255, 255, 0.4)",borderRadius:3,lineHeight:1,marginBottom:"0.5em",padding:"0 0.4em"},fileNameInfo:{backgroundColor:"rgba(255, 255, 255, 0.4)",borderRadius:3,fontSize:14,lineHeight:1,padding:"0 0.4em"},defaultCursor:{cursor:"default"},pointerCursor:{cursor:"pointer"},dropFileRemoveButton:{height:23,position:"absolute",right:6,top:6,width:23}},G=function(e){function t(){var t,n,o,a,s,u,l,c,f,p=e.apply(this,arguments)||this;return p.inputFileRef=V.createRef(),p.dropAreaRef=V.createRef(),p.fileSizeInfoRef=V.createRef(),p.fileNameInfoRef=V.createRef(),p.REMOVE_ICON_COLOR=p.props.removeButtonColor||(null===(a=null===(o=null===(n=null===(t=p.props.style)||void 0===t?void 0:t.dropArea)||void 0===n?void 0:n.dropFile)||void 0===o?void 0:o.removeButton)||void 0===a?void 0:a.color)||(null===(l=null===(u=null===(s=p.props.style)||void 0===s?void 0:s.dropFile)||void 0===u?void 0:u.removeButton)||void 0===l?void 0:l.color)||(null===(f=null===(c=p.props.style)||void 0===c?void 0:c.removeButton)||void 0===f?void 0:f.color)||"#A01919",p.REMOVE_ICON_COLOR_LIGHT=K(p.REMOVE_ICON_COLOR,40),p.state={dropAreaCustom:{},progressBar:0,displayProgressBarStatus:"none",file:null,timeout:null,files:null,removeIconColor:p.REMOVE_ICON_COLOR,isCanceled:!1},p.componentDidUpdate=function(e){p.props.isReset!==e.isReset&&p.removeFile()},p.componentDidMount=function(){var e=p.dropAreaRef.current;if(e){if(["dragenter","dragover","dragleave","drop"].forEach((function(t){e.addEventListener(t,p.preventDefaults,!1)})),!p.props.noDrag){["dragenter","dragover"].forEach((function(t){e.addEventListener(t,p.highlight,!1)})),e.addEventListener("dragleave",p.unhighlight,!1),e.addEventListener("drop",p.unhighlight,!1),e.addEventListener("drop",p.visibleProgressBar,!1),e.addEventListener("drop",p.handleDrop,!1)}}},p.componentWillUnmount=function(){var e=p.dropAreaRef.current;if(["dragenter","dragover","dragleave","drop"].forEach((function(t){e.removeEventListener(t,p.preventDefaults,!1)})),!p.props.noDrag){["dragenter","dragover"].forEach((function(t){e.removeEventListener(t,p.highlight,!1)})),e.removeEventListener("dragleave",p.unhighlight,!1),e.removeEventListener("drop",p.unhighlight,!1),e.removeEventListener("drop",p.visibleProgressBar,!1),e.removeEventListener("drop",p.handleDrop,!1)}},p.preventDefaults=function(e){e.preventDefault(),e.stopPropagation()},p.highlight=function(){var e,t,r,n,o=p.props.style;p.setState({dropAreaCustom:Object.assign({},(null==o?void 0:o.dropAreaActive)?(null==o?void 0:o.dropAreaActive.borderColor)?null==o?void 0:o.dropAreaActive:Object.assign({},null==o?void 0:o.dropAreaActive,X.highlight):(null===(e=null==o?void 0:o.dropArea)||void 0===e?void 0:e.dropAreaActive)?(null===(t=null==o?void 0:o.dropArea)||void 0===t?void 0:t.dropAreaActive.borderColor)?null===(r=null==o?void 0:o.dropArea)||void 0===r?void 0:r.dropAreaActive:Object.assign({},null===(n=null==o?void 0:o.dropArea)||void 0===n?void 0:n.dropAreaActive,X.highlight):X.highlight)}),p.setState({progressBar:0})},p.unhighlight=function(){var e,t;p.setState({dropAreaCustom:Object.assign({},(null===(t=null===(e=p.props.style)||void 0===e?void 0:e.dropArea)||void 0===t?void 0:t.borderColor)?{}:X.dropAreaDefaultBorderColor)})},p.visibleProgressBar=function(){p.props.noProgressBar||p.setState({displayProgressBarStatus:"block"})},p.handleDrop=function(e){var t=null,r=!1;void 0===e.files?t=e.dataTransfer.files:t=e.files;0===t.length&&(t=p.state.files,r=!0),p.setState({files:t,isCanceled:r},(function(){p.handleFiles()}))},p.handleFiles=function(){p.setState({progressBar:0});i([],p.state.files).forEach(p.uploadFile)},p.uploadFile=function(e){p.displayFileInfo(e),p.setState({file:e});var t=p.props,n=t.onDrop,o=t.onFileLoad,i=t.onError,a=t.config,s=void 0===a?{}:a,u=new window.FileReader,l={},c=e.size,f=[],d=0;if(n||o){var h=p;l=Object.assign({complete:(null==s?void 0:s.complete)||(null==s?void 0:s.step)?s.complete:function(){!n&&o?o(f,e):n&&!o&&n(f,e)},step:(null==s?void 0:s.step)?s.step:function(t){if(f.push(t),s&&s.preview)d=Math.round(f.length/s.preview*100),h.setState({progressBar:d}),f.length===s.preview&&(!n&&o?o(f,e):n&&!o&&n(f,e));else{var r=t.meta.cursor,i=Math.round(r/c*100);if(i===d)return;d=i}h.setState({progressBar:d})}},l)}i&&(l=Object.assign({error:i},l)),s&&(l=Object.assign({},s,l)),u.onload=function(e){r.parse(e.target.result,l)},u.onloadend=function(){clearTimeout(p.state.timeout),p.setState({timeout:setTimeout((function(){p.disableProgressBar()}),2e3)})},u.readAsText(e,s.encoding||"utf-8")},p.displayFileInfo=function(e){p.childrenIsFunction()||(p.fileSizeInfoRef.current.innerHTML=H(e.size),p.fileNameInfoRef.current.innerHTML=e.name)},p.disableProgressBar=function(){p.props.noProgressBar||p.setState({displayProgressBarStatus:"none"})},p.childrenIsFunction=function(){return"function"==typeof p.props.children},p.fileChange=function(e){var t=e.target;p.props.noProgressBar?p.handleDrop(t):p.setState({displayProgressBarStatus:"block"},(function(){p.handleDrop(t)}))},p.open=function(e){var t=p.state.displayProgressBarStatus;e&&"none"===t&&(p.preventDefaults(e),p.inputFileRef.current.value=null,p.inputFileRef.current.click())},p.renderChildren=function(){var e=p.props.children,t=p.state,r=t.file,n=t.progressBar;return p.childrenIsFunction()?e({file:r,progressBar:n}):e},p.handleRemoveFile=function(e){e&&(e.stopPropagation(),p.removeFile())},p.removeFile=function(){p.setState({files:null,file:null});var e=p.props.onRemoveFile;e&&e(null),p.inputFileRef.current.value=null},p.changeRemoveIconColor=function(e){e&&p.setState({removeIconColor:e})},p.renderDropFileRemoveButton=function(){var e=p.props.addRemoveButton,t=p.state,r=t.removeIconColor,n=t.displayProgressBarStatus;return e&&"none"===n?V.createElement("div",{style:X.dropFileRemoveButton,onClick:function(e){return p.handleRemoveFile(e)},onMouseOver:function(){return p.changeRemoveIconColor(p.REMOVE_ICON_COLOR_LIGHT)},onMouseOut:function(){return p.changeRemoveIconColor(p.REMOVE_ICON_COLOR)}},V.createElement(Y,{color:r})):e?V.createElement("div",{style:X.dropFileRemoveButton},V.createElement(Y,{color:p.REMOVE_ICON_COLOR})):null},p}return o(t,e),t.prototype.render=function(){var e,t,r,n,o,i,a,s,u,l,c,f,p,d=this,h=this.props,v=h.style,y=h.noClick,m=h.children,g=h.noProgressBar,_=h.progressBarColor,b=h.accept,C=this.state,R=C.dropAreaCustom,w=C.files,k=C.isCanceled,E=C.progressBar,O=C.displayProgressBarStatus;return V.createElement(V.Fragment,null,V.createElement("input",{type:"file",accept:b||"text/csv, .csv, application/vnd.ms-excel",ref:this.inputFileRef,style:X.inputFile,onChange:function(e){return d.fileChange(e)}}),this.childrenIsFunction()?V.createElement("div",{ref:this.dropAreaRef},this.renderChildren(),w&&w.length>0&&!k&&!g&&V.createElement(J,{style:Object.assign({},_?{backgroundColor:_}:{},(null===(f=null===(c=null==v?void 0:v.dropArea)||void 0===c?void 0:c.dropFile)||void 0===f?void 0:f.progressBar)||(null===(p=null==v?void 0:v.dropFile)||void 0===p?void 0:p.progressBar)||(null==v?void 0:v.progressBar)),progressBar:E,displayProgressBarStatus:O,isButtonProgressBar:!0})):V.createElement("div",{ref:this.dropAreaRef,style:Object.assign({},X.dropArea,null==v?void 0:v.dropArea,R,void 0!==y||"block"===O?X.defaultCursor:X.pointerCursor),onClick:function(e){y||d.open(e)}},w&&w.length>0?V.createElement("div",{style:Object.assign({},X.dropFile,X.column,(null===(e=null==v?void 0:v.dropArea)||void 0===e?void 0:e.dropFile)||(null==v?void 0:v.dropFile))},this.renderDropFileRemoveButton(),V.createElement("div",{style:X.column},V.createElement("span",{style:Object.assign({},X.fileSizeInfo,(null===(r=null===(t=null==v?void 0:v.dropArea)||void 0===t?void 0:t.dropFile)||void 0===r?void 0:r.fileSizeInfo)||(null===(n=null==v?void 0:v.dropArea)||void 0===n?void 0:n.fileSizeInfo)||(null==v?void 0:v.fileSizeInfo)),ref:this.fileSizeInfoRef}),V.createElement("span",{style:Object.assign({},X.fileNameInfo,(null===(i=null===(o=null==v?void 0:v.dropArea)||void 0===o?void 0:o.dropFile)||void 0===i?void 0:i.fileNameInfo)||(null===(a=null==v?void 0:v.dropFile)||void 0===a?void 0:a.fileNameInfo)||(null==v?void 0:v.fileNameInfo)),ref:this.fileNameInfoRef})),w&&w.length>0&&!k&&!g&&V.createElement(J,{style:Object.assign({},_?{backgroundColor:_}:{},(null===(u=null===(s=null==v?void 0:v.dropArea)||void 0===s?void 0:s.dropFile)||void 0===u?void 0:u.progressBar)||(null===(l=null==v?void 0:v.dropFile)||void 0===l?void 0:l.progressBar)||(null==v?void 0:v.progressBar)),progressBar:E,displayProgressBarStatus:O})):m))},t.defaultProps={isReset:!1},t}(V.Component),Z="link",ee="button",te=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.download=function(e,t,n,o){var i=n?"\ufeff":"",a=null,s=null;"function"==typeof e&&(e=e()),a="object"==typeof e?r.unparse(e,o):e;var u=new Blob([""+i+a],{type:"text/csv;charset=utf-8;"}),l=window.navigator;s=l.msSaveBlob?l.msSaveBlob(u,t+".csv"):window.URL.createObjectURL(u);var c=document.createElement("a");c.href=s,c.setAttribute("download",t+".csv"),c.click(),c.remove()},t}return o(t,e),t.prototype.render=function(){var e=this,t=this.props,r=t.children,n=t.data,o=t.filename,i=t.type,a=t.className,s=t.style,u=t.bom,l=void 0!==u&&u,c=t.config,f=void 0===c?{}:c;return"link"===i?V.createElement("a",{onClick:function(){return e.download(n,o,l,f)},className:a,style:s},r):V.createElement("button",{onClick:function(){return e.download(n,o,l,f)},className:a,style:s},r)},t.defaultProps={type:"link"},t}(V.Component);function re(e,t){return void 0===t&&(t={}),r.parse(e,t)}function ne(e,t){void 0===t&&(t={}),r.parse(e,Object.assign({},{download:!0},t))}function oe(e,t){return void 0===t&&(t={}),r.unparse(e,t)}var ie=r.BAD_DELIMITERS,ae=r.RECORD_SEP,se=r.UNIT_SEP,ue=r.WORKERS_SUPPORTED,le=r.LocalChunkSize,ce=r.DefaultDelimiter;


/***/ }),

/***/ 86:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Emitter = __webpack_require__(624);

function Stream() {
  Emitter.call(this);
}
Stream.prototype = new Emitter();
module.exports = Stream;
// Backwards-compat with node 0.4.x
Stream.Stream = Stream;

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (!this.hasListeners('error')) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.off('data', ondata);
    dest.off('drain', ondrain);

    source.off('end', onend);
    source.off('close', onclose);

    source.off('error', onerror);
    dest.off('error', onerror);

    source.off('end', cleanup);
    source.off('close', cleanup);

    dest.off('end', cleanup);
    dest.off('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('end', cleanup);
  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
}


/***/ }),

/***/ 492:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ByColumnNameCsvImporter = void 0;
var csv_importer_1 = __webpack_require__(563);
var columns_1 = __webpack_require__(826);
var transaction_detail_1 = __webpack_require__(23);
var transaction_1 = __webpack_require__(312);
var importer_decorator_1 = __webpack_require__(606);
var ByColumnNameCsvImporter = /** @class */ (function (_super) {
    __extends(ByColumnNameCsvImporter, _super);
    function ByColumnNameCsvImporter(config, importer) {
        var _this = _super.call(this, importer) || this;
        _this.config = config;
        _this.columns = new columns_1.Columns({});
        return _this;
    }
    ByColumnNameCsvImporter.prototype.defineIncomingFormat = function (columns) {
        this.columns = this.alignColumnsWithTypesFromConfig(columns);
        _super.prototype.defineIncomingFormat.call(this, this.columns);
    };
    ByColumnNameCsvImporter.prototype.alignColumnsWithTypesFromConfig = function (columns) {
        for (var i = 0; i < columns.getNumColumns(); i++) {
            if (columns.hasColumn(i)) {
                var type = this.config.getTypeFor(columns.getName(i));
                if (type) {
                    columns.setType(i, type);
                }
            }
        }
        return columns;
    };
    ByColumnNameCsvImporter.prototype.convert = function (string) {
        var transaction = _super.prototype.convert.call(this, string);
        var converter = new csv_importer_1.CsvImporter();
        converter.defineIncomingFormat(this.columns);
        var converted = converter.convert(string);
        var details = transaction.getDetails();
        var mappings = this.config.getMappings();
        for (var i = 0; i < mappings.length; i++) {
            var mapping = mappings[i];
            var header = mapping.getColumnHeader();
            if (!converted.hasDetailWithColumnName(header)) {
                throw new Error("Imported CSV did not have the following column: " + header);
            }
        }
        for (var i = 0; i < mappings.length; i++) {
            var mapping = mappings[i];
            var header = mapping.getColumnHeader();
            var detailsForColumn = converted.getDetailsByColumnName(header);
            for (var j = 0; j < detailsForColumn.length; j++) {
                var detail = detailsForColumn[j];
                var changedDetail = new transaction_detail_1.TransactionDetail(detail.getElement(), mapping.getNodeName(), detail.getType());
                details.push(changedDetail);
            }
        }
        return new transaction_1.Transaction(details);
    };
    ByColumnNameCsvImporter.prototype.necessaryColumnHeaders = function () {
        var headers = _super.prototype.necessaryColumnHeaders.call(this);
        var mappings = this.config.getMappings();
        for (var i = 0; i < mappings.length; i++) {
            var mapping = mappings[i];
            headers.push(mapping.getColumnHeader());
        }
        return headers;
    };
    return ByColumnNameCsvImporter;
}(importer_decorator_1.ImporterDecorator));
exports.ByColumnNameCsvImporter = ByColumnNameCsvImporter;


/***/ }),

/***/ 826:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Columns = exports.nameKey = exports.columnNameDelimeter = void 0;
exports.columnNameDelimeter = '|';
exports.nameKey = 'name';
var Columns = /** @class */ (function () {
    function Columns(configuration) {
        this.configuration = JSON.parse(JSON.stringify(configuration));
    }
    Columns.prototype.copy = function () {
        return new Columns(this.configuration);
    };
    Columns.prototype.getNumColumns = function () {
        return Object.keys(this.configuration).length;
    };
    Columns.prototype.getName = function (columnIndex) {
        this._checkColumnIndex(columnIndex);
        return this.configuration[columnIndex][exports.nameKey];
    };
    Columns.prototype.getType = function (columnIndex) {
        this._checkColumnIndex(columnIndex);
        return this.configuration[columnIndex]['type'];
    };
    Columns.prototype.setType = function (columnIndex, type) {
        this._checkColumnIndex(columnIndex);
        this.configuration[columnIndex]['type'] = type;
    };
    Columns.prototype.hasColumn = function (columnIndex) {
        return (columnIndex in this.configuration);
    };
    Columns.prototype.hasColumnWithName = function (columnName) {
        var hasColumnWithName = false;
        for (var i = 0; i < this.getNumColumns(); i++) {
            if (columnName === this.configuration[i]['name']) {
                hasColumnWithName = true;
                break;
            }
        }
        return hasColumnWithName;
    };
    Columns.prototype._checkColumnIndex = function (columnIndex) {
        if (!this.hasColumn(columnIndex)) {
            throw new Error("Column [" + columnIndex + "] does not exist");
        }
    };
    return Columns;
}());
exports.Columns = Columns;


/***/ }),

/***/ 118:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.escapeCsvElement = exports.removeCommaAtEnd = exports.removeFirstCharacter = exports.CsvExporter = void 0;
var category_1 = __webpack_require__(789);
var columns_1 = __webpack_require__(826);
var exporter_decorator_1 = __webpack_require__(455);
var CsvExporter = /** @class */ (function (_super) {
    __extends(CsvExporter, _super);
    function CsvExporter(exporter) {
        var _this = _super.call(this, exporter) || this;
        _this.columns = new columns_1.Columns({});
        return _this;
    }
    CsvExporter.prototype.defineOutgoingFormat = function (columns) {
        _super.prototype.defineOutgoingFormat.call(this, columns);
        this.columns = columns.copy();
    };
    CsvExporter.prototype.convertColumns = function (columns) {
        var converted = "";
        var getMinIndex = function () {
            var minIndex = 1000000000;
            for (var i = 0; i < columns.getNumColumns(); i++) {
                if (columns.hasColumn(i)) {
                    if (i < minIndex) {
                        minIndex = i;
                    }
                }
            }
            return minIndex;
        };
        var getMaxIndex = function () {
            var maxIndex = -1;
            for (var i = columns.getNumColumns(); i >= 0; i--) {
                if (columns.hasColumn(i)) {
                    if (i > maxIndex) {
                        maxIndex = i;
                    }
                }
            }
            return maxIndex;
        };
        for (var i = getMinIndex(); i <= getMaxIndex(); i++) {
            if (!columns.hasColumn(i)) {
                converted += ",noConfig" + i;
                continue;
            }
            if (i === 0) {
                converted = columns.getName(i);
            }
            else {
                converted = converted + "," + columns.getName(i);
            }
        }
        return converted + _super.prototype.convertColumns.call(this, columns);
    };
    CsvExporter.prototype.convert = function (transaction, category) {
        var containsColumnName = function (columnNames) {
            var hasColumnName = false;
            for (var i = 0; i < columnNames.length; i++) {
                var columnName = columnNames[i];
                if (transaction.hasDetailWithColumnName(columnName)) {
                    hasColumnName = true;
                    break;
                }
            }
            return hasColumnName;
        };
        var converted = "";
        var details = transaction.getDetails();
        var length = this.columns.getNumColumns();
        for (var i = 0; i < length; i++) {
            if (!this.columns.hasColumn(i)) {
                var detail = details[i];
                if (detail) {
                    converted += escapeCsvElement(detail.getElement()) + ",";
                }
                else {
                    // @ts-ignore
                    converted += escapeCsvElement(category.getName()) + ",";
                }
                continue;
            }
            var type = this.columns.getType(i);
            var name_1 = this.columns.getName(i);
            if (type === category_1.CATEGORY_TYPE) {
                // @ts-ignore
                converted += escapeCsvElement(category.getName()) + ",";
            }
            else if (!name_1) {
                converted += ",";
            }
            else {
                if (containsColumnName([name_1])) {
                    var csvElement = this.intoCsvElement(transaction, name_1);
                    converted += escapeCsvElement(csvElement) + ",";
                }
                else {
                    converted += ",";
                }
            }
        }
        var fullString = converted + _super.prototype.convert.call(this, transaction, category);
        return removeCommaAtEnd(fullString);
    };
    CsvExporter.prototype.intoCsvElement = function (transaction, columnName) {
        var csvElement = "";
        var details = transaction.getDetailsByColumnName(columnName);
        for (var i = 0; i < details.length; i++) {
            var detail = details[i];
            csvElement = csvElement + "-" + detail.getElement();
        }
        return removeFirstCharacter(csvElement);
    };
    return CsvExporter;
}(exporter_decorator_1.ExporterDecorator));
exports.CsvExporter = CsvExporter;
function removeFirstCharacter(toRemoveFrom) {
    var withoutLastComma = toRemoveFrom.substring(1, toRemoveFrom.length);
    return withoutLastComma;
}
exports.removeFirstCharacter = removeFirstCharacter;
function removeLastCharacter(toRemoveFrom) {
    var withoutLastComma = toRemoveFrom.substring(0, toRemoveFrom.length - 1);
    return withoutLastComma;
}
function removeCommaAtEnd(toRemoveFrom) {
    return removeLastCharacter(toRemoveFrom);
}
exports.removeCommaAtEnd = removeCommaAtEnd;
function escapeCsvElement(raw) {
    var asCsv = '"' + raw + '"';
    return asCsv;
}
exports.escapeCsvElement = escapeCsvElement;


/***/ }),

/***/ 563:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unescapeCsvElement = exports.CsvImporter = void 0;
var transaction_1 = __webpack_require__(312);
var columns_1 = __webpack_require__(826);
var transaction_detail_1 = __webpack_require__(23);
var importer_decorator_1 = __webpack_require__(606);
var csv_line_splitter_1 = __webpack_require__(622);
var CsvImporter = /** @class */ (function (_super) {
    __extends(CsvImporter, _super);
    function CsvImporter(importer) {
        var _this = _super.call(this, importer) || this;
        _this.columns = new columns_1.Columns({});
        return _this;
    }
    CsvImporter.prototype.defineIncomingFormat = function (columns) {
        this.columns = columns.copy();
        _super.prototype.defineIncomingFormat.call(this, columns);
    };
    CsvImporter.prototype.convert = function (string) {
        var transaction = _super.prototype.convert.call(this, string);
        var details = transaction.getDetails();
        if (!string) {
            return new transaction_1.Transaction(this.getDefaultDetails());
        }
        var splits = (0, csv_line_splitter_1.split)(string);
        // @ts-ignore
        details.push.apply(details, this.convertDetailsFoundInLine(splits));
        // @ts-ignore
        details.push.apply(details, this.convertDetailsNotFoundInLine(splits));
        return new transaction_1.Transaction(details);
    };
    CsvImporter.prototype.getDefaultDetails = function () {
        var details = [];
        var numColumns = this.columns.getNumColumns();
        for (var i = 0; i < numColumns; i++) {
            if (this.columns.hasColumn(i)) {
                details.push(new transaction_detail_1.TransactionDetail("", this.columns.getName(i), this.columns.getType(i)));
            }
        }
        return details;
    };
    CsvImporter.prototype.convertDetailsFoundInLine = function (splits) {
        var details = [];
        for (var i = 0; i < splits.length; i++) {
            var element = getElement(i, splits);
            var split_1 = unescapeCsvElement(element);
            var detail = new transaction_detail_1.TransactionDetail(split_1, this.getColumnNameIfExists(this.columns, i), this.getColumnTypeIfExists(this.columns, i));
            details.push(detail);
        }
        return details;
    };
    CsvImporter.prototype.convertDetailsNotFoundInLine = function (splits) {
        var details = [];
        for (var i = splits.length; i < this.columns.getNumColumns(); i++) {
            var detail = new transaction_detail_1.TransactionDetail("", this.getColumnNameIfExists(this.columns, i), this.getColumnTypeIfExists(this.columns, i));
            details.push(detail);
        }
        return details;
    };
    CsvImporter.prototype.getColumnNameIfExists = function (columns, index) {
        if (!columns.hasColumn(index)) {
            return "noConfig" + index;
        }
        return columns.getName(index);
    };
    CsvImporter.prototype.getColumnTypeIfExists = function (columns, index) {
        if (!columns.hasColumn(index)) {
            return transaction_detail_1.STRING_TYPE;
        }
        return columns.getType(index);
    };
    return CsvImporter;
}(importer_decorator_1.ImporterDecorator));
exports.CsvImporter = CsvImporter;
function getElement(index, strings) {
    if (index > strings.length) {
        return "";
    }
    else {
        return strings[index];
    }
}
function unescapeCsvElement(element) {
    if (!element) {
        return "";
    }
    return element.split('"').join("");
}
exports.unescapeCsvElement = unescapeCsvElement;


/***/ }),

/***/ 622:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.split = exports.readCsv = void 0;
var react_papaparse_1 = __webpack_require__(893);
var csv_exporter_1 = __webpack_require__(118);
var csv_importer_1 = __webpack_require__(563);
function readCsv(input) {
    var lines = [];
    var asPapaParse = (0, react_papaparse_1.readString)(input, { skipEmptyLines: 'greedy' });
    for (var i = 0; i < asPapaParse.data.length; i++) {
        var papaParseArray = asPapaParse.data[i];
        // @ts-ignore
        var line = csvLineWithEscapes(papaParseArray);
        lines.push(line);
    }
    return lines;
}
exports.readCsv = readCsv;
function csvLineWithEscapes(data) {
    var line = "";
    for (var i = 0; i < data.length; i++) {
        line = line + "," + (0, csv_exporter_1.escapeCsvElement)(data[i]);
    }
    return (0, csv_exporter_1.removeFirstCharacter)(line);
}
function split(input) {
    if (!(0, csv_importer_1.unescapeCsvElement)(input)) {
        return [];
    }
    var asPapaParse = (0, react_papaparse_1.readString)(input, { skipEmptyLines: "greedy" });
    if (asPapaParse.data.length > 1) {
        throw new Error("Line had more than one line in it [" + asPapaParse.data.length + "]");
    }
    var papaParseArray = asPapaParse.data[0];
    return papaParseArray;
}
exports.split = split;


/***/ }),

/***/ 939:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VENMO_FORMAT = exports.RAW_FORMAT = exports.SCEPTER_FORMAT = exports.CsvType = void 0;
var CsvType = /** @class */ (function () {
    function CsvType(type) {
        this.type = type;
    }
    CsvType.prototype.get = function () {
        return this.type;
    };
    CsvType.prototype.equals = function (csvType) {
        return this.type === csvType.type;
    };
    CsvType.prototype.copy = function () {
        return new CsvType(this.type);
    };
    return CsvType;
}());
exports.CsvType = CsvType;
exports.SCEPTER_FORMAT = new CsvType('Scepter');
exports.RAW_FORMAT = new CsvType('--');
exports.VENMO_FORMAT = new CsvType('Venmo');


/***/ }),

/***/ 455:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExporterDecorator = void 0;
var ExporterDecorator = /** @class */ (function () {
    function ExporterDecorator(exporter) {
        // @ts-ignore
        this.exporter = exporter;
    }
    ExporterDecorator.prototype.convertColumns = function (columns) {
        if (this.exporter) {
            return this.exporter.convertColumns(columns);
        }
        else {
            return "";
        }
    };
    ExporterDecorator.prototype.defineOutgoingFormat = function (columns) {
        if (this.exporter) {
            this.exporter.defineOutgoingFormat(columns);
        }
    };
    ExporterDecorator.prototype.convert = function (transaction, category) {
        if (this.exporter) {
            return this.exporter.convert(transaction, category);
        }
        else {
            return "";
        }
    };
    return ExporterDecorator;
}());
exports.ExporterDecorator = ExporterDecorator;


/***/ }),

/***/ 606:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImporterDecorator = void 0;
var transaction_1 = __webpack_require__(312);
var ImporterDecorator = /** @class */ (function () {
    function ImporterDecorator(importer) {
        this.importer = importer;
    }
    ImporterDecorator.prototype.defineIncomingFormat = function (columns) {
        if (this.importer) {
            this.importer.defineIncomingFormat(columns);
        }
    };
    ImporterDecorator.prototype.convert = function (item) {
        if (!this.importer) {
            return new transaction_1.Transaction([]);
        }
        return this.importer.convert(item);
    };
    ImporterDecorator.prototype.necessaryColumnHeaders = function () {
        if (!this.importer) {
            return new Array();
        }
        return this.importer.necessaryColumnHeaders();
    };
    return ImporterDecorator;
}());
exports.ImporterDecorator = ImporterDecorator;


/***/ }),

/***/ 469:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WithViewContextExporter = exports.SCEPTER_CATEGORY_SPACER_COLUMN_NAME = exports.SCEPTER_CATEGORY_COLOR_COLUMN_NAME = exports.SCEPTER_CATEGORY_ORDERING_COLUMN_NAME = void 0;
var exporter_decorator_1 = __webpack_require__(455);
var csv_exporter_1 = __webpack_require__(118);
exports.SCEPTER_CATEGORY_ORDERING_COLUMN_NAME = "Ordering";
exports.SCEPTER_CATEGORY_COLOR_COLUMN_NAME = "Color";
exports.SCEPTER_CATEGORY_SPACER_COLUMN_NAME = "Spacer";
var WithViewContextExporter = /** @class */ (function (_super) {
    __extends(WithViewContextExporter, _super);
    function WithViewContextExporter(viewContext, exporter) {
        var _this = _super.call(this, exporter) || this;
        _this.viewContext = viewContext;
        return _this;
    }
    WithViewContextExporter.prototype.convertColumns = function (columns) {
        return (_super.prototype.convertColumns.call(this, columns) +
            "," +
            exports.SCEPTER_CATEGORY_ORDERING_COLUMN_NAME +
            "," +
            exports.SCEPTER_CATEGORY_COLOR_COLUMN_NAME +
            "," +
            exports.SCEPTER_CATEGORY_SPACER_COLUMN_NAME);
    };
    WithViewContextExporter.prototype.defineOutgoingFormat = function (columns) {
        if (this.exporter) {
            this.exporter.defineOutgoingFormat(columns);
        }
    };
    WithViewContextExporter.prototype.convert = function (transaction, category) {
        // @ts-ignore
        var color = this.viewContext.getColorFor(category);
        // @ts-ignore
        var ordering = this.viewContext.getOrderFor(category);
        var spacer = 
        // @ts-ignore
        this.viewContext.hasSpacerBefore(category) +
            "/" +
            // @ts-ignore
            this.viewContext.hasSpacerAfter(category);
        return (_super.prototype.convert.call(this, transaction, category) +
            // @ts-ignore
            (0, csv_exporter_1.escapeCsvElement)(ordering) +
            "," +
            // @ts-ignore
            (0, csv_exporter_1.escapeCsvElement)(color === null || color === void 0 ? void 0 : color.hex()) +
            "," +
            (0, csv_exporter_1.escapeCsvElement)(spacer) +
            ",");
    };
    return WithViewContextExporter;
}(exporter_decorator_1.ExporterDecorator));
exports.WithViewContextExporter = WithViewContextExporter;


/***/ }),

/***/ 607:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(196), exports);


/***/ }),

/***/ 49:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BankConfig = void 0;
var BankConfig = /** @class */ (function () {
    function BankConfig(asJson) {
        this.asJson = JSON.parse(JSON.stringify(asJson));
    }
    BankConfig.prototype.getName = function () {
        // @ts-ignore
        return this.asJson.name;
    };
    BankConfig.prototype.getFilePath = function () {
        // @ts-ignore
        return this.asJson.imageFilePath;
    };
    BankConfig.prototype.getTypeFor = function (columnHeaderName) {
        var type = null;
        var mappings = this.getMappings();
        for (var i = 0; i < mappings.length; i++) {
            var mapping = mappings[i];
            if (mapping.getColumnHeader() === columnHeaderName) {
                type = mapping.getType();
            }
        }
        return type;
    };
    BankConfig.prototype.getMappings = function () {
        // @ts-ignore
        var mappings = this.asJson.mappings;
        var converted = [];
        for (var i = 0; i < mappings.length; i++) {
            var mapping = mappings[i];
            converted.push(new CsvColumnNameMapping(mapping.csvHeaderName, mapping.nodeFormatName, mapping.type));
        }
        return converted;
    };
    return BankConfig;
}());
exports.BankConfig = BankConfig;
var CsvColumnNameMapping = /** @class */ (function () {
    function CsvColumnNameMapping(columnHeaderName, nodeFormat, type) {
        this.columnHeaderName = columnHeaderName;
        this.nodeFormat = nodeFormat;
        this.type = type;
    }
    CsvColumnNameMapping.prototype.getColumnHeader = function () {
        return this.columnHeaderName.slice();
    };
    CsvColumnNameMapping.prototype.getNodeName = function () {
        return this.nodeFormat;
    };
    CsvColumnNameMapping.prototype.getType = function () {
        return this.type;
    };
    return CsvColumnNameMapping;
}());


/***/ }),

/***/ 373:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MasterBankConfigParser = void 0;
var bank_config_1 = __webpack_require__(49);
var MasterBankConfigParser = /** @class */ (function () {
    function MasterBankConfigParser(config) {
        this.config = JSON.parse(JSON.stringify(config));
    }
    MasterBankConfigParser.prototype.getDefaultConfigName = function () {
        // @ts-ignore
        return this.config.default;
    };
    MasterBankConfigParser.prototype.getDefaultConfig = function () {
        return this.getConfigFor(this.getDefaultConfigName());
    };
    MasterBankConfigParser.prototype.getConfigurationCount = function () {
        // @ts-ignore
        return this.config.configs.length;
    };
    MasterBankConfigParser.prototype.getConfigFor = function (configName) {
        var configs = this.getConfigs();
        var foundConfig = null;
        for (var i = 0; i < configs.length; i++) {
            var config = configs[i];
            if (config.getName() === configName) {
                foundConfig = config;
                break;
            }
        }
        return foundConfig;
    };
    MasterBankConfigParser.prototype.getConfigs = function () {
        // @ts-ignore
        var configs = this.config.configs;
        var parsed = [];
        for (var i = 0; i < configs.length; i++) {
            parsed.push(new bank_config_1.BankConfig(configs[i]));
        }
        return parsed;
    };
    return MasterBankConfigParser;
}());
exports.MasterBankConfigParser = MasterBankConfigParser;


/***/ }),

/***/ 502:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MasterBankConfig = void 0;
var csv_type_1 = __webpack_require__(939);
var with_view_context_exporter_1 = __webpack_require__(469);
var category_1 = __webpack_require__(789);
var color_1 = __webpack_require__(265);
var transaction_1 = __webpack_require__(312);
var transaction_detail_1 = __webpack_require__(23);
var scepter_format_importer_1 = __webpack_require__(634);
var date_converter_1 = __webpack_require__(386);
exports.MasterBankConfig = {
    default: csv_type_1.RAW_FORMAT.get(),
    configs: [
        {
            name: "Chase-Credit",
            imageFilePath: __webpack_require__(68),
            mappings: [
                {
                    csvHeaderName: "Transaction Date",
                    nodeFormatName: "Date",
                    type: date_converter_1.DATE_TYPE,
                },
                {
                    csvHeaderName: "Description",
                    nodeFormatName: "Vendor",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Category",
                    nodeFormatName: "Notes",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Amount",
                    nodeFormatName: "Amount",
                    type: transaction_detail_1.STRING_TYPE,
                },
            ],
        },
        {
            name: "Chase-Checking",
            imageFilePath: __webpack_require__(68),
            mappings: [
                {
                    csvHeaderName: "Posting Date",
                    nodeFormatName: "Date",
                    type: date_converter_1.DATE_TYPE,
                },
                {
                    csvHeaderName: "Description",
                    nodeFormatName: "Vendor",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Type",
                    nodeFormatName: "Notes",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Amount",
                    nodeFormatName: "Amount",
                    type: transaction_detail_1.STRING_TYPE,
                },
            ],
        },
        {
            name: "Chase-Saving",
            imageFilePath: __webpack_require__(68),
            mappings: [
                {
                    csvHeaderName: "Posting Date",
                    nodeFormatName: "Date",
                    type: date_converter_1.DATE_TYPE,
                },
                {
                    csvHeaderName: "Description",
                    nodeFormatName: "Vendor",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Type",
                    nodeFormatName: "Notes",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Amount",
                    nodeFormatName: "Amount",
                    type: transaction_detail_1.STRING_TYPE,
                },
            ],
        },
        {
            name: "USBank-Credit",
            imageFilePath: __webpack_require__(872),
            mappings: [
                {
                    csvHeaderName: "Transaction Date",
                    nodeFormatName: "Date",
                    type: date_converter_1.DATE_TYPE,
                },
                {
                    csvHeaderName: "Name",
                    nodeFormatName: "Vendor",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Memo",
                    nodeFormatName: "Notes",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Amount",
                    nodeFormatName: "Amount",
                    type: transaction_detail_1.STRING_TYPE,
                },
            ],
        },
        {
            name: "USBank-Checking",
            imageFilePath: __webpack_require__(872),
            mappings: [
                {
                    csvHeaderName: "Date",
                    nodeFormatName: "Date",
                    type: date_converter_1.DATE_TYPE,
                },
                {
                    csvHeaderName: "Name",
                    nodeFormatName: "Vendor",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Memo",
                    nodeFormatName: "Notes",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Amount",
                    nodeFormatName: "Amount",
                    type: transaction_detail_1.STRING_TYPE,
                },
            ],
        },
        {
            name: "USBank-Reserve",
            imageFilePath: __webpack_require__(872),
            mappings: [
                {
                    csvHeaderName: "Date",
                    nodeFormatName: "Date",
                    type: date_converter_1.DATE_TYPE,
                },
                {
                    csvHeaderName: "Name",
                    nodeFormatName: "Vendor",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Memo",
                    nodeFormatName: "Notes",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Amount",
                    nodeFormatName: "Amount",
                    type: transaction_detail_1.STRING_TYPE,
                },
            ],
        },
        {
            name: "USBank-Saving",
            imageFilePath: __webpack_require__(872),
            mappings: [
                {
                    csvHeaderName: "Date",
                    nodeFormatName: "Date",
                    type: date_converter_1.DATE_TYPE,
                },
                {
                    csvHeaderName: "Name",
                    nodeFormatName: "Vendor",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Memo",
                    nodeFormatName: "Notes",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Amount",
                    nodeFormatName: "Amount",
                    type: transaction_detail_1.STRING_TYPE,
                },
            ],
        },
        {
            name: "Point",
            imageFilePath: __webpack_require__(977),
            mappings: [
                {
                    csvHeaderName: "Date Created",
                    nodeFormatName: "Date",
                    type: date_converter_1.DATE_TYPE,
                },
                {
                    csvHeaderName: "To User Nickname",
                    nodeFormatName: "Vendor",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Note",
                    nodeFormatName: "Notes",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Amount",
                    nodeFormatName: "Amount",
                    type: transaction_detail_1.STRING_TYPE,
                },
            ],
        },
        {
            name: "Point2",
            imageFilePath: __webpack_require__(977),
            mappings: [
                {
                    csvHeaderName: "Timestamp",
                    nodeFormatName: "Date",
                    type: date_converter_1.DATE_TYPE,
                },
                {
                    csvHeaderName: "Description",
                    nodeFormatName: "Vendor",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Outgoing",
                    nodeFormatName: "Amount",
                    type: transaction_detail_1.STRING_TYPE,
                },
            ],
        },
        {
            name: csv_type_1.VENMO_FORMAT.get(),
            imageFilePath: __webpack_require__(600),
            mappings: [
                {
                    csvHeaderName: "Datetime",
                    nodeFormatName: "Date",
                    type: date_converter_1.DATE_TYPE,
                },
                {
                    csvHeaderName: "From",
                    nodeFormatName: "Vendor",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "To",
                    nodeFormatName: "Vendor",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Note",
                    nodeFormatName: "Notes",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Amount (total)",
                    nodeFormatName: "Amount",
                    type: transaction_detail_1.STRING_TYPE,
                },
            ],
        },
        {
            name: "Paypal",
            imageFilePath: __webpack_require__(462),
            mappings: [
                {
                    csvHeaderName: "Date",
                    nodeFormatName: "Date",
                    type: date_converter_1.DATE_TYPE,
                },
                {
                    csvHeaderName: "Name",
                    nodeFormatName: "Vendor",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Type",
                    nodeFormatName: "Notes",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Gross",
                    nodeFormatName: "Amount",
                    type: transaction_detail_1.STRING_TYPE,
                },
            ],
        },
        {
            name: csv_type_1.SCEPTER_FORMAT.get(),
            imageFilePath: __webpack_require__(943),
            mappings: [
                {
                    csvHeaderName: "Account",
                    nodeFormatName: "Account",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Date",
                    nodeFormatName: "Date",
                    type: date_converter_1.DATE_TYPE,
                },
                {
                    csvHeaderName: "Vendor",
                    nodeFormatName: "Vendor",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: "Amount",
                    nodeFormatName: "Amount",
                    type: transaction_1.AMOUNT_TYPE,
                },
                {
                    csvHeaderName: "Notes",
                    nodeFormatName: "Notes",
                    type: transaction_detail_1.STRING_TYPE,
                },
                {
                    csvHeaderName: scepter_format_importer_1.SCEPTER_CATEGORY_COLUMN_NAME,
                    nodeFormatName: scepter_format_importer_1.SCEPTER_CATEGORY_COLUMN_NAME,
                    type: category_1.CATEGORY_TYPE,
                },
                {
                    csvHeaderName: with_view_context_exporter_1.SCEPTER_CATEGORY_ORDERING_COLUMN_NAME,
                    nodeFormatName: with_view_context_exporter_1.SCEPTER_CATEGORY_ORDERING_COLUMN_NAME,
                    type: "number",
                },
                {
                    csvHeaderName: with_view_context_exporter_1.SCEPTER_CATEGORY_COLOR_COLUMN_NAME,
                    nodeFormatName: with_view_context_exporter_1.SCEPTER_CATEGORY_COLOR_COLUMN_NAME,
                    type: color_1.COLOR_TYPE,
                },
                {
                    csvHeaderName: with_view_context_exporter_1.SCEPTER_CATEGORY_SPACER_COLUMN_NAME,
                    nodeFormatName: with_view_context_exporter_1.SCEPTER_CATEGORY_SPACER_COLUMN_NAME,
                    type: transaction_detail_1.STRING_TYPE,
                }
            ],
        },
        {
            name: csv_type_1.RAW_FORMAT.get(),
            mappings: [],
        },
    ],
};


/***/ }),

/***/ 789:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Category = exports.CATEGORY_TYPE = void 0;
exports.CATEGORY_TYPE = 'Category';
var Category = /** @class */ (function () {
    function Category(name) {
        if (!name) {
            throw new Error('Cannot build a category with a falsy type string');
        }
        if (name.trim().length === 0) {
            throw new Error('Must give a value that is not just empty space');
        }
        this.name = name.trim();
        this.transactions = [];
    }
    Category.prototype.getName = function () {
        return this.name;
    };
    Category.prototype.setName = function (newName) {
        if (!newName) {
            throw new Error('Cannot build a category with a falsy type string');
        }
        if (newName.trim().length === 0) {
            throw new Error('Must give a value that is not just empty space');
        }
        this.name = newName;
    };
    Category.prototype.associate = function (transaction) {
        this.transactions.push(transaction.copy());
    };
    Category.prototype.unassociate = function (transaction) {
        this.transactions = this.transactions.filter(function (inner) {
            return !transaction.equals(inner);
        });
    };
    Category.prototype.getTransactions = function () {
        var copied = [];
        for (var i = 0; i < this.transactions.length; i++) {
            copied.push(this.transactions[i].copy());
        }
        return copied;
    };
    Category.prototype.equals = function (category) {
        return this.name === category.name;
    };
    Category.prototype.copy = function () {
        var category = new Category(this.name);
        for (var i = 0; i < this.transactions.length; i++) {
            category.associate(this.transactions[i]);
        }
        return category;
    };
    return Category;
}());
exports.Category = Category;


/***/ }),

/***/ 265:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Color = exports.COLOR_TYPE = void 0;
exports.COLOR_TYPE = 'Color';
var Color = /** @class */ (function () {
    function Color(hexCode) {
        if (typeof hexCode !== 'string') {
            throw new Error('Cannot build without a hex string');
        }
        this.hexCode = hexCode;
    }
    Color.prototype.hex = function () {
        return this.hexCode;
    };
    Color.prototype.copy = function () {
        return new Color(this.hexCode);
    };
    Color.prototype.equals = function (color) {
        return this.hexCode === color.hexCode;
    };
    Color.prototype.darkerBy = function (factor) {
        var redHex = this.getRedHex();
        var greenHex = this.getGreenHex();
        var blueHex = this.getBlueHex();
        var darkerRedHex = Math.floor(redHex / factor);
        var darkerGreenHex = Math.floor(greenHex / factor);
        var darkerBlueHex = Math.floor(blueHex / factor);
        var darkerHexCode = this.concatHexCode(darkerRedHex, darkerGreenHex, darkerBlueHex);
        var withPound = "#" + darkerHexCode;
        return new Color(withPound);
    };
    Color.prototype.lighterBy = function (factor) {
        var multiplyByFactor = function (hexValue, factor) {
            var maxHex = 255;
            var lighterHexCode = (hexValue * factor);
            if (lighterHexCode > maxHex) {
                lighterHexCode = maxHex;
            }
            return Math.floor(lighterHexCode);
        };
        var redHex = this.getRedHex();
        var greenHex = this.getGreenHex();
        var blueHex = this.getBlueHex();
        var lighterRexHex = multiplyByFactor(redHex, factor);
        var lighterGreenHex = multiplyByFactor(greenHex, factor);
        var lighterBlueHex = multiplyByFactor(blueHex, factor);
        var lighterHexCode = this.concatHexCode(lighterRexHex, lighterGreenHex, lighterBlueHex);
        var withPound = "#" + lighterHexCode;
        return new Color(withPound);
    };
    Color.prototype.getRedHex = function () {
        var hexString = this.withoutStartingPound().substr(0, 2);
        return parseInt(hexString, 16);
    };
    Color.prototype.getGreenHex = function () {
        var hexString = this.withoutStartingPound().substr(2, 2);
        return parseInt(hexString, 16);
    };
    Color.prototype.getBlueHex = function () {
        var hexString = this.withoutStartingPound().substr(4, 2);
        return parseInt(hexString, 16);
    };
    Color.prototype.withoutStartingPound = function () {
        return this.hexCode.replace("#", "");
    };
    Color.prototype.padAndCapitalizeHex = function (integer) {
        var asHex = integer.toString(16);
        if (asHex.length != 2) {
            asHex = "0" + asHex;
        }
        return asHex.toUpperCase();
    };
    Color.prototype.concatHexCode = function (red, green, blue) {
        var fullHexCode = this.padAndCapitalizeHex(red) +
            this.padAndCapitalizeHex(green) +
            this.padAndCapitalizeHex(blue);
        return fullHexCode;
    };
    return Color;
}());
exports.Color = Color;


/***/ }),

/***/ 111:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Currency = void 0;
// @ts-ignore
var dinero_js_1 = __importDefault(__webpack_require__(711));
var Currency = /** @class */ (function () {
    function Currency(amount, location) {
        this.amount = amount;
        if (!location) {
            this.location = 'USD';
        }
        else {
            this.location = location;
        }
    }
    Currency.prototype.add = function (currency) {
        var resultDinero = this._toDinero(this).add(this._toDinero(currency));
        return new Currency(resultDinero.toUnit(), resultDinero.getCurrency());
    };
    Currency.prototype._toDinero = function (currency) {
        return (0, dinero_js_1.default)({
            amount: currency.amount * 100,
            currency: currency.location,
        });
    };
    Currency.prototype.toString = function () {
        var asDinero = this._toDinero(this);
        return asDinero.toFormat('$0,0.00');
    };
    Currency.fromString = function (string) {
        var noDollarSign = string.replace('$', '');
        var noCommas = noDollarSign.replace(',', '');
        var number = Number(noCommas);
        return new Currency(number, 'USD');
    };
    Currency.prototype.copy = function () {
        return new Currency(this.amount, this.location);
    };
    Currency.prototype.equals = function (currency) {
        var _this = this;
        var areAmountsEqual = function () {
            var areAmountsEqual = false;
            if (isNaN(_this.amount) && isNaN(currency.amount)) {
                areAmountsEqual = true;
            }
            else {
                areAmountsEqual = _this.amount === currency.amount;
            }
            return areAmountsEqual;
        };
        var locationEqual = this.location === this.location;
        return areAmountsEqual() && locationEqual;
    };
    return Currency;
}());
exports.Currency = Currency;


/***/ }),

/***/ 23:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionDetail = exports.STRING_TYPE = void 0;
var transaction_1 = __webpack_require__(312);
var currency_converter_1 = __webpack_require__(497);
var date_converter_1 = __webpack_require__(386);
var color_1 = __webpack_require__(265);
var category_1 = __webpack_require__(789);
var scepter_format_csv_importer_1 = __webpack_require__(906);
exports.STRING_TYPE = "String";
var TransactionDetail = /** @class */ (function () {
    function TransactionDetail(detail, columnName, type) {
        this.detail = detail;
        this.columnName = columnName;
        this.type = type;
        this.ensureConversionCanTakePlace();
    }
    TransactionDetail.prototype.ensureConversionCanTakePlace = function () {
        this.getElement();
        this.asGivenType();
    };
    TransactionDetail.withCurrency = function (currency, columnName) {
        var converter = new currency_converter_1.CurrencyConverter();
        var detail = new TransactionDetail(converter.toString(currency), columnName, transaction_1.AMOUNT_TYPE);
        return detail;
    };
    TransactionDetail.prototype.copy = function () {
        return new TransactionDetail(this.detail, this.columnName, this.type);
    };
    TransactionDetail.prototype.equals = function (transactionDetail) {
        return (this.detail === transactionDetail.detail &&
            this.type === transactionDetail.type);
    };
    // This was supposed to be the function that exports something as a string
    TransactionDetail.prototype.getElement = function () {
        var element = null;
        if (this.type === "Date") {
            var dateConverter = new date_converter_1.DateConverter();
            element = dateConverter.intoString(dateConverter.fromString(this.detail));
        }
        else if (this.type == "Color") {
            // @ts-ignore
            element = this.asGivenType().hex();
        }
        else if (this.type === category_1.CATEGORY_TYPE) {
            // @ts-ignore
            element = this.asGivenType().getName();
        }
        else if (this.type === "number") {
            element = this.detail;
        }
        else {
            element = this.detail;
        }
        return element;
    };
    TransactionDetail.prototype.getColumnName = function () {
        return this.columnName;
    };
    TransactionDetail.prototype.getType = function () {
        return this.type;
    };
    TransactionDetail.prototype.asGivenType = function () {
        var asGivenType = null;
        if (this.type === date_converter_1.DATE_TYPE) {
            var dateConverter = new date_converter_1.DateConverter();
            asGivenType = dateConverter.fromString(this.detail);
        }
        else if (this.type === exports.STRING_TYPE) {
            asGivenType = this.detail;
        }
        else if (this.type === category_1.CATEGORY_TYPE) {
            if (!this.detail) {
                asGivenType = scepter_format_csv_importer_1.CATEGORY_NOT_FOUND;
            }
            else {
                asGivenType = new category_1.Category(this.detail);
            }
        }
        else if (this.type === color_1.COLOR_TYPE) {
            if (this.detail) {
                asGivenType = new color_1.Color(this.detail);
            }
            else {
                asGivenType = scepter_format_csv_importer_1.COLOR_NOT_FOUND;
            }
        }
        else if (this.type === 'number') {
            asGivenType = parseInt(this.detail);
        }
        return asGivenType;
    };
    return TransactionDetail;
}());
exports.TransactionDetail = TransactionDetail;


/***/ }),

/***/ 312:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Transaction = exports.AMOUNT_TYPE = void 0;
exports.AMOUNT_TYPE = "Amount";
var Transaction = /** @class */ (function () {
    function Transaction(otherInfo) {
        this.details = otherInfo.slice();
        this.id = -1;
    }
    Transaction.prototype.getDetailByColumnIndex = function (columnIndex) {
        return this.details[columnIndex];
    };
    Transaction.prototype.isCategorized = function () {
        return this.id !== -1;
    };
    Transaction.prototype.copy = function () {
        var transaction = new Transaction(this.getDetails());
        transaction.id = this.id;
        return transaction;
    };
    Transaction.prototype.getNumDetails = function () {
        var details = this.getDetails();
        return details.length;
    };
    Transaction.prototype.getDetails = function () {
        var copied = [];
        for (var i = 0; i < this.details.length; i++) {
            copied.push(this.details[i].copy());
        }
        return copied;
    };
    Transaction.prototype.hasDetailWithColumnName = function (columnName) {
        var _this = this;
        var checkForColumn = function (columnToCheckFor) {
            var hasDetailWithColumnName = false;
            for (var i = 0; i < _this.details.length; i++) {
                if (_this.details[i].getColumnName() === columnToCheckFor) {
                    hasDetailWithColumnName = true;
                    break;
                }
            }
            return hasDetailWithColumnName;
        };
        return checkForColumn(columnName);
    };
    //   TODO This function is deprecated, remove at some point.
    Transaction.prototype.getDetailByName = function (name) {
        var _this = this;
        var raw = null;
        var assertOnlyOneMatchingColumnName = function () {
            var count = 0;
            for (var i = 0; i < _this.details.length; i++) {
                if (_this.details[i].getColumnName() === name) {
                    count = count + 1;
                }
            }
            var numAllowedColumns = 1;
            if (count > numAllowedColumns) {
                throw new Error("Tried to call getDetailByName when there was more than one element ");
            }
        };
        assertOnlyOneMatchingColumnName();
        for (var i = 0; i < this.details.length; i++) {
            if (this.details[i].getColumnName() === name) {
                raw = this.details[i];
                break;
            }
        }
        return raw;
    };
    Transaction.prototype.getDetailsByColumnName = function (columnName) {
        var details = [];
        for (var i = 0; i < this.details.length; i++) {
            if (this.details[i].getColumnName() === columnName) {
                details.push(this.details[i].copy());
            }
        }
        return details;
    };
    Transaction.prototype.getElementByColumnName = function (columnName) {
        var element = null;
        for (var i = 0; i < this.details.length; i++) {
            var detail = this.details[i];
            if (detail.getColumnName() === columnName) {
                element = detail.getElement();
            }
        }
        return element;
    };
    Transaction.prototype.equals = function (transaction) {
        var areDetailsEquivalent = function (aDetails, bDetails) {
            if (aDetails.length !== bDetails.length) {
                return false;
            }
            var equivalent = true;
            for (var i = 0; i < aDetails.length; i++) {
                var foundMatch = false;
                for (var j = 0; j < bDetails.length; j++) {
                    var aDetail = aDetails[i];
                    var bDetail = bDetails[j];
                    if (aDetail.equals(bDetail)) {
                        foundMatch = true;
                        break;
                    }
                }
                if (!foundMatch) {
                    equivalent = false;
                    break;
                }
            }
            return equivalent;
        };
        var idsEquivalent = this.id === transaction.id;
        return (areDetailsEquivalent(this.details, transaction.details) && idsEquivalent);
    };
    return Transaction;
}());
exports.Transaction = Transaction;


/***/ }),

/***/ 196:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(885), exports);


/***/ }),

/***/ 885:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ViewContext = void 0;
var scepter_format_csv_importer_1 = __webpack_require__(906);
var ViewContext = /** @class */ (function () {
    function ViewContext() {
        this.categoryColors = new Array();
        this.categoryOrderings = new Array();
        this.categoryHasSpacerBefore = new Map();
        this.categoryHasSpacerAfter = new Map();
    }
    ViewContext.prototype.hasCategoryViewInfo = function (category) {
        var categories = this.getCategories();
        var hasCategory = false;
        for (var i = 0; i < categories.length; i++) {
            var inner = categories[i];
            if (inner.equals(category)) {
                hasCategory = true;
                break;
            }
        }
        return hasCategory;
    };
    ViewContext.prototype.getCategories = function () {
        var categories = [];
        for (var i = 0; i < this.categoryColors.length; i++) {
            var categoryWithColor = this.categoryColors[i];
            categories.push(categoryWithColor.category);
        }
        return categories;
    };
    ViewContext.prototype.getColorFor = function (category) {
        if (!category) {
            throw new Error("Cannot get a color without a category");
        }
        var foundColor = null;
        for (var i = 0; i < this.categoryColors.length; i++) {
            var categoryWithColor = this.categoryColors[i];
            if (categoryWithColor.hasCategory(category)) {
                foundColor = categoryWithColor.getColor();
                break;
            }
        }
        return foundColor;
    };
    ViewContext.prototype.getOrderFor = function (category) {
        if (!category) {
            throw new Error("Cannot get a sort ordering without a category");
        }
        var foundOrdering = null;
        for (var i = 0; i < this.categoryOrderings.length; i++) {
            var categoryWithOrdering = this.categoryOrderings[i];
            if (categoryWithOrdering.hasCategory(category)) {
                foundOrdering = categoryWithOrdering.getOrdering();
                break;
            }
        }
        return foundOrdering;
    };
    ViewContext.prototype.hasSpacerBefore = function (category) {
        if (!category || !this.categoryHasSpacerBefore.has(category.getName())) {
            return false;
        }
        return this.categoryHasSpacerBefore.get(category.getName());
    };
    ViewContext.prototype.hasSpacerAfter = function (category) {
        if (!category || !this.categoryHasSpacerAfter.has(category.getName())) {
            return false;
        }
        return this.categoryHasSpacerAfter.get(category.getName());
    };
    ViewContext.Builder = /** @class */ (function () {
        function class_1() {
            this.building = new ViewContext();
        }
        class_1.prototype.setCategoryColor = function (category, color) {
            if (!category) {
                throw new Error("Cannot set a category color with a null category");
            }
            if (!color) {
                throw new Error("Cannot set a category color with a null color");
            }
            var alreadySetColor = this.building.getColorFor(category);
            var categoryWithColor = null;
            if (alreadySetColor && !(alreadySetColor === null || alreadySetColor === void 0 ? void 0 : alreadySetColor.equals(color))) {
                this.removeCategoryColor(category);
                categoryWithColor = new CategoryColorDuo(category.copy(), scepter_format_csv_importer_1.COLOR_NOT_FOUND.copy());
                this.building.categoryColors.push(categoryWithColor);
            }
            else if (!alreadySetColor) {
                categoryWithColor = new CategoryColorDuo(category.copy(), color.copy());
                this.building.categoryColors.push(categoryWithColor);
            }
        };
        class_1.prototype.removeCategoryColor = function (category) {
            this.building.categoryColors = this.building.categoryColors.filter(function (inner) {
                return !category.equals(inner.category);
            });
        };
        class_1.prototype.setCategoryOrdering = function (category, ordering) {
            if (!category) {
                throw new Error("Cannot set a sort ordering without a category");
            }
            if (ordering === undefined || ordering === null) {
                throw new Error("Cannot set a sort ordering without an ordering");
            }
            if (ordering < 1) {
                throw new Error("Cannot set a sort ordering that is not positive, tried to set [" +
                    category.getName() +
                    "] to [" +
                    ordering +
                    "]");
            }
            var alreadySetOrdering = this.building.getOrderFor(category);
            var categoryWithOrdering = null;
            if (alreadySetOrdering && alreadySetOrdering !== ordering) {
                this.removeCategoryOrdering(category);
                categoryWithOrdering = new CategoryOrderingDuo(category.copy(), 1);
                this.building.categoryOrderings.push(categoryWithOrdering);
            }
            else if (!alreadySetOrdering) {
                categoryWithOrdering = new CategoryOrderingDuo(category.copy(), ordering);
                this.building.categoryOrderings.push(categoryWithOrdering);
            }
        };
        class_1.prototype.removeCategoryOrdering = function (category) {
            this.building.categoryOrderings = this.building.categoryOrderings.filter(function (inner) {
                return !category.equals(inner.category);
            });
        };
        class_1.prototype.setHasSpacerBefore = function (category, hasSpacerBefore) {
            this.building.categoryHasSpacerBefore.set(category.getName(), hasSpacerBefore);
        };
        class_1.prototype.setHasSpacerAfter = function (category, hasSpacerAfter) {
            this.building.categoryHasSpacerAfter.set(category.getName(), hasSpacerAfter);
        };
        class_1.prototype.build = function () {
            for (var i = 0; i < this.building.categoryOrderings.length; i++) {
                var categoryWithOrdering = this.building.categoryOrderings[i];
                var category = categoryWithOrdering.category;
                var color = this.building.getColorFor(category);
                if (!color) {
                    this.setCategoryColor(category, scepter_format_csv_importer_1.COLOR_NOT_FOUND.copy());
                }
            }
            for (var i = 0; i < this.building.categoryColors.length; i++) {
                var categoryWithColor = this.building.categoryColors[i];
                var category = categoryWithColor.category;
                var ordering = this.building.getOrderFor(category);
                if (!ordering) {
                    this.setCategoryOrdering(category, 1);
                }
            }
            return this.building;
        };
        return class_1;
    }());
    return ViewContext;
}());
exports.ViewContext = ViewContext;
var CategoryColorDuo = /** @class */ (function () {
    function CategoryColorDuo(category, color) {
        this.category = category.copy();
        this.color = color.copy();
    }
    CategoryColorDuo.prototype.hasCategory = function (category) {
        return category.equals(this.category);
    };
    CategoryColorDuo.prototype.getColor = function () {
        return this.color.copy();
    };
    return CategoryColorDuo;
}());
var CategoryOrderingDuo = /** @class */ (function () {
    function CategoryOrderingDuo(category, ordering) {
        this.category = category.copy();
        this.ordering = ordering;
    }
    CategoryOrderingDuo.prototype.hasCategory = function (category) {
        return category.equals(this.category);
    };
    CategoryOrderingDuo.prototype.getOrdering = function () {
        return this.ordering;
    };
    return CategoryOrderingDuo;
}());


/***/ }),

/***/ 906:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScepterFormatCsvImporter = exports.ORDERING_NOT_FOUND = exports.COLOR_NOT_FOUND = exports.CATEGORY_NOT_FOUND = void 0;
var by_column_name_csv_converter_1 = __webpack_require__(492);
var columns_1 = __webpack_require__(826);
var with_view_context_exporter_1 = __webpack_require__(469);
var master_bank_config_1 = __webpack_require__(502);
var master_bank_config_parser_1 = __webpack_require__(373);
var category_1 = __webpack_require__(789);
var color_1 = __webpack_require__(265);
var transaction_1 = __webpack_require__(312);
var view_context_1 = __webpack_require__(885);
var scepter_format_importer_1 = __webpack_require__(634);
exports.CATEGORY_NOT_FOUND = new category_1.Category("_______CATEGORY NOT FOUND_______");
exports.COLOR_NOT_FOUND = new color_1.Color("#96E3F3");
exports.ORDERING_NOT_FOUND = 1;
var ScepterFormatCsvImporter = /** @class */ (function () {
    function ScepterFormatCsvImporter() {
        this.columns = new columns_1.Columns({});
    }
    ScepterFormatCsvImporter.prototype.defineIncomingFormat = function (columns) {
        // TODO it feels like this should have a check to ensure that
        // the column structure that we have is in line with scepter format
        // looks like.
        this.columns = columns.copy();
    };
    ScepterFormatCsvImporter.prototype.necessaryColumnHeaders = function () {
        var masterMappingInfo = new master_bank_config_parser_1.MasterBankConfigParser(master_bank_config_1.MasterBankConfig);
        var csvImporter = new by_column_name_csv_converter_1.ByColumnNameCsvImporter(
        // @ts-ignore
        masterMappingInfo.getConfigFor("Scepter"));
        csvImporter.defineIncomingFormat(this.columns);
        var headers = csvImporter.necessaryColumnHeaders();
        return headers;
    };
    ScepterFormatCsvImporter.prototype.convert = function (item) {
        var masterMappingInfo = new master_bank_config_parser_1.MasterBankConfigParser(master_bank_config_1.MasterBankConfig);
        var csvImporter = new by_column_name_csv_converter_1.ByColumnNameCsvImporter(
        // @ts-ignore
        masterMappingInfo.getConfigFor("Scepter"));
        csvImporter.defineIncomingFormat(this.columns);
        var transactionWithCategory = csvImporter.convert(item);
        var category = this.getCategoryFromDetail(transactionWithCategory);
        var viewConextBuilder = new view_context_1.ViewContext.Builder();
        viewConextBuilder.setCategoryColor(category, this.getColorFromDetail(transactionWithCategory));
        viewConextBuilder.setCategoryOrdering(category, this.getOrderingFromDetail(transactionWithCategory));
        var spacer = this.getSpacerFromDetail(transactionWithCategory);
        var splits = spacer.split("/");
        var beforeCategorySpacer = splits[0] === "true";
        var afterCategorySpacer = splits[1] === "true";
        viewConextBuilder.setHasSpacerBefore(category, beforeCategorySpacer);
        viewConextBuilder.setHasSpacerAfter(category, afterCategorySpacer);
        return new scepter_format_importer_1.ScepterFormattedLine(new transaction_1.Transaction(this.getNonCategoryDetails(transactionWithCategory)), category, viewConextBuilder.build());
    };
    ScepterFormatCsvImporter.prototype.getNonCategoryDetails = function (transaction) {
        var detailsForConversion = [];
        var details = transaction.getDetails();
        for (var i = 0; i < details.length; i++) {
            var detail = details[i];
            if (detail.getColumnName() !== scepter_format_importer_1.SCEPTER_CATEGORY_COLUMN_NAME &&
                detail.getColumnName() !== with_view_context_exporter_1.SCEPTER_CATEGORY_COLOR_COLUMN_NAME &&
                detail.getColumnName() !== with_view_context_exporter_1.SCEPTER_CATEGORY_ORDERING_COLUMN_NAME &&
                detail.getColumnName() !== with_view_context_exporter_1.SCEPTER_CATEGORY_SPACER_COLUMN_NAME) {
                detailsForConversion.push(detail);
            }
        }
        return detailsForConversion;
    };
    ScepterFormatCsvImporter.prototype.getCategoryFromDetail = function (transaction) {
        var details = transaction.getDetails();
        var category = exports.CATEGORY_NOT_FOUND;
        for (var i = 0; i < details.length; i++) {
            var detail = details[i];
            if (detail.getColumnName() === scepter_format_importer_1.SCEPTER_CATEGORY_COLUMN_NAME) {
                // @ts-ignore
                category = detail.asGivenType();
            }
        }
        return category;
    };
    ScepterFormatCsvImporter.prototype.getColorFromDetail = function (transaction) {
        var details = transaction.getDetails();
        var color = exports.COLOR_NOT_FOUND;
        for (var i = 0; i < details.length; i++) {
            var detail = details[i];
            if (detail.getColumnName() === with_view_context_exporter_1.SCEPTER_CATEGORY_COLOR_COLUMN_NAME) {
                // @ts-ignore
                color = detail.asGivenType();
            }
        }
        return color;
    };
    ScepterFormatCsvImporter.prototype.getOrderingFromDetail = function (transaction) {
        var details = transaction.getDetails();
        var ordering = exports.ORDERING_NOT_FOUND;
        for (var i = 0; i < details.length; i++) {
            var detail = details[i];
            if (detail.getColumnName() === with_view_context_exporter_1.SCEPTER_CATEGORY_ORDERING_COLUMN_NAME) {
                // @ts-ignore
                ordering = detail.asGivenType();
                if (isNaN(ordering)) {
                    ordering = 1;
                }
            }
        }
        return ordering;
    };
    ScepterFormatCsvImporter.prototype.getSpacerFromDetail = function (transaction) {
        var details = transaction.getDetails();
        var spacer = "FALSE/FALSE";
        for (var i = 0; i < details.length; i++) {
            var detail = details[i];
            if (detail.getColumnName() === with_view_context_exporter_1.SCEPTER_CATEGORY_SPACER_COLUMN_NAME) {
                // @ts-ignore
                spacer = detail.asGivenType();
                if (!spacer) {
                    spacer = "FALSE/FALSE";
                }
            }
        }
        return spacer;
    };
    return ScepterFormatCsvImporter;
}());
exports.ScepterFormatCsvImporter = ScepterFormatCsvImporter;


/***/ }),

/***/ 634:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScepterFormattedLine = exports.SCEPTER_CATEGORY_COLUMN_NAME = void 0;
exports.SCEPTER_CATEGORY_COLUMN_NAME = "Category";
var ScepterFormattedLine = /** @class */ (function () {
    function ScepterFormattedLine(transaction, category, viewContext) {
        this.transaction = transaction.copy();
        this.category = category.copy();
        this.viewContext = viewContext;
    }
    ScepterFormattedLine.prototype.getTransaction = function () {
        return this.transaction.copy();
    };
    ScepterFormattedLine.prototype.getCategory = function () {
        return this.category.copy();
    };
    ScepterFormattedLine.prototype.getViewContext = function () {
        return this.viewContext;
    };
    return ScepterFormattedLine;
}());
exports.ScepterFormattedLine = ScepterFormattedLine;


/***/ }),

/***/ 497:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrencyConverter = void 0;
var currency_1 = __webpack_require__(111);
var CurrencyConverter = /** @class */ (function () {
    function CurrencyConverter() {
    }
    CurrencyConverter.prototype.toString = function (currency) {
        return currency.toString();
    };
    CurrencyConverter.prototype.fromString = function (string) {
        return currency_1.Currency.fromString(string);
    };
    return CurrencyConverter;
}());
exports.CurrencyConverter = CurrencyConverter;


/***/ }),

/***/ 386:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateConverter = exports.DATE_TYPE = void 0;
var luxon_1 = __webpack_require__(490);
exports.DATE_TYPE = "Date";
var DateConverter = /** @class */ (function () {
    function DateConverter() {
    }
    DateConverter.prototype.fromString = function (input) {
        if (!input || input.trim().length === 0) {
            return new Date(1970, 0, 1, 0, 0, 0, 0);
        }
        var jsDate = null;
        if (this.isIsoTimeFormat(input)) {
            var dt = luxon_1.DateTime.fromISO(input);
            jsDate = dt.toJSDate();
        }
        else {
            var properFormat = input.split("/").join("-");
            var dt = luxon_1.DateTime.fromFormat(properFormat, "M-d-y H:m:s");
            if (!dt.isValid) {
                var longerDt = luxon_1.DateTime.fromFormat(properFormat, "M-d-y tt");
                if (!longerDt.isValid) {
                    var shorterDt = luxon_1.DateTime.fromFormat(properFormat, "M-d-y");
                    if (!shorterDt.isValid) {
                        throw new Error("Could not convert [" + input + "] into a date");
                    }
                    else {
                        jsDate = shorterDt.toJSDate();
                    }
                }
                else {
                    jsDate = longerDt.toJSDate();
                }
            }
            else {
                jsDate = dt.toJSDate();
            }
        }
        return jsDate;
    };
    DateConverter.prototype.isIsoTimeFormat = function (input) {
        var dt = luxon_1.DateTime.fromISO(input);
        return dt.isValid;
    };
    DateConverter.prototype.intoString = function (date) {
        var luxonDatetime = luxon_1.DateTime.fromJSDate(date);
        var paddedMonth = this.padToTwo("" + luxonDatetime.month);
        var paddedDay = this.padToTwo("" + luxonDatetime.day);
        var year = luxonDatetime.year;
        var paddedHours = this.padToTwo("" + luxonDatetime.hour);
        var paddedMinutes = this.padToTwo("" + luxonDatetime.minute);
        var paddedSeconds = this.padToTwo("" + luxonDatetime.second);
        return (paddedMonth +
            "/" +
            paddedDay +
            "/" +
            year +
            " " +
            paddedHours +
            ":" +
            paddedMinutes +
            ":" +
            paddedSeconds);
    };
    DateConverter.prototype.padToTwo = function (input) {
        if (input.length == 1) {
            input = "0" + input;
        }
        return input;
    };
    return DateConverter;
}());
exports.DateConverter = DateConverter;


/***/ }),

/***/ 68:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,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");

/***/ }),

/***/ 462:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,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");

/***/ }),

/***/ 977:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,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");

/***/ }),

/***/ 943:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,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");

/***/ }),

/***/ 872:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,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");

/***/ }),

/***/ 600:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAgKADAAQAAAABAAAAgAAAAABIjgR3AAAUDElEQVR4Ae1daWwdVxU+M2+x/RzbSZx4SylEXVKWQtOCBEJikUCAQAL1BwIhIcQi8ROEkECIH4CAIhYJhBAg+AMVQggkBAJRIQqUBjVtQBGlQLPWceM0m+3Ejv3WGb7v3Dd+fo79lpl5b8aZucl7b+bO3HvPPec755672rK+7rqShsRywE5szdOKKwdSACQcCCkAUgAknAMJr35qAVIAJJwDCa9+agFSACScAwmvfmoBUgAknAMJr35qAVIAJJwDCa9+agFSACScAwmvfmoBUgAknAMJr35qAVIAJJwDCa9+agFSACScAwmvfmoBUgAknAMJr35qAVIAJJwDoVffFUscfLjdgtfmI5aJ4zMGfY64qENqAXogAdcy4mfWrsVvR7j9huJ2HDxzagqS+kO+EFnIRlbyLVqwyhvSpr6r1Kv8gfRtR8YHynLnbkdmV/Ny8UZWLMtV+xAlK3YkANb3snkX/F3/4IIMpyQytlh9sHEsWsuHiquwcTOUq8htoxW5Z68lD0y5cngqJ4f2DcjBUUt++t+KfOy3QEY2x5SRhr4DgG2gK55U2D6Sd6o364yg/NaDU79hpEMjil/bgmwdGcxZMpYty1jelfFCRvYWRCaHLZkZLsn0cEZ+8T9bHp0riJVZz639BUixUBZNt/kFiHgPGtfJIi18gbS5VbHBxamhqty1R+SVk468ZsqSeyfy8qLdtoznNwvZlfcdyssPjq3KUxfzfQFoq0r3HQCObRhqu47UarYqq7g1MJKCBZvxGQZVo7myjECwe4eyEK4lU8O2TO4qy+SQI1MjgxC0yN5BS3YP5WVX3kIaW/Joe43qD+jv/I01eXQW+WYY31mwQJcNkFbFoEZljTipUeCgE/SNDTpycMyRe/dZcv9kTQ5P5+WOvVnQZEtOwUyAo9ybAuNYP0s+dF9Onvo98+u7CJqo6nvptjpAEBP4+cbbi3IHTOLEiCPThSoEPCAT0OA9gxnZMzQoo3mRAgQ7AI03gkXEOmMZR4vAwOs6wykx3uJ+clc3qs80yBFthgvttpGPU4OVydCUV+XQuCWHIewHJjNyz/6s3D6SBW3MXwvTtAQxfDxYDDp5fORZOvOY3/QNUIK8566MPDRWkbkV+AI3v9ZI0OOrvgMAkEf1ISQA4ctvysjroT0mGO1o1JcsrAtVIzXV+mNjlI1Z5ptkqwZ1rIxYpncBIFYVuRi9XE/c4kJzRIb01D/9uoq8/1BObh/Ly/ggWUV6WA6B59HHJo3XiMePSZ/RNxnbHCzzHJEzhay87eCa/Og48lSAN7/Zr7sIsGfYUoMPdOJKZb2epo0lOeZDP8FVM9wgkewz/8xbdbYjrhEUMmxSEDs9XJOBTBUaSSDUhdN4dcsrtvfAEFol01QdnszVhc/XvZJIk1d6Bld4V2NInXfN97cKeFOJFHnnHUhrgxGEkAWaIxgXaHB3K1p7EGf02DDv5CJ/TTAM9O4Me9s/9VI13tQc1Ka6MlHISWEgT/aCx80WpFFS8xWbAAb6Ir98NidXSwAPAEWdX5ecXvv7UkrrZRw+MCjjw7BQLILAN4MG/jL2marvADB00uxl5NnF8Is3UGC+6BnAgRylPwjGNhqL1pzyegBuJivPLTryj/ki0EAtZzDfrXNo97QBxAMFV+5Bz4G9G4I0jNzblb75efgS2FzCFvemG+jI3GJF1rxu3hbv+YvyhC0yhN7BZAECpPbT6+yAwwQKP+ylOE5OHjtn7DXjTB/fH1WNVA36srAEL5swRHUK0EY+4Vz1HQCmurQAllxYceRqke01Q71hNDcBv1mKJTkIfWaorHlRoOoLtMlZfQ81xcgDVurJC/DskZbx2stsk76zx4YLpPGu3fCDoATsdUQR+g4AaqKiHTy4VCrI5WVjro16hskEY1KnRweVwSpYlNxZIIV4F/9PL2XlGjBkUnaavrNS+NaLx0AfBrXoY4RZ+04p6DsAGrW0pFzLypmlktLKyjdax07Jb//ebaPsq0OD/cgOaa4UbXnhBq0UqfOTSWsaJ4ZoDL28+w+B/gOgzkh28qRakROL7AaRsdSB8Bk8M4Js/dYS5KyWqnLhBmlE6IGZHsEwSA6DXSG2L4bWDr/9sqbD7Ld6jUL2TGxOTiyY0T1LPfWt3g8WN7OrhtEEtLPAmx8rUJOsXFkz42WcvdOMgpHUlDqHCSuMDNfBFb4CNBW2xU0EANhABRzBWViAKvnao7rvxyTREDjspwgjl4ysFL3UjAmXUBs8wPRIHVcsp78hWgCAl3PLriyVPfMfLnPJSgJgZKDOWD8m3LVlbb0FCJ8+di21exl+1h0hKXIAXFrLyRV0B40KUFDhagGG8TG5BO5qtj64DAFVQh+raMimWq1JVfOHlQqvn9kooM1V5ABYrthyFlagIXgfQmpRyULOxgwjVJhrCbrOGnSh3bdUMPxtUZDPR8sgrYx5B9IWxVhApAAgPzlvc2aBgzW9IYWdwOlhCNIb3OlKUKTQwuoe0tYD6SPXK6sYaKIBROhFN9PkvP13b7i+fXlbPLHk2YVekmHp3L02AV36ANpqYLZufEivtqA9eNT5ZY4E0tD0roxWVPaS863KbTzDcOvZxcZt+FeuzIx61eyeyQNYTzCBaeVeheeugzadbOqetjBo8jgTRl7+8kDDOnutJsu1XjEZ8wEcDNKFIV1WFzIZgQN52y5v3UwwITG1Ge00I4u8O7WApgWTQsb8B8vfjwC65IifItqkgZM1v4rBlhteT6DN+z4eT2JlUA7z+10HJJnG2sMJdCWxKBCfYH6AGf4iBLhiyJLlqiNnFpHvuhSC5d91/ZBgvWg/iUNJAwuwWMrqeAAZ7ENMbcjgwpCsLjDtOnNg8tCeqq5LJKuC08b6keUUf01eWBGZXUE/lUZAaxG8hDbMuOlx9AAASQ404bTOCdxEXwgRXBhiYTDIR1aYBj48jUWbEBjtk7ety0dOG5J4vr4lz1wqyfUirAsngxQECQSA0fmMnFJH0GPOBn4FvrRkF7px+7BnoDMVNtpJUWSwnvA10ySAZpsxwUy0ES+/zdXRecAKy4h14hoIMNaB5fUvRG8BOLoCJ+jsAisdjMFbs83SZeWTBYw1tB3RM8LRxah4dwpL1l81YRxAG0PC4cCTdcRUOIp64jyudSJga8r7ERs9AKgNoOLMNVdW2wrIH0uoYbfrHgGjedvlYkRjdF1qrrx6f1EdQG4VoX4GbQI0fzQrDOeWHXn6Csx/xBKIuHhwggyBBbiA4eCFUmsBKee6/jJ5HhhDVevM3y4LvumCFrOq35W3HKT2U2xcUGIWbm6XttN4M95vydG5klxdZfvfacrevBc9AKgCcIIuFQfkks4JhFtRI35XpkfYlatr97ZFGBtAQzQyWJE3vJhpzEp/7EbEVXBpmTxc+eNZA/zgOW5bmY4exAAAhulFjIjOLuEr9GBYPI3tZ7bdfrCJ27poKO6frGJnLwHAEKaYLLm4VpO/zCHvjJe/KSWK7xgAAOyFBWA/6ATW4YcdTC8Du4Sw9m4oa+xBqzLUE3eq8q47udk0bPawfFceP1+T2evYGcx6RxzCrqHP6oARYPbpHkwKGRa7sm84J8N5VLcFzwkWunq7B6vyjju94V+fVWqR7Nf/4/Q0XwjTsrQosMWjGAAApplCQXfoDCwADDBujCVoIasWVWp+5LXbYwPcdYwc22WKQanX38YdO9m2rzaXtN3dxgItmcMK4z/P4l3dWbzx2XbpexsfOQDodatrBnPIrtFyxay/MqzhdxhMwpw+1gVOFMzi0O1Yavr5NXnvS+HygS7TfGz3dqfx1HLWwYD6kVNlOb8c/cEQHvWRA8A0g8YUXigO6tk5nmkMx0ASXtggjoJmChBCi3l3On8Hd5fk7XfwVA+mCos9AAB8nDLK/vl/cG1ldetZOADzROnvN6wa+isdqVQ/qG24WClb8vwSVwfRcFNj+DQYDKh7/DCfmTFMCJgbjbnpCwdCvPtuzP4NGe88tEUaZqBfjl+syJF5nFWA7B1UOIo1gJvrHDkAVB76BUFXLTm5YHYK6SlbdbO5mehu7z1NexHXBWxGACyDq2bIwVEzZfnAy432G4PdbUlbvc/8DYgffrokxTLzxz2GlmkVog6RA6CZATa6gmQQxU/mBGeQycXkM42xfcFBDBuNAGXPpy42J7z5JVUcAwPvH4Kx8QlDPizLwolDs1jv8KsT7PsbWhAdixAvAEBTTi3xiCYyjW2wiiYwo4zALTkAJzCLjZgbA00xzy3KYMXQh1+VxXifjfOgiAqeLBJMWKZclpaRX/6nLPPXYf7jxfHQvJyNPPV/DeY8v1jE8jCyLvjkS4MQk99EIY8zA6jhjSd6WpmTkVdP1eStB7lNDT1Sar+LbmDAI1sIYn6WKq785F/o3eDQibiFeOERCjePjSKLWCptpsmogcG0kOk5ms/f/TgyxiwMaYBL22ec9feR+3DUnJpnvA+rwGbbpAsgMgWaJb85sSZPX45P129jjWIHgKtYHsaZQaqp+d5IbrDrAgaD9m8cC4CQ2fV7xb6iPPhSLhlqbh6ClYbUQNEqrNkP/4G62DypTBERONswM4gVAKjr1aoNP8AMBvGen2ChwfQBDDnODK5B6htyxhb1j96XwYmeFH/47PjD6ZI8cQGZw/8Lb1whGEc2pg6/xhtz93ONwZKTC8YNNPrYEKCf7Mh2L7AxmOaGfJSh/6Cdd4/jLMBXsO3H08arXpJAv2XMK3/3WBnD21hXiG5f0AUlgYjZJnH8AIBRklOLdJZMHyC4DWiu4gGeGML9aGzkcVjhx+/HqmEcAhnmDl2zhNSVP5wuyl/1rGJDg1ejbWQRSXQzdyIhYVOh2C9/DqeHVaClwc3/prxxO6NHxmAsAGf/3r2/Jh+8F/PEtBIoLGi3z5Rm6F6DdfnGkzj7B70JzV8f9qJGplS/3/EDACQxt2Lh9DDa4/AZdmAX/AvWulaRTz7AM/z1RoVvRgT9stKkM62ILb87WZIjz8Pz1+M/wq9HMCobqeMHAFB0uZiTi3pmQIPQsK6mcPJ4Bu7e/VNltP1ms4CD9pmHPDc01X9p9PRXsOf/60dxuqhqv/+8+pEydgAgA9cqlpzFfsFehHEsDNmdq8onXpuVMfy9AVoZG8NzdNF89fubHEdjtX7276I8+cJAXft7UYvw8owdANTsw3s+vdAbAIxk8Acb7qnIg3djzqFJeD6Z2mTdud7PkW8+hUjd8RvyuIJPElslix0AlJ+YL39WewKtSPf3jEfGfP6Noxj1czHmH1714bNq+P4/SzgFPa/7PbxZQH+U9idVeBwIiV7tK6OL9hz2CjbP24VTQA5LsfiXPTjoE8Z2T8+McIEnB7C+909AGGWwLxDaeoJwqr5lLrEDgI7GgYfnrrs4ojV8E8qWnt0A0+arvdmSMZ1GquLXB5a+9veiXFoZ1LkENmVxHPnbXK/YAUA1CmMBF3FmwFU9M2AzyfG6VwAAR3+eq8jPnsEgk3b74kVjK2piCABD7vVKRmZ7sFOoFTO6fwYdh/avYinZl/5Wxt5GeP7BjUr3ZARIEUsA0Hg6WKFzepHrA+MWNnUdIPGH/12Wv5zDoE/MVvt0wrnYAUAVSNUo05ONIp0wpdU76pWwzVe334WVqslXjyAW0707McQOAGaeDqyEV32yp6eH+RMXvXvSSPoYvvL3kjx3DWf+49DncHoV/ujymyp2AKD3rN0nHh93zUG7Gn5PwC+z6KBmuHmUy9iRyZ9my/Lwv7CKEI4fu69cX7jTQjwBoBom2CRiywLWb8QnQPt12NiR6xVHPvfXKgDKbh+twc7o92/mZQwBQD0DWdCmy6UhuXC9bgHQ5vKIhqiDq6eYWPKdYyU5eh7CR8/P0eU+O6Pfv5l/sQQAiaQxrUHLzizhr37VQ+QGFiDk+f7HLlfkW0dBTTZ+q3w9XnX6G1sAaAWwdu+/i1CxuuZTxyINkDnPMfr8o1VZXIP2d3DgRKT0dlB4vAGApuA0j1KNWvDKSNPO//j4qjxyFmv88DcJdXtXB0yO8yvxBgCom8XyMB6ppm0CfYM+B/od3jGRz+BY+4f+hpgslnhzPfktEPrP0W6YBiV7HsvDrunpYdr77rstoP1hJ68E0//ZR9dkvjii/X06qny200PsAXBxLY8/2+a1/b1ZKNpKiDrghxd+fPyG/PZUAX9MlEBkd5Di3/lWIPYA4B9sOqenh5HUfjMceg45H8efuf/C4/xT72aen4CxOSDE7t8OD7EGAHWMy7dP8Uh1BF9r9jRl51/a0KB9J9R4zeXdn/lTSS6tcriXFJnPrSB8ciXWACCB3FN1Sk8PW/cETXQPvlmCfnRkrwZRW/LtY2vyyBku8OxBgTHIMv4AwOlhJ5c40u6Jp3dco25zfp8je2TMkfmSPHQEph9ev7qCt4jnv5GD8QcAtJHnBl3DqGA/fADuG+W+gavoeXzqj1WUi70D6vCxQYg/uzYKt5Pr+Bs28Pzi6oAsFR3Zk6PT1VtHkFaADcEXH1+To/MY7dO9A4wzT3h1K4XYA4BsX6zm5UO/K8t4rgLxUwt7IwyTK6egbXmMK3wUcLeSuG+uyw4AAEwvmoHHZuGF667e3gHAsIcWBmWgv1+3/Ddz7RaKiT0AjLZjPx8Od3J0I0dvtL8hU+ZPhxMlwyGsX+n9rfgVewDo2B+k0L/VNg2A9X/csf8Qoz1NQ4I5kAIgwcJn1VMApABIOAcSXv3UAqQASDgHEl791AKkAEg4BxJe/dQCpABIOAcSXv3UAqQASDgHEl791AKkAEg4BxJe/dQCpABIOAcSXv3UAqQASDgHEl791AKkAEg4BxJe/dQCpABIOAcSXv3UAiQcAP8HdCQEpmrolwAAAAAASUVORK5CYII=");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(607);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});