"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { login } from "../redux/slices/authSlice";
import axios from "axios";
import { login } from "../services/authService";

function Login() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  async function onLogin(event) {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details");
      return;
    }

    // // Dispatch create account action
    // const response = await dispatch(login(loginData));
    // if (response?.payload?.success) navigate("/");
    // // console.log("see here", response);

    // setLoginData({
    //   email: "",
    //   password: "",
    // });

    try {
      // let config = {
      //   method: "post",
      //   maxBodyLength: Infinity,
      //   url: "http://asset-api.mindsharpner.com/v1/login",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   data: JSON.stringify(loginData),
      // };

      // axios
      //   .request(config)
      //   .then((response) => {
      //     console.log(JSON.stringify(response.data));
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      await login(loginData);
      window.location = "/dashboard";
      // console.log('response',data);
    } catch (er) {
      console.log(er);
    }
    // let data = JSON.stringify(loginData);
  }

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <form
        noValidate
        onSubmit={onLogin}
        className="flex flex-col justify-center gap-3 rounded-lg p-4 text-black w-96 shadow-[0_0_10px_black]"
      >
        <h1 className="text-center text-2xl font-bold">Login Page</h1>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold">
            {" "}
            Email{" "}
          </label>
          <input
            type="email"
            required
            name="email"
            id="email"
            placeholder="Enter your mail..."
            className="bg-transparent px-2 py-1 border"
            onChange={handleUserInput}
            value={loginData.email}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-semibold">
            {" "}
            Password{" "}
          </label>
          <input
            type="password"
            required
            name="password"
            id="password"
            placeholder="Enter your password..."
            className="bg-transparent px-2 py-1 border"
            onChange={handleUserInput}
            value={loginData.password}
          />
          {/* <Link
            to="/forgot-password"
            className="link text-accent cursor-pointer"
          >
            Forgot your password?
          </Link> */}
        </div>

        <button
          type="submit"
          className="mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
        >
          Login
        </button>

        {/* <p className="text-center">
          Do not have an acoount?{" "}
          <Link to="/signup" className="link text-accent cursor-pointer">
            Signup
          </Link>
        </p> */}
      </form>
    </div>
  );
}

export default Login;
