// Import Dependencies
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import * as yup from "yup";
import { JWT_HOST_API } from "configs/auth.config";
import axios from "axios";
import { useState } from "react";
// Local Imports
// import Logo from "assets/appLogo.svg?react";
import { Button, Card, Input, GhostSpinner } from "components/ui";
import { Page } from "components/shared/Page";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
// ----------------------------------------------------------------------
// Validation Schema
const passwordRules =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\];':"\\|,.<>/?])\S{8,}$/;
const schema = yup.object().shape({
  newPassword: yup
    .string()
    .matches(
      passwordRules,
      "Password must be at least 8 characters, contain at least one letter, one number, one special character, and have no spaces",
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  localStorage.removeItem("authToken");
  const formattedToken = token.replace(/\${5}/g, ".");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (d) => {
    setLoading(true);
    const config = {
      method: "patch",
      url: `${JWT_HOST_API}/auth/reset_password`,
      data: {
        new_password: d.newPassword,
        confirm_password: d.confirmPassword,
      },
      headers: {
        Authorization: `Bearer ${formattedToken}`,
      },
    };
    axios(config)
      .then((response) => {
        setLoading(false);
        if (response.data.status === 200) {
          navigate("/login");
          toast.success("Registered");
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
    <Page title="Reset Password">
      <main className="min-h-100vh grid w-full grow grid-cols-1 place-items-center">
        <div className="w-full max-w-[26rem] p-4 sm:px-5">
          <div className="text-center">
            {/* <Logo className="mx-auto size-16" /> */}
            <div className="flex w-full justify-center">
              <img
                src="/shieldnest-icon.png"
                alt="ShieldNest"
                className="h-20 w-20 object-contain opacity-80"
              />
            </div>
            <div className="mt-4">
              <h2 className="dark:text-dark-100 text-2xl font-semibold text-gray-600">
                Reset Your Password
              </h2>
              <p className="dark:text-dark-300 text-gray-400">
                Enter your new password below
              </p>
            </div>
          </div>

          <Card className="mt-5 rounded-lg p-5 lg:p-7">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div className="space-y-4">
                <Input
                  label="New Password"
                  placeholder="Enter New Password"
                  type="password"
                  prefix={<LockClosedIcon className="size-5" strokeWidth="1" />}
                  {...register("newPassword")}
                  error={errors?.newPassword?.message}
                />
                <Input
                  label="Confirm Password"
                  placeholder="Confirm New Password"
                  type="password"
                  prefix={<LockClosedIcon className="size-5" strokeWidth="1" />}
                  {...register("confirmPassword")}
                  error={errors?.confirmPassword?.message}
                />
              </div>

              {/* <div className="mt-4">
                <InputErrorMsg when={Object.keys(errors).length > 0}>
                  {errors?.confirmPassword?.message || errors?.newPassword?.message}
                </InputErrorMsg>
              </div> */}

              <Button
                type="submit"
                className="mt-5 w-full"
                color="primary"
                disabled={loading}
              >
                {loading && <GhostSpinner className="mr-3 size-4 border-2" />}{" "}
                Reset Password
              </Button>
            </form>
          </Card>

          <div className="dark:text-dark-300 mt-8 flex justify-center text-xs text-gray-400">
            <a href="##">Privacy Notice</a>
            <div className="dark:bg-dark-500 mx-2.5 my-0.5 w-px bg-gray-200"></div>
            <a href="##">Terms of Service</a>
          </div>
        </div>
      </main>
    </Page>
  );
}
