"use client";
import React, { useState } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user);
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="fixed w-full h-[50px] shadow-md bg-gradient-to-r from-[#2F80ED] to-[#1Cb5e0] shadow-sky-900 z-[100]">
      <div className="flex justify-between items-center w-full  h-2/3 px-2 2xl:px-16">
        <p className=" font-burtons">TheEnderDev</p>
        {!user ? (
          <div>
            <ul className="hidden md:flex">
              <Link href="/">
                <li
                  onClick={() => setNav(false)}
                  className="ml-10 font-burtons py-4 text-sm"
                >
                  Home
                </li>
              </Link>
              <Link href="/profile">
                <li
                  onClick={() => setNav(false)}
                  className="ml-10 font-burtons py-4 text-sm"
                >
                  Profile
                </li>
              </Link>
              <li
                onClick={handleSignIn}
                className=" cursor-pointer ml-10 font-burtons py-4 text-sm"
              >
                Login
              </li>

              <li
                onClick={handleSignIn}
                className="ml-10 font-burtons py-4 text-sm cursor-pointer"
              >
                Sign Up
              </li>
            </ul>
            <div onClick={handleNav} className="md:hidden">
              <AiOutlineMenu size={25} />
            </div>
          </div>
        ) : (
          <div>
            <ul className="hidden md:flex">
              <Link href="/">
                <li
                  onClick={() => setNav(false)}
                  className="ml-10 font-burtons py-4 text-sm"
                >
                  Home
                </li>
              </Link>
              <Link href="/profile">
                <li
                  onClick={() => setNav(false)}
                  className="ml-10 font-burtons py-4 text-sm"
                >
                  Profile
                </li>
              </Link>
              <li className=" cursor-pointer ml-10 font-burtons py-4 text-sm">
                {`Welcome, ${user.displayName}`}
              </li>

              <li
                onClick={handleSignOut}
                className="ml-10 font-burtons py-4 text-sm cursor-pointer"
              >
                Sign Out
              </li>
            </ul>
            <div onClick={handleNav} className="md:hidden">
              <AiOutlineMenu size={25} />
            </div>
          </div>
        )}
      </div>
      <div
        className={
          nav ? "md:hidden  fixed left-0 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        <div
          className={
            nav
              ? " fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-gradient-to-r from-[#2F80ED] to-[#1Cb5e0] p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0  p-4 ease-in duration-500"
          }
        >
          <div>
            <div className="flex w-full items-center justify-between">
              <p className=" font-burtons">TheEnderDev</p>
              <div
                onClick={handleNav}
                className="rounded-full shadow-xl shadow-gray-400 p-3 cursor-pointer"
              >
                <AiOutlineClose />
              </div>
            </div>
            <div className="border-b border-sky-300 my-4 ">
              <p className=" font-burtons w-[85%] md:w-[90%] py-4">Todo App</p>
            </div>
          </div>
          <div className="py-4 flex flex-col">
            {!user ? (
              <div>
                <ul className="uppercase">
                  <Link href="/">
                    <li
                      onClick={() => setNav(false)}
                      className=" font-burtons py-4 text-sm"
                    >
                      Home
                    </li>
                  </Link>
                  <Link href="/profile">
                    <li
                      onClick={() => setNav(false)}
                      className=" font-burtons py-4 text-sm"
                    >
                      Profile
                    </li>
                  </Link>
                  <Link href="/login">
                    <li
                      onClick={handleSignIn}
                      className=" font-burtons py-4 text-sm"
                    >
                      Login
                    </li>
                  </Link>
                  <Link href="/signup">
                    <li
                      onClick={handleSignIn}
                      className=" font-burtons py-4 text-sm"
                    >
                      Sign Up
                    </li>
                  </Link>
                </ul>
              </div>
            ) : (
              <div>
                <ul className="uppercase">
                  <Link href="/">
                    <li
                      onClick={() => setNav(false)}
                      className=" font-burtons py-4 text-sm"
                    >
                      Home
                    </li>
                  </Link>
                  <Link href="/profile">
                    <li
                      onClick={() => setNav(false)}
                      className=" font-burtons py-4 text-sm"
                    >
                      Profile
                    </li>
                  </Link>
                  <Link href="/login">
                    <li className=" cursor-pointer font-burtons py-4 text-sm">
                      {`Welcome, ${user.displayName}`}
                    </li>
                  </Link>

                  <li
                    onClick={handleSignOut}
                    className=" font-burtons py-4 text-sm"
                  >
                    Sign Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
