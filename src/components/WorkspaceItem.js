import styled from "styled-components";

function WorkspaceItem({ name, members, style, onClick }) {
  return (
    <Wrapper style={style} onClick={onClick}>
      <TextWrapper>
        <WorkspaceName>{name}</WorkspaceName>
        {members && <WorkspaceMembers>{members}</WorkspaceMembers>}
      </TextWrapper>
      <ChevronWrapper>
        <ChevronText>Open</ChevronText>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26.9137 19.3375L14.4124 6.83751C14.2437 6.67376 14.0137 6.57251 13.7587 6.57251C13.2412 6.57251 12.8212 6.99251 12.8212 7.51001C12.8212 7.76376 12.9224 7.99501 13.0874 8.16376L24.9237 20.0013L13.0874 31.8375C12.9187 32.0075 12.8149 32.2413 12.8149 32.4988C12.8149 33.0175 13.2349 33.4375 13.7537 33.4375C14.0112 33.4375 14.2449 33.3338 14.4137 33.165L26.9149 20.6638C27.0837 20.4938 27.1874 20.26 27.1874 20.0013C27.1874 19.7425 27.0837 19.5088 26.9149 19.3388L26.9137 19.3375Z"
            fill="black"
          />
        </svg>
      </ChevronWrapper>
    </Wrapper>
  );
}

const ChevronWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translate(0, -50%);
  transition: transform 0.2s ease-in-out;
  display: flex;
  align-items: center;
`;

const ChevronText = styled.span`
  opacity: 0;
  transition: opacity 0.25s ease-in-out;
`;

const Wrapper = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding: 12px 24px;
  width: 100%;
  position: relative;
  min-height: 70px;
  margin-top: 6px;
  cursor: pointer;
  &:hover ${ChevronWrapper} {
    transform: translate(6px, -50%);
  }
  &:hover ${ChevronText} {
    opacity: 1;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WorkspaceName = styled.h4`
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const WorkspaceMembers = styled.h5`
  font-size: 16px;
  font-weight: 400;
`;

export default WorkspaceItem;
