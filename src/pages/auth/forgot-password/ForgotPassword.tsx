import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { Layout } from "../../../components/Layout";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import LayoutImg from "../../../assets/images/form-header.png";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPasswordForm = () => {
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
        <ForgotPasswordFormContent />
      </Formik>
    </Layout>
  );
};

const ForgotPasswordFormContent = () => {
  const { isValid, isSubmitting } = useFormikContext();

  return (
    <div className="grid items-center h-full justify-center">
      <div className="grid bg-white p-[1.5rem] rounded-[24px] lg:w-[420px] w-[calc(100vw-2rem)]">
        <Form className="grid gap-[1.5rem]">
          <div className="text-center grid gap-2">
            <div>
              <img
                src={LayoutImg}
                alt="layout"
                className="w-full mx-auto"
                loading="lazy"
              />
              <h1 className="text-[1.5rem]">Forgot your password?</h1>
            </div>
            <h2 className="text-[0.875rem] text-[#888] flex gap-[0.375rem] justify-self-center font-[500]">
              Enter your email address to reset your password. We'll send you a
              link to reset your password.
            </h2>
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
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
