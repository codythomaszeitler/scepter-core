import math = require('mathjs');

export function evaluate(expression : string) {
    return math.evaluate(expression);
}