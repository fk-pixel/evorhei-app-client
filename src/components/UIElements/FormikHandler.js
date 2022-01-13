import { Formik, Form } from "formik";
import * as Yup from "yup";

const defaultSchema = Yup.object().shape({})

export function FormikHandler({
  submitBtnRef,
  saveValues,
  children,
  autoComplete = "off",
  initialValues,
  ValidationSchema = defaultSchema
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={(values) => {
          saveValues(values);
        }}
      >
        {({ handleSubmit, handleReset }) => (
          <>
            <Form className="" autoComplete={autoComplete}>
              {children}
              <button
                type="submit"
                style={{ display: "none" }}
                ref={submitBtnRef}
                onClick={handleSubmit}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
