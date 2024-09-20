import { BackArrow, FilterView } from "../icons/Arrow";
import Card from "./Card";
import PieChart, { ChartData } from "./Chart";

interface Props {
  bar: number;
  data?: any;
  options: any;
  setView: (e?: number) => void;
}

export const VoteBreakDown = ({ data, options, setView, bar }: Props) => {
  return (
    <div>
      <span
        onClick={() => setView(1)}
        className="flex items-center cursor-pointer space-x-1"
      >
        <p>
          <BackArrow color="#272727" />
        </p>
        <p className="text-[#272727] font-medium">Back</p>
      </span>
      <span className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Vote Breakdown</h2>
        <p className="w-max border-[1px] border-[#CBCBCB] rounded flex items-center justify-center p-2">
          <FilterView />
        </p>
      </span>
      <hr className="my-4" />
      <section className="flex">
        <div className="w-full sm:w-2/3 ">
          <Card>
            <div className="flex items-center justify-center p-6">
              <ChartData type="BarChart" data={data} options={options} />{" "}
              {/* <PieChart type="bar" /> */}
            </div>
          </Card>
        </div>
        <div className="w-1/3 flex flex-col space-y-3 h-screen overflow-y-scroll">
          <Card>
            {[...Array(11)].map((i) => (
              <div className="flex items-center justify-between m-2 px-4 py-1">
                <h2 className="text-sm">Accord</h2>
                <p className="text-sm">0%</p>
              </div>
            ))}
          </Card>
        </div>
      </section>
    </div>
  );
};
