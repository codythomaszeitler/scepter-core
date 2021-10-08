import { NodeUser, OnNodeAddedEvent } from "../node.user";
import { Node, OnFunctionAddedEvent } from '../node';
import { ImpotentFunction } from '../impotent.function';
import { Function } from '../function';

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

    it('should emit an event when a new function is added', () => {
        const testObject = new NodeUser();

        let caughtEvent = new OnFunctionAddedEvent(new Node('NOT-YET-EMITTED'),
            'NOT-YET-EMITTED', new ImpotentFunction());
        const listener = {
            onFunctionAdded(e: OnFunctionAddedEvent) {
                caughtEvent = e;
            }
        }

        
        const node = new Node('Test');
        testObject.addNode(node);

        testObject.getNode(new Node('Test')).addOnFunctionAddedListener(listener);

        const functionName = testObject.addFunction(node, new ImpotentFunction());
        expect(caughtEvent.node.equals(new Node('Test')));
        expect(caughtEvent.functionName).toBe(functionName);

        caughtEvent = new OnFunctionAddedEvent(new Node('NOT-YET-EMITTED'),
            'NOT-YET-EMITTED', new ImpotentFunction());

        testObject.getNode(new Node('Test')).removeOnFunctionAddedListener(listener);

        testObject.addFunction(node, new ImpotentFunction());
        expect(caughtEvent.node.equals(new Node('NOT-YET-EMITTED')));
    });

    it('should be able to add portions of a functions one at a time', () => {
        // const testObject = new NodeUser();

        // const node = new Node('Test Node');
        // testObject.addNode(node);

        // node.initFunction('Test Function', new Function(

        // ));
        
    });
});