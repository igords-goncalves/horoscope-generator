import { Dispatch, SetStateAction } from "react";

type ParseDateProps = {
  bday: string,
  setDate: Dispatch<SetStateAction<number | undefined>>
}

function parseDate({bday, setDate}: ParseDateProps) {
  if(bday) {
    const date = parseInt( bday.split("-").join(""));
    return setDate(date);
  }
  return
}
export default parseDate;