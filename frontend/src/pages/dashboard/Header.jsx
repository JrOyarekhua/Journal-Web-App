const Header = () => {
  return (
    <header className=" col-start-2 col-span-1">
      <div className="flex justify-around items-center gap-2 h-full">
        <h1 className="text-2xl">Welcome back user</h1>
        <span>
          <button className="mr-5">filter</button>
          <button>search</button>
        </span>
      </div>
    </header>
  );
};

export default Header;
