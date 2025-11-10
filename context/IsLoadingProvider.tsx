import IsLoadingContext from "./IsLoadingContext";

type DispatchData = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

type IsLoadingProviderProps = {
  children: React.ReactNode;
  data: DispatchData;
};

const IsLoadingProvider = ({ children, data }: IsLoadingProviderProps) => {

  return (
    <IsLoadingContext.Provider value={data}>
      {children}
    </IsLoadingContext.Provider>
  );
};

export default IsLoadingProvider;
