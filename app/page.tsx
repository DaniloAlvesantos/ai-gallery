"use client";
import { title } from "@/components/primitives";
import { useScrape } from "@/hooks/useScrape";
import { useRef } from "react";

export default function Home() {
  const pageRef = useRef();
  const source = useScrape();
  
  return (
    <section id="main">
      <span>
        <h1 className={title()}>AI Gallery</h1>
        <p>Scroll for AI generated images</p>
      </span>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-6 mt-6">
        {source.data?.images.map((image) => (
          <img
            src={image}
            alt=""
            className="break-inside-avoid my-2 rounded"
            key={image}
          />
        ))}
      </div>
    </section>
  );
}
