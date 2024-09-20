export const Votes = ({ title, num, icon }: any) => (
  <div>
    <p className=" text-[#656565] ">{title}</p>
    <span className="flex items-center space-x-2">
      <p>{icon} </p>
      <p className="text-[#272727]  text-sm">{num}</p>
    </span>
  </div>
);
