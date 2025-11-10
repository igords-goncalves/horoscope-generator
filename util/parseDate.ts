import { Dispatch, SetStateAction } from "react";

type ParseDateProps = {
  birthday: string,
  setDate: Dispatch<SetStateAction<number | undefined>>
}

function parseDate({birthday, setDate}: ParseDateProps) {
  if(birthday) {
    const YYYY_MM_DD = birthday.split("-");
    const MM_DD = `${YYYY_MM_DD[1]}${YYYY_MM_DD[2]}`
    let date = parseInt(MM_DD.split("").join(""))
    if (date <= 119) date += 10000;
    return setDate(date);
  }
  return
}
export default parseDate;