import { Field, ErrorMessage } from "formik";
import { FormikHandler, Input } from "../../UIElements";
import * as Yup from "yup";
import styled from "styled-components";

// Setting material validation
const ValidationSchema = Yup.object().shape({
  menge: Yup.number()
    .integer("Diese Zahl muss eine ganze Zahl sein")
    .max(9999, "Die Zahl muss kleiner als 10.000 sein")
    .positive("Menge ist größer als null")
    .required("*Pflichtfeld"),
  chargeNumber: Yup.string().required("*Pflichtfeld"),
});

export function DataTableForm({ saveValues, initialValues, submitBtnRef }) {
  return (
    <FormikHandler
      initialValues={initialValues}
      ValidationSchema={ValidationSchema}
      saveValues={saveValues}
      submitBtnRef={submitBtnRef}
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
          id="chargeNumber"
          component={Input}
          {...{
            withFeedbackLabel: true,
            withLabel: true,
            label: "Charge Number",
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
  );
}

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
