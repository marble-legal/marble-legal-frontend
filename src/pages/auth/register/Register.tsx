import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { setToken, setUser } from "../../../helpers/utils";
import { api } from "../../../helpers/api";
import { ShowToast } from "../../../components/toast";
import { Layout } from "../../../components/Layout";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import { SocialLogin } from "../../../components/SocialLogin";
import useViewportHeight from "../../../helpers/useViewportHeight";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/g,
      "Password must contain at least one uppercase and at least one lowercase letter and at least one special character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Formik
        initialValues={{ email: "", password: "" }}
        isInitialValid={false}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log(values);
        }}
      >
        <RegisterFormContent />
      </Formik>
    </Layout>
  );
};

const RegisterFormContent = () => {
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
        navigate("/dashboard");
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
      <div className="grid bg-white p-[1.5rem] rounded-[24px] lg:w-[420px] w-[calc(100vw-2rem)]">
        <Form className="grid gap-[1.5rem] mb-[1.5rem]">
          <div className="text-center grid gap-2">
            <h1 className="text-[1.5rem]">
              Welcome to{" "}
              <span className="text-primary font-[700]">Marble Legal</span>
            </h1>
            <h2 className="text-[0.875rem] text-[#888] flex gap-[0.375rem] justify-self-center font-[500]">
              Have an account?{" "}
              <Link to="/login">
                <Button variant="link">Sign in</Button>
              </Link>
            </h2>
          </div>
          <div className="grid gap-4">
            <FormField
              label="Full name"
              name="name"
              type="text"
              placeholder="Enter your name"
            />
            <FormField
              label="Email"
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
            <FormField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="grid gap-4">
            <Button
              className="w-full"
              type="submit"
              disabled={!isValid}
              loading={isSubmitting}
            >
              Sign up
            </Button>

            <div className="flex items-center justify-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="mx-2 text-sm text-gray-600">Or</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>

            <SocialLogin onGoogleLogin={handleGoogleLogin} />
          </div>
        </Form>

        <div className="text-center">
          <p className="text-[0.875rem] text-[#888]">
            By signing up you agree to our{" "}
            <Button variant="link" className="underline !font-[500]">
              Terms of Service
            </Button>{" "}
            and{" "}
            <Button variant="link" className="underline !font-[500]">
              Privacy Policy
            </Button>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
