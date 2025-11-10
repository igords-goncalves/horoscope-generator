import { createContext } from "react";

type IsLoadingContextProps = {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
};

const initialState = { isLoading: false, setIsLoading: () => {} };
const IsLoadingContext = createContext<IsLoadingContextProps>(initialState);

export default IsLoadingContext;
