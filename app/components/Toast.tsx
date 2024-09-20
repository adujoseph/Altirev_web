import { toast } from "react-hot-toast";
import classNames from "classnames";

type Props = {
  title: string;
  error: boolean;
};

export const Toast = ({ title, error }: Props): any =>
  toast.custom((t) => (
    <div
      className={classNames(
        " px-6 py-3.5 shadow-md rounded-lg flex items-center space-x-2 !z-[30000]",
        {
          "animate-enter": t.visible,
          "animate-leave": !t.visible,
          " bg-[#F2FCF5] text-[#029247] border-l-4 border-[#029247]": !error,
          "bg-[#FFF3F2] text-[#FF3B30] border-l-4 border-[#FF3B30]": error,
        }
      )}
    >
      <span className="font-semibold">{title ?? "Error Occurred"}</span>
    </div>
  ));
