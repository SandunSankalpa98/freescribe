import React, { useState } from "react";

import Header from "./Components/Header";
import HomePage from "./Components/HomePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />
        <HomePage/>

        <footer>{/* Footer content goes here */}</footer>
      </section>
      <h1>hello</h1>
    </div>
  );
}

export default App;
