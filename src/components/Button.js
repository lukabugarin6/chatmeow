import styled from "styled-components";

function Button({ bgColor = "#A72AF9", color = "#fff", children, onClick, style }) {
  return (
    <ButtonStyled bgColor={bgColor} color={color} onClick={onClick} style={style}>
      {children}
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button`
  padding: 14px 40px;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  font-weight: 400;
  outline: none;
  border: none;
  /* border: 1px solid ${(props) => props.color}; */
  transition: background-color .25s ease-in-out;
  font-size: 20px;
  border-radius: 6px;
  cursor: pointer;
  :hover {
    background-color: #85579e;
  }
  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

export default Button;
