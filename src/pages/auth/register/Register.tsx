import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../helpers/api";
import { ShowToast } from "../../../components/toast";
import { Layout } from "../../../components/Layout";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import { SocialLogin } from "../../../components/SocialLogin";
import LayoutImg from "../../../assets/images/form-header.png";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../helpers/useDebounce";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Name is required"),
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
          api
            .checkEmail(values.email)
            .then(() => {
              api
                .register(values)
                .then((res) => {
                  actions.setSubmitting(false);
                  actions.resetForm();
                  ShowToast({
                    type: "success",
                    message: "Registration successful",
                  });
                  localStorage.setItem("token", res.data.accessToken);
                  localStorage.setItem("user", JSON.stringify(res.data));
                  navigate("/dashboard");
                })
                .catch(() => {
                  actions.setSubmitting(false);
                  ShowToast({
                    type: "error",
                    message: "There was an error registering.",
                  });
                });
            })
            .catch(() => {
              actions.setSubmitting(false);
              ShowToast({
                type: "error",
                message: "Email already exists.",
              });
            });
        }}
      >
        <RegisterFormContent />
      </Formik>
    </Layout>
  );
};

const RegisterFormContent = () => {
  const { isValid, isSubmitting } = useFormikContext<any>();
  const navigate = useNavigate();

  const handleGoogleLogin = async (response: any) => {
    const payload = {
      email: response.data.email,
      fullName: response.data.name,
      googleId: response.data.id,
      userType: "U",
    };

    api
      .register(payload)
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/home");
      })
      .catch(() => {
        ShowToast({
          type: "error",
          message: "There was an error registering.",
        });
      });
  };

  return (
    <div className="grid items-center h-full justify-center">
      <div className="grid p-[1.5rem] rounded-[24px] lg:w-[500px] w-[calc(100vw-2rem)]">
        <Form className="grid gap-[1.5rem] mb-[2.25rem]">
          <div className="text-center grid gap-3 mb-[0.5rem]">
            <div>
              <img
                src={LayoutImg}
                alt="layout"
                className="w-full mx-auto"
                loading="lazy"
              />
              <h1 className="text-[1.5rem] font-outfit font-[600] leading-[110%]">
                Create an account
              </h1>
            </div>
            <p className="font-[500] text-[0.875rem] text-[#666] leading-[110%]">
              Enter the details below
            </p>
          </div>
          <div className="grid gap-4">
            <FormField
              label="Full name"
              name="fullName"
              type="text"
              placeholder="Enter your name"
            />
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
          <h2 className="text-[0.875rem] text-[#888] flex gap-[0.375rem] justify-self-center font-[500]">
            Already have an account?{" "}
            <Link to="/login">
              <Button variant="link">Sign in</Button>
            </Link>
          </h2>
        </Form>

        <div className="text-center">
          <p className="text-[0.875rem] text-[#888]">
            By signing up you agree to our{" "}
            <Button
              variant="link"
              className="underline !font-[400] !text-[#666]"
            >
              Terms of Service
            </Button>{" "}
            and{" "}
            <Button
              variant="link"
              className="underline !font-[400] !text-[#666]"
            >
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
