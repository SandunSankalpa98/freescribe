import React, { useState, useEffect, useRef } from "react";

import Header from "./Components/Header";
import HomePage from "./Components/HomePage";
import FileDisplay from "./Components/FileDisplay";
import Information from "./Components/Information";
import Transcribing from "./Components/Transcribing";

function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const isAudioAvailable = file || audioStream;

  function handleAudioReset() {
    setFile(null);
    setAudioStream(null);
  }

  const worker = useRef(null);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("./utils/whisper.worker.js", import.meta.url),
        {
          type: "module",
        }
      );
    }

    const onMessageReceived = async (e) => {
      switch (e.data.type) {
        case "DOWNLOADING":
          setDownloading(true);
          console.log("DOWMLOADING");
          break;
        case "LOADING":
          setLoading(true);
          console.log("LOADING");
          break;
        case "RESULT":
          setOutput(e.data.results)
          break;
        case "INFERENCE_DONE":
          setFinished(true);
          console.log("DONE");
          break;
      }
    }
    worker.current.addEventListener('message', onMessageReceived)

    return () => worker.current.removeEventListner('message', onMessageReceived)
  }, [])

  async function readAudioFrom(file) {
    const sampling_rate = 16000
    const audioCTX = new AudioContext({sampleRate: sampling_rate})
    const response = await file.arrayBuffer()
    const decoded = await audioCTX.decodeAudioData(response)
    const audio = decoded.getChannelData(0)
    return audio
  }

  async function handleFormSubmission() {
    if (!file && !audioStream) { return }
    let audio = await readAudioFrom(file ? file : audioStream)
    const model_name = `openai/whisper-tiny.en`

     worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name
     })
  }

  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />
        {output ? (
          <Information />
        ) : loading ? (
          <Transcribing />
        ) : isAudioAvailable ? (
          <FileDisplay
            file={file}
            handleAudioReset={handleAudioReset}
            audioStream={audioStream}
          />
        ) : (
          <HomePage setFile={setFile} setAudioStream={setAudioStream} />
        )}
      </section>
    </div>
  );
}

export default App;
