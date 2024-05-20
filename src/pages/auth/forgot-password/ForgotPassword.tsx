import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { Layout } from "../../../components/Layout";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import LayoutImg from "../../../assets/images/form-header.png";
import { useState } from "react";
import { ReactComponent as SuccessIcon } from "../../../assets/icons/check-mark.svg";
import CustomButton from "../../../components/Button";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPasswordForm = () => {
  const [success, setSuccess] = useState(true);

  return (
    <Layout>
      <Formik
        initialValues={{ email: "" }}
        isInitialValid={false}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log(values);
        }}
      >
        {success ? <ForgotPasswordSuccess /> : <ForgotPasswordFormContent />}
      </Formik>
    </Layout>
  );
};

const ForgotPasswordFormContent = () => {
  const { isValid, isSubmitting } = useFormikContext();

  return (
    <div className="grid items-center h-full justify-center">
      <div className="grid p-[1.5rem] rounded-[24px] lg:w-[500px] w-[calc(100vw-2rem)]">
        <Form className="grid gap-[1.5rem]">
          <div className="text-center grid gap-3 mb-[0.5rem]">
            <div className="text-center grid gap-4">
              <div>
                {/* <img
                src={LayoutImg}
                alt="layout"
                className="w-full mx-auto"
                loading="lazy"
              /> */}
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

const ForgotPasswordSuccess = () => {
  const { values }: { values: { email: string } } = useFormikContext();

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
              email ‘{values.email}’.
            </p>
          </div>
          <CustomButton className="w-fit mx-auto" onClick={() => {}}>
            Go to login
          </CustomButton>

          <h2 className="text-[0.875rem] text-[#888] flex gap-[0.375rem] justify-self-center font-[600]">
            Didn’t receive a link? <Button variant="link">Resend</Button>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
