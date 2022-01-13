import { /* useState, */ useRef, useMemo } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { Input, Button, FormikHandler } from "../UIElements";
import { Field /* ErrorMessage */ } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
//import { Redirect } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const initialValues = {
  email: "",
  password: "",
};

// Setting login validation
const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("E-Mail muss eine gültige E-Mail sein")
    .required("*Pflichtfeld"),
  password: Yup.string()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Muss 8 Zeichen enthalten, einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen"
    )
    .required("*Pflichtfeld"),
});

export default function Login({ isRegistered }) {
  const appCtx = useAppContext();
  const {loginHandler} = useMemo(
    () => ({
      loginHandler: appCtx.loginHandler,
    }),
    [appCtx.loginHandler]
  );
  
  const btnRef = useRef();
  const clickSubmitByRef = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <FormikHandler
        initialValues={initialValues}
        saveValues={loginHandler}
        submitBtnRef={btnRef}
        ValidationSchema={ValidationSchema}
      >
        <FieldWrapper>
          <Field
            name="email"
            id="email"
            component={Input}
            {...{
              type: "string",
              withFeedbackLabel: true,
              withLabel: true,
              label: "Email",
              placeholder: "Bitte email eingeben",
            }}
          />
          <Field
            name="password"
            id="password"
            component={Input}
            {...{
              type: "string",
              withFeedbackLabel: true,
              withLabel: true,
              label: "Password",
              placeholder: `Bitte password eingeben`,
            }}
          />
        </FieldWrapper>
        <ButtonWrapper>
        <SpanLink>
        <p>
          <Link to="/register">Create an account</Link>.
        </p>
      </SpanLink>
          <div style={{width:"10rem"}}></div>
          <Button
            color="success"
            text="Speichern"
            onClick={clickSubmitByRef}
            //   disabled={loading}
          />
        </ButtonWrapper>
      </FormikHandler>
      
    </Container>
  );
}

const Title = styled.div`
  border-bottom: 1px solid var(--color-light-gray);
  color: var(--color-dark);
  font-size: 1.8rem;
  text-align: center;
  padding-top: 6rem;
  margin-bottom: 2rem;
  font-weight: bold;
`;
const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem 2.5rem;
  & label {
    text-align: left;
    font-size: 1rem;
  }
`;
const ButtonWrapper = styled(FieldWrapper)`
  flex-direction: row;
  justify-content: space-between;
`;
const SpanLink = styled.div`
  p {
    font-weight: 600;
  }
`;