import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function SignUp() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [message, setMessage] = useState("");

  const NAVIGATE = useNavigate();
  const { SIGN_UP } = useContext(AuthContext);

  const FORMIK = useFormik({
    initialValues: {
      firstname: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .min(2, "Too Short!")
        .max(15, "Must be 15 characters or less")
        .required("First name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Too Short!")
        .required("Password is required")
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol"),
    }),
    onSubmit: (values) => {
      HANDLE_SUBMIT(values.email, values.password);
    },
  });

  const HANDLE_SUBMIT = async (email, password) => {
    try {
      await SIGN_UP(email, password);
      setAuthorized(true);
      setMessage("User authorized. Redirecting to login page....");
      return setTimeout(() => {
        NAVIGATE("/login");
      }, 3000);
    } catch (error) {
      console.error(error);
      if (error) {
        setError(true);
        setErrorMessage(error.message.slice(22, -2));
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-[20px] mt-[120px] w-full md:w-fit px-[10px]"
      onSubmit={FORMIK.handleSubmit}
    >
      <h1 className="text-white text-[20px] uppercase text-center">
        Create User
      </h1>
      {authorized ? (
        <div className="text-center text-green-500">{message}</div>
      ) : null}
      <div>
        <input
          id="firstname"
          type="text"
          placeholder="First Name"
          className="rounded-md w-full  md:w-[400px] px-[10px] py-[10px] focus:outline focus:outline-indigo-500 bg-slate-500 focus:bg-white focus:text-black"
          onChange={FORMIK.handleChange}
          onBlur={FORMIK.handleBlur}
          value={FORMIK.values.firstname}
        />
        {FORMIK.touched.firstname && FORMIK.errors.firstname ? (
          <div className="text-red-500">{FORMIK.errors.firstname}</div>
        ) : null}
        {error ? <div className="text-red-500">{errorMessage}</div> : null}
      </div>
      <div>
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="rounded-md w-full  md:w-[400px] px-[10px] py-[10px] focus:outline focus:outline-indigo-500 bg-slate-500 focus:bg-white focus:text-black"
          onChange={FORMIK.handleChange}
          onBlur={FORMIK.handleBlur}
          value={FORMIK.values.email}
        />
        {FORMIK.touched.email && FORMIK.errors.email ? (
          <div className="text-red-500">{FORMIK.errors.email}</div>
        ) : null}
        {error ? <div className="text-red-500">{errorMessage}</div> : null}
      </div>
      <div>
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="rounded-md w-full  md:w-[400px] px-[10px] py-[10px] focus:outline focus:outline-indigo-500 bg-slate-500 focus:bg-white focus:text-black"
          onChange={FORMIK.handleChange}
          onBlur={FORMIK.handleBlur}
          value={FORMIK.values.password}
        />
        {FORMIK.touched.password && FORMIK.errors.password ? (
          <div className="text-red-500">{FORMIK.errors.password}</div>
        ) : null}
        {error ? <div className="text-red-500">{errorMessage}</div> : null}
      </div>
      <input
        type="submit"
        value="Create Account"
        className="rounded-md w-full  md:w-[400px] px-[10px] py-[10px] focus:outline focus:outline-indigo-500 bg-slate-500 uppercase font-bold text-[13px] text-white active:scale-105"
      />
      <p className="text-center text-white">
        Already have an account:{" "}
        <Link to="/login" className="text-blue-500 underline">
          Log In
        </Link>
      </p>
    </form>
  );
}
