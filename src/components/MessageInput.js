import styled from "styled-components";

function MessageInput({
  type = "text",
  placeholder = "Message #Catpurrrs",
  onChange,
  style,
  value
}) {
  return (
    <Wrapper>
      <InputStyled
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        style={style}
        value={value}
      />
      <SendButton>
      <SendArrow
         width="57"
         height="57"
         viewBox="0 0 57 57"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
  <g clipPath="url(#clip0_90_54)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.916 26.7753L22.9084 23.3758L22.9084 23.3758C20.8062 19.8161 19.755 18.0362 20.5431 17.1296C21.3312 16.223 23.24 17.0162 27.0577 18.6027L40.8688 24.3418C43.5551 25.4581 44.8982 26.0162 44.97 27.0437C45.0419 28.0713 43.7895 28.8108 41.2848 30.2901L28.4068 37.8956C24.8471 39.9979 23.0672 41.049 22.1605 40.2609C21.254 39.4728 22.0472 37.564 23.6335 33.7462L25.1486 30.1005L35.3849 29.3847C36.3031 29.3204 36.9955 28.524 36.9313 27.6058C36.8671 26.6876 36.0707 25.9952 35.1524 26.0595L24.916 26.7753Z"
            fill="#A729FA"
          />
        </g>
        <defs>
          <clipPath id="clip0_90_54">
            <rect
              width="40"
              height="40"
              fill="white"
              transform="translate(26.2422) rotate(41)"
            />
          </clipPath>
        </defs>
      </SendArrow>
      </SendButton>
      
    </Wrapper>
  );
}

const Wrapper = styled.div`
    position: relative;
    border-top: 1px solid #d9d9d9;
`

const InputStyled = styled.input`
  padding: 16px 28px 40px;
  border: none;
  border-radius: 3px;
  width: 95%;
  outline: none;
  display: block;
  font-size: 17px;
  resize: none;
  ::placeholder {
    color: #d9d9d9;
    font-weight: 500;
  }
`;

const SendButton = styled.button`
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  background-color: transparent;
`

const SendArrow = styled.svg`
`

export default MessageInput;
