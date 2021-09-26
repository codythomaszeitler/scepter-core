import { Category } from '../category';
import { AMOUNT_TYPE, Transaction } from '../transaction';
import { TransactionDetail } from '../transaction.detail';
import { NodeUser } from '../node.user';
import { FunctionCategoryColumn } from '../function.category.column';
import { FunctionOperator } from '../function.operator';
import { FunctionConstant } from '../function.constant';
import { Function } from '../function';
import { Node } from '../node';

describe('function', () => {

    it('should be able to construct a function from a category', () => {
        const nodeUser = new NodeUser();

        const category = new Category('Test');

        nodeUser.addCategory(category);

        const transaction = new Transaction([
            new TransactionDetail('16', 'TEST-NUMBER-COLUMN', AMOUNT_TYPE)
        ]);

        nodeUser.readyForCategorization(transaction);
        nodeUser.categorize(transaction, category);

        const node = new Node('Test Node Name');
        nodeUser.addNode(node);
        // So here is the question.
        // Should we allow someone to "get" this node and attach their own listeners to it? 

        // no because i feel like that stpes on the toes of the NodeUser that we are about to make.
        // so let's not do it.

        // This might not be the right api name but let's keep moving (kent beck style!)
        nodeUser.link(category, node);

        // should it be a string... this is a really important question since if it ever gets into excel form... it will have to have some sort of string...
        // representation! But wait that could just be the momento pattern in action!
        const functionId = nodeUser.addFunction(node, new Function(
            new FunctionCategoryColumn(category, 'TEST-NUMBER-COLUMN'),
            FunctionOperator.DIVISION,
            new FunctionConstant(8)
        ));

        nodeUser.runFunction(functionId);



        // now you want to actually DO things to those nodes... the UI of the user may in fact impact how these functions
        // are going to be written...

        // so you are going to be able to ADD a function to a node
        // you are going to be able to CHANGE function  of node.
        // When you add a function to a node... what are the things that you have to be able to do?
        // what are you going to present to the add function?

        // UGH this gets even harder since if someone is technically clicking on a function within a node, that function 
        // COULD be a duplicate... at some point... so we need some other way than the function itself to determine 
        // the identity!!! KEEP GOING CODY YOU ARE DOING GREAT!

        // Okay... so when you are engaging with a node... you are going to "click" on a function to interact with it. The function
        // screen MUST have some sort of unique identifier within the node for you to know which function just got messed with.

        // Which gives us the meaning to actually get an id from an "add" function call. Let's see how it works out. 








        // okay so this is where it becomes more interesting... if you have in fact linked a  category to a node, how do you make the function 
        // that should now be presented on that category? 


        nodeUser.addNodeTo

        // Okay so now the number 5 is within the TEST-NUMBER-COLUMN

        // so now what is the question?
        // we have to have first create a node, then within that node it is going to have
        // a function. That function can use what exactly to get its information?

        // So who feeds the function its information?
        // How is the function smart enough to actually do this?

        // The function MUST have reference to the scepter user?
        // How else can it gain access to the categories? and its associated column name?

        // But its not ONLY categories.

        // Think think think...
        // There are many categories that can all link into a node.

        // The node is then allowed to feed in certain categories.
        // (Is that always going to be the case?)
        // Nodes are also allowed to feed in other nodes. (recursive? Don't know why im mentioning that)
        // If you give someone a category to a node... 
        // Wait... but what if we want the nodes to be able to react to the fact that something else has been added to them?

        // Who is responsible for keeping the node up to date?
        // So a node is composed of categories... 







    });

});