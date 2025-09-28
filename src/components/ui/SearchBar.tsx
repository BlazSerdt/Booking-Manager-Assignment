import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";

export const SearchBar = () => {
  return (
    <IconField iconPosition="left" className="mr-1">
      <InputIcon className="pi pi-search"> </InputIcon>
      <InputText placeholder="Search" />
    </IconField>
  );
}