import React, { useEffect, useRef } from "react";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  enterRoom,
  enterWorkspace,
  selectRoomId,
  selectWorkspaceId,
} from "../features/appSlice";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Workspace({ doc }) {
  const [user, loadingState] = useAuthState(auth);
  const navigate = useNavigate();
  const { id: workspaceId } = useParams();
  const inviteInputRef = useRef(null);
  const [workspaceDetails, workspaceDetailsLoading] = useDocument(
    workspaceId && db.collection("workspaces").doc(workspaceId)
  );
  const [isInvited, isInvitedLoading] = useCollection(
    workspaceId && user &&
      db
        .collection("workspaces")
        .doc(workspaceId)
        .collection('invited_users')
        .where("email", "==", user.email)
  );

  const isAdmin = workspaceDetails?.data().admin === user.uid;

  const addInviteToUser = async (id) => {
    const foundInvitedUser = await db
      .collection("workspaces")
      .doc(id)
      .collection("invited_users")
      .where("email", "==", inviteInputRef.current.value)
      .get();

    if (foundInvitedUser.empty) {
      db.collection("workspaces").doc(id).collection("invited_users").add({
        email: inviteInputRef.current.value,
      });
    } else {
      alert("user already invited");
    }
  };

  const joinWorkspace = () => {
    // Add user to workspace members

    // Add workspace to users workspaces

    // Delete user from workspace invitd users
  }

  useEffect(() => {
    if (isInvited?.empty && !isAdmin) {
        navigate('/');
    }
  }, [isInvited, isAdmin])

  return workspaceDetailsLoading ? (
    <div>loading...</div>
  ) : (
    <div>
      <h1>{doc.data().name}</h1>
      {isAdmin ? (
        <form>
          <input ref={inviteInputRef} placeholder="invite user" />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              addInviteToUser(doc.id);
            }}
            hidden
          />
        </form>
      ) : ( 
        !isInvitedLoading && !isInvited?.empty &&
        <button onClick={joinWorkspace}>join workspace</button>
      )}
    </div>
  );
}

export default Workspace;
