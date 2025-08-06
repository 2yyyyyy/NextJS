"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export type SortSelectProps = {
  options: SortSelectOption[];
  value: SortObject;
  onChange: (value: SortObject) => void;
};

type SortObject = {
  sortKey: string;
  sortValue: string;
};

export type SortSelectOption = {
  label: string;
  sortKey: string;
  sortValue: string;
};

const SortSelect = ({ options, value, onChange }: SortSelectProps) => {
  const handleSort = (compositeKey: string) => {
    const [sortKey, sortValue] = compositeKey.split("_");
    onChange({ sortKey, sortValue });
  };

  return (
    <Select
      defaultValue={value.sortKey + "_" + value.sortValue}
      onValueChange={handleSort}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort</SelectLabel>
          {options.map((option) => (
            <SelectItem
              key={option.sortKey + "_" + option.sortValue}
              value={option.sortKey + "_" + option.sortValue}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export { SortSelect };
