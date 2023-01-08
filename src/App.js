import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "./firebase";
import {
  enterRoom,
  enterWorkspace,
  selectRoomId,
  selectWorkspaceId,
} from "./features/appSlice";
import { useDispatch, useSelector } from "react-redux";
import Workspace from "./components/Workspace";
import LoginScreen from "./screens/LoginScreen";
import WorkspacesScreen from "./screens/WorkspacesScreen";
import WorkspaceInviteScreen from "./screens/WorkspaceInviteScreen";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  const [user, loadingState] = useAuthState(auth);
  const workspaceId = useSelector(selectWorkspaceId);
  const [workspaces, workspacesLoading, workspacesError] = useCollection(
    user && db.collection("workspaces")
  );

  return (
    <div className="app">
      <Router>
        <>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <WorkspacesScreen />
                </ProtectedRoute>
              }
              exact
            />
            <Route path="/login" element={<LoginScreen />} />
            {workspaces?.docs.map((doc) => (
              <Route path={"/invite/:id"} element={<ProtectedRoute>
                <WorkspaceInviteScreen doc={doc} />
              </ProtectedRoute>} />
            ))}
          </Routes>
        </>
      </Router>
    </div>
  );
}

export default App;
