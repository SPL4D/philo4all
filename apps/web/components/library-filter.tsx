"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { getAuthorById, type Tradition, type Work } from "@philo4all/content";
import { WorkCard } from "./work-card";

export function LibraryFilter({ works, traditions }: { works: Array<Work & { authorName?: string }>; traditions: Tradition[] }) {
  const [query, setQuery] = useState("");
  const [tradition, setTradition] = useState("all");
  const [length, setLength] = useState("all");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return works.filter((work) => {
      const author = getAuthorById(work.authorId);
      const queryText = `${work.title} ${work.authorName ?? author?.name ?? ""} ${work.summary} ${work.era}`.toLowerCase();
      const matchesQuery = normalizedQuery.length === 0 || queryText.includes(normalizedQuery);
      const matchesTradition = tradition === "all" || work.tradition === tradition;
      const matchesLength = length === "all" || work.readingLength === length;
      return matchesQuery && matchesTradition && matchesLength;
    });
  }, [length, query, tradition, works]);

  return (
    <>
      <div className="filters" role="search">
        <label>
          <span className="reader-kicker">Search</span>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Search aria-hidden="true" size={18} />
            <input
              className="input"
              placeholder="Search works, authors, eras"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </span>
        </label>
        <label>
          <span className="reader-kicker">Tradition</span>
          <select className="select" value={tradition} onChange={(event) => setTradition(event.target.value)}>
            <option value="all">All traditions</option>
            {traditions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="reader-kicker">Length</span>
          <select className="select" value={length} onChange={(event) => setLength(event.target.value)}>
            <option value="all">All lengths</option>
            <option value="Short">Short</option>
            <option value="Medium">Medium</option>
            <option value="Long">Long</option>
          </select>
        </label>
      </div>
      <div className="grid">
        {filtered.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </div>
    </>
  );
}
