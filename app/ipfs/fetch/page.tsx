"use client";
import { useState } from "react";

const fileHash = "QmZ3Z";
const jsonHash = "QmZ3Z";

const page = () => {
  const [hash, setHash] = useState("");
  const [json, setJson] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/v1/ipfs/fetch?hash=${hash}`);
    const data = await res.json();
    setJson(data);
  };

  return (
    <div>
      <h1>FETCH IPFS</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="IPFS Hash"
          defaultValue={hash}
          onChange={(e) => setHash(e.target.value)}
        />
        <button type="submit">Fetch</button>
      </form>
      <div>
        <h2>Response:</h2>
        {json.length > 0 ? (
          json.map((item, index) => (
            <pre key={index}>
              <p>{JSON.stringify(item)}</p>
            </pre>
          ))
        ) : (
          <p>No data fetched.</p>
        )}
        <p></p>
      </div>
    </div>
  );
};

export default page;
