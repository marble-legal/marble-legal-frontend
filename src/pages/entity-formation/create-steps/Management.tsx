import { Form, Formik } from "formik";
import * as Yup from "yup";
import { CreateEntityFooter } from "../CreateEntity";

export function ManagementQuestions({ onBack }: { onBack: () => void }) {
  const validationSchema = Yup.object().shape({
    manage: Yup.string().required("Please select a business entity type"),
    signing: Yup.string().required("Please select a business entity type"),
    contracts: Yup.string().required("Please enter a name"),
    officers: Yup.string().required("Please enter a name"),
  });
  const initialValues = {
    manage: "",
    signing: "",
    contracts: "",
    officers: "",
  };

  const fields = [
    {
      label:
        "Will all owners/members/partners manage the business or will a single member perform this duty?",
      name: "manage",
      placeholder: "Describe here",
    },
    {
      label:
        "Who will be responsible for signing documents on behalf of the business?",
      name: "signing",
      placeholder: "Describe here",
    },
    {
      label:
        "Will all owners/members/partners be able to enter into contracts, open and close accounts, deposit or withdraw funds, and engage the services of other professionals or will a single member have these powers? If a single member or members, please identify.",
      name: "contracts",
      placeholder: "Describe here",
    },
    {
      label:
        "If forming a corporation, do you know who the initial officers will be (President, Secretary, Treasurer, etc.)? If yes, please identify.",
      name: "officers",
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
        <Form className="w-full md:h-[calc(100%-48px)] h-[calc(100%-8px)] flex flex-col gap-[2.75rem] justify-between">
          <div className="md:w-[700px] w-full mx-auto">
            <h1 className="create-entity-title">Management consideration</h1>

            <div className="md:mt-[2.5rem] flex flex-col md:gap-[2.5rem] gap-6 mt-6">
              {fields.map((field) => (
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
