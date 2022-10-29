import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import Input from "./common/Input";
import RadioInput from "./common/RadioInput";
import Select from "./common/SelectComponent";
import CheckBoxInput from "./common/CheckBoxInput";

const checkBoxOptions = [
  { label: "React.js", value: "React.js" },
  { label: "vue.js", value: "vue.js" },
];

const radioOptions = [
  { label: "Male", value: "0" },
  { label: "Female", value: "1" },
];

const selectOptions = [
  { label: "select nationality", value: "" },
  { label: "Iran", value: "IR" },
  { label: "Germany", value: "GER" },
  { label: "USA", value: "US" },
];

// 1
const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
  gender: "",
  nationality: "",
  interests: [],
};
// 2
const onSubmit = (values) => {
  axios
    .post("http://localhost:3001/users", values)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};
// 3
// const validate = (values) => {
//   let errors = {};

//   if (!values.name) {
//     errors.name = "Name is required";
//   }

//   if (!values.email) {
//     errors.email = "Email is required";
//   }

//   if (!values.password) {
//     errors.password = "Password is required";
//   }

//   console.log(errors);
//   return errors;
// };

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(6, "name length is not valid"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]{11}$/, "Invalid Phone Number")
    .nullable(),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  passwordConfirm: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password"), null], "password must match"),
  gender: Yup.string().required("Gender is required"),
  nationality: Yup.string().required("select nationality!"),
  interests: Yup.array().min(1).required("at least select one expertise"),
});

const SignUpForm = () => {
  const [valuesForm, setValuesForm] = useState(null);
  const formik = useFormik({
    initialValues: valuesForm || initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  // console.log(formik.values);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/users/1")
  //     .then((res) => setValuesForm(res.data))
  //     .catch((error) => console.log(error));
  // }, []);

  return (
    <section>
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="name" label="Name" />
        <Input formik={formik} name="email" label="Email" />
        <Input formik={formik} name="phoneNumber" label="Phone Number" />
        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />
        <Input
          formik={formik}
          name="passwordConfirm"
          label="Password Confirmation"
          type="password"
        />
        <RadioInput formik={formik} name="gender" radioOptions={radioOptions} />
        <Select
          formik={formik}
          selectOptions={selectOptions}
          name="nationality"
        />
        <CheckBoxInput
          formik={formik}
          checkBoxOptions={checkBoxOptions}
          name="interests"
        />
        <button type="submit" disabled={!formik.isValid}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default SignUpForm;
