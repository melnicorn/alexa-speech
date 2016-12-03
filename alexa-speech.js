'use strict';

/**
 * @class
 */
function Speech() {
    this.parts = [];
}

/**
 * Renders the speech stack.
 * @returns {string} - The rendered speech (<speak>response</speak>).
 */
Speech.prototype.render = function() {
    var output = '<speak>';

    for (var i = 0; i < this.parts.length; i++) {
        output += this.parts[i];
    }

    output += '</speak>';
    return output;
}

/**
 * Adds text to the speech stack.
 * @param {string} text - The text to add.
 * @returns {object} - The Speech object so it can be chained.
 */
Speech.prototype.add = function(text) {
    this.parts.push(text);
    return this;
}

/**
 * Adds text to the speech stack. Alias of "add".
 * @param {string} text - The text to say.
 * @returns {object} - The Speech object so it can be chained.
 */
Speech.prototype.say = function(text) {
    return this.add(text);
}

/**
 * Adds a pause to the speech stack.
 * @param {string|number} length - The length of the pause in seconds.
 * @returns {object} - The Speech object so it can be chained.
 */
Speech.prototype.pause = function(length) {
    // TODO support sec and ms
    this.parts.push('<break time="' + length + 's"/>');
    return this;
}

/**
 * Adds spelled-out text to the speech stack.
 * @param {string} text - The text to spell out.
 * @returns {object} - The Speech object so it can be chained.
 */
Speech.prototype.spell = function(text) {
    this.parts.push(SSML_INTERPRET_AS_SPELL_OUT + text + SSML_SAY_AS_CLOSE);
    return this;
}

/**
 * Adds a number (and optional unit) to the speech stack.
 * @param {string} number - The text to add.
 * @param {string} [singularUnit] - The singular unit.
 * @param {string} [pluralUnit] - The plural unit.
 * @returns {object} - The Speech object so it can be chained.
 */
Speech.prototype.cardinal = function(number, singularUnit, pluralUnit) {
    if (singularUnit && pluralUnit) {
        if (Number(number) === 1) {
            this.parts.push(SSML_INTERPRET_AS_CARDINAL + number + SSML_SAY_AS_CLOSE + ' ' + singularUnit);
        } else {
            this.parts.push(SSML_INTERPRET_AS_CARDINAL + number + SSML_SAY_AS_CLOSE + ' ' + pluralUnit);
        }
    } else {
        this.parts.push(SSML_INTERPRET_AS_CARDINAL + number + SSML_SAY_AS_CLOSE);
    }
    return this;
}

/**
 * Adds a number (and optional unit) to the speech stack. Alias of cardinal.
 * @param {string} number - The text to add.
 * @param {string} [singularUnit] - The singular unit.
 * @param {string} [pluralUnit] - The plural unit.
 * @returns {object} - The Speech object so it can be chained.
 */
Speech.prototype.number = function(number, singularUnit, pluralUnit) {
    return this.cardinal(number, singularUnit, pluralUnit);
}

/**
 * Adds an ordinal to the speech stack.
 * @param {string|number} number - The ordinal.
 * @returns {object} - The Speech object so it can be chained.
 */
Speech.prototype.ordinal = function(number) {
    this.parts.push(SSML_INTERPRET_AS_ORDINAL + number + SSML_SAY_AS_CLOSE);
    return this;
}

/**
 * Adds digits to the speech stack.
 * @param {string|number} number - The digits.
 * @returns {object} - The Speech object so it can be chained.
 */
Speech.prototype.digits = function(number) {
    this.parts.push(SSML_INTERPRET_AS_DIGITS + number + SSML_SAY_AS_CLOSE);
    return this;
}

/**
 * Approximates numbers to the nearest thousand, million, billion, or trillion and adds them to the stack.
 * @param {string|number} number - The digits.
 * @param {string} [unit] - The unit.
 * @returns {object} - The Speech object so it can be chained.
 */
Speech.prototype.approximateFactor = function(number, unit) {
    var map = [1000000000000, 'trillion',
        1000000000, 'billion',
        1000000, 'million',
        1000, 'thousand'
    ];

    var approx;
    var label;
    for (var i = 0; i < map.length; i += 2) {
        if (number > map[i]) {
            approx = (number / map[i]).toFixed(1);
            label = map[i + 1];
            break;
        }
    }

    var speech = SSML_INTERPRET_AS_ORDINAL;
    if (approx && label) {
        speech += approx + SSML_SAY_AS_CLOSE + ' ' + label;
    } else {
        speech += number + SSML_SAY_AS_CLOSE;
    }

    if (unit) {
        speech += (' ' + unit);
    }

    this.parts.push(speech);

    return this;
}

