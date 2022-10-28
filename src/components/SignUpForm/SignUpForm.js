import { useFormik } from "formik";
import * as Yup from "yup";

// 1
const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
};
// 2
const onSubmit = (values) => {
  console.log(values);
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
});

const SignUpForm = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  console.log(formik);

  return (
    <section>
      <form onSubmit={formik.handleSubmit}>
        <div className="formControl">
          <label>Name</label>
          <input type="text" {...formik.getFieldProps("name")} name="name" />
          {formik.errors.name && formik.touched.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
        <div className="formControl">
          <label>Email</label>
          <input type="text" {...formik.getFieldProps("email")} name="email" />
          {formik.errors.email && formik.touched.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div className="formControl">
          <label>Phone Number</label>
          <input
            type="text"
            {...formik.getFieldProps("phoneNumber")}
            name="phoneNumber"
          />
          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
            <div className="error">{formik.errors.phoneNumber}</div>
          )}
        </div>
        <div className="formControl">
          <label>Password</label>
          <input
            type="text"
            {...formik.getFieldProps("password")}
            name="password"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>
        <div className="formControl">
          <label>Password Confirmation</label>
          <input
            type="text"
            {...formik.getFieldProps("passwordConfirm")}
            name="passwordConfirm"
          />
          {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
            <div className="error">{formik.errors.passwordConfirm}</div>
          )}
        </div>
        <button type="submit" disabled={!formik.isValid}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default SignUpForm;
