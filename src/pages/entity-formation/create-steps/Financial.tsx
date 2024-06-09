import { FieldArray, Form, Formik } from "formik";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";
import * as Yup from "yup";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import clsx from "clsx";

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
              <div className="flex flex-col gap-[1.125rem]">
                <label htmlFor="name" className="create-entity-label">
                  Will the business have its own bank accounts)? If yes, please
                  identify the type of accounts and the name of the institution
                  where the accounts will be located (if known).
                </label>
                <textarea
                  className="create-entity-textarea"
                  placeholder="Describe here"
                  name="account"
                  id="account"
                  value={values.account}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      account: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-[1.125rem]">
                <label htmlFor="name" className="create-entity-label">
                  Will the business have any loans or lines of credit? If yes,
                  please describe.
                </label>
                <textarea
                  className="create-entity-textarea"
                  placeholder="Describe here"
                  name="loans"
                  id="loans"
                  value={values.loans}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      loans: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-[1.125rem]">
                <label htmlFor="name" className="create-entity-label">
                  Who will be responsible for the accounting and financial
                  record keeping for the business? Please provide the name of
                  the individual or company.
                </label>
                <textarea
                  className="create-entity-textarea"
                  placeholder="Describe here"
                  name="accountant"
                  id="accountant"
                  value={values.accountant}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      accountant: e.target.value,
                    })
                  }
                />
              </div>
            </div>
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
