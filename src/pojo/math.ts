import {evaluate as mathjseval} from 'mathjs';

export function evaluate(expression : string) {
    return mathjseval(expression);
}