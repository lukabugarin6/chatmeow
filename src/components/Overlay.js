import styled from "styled-components";

function Overlay({ heading, subheading, children, maxWidth = 560 }) {
  return (
    <OverlayStyled maxWidth={maxWidth}>
      <LogoImage src="/images/chatmeowlogo.png" />
      <OverlayHeading>{heading}</OverlayHeading>
      <OverlaySubheading>{subheading}</OverlaySubheading>
      {children}
      <OverlayFill />
    </OverlayStyled>
  );
}

export default Overlay;

const OverlayStyled = styled.div`
  width: 100%;
  max-width: ${(props) => props.maxWidth}px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 30px 20px 40px;
  max-height: 90vh;
  > * {
    z-index: 2;
  }
`;

const LogoImage = styled.img`
  max-width: 156px;
  max-height: 158px;
  @media (max-width: 600px) {
    display: none;
  }
`;

const OverlayHeading = styled.h1`
  font-size: 50px;
  color: #333333;
  margin-top: 18px;
  font-weight: 600;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 34px;
  }
`;

const OverlaySubheading = styled.h2`
  font-size: 22px;
  font-weight: 500;
  color: #333333;
  margin-top: 6px;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const OverlayFill = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.38);
  border: 1px solid #fff;
  box-shadow: 0px 1px 24px -1px rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  filter: blur(2px);
  z-index: 1;
`;
