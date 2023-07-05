"use client";
import React from "react";
import Image from "next/image";
import { UserAuth } from "../context/AuthContext";
const page = () => {
  const { user } = UserAuth();
  return (
    <div className="h-screen py-16 p-2 bg-gradient-to-r from-[#2F80ED] to-[#1Cb5e0]">
      {!user ? (
        <div>Please Log in to See Profile</div>
      ) : (
        <div>
          <div className="relative rounded-full mx-auto overflow-hidden w-60 h-60 mt-20">
            <Image src={`${user.photoURL}`} alt="/" fill objectFit="cover" />
          </div>
          <p className="font-burtons  p-4 text-xl text-center">{`Welcome, ${user.displayName}`}</p>
          <p className="font-burtons  p-2 text-lg text-center">{`Email: ${user.email}`}</p>
        </div>
      )}
    </div>
  );
};

export default page;
