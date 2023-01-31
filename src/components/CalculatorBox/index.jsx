import ButtonBox from "../ButtonBox";
import Screen from "../Screen";
import { useRef, useState } from "react";
import "./calculatorBox.css"
import { countResult, areOperatorsSimilar } from "../../utils/count";
import { fetchExamples } from "../../api/fetchExamples";

const CalculatorBox = () =>{
    const [expression, setExpression] = useState('');
    const [history, setHistory] = useState([]);
    //reference for the input field for count of examples
    const inputCountRef = useRef('');
    //isPressed vatiable is used for checking extra pressing
    //of operator  buttons
    const [isPressed, setIsPressed] = useState(false);

    //click handler for number buttons
    const onClickNumber = (value) => {
        setExpression(expression + value);
    }

    //click handler for operation buttons
    const onClickOperation = (operation) => {
        const exp = expression.trim().split(" ");
        const lastVal = exp[exp.length - 1];

        //check if last inputed value is Math operation
        const isLastValMathOperation = lastVal === '+' || lastVal === '-' 
            || lastVal === '/' || lastVal === '*';

        //check if operation is also Math operation
        const isPressedValueMathOperation = operation != '=' && !operation.startsWith('C');
        
        if(isLastValMathOperation && isPressedValueMathOperation){
            //check if last operation and current are not equal
            //if not - change last operation to current
            if(!areOperatorsSimilar(lastVal, operation)){
                exp[exp.length - 1] = operation;
                setExpression(exp.join(" ") + " ");
            } 
        }

        //if expression has 3 operands and
        //current operation is '=' - count result
        else if(operation === '=' && exp.length > 2){
            const result = countResult(exp);
            
            if(result != null) {
                //isPressed set false, because after counting
                //the result starts new Math question
                setIsPressed(false);
                setExpression(result.toString());
                //show full expression in history
                setHistory([...history, expression + " = " + result.toString()]);

            }
        }

        //clear all
        else if(operation === 'C'){
            setExpression("");
            setIsPressed(false);
        } 

        //clear last value
        else if(operation === 'CE'){
            if(exp.length < 2){
                setIsPressed(false);
            }

            setExpression(expression.trim().slice(0, -1));
            
        } 
        
        //if user pressed second Math operator
        //just add it to expression
        else if(isPressedValueMathOperation && isPressed === false){
            setExpression(expression + " " + operation + " ");
            setIsPressed(true);
        } 
        
        //if user pressed second Math operator
        //count expression and make a new one 
        //with result and current operator
        else if(isPressed && exp.length === 3){
            const result = countResult(exp);
            //isPressed true, because starts new expression
            //after result and the 1 Math operator already exist
            setIsPressed(true);

            if(result != null) {
                setExpression(result.toString() + " " + operation + " ");
                setHistory([...history, expression + " = " + result.toString()]);
            } 
        }
    }

    //handle click to get math examples
    const onClickGetExamples = async () => {
        //check if count is not empty
        const isInputValueExist = inputCountRef.current.value != '';
        if(isInputValueExist){
            //get examples
            const mathExamples = await fetchExamples(inputCountRef.current.value);
            
            //count the result and add to history all expression
            mathExamples.forEach(element => {
                const splitResItem = element.trim().split(" ");
                const res = countResult(splitResItem);
            
                if(res != null) {
                    setHistory((prevState) => (
                        [...prevState, 
                        element + " = " + res.toString()]
                    ));
                } 
            });
        }
    }

    return (
        <div className="CalculatorBox">
            <Screen display={expression} history={history}/>
            <ButtonBox 
                handleClickNumber={onClickNumber} 
                handleClickOperation={onClickOperation} 
                inputRef={inputCountRef}
                onClickGetExamples={onClickGetExamples}/>
        </div>
    )
}

export default CalculatorBox;