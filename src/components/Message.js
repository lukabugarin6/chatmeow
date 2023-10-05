import styled from "styled-components";
import moment from "moment/moment";

function Message({ message, sameUser }) {
  return (
    <Wrapper sameUser={sameUser}>
      {!sameUser && <UserImage src={message.data().userImage} />}
      <MessageInfo sameUser={sameUser}>
        <div>
          {!sameUser && (
            <>
              {" "}
              <Username>{message.data().user}</Username>
              <Time>{moment(message.data().timestamp?.toDate().toUTCString()).format('LT')}</Time>
            </>
          )}

          <MessageText>{message.data().message}</MessageText>
        </div>
      </MessageInfo>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  margin-top: ${props => !props.sameUser && '25px'};
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
`;

const MessageInfo = styled.div`
  display: flex;
  position: relative;
  padding-left: 55px;
  min-height: ${props => !props.sameUser ? '40px' : ''};
`;

const Username = styled.span`
  font-weight: 700;
  color: #333;
  margin-left: 10px;
  margin-top: 12px;
`;

const Time = styled.span`
  font-weight: 400;
  color: #797979;
  margin-left: 13px;
  font-size: 15px;
`;

const MessageText = styled.p`
  margin-left: 10px;
  margin-top: 4px;
`;

export default Message;
