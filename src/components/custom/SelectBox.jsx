import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SelectBox = ({ value, setValue, options, placeholder, className }) => {
  return (
    <div>
      <Select value={value} onValueChange={(value) => setValue(value)}>
        <SelectTrigger
          postfix={<ChevronDown color="#7E808C" size={20} strokeWidth={2.5} />}
          className={`cursor-pointer space-x-6 data-[size=default]:h-11 focus:ring-0 focus:ring-offset-0 font-medium border border-[#F2F2F3]  text-[14px] text-[#717C88] rounded-[10px] ${className}`}
        >
          <SelectValue placeholder={placeholder ?? "Select"} />
        </SelectTrigger>
        <SelectContent className="rounded-[6px] bg-white border-none">
          {options.map((item, id) => (
            <SelectItem
              key={id}
              className="text-[#717C88] font-medium"
              value={item.value}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectBox;
