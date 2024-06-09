import { FieldArray, Form, Formik } from "formik";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";
import * as Yup from "yup";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import clsx from "clsx";

export function OwnerQuestions({ onBack }: { onBack: () => void }) {
  const validationSchema = Yup.object().shape({
    owners: Yup.array().of(
      Yup.object().shape({
        ownerName: Yup.string().required("Owner name is required"),
        address: Yup.string().required("Address is required"),
        ownershipInterest: Yup.number()
          .required("Ownership interest is required")
          .min(0, "Ownership interest must be greater than or equal to 0")
          .max(100, "Ownership interest must be less than or equal to 100"),
        initialContribution: Yup.number()
          .required("Initial contribution is required")
          .min(0, "Initial contribution must be greater than or equal to 0"),
      })
    ),
    usCitizens: Yup.boolean().required(
      "Please specify if all owners are U.S. citizens"
    ),
    transferRestrictions: Yup.boolean().required(
      "Please specify if there are any transfer restrictions"
    ),
    transferRestrictionsDescription: Yup.string().nullable(),
    sharedProfitsAndLosses: Yup.boolean().required(
      "Please specify if profits and losses will be shared equally"
    ),
  });
  const initialValues = {
    owners: [
      {
        ownerName: "",
        address: "",
        ownershipInterest: 0,
        initialContribution: 0,
      },
    ],
    usCitizens: false,
    transferRestrictions: false,
    transferRestrictionsDescription: "",
    sharedProfitsAndLosses: false,
  };

  const questions = [
    {
      label: "Are all of the initial investor/owners U.S. citizens?",
      valueKey: "usCitizens",
      additionalContent: null,
    },
    {
      label:
        "Do you want there to be any restrictions on transfers or sales of owner's interests?",
      valueKey: "transferRestrictions",
      additionalContent: (values, setValues) => (
        <textarea
          className="w-full h-[100px] border-[1px] border-solid border-[#E2E2E2] rounded-[10px] p-4 text-[0.875rem] font-[500] font-[Inter] leading-[18px] bg-transparent"
          placeholder="Describe here"
          name="transferRestrictionsDescription"
          value={values.transferRestrictionsDescription}
          onChange={(e) =>
            setValues({
              ...values,
              transferRestrictionsDescription: e.target.value,
            })
          }
        />
      ),
    },
    {
      label: "Will profits and losses be shared equally amongst the owners?",
      valueKey: "sharedProfitsAndLosses",
      additionalContent: null,
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
              Ownership Questions
            </h1>
            <FieldArray name="owners">
              {({ push, remove }) => (
                <div className="flex flex-col w-full gap-[1.5rem] mt-[2.5rem]">
                  {values.owners.map((owner, index) => (
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
                        Owner/Investor {index + 1}
                      </h2>
                      <div className="w-full grid grid-cols-2 gap-[1.25rem]">
                        <FormField
                          label="Owner name"
                          placeholder="Enter owner name"
                          name={`owners[${index}].ownerName`}
                          type="text"
                          noIcon
                        />
                        <FormField
                          label="Address"
                          placeholder="Enter address"
                          name={`owners[${index}].address`}
                          type="text"
                          noIcon
                        />
                        <FormField
                          label="Ownership interest (%)"
                          placeholder="Enter ownership interest"
                          name={`owners[${index}].ownershipInterest`}
                          type="number"
                          noIcon
                        />
                        <FormField
                          label="Initial contribution (U.S. Dollars or Equivalent)"
                          placeholder="Enter initial contribution"
                          name={`owners[${index}].initialContribution`}
                          type="number"
                          noIcon
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({
                        ownerName: "",
                        address: "",
                        ownershipInterest: 0,
                        initialContribution: 0,
                      })
                    }
                    className={clsx(
                      "text-[#B85042] text-[1rem] font-[600] text-start w-fit",
                      {
                        hidden: values.owners.length >= 2,
                      }
                    )}
                  >
                    + Add another
                  </button>
                </div>
              )}
            </FieldArray>

            <div className="mt-[2.5rem] flex flex-col gap-[2.5rem]">
              {questions.map((question) => (
                <QuestionBlock
                  key={question.label}
                  label={question.label}
                  value={values[question.valueKey]}
                  onChange={(value) =>
                    setValues({ ...values, [question.valueKey]: value })
                  }
                  name={question.valueKey}
                  additionalContent={question.additionalContent?.(
                    values,
                    setValues
                  )}
                />
              ))}
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

function QuestionBlock({
  label,
  value,
  onChange,
  options = ["Yes", "No"],
  name,
  additionalContent,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  options?: string[];
  name: string;
  additionalContent?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[1.125rem]">
      <label htmlFor={name} className="create-entity-label">
        {label}
      </label>
      <div className="flex flex-row gap-3">
        {options.map((option, index) => (
          <Button
            key={option}
            variant="outline"
            className={clsx("!w-[120px] create-entity-button", {
              "create-entity-button-active": value === (index === 0),
            })}
            onClick={() => onChange(index === 0)}
          >
            {option}
          </Button>
        ))}
      </div>
      {additionalContent && value && additionalContent}
    </div>
  );
}
