
import {evaluate} from '../math';

describe('Math', () => {
    it('respect order of operations', () => {
        expect(evaluate('3 + 5 * 2')).toBe(13);
    });
})