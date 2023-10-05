import styled from "styled-components"

function OverlayWrapper({children, onClick}) {
  return (
    <Wrapper onClick={onClick}><WrapperInner>{children}</WrapperInner></Wrapper>
  )
}

const Wrapper = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, .6);
    width: 100vw;
    height: 100vw;
    z-index: 5;
`

const WrapperInner = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
`

export default OverlayWrapper