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

    const [adminsWorkspacesMembers, adminsWorkspacesLoadingMembers, adminsWorkspacesErrorMembers] =
    useCollection(
      user && db.collection("workspaces").where("admin", "==", user.uid)
    );

  const loggedInUserId = loggedUserDetails?.docs[0]?.id;
  const [membersWorkspaces, membersWorkspacesLoading, membersWorkspacesError] =
    useCollection(
      loggedUserDetails &&
        db.collection("users").doc(loggedInUserId).collection("workspaces")
    );

  const addWorkspace = async (workspaceName) => {
    if (workspaceName) {
      const addedWorkspace = await db.collection("workspaces").add({
        name: workspaceName,
        admin: user.uid,
      });

      return addedWorkspace;
    }
  };

  const addWorkspaceToUsersWorkspaces = () => {
    loggedUserDetails && workspaceDetails && db.collection("users").doc(loggedInUserId).collection("workspaces").add({
        id: workspaceDetails.id,
        name: workspaceDetails.data().name,
    })
  }

  const addInvitedEmailToWorkspace = async (id, memberMail) => {
    const foundUser = await db.collection('workspaces').doc(id).collection('invited_users').where('email', '==', memberMail).get();

    if (foundUser.empty && memberMail !== user.email) {
        db.collection('workspaces').doc(id).collection('invited_users').add({
            email: memberMail,
        })
    }
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
    addInvitedEmailToWorkspace,
  };
};
