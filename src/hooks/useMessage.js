import { auth, db } from "../firebase";
import firebase from "firebase/compat/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

export const useMessage = (workspaceId, roomId) => {
  const [user] = useAuthState(auth);

  const [roomMessages, roomMessagesLoading] = useCollection(
    workspaceId &&
      roomId &&
      db
        .collection("workspaces")
        .doc(workspaceId)
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  const sendMessage = (message) => {
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add({
        message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user.displayName,
        userImage: user.photoURL,
      });
  };
  return {
    sendMessage,
    roomMessages,
    roomMessagesLoading,
  };
};
