import { Link } from "react-router-dom";
import styled from "styled-components";

function LinkLogo({ href = "/" }) {
  return (
    <Link to={href} style={{ display: "block", width: "fit-content" }}>
      <Wrapper>
        <svg
          width="48"
          height="48"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 16H28"
            stroke="#9F0BE0"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M14 24.5L5.5 16L14 7.5"
            stroke="#9F0BE0"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
        </svg>
        <LogoImage src="/images/chatmeowlogo.png" />
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
`;

const LogoImage = styled.img`
  max-width: 156px;
  max-height: 158px;
`;

export default LinkLogo;
