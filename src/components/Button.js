import styled from "styled-components";

function Button({ bgColor = "#a729fa", color = "#fff", children, onClick, style }) {
  return (
    <ButtonStyled bgColor={bgColor} color={color} onClick={onClick} style={style}>
      {children}
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button`
  padding: 10px 36px;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  font-weight: 500;
  outline: none;
  border: none;
  border: 1px solid ${(props) => props.bgColor};
  transition: background-color .25s ease-in-out;
  font-size: 19px;
  border-radius: 3px;
  cursor: pointer;
  :hover {
    background-color: rgba(159,11,224, 0.5);
  }
  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

export default Button;