/**
 * Adds a fraction to the speech stack.
 * @param {string|number} number - The fraction.
 * @returns {object} - The Speech object so it can be chained.
 */
Speech.prototype.fraction = function(number) {
    this.parts.push(SSML_INTERPRET_AS_FRACTION + number + SSML_SAY_AS_CLOSE);
    return this;
}

/**
 * Adds a percent to the speech stack.
 * @param {string|number} number - The percent.
 * @param {number} precision - The percent's precision.
 * @returns {object} - The Speech object so it can be chained.
 */
Speech.prototype.percent = function(number, precision) {
    var number = precision === undefined ? number : Number(number).toFixed(precision);
    this.parts.push(SSML_INTERPRET_AS_ORDINAL + number + SSML_SAY_AS_CLOSE + ' percent');
    return this;
}

/**
 * Adds a phone number to the speech stack.
 * @param {string|number} number - The phone number.
 * @returns {object} - The Speech object so it can be chained.
 */
Speech.prototype.telephone = function(number) {
    this.parts.push(SSML_INTERPRET_AS_TELEPHONE + number + SSML_SAY_AS_CLOSE);
    return this;
}

/**
 * Adds an address to the speech stack.
 * @param {string} address - The address.
 * @returns {object} - The Speech object so it can be chained.
 */
Speech.prototype.address = function(address) {
    this.parts.push(SSML_INTERPRET_AS_ADDRESS + address + SSML_SAY_AS_CLOSE);
    return this;
}

/**
 * Adds a date to the speech stack.
 * @param {string} date - The date.
 * @returns {object} - The Speech object so it can be chained.
 */
Speech.prototype.date = function(date) {
    this.parts.push(SSML_INTERPRET_AS_DATE + date + SSML_SAY_AS_CLOSE);
    return this;
}

/**
 * Adds a time to the speech stack.
 * @param {string} time - The time.
 * @returns {object} - The Speech object so it can be chained.
 */
Speech.prototype.time = function(time) {
    this.parts.push(SSML_INTERPRET_AS_TIME + time + SSML_SAY_AS_CLOSE);
    return this;
}

/**
 * Adds a price to the speech stack.
 * @param {string} amount - The price.
 * @param {string} [dollarUnitsSingular=dollar] - The singular dollars units.
 * @param {string} [dollarUnitsPlural=dollars] - The pural dollars units.
 * @param {string} [centsUnitsSingular=cent] - The singular cents units.
 * @param {string} [centsUnitsPlural=cents] - The plural cents units.
 * @returns {object} - The Speech object so it can be chained.
 */
Speech.prototype.price = function(amount, dollarUnitsSingular, dollarUnitsPlural, centsUnitsSingular, centsUnitsPlural) {
    if (!dollarUnitsSingular) {
        dollarUnitsSingular = 'dollar';
    }
    if (!dollarUnitsPlural) {
        dollarUnitsPlural = 'dollars';
    }
    if (!centsUnitsSingular) {
        centsUnitsSingular = 'cent';
    }
    if (!centsUnitsPlural) {
        centsUnitsPlural = 'cents';
    }
    var whole = Math.floor(amount);
    var fract = ((amount.toFixed(3) - whole) * 100).toFixed(0);

    if (whole !== 0) {
        this.number(whole, dollarUnitsSingular, dollarUnitsPlural);
        if (fract > 0) {
        	this.parts.push(' and ');
        }
    }

    if (fract > 0) {
        this.number(fract, centsUnitsSingular, centsUnitsPlural);
    }

    return this;
}

exports.Speech = Speech;

const SSML_INTERPRET_AS_TIME = '<say-as interpret-as="time">';
const SSML_INTERPRET_AS_DATE = '<say-as interpret-as="date">';
const SSML_INTERPRET_AS_ADDRESS = '<say-as interpret-as="address">';
const SSML_INTERPRET_AS_TELEPHONE = '<say-as interpret-as="telephone">';
const SSML_INTERPRET_AS_ORDINAL = '<say-as interpret-as="ordinal">';
const SSML_INTERPRET_AS_CARDINAL = '<say-as interpret-as="cardinal">';
const SSML_INTERPRET_AS_FRACTION = '<say-as interpret-as="fraction">';
const SSML_INTERPRET_AS_DIGITS = '<say-as interpret-as="digits">';
const SSML_INTERPRET_AS_SPELL_OUT = '<say-as interpret-as="spell-out">';
const SSML_SAY_AS_CLOSE = '</say-as>';
