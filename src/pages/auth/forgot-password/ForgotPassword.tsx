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
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPasswordForm = () => {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <Layout>
      <Formik
        initialValues={{ email: "" }}
        isInitialValid={false}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          api
            .forgotPassword(values)
            .then(() => {
              setEmail(values.email); // Save email for success component
              toast.success("Reset password link sent!");
              actions.setSubmitting(false);
              actions.resetForm();
              setSuccess(true);
            })
            .catch((err) => {
              console.log(err);
              toast.error(
                err.response?.data?.message ||
                  "There was an error sending the reset password link"
              );

              actions.setSubmitting(false);
            });
        }}
      >
        {success ? (
          <ForgotPasswordSuccess email={email} />
        ) : (
          <ForgotPasswordFormContent />
        )}
      </Formik>
    </Layout>
  );
};

const ForgotPasswordFormContent = () => {
  const { isValid, isSubmitting } = useFormikContext();

  return (
    <div className="grid items-center h-full justify-center relative">
      <Button
        variant="outline"
        className="absolute top-4 md:left-0 left-4"
        onClick={() => window.history.back()}
      >
        <div className="gap-1 flex items-center">
          <ArrowIcon />
          Back
        </div>
      </Button>
      <div className="grid p-[1.5rem] rounded-[24px] lg:w-[500px] w-[calc(100vw-2rem)]">
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
              label="Email address"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="grid gap-4">
            <Button
              className="w-full"
              type="submit"
              disabled={!isValid}
              loading={isSubmitting}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

const ForgotPasswordSuccess = ({ email }: { email: string }) => {
  const navigate = useNavigate();
  const resendForgotPasswordLink = () => {
    api
      .forgotPassword({ email })
      .then(() => {
        toast.success("Reset password link sent!");
      })
      .catch(() => {
        toast.error("There was an error sending the reset password link");
      });
  };

  return (
    <div className="grid items-center h-full justify-center">
      <div className="grid p-[1.5rem] rounded-[24px] lg:w-[500px] w-[calc(100vw-2rem)]">
        <div className="text-center grid gap-[1.5rem] mb-[0.5rem]">
          <SuccessIcon className="mx-auto" />
          <div className="grid gap-3">
            <h1 className="text-[1.5rem] font-outfit font-[600] leading-[110%]">
              Reset password link sent!
            </h1>
            <p className="font-[500] text-[0.875rem] text-[#666] leading-[160%] max-w-[420px]">
              Please check your email. We’ve sent a reset password link to your
              email ‘{email}’.
            </p>
          </div>
          <CustomButton
            className="w-fit mx-auto"
            onClick={() => {
              // Redirect to login
              navigate("/login");
            }}
          >
            Go to login
          </CustomButton>

          <h2 className="text-[0.875rem] text-[#888] flex gap-[0.375rem] justify-self-center font-[600]">
            Didn’t receive a link?{" "}
            <Button variant="link" onClick={resendForgotPasswordLink}>
              Resend
            </Button>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
