import { Field, FieldArray, Form, Formik, useFormikContext } from "formik";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";
import * as Yup from "yup";
import clsx from "clsx";
import { CreateEntityFooter } from "../CreateEntity";
import { BusinessEntityCreation } from "../../../types/business-entity.types";

export function ClientInformation({
  onBack,
  onNext,
  formData,
}: {
  onBack: () => void;
  onNext: (data: Partial<BusinessEntityCreation>) => void;
  formData: Partial<BusinessEntityCreation>;
}) {
  const validationSchema = Yup.object().shape({
    clients: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Full Legal Name is required"),
        address: Yup.string().required("Home address is required"),
        phone: Yup.string()
          .required("Phone number is required")
          .matches(/^[0-9]+$/, "Phone number must be digits only"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
      })
    ),
  });

  const initialValues = {
    clients: [
      {
        name: "",
        address: "",
        phone: "",
        email: "",
      },
    ],
  };

  return (
    <Formik
      initialValues={formData.clients ? formData : initialValues}
      validationSchema={validationSchema}
      isInitialValid={
        formData.clients
          ? validationSchema.isValidSync(formData)
          : validationSchema.isValidSync(initialValues)
      }
      onSubmit={(values: Partial<BusinessEntityCreation>) => {
        onNext(values);
      }}
    >
      <ClientForm onBack={onBack} />
    </Formik>
  );
}

function ClientForm({ onBack }: { onBack: () => void }) {
  const { values, isValid } = useFormikContext<any>();

  return (
    <Form className="w-full md:h-[calc(100%-48px)] h-[calc(100%-8px)] flex flex-col gap-[2.75rem] justify-between">
      <div className="md:w-[540px] w-full mx-auto">
        <h1 className="create-entity-title">Client Information</h1>
        <FieldArray name="clients">
          {({ push, remove }) => (
            <div className="flex flex-col w-full md:gap-[2.75rem] gap-6 md:mt-[2.75rem] mt-6">
              {values?.clients?.map((client, index) => (
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
                    Client #{index + 1}
                  </h2>
                  <div className="input-container">
                    <label className="label" htmlFor={`clients.${index}.name`}>
                      Full Legal Name
                    </label>
                    <Field
                      name={`clients.${index}.name`}
                      id={`clients.${index}.name`}
                      placeholder="Write here"
                      className="input"
                    />
                  </div>
                  <div className="input-container">
                    <label
                      className="label"
                      htmlFor={`clients.${index}.address`}
                    >
                      Home address
                    </label>
                    <Field
                      name={`clients.${index}.address`}
                      id={`clients.${index}.address`}
                      placeholder="Write here"
                      className="input"
                    />
                  </div>
                  <div className="input-container">
                    <label className="label" htmlFor={`clients.${index}.phone`}>
                      Phone number
                    </label>
                    <Field
                      name={`clients.${index}.phone`}
                      id={`clients.${index}.phone`}
                      placeholder="Write here"
                      className="input"
                    />
                  </div>
                  <div className="input-container">
                    <label className="label" htmlFor={`clients.${index}.email`}>
                      Email
                    </label>
                    <Field
                      name={`clients.${index}.email`}
                      id={`clients.${index}.email`}
                      placeholder="Write here"
                      className="input"
                    />
                  </div>
                </div>
              ))}

              {/* Add another client */}
              <button
                type="button"
                onClick={() =>
                  push({
                    name: "",
                    address: "",
                    phone: "",
                    email: "",
                  })
                }
                className={clsx(
                  "text-[#B85042] text-[1rem] font-[600] text-start w-fit",
                  {
                    hidden: (values?.clients?.length ?? 0) >= 2,
                  }
                )}
              >
                + Add another
              </button>
            </div>
          )}
        </FieldArray>
      </div>
      <CreateEntityFooter onBack={onBack} isValid={isValid} />
    </Form>
  );
}
