import React, { useRef } from "react";
import styled from "styled-components";
import { db, provider } from "../firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
  enterRoom,
  enterWorkspace,
  selectRoomId,
  selectWorkspaceId,
} from "../features/appSlice";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";

function Header() {
  const inputRef = useRef(null);
  const [user, loadingState] = useAuthState(auth);

  const [workspaces, workspacesLoading, workspacesError] = useCollection(
    user && db.collection("workspaces").where('admin', '==', user.uid)
  );

  const workspaceId = useSelector(selectWorkspaceId);
  const roomId = useSelector(selectRoomId);
  const [workspaceDetails] = useDocument(
    workspaceId && db.collection("workspaces").doc(workspaceId)
  );
  const [workspaceRooms] = useCollection(
    workspaceId &&
      roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );
  const [roomMessages] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );
  const dispatch = useDispatch();


  const [rooms, roomsLoading, roomsError] = useCollection(
    db.collection("rooms")
  );

  const addUser = async (loggedUser) => {
    const foundUser = await db.collection('users').where('uid', '==', loggedUser.uid).get();

    if (foundUser.empty) {
      db.collection('users').add({
        uid: loggedUser.uid,
        displayName: loggedUser.displayName,
        email: loggedUser.email,
        photoURL: loggedUser.photoURL,
      })
    } else {
      console.log('user already exist');
    }
  }

  // const addWorkspace = () => {
  //   const workspaceName = prompt("please enter the workspace name");

  //   if (workspaceName) {
  //     db.collection("workspaces").add({
  //       name: workspaceName,
  //       admin: user.uid,
  //     });
  //   }
  // };

  const addRoom = () => {
    const channelName = prompt("please enter the chanel name");

    if (channelName) {
      db.collection("rooms").add({
        name: channelName,
      });
    }
  };

  const selectWorkspace = (id) => {
    if (id) {
      dispatch(enterWorkspace(id));
    }
  };

  const selectChannel = (id) => {
    if (id) {
      dispatch(enterRoom(id));
    }
  };

  const sendMessage = (e) => {
    // TODO channel id
    e.preventDefault();

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: inputRef.current.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });

    inputRef.current.value = "";
  };

  return (
    <HeaderContainer>
      {!user ? (
        <LoginScreen />
        // <div>
        //   <button
        //     onClick={async (e) => {
        //       e.preventDefault();
        //       auth
        //         .signInWithPopup(provider)
        //         .then((res) => {
        //           addUser(res.user);
        //         })
        //         .catch((error) => alert(error.message));
        //     }}
        //   >
        //     login
        //   </button>
        // </div>
      ) : (
        <div>
          <h2>Workspaces</h2>
          {/* <button onClick={addWorkspace}>Add Workspace</button> */}
          {workspaces?.docs.map((doc) => (
            <Link to={doc.id} key={doc.id} onClick={() => {
              selectWorkspace(doc.id);
            }}>        
                {doc.data().name}
            </Link>
          ))}
          {/* <h2>Rooms</h2>
          <button onClick={addRoom}>Add Room</button>

          <img src={user?.photoURL ?? ''} />
      
          <form>
            <input ref={inputRef} type="text" placeholder="test" />
            <button type="submit" onClick={sendMessage}>
              SEND
            </button>
          </form> */}

          {/* <div style={{ marginTop: 50 }}>{roomDetails?.data().name}</div>
          <div>
            <ul style={{ marginTop: 50 }}>
              {roomMessages?.docs.map((doc) => {
                console.log(doc.data().message);
                return (
                  <li>
                    {doc.data().message}{" "}
                    <span>{doc.data().timestamp?.toDate().toUTCString()}</span>
                  </li>
                );
              })}
              <li></li>
            </ul>
          </div> */}
          <button onClick={() => auth.signOut()}>log out</button>
        </div>
      )}
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  color: red;
`;
