import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "./firebase";
import LoginScreen from "./screens/LoginScreen";
import WorkspacesScreen from "./screens/WorkspacesScreen";
import WorkspaceInviteScreen from "./screens/WorkspaceInviteScreen";
import CreateNewWorkspaceScreen from "./screens/CreateNewWorkspaceScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import WorkspaceScreen from "./screens/WorkspaceScreen";
import { Toaster } from "react-hot-toast";

function App() {
  const [user] = useAuthState(auth);
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
              <Route
                path={"/invite/:id"}
                key={doc.id}
                element={
                  <ProtectedRoute>
                    <WorkspaceInviteScreen doc={doc} />
                  </ProtectedRoute>
                }
              />
            ))}
            <Route
              path="/:workspaceId"
              element={
                <ProtectedRoute>
                  <WorkspaceScreen />
                </ProtectedRoute>
              }
            >
              <Route
                path=":roomId"
                element={
                  <ProtectedRoute>
                    <WorkspaceScreen />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="/create-new"
              element={
                <ProtectedRoute>
                  <CreateNewWorkspaceScreen />
                </ProtectedRoute>
              }
            />
          </Routes>
        </>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
