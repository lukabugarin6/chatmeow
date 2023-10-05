import Wrapper from "../components/Wrapper";
import Overlay from "../components/Overlay";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useParams, useLocation, Navigate } from "react-router-dom";
import { useWorkspace } from "../hooks/useWorkspace";
import Button from "../components/Button";
import { useUser } from "../hooks/useUser";
import LoadingScreen from "./LoadingScreen";

function WorkspaceInviteScreen() {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const firstName = user.displayName.split(" ")[0];
  let location = useLocation();

  const { workspaceDetails, addWorkspaceToUsersWorkspaces } = useWorkspace(id);
  const {
    addUserToWorkspacesMembers,
    deleteUserFromWorkspacesInvitedMember,
    invitedUser,
    invitedUserLoading,
  } = useUser(null, workspaceDetails?.id);

  const acceptInvite = () => {
    // write user to workspace members
    addUserToWorkspacesMembers();

    // delete user from workspaces invited_members
    deleteUserFromWorkspacesInvitedMember();

    // write workspace to users workspaces
    addWorkspaceToUsersWorkspaces();
  };

  if (invitedUserLoading) {
    return <LoadingScreen />
  }

  if (invitedUser?.docs.length === 0) {
    return <Navigate to="/" state={{ from: location}} replace />
  }


  return (
    <Wrapper bgImg="/images/chatmeowbg4.png">
      <Overlay
        heading={`Hey ${firstName}`}
        subheading={`You’ve been invited to join ${
          workspaceDetails?.data().name
        } workspace.`}
      >
        <Button style={{ marginTop: 20 }} onClick={acceptInvite}>
          Accept
        </Button>
      </Overlay>
    </Wrapper>
  );
}

export default WorkspaceInviteScreen;
