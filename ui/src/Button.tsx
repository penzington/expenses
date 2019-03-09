import styled from "styled-components";

const Button = styled.button`
  font-family: inherit;
  color: white;
  background-color: #3490dc;
  border: none;
  border-radius: 0.2rem;
  min-width: 6rem;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
  &[disabled] {
    opacity: 0.5;
  }
`;

export default Button;
