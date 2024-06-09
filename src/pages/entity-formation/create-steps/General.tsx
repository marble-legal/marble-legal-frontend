import { FieldArray, Form, Formik } from "formik";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";
import * as Yup from "yup";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import clsx from "clsx";

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
              General Questions
            </h1>

            <div className="mt-[2.5rem] flex flex-col gap-[2.5rem]">
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
              <div className="flex flex-col gap-[1.125rem]">
                <label htmlFor="name" className="create-entity-label">
                  Have you chosen a name for your business? Do you have an
                  alternate name in case your first choice is not available? If
                  yes please list name(s) exactly as you would like.
                </label>
                <textarea
                  className="create-entity-textarea"
                  placeholder="Describe here"
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-[1.125rem]">
                <label htmlFor="address" className="create-entity-label">
                  What is the business address and will this be the principle
                  place of business?
                </label>
                <textarea
                  className="create-entity-textarea"
                  placeholder="Describe here"
                  name="address"
                  id="address"
                  value={values.address}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-[1.125rem]">
                <label htmlFor="purpose" className="create-entity-label">
                  What is the primary purpose of the business?
                </label>
                <textarea
                  className="create-entity-textarea"
                  placeholder="Describe here"
                  name="purpose"
                  id="purpose"
                  value={values.purpose}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      purpose: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-[1.125rem]">
                <label htmlFor="operation" className="create-entity-label">
                  In what state(s) will the business operate?
                </label>
                <textarea
                  className="create-entity-textarea"
                  placeholder="Describe here"
                  name="operation"
                  id="operation"
                  value={values.operation}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      operation: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-[1.125rem]">
                <label htmlFor="agent" className="create-entity-label">
                  Who will serve as the registered agent for the business?
                </label>
                <textarea
                  className="create-entity-textarea"
                  placeholder="Describe here"
                  name="agent"
                  id="agent"
                  value={values.agent}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      agent: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-[1.125rem]">
                <label htmlFor="trademarks" className="create-entity-label">
                  Will the business use trademarks or logos? If yes, please
                  describe.
                </label>
                <textarea
                  className="create-entity-textarea"
                  placeholder="Describe here"
                  name="trademarks"
                  id="trademarks"
                  value={values.trademarks}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      trademarks: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-[1.125rem]">
                <label htmlFor="license" className="create-entity-label">
                  Will the business require any special licenses (i.e. liquor,
                  gambling, etc.)? If yes, please describe.
                </label>
                <textarea
                  className="create-entity-textarea"
                  placeholder="Describe here"
                  name="license"
                  id="license"
                  value={values.license}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      license: e.target.value,
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
