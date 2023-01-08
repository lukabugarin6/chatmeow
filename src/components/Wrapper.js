import styled from "styled-components";

function Wrapper({ children, bgImg = '/images/chatmeowbg.png' }) {
  return (
    <WrapperStyled bgImg={bgImg}>
        {children}
    </WrapperStyled>
  )
}

const WrapperStyled = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: url("${props => props.bgImg}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

export default Wrapper