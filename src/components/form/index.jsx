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

function getMonths(months) {
    return months.forEach((el) => {
        return el;
    })
}

const Form = () => {
    return (
        <form action="">
            <select name="" id="">
                <option value={getMonths(months)}>{getMonths(months)}</option>
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
