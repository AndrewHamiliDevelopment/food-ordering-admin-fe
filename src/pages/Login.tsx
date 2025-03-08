import { useFormik } from "formik";
import React from "react";
import { firebaseLoginWithPassword } from "../shared";

const Login: React.FC = () => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async ({ email, password }) => {
      await firebaseLoginWithPassword({ email, password });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          id={"email"}
          type="text"
          placeholder="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <br />
        <input id={"password"} type="password" placeholder="password" onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
