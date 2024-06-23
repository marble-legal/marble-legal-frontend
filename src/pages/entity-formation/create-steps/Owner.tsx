import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";
import * as Yup from "yup";
// import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import clsx from "clsx";
import { CreateEntityFooter } from "../CreateEntity";
import { BusinessEntityCreation } from "../../../types/business-entity.types";

export function OwnerQuestions({
  onBack,
  onNext,
  formData,
}: {
  onBack: () => void;
  onNext: (data: Partial<BusinessEntityCreation>) => void;
  formData: Partial<BusinessEntityCreation>;
}) {
  const validationSchema = Yup.object().shape({
    owners: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Owner name is required"),
        address: Yup.string().required("Address is required"),
        interest: Yup.number()
          .required("Ownership interest is required")
          .min(0, "Ownership interest must be greater than or equal to 0")
          .max(100, "Ownership interest must be less than or equal to 100"),
        initialContribution: Yup.number()
          .required("Initial contribution is required")
          .min(0, "Initial contribution must be greater than or equal to 0"),
      })
    ),
    isInvestorsUsCitizen: Yup.boolean().required(
      "Please specify if all owners are U.S. citizens"
    ),
    isRestrictionsOnTransfer: Yup.boolean().required(
      "Please specify if there are any transfer restrictions"
    ),
    restrictionsOnTransferDetail: Yup.string().nullable(),
    isProfitsLossSharedEqually: Yup.boolean().required(
      "Please specify if profits and losses will be shared equally"
    ),
  });
  const initialValues = {
    owners: [
      {
        name: "",
        address: "",
        interest: "",
        initialContribution: "",
      },
    ],
    isInvestorsUsCitizen: false,
    isRestrictionsOnTransfer: false,
    restrictionsOnTransferDetail: "",
    isProfitsLossSharedEqually: false,
  };

  const questions = [
    {
      label: "Are all of the initial investor/owners U.S. citizens?",
      valueKey: "isInvestorsUsCitizen",
    },
    {
      label:
        "Do you want there to be any restrictions on transfers or sales of owner's interests?",
      valueKey: "isRestrictionsOnTransfer",
      additionalContent: (
        values: Partial<BusinessEntityCreation>,
        setValues: any
      ): React.ReactNode => (
        <textarea
          className="w-full h-[100px] border-[1px] border-solid border-[#E2E2E2] rounded-[10px] p-4 text-[0.875rem] font-[500] font-[Inter] leading-[18px] bg-transparent"
          placeholder="Describe here"
          name="restrictionsOnTransferDetail"
          value={values.restrictionsOnTransferDetail}
          onChange={(e) =>
            setValues({
              ...values,
              restrictionsOnTransferDetail: e.target.value,
            })
          }
        />
      ),
    },
    {
      label: "Will profits and losses be shared equally amongst the owners?",
      valueKey: "isProfitsLossSharedEqually",
    },
  ];

  const ownerFields = [
    {
      label: "Owner name",
      placeholder: "Enter owner name",
      name: "name",
      type: "text",
    },
    {
      label: "Address",
      placeholder: "Enter address",
      name: "address",
      type: "text",
    },
    {
      label: "Ownership interest (%)",
      placeholder: "Enter ownership interest",
      name: "interest",
      type: "number",
    },
    {
      label: "Initial contribution (U.S. Dollars or Equivalent)",
      placeholder: "Enter initial contribution",
      name: "initialContribution",
      type: "number",
    },
  ];

  return (
    <Formik
      initialValues={formData.owners ? formData : initialValues}
      validationSchema={validationSchema}
      isInitialValid={
        formData.clients
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
          <div className="md:w-[700px] w-full mx-auto overflow-auto pr-4">
            <h1 className="create-entity-title">Ownership Questions</h1>
            <FieldArray name="owners">
              {({ push, remove }) => (
                <div className="flex flex-col w-full md:gap-[1.5rem] gap-6 md:mt-[2.5rem] mt-6">
                  {values?.owners?.map((owner, index) => (
                    <div key={index} className="flex flex-col gap-4">
                      <h2 className="font-[600] text-[1rem] text-[#808080] items-center gap-1 flex flex-row uppercase">
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
                        Owner/Investor #{index + 1}
                      </h2>
                      <div className="w-full md:grid md:grid-cols-2 gap-[1.25rem] flex flex-row flex-wrap">
                        {ownerFields.map((field) => (
                          <div className="input-container">
                            <label
                              className="label"
                              htmlFor={`owners.${index}.${field.name}`}
                            >
                              {field.label}
                            </label>

                            <Field
                              key={field.name}
                              name={`owners.${index}.${field.name}`}
                              id={`owners.${index}.${field.name}`}
                              placeholder={field.placeholder}
                              className="input"
                            />
                            <span className="error">
                              <ErrorMessage
                                name={`owners.${index}.${field.name}`}
                              />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Add another Owner */}
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
                    className="text-[#B85042] text-[1rem] font-[600] text-start w-fit"
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

          <CreateEntityFooter onBack={onBack} isValid={isValid} />
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
