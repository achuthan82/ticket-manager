// Import Dependencies
import { Link, useLocation } from "react-router";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

// Local Imports
// import Logo from "assets/appLogo.svg?react";
import { Button, Card, Checkbox, Input, InputErrorMsg } from "components/ui";
import { useAuthContext } from "app/contexts/auth/context";
import { schema } from "./schema";
import { Page } from "components/shared/Page";

// ----------------------------------------------------------------------

export default function SignIn() {
  const { login, errorMessage, isLoading, setErrorMessage } = useAuthContext();
  const location = useLocation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle error messages from localStorage (e.g., when redirected due to token expiration)
  useEffect(() => {
    const storedErrorMessage = localStorage.getItem('loginErrorMessage');
    if (storedErrorMessage) {
      setErrorMessage(storedErrorMessage);
      // Clear the stored error message to prevent showing it again on refresh
      localStorage.removeItem('loginErrorMessage');
    }
  }, [setErrorMessage]);

  // Handle error messages from URL state (for backward compatibility)
  useEffect(() => {
    if (location.state?.errorMessage) {
      setErrorMessage(location.state.errorMessage);
      // Clear the state to prevent showing the message again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state, setErrorMessage]);

  const onSubmit = (data) => {
    login({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <Page title="Login">
      <main className="min-h-100vh grid w-full grow grid-cols-1 place-items-center">
        <div className="w-full max-w-[26rem] p-4 sm:px-5">
          <div className="text-center">
            {/* <Logo className="mx-auto size-16" /> */}
            <div className="w-full flex justify-center">
              <div className="bg-[#00B4D8] text-white  w-16 h-16 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0 cursor-pointer transition-colors duration-200">D</div>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold text-gray-600 dark:text-dark-100">
                Welcome to Ticket Manager
              </h2>
              <p className="text-gray-400 dark:text-dark-300">
                Please sign in to continue
              </p>
            </div>
          </div>
          <Card className="mt-5 rounded-lg p-5 lg:p-7">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div className="space-y-4">
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  prefix={
                    <EnvelopeIcon
                      className="size-5 transition-colors duration-200"
                      strokeWidth="1"
                    />
                  }
                  {...register("email")}
                  error={errors?.email?.message}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  prefix={
                    <LockClosedIcon
                      className="size-5 transition-colors duration-200"
                      strokeWidth="1"
                    />
                  }
                  {...register("password")}
                  error={errors?.password?.message}
                />
              </div>

              <div className="mt-2">
                <InputErrorMsg
                  when={errorMessage && errorMessage?.message !== ""}
                >
                  {errorMessage?.message}
                </InputErrorMsg>
              </div>

              <div className="mt-4 flex items-center justify-between space-x-2">
                <Checkbox label="Remember me" />
                <Link
                  to="/auth/forgot-password"
                  className="text-xs text-gray-400 transition-colors hover:text-gray-800 focus:text-gray-800 dark:text-dark-300 dark:hover:text-dark-100 dark:focus:text-dark-100"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="mt-5 w-full" 
                color="primary"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

          </Card>
          <div className="mt-8 flex justify-center text-xs text-gray-400 dark:text-dark-300">
            <a href="##">Privacy Notice</a>
            <div className="mx-2.5 my-0.5 w-px bg-gray-200 dark:bg-dark-500"></div>
            <a href="##">Term of service</a>
          </div>
        </div>
      </main>
    </Page>
  );
}
