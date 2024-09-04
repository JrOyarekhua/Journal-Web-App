import CardWrapper from "../homeComponents/CardWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "./Schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useContext } from "react";

const LogInForm = () => {
  const navigate = useNavigate();
  const { login, errorMessage } = useContext(AuthContext);
  // define form
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // handle submittion logic
  async function onSubmit(data) {
    // perorm login function

    try {
      await login(data);
      // reset form
      form.reset();
      // redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.log(` ${errorMessage}`);
    }
  }

  return (
    <CardWrapper
      label="please enter your login information"
      title="login"
      backButtonLabel="new user ? register here"
      route="/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="enter your email" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input placeholder="*****" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Log in</Button>
          {errorMessage && <p className=" pt-2 text-sm">{errorMessage}</p>}
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LogInForm;
