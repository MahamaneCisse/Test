"use client";
import { useState } from "react";

export default function MistralChat() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponse("Chargement...");

    const res = await fetch("../api/mistral", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await res.json();
    setResponse(data[0]?.generated_text || "Aucune réponse.");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pose ta question..."
        />
        <button type="submit">Envoyer</button>
      </form>
      <p>Réponse : {response}</p>
    </div>
  );
}
