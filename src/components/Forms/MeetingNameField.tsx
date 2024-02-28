import { EuiFieldText, EuiFormRow } from "@elastic/eui";
import React from "react";
import ThemeSelector from "../ThemeSelector";

function MeetingNameField({
  lable,
  placeholder,
  value,
  setMeetingName,
  isInvalid,
  error,
}: {
  lable: string;
  placeholder: string;
  value: string;
  setMeetingName: React.Dispatch<React.SetStateAction<string>>;
  isInvalid: boolean;
  error: Array<string>
}) {
  return (
    <ThemeSelector>
      <EuiFormRow label={lable} isInvalid={isInvalid} error={error}>
        <EuiFieldText
          placeholder={placeholder}
          value={value}
          onChange={(e) => setMeetingName(e.target.value)}
          isInvalid={isInvalid}
        />
      </EuiFormRow>
    </ThemeSelector>
  );
}

export default MeetingNameField;
