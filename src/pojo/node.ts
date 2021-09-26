

export class Node {

    private name : string;

    constructor(name : string) {
        this.name = name;
    }

    public equals(node : Node) {
        return node.name === this.name;
    }

}