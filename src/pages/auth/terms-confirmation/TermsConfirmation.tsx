import { PopupModal } from "../../../components/PopupModal";
import Button from "../../../components/Button";

export function TermsConfirmation({
  onConfirm,
  isSaving,
}: {
  onConfirm: () => void;
  isSaving: boolean;
}) {
  return (
    <PopupModal
      contentClassName="md:w-[562px] mx-auto !gap-0 !p-0"
      onClose={() => {}}
    >
      <div className="p-6 bg-white rounded-xl flex-col justify-start items-start gap-6 flex">
        <div className="flex-col justify-start items-start gap-3 flex">
          <div className="text-black text-xl font-semibold leading-snug">
            Please review and accept the Terms & Conditions
          </div>
          <div className="self-stretch text-black text-[15px] font-normal leading-normal">
            Marble Legal Solutions Inc provides self-help services at your
            specific direction. We are not a law firm or a substitute for an
            attorney or law firm. Communications between you and Marble Legal
            Solutions Inc are protected by our Privacy Policy but not by the
            attorney-client privilege or as work product. We cannot provide any
            kind of advice, explanation, opinion, or recommendation about
            possible legal rights, remedies, defenses, options, selection of
            forms, or strategies. Your access to our website is subject to our
            Terms of Service.
          </div>
        </div>
        <Button
          className="w-full"
          onClick={onConfirm}
          loading={isSaving}
          disabled={isSaving}
        >
          I accept the terms & conditions
        </Button>
      </div>
    </PopupModal>
  );
}
