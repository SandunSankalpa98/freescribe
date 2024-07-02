import React, { useState, useEffect } from "react";

import Header from "./Components/Header";
import HomePage from "./Components/HomePage";
import FileDisplay from "./Components/FileDisplay";
import Information from "./Components/Information";
import Transcribing from "./Components/Transcribing";


function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(true);


  const isAudioAvailable = file || audioStream;

  function handleAudioReset() {
    setFile(null);
    setAudioStream(null);
  }

  useEffect(() => {
    console.log(audioStream)
  }, [audioStream])

  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />
        {output ? (
          <Information/>
        ) : loading ? (
          <Transcribing/>
        ) : isAudioAvailable ? (
          <FileDisplay file={file} handleAudioReset={handleAudioReset} audioStream={audioStream}/>
        ) : (
          <HomePage setFile={setFile} setAudioStream={setAudioStream} />
        )}
      </section>
    </div>
  );
}

export default App;
