import { Link, useNavigate } from "react-router-dom";

import { SignupInput } from "@kevin-sym/blog-common";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt.token);
      navigate("/blogs");
      
    } catch (error) {
      // alert user here
    }
  }

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <div className="text-center">
        <div className="text-3xl font-extrabold">Create an account</div>
        <div className="text-slate-400">
          {type == "signin"
            ? "Don't have an account?"
            : "Already have an account?"}
          <Link
            to={type == "signin" ? "/signup" : "/signin"}
            className="pl-2 underline"
          >
            {type == "signin" ? "Sign up" : "Sign in"}
          </Link>
        </div>
      </div>
      <div className="w-full max-w-sm mt-8 px-13">
        {type == "signup" ? (
          <LabeledInput
            label="Name"
            placeHolder="Kevin Tandon.."
            onChange={(e: any) => {
              setPostInputs({
                ...postInputs,
                name: e.target.value,
              });
            }}
          />
        ) : null}
        <LabeledInput
          label="Email"
          placeHolder="RCod@gmail.com"
          onChange={(e: any) => {
            setPostInputs({
              ...postInputs,
              email: e.target.value,
            });
          }}
        />
        <LabeledInput
          label="Password"
          type="password"
          placeHolder="StrongPassword@69"
          onChange={(e: any) => {
            setPostInputs({
              ...postInputs,
              password: e.target.value,
            });
          }}
        />
        <button
          type="button"
          onClick={sendRequest}
          className="w-full text-white bg-gradient-to-br from-gray-700 via-gray-900 to-black hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-gray-500 dark:focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
        >
          {type == "signup" ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeHolder: string;
  onChange: any;
  type?: string;
}
function LabeledInput({
  label,
  placeHolder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm font-medium text-black p-1">
          {label}
        </label>
        <input
          onChange={onChange}
          type={type || "text"}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder={placeHolder}
          required
        />
      </div>
    </div>
  );
}
