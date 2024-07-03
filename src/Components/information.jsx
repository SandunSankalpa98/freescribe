import React, { useState } from "react";

export default function Information() {
  const [tab, setTab] = useState('transcription');
  
  return (
    <main className="flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20 max-w-prose w-full mx-auto">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap">
        Your <span className="text-blue-400 bold">Transcription</span>
      </h1>
      <div className=" mx-auto shadow rounded-full overflow-hidden items-center grid grid-cols-2">
        <button 
          onClick={() => setTab('transcription')}
          className={`px-4 py-1 font-medium ${tab === 'transcription' ? 'bg-blue-300 text-white ' : 'to-blue-300 hover:text-blue-600'}`}
        >
          Transcription
        </button>
        <button 
          onClick={() => setTab('translation')}
          className={`px-4 py-1 font-medium ${tab === 'translation' ? 'bg-blue-300 text-white ' : 'to-blue-300 hover:text-blue-600'}`}
        >
          Translation
        </button>
      </div>
    </main>
  );
}
