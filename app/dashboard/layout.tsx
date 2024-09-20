import DashboardWrapper from "../components/DashboardWrapper";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="bg-[#F3F3F3]">
      <div>
        <Sidebar />
      </div>
      <div className="">
        <DashboardWrapper>{children}</DashboardWrapper>
      </div>
    </div>
  );
};

export default Layout;
