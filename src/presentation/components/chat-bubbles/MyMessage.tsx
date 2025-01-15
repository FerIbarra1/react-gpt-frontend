interface Props {
  text: string;
}

export const MyMessage = ({ text }: Props) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex flex-row-reverse items-center justify-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#EC0932] flex-shrink-0">
          F
        </div>
        <div className="relative mr-3 text-sm bg-white dark:bg-[#2f2f2f] py-2 px-4 shadow rounded-xl">
          <div className="text-[#202020] dark:text-white">{text}</div>
        </div>
      </div>
    </div>
  );
};
