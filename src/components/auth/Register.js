import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { Input, Button, FormikHandler } from "../UIElements";
import { Field /* ErrorMessage */ } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";
//import { FormHandler } from "./FormHandler";

const initialValues = {
  username: "",
  email: "",
  password: "",
};

// Setting register validation
const ValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("*Pflichtfeld")
    .min(2, "Ihr Name muss mindestens 2 Zeichen sein")
    .max(10, "Ihr Name darf maximal 10 Zeichen sein"),
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

// Setting notifications
const notify = (arg) => {
  if (arg === "success") {
    toast.success("User signed successfully 😎");
  } else if (arg === "error") {
    toast.error("Sorry 🙄 something went wrong!");
  }
};

export default function Login() {
  const btnRef = useRef();
  const clickSubmitByRef = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };
  const [isRegistered, setIsregistered] = useState(false);

  const registerHandler = (values) => {
    console.log(values);
    axios
      .post(`http://localhost:8000/user/register`, {
        username: values.username,
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        console.log(res.data);
        notify("success");
        setIsregistered(true);
      })
      .catch((error) => {
        console.log(error.message);
        notify("error");
      });
  };
  if (isRegistered) {
    return <Redirect push to="/" />;
  }

  return (
    <Container>
      <Title>Sign up</Title>
      <FormikHandler
        initialValues={initialValues}
        saveValues={registerHandler}
        submitBtnRef={btnRef}
        ValidationSchema={ValidationSchema}
      >
        <FieldWrapper>
          <Field
            name="username"
            id="username"
            component={Input}
            {...{
              type: "string",
              withFeedbackLabel: true,
              withLabel: true,
              label: "Username",
              placeholder: "Bitte username eingeben",
            }}
          />
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
            <Link to="/">Back to Login Page</Link>
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SpanLink = styled.div`
  p {
    font-weight: 600;
  }
`;
