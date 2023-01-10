import ButtonWrapper from "./style";

const Button = (props) => {
    return (
        <ButtonWrapper>
            <button onClick={props.getResult}>Generate</button>
            <a href="https://www.calculator.net/age-calculator.html">
                forgot your age?
            </a>
        </ButtonWrapper>
    );
};

export default Button;
