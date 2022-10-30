const Terms = ({ formik, terms }) => {
  return (
    <div className="formControl">
      <input
        type="checkbox"
        name={terms}
        id={terms}
        value={true}
        onChange={formik.handleChange}
        checked={formik.values.terms}
      />
      <label htmlFor={terms}>Terms and conditions</label>

      {formik.errors.terms && formik.touched.terms && (
        <div className="error">{formik.errors.terms}</div>
      )}
    </div>
  );
};

export default Terms;
