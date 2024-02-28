import React, { useEffect, useState } from "react";
import { FieldErrorType, MeetingType, UserType } from "../utils/Types";
import useFetchUsers from "../hooks/useFetchUsers";
import moment from "moment";
import useAuth from "../hooks/useAuth";
import useToast from "../hooks/useToast";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../utils/firebaseConfig";
import { EuiFlyout, EuiFlyoutBody, EuiFlyoutHeader, EuiForm, EuiFormRow, EuiSpacer, EuiSwitch, EuiTitle } from "@elastic/eui";
import MeetingDateField from "./Forms/MeetingDateField";
import MeetingNameField from "./Forms/MeetingNameField";
import MeetingMaxUserField from "./Forms/MeetingMaxUserField";
import MeetingUsersField from "./Forms/MeetingUsersField";
import CreateMeetingButton from "./Forms/CreateMeetingButton";

export default function EditFlyout({
  close,
  meeting,
}: {
  close: any;
  meeting: MeetingType;
}) {
  useAuth();
  const [createToast] = useToast();
//   const uid = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.uid);
  const [users] = useFetchUsers();
  const [meetingName, setMeetingName] = useState(meeting.meetingName);
  const [meetingType] = useState(meeting.meetingType);
  const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([]);
  const [startDate, setStartDate] = useState(moment(meeting.meetingDate));
  const [size, setSize] = useState(1);
  const [status, setStatus] = useState(false);

  const [showErrors] = useState<{
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

  useEffect(() =>{
    if(users){
        const foundUsers: Array<UserType> = []
        meeting?.invitedUsers.forEach((user: string) =>{
            const findUser = users.find(
                (tempUser: UserType) => tempUser.uid === user
            );
            if(findUser) foundUsers.push(findUser);
        });
        setSelectedUsers(foundUsers)
    }
  },[meeting?.invitedUsers, users])

  const onUserChange = (selectedOptions: any) => {
    setSelectedUsers(selectedOptions);
  };

  const editMeeting = async () => {
    const editedMeeting = {
      ...meeting,
      meetingName,
      meetingType,
      invitedUsers: selectedUsers.map((user: UserType) => user.uid),
      maxUsers: size,
      meetingDate: startDate.format("L"),
      status: !status,
    };
    delete editedMeeting.docId;
    const docRef = doc(firebaseDB, "meetings", meeting.docId!);
    await updateDoc(docRef, editedMeeting);
    createToast({ title: "Meeting updated successfully.", type: "success" });
    close(true);
  };

  return (
    <EuiFlyout ownFocus onClose={() => close()}>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2>{meeting.meetingName}</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiForm>
          <MeetingNameField
            lable="Meeting name"
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
            placeholder="Meeting name"
            value={meetingName}
            setMeetingName={setMeetingName}
          />
          {meetingType === "anyone-can-join" ? (
            <MeetingMaxUserField value={size} setValue={setSize}/>
          ) : (
            <MeetingUsersField
              lable="Invite Users"
              isInvalid={showErrors.meetingUsers.show}
              error={showErrors.meetingUsers.message}
              options={users}
              onChange={onUserChange}
              selectedOptions={selectedUsers}
              singleSelection={
                meetingType === "1-on-1" ? { asPlainText: true } : false
              }
              isClearable={false}
              placeholder="Select a Users"
            />
          )}
          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiFormRow display="columnCompressedSwitch" label="Cancel Meeting">
            <EuiSwitch
              showLabel={false}
              label="Cancel Meeting"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
          </EuiFormRow>
          <EuiSpacer />
          <CreateMeetingButton createMeeting={editMeeting} isEdit close={close}/>
        </EuiForm>
      </EuiFlyoutBody>
    </EuiFlyout>
  );
}
