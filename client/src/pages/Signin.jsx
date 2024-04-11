import React, { useState } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/User/userSlice";

export default function Signup() {
  const [formdata, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formdata.username || !formdata.password) {
      setError("Please fill out all the fields.");
      return dispatch(signInFailure("Plesase fill out all the fields."));
    }
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();

      setLoading(false);
      if (data.success === false) {
        setError(data.error);
        dispatch(signInFailure(data.message));
      }
      if (response.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      dispatch(signInFailure(error.message));
      setLoading(false);
    }
  };
  return (
    <div className="flex h-screen justify-center items-center mx-auto">
      <div className="flex-1 flex flex-col justify-center items-center gap-8">
        <img
          src="https://plus.unsplash.com/premium_photo-1679942202526-2d9846b8dd52?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-96 object-cover rounded-md"
          alt=""
        />
        <p className="w-[50ch] font-semibold">
          A payment gateway project to pay via RazorPay using MERN Stack and
          autentication system.
        </p>
      </div>
      <div className="flex-1">
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label value="Your UserName" />
            </div>
            <TextInput
              placeholder="UserName"
              value={formdata.username}
              onChange={(e) =>
                setFormData({ ...formdata, username: e.target.value })
              }
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label value="Your password" />
            </div>
            <TextInput
              value={formdata.password}
              onChange={(e) =>
                setFormData({ ...formdata, password: e.target.value })
              }
              type="password"
              required
              shadow
            />
          </div>
          <Button gradientDuoTone="purpleToPink" type="submit">
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Login to your account"
            )}
          </Button>
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Don't have an account?</span>
          <Link to="/sign-up" className="text-blue-500">
            Sign Up
          </Link>
        </div>
        {error && (
          <Alert className="mt-5" color="failure">
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
}
