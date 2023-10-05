import React, { useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { useRoom } from "../hooks/useRoom";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import OverlayWrapper from "./OverlayWrapper";
import Overlay from "./Overlay";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useWorkspace } from "../hooks/useWorkspace";

function Sidebar({ workspaceDetails }) {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [overlayOpened, setOverlayOpened] = useState(false);
  const [roomsVisible, setRoomsVisible] = useState(true);
  const [roomName, setRoomName] = useState("");
  const [memberMail, setMemberMail] = useState("");
  const { workspaceId, roomId } = useParams();
  const [user] = useAuthState(auth);
  const { workspaceRooms, createRoomForWorkspace } = useRoom(workspaceId);
  const { addInvitedEmailToWorkspace } = useWorkspace();

  const toggleRooms = () => {
    setRoomsVisible((prevState) => !prevState);
  };

  const createRoom = async () => {
    try {
      const result = await createRoomForWorkspace(workspaceId, roomName);

      navigate(`/${workspaceId}/${result.id}`);

      setOverlayOpened(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addInvite = () => {
    addInvitedEmailToWorkspace(workspaceId, memberMail);

    const clipboard = navigator.clipboard.writeText(
      `${window.location.origin.toString()}/invite/${workspaceId}`
    );

    clipboard && toast.success("Link copied");

    setMemberMail("");

    inputRef.current.value = "";
  };

  return (
    <SidebarWrapper>
      <WorkspaceInfo onClick={() => navigate(`/${workspaceId}`)}>
        {workspaceDetails?.data().name}
      </WorkspaceInfo>

      {overlayOpened && (
        <OverlayWrapper
          onClick={(e) => {
            if (e.target.hasChildNodes()) {
              setOverlayOpened(false);
            }
          }}
        >
          <Overlay>
            <Input
              placeholder={"Enter room name"}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <Button style={{ marginTop: 30 }} onClick={createRoom}>
              Create room
            </Button>
          </Overlay>
        </OverlayWrapper>
      )}

      <InfoWrapper>
        <InfoWrapperCollectionHeader>
          <Arrow roomsVisible={roomsVisible} onClick={toggleRooms} />
          <InfoWrapperCollectionHeaderText>
            Rooms
            <AddRoomIcon onClick={() => setOverlayOpened(true)}>+</AddRoomIcon>
          </InfoWrapperCollectionHeaderText>
        </InfoWrapperCollectionHeader>
        {roomsVisible && (
          <InfoWrapperCollectionBody>
            {workspaceRooms?.docs.map((doc) => (
              <InfoWrapperCollectionBodyItem
                active={roomId === doc.id}
                key={doc.id}
                onClick={() => navigate(`/${workspaceId}/${doc.id}`)}
              >
                #<span style={{ marginLeft: 9 }}>{doc.data().name}</span>
              </InfoWrapperCollectionBodyItem>
            ))}
          </InfoWrapperCollectionBody>
        )}
      </InfoWrapper>
      <WorkspaceInvite>
        <AddUserHeading>Add user to workspace</AddUserHeading>
        <Input
          onChange={(e) => {
            setMemberMail(e.target.value);
          }}
          ref={inputRef}
          placeholder={"Email"}
          padding={"10px"}
        />
        <Button
          onClick={() => {
            addInvite();
          }}
          style={{
            marginTop: 6,
            padding: "4px 8px",
            fontWeight: 500,
            fontSize: 16,
          }}
        >
          Copy invite link
        </Button>
      </WorkspaceInvite>
      <GoBackLink to="/">
        <ArrowBack
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 16H28"
            stroke="#fff"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M14 24.5L5.5 16L14 7.5"
            stroke="#fff"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
        </ArrowBack>
        Go back to workspaces
      </GoBackLink>
    </SidebarWrapper>
  );
}

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  min-height: 100vh;
  background: linear-gradient(180deg, #735c8b 0%, #2c213f 100%);
`;

const WorkspaceInfo = styled.div`
  height: 70px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  padding-left: 16px;
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
`;

const WorkspaceInvite = styled.div`
  min-height: 70px;
  border-top: 1px solid #d9d9d9;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: auto;
  margin-bottom: 20px;
`;

const InfoWrapper = styled.div`
  padding-top: 16px;
  color: #d6d6d6;
  font-size: 15px;
`;

const InfoWrapperCollectionHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
  margin-top: 16px;
  position: relative;
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #d6d6d6;
  cursor: pointer;
  transform: rotate(${(props) => (props.roomsVisible ? "0" : "180deg")});
`;

const InfoWrapperCollectionHeaderText = styled.div`
  margin-left: 8px;
`;

const AddRoomIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 0;
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;
`;

const InfoWrapperCollectionBody = styled.div`
  padding-top: 8px;
`;

const InfoWrapperCollectionBodyItem = styled.div`
  padding: 4px 16px;
  background-color: ${(props) => (props.active ? "#a72af8" : "")};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  :hover {
    background-color: ${(props) => (props.active ? "" : "#8D70AC")};
  }
`;

const ArrowBack = styled.svg`
  opacity: 0;
  transform: translate(10px);
  transition: all 0.25s ease-in-out;
`;

const GoBackLink = styled(Link)`
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  color: #fff;
  text-decoration: none;
  align-items: center;
  transform: translate(-10px);
  transition: all 0.25s ease-in-out;
  :hover {
    transform: translate(0px);
  }
  &:hover ${ArrowBack} {
    opacity: 1;
    transform: translate(-5px);
  }
`;

const AddUserHeading = styled.h3`
  color: #fff;
  font-weight: 500;
  margin-bottom: 10px;
  font-size: 17px;
`;

export default Sidebar;
