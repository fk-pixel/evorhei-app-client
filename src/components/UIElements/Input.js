import styled from "styled-components";

export const Input = ({
  field,
  form: { touched, errors },
  label,
  type = "text",
  id,
  withFeedbackLabel,
  withLabel,
  placeholder,
  props,
}) => {
  return (
    <>
      {withLabel && <label htmlFor={id}>{label}</label>}
      <UiInput
        id={id}
        type={type}
        placeholder={placeholder}
        errors={touched[field.name] && errors[field.name] && true}
        {...props}
        {...field}
      />
      {withFeedbackLabel && (
        <FeedbackLabel
          errors={touched[field.name] && errors[field.name] && true}
        >
          {touched[field.name] && errors[field.name]
            ? errors[field.name]
            : '' /* `Please enter ${label}` */}
        </FeedbackLabel>
      )}
    </>
  );
};

const UiInput = styled.input`
  border: 2px solid white;
  border-bottom: 2px solid var(--color-pastel-gray); //${(p) => (p.errors ? "var(--color-danger)" : "var(--color-light-gray)")};
  margin-bottom: 0.25rem;
  padding: 0 ${(props) => props.size || "0.75rem"};
 
  width: 100%;
  height: 3rem;
  font-size: inherit;
  outline  :none ;
  &:focus {
    border-bottom: 3px solid var(--btn-color-warning);
  }
`;

const FeedbackLabel = styled.small`
  color: ${(props) =>
    props.errors ? "var(--color-danger)" : "var(--color-light-gray)"};
  display: flex;
  margin-bottom: 0.5rem;
  flex-direction: column;
`;
