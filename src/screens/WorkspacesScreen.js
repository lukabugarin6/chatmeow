import React from "react";
import Wrapper from "../components/Wrapper";
import Overlay from "../components/Overlay";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import WorkspaceItem from "../components/WorkspaceItem";
import styled from "styled-components";
import Button from "../components/Button";
import { useWorkspace } from "../hooks/useWorkspace";
import { useNavigate } from "react-router-dom";

function WorkspacesScreen({ doc }) {
  const navigate = useNavigate();

  // user
  const [user, loadingState] = useAuthState(auth);
  const firstName = user.displayName.split(" ")[0];

  // workspaces
  const { adminsWorkspaces, membersWorkspaces } = useWorkspace();

  return (
    <Wrapper bgImg="/images/chatmeowbg2.png">
      <Overlay
        maxWidth={760}
        heading={`Hey ${firstName}`}
        subheading={(adminsWorkspaces?.docs.length > 0 || membersWorkspaces?.docs.length > 0) && "Here are your available workspaces"}
      >
        <WorkspacesWrapper>
          {adminsWorkspaces?.docs.map((doc) => {
            console.log(doc.data());
            return (
              <WorkspaceItem key={doc.id} onClick={() => navigate(`/${doc.id}`)} name={doc.data().name} />
            )
          })}
          {membersWorkspaces?.docs.map((doc) => (
            <WorkspaceItem key={doc.id} onClick={() => navigate(`/${doc.id}`)} name={doc.data().name} />
          ))}
        </WorkspacesWrapper>
        <Button onClick={() => {
          navigate('/create-new')
        }}>
          Create new workspace
        </Button>
      </Overlay>
      <Button
        style={{
          position: 'fixed',
          top: 10,
          right: 10
        }}
        onClick={() => auth.signOut() }
      >
        Logout
      </Button>
    </Wrapper>
  );
}

const WorkspacesWrapper = styled.div`
  width: 100%;
  max-width: 530px;
  overflow-y: auto;
  margin-top: 40px;
  max-height: 300px;
  padding-bottom: 10px;
  padding-right: 10px;
  margin-bottom: 30px;
`

export default WorkspacesScreen;
