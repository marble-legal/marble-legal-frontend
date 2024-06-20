import Button from "../../../components/Button";

export function WelcomeStep({ nextStep }: { nextStep: () => void }) {
  return (
    <div className="w-full h-full items-center justify-center flex flex-col max-w-[540px] mx-auto">
      <h1 className="font-outfit text-[1.75rem] font-[600] mb-5 text-start w-full">
        Apply for an entity
      </h1>
      <p className="text-[1rem] font-[400] leading-[150%]">
        Please complete the Business Formation Client Intake Form to the best of
        your knowledge. I ask that you provide as much detail as possible so
        that I can accurately evaluate your situation and properly advise you
        regarding your options. All information provided on this Intake Form
        will be held in strict confidence. <br />
        <br /> When filling out this Intake Form please use full legal names and
        make sure that the names of any party or entity listed are spelled
        correctly. If more space is needed, please feel free to attach
        additional pages as necessary. If you are unsure about how to answer
        some of the questions, simply indicate on the form that you would like
        to discuss the subject matter at our initial consultation.
      </p>

      <div className="my-6 border-b-solid border-b-[1px] border-b-[#CCCFE5] w-full"></div>

      <Button className="ml-auto float-end" onClick={nextStep}>
        Continue
      </Button>
    </div>
  );
}
