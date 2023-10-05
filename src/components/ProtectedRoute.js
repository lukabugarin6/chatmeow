import { Navigate, useLocation } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import LoadingScreen from "../screens/LoadingScreen";

const ProtectedRoute = ({ children }) => {
    const [user, userLoading] = useAuthState(auth);
    let location = useLocation();

    if (userLoading) {
        return <LoadingScreen />
    }

    if(!user) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }

    return children
};

export default ProtectedRoute;