import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../helpers/api";
import { ShowToast } from "../../../components/toast";
import { Layout } from "../../../components/Layout";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import { SocialLogin } from "../../../components/SocialLogin";
import Checkbox from "../../../components/Checkbox";
import LayoutImg from "../../../assets/images/form-header.png";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/g,
      "Password must contain at least one uppercase and at least one lowercase letter and at least one special character"
    ),
});

const LoginForm = () => {
  return (
    <Layout>
      <Formik
        initialValues={{ email: "", password: "" }}
        isInitialValid={false}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          api
            .login(values)
            .then((res) => {
              localStorage.setItem("token", res.data.accessToken);
              localStorage.setItem("user", JSON.stringify(res.data));
              actions.setSubmitting(false);
              actions.resetForm();
              ShowToast({
                type: "success",
                message: "Login successful",
              });
              setTimeout(() => {
                window.location.href = "/dashboard";
              }, 1000);
            })
            .catch((err) => {
              actions.setSubmitting(false);
              ShowToast({
                type: "error",
                message: "There was an error logging in.",
              });
            });
        }}
      >
        <LoginFormContent />
      </Formik>
    </Layout>
  );
};

const LoginFormContent = () => {
  const { isValid, isSubmitting } = useFormikContext();
  const navigate = useNavigate();

  const handleGoogleLogin = async (response: any) => {
    const payload = {
      email: response.data.email,
      fullName: response.data.name,
      googleId: response.data.id,
      userType: "U",
    };

    api
      .login(payload)
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/home");
      })
      .catch((err) => {
        ShowToast({
          type: "error",
          message: "There was an error logging in.",
        });
      });
  };

  return (
    <div className="grid items-center h-full justify-center">
      <div className="grid p-[1.5rem] rounded-[24px] lg:w-[500px] w-[calc(100vw-2rem)]">
        <Form className="grid gap-[1.5rem]">
          <div className="text-center grid gap-3 mb-[0.5rem]">
            <div>
              <img
                src={LayoutImg}
                alt="layout"
                className="w-full mx-auto"
                loading="lazy"
              />
              <h1 className="text-[1.5rem] font-outfit font-[600] leading-[110%]">
                Welcome to <span className="text-primary">Marble Legal</span>
              </h1>
            </div>
            <p className="font-[500] text-[0.875rem] text-[#666] leading-[110%]">
              Sign in to your account
            </p>
          </div>
          <div className="grid gap-4">
            <FormField
              label="Email address"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
            <FormField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
            <div className="flex justify-between">
              {/* <div className="flex gap-2">
                <Checkbox label="remember" />
                <label
                  htmlFor="remember"
                  className="text-[0.875rem] text-[#888] font-[500]"
                >
                  Remember me
                </label>
              </div> */}
              <Link to="/forgot-password" className="ml-auto">
                <Button
                  variant="link"
                  className="!text-[#888] !font-[500] underline"
                >
                  Forgot password?
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            <Button
              className="w-full"
              type="submit"
              disabled={!isValid}
              loading={isSubmitting}
            >
              Sign in
            </Button>

            <div className="flex items-center justify-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="mx-2 text-sm text-gray-600">Or</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>

            <SocialLogin onGoogleLogin={handleGoogleLogin} />
          </div>
          <h2 className="text-[0.875rem] text-[#888] flex gap-[0.375rem] justify-self-center font-[500]">
            Don’t Have an account?{" "}
            <Link to="/register">
              <Button variant="link">Create one now!</Button>
            </Link>
          </h2>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
