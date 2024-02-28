import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from "@elastic/eui";
import { dash1, dash2, dash3 } from "../assests/export";
import Header from "../components/Header";

function Dashboard() {
    useAuth();
    const navigate = useNavigate();
  
    return (
      <>
        <div
          style={{
            display: "flex",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <Header />
          <EuiFlexGroup
            justifyContent="center"
            alignItems="center"
            style={{ margin: "5vh 10vw" }}
          >
            <EuiFlexItem>
              <EuiCard
                icon={<EuiImage src={dash1} alt="icon" size="5rem" />}
                title={`Create Meeting`}
                description="Create a new meeting and invite people."
                onClick={() => navigate("/create")}
                paddingSize="xl"
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiCard
                icon={<EuiImage src={dash2} alt="icon" size="100%" />}
                title={`My Meetings`}
                description="View your created meetings."
                onClick={() => navigate("/mymeetings")}
                paddingSize="xl"
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiCard
                icon={<EuiImage src={dash3} alt="icon" size="5rem" />}
                title={`Meetings`}
                description="View the meetings that you are invited to."
                onClick={() => navigate("/meetings")}
                paddingSize="xl"
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </>
    );
  }
  
  export default Dashboard;