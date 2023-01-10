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
        <form action="">
            <select name="" id="">
                {months.map(getMonths)}
            </select>
            <input type="number" name="days" id="day" min={1} max={31} />
            <div>
                <input type="checkbox" name="forgot your age?" id="checkbox" />
                <p>Keep age hidden by default </p>
            </div>
        </form>
    );
};

export default Form;
