import Sidebar from "./Sidebar";
import Header from "./Header";
import Main from "./Main";
const Dashboard = () => {
  return (
    <div className=" grid grid-cols-[200px_1fr] grid-rows-[100px_1fr] gap-x-2 min-h-full bg-gradient-to-r from-[rgba(0,0,0,1)]  to-[rgba(127,16,16,1)] text-white">
      <Sidebar />
      <Header />
      <Main />
    </div>
  );
};
export default Dashboard;
