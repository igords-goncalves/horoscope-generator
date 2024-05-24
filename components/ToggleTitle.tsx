import SignModel from "@/models/Sign.model";

type ToggleTitleProps = {
  sign?: SignModel;
}

const ToggleTitle = ({sign}: ToggleTitleProps) => {
  return (
    <div className="title flex w-full flex-col text-center items-center gap-6 text-dark">
        <h1 className="font-[700] text-[2rem]">
          {sign ? sign?.title : "Sign"}
        </h1>
        <p className="text-base h-[56px]">
          {sign ? sign?.profile : "Short profile sign description"}
        </p>
      </div>
  )
};

export default ToggleTitle;