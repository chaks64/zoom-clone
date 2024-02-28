import React from "react";
import { EuiComboBox, EuiFormRow } from "@elastic/eui";

function MeetingUsersField({
  lable,
  options,
  onChange,
  selectedOptions,
  isClearable,
  placeholder,
  singleSelection = false,
  isInvalid,
  error,
}: {
  lable: string;
  options: any;
  onChange: any;
  selectedOptions: any;
  isClearable: boolean;
  placeholder: string;
  singleSelection: any;
  isInvalid: boolean;
  error: Array<string>
}) {
  return (
      <EuiFormRow label={lable} isInvalid={isInvalid} error={error}>
        <EuiComboBox
          options={options}
          onChange={onChange}
          selectedOptions={selectedOptions}
          placeholder={placeholder}
          isClearable={isClearable}
          singleSelection={singleSelection}
          isInvalid={isInvalid}
        />
      </EuiFormRow>
  );
}

export default MeetingUsersField;
