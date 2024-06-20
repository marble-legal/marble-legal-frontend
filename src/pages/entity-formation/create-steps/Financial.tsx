import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../../../components/Button";
import { CreateEntityFooter } from "../CreateEntity";
import { BusinessEntityCreation } from "../../../types/business-entity.types";

export function FinancialQuestions({
  onBack,
  onNext,
  formData,
}: {
  onBack: () => void;
  onNext: (data: Partial<BusinessEntityCreation>) => void;
  formData: Partial<BusinessEntityCreation>;
}) {
  const validationSchema = Yup.object().shape({
    bankAccountType: Yup.string().required(
      "Please select a business entity type"
    ),
    loanDetail: Yup.string().required("Please select a business entity type"),
    accountantDetail: Yup.string().required("Please enter a name"),
  });
  const initialValues = {
    bankAccountType: "",
    loanDetail: "",
    accountantDetail: "",
  };

  const additionalFields = [
    {
      label:
        "Will the business have its own bank accounts? If yes, please identify the type of accounts and the name of the institution where the accounts will be located (if known).",
      name: "bankAccountType",
      placeholder: "Describe here",
    },
    {
      label:
        "Have you taken out any loans to pay for startup costs of the business? If yes, please describe the nature of the loan and identify the institution that holds the loan.",
      name: "loanDetail",
      placeholder: "Describe here",
    },
    {
      label:
        "Does the business have an accountant? If yes, please provide the name and contact information for the accountant.",
      name: "accountantDetail",
      placeholder: "Describe here",
    },
  ];

  return (
    <Formik
      initialValues={formData || initialValues}
      validationSchema={validationSchema}
      isInitialValid={
        formData
          ? validationSchema.isValidSync(formData)
          : validationSchema.isValidSync(initialValues)
      }
      onSubmit={(values: Partial<BusinessEntityCreation>) => {
        // console.log(values);
        onNext(values);
      }}
    >
      {({ values, isValid, setValues }) => (
        <Form className="w-full md:h-[calc(100%-48px)] h-[calc(100%-8px)] flex flex-col gap-[2.75rem] justify-between">
          <div className="md:w-[700px] w-full mx-auto">
            <h1 className="create-entity-title">
              Financial and accounting information
            </h1>

            <div className="md:mt-[2.5rem] mt-6 flex flex-col md:gap-[2.5rem] gap-6">
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
