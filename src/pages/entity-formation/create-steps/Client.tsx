import { FieldArray, Form, Formik } from "formik";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";
import * as Yup from "yup";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import clsx from "clsx";

export function ClientInformation({ onBack }: { onBack: () => void }) {
  const validationSchema = Yup.object().shape({
    clients: Yup.array().of(
      Yup.object().shape({
        fullName: Yup.string().required("Full Legal Name is required"),
        address: Yup.string().required("Home address is required"),
        phoneNumber: Yup.string()
          .required("Phone number is required")
          .matches(/^[0-9]+$/, "Phone number must be digits only"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
      })
    ),
  });
  const initialValues = {
    clients: [{ fullName: "", address: "", phoneNumber: "", email: "" }],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, isValid }) => (
        <Form className="w-full h-[calc(100%-48px)] flex flex-col gap-[2.75rem] justify-between">
          <div className="w-[540px] mx-auto">
            <h1 className="font-[600] text-[1.75rem] mt-[1.875rem] font-outfit">
              Client Information
            </h1>
            <FieldArray name="clients">
              {({ push, remove }) => (
                <div className="flex flex-col w-full gap-[2.75rem] mt-[2.75rem]">
                  {values.clients.map((client, index) => (
                    <div key={index} className="flex flex-col gap-4">
                      <h2 className="font-[600] text-[1rem] text-[#808080] items-center gap-1 flex flex-row">
                        {index !== 0 ? (
                          <button
                            type="button"
                            onClick={() => {
                              remove(index);
                            }}
                          >
                            <DeleteIcon />
                          </button>
                        ) : null}
                        Client {index + 1}
                      </h2>
                      <FormField
                        label="Full Legal Name"
                        placeholder="Enter your full legal name"
                        name={`clients[${index}].fullName`}
                        type="text"
                        noIcon
                      />
                      <FormField
                        label="Home address"
                        placeholder="Enter your home address"
                        name={`clients[${index}].address`}
                        type="text"
                        noIcon
                      />
                      <FormField
                        label="Phone number"
                        placeholder="Enter your phone number"
                        name={`clients[${index}].phoneNumber`}
                        type="text"
                        noIcon
                      />
                      <FormField
                        label="Email"
                        placeholder="Enter your email address"
                        name={`clients[${index}].email`}
                        type="email"
                        noIcon
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({
                        fullName: "",
                        address: "",
                        phoneNumber: "",
                        email: "",
                      })
                    }
                    className={clsx(
                      "text-[#B85042] text-[1rem] font-[600] text-start w-fit",
                      {
                        hidden: values.clients.length >= 2,
                      }
                    )}
                  >
                    + Add another
                  </button>
                </div>
              )}
            </FieldArray>
          </div>
          <div className="sticky bottom-0 right-0 w-full p-4 border-t-solid border-t-[1px] bg-[#F2F5FB]">
            <div className="float-end gap-3 flex flex-row">
              <Button
                variant="ghost"
                className="bg-[#F8E3E3] text-[#B94444] border-[#B85042] border-[1px] leading-[18px] hover:bg-[#F8E3E3]/70"
                onClick={onBack}
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={!isValid}
                className="leading-[18px]"
              >
                Continue
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
