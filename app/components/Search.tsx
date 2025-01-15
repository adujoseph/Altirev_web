"use client";
import Search from "../icons/Search";

type Props = {
  style?: string;
  inputText: string;
  setInputText: (e: string) => void;
  disabled?: boolean;
};

export function SearchField({
  inputText,
  setInputText,
  disabled,
  style,
}: Props) {
  return (
    <div
      className={`w-[240px] xl:w-[350px] h-[43px] flex items-center space-x-3  pl-5 border-[1px] bg-transparent border-[#CBCBCB] rounded-xl overflow-hidden ${style}`}
    >
      <Search />
      <input
        className="outline-none border-none bg-transparent text-[#BABABB] w-full"
        type="text"
        placeholder="Search here"
        value={inputText}
        onChange={(e: any) => setInputText(e.target.value)}
      />
    </div>
  );
}
