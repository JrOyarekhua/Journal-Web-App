import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const BackButton = ({ label, route }) => {
  return (
    <Button variant="link" aschild>
      <Link to={route}>{label}</Link>
    </Button>
  );
};

export default BackButton;
