import { NodeUser, OnNodeAddedEvent } from "../node.user";
import { FunctionChangedListener, Node, OnFunctionAddedEvent, OnFunctionChangedEvent } from '../node';
import { FunctionConstant } from "../function.constant";
import { FunctionOperator } from "../function.operator";
import { Function } from "../function";

describe('Node User', () => {
    it('should emit an event when a new node is added', () => {

        const testObject = new NodeUser();

        let caughtEvent = new OnNodeAddedEvent(new Node('NOT-YET-EMITTED'));
        const listener = {
            onNodeAdded(e: OnNodeAddedEvent) {
                caughtEvent = e;
            }
        }

        testObject.addOnNodeAddedListener(listener);

        const node = new Node('Test Node');
        testObject.addNode(node);

        expect(caughtEvent.node.equals(new Node('Test Node'))).toBeTruthy();

        testObject.removeOnNodeAddedListener(listener);

        caughtEvent = new OnNodeAddedEvent(new Node('NOT-YET-EMITTED'));
        testObject.addNode(new Node('Another Node!'));
        expect(caughtEvent.node.equals(new Node('NOT-YET-EMITTED'))).toBeTruthy();
    });

    it('should emit an event when a new function expression is added', () => {
        const testObject = new NodeUser();

        let caughtEvent = new OnFunctionChangedEvent(new Node('NOT-YET-EMITTED'),
            'NOT-YET-EMITTED', new Function(new FunctionConstant(0)), FunctionOperator.DIVISION);
        const listener = {
            onFunctionChanged(e: OnFunctionChangedEvent) {
                caughtEvent = e;
            }
        }

        const node = new Node('Test');
        testObject.addNode(node);

        const functionName = 'Test Function Name';

        testObject.addOnFunctionChangedListener(node, functionName, listener);

        testObject.initFunction(node, functionName, new FunctionConstant(8));
        testObject.addExpressionTo(node, functionName, new FunctionConstant(16), FunctionOperator.ADDITION);

        expect(caughtEvent.node.equals(new Node('Test'))).toBeTruthy();
        expect(caughtEvent.functionName).toBe(functionName);
        expect(caughtEvent.expression.view()).toBe('16');

        caughtEvent = new OnFunctionChangedEvent(new Node('NOT-YET-EMITTED'),
            'NOT-YET-EMITTED', new Function(new FunctionConstant(0)), FunctionOperator.DIVISION);

        testObject.removeOnFunctionChangedListener(node, functionName, listener);

        testObject.initFunction(node, 'Another Function', new FunctionConstant(8));
        expect(caughtEvent.node.equals(new Node('NOT-YET-EMITTED')));
    });

    it('should emit an event when a new function is added', () => {
        const testObject = new NodeUser();

        let caughtEvent = new OnFunctionAddedEvent(new Node('NOT-YET-EMITTED'),
            'NOT-YET-EMITTED', new Function(new FunctionConstant(0)));
        const listener = {
            onFunctionAdded(e: OnFunctionAddedEvent) {
                caughtEvent = e;
            }
        }


        const node = new Node('Test');
        testObject.addNode(node);

        testObject.addOnFunctionAddedListener(node, listener);

        const functionName = 'Test Function Name';
        testObject.initFunction(node, functionName, new FunctionConstant(8));
        expect(caughtEvent.node.equals(new Node('Test'))).toBeTruthy();
        expect(caughtEvent.functionName).toBe(functionName);

        caughtEvent = new OnFunctionAddedEvent(new Node('NOT-YET-EMITTED'),
            'NOT-YET-EMITTED', new Function(new FunctionConstant(0)));

        testObject.removeOnFunctionAddedListener(node, listener);

        testObject.initFunction(node, 'Another Function', new FunctionConstant(8));
        expect(caughtEvent.node.equals(new Node('NOT-YET-EMITTED')));
    });

    it('should be able to add on another expression to a function', () => {

        const testObject = new NodeUser();

        const node = new Node('Test Node');
        testObject.addNode(node);

        const functionName = 'Test Function';
        testObject.initFunction(node, functionName, new FunctionConstant(8));
        testObject.addExpressionTo(node, functionName, new FunctionConstant(8), FunctionOperator.ADDITION);

        expect(testObject.runFunction(node, functionName)).toBe(16);
    });

    it('should be able to run a function found within a node with stuff found from node.user', () => {

        const testObject = new NodeUser();

        const node = new Node('Test Node');
        testObject.addNode(node);

        const functionName = 'Test Function Name';
        testObject.initFunction(node, functionName, '8');
        expect(testObject.runFunction(node, functionName)).toBe(8);
    });

    it('should throw an exception if you try to run a function that does not exist on a found node', () => {
        const testObject = new NodeUser();

        const node = new Node('Test Node');
        testObject.addNode(node);

        const functionName = 'Test Function Name';
        let caughtException = new Error();
        try {
            testObject.runFunction(node, functionName);
        } catch (e) {
            caughtException = (e as Error);
        }
        expect(caughtException.message).toBe('Could not find function [Test Function Name] on node [Test Node]')
    });
});