import IsLoadingContext from "@/context/IsLoadingContext"
import { useContext } from "react"

export const useIsLoadingData = () => {
  const {isLoading, setIsLoading} = useContext(IsLoadingContext)

  if(isLoading) console.info('isLoading is true')

  return {isLoading, setIsLoading}
}