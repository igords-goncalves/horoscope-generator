import IsLoadingContext from "./IsLoadingContext";

type IsLoadingProviderProps = {
  children: React.ReactNode;
  data: any;
};

const IsLoadingProvider = ({ children, data }: IsLoadingProviderProps) => {
  return (
    <IsLoadingContext.Provider value={data}>
      {children}
    </IsLoadingContext.Provider>
  );
};

export default IsLoadingProvider;
