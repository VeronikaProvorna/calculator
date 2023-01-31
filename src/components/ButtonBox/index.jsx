import CalculatorButton from "../Button";
import "./buttonBox.css";
import { TextField } from "@material-ui/core";
import { buttons, operations } from "../../utils/buttonValues";

const ButtonBox = ({handleClickNumber, handleClickOperation, inputRef, onClickGetExamples}) => {

    return (
        <div className="ButtonBox">
            {buttons.map((value, index) => { //show number buttons
                return <CalculatorButton
                    key={index} 
                    keyValue={value.num}
                    handleClick={handleClickNumber}
                />
            })}
            {operations.map((operation, index) => { //show operation buttons
                return <CalculatorButton
                    key={index} 
                    keyValue={operation.oper}
                    handleClick={handleClickOperation}
                />
            })}
            <div className="examplesContainer">
                <span className="inputCount">
                    <TextField  id="filled-basic" label="Input Count" variant="filled" inputRef={inputRef}/>
                </span>
                <CalculatorButton keyValue={"Отримати приклади"} handleClick={onClickGetExamples}/>
            </div>
        </div>
    )
}

export default ButtonBox;