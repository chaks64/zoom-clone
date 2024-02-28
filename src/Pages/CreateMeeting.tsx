import React from "react";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from "@elastic/eui";
import { meeting1, meeting2 } from "../assests/export";
import { useNavigate } from "react-router-dom";

function CreateMeeting() {
  useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        style={{ margin: "5vh 10vw" }}
      >
        <EuiFlexItem>
          <EuiCard
            icon={<EuiImage src={meeting1} alt="icon" size="5rem" />}
            title={`Create 1:1 Meeting`}
            description="Create a personal 1:1 meeting"
            onClick={() => navigate("/create1on1")}
            paddingSize="xl"
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            icon={<EuiImage src={meeting2} alt="icon" size="5rem" />}
            title={`Create group Meeting`}
            description="Invite multiple to the meeting"
            onClick={() => navigate("/videoconference")}
            paddingSize="xl"
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
}

export default CreateMeeting;
