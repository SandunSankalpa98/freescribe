import React from "react";

function Header() {
  return (
    <div>
      <header className="flex items-center justify-between gap-4 p-4">
        <a href="/"><h1 className="font-medium">
          Free<span className="text-blue-400 bold">Scribe</span>
        </h1></a>
        <a href="/" className="flex items-center gap-2 specialBtn px-4 py-2 rounded-lg text-blue-400">
          <i className="fa-solid fa-plus"></i>
          <p>New</p>
        </a>
      </header>
    </div>
  );
}

export default Header;
