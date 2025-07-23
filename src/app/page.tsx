"use client"
import Image from "next/image";
import SearchBox from "./SearchBox";
import { useState, useEffect } from "react";

export default function Home() {
  const [filtered, setFiltered] = useState<any[]>([]);

  // โหลดข้อมูลครั้งแรก
  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => setFiltered(data));
  }, []);

  // ฟังก์ชันค้นหา
  async function handleSearch(kw: string) {
    const res = await fetch(
      `/api/customers?keyword=${encodeURIComponent(kw)}`
    );
    const data = await res.json();
    setFiltered(data);
  }

  return (
    <div>
      <header className="bg-white/30 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <a
              href="/"
              className="flex items-center gap-2 font-bold text-lg text-primary-foreground"
            >
              <span className="font-headline text-slate-800">ProdMan Lite</span>
            </a>
          </div>
        </div>
      </header>
      <div>
        <h2>Customers</h2>
        <SearchBox onSearch={handleSearch} />
        {Array.isArray(filtered) && filtered.length > 0 ? (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border px-2 py-1">#</th>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Country</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c: any, idx: number) => (
                <tr key={c.customerNumber}>
                  <td className="border px-2 py-1">{idx + 1}</td>
                  <td className="border px-2 py-1">{c.customerName} </td>
                  <td className="border px-2 py-1"> {c.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No customers found.</p>
        )}
      </div>
    </div>
  );
}
