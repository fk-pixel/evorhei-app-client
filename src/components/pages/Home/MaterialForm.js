import { useRef, useMemo } from "react";
import styled from "styled-components";
import { Field, ErrorMessage } from "formik";
import { Input, Button, FormikHandler } from "../../UIElements";
import { Container } from "react-bootstrap";
import * as Yup from "yup";
import { useAppContext } from "../../../context/AppContext";

const initialValues = {
  material: "",
  chargeNumber: "",
  menge: 0,
};

// Setting material validation
const ValidationSchema = Yup.object().shape({
  menge: Yup.number()
    .positive("Menge ist größer als null")
    .required("*Pflichtfeld"),
  chargeNumber: Yup.string().required("*Pflichtfeld"),
});


// Component start
function MaterialForm(userData) {
  const appCtx = useAppContext();
  const {materialHandler} = useMemo(
    () => ({
      materialHandler: appCtx.materialHandler,
    }),
    [appCtx.materialHandler]
  );
  const btnRef = useRef();
  const clickSubmitByRef = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };
  
  return (
    <Container>
      <Title>Material Erfassung</Title>
      <FormikHandler
        initialValues={initialValues}
        saveValues={materialHandler}
        submitBtnRef={btnRef}
        ValidationSchema={ValidationSchema}
      >
        <FieldWrapper>
          <div>
            <label id="select" className="label label-default">
              Material
            </label>
            <Field as="select" className="form-select p-2 mb-4" name="material">
              <option value="0" style={{ display: "none" }}>
                Wählen Sie ein Material...
              </option>
              <option value="Material1">Material1</option>
              <option value="Material2">Material2</option>
              <option value="Material3">Material3</option>
            </Field>
            <ErrorMessage name="material" component="small" />
          </div>
        </FieldWrapper>
        <FieldWrapperTwo>
          <Field
            name="chargeNumber"
            className="form-control"
            id="chargeNumber"
            component={Input}
            {...{
              withFeedbackLabel: true,
              withLabel: true,
              label: "Charge Nummer",
              placeholder: "Bitte Charge-Nummer eingeben",
            }}
          />
          <Field
            name="menge"
            id="menge"
            component={Input}
            {...{
              type: "number",
              min: 1,
              withFeedbackLabel: true,
              withLabel: true,
              label: "Menge",
              placeholder: "Bitte menge eingeben",
            }}
          />
        </FieldWrapperTwo>
      </FormikHandler>
      <ButtonWrapper>
        <div></div>
        <Button
          color="success"
          text="Speichern"
          onClick={clickSubmitByRef}
          //disabled={loading}
        />
      </ButtonWrapper>
    </Container>
  );
}

export default MaterialForm;

/* const WrapperDiv = styled.div`
  width: 600px;
  & form {
    width: inherit;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`; */
const Title = styled.div`
  color: var(--color-dark);
  font-size: 1.8rem;
  text-align: center;
  padding-top: 1.25rem;
  font-weight: bold;
`;
const FieldWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.8rem 2.5rem;
  & label {
    text-align: left;
    font-size: 1rem;
    margin-top: 1rem;
    font-weight: 600;
  }
  @media (max-width: 576px) {
    #menge-label {
      margin-top: 1.5rem;
    }
    label {
      color: var(--color-pastel-gray);
    }
    input {
      border: none;
      border-bottom: 0.5px solid var(--color-pastel-gray);
    }
    select {
      border: none;
      border-bottom: 0.5px solid var(--color-pastel-gray);
    }
    #select {
      color: var(--color-pastel-gray);
    }
  }
`;
const FieldWrapperTwo = styled(FieldWrapper)`
  display: flex;
  #chargeNumber {
    width: 100%;
  }
  #menge {
    width: 30%;
  }
`;
const ButtonWrapper = styled(FieldWrapper)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
