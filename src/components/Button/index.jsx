import Button from '@material-ui/core/Button';

const CalculatorButton = ({
    keyValue,
    handleClick
}) => {

    return (
        <>
            <Button variant="contained" color="primary"
                onClick={() => handleClick(keyValue)}
                value={keyValue}
            >
                {keyValue}
            </Button>
        </>
    )
}

export default CalculatorButton;