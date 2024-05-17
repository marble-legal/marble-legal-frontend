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
import Checkbox from "../../../components/Checkbox";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const LoginForm = () => {
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
        <LoginFormContent />
      </Formik>
    </Layout>
  );
};

const LoginFormContent = () => {
  const { isValid, isSubmitting } = useFormikContext();
  const navigate = useNavigate();

  return (
    <div className="grid items-center h-full justify-center">
      <div className="grid bg-white p-[1.5rem] rounded-[24px] lg:w-[420px] w-[calc(100vw-2rem)]">
        <Form className="grid gap-[1.5rem]">
          <div className="text-center grid gap-2">
            <h1 className="text-[1.5rem]">Restore your account</h1>
            <h2 className="text-[0.875rem] text-[#888] flex gap-[0.375rem] justify-self-center font-[500]">
              Please enter your email here.
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

export default LoginForm;
