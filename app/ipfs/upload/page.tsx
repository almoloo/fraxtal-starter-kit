"use client";
import { useState } from "react";

const page = () => {
  const [response, setResponse] = useState<object | null>(null);
  const [fileResponse, setFileResponse] = useState<object | null>(null);
  const [data, setData] = useState("[]");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("json", data);

      const res = await fetch("/api/v1/ipfs/upload", {
        method: "POST",
        body: form,
      });
      const json = await res.json();
      setResponse(json);
    } catch (error) {
      console.error(error);
      setResponse({ message: "Failed to save data." });
    }
  };

  const handleFileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const form = new FormData();
      if (selectedFile) {
        form.append("file", selectedFile);

        const res = await fetch("/api/v1/ipfs/upload", {
          method: "POST",
          body: form,
        });
        const json = await res.json();
        setFileResponse(json);
      } else {
        setFileResponse({ message: "No file selected." });
      }
    } catch (error) {
      console.error(error);
      setFileResponse({ message: "Failed to save file." });
    }
  };

  return (
    <div>
      <h1>Save JSON TO IPFS</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="[]"
          defaultValue={data}
          onChange={(e) => setData(e.target.value)}
        ></textarea>
        <button type="submit">Save</button>
      </form>
      <div>
        <h2>Response</h2>
        {response ? (
          <pre>{JSON.stringify(response)}</pre>
        ) : (
          <p>No data saved.</p>
        )}
      </div>
      <hr />
      <h1>Save File To IPFS</h1>
      <form onSubmit={handleFileSubmit}>
        <input
          type="file"
          onChange={(e) =>
            setSelectedFile(e.target.files ? e.target.files[0] : null)
          }
        />
        <button type="submit">Save</button>
      </form>
      <div>
        <h2>Response</h2>
        {fileResponse ? (
          <pre>{JSON.stringify(fileResponse)}</pre>
        ) : (
          <p>No file saved.</p>
        )}
      </div>
    </div>
  );
};

export default page;
