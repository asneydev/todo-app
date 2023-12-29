"use client";
import { Select, SelectItem } from "@nextui-org/react";

const priorities = [
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "Height", value: "Height" },
];

const todoTypes = [
  { label: "All", value: "All" },
  { label: "Done", value: "Done" },
  { label: "To-Do", value: "To-Do" },
];

export default function Filters() {
  return (
    <div className="flex row gap-5 my-5">
      <Select label="Priority" placeholder="Select a priority" size="sm">
        {priorities.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </Select>
      <Select
        label="Todo state"
        placeholder="Select a type"
        size="sm"
        defaultSelectedKeys={["All"]}
      >
        {todoTypes.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
