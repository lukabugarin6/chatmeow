// import { useEffect, useState } from "react"
import { db } from "../firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useWorkspace } from "./useWorkspace";

export const useUser = (userId, workspaceId) => {
    const [ user ] = useAuthState(auth);

    const [invitedUser, invitedUserLoading] = useCollection(
      workspaceId && user && db.collection('workspaces').doc(workspaceId).collection('invited_users').where('email', '==', user.email)
    )

    const [loggedUserDetails] = useCollection(
      user && db.collection('users').where('uid', '==', user.uid)
    )

    const addUser = async (loggedUser) => {
        const foundUser = await db.collection('users').where('uid', '==', loggedUser.uid).get();
    
        if (foundUser.empty) {
          db.collection('users').add({
            uid: loggedUser.uid,
            displayName: loggedUser.displayName,
            email: loggedUser.email,
            photoURL: loggedUser.photoURL,
          })
        }
      }

      const addUserToWorkspacesMembers = () => {
        workspaceId && db.collection("workspaces").doc(workspaceId).collection("members").add({
            uid: user.uid,
        })
      }

      const deleteUserFromWorkspacesInvitedMember = async () => {
        const foundInvitedUser = await db.collection("workspaces").doc(workspaceId).collection("invited_users").where('email', '==', user.email).get();

        if (!foundInvitedUser.empty) {
          foundInvitedUser.docs[0].ref.delete();
        }
      }

    return {
        addUser,
        loggedUserDetails,
        addUserToWorkspacesMembers,
        deleteUserFromWorkspacesInvitedMember,
        invitedUser,
        invitedUserLoading,
    }
}