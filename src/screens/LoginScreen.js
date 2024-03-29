import styled from "styled-components";
import { auth, provider } from "../firebase";
import { useUser } from "../hooks/useUser";
import Wrapper from "../components/Wrapper";
import Overlay from "../components/Overlay";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingScreen from "./LoadingScreen";

function LoginScreen() {
  const [user, userLoading] = useAuthState(auth);
  let location = useLocation();

  const { addUser } = useUser();
  const navigate = useNavigate();

  if (userLoading) {
    return <LoadingScreen />
  }

  if (user) {
    return <Navigate to={'/'} state={{ from: location}} replace />
  }

  return (
    <Wrapper>
      <Overlay
        heading={'Sign Up'}
        subheading={'Select one of the sign up methods bellow'}
      >
        <GoogleLoginButton
          onClick={async (e) => {
            e.preventDefault();
            auth
              .signInWithPopup(provider)
              .then((res) => {
                addUser(res.user);
                navigate('/');
              })
              .catch((error) => alert(error.message));
          }}
        >
          <GoogleLoginButtonImageWrapper>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.2512 14.272C26.2512 13.2648 26.1678 12.5298 25.9873 11.7676H14.2512V16.3136H21.1401C21.0012 17.4434 20.2512 19.1448 18.5845 20.2881L18.5611 20.4403L22.2719 23.2575L22.529 23.2826C24.8901 21.1457 26.2512 18.0014 26.2512 14.272Z"
                fill="#4285F4"
                fillOpacity="0.45"
              />
              <path
                d="M14.2504 26.2499C17.6254 26.2499 20.4586 25.161 22.5282 23.2826L18.5837 20.2881C17.5281 21.0095 16.1114 21.5131 14.2504 21.5131C10.9449 21.5131 8.13935 19.3762 7.13926 16.4226L6.99267 16.4348L3.1342 19.3612L3.08374 19.4987C5.13927 23.5003 9.36151 26.2499 14.2504 26.2499Z"
                fill="#34A853"
              />
              <path
                d="M7.1398 16.4228C6.87592 15.6605 6.7232 14.8438 6.7232 14C6.7232 13.156 6.87592 12.3394 7.12592 11.5772L7.11893 11.4148L3.2121 8.44141L3.08428 8.50099C2.23709 10.1616 1.75098 12.0263 1.75098 14C1.75098 15.9735 2.23709 17.8382 3.08428 19.4988L7.1398 16.4228Z"
                fill="#FBBC05"
              />
              <path
                d="M14.2505 6.48664C16.5977 6.48664 18.181 7.48024 19.0838 8.31057L22.6115 4.935C20.445 2.96139 17.6254 1.75 14.2505 1.75C9.36151 1.75 5.13928 4.49943 3.08374 8.50105L7.1254 11.5772C8.13938 8.62361 10.9449 6.48664 14.2505 6.48664Z"
                fill="#EB4335"
              />
            </svg>
          </GoogleLoginButtonImageWrapper>
          <GoogleLoginButtonText>Continue with Google</GoogleLoginButtonText>
        </GoogleLoginButton>
      </Overlay>
    </Wrapper>
  );
}

const GoogleLoginButton = styled.button`
  background-color: #3f81ec;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  height: 52px;
  padding: 3px;
  border-radius: 2px;
  margin-top: 32px;
  outline: none;
  border: none;
  min-width: 200px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color .25s ease-in-out;
  :hover {
    background-color: #1650ad;
  }
`;

const GoogleLoginButtonText = styled.span`
  display: inline-block;
  margin: 0 20px;
  font-weight: 400;
  font-size: 18px;
  @media(max-width: 600px) {
    font-size: 16px;
  }
`;

const GoogleLoginButtonImageWrapper = styled.div`
  background-color: #fff;
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
`;

export default LoginScreen;
