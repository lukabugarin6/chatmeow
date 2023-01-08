import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useUser } from "./useUser";

export const useWorkspace = (workspaceId) => {
  const [user] = useAuthState(auth);
  const { loggedUserDetails } = useUser();

  const [workspaceDetails] = useDocument(
    workspaceId && db.collection('workspaces').doc(workspaceId)
  )

  const [adminsWorkspaces, adminsWorkspacesLoading, adminsWorkspacesError] =
    useCollection(
      user && db.collection("workspaces").where("admin", "==", user.uid)
    );

  const loggedInUserId = loggedUserDetails?.docs[0].id;
  const [membersWorkspaces, membersWorkspacesLoading, membersWorkspacesError] =
    useCollection(
      loggedUserDetails &&
        db.collection("users").doc(loggedInUserId).collection("workspaces")
    );

  const addWorkspace = () => {
    const workspaceName = prompt("please enter the workspace name");

    if (workspaceName) {
      db.collection("workspaces").add({
        name: workspaceName,
        admin: user.uid,
      });
    }
  };

  const addWorkspaceToUsersWorkspaces = () => {
    loggedUserDetails && workspaceDetails && db.collection("users").doc(loggedInUserId).collection("workspaces").add({
        id: workspaceDetails.id,
        name: workspaceDetails.data().name,
    })
  }

  return {
    adminsWorkspaces,
    adminsWorkspacesLoading,
    adminsWorkspacesError,
    membersWorkspaces,
    membersWorkspacesLoading,
    addWorkspace,
    workspaceDetails,
    addWorkspaceToUsersWorkspaces,
  };
};
