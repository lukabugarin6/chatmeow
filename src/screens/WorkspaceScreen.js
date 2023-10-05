import { useParams } from "react-router-dom";
import styled from "styled-components";
import Input from "../components/Input";
import Messages from "../components/Messages";
import Sidebar from "../components/Sidebar";
import { useWorkspace } from "../hooks/useWorkspace";

function WorkspaceScreen() {
  const { workspaceId, roomId } = useParams();

  const { workspaceDetails } = useWorkspace(workspaceId);
  return (
    <Wrapper>
      <Sidebar workspaceDetails={workspaceDetails} />
      {!roomId ? (
        <LogoWrapper>
          {" "}
          <LogoImage src="/images/chatmeowlogo.png" />
        </LogoWrapper>
      ) : (
        <Messages />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const LogoImage = styled.img`
  max-width: 156px;
  max-height: 158px;
`;

export default WorkspaceScreen;
