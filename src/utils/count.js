//returns the result of calculations
export const countResult = (exp) => {

    //check if the math question is correct
    //in the question must be 3 operands: two numbers and operator
    if(exp.length === 3 ){
        const num1 = +exp[0];
        const operator = exp[1];
        const num2 = +exp[2];

        if(typeof num1 != 'number' &&
        typeof num2 != 'number' &&
        typeof operator != 'string'){
            return null;
        }

        let result;

        switch(operator){
            case '+': {
                result = num1 + num2;
                break;
            }
            case '-': {
                result = num1 - num2;
                break;
            }
            case '/': {
                result = num1 / num2;
                break;
            }
            case '*': {
                result = num1 * num2;
                break;
            }
        }
        return result;
    }
    return null;
}

export const areOperatorsSimilar = (oper1, oper2) => {
    if(oper1 === oper2) return true;

    return false;
}