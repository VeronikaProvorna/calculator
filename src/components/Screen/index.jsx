import "./screen.css";

const Screen = ({display, history}) => {

    return (
        <div className="ScreenContainer">
            <div className="historyContainer">
            {history.map((element, index, array) => {
                if(index === array.length - 1){
                    //add a className for the last element
                    //to highlight it
                    return <p key={index} className="lastHistoryEl">{element}</p>
                }
                
                return <p key={index}>{element}</p>
                })}
            </div>
            <span className="expressionVal">
                {display}
            </span>
        </div>
    )
}

export default Screen;