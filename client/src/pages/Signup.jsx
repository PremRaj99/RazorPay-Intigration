import React, { useState } from "react";
import { Alert, Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [formdata, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formdata.username || !formdata.email || !formdata.password) {
      return setError("Plesase fill out all the fields.");
    }
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();
      setLoading(false);
      if (data.success === false) {
        return setError(data.message);
      }
      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
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
              <Label value="Your Email" />
            </div>
            <TextInput
              placeholder="example@example.com"
              value={formdata.email}
              onChange={(e) =>
                setFormData({ ...formdata, email: e.target.value })
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
          <div className="flex items-center gap-2">
            <Checkbox id="agree" required />
            <Label htmlFor="agree" className="flex">
              I agree with the&nbsp;
              <Link
                to="/"
                className="text-purple-600 hover:underline dark:text-cyan-500"
              >
                terms and conditions
              </Link>
            </Label>
          </div>
          <Button gradientDuoTone="purpleToPink" type="submit">
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Register new account"
            )}
          </Button>
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Have an account?</span>
          <Link to="/signin" className="text-blue-500">
            Sign In
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
