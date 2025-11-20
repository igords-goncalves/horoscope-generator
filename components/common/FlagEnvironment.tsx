const FlagEnvironment = () => {
    return (
        <div>
            {process.env.NEXT_PUBLIC_ENVIRONMENT === "development" && (
                <span className="absolute top-0 right-0 bg-red-500 text-white p-1 text-xs z-50">
                    {process.env.NEXT_PUBLIC_ENVIRONMENT.toUpperCase()}
                </span>
            )}
        </div>
    );
};

export default FlagEnvironment;
