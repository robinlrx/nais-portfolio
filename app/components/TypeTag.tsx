type TypeTagProps = {
  text: string;
};

const TypeTag = ({ text }: TypeTagProps) => {
  return (
    <div className="rounded-full px-3 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm lg:px-6 lg:py-2 lg:text-lg font-bold border border-black bg-white">
      <p className="text-black whitespace-nowrap">{text}</p>
    </div>
  );
};

export default TypeTag;