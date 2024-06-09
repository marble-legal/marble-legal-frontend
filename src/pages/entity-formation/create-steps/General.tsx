import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../../../components/Button";
import clsx from "clsx";
import { CreateEntityFooter } from "../CreateEntity";

export function GeneralQuestions({ onBack }: { onBack: () => void }) {
  const validationSchema = Yup.object().shape({
    type: Yup.string().required("Please select a business entity type"),
    issues: Yup.array().of(Yup.string()).required("Please select an issue"),
    name: Yup.string().required("Please enter a name"),
    address: Yup.string().required("Please enter an address"),
    purpose: Yup.string().required("Please enter a purpose"),
    operation: Yup.string().required("Please enter an operation"),
    agent: Yup.string().required("Please enter an agent"),
    trademarks: Yup.string().required("Please enter a trademark"),
    license: Yup.string().required("Please enter a license"),
  });
  const initialValues = {
    type: "",
    issues: [] as string[],
    name: "",
    address: "",
    purpose: "",
    operation: "",
    agent: "",
    trademarks: "",
    license: "",
  };
  const businessEntities = [
    "Sole Proprietorship",
    "Limited Liability Company (LLC)",
    "General Partnership",
    "Limited Liability Partnership (LLP)",
    "Professional Limited Liability Company (PLLC)",
    "Corporation",
    "S Corporation",
    "Other",
    "Not Sure - Would like to discuss at initial consultation",
  ];
  const issues = [
    "Personal Liability and Asset Protection",
    "Simplicity",
    "Tax Implications",
    "Ability to sell or transfer your interest in the business",
  ];

  const fields = [
    {
      label:
        "Have you chosen a name for your business? Do you have an alternate name in case your first choice is not available? If yes please list name(s) exactly as you would like.",
      name: "name",
      placeholder: "Describe here",
    },
    {
      label:
        "What is the business address and will this be the principle place of business?",
      name: "address",
      placeholder: "Describe here",
    },
    {
      label: "What is the primary purpose of the business?",
      name: "purpose",
      placeholder: "Describe here",
    },
    {
      label: "In what state(s) will the business operate?",
      name: "operation",
      placeholder: "Describe here",
    },
    {
      label: "Who will serve as the registered agent for the business?",
      name: "agent",
      placeholder: "Describe here",
    },
    {
      label:
        "Will the business use trademarks or logos? If yes, please describe.",
      name: "trademarks",
      placeholder: "Describe here",
    },
    {
      label:
        "Will the business require any special licenses (i.e. liquor, gambling, etc.)? If yes, please describe.",
      name: "license",
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
            <h1 className="create-entity-title">General Questions</h1>

            {/* TYPE */}
            <div className="md:mt-[2.5rem] mt-6 flex flex-col md:gap-[2.5rem] gap-6">
              <div className="flex flex-col gap-[1.125rem]">
                <label htmlFor="usCitizens" className="create-entity-label">
                  Place a check next to the type of business entity that you
                  would like to create:
                </label>
                <div className="flex flex-row gap-3 flex-wrap">
                  {businessEntities.map((entity) => (
                    <Button
                      key={entity}
                      variant="outline"
                      className={clsx("create-entity-button", {
                        "create-entity-button-active": values.type === entity,
                      })}
                      onClick={() =>
                        setValues({
                          ...values,
                          type: entity,
                        })
                      }
                    >
                      {entity}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Issues Selection */}
              <div className="flex flex-col gap-[1.125rem]">
                <label htmlFor="usCitizens" className="create-entity-label">
                  Place a check next to any issues that are important to you in
                  choosing a business entity:
                </label>
                <div className="flex flex-row gap-3 flex-wrap">
                  {issues.map((issue) => (
                    <Button
                      key={issue}
                      variant="outline"
                      className={clsx("create-entity-button", {
                        "create-entity-button-active":
                          values.issues.includes(issue),
                      })}
                      onClick={() => {
                        setValues({
                          ...values,
                          issues: Array.isArray(values.issues)
                            ? values.issues.includes(issue)
                              ? values.issues.filter((i) => i !== issue)
                              : values.issues.concat(issue)
                            : [issue], // Ensure it's an array
                        });
                      }}
                    >
                      {issue}
                    </Button>
                  ))}
                </div>
              </div>

              {/* TextArea Fields */}
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
