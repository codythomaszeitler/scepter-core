import { FunctionConstant } from '../function.constant';
import { NodeUser } from '../node.user';

describe('Function Constant', () => {
    it('should be able to get a constant value', () => {

        const nodeUser = new NodeUser();

        const testObject = new FunctionConstant(5);
        expect(testObject.get(nodeUser)).toBe(5)
    });
})