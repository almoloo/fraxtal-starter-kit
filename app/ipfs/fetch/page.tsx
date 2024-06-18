"use client";
import { useState } from "react";

const fileHash = "QmZ3Z";
const jsonHash = "QmZ3Z";

const page = () => {
  const [json, setJson] = useState([]);
  return (
    <div>
      <h1>FETCH IPFS</h1>
      <form>
        <input type="text" placeholder="IPFS Hash" />
        <button type="submit">Fetch</button>
      </form>
      <div>
        <h2>Response:</h2>
        {json.length > 0 ? (
          json.map((item, index) => (
            <pre key={index}>
              <p>{item}</p>
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
