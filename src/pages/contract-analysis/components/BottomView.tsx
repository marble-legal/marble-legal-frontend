import { ContractList } from "../ContractList";

export function BottomView({ list, onSelect, selectedContract }) {
  return (
    <ContractList
      list={list}
      onSelect={onSelect}
      selectedContract={selectedContract}
    />
  );
}
