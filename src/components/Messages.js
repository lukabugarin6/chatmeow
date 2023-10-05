import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRoom } from "../hooks/useRoom";
import { useParams } from "react-router-dom";
import MessageInput from "./MessageInput";
import { useMessage } from "../hooks/useMessage";
import Message from "./Message";

function Messages() {
  const [messageValue, setMessageValue] = useState('');
  const messagesEndRef = useRef(null);

  const { workspaceId, roomId } = useParams();
  const { workspaceRoomDetails } = useRoom(workspaceId, roomId);
  const { sendMessage, roomMessages, roomMessagesLoading } = useMessage(workspaceId,roomId);

  const messageSubmit = (e) => {
    e.preventDefault();
    
    sendMessage(messageValue);

    setMessageValue('');
  }

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView();
  }, [roomMessages])

  return (
    <Wrapper>
      <RoomInfo>
        <RoomName># {workspaceRoomDetails?.data().name}</RoomName>
      </RoomInfo>
      <RoomMessages>
        <RoomMessagesContent>
          {!roomMessagesLoading &&<>{roomMessages?.docs.map((doc, i) => {
            let sameUser;
            const previousMessage = i > 0 && roomMessages.docs[i - 1] 

            if (previousMessage) {

              sameUser = previousMessage?.data().user === doc.data().user;
            }
            return (
              <Message sameUser={sameUser} message={doc} key={doc.id} />
            )
          })}
          <MessagesEnd ref={messagesEndRef} /></>}
          
        </RoomMessagesContent>
      </RoomMessages>

      <MessageForm onSubmit={messageSubmit}>
        <MessageInput placeholder={`Message #${workspaceRoomDetails?.data().name}`} onChange={(e) => {setMessageValue(e.target.value)}} value={messageValue} style={{ marginTop: 'auto' }} />
      </MessageForm>
    </Wrapper>
  );
}

const Wrapper = styled.div`
    flex-grow: 1;
    display: grid;
    grid-template-rows: 70px 84vh auto;
`;

const RoomInfo = styled.div`
  height: 70px;
  padding: 0 32px;
  border-bottom: 1px solid #D9D9D9;
  width: 100%;
  display: flex;
  align-items: center;
`;

const RoomName = styled.h2`
    font-size: 36px;
    font-weight: 500;
    text-transform: capitalize;
`;

const RoomMessages = styled.div`
  padding-left: 28px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
  padding-bottom: 30px;
`

const RoomMessagesContent = styled.div`
  /* max-height: 70vh; */
  overflow-y: auto;
  min-height: 80px;
`

const MessageForm = styled.form`
  margin-top: auto;
`

const MessagesEnd = styled.div`

`

export default Messages;
