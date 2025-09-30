import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import React from "react";

interface SearchBarProps {
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({ onInput }: SearchBarProps) => {
  return (
    <IconField iconPosition="left" className="mr-1 max-w-64 hidden lg:flex">
      <InputIcon className="pi pi-search"> </InputIcon>
      <InputText placeholder="Search" onInput={onInput}  />
    </IconField>
  );
}