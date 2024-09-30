import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import AuthHeader from "./home/homeComponents/AuthHeader";
import BackButton from "./home/homeComponents/BackButton";
const CardWrapper = ({
  label,
  title,
  backButtonHref,
  backButtonLabel,
  children,
  route,
}) => {
  return (
    <Card className="w-2/5 h-fit bg-black/80 flex flex-col text-white border-none">
      <CardHeader>
        <AuthHeader title={title} label={label} />
      </CardHeader>
      <CardContent className="grid max-h-fit">{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} route={route} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
