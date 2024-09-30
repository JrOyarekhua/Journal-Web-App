import Sidebar from "./Sidebar";
import Header from "./Header";
import Main from "./Main";
const Dashboard = () => {
  return (
    <div className=" grid grid-cols-[200px_1fr] grid-rows-[100px_1fr] gap-x-2 min-h-full bg-gradient-to-r from-[#eeaeca]  to-[#94bbe9] text-white">
      <Sidebar />
      <Header />
      <Main />
    </div>
  );
};
export default Dashboard;
