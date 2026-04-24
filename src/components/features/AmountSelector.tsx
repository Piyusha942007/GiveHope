import React from "react";

interface AmountSelectorProps {
  amounts: number[];
  selectedAmount: number | null;
  onSelect: (amount: number) => void;
  onCustomChange: (value: string) => void;
  customAmount: string;
}

export const AmountSelector = ({
  amounts,
  selectedAmount,
  onSelect,
  onCustomChange,
  customAmount,
}: AmountSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {amounts.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => onSelect(amount)}
            className={`flex h-14 items-center justify-center rounded-lg border-2 font-bold transition-all ${
              selectedAmount === amount
                ? "border-primary bg-green-50 text-primary"
                : "border-gray-200 bg-white text-gray-600 hover:border-primary/50"
            }`}
          >
            ${amount}
          </button>
        ))}
      </div>
      
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
        <input
          type="number"
          placeholder="Custom Amount"
          value={customAmount}
          onChange={(e) => onCustomChange(e.target.value)}
          className="h-14 w-full rounded-lg border-2 border-gray-200 pl-8 pr-4 font-bold outline-none transition-all focus:border-primary"
        />
      </div>
    </div>
  );
};
