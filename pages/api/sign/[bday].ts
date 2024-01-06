import type { NextApiRequest, NextApiResponse } from "next";
import signs from "@/components/ui/data/mockedData";
import SignModel from "@/models/Sign.model";

type Data = {
  // FIXME: Argument of type signs missing
  signs: SignModel[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bday = Number(req.query.bday)

  const signMonthInterval = signs.filter(sign => {
    const interval = 
      bday >= sign.initialDate && bday <= sign.finalDate 
    return interval
  })

  try {
    if(signMonthInterval.length === 1) {
      const sign = signMonthInterval[0]
      res.status(200).json(sign.objectParse());
    } else {
      res.status(204).end()
    }
  } catch (error) {
    res.status(404).json({message: "bad request"})
    console.error(error)
  }
}
