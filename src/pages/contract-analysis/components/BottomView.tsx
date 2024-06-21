import { ContractList } from "../ContractList";

export function BottomView({ list, onSelect, selectedContract, isLoading }) {
  return (
    <ContractList
      list={list}
      onSelect={onSelect}
      selectedContract={selectedContract}
      isLoading={isLoading}
    />
  );
}
