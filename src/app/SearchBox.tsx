"use client";
import { useState } from "react";

export default function SearchBox({ onSearch }: { onSearch: (kw: string) => void }) {
  const [keyword, setKeyword] = useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSearch(keyword);
      }}
      className="mb-4"
    >
      <input
        type="text"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search customer name..."
        className="border px-2 py-1 mr-2"
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">

        Search
      </button>
    </form>
  );
}