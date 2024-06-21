import { Form, Formik } from "formik";
import * as Yup from "yup";
import { CreateEntityFooter } from "../CreateEntity";
import { api } from "../../../helpers/api";
import { BusinessEntityCreation } from "../../../types/business-entity.types";
import { ShowToast } from "../../../components/toast";
import { useState } from "react";

export function ManagementQuestions({
  onBack,
  updateFormData,
  formData,
  closeModal,
  setStep,
  refetchEntities,
}: {
  onBack: () => void;
  updateFormData: (data: any) => Partial<BusinessEntityCreation>;
  formData: BusinessEntityCreation;
  closeModal: () => void;
  setStep: (step: number) => void;
  refetchEntities: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const validationSchema = Yup.object().shape({
    managementDetail: Yup.string().required(
      "Please select a business entity type"
    ),
    signingResposibility: Yup.string().required(
      "Please select a business entity type"
    ),
    powersDetail: Yup.string().required("Please enter a name"),
    initialOfficers: Yup.string().required("Please enter a name"),
  });
  const initialValues = {
    managementDetail: "",
    signingResposibility: "",
    powersDetail: "",
    initialOfficers: "",
  };

  const fields = [
    {
      label:
        "Will all owners/members/partners manage the business or will a single member perform this duty?",
      name: "managementDetail",
      placeholder: "Describe here",
    },
    {
      label:
        "Who will be responsible for signing documents on behalf of the business?",
      name: "signingResposibility",
      placeholder: "Describe here",
    },
    {
      label:
        "Will all owners/members/partners be able to enter into contracts, open and close accounts, deposit or withdraw funds, and engage the services of other professionals or will a single member have these powers? If a single member or members, please identify.",
      name: "powersDetail",
      placeholder: "Describe here",
    },
    {
      label:
        "If forming a corporation, do you know who the initial officers will be (President, Secretary, Treasurer, etc.)? If yes, please identify.",
      name: "initialOfficers",
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
      onSubmit={(values: Partial<BusinessEntityCreation>, { resetForm }) => {
        // console.log(values);
        //  updateFormData(values);
        setSaving(true);
        api
          .createEntity({
            ...values,
            ...formData,
          })
          .then(() => {
            ShowToast({
              message: "Entity created successfully",
              type: "success",
            });
            closeModal();
            resetForm();
            setStep(0);
            refetchEntities();
          })
          .catch((err) => {
            ShowToast({
              message: err?.response?.data?.message || "Error creating entity",
              type: "error",
            });
          })
          .finally(() => {
            setSaving(false);
          });
      }}
    >
      {({ values, isValid, setValues }) => (
        <Form className="w-full md:h-[calc(100%-48px)] h-[calc(100%-8px)] flex flex-col gap-[2.75rem] justify-between">
          <div className="md:w-[700px] w-full mx-auto overflow-auto pr-4">
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

          <CreateEntityFooter
            saving={saving}
            onBack={onBack}
            isValid={isValid}
          />
        </Form>
      )}
    </Formik>
  );
}
