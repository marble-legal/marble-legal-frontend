import FullScreenModal from "../../components/FullScreenModal";
import { EntityDetailsCard } from "./EntityFormation";
import { BusinessEntity } from "../../types/business-entity.types";
// import clsx from "clsx";

export default function EntityDetails({
  isOpen,
  handleClose,
  data,
}: {
  isOpen: boolean;
  handleClose: () => void;
  data: BusinessEntity;
}) {
  return (
    <FullScreenModal isOpen={isOpen} onClose={handleClose}>
      <div className="max-w-[800px] items-center justify-center flex flex-col w-full mx-auto gap-5 md:py-[2.625rem] p-2">
        <EntityDetailsCard data={data} />

        {/* Client Section */}
        <div className="entity-details-card">
          <h1 className="text-xl font-semibold">Client information</h1>
          {data?.clients?.map((client, index) => (
            <div key={index} className="entity-details-sub-card">
              <div className="entity-details-sub-title">
                Client {index + 1} Information
              </div>
              <div className="entity-details-rows">
                <div className="entity-details-label">Full legal name</div>
                <div className="entity-details-value">{client.name}</div>
                <div className="entity-details-label">Phone number</div>
                <div className="entity-details-value">{client.phone}</div>
                <div className="entity-details-label">Home address</div>
                <div className="entity-details-value">{client.address}</div>
                <div className="entity-details-label">Email</div>
                <div className="entity-details-value">{client.email}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Owner Section */}
        <div className="entity-details-card">
          <h1 className="text-xl font-semibold">
            Owners/Investors information
          </h1>
          {data?.owners?.map((owner, index) => (
            <div key={index} className="entity-details-sub-card">
              <div className="entity-details-sub-title">
                Owner/Investor {index + 1} Information
              </div>
              <div className="entity-details-rows">
                <div className="entity-details-label">Full legal name</div>
                <div className="entity-details-value">{owner.name}</div>
                <div className="entity-details-label">Home address</div>
                <div className="entity-details-value">{owner.address}</div>
                <div className="entity-details-label">
                  Ownership interest (%)
                </div>
                <div className="entity-details-value">{owner.interest}%</div>
                <div className="entity-details-label">Initial contribution</div>
                <div className="entity-details-value">
                  ${owner.initialContribution}
                </div>
              </div>
            </div>
          ))}

          <div className="mt-2.5 flex flex-col gap-2.5">
            <div>
              <span className="font-bold">Q1)</span> Will profits and losses be
              shared equally amongst the owners?
            </div>
            <div className="entity-yes-no">
              {data?.isProfitsLossSharedEqually ? "Yes" : "No"}
            </div>
          </div>
          <div className="entity-hr" />
          <div className="flex flex-col gap-2.5">
            <div>
              <span className="font-bold">Q2)</span> Do you want there to be any
              restrictions on transfers or sales of owner's interests?
            </div>
            <div className="entity-yes-no">
              {data?.isRestrictionsOnTransfer ? "Yes" : "No"}
            </div>
            {data?.isRestrictionsOnTransfer && (
              <p className="text-sm leading-[160%]">
                {data?.restrictionsOnTransferDetail}
              </p>
            )}
          </div>
          <div className="entity-hr" />
          <div className="flex flex-col gap-2.5">
            <div>
              <span className="font-bold">Q3)</span> Are all of the initial
              investor/owners U.S. citizens?
            </div>
            <div className="entity-yes-no">
              {data?.isInvestorsUsCitizen ? "Yes" : "No"}
            </div>
          </div>
        </div>

        {/* General Section */}
        <div className="entity-details-card">
          <h1 className="text-xl font-semibold">General information</h1>

          <div className="mt-2.5 flex flex-col gap-2.5">
            <div>
              <span className="font-bold">Q1)</span> Place a check next to the
              type of business entity that you would like to create:
            </div>
            <div className="entity-yes-no">{data?.type}</div>
          </div>
          <div className="entity-hr" />
          <div className="mt-2.5 flex flex-col gap-2.5">
            <div>
              <span className="font-bold">Q2)</span> Place a check next to any
              issues that are important to you in choosing a business entity:
            </div>
            <div className="flex flex-row flex-wrap gap-4">
              {data?.issues?.map((issue, index) => (
                <div key={index} className="entity-yes-no">
                  {issue}
                </div>
              ))}
            </div>
          </div>
          <div className="entity-hr" />
          <div className="flex flex-col gap-2.5">
            <div>
              <span className="font-bold">Q3)</span> Have you chosen a name for
              your business? Do you have an alternate name in case your first
              choice is not available? If yes please list name(s) exactly as you
              would like.
            </div>
            <div className="entity-details-p">{data?.name}</div>
          </div>
          <div className="entity-hr" />
          <div className="flex flex-col gap-2.5">
            <div>
              <span className="font-bold">Q4)</span> What is the business
              address and will this be the principle place of business?
            </div>
            <div className="entity-details-p">{data?.address}</div>
          </div>
          <div className="entity-hr" />
          <div className="flex flex-col gap-2.5">
            <div>
              <span className="font-bold">Q5)</span> What is the primary purpose
              of the business?
            </div>
            <div className="entity-details-p">{data?.purpose}</div>
          </div>
          <div className="entity-hr" />
          <div className="flex flex-col gap-2.5">
            <div>
              <span className="font-bold">Q6)</span> In what state(s) will the
              business operate?
            </div>
            <div className="entity-details-p">{data?.state}</div>
          </div>
          <div className="entity-hr" />
          <div className="flex flex-col gap-2.5">
            <div>
              <span className="font-bold">Q7)</span> Who will serve as the
              registered agent for the business?
            </div>
            <div className="entity-details-p">{data?.agent}</div>
          </div>
          <div className="entity-hr" />
          <div className="flex flex-col gap-2.5">
            <div>
              <span className="font-bold">Q8)</span> Will the business use
              trademarks or logos? If yes, please describe.
            </div>
            <div className="entity-details-p">{data?.useTrademark}</div>
          </div>
          <div className="entity-hr" />
          <div className="flex flex-col gap-2.5">
            <div>
              <span className="font-bold">Q9)</span> Will the business require
              any special licenses (i.e. liquor, gambling, etc.)? If yes, please
              describe.
            </div>
            <div className="entity-details-p">{data?.specialLicenses}</div>
          </div>
        </div>

        {/* Financial Section */}
        <div className="entity-details-card">
          <h1 className="text-xl font-semibold">Financial information</h1>

          <div className="mt-2.5 flex flex-col gap-2.5">
            <div>
              <span className="font-bold">Q1)</span> Will the business have its
              own bank account(s)? If yes, please identify the type of accounts
              and the name of the institution where the accounts will be located
              (if known).
            </div>
            <div className="entity-details-p">{data?.bankAccountType}</div>
          </div>
          <div className="entity-hr" />
          <div className="mt-2.5 flex flex-col gap-2.5">
            <div>
              <span className="font-bold">Q2)</span> Have you taken out any
              loans to pay for startup costs of the business? If yes, please
              describe the nature of the loan and identify the institution that
              holds the loan.
            </div>
            <div className="entity-details-p">{data?.loanDetail}</div>
          </div>
          <div className="entity-hr" />
          <div className="flex flex-col gap-2.5">
            <div>
              <span className="font-bold">Q3)</span> Does the business have an
              accountant? If yes, please provide the name and contact
              information for the accountant.
            </div>
            <div className="entity-details-p">{data?.accountantDetail}</div>
          </div>
        </div>

        {/* Management Section */}
        <div className="entity-details-card">
          <h1 className="text-xl font-semibold">Management information</h1>

          <div className="mt-2.5 flex flex-col gap-2.5">
            <div>
              <span className="font-bold">Q1)</span> Will all
              owners/members/partners manage the business or will a single
              member perform this duty?
            </div>
            <div className="entity-details-p">{data?.managementDetail}</div>
          </div>
          <div className="entity-hr" />
          <div className="mt-2.5 flex flex-col gap-2.5">
            <div>
              <span className="font-bold">Q2)</span> Who will be responsible for
              signing documents on behalf of the business?
            </div>
            <div className="entity-details-p">{data?.signingResposibility}</div>
          </div>
          <div className="entity-hr" />
          <div className="flex flex-col gap-2.5">
            <div>
              <span className="font-bold">Q3)</span> Will all
              owners/members/partners be able to enter into contracts, open and
              close accounts, deposit or withdraw funds, and engage the services
              of other professionals, or will a single member have these powers?
              If a single member or members, please identify.
            </div>
            <div className="entity-details-p">{data?.powersDetail}</div>
          </div>
          <div className="entity-hr" />
          <div className="flex flex-col gap-2.5">
            <div>
              <span className="font-bold">Q4)</span> If forming a corporation,
              do you know who the initial officers will be (President,
              Secretary, Treasurer, etc.)? If yes, please identify.
            </div>
            <div className="entity-details-p">{data?.initialOfficers}</div>
          </div>
        </div>
      </div>
    </FullScreenModal>
  );
}
