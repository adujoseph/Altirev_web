
import Button from "./Button";
interface Props {
  states: string[];
  ward: string[];
  pollingUnit: string[];
  stateLga: string[];
  setStateId: (e?: React.FormEvent) => string;
  stateId: string;
  setStateLgaId: (e?: React.FormEvent) => string;
  setWardId: (e?: React.FormEvent) => string;
  setPollingUnitId: (e?: React.FormEvent) => string;
  stateLgaId: string;
  wardId: string;
  pollingUnitId: string;
}
export const FilterVotes = ({
  ward,
  states,
  stateLga,
  setStateId,
  stateId,
  setStateLgaId,
  stateLgaId,
  wardId,
  pollingUnitId,
  setPollingUnitId,
  pollingUnit,
  setWardId,
}: Props) => {
  return (
    <div>
      <h2 className="font-semibold text-xl">Filters</h2>
      <form className="flex flex-col space-y-2">
        <div className=" flex items-center justify-between">
          <div className="font-semibold capitalize flex flex-col space-y-1 w-full sm:w-1/2 m-2">
            <label htmlFor="state" className="text-sm font-medium">
              state
            </label>
            <select
              className={`p-2 outline-none rounded w-full ${
                stateId
                  ? "border-[1px] border-[#2550C0] bg-[#EDF6FF]"
                  : "border-[1px] border-gray-300 text-sm text-[#979797]"
              }`}
              onChange={(e: React.FormEvent) => setStateId(e.target.value)}
              value={stateId}
              name="state"
            >
              <option value="">select state</option>
              {states.map((item: any) => (
                <option key={item?.value} value={item?.value}>
                  {item?.title}
                </option>
              ))}
            </select>
          </div>
          <div className="font-semibold capitalize flex flex-col space-y-1 w-full sm:w-1/2 m-2">
            <label htmlFor="LGA" className="text-sm font-medium">
              LGA
            </label>
            <select
              className={`p-2 outline-none rounded w-full ${
                stateLgaId
                  ? "border-[1px] border-[#2550C0] bg-[#EDF6FF]"
                  : "border-[1px] border-gray-300 text-sm text-[#979797]"
              }`}
              value={stateLgaId}
              onChange={(e: React.FormEvent) => setStateLgaId(e.target.value)}
              name="LGA"
            >
              <option value="">select LGA</option>
              {stateLga.map((item: any) => (
                <option key={item?.value} value={item?.value}>
                  {item?.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className=" flex items-center justify-between">
          <div className="font-semibold capitalize flex flex-col space-y-1 w-full sm:w-1/2 m-2">
            <label htmlFor="ward" className="text-sm font-medium">
              ward
            </label>
            <select
              className={`p-2 outline-none rounded w-full ${
                wardId
                  ? "border-[1px] border-[#2550C0] bg-[#EDF6FF]"
                  : "border-[1px] border-gray-300 text-sm text-[#979797]"
              }`}
              onChange={(e: React.FormEvent) => setWardId(e.target.value)}
              value={wardId}
              name="ward"
            >
              <option value="">select ward</option>
              {ward?.map((item: any) => (
                <option key={item?.value} value={item?.value}>
                  {item?.title}
                </option>
              ))}
            </select>
          </div>
          <div className="font-semibold capitalize flex flex-col space-y-1 w-full sm:w-1/2 m-2">
            <label htmlFor="PU" className="text-sm font-medium">
              PU
            </label>
            <select
              className={`p-2 outline-none rounded w-full ${
                pollingUnitId
                  ? "border-[1px] border-[#2550C0] bg-[#EDF6FF]"
                  : "border-[1px] border-gray-300 text-sm text-[#979797]"
              }`}
              onChange={(e: React.FormEvent) =>
                setPollingUnitId(e.target.value)
              }
              value={pollingUnitId}
              name="PU"
            >
              <option value="">select PU</option>
              {pollingUnit?.map((item: any) => (
                <option key={item?.value} value={item?.value}>
                  {item?.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
      <Button
        // loading={loading2}
        label="Filter"
        onClick={() => {}}
        styles="bg-[#2550C0] my-5 w-full"
      />
    </div>
  );
};
