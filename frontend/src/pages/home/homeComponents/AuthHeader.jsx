const AuthHeader = ({ title, label }) => {
  return (
    <div className="text-center">
      <h1>{title}</h1>
      <p>{label}</p>
    </div>
  );
};

export default AuthHeader;
