"use client";

import { useState } from "react";

interface UserNameProps {
  user: {
    id: string;
    name: string;
  };
}
const UserName = ({ user: { id, name } }: UserNameProps) => {
  const [clicked, setClicked] = useState(false);
  const click = () => {
    navigator.clipboard.writeText(id ?? "");
    setClicked(true);
    setTimeout(() => setClicked(false), 3000);
  };
  return (
    <h2
      className={`w-full text-xl text-center md:text-left md:ml-6 font-semibold mb-4 truncate cursor-pointer ${
        clicked ? "text-green-700" : ""
      }`}
      onClick={click}
    >
      <span
        className="text-foreground/50 cursor-context-menu"
        onClick={(e) => e.stopPropagation()}
      >
        {name ?? "User"}
      </span>
      #{id ?? "0000"}
    </h2>
  );
};

export default UserName;
