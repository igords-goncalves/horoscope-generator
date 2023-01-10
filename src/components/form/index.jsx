import Forms from "./style";

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

function getMonths(el) {
    return <option>{el}</option>;
}

const Form = () => {
    return (
        <Forms action="">
            <select name="" id="">
                {months.map(getMonths)}
            </select>
            <input type="number" name="days" id="day" min={1} max={31} />

            <div className="cbox">
                <input type="checkbox" />
                <span>Keep age hidden by default </span>
            </div>

        </Forms>
    );
};

export default Form;
