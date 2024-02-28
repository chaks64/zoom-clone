import React, { useState } from "react";
import Header from "../components/Header";
import {
  EuiFlexGroup,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
} from "@elastic/eui";
import MeetingNameField from "../components/Forms/MeetingNameField";
import MeetingUsersField from "../components/Forms/MeetingUsersField";
import useAuth from "../hooks/useAuth";
import useFetchUsers from "../hooks/useFetchUsers";
import moment from "moment";
import MeetingDateField from "../components/Forms/MeetingDateField";
import CreateMeetingButton from "../components/Forms/CreateMeetingButton";
import { FieldErrorType, UserType } from "../utils/Types";
import { addDoc } from "firebase/firestore";
import { meetingRef } from "../utils/firebaseConfig";
import { generateMeetingID } from "../utils/generateMeeting";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";
import MeetingMaxUserField from "../components/Forms/MeetingMaxUserField";

function VideoConference() {
  useAuth();
  const navigate = useNavigate();
  const [createToast] = useToast();
  const uid = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.uid);
  const [users] = useFetchUsers();
  const [meetingName, setMeetingName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([]);
  const [startDate, setStartDate] = useState(moment());
  const [size, setSize] = useState(1);
  const [open, setOpen] = useState(false);

  const [showErrors, setShowErrors] = useState<{
    meetingName: FieldErrorType;
    meetingUsers: FieldErrorType;
  }>({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUsers: {
      show: false,
      message: [],
    },
  });

  const onUserChange = (selectedOptions: any) => {
    setSelectedUsers(selectedOptions);
  };

  const validateForm = () => {
    let errors = false;
    const clonnedShowErrors = { ...showErrors };
    if (!meetingName.length) {
      clonnedShowErrors.meetingName.show = true;
      clonnedShowErrors.meetingName.message = ["Please enter meeting name"];
      errors = true;
    } else {
      clonnedShowErrors.meetingName.show = false;
      clonnedShowErrors.meetingName.message = [];
    }

    if (!selectedUsers.length && !open) {
      clonnedShowErrors.meetingUsers.show = true;
      clonnedShowErrors.meetingUsers.message = ["Please select a user"];
      errors = true;
    } else {
      clonnedShowErrors.meetingUsers.show = false;
      clonnedShowErrors.meetingUsers.message = [];
    }
    setShowErrors(clonnedShowErrors);
    return errors;
  };

  const createMeeting = async () => {
    if (!validateForm()) {
      const meetingId = generateMeetingID();
      await addDoc(meetingRef, {
        createdBy: uid,
        meetingId,
        meetingName,
        meetingType: open ? "anyone-can-join" : "video-conference",
        invitedUsers: open
          ? []
          : selectedUsers.map((user: UserType) => user.uid),
        meetingDate: startDate.format("L"),
        maxUsers: open ? 100 : size,
        status: true,
      });
      createToast({
        title: open
          ? "Open meeting created successfully"
          : "Closed meeting created successfully",
        type: "success",
      });
      navigate("/");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <EuiFlexGroup justifyContent="center" alignItems="center">
        <EuiForm>
          <EuiFormRow display="columnCompressedSwitch" label="Open meeting">
            <EuiSwitch
              showLabel={false}
              checked={open}
              label="Open for all meeting"
              onChange={(e) => setOpen(e.target.checked)}
              //   compressed
            />
          </EuiFormRow>
          <MeetingNameField
            lable="Meeting Name"
            placeholder="Meeting name"
            value={meetingName}
            setMeetingName={setMeetingName}
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
          />
          {open ? (
            <MeetingMaxUserField value={size} setValue={setSize}/>
          ) : (
            <MeetingUsersField
              lable="Invite User"
              options={users}
              onChange={onUserChange}
              selectedOptions={selectedUsers}
              singleSelection={false}
              isClearable={false}
              placeholder="Select a user"
              isInvalid={showErrors.meetingUsers.show}
              error={showErrors.meetingUsers.message}
            />
          )}

          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiSpacer />
          <CreateMeetingButton createMeeting={createMeeting} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
}

export default VideoConference;
