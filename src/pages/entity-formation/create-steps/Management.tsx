import { FieldArray, Form, Formik } from "formik";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";
import * as Yup from "yup";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import clsx from "clsx";

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
              Management consideration
            </h1>

            <div className="mt-[2.5rem] flex flex-col gap-[2.5rem]">
              <div className="flex flex-col gap-[1.125rem]">
                <label htmlFor="manage" className="create-entity-label">
                  Will all owners/members/partners manage the business or will a
                  single member perform this duty?
                </label>
                <textarea
                  className="create-entity-textarea"
                  placeholder="Describe here"
                  name="manage"
                  id="manage"
                  value={values.manage}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      manage: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-[1.125rem]">
                <label htmlFor="signing" className="create-entity-label">
                  Who will be responsible for signing documents on behalf of the
                  business?
                </label>
                <textarea
                  className="create-entity-textarea"
                  placeholder="Describe here"
                  name="signing"
                  id="signing"
                  value={values.signing}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      signing: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-[1.125rem]">
                <label htmlFor="contracts" className="create-entity-label">
                  Will all owners/members/partners be able to enter into
                  contracts, open and close accounts, deposit or withdraw funds,
                  and engage the services of other professionals or will a
                  single member have these powers? If a single member or
                  members, please identify.
                </label>
                <textarea
                  className="create-entity-textarea"
                  placeholder="Describe here"
                  name="contracts"
                  id="contracts"
                  value={values.contracts}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      contracts: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-[1.125rem]">
                <label htmlFor="officers" className="create-entity-label">
                  If forming a corporation, do you know who the initial officers
                  will be (President, Secretary, Treasurer, etc.)? If yes,
                  please identify.
                </label>
                <textarea
                  className="create-entity-textarea"
                  placeholder="Describe here"
                  name="officers"
                  id="officers"
                  value={values.officers}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      officers: e.target.value,
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
