// Import Dependencies
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useParams, useLocation, useNavigate } from "react-router";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import * as yup from "yup";
import { JWT_HOST_API } from "configs/auth.config";
import axios from "axios";
import { useState } from "react";
// Local Imports
// import Logo from "assets/appLogo.svg?react";
import { Button, Card, Input, GhostSpinner } from "components/ui";
import { Page } from "components/shared/Page";
import { toast } from "sonner";

// ----------------------------------------------------------------------
// Validation Schema (Inline)
const passwordRules =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\];':"\\|,.<>/?])\S{8,}$/;
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .matches(
      passwordRules,
      "Password must be at least 8 characters, contain at least one letter, one number, one special character, and have no spaces",
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

// ----------------------------------------------------------------------

export default function Register() {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  localStorage.removeItem("authToken");
  const formattedToken = token.replace(/\${5}/g, ".");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const authData = {
    first_name: searchParams.get("first_name"),
    last_name: searchParams.get("last_name"),
    department_id: searchParams.get("department_id"),
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: authData?.first_name,
      lastName: authData?.last_name,
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (d) => {
    setLoading(true);
    const config = {
      method: "post",
      url: `${JWT_HOST_API}/users/register`,
      data: {
        first_name: d.firstName,
        last_name: d.lastName,
        email: d.email,
        password: d.password,
        confirm_password: d.confirmPassword,
        department_id: parseInt(authData.department_id),
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
    <Page title="Register">
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
                Create an Account
              </h2>
              <p className="dark:text-dark-300 text-gray-400">
                Please fill the form to register
              </p>
            </div>
          </div>

          <Card className="mt-5 rounded-lg p-5 lg:p-7">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div className="space-y-4">
                <Input
                  label="First Name"
                  placeholder="Enter First Name"
                  prefix={<UserIcon className="size-5" strokeWidth="1" />}
                  {...register("firstName")}
                  error={errors?.firstName?.message}
                />
                <Input
                  label="Last Name"
                  placeholder="Enter Last Name"
                  prefix={<UserIcon className="size-5" strokeWidth="1" />}
                  {...register("lastName")}
                  error={errors?.lastName?.message}
                />
                <Input
                  label="Email"
                  placeholder="Enter Email"
                  prefix={<EnvelopeIcon className="size-5" strokeWidth="1" />}
                  {...register("email")}
                  error={errors?.email?.message}
                />
                <Input
                  label="Password"
                  placeholder="Enter Password"
                  type="password"
                  prefix={<LockClosedIcon className="size-5" strokeWidth="1" />}
                  {...register("password")}
                  error={errors?.password?.message}
                />
                <Input
                  label="Confirm Password"
                  placeholder="Re-enter Password"
                  type="password"
                  prefix={<LockClosedIcon className="size-5" strokeWidth="1" />}
                  {...register("confirmPassword")}
                  error={errors?.confirmPassword?.message}
                />
              </div>

              {/* <div className="mt-4">
                                <InputErrorMsg when={Object.keys(errors).length > 0}>
                                    {errors?.confirmPassword?.message ||
                                        errors?.password?.message ||
                                        errors?.email?.message}
                                </InputErrorMsg>
                            </div> */}

              <Button
                type="submit"
                className="mt-5 w-full"
                color="primary"
                disabled={loading}
              >
                {loading && <GhostSpinner className="mr-3 size-4 border-2" />}{" "}
                Register
              </Button>
            </form>
          </Card>

          <div className="dark:text-dark-300 mt-8 flex justify-center text-xs text-gray-400">
            <a href="##">Privacy Notice</a>
            <div className="dark:bg-dark-500 mx-2.5 my-0.5 w-px bg-gray-200"></div>
            <a href="##">Terms of Service</a>
          </div>

          <div className="dark:text-dark-300 mt-3 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary dark:text-primary-light hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </main>
    </Page>
  );
}
