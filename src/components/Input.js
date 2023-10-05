import { forwardRef } from "react";
import styled from "styled-components";

const Input = forwardRef((props, ref) =>
  props.textarea ? (
    <TextareaStyled
      ref={ref}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  ) : (
    <InputStyled
      padding={props.padding}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      ref={ref}
    />
  )
);

const InputStyled = styled.input`
  padding: ${(props) => (props.padding ? props.padding : "18px 20px")};
  border: 1px solid #9e9e9e;
  border-radius: 3px;
  max-width: 520px;
  width: 100%;
  outline: none;
  display: block;
  font-size: 17px;
  ::placeholder {
    color: #828282;
  }
`;

const TextareaStyled = styled.textarea`
  padding: 18px 20px;
  border: 1px solid #9e9e9e;
  border-radius: 3px;
  max-width: 520px;
  width: 100%;
  outline: none;
  display: block;
  font-size: 17px;
  ::placeholder {
    color: #828282;
  }
`;

export default Input;
