import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChangeEventHandler } from "react";
import { Question } from "./lead-form-questions";

export const LeadFormInput = (props: {
  question: Question;
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) => {
  const { question, value, onChange } = props;

  if (question.type === "checkbox") {
    const valueArray = (value as string).split(",");
    return (
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(question.options).map(([key, value]) => (
          <div key={key} className="flex items-center space-x-2">
            <Checkbox
              id={key}
              name={key}
              checked={
                Array.isArray(valueArray) ? valueArray.includes(key) : false
              }
              onCheckedChange={(checked) => {
                const newValue = (
                  valueArray.includes(key)
                    ? valueArray.filter((v) => v !== key)
                    : [...valueArray, key]
                ).join(",");

                onChange?.({
                  target: { value: newValue, checked },
                  currentTarget: { value: newValue, checked },
                } as any);
              }}
            />
            <Label
              htmlFor={key}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {value}
            </Label>
          </div>
        ))}
      </div>
    );
  }

  if (question.type === "radio") {
    return (
      <RadioGroup
        className="grid grid-cols-2 gap-4"
        value={value as string}
        onValueChange={(val) => onChange?.({ target: { value: val } } as any)}
      >
        {Object.entries(question.options).map(([key, value]) => (
          <div key={key} className="flex items-center space-x-2">
            <RadioGroupItem value={key} id={key} />
            <Label htmlFor="r1">{value}</Label>
          </div>
        ))}
      </RadioGroup>
    );
  }

  if (question.type === "select") {
    return (
      <Select
        value={typeof value === "string" ? value : ""}
        onValueChange={(val) => onChange?.({ target: { value: val } } as any)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(question.options).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
};
