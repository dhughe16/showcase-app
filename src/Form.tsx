import React from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import "./styles/Form.scss";

interface FormValues {
  album: string;
  // email: string;
  group: string;
  name: string;
  // password: string;
  subject: string;
}

interface OtherProps {
  message: string;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, message } = props;
  return (
    <Form>
      <h3 className="form-message">{message}</h3>
      <div className="form-fields">
        <label htmlFor="name">Name</label>
        <Field type="name" name="name" />
        {touched.name && errors.name && <div>{errors.name}</div>}

        <label htmlFor="Subject">Subject</label>
        <Field type="subject" name="subject" />
        {touched.subject && errors.subject && <div>{errors.subject}</div>}

        <label htmlFor="group">Group</label>
        <Field type="group" name="group" />
        {touched.group && errors.group && <div>{errors.group}</div>}

        <label htmlFor="Album">Album</label>
        <Field type="album" name="album" />
        {touched.album && errors.album && <div>{errors.album}</div>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  initialEmail?: string;
  message: string; // if this passed all the way through you might do this or make a union type
}

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      album: "",
      // email: props.initialEmail || "",
      group: "",
      name: "",
      // password: "",
      subject: "",
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.name) {
      errors.name = "Required";
    }
    return errors;
  },

  handleSubmit: (values) => {
    // do submitting things
  },
})(InnerForm);

const Basic = () => (
  <div>
    <h2>Card entry</h2>
    <MyForm message="Enter card information below" />
  </div>
);

export default Basic;
