// Import Dependencies
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { JWT_HOST_API } from "configs/auth.config";
import axios from "axios";
import { useState } from "react";
// Local Imports
// import Logo from "assets/appLogo.svg?react";
import { Button, Card, Input, GhostSpinner } from "components/ui";
import { Page } from "components/shared/Page";
import { useNavigate } from "react-router";
import { toast } from "sonner";

// Schema
const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  localStorage.removeItem("authToken");

  const onSubmit = (d) => {
    setLoading(true);
    setSuccess(false);
    const config = {
      method: "post",
      url: `${JWT_HOST_API}/auth/forgot-password`,
      data: {
        email: d.email,
      },
      headers: {},
    };
    axios(config)
      .then((response) => {
        setLoading(false);
        if (response.data.status === 200) {
          setSuccess(true);
          toast.success("Reset Link shared via mail");
        } else {
          toast.error("Please try again later");
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error("Please try again later");
      });
  };

  return (
    <Page title="Forgot Password">
      <main className="min-h-100vh grid w-full grow grid-cols-1 place-items-center">
        <div className="w-full max-w-[26rem] p-4 sm:px-5">
          <div className="text-center">
            <div className="flex w-full justify-center">
              <img
                src="/shieldnest-icon.png"
                alt="ShieldNest"
                className="h-20 w-20 object-contain opacity-80"
              />
            </div>
            <div className="mt-4">
              <h2 className="dark:text-dark-100 text-2xl font-semibold text-gray-600">
                Forgot Password
              </h2>
              <p className="dark:text-dark-300 text-gray-400">
                Enter your email and we’ll send you a reset link
              </p>
            </div>
          </div>
          <Card className="mt-5 rounded-lg p-5 lg:p-7">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div className="space-y-4">
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  prefix={
                    <EnvelopeIcon
                      className="size-5 transition-colors duration-200"
                      strokeWidth="1"
                    />
                  }
                  {...register("email")}
                  error={errors?.email?.message}
                />
              </div>

              {/* <div className="mt-2">
                <InputErrorMsg when={false}>
                </InputErrorMsg>
              </div> */}
              {success && (
                <div className="mt-2">
                  <p className="text-success text-md font-normal">
                    Please check your Inbox
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="mt-5 w-full"
                color="primary"
                disabled={loading}
              >
                {loading && <GhostSpinner className="mr-3 size-4 border-2" />}{" "}
                Send Reset Link
              </Button>
            </form>
          </Card>

          <div className="dark:text-dark-300 mt-8 flex justify-center text-xs text-gray-400">
            <span className="cursor-pointer" onClick={() => navigate("/login")}>
              Back to Sign In
            </span>
          </div>
        </div>
      </main>
    </Page>
  );
}
