import React, { useState } from "react";
import { Avatar, Dropdown, Button, Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SignoutUserSuccess } from "../redux/User/userSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(SignoutUserSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Navbar fluid rounded>
        <Navbar.Brand as="Link" href="/">
          <img
            src="https://static.vecteezy.com/system/resources/previews/028/766/371/original/gopay-payment-icon-symbol-free-png.png"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            RazorPay Intigration
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img={currentUser.profilePicture}
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{currentUser.username}</span>
                <span className="block truncate text-sm font-medium">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignout} >Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                gradientDuoTone="purpleToPink"
                onClick={() => navigate("/signup")}
                outline
              >
                Sign Up
              </Button>
              <Button
                gradientDuoTone="purpleToPink"
                onClick={() => navigate("/signin")}
              >
                Log In
              </Button>
            </div>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Link to="/">
            <Navbar.Link active>Home</Navbar.Link>
          </Link>
          <Link to="/about">
            <Navbar.Link>About</Navbar.Link>
          </Link>
          <Link to="/services">
            <Navbar.Link>Services</Navbar.Link>
          </Link>
          <Link to="/pricing">
            <Navbar.Link>Pricing</Navbar.Link>
          </Link>
          <Link to="/contact">
            <Navbar.Link>Contact</Navbar.Link>
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
