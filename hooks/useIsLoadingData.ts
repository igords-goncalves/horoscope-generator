import IsLoadingContext from "@/context/IsLoadingContext"
import { useContext } from "react"

export const useIsLoadingData = () => {
  const {isLoading, setIsLoading} = useContext(IsLoadingContext)

  // Nesse custom hook. poderiamos adicionar mais lógica, 
  // como por exemplo, um console.log para debugar o estado de isLoading

  if(isLoading) console.log('isLoading is true')

  return {isLoading, setIsLoading}
}