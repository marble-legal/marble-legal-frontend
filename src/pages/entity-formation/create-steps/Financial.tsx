import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../../../components/Button";
import { CreateEntityFooter } from "../CreateEntity";

export function FinancialQuestions({ onBack }: { onBack: () => void }) {
  const validationSchema = Yup.object().shape({
    account: Yup.string().required("Please select a business entity type"),
    loans: Yup.string().required("Please select a business entity type"),
    accountant: Yup.string().required("Please enter a name"),
  });
  const initialValues = {
    account: "",
    loans: "",
    accountant: "",
  };

  const additionalFields = [
    {
      label:
        "Will the business have its own bank accounts? If yes, please identify the type of accounts and the name of the institution where the accounts will be located (if known).",
      name: "account",
      placeholder: "Describe here",
    },
    {
      label:
        "Will the business have any loans or lines of credit? If yes, please describe.",
      name: "loans",
      placeholder: "Describe here",
    },
    {
      label:
        "Who will be responsible for the accounting and financial record keeping for the business? Please provide the name of the individual or company.",
      name: "accountant",
      placeholder: "Describe here",
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      isInitialValid={false}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, isValid, setValues }) => (
        <Form className="w-full h-[calc(100%-48px)] flex flex-col gap-[2.75rem] justify-between">
          <div className="w-[700px] mx-auto">
            <h1 className="font-[600] text-[1.75rem] mt-[1.875rem] font-outfit">
              Financial and accounting information
            </h1>

            <div className="mt-[2.5rem] flex flex-col gap-[2.5rem]">
              {additionalFields.map((field) => (
                <div key={field.name} className="flex flex-col gap-[1.125rem]">
                  <label htmlFor={field.name} className="create-entity-label">
                    {field.label}
                  </label>
                  <textarea
                    className="create-entity-textarea"
                    placeholder={field.placeholder}
                    name={field.name}
                    id={field.name}
                    value={values[field.name]}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        [field.name]: e.target.value,
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <CreateEntityFooter onBack={onBack} isValid={isValid} />
        </Form>
      )}
    </Formik>
  );
}
