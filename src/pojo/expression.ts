import { NodeRequirement } from "./node.requirement";
import { NodeUser } from "./node.user";

export interface Expression {

    // What this is really saying is that you are allowed to get ALL of the information that is currently present on the screen.
    // Brock has said that he really only wants it to go one layer back.
    // Okay we are really going to have to think about this interface. But remember, the function 
    get: (nodeUser: NodeUser) => number;
    requirements : () => NodeRequirement;
    view: () => string;
}

export function isExpression(toCheck : Object) {
    return (toCheck as Expression).get && (toCheck as Expression).requirements && (toCheck as Expression).view
}