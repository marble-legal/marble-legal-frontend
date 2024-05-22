import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { Layout } from "../../../components/Layout";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import LayoutImg from "../../../assets/images/form-header.png";
import { useState } from "react";
import { ReactComponent as SuccessIcon } from "../../../assets/icons/check-mark.svg";
import CustomButton from "../../../components/Button";
import { api } from "../../../helpers/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow.svg";

const validationSchema = Yup.object().shape({
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

const ResetPasswordForm = () => {
  const [success, setSuccess] = useState(false);
  return (
    <Layout>
      <Formik
        initialValues={{ email: "", password: "" }}
        isInitialValid={false}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          // update values to include token from query params
          const resetPasswordToken = new URLSearchParams(
            window.location.search
          ).get("token");
          const updatedValues = { ...values, resetPasswordToken };
          api
            .resetPassword(updatedValues)
            .then(() => {
              actions.setSubmitting(false);
              actions.resetForm();
              toast.success("Password changed successfully");
              setSuccess(true);
            })
            .catch(() => {
              toast.error("There was an error changing your password");
              actions.setSubmitting(false);
              actions.setSubmitting(false);
            });
        }}
      >
        {success ? <ResetPasswordSuccess /> : <ResetPasswordContent />}
      </Formik>
    </Layout>
  );
};

const ResetPasswordContent = () => {
  const { isValid, isSubmitting } = useFormikContext();

  return (
    <div className="grid items-center h-full justify-center relative">
      <Button
        variant="outline"
        className="absolute top-4 left-0"
        onClick={() => window.history.back()}
      >
        <div className="gap-1 flex items-center">
          <ArrowIcon />
          Back
        </div>
      </Button>
      <div className="grid bg-white p-[1.5rem] rounded-[24px] lg:w-[420px] w-[calc(100vw-2rem)]">
        <Form className="grid gap-[1.5rem]">
          <div className="text-center grid gap-3 mb-[0.5rem]">
            <div className="text-center grid gap-4">
              <div>
                <img
                  src={LayoutImg}
                  alt="layout"
                  className="w-full mx-auto"
                  loading="lazy"
                />
                <h1 className="text-[1.5rem] font-outfit font-[600] leading-[110%]">
                  Forgot your password?
                </h1>
              </div>
              <p className="font-[500] text-[0.875rem] text-[#666] leading-[110%]">
                Enter your register email below and we’ll send you a link to
                reset your password
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            <FormField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
            <FormField
              label="Confirm password"
              name="confirmPassword"
              type="password"
              placeholder="Enter your password again"
            />
          </div>
          <div className="grid gap-4">
            <Button
              className="w-full"
              type="submit"
              disabled={!isValid}
              loading={isSubmitting}
            >
              Recover my account
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

const ResetPasswordSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="grid items-center h-full justify-center">
      <div className="grid p-[1.5rem] rounded-[24px] lg:w-[500px] w-[calc(100vw-2rem)]">
        <div className="text-center grid gap-[1.5rem] mb-[0.5rem]">
          <SuccessIcon className="mx-auto" />
          <div className="grid gap-3">
            <h1 className="text-[1.5rem] font-outfit font-[600] leading-[110%]">
              Password changed
            </h1>
            <p className="font-[500] text-[0.875rem] text-[#666] leading-[160%] max-w-[420px]">
              Your password has been changed successfully
            </p>
          </div>
          <CustomButton
            className="w-fit mx-auto"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
