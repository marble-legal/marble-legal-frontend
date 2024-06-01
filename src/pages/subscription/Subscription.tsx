import HueBG from "../../assets/images/hue.png";
import { useViewportWidth } from "../../helpers/useViewportHeight";

export default function Subscription() {
  const viewWidth = useViewportWidth();

  return (
    <div
      className="md:h-[calc(100%)] grid items-center justify-center"
      style={
        viewWidth < 768
          ? { padding: "1rem" }
          : {
              backgroundImage: `url(${HueBG})`,
              backgroundSize: "auto",
              backgroundRepeat: "no-repeat",
              backgroundPosition: " bottom center",
            }
      }
    >
      <div className="md:-mt-[3.125rem] mt-[3.5rem]">
        <div className="mb-3 justify-center gap-[1.25rem] grid">
          <h1 className="text-center font-[700] text-[1.75rem] font-outfit">
            Choose a plan
          </h1>
        </div>
        <div className="mt-3 mb-[2.5rem]">
          <p className="leading-[150%] text-[#888] text-[0.875rem] max-w-[430px] text-center mx-auto">
            Select a plan that fits your needs and enjoy a 7-day free trial.
          </p>
        </div>
        <div className="flex flex-row flex-wrap max-w-[850px] gap-4"></div>
      </div>
    </div>
  );
}
