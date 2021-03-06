import styled from "styled-components";

export const Button = (props) => {
  return <UIButtonWrapper {...props}>{props.text}</UIButtonWrapper>;
};

const UIButtonWrapper = styled.button.attrs((props) => ({
  type: props.type || "button",
}))`
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #f7f7f7;
  border: 0;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-family: inherit;
  padding: 0 2.25rem;
  height: 2.5rem;
  cursor: pointer;
  background: transparent;
  outline: none;
  transition-property: background, box-shadow;
  transition-duration: 0.35s;
  background: ${(props) => `var(--btn-color-${props.color})`};
  &:hover {
    background: ${(props) => `var(--btn-color-${props.color}-hover)`};
  }
  &:disabled {
    background: var(--color-dark-gray);
    border: 1px solid var(--color-dark-gray);
    cursor: not-allowed;
  }
  &:focus,
  &:active {
    background: ${(props) => `var(--btn-color-${props.color}-active)`};
    box-shadow: 0 0 0 2px ${(props) => `var(--btn-color-${props.color}-active)`};
  }
`;