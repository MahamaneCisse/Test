"use client";

import { useState } from "react";

export default function Home() {
  const [htmlCode, sethtmlCode] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const msg = formData.get("msg") as string;

    const result = await fetch("/api/generator", {
      method: "POST",
      body: JSON.stringify({ msg }),
    });

    const json = await result.json();
    sethtmlCode(json.code);
  };
  return (
    <main className="h-full relative">
      <pre>{htmlCode}</pre>

      <div dangerouslySetInnerHTML={{ __html: htmlCode }}></div>

      <div className="fixed bottom-4 left-0 right-0">
        <form className="p-4 bg-slate-400 max-w-lg" onSubmit={handleSubmit}>
          <fieldset>
            <textarea name="msg" id="msg"></textarea>
            <button type="submit">Gen</button>
          </fieldset>
        </form>
      </div>
    </main>
  );
}
