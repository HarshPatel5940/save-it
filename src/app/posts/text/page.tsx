"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Card from "@/components/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [cards, setCards] = useState<React.ReactNode[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getData();
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = search;
    }
  }, [search]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  async function getData() {
    const start = (currentPage - 1) * 25;
    const end = currentPage * 25;
    const data = await getTextData(start, end, debouncedSearch);
    setCards(data);
  }

  async function getTextData(
    start: number,
    end: number,
    startswith?: string
  ): Promise<JSX.Element[]> {
    const cardList: JSX.Element[] = [];
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();

    for (let i = start; i < end && i < data.length; i++) {
      const post = data[i];
      if (startswith && !post.title.startsWith(startswith)) {
        continue;
      }
      cardList.push(
        <Card
          key={post.id}
          {...{
            title: post.title,
            userId: post.userId,
            id: post.id,
            body: post.body,
          }}
        />
      );
    }

    return cardList;
  }

  function handlePrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    setCurrentPage(currentPage + 1);
  }

  function handleSearch() {
    setSearch(inputRef.current?.value || "");
  }

  return (
    <>
      <Navbar {...{ text: "Home" }} />
      <div className="flex justify-center items-center gap-2 md:gap-5">
        <Input
          placeholder="Search"
          className="max-w-40 md:max-w-80"
          onChange={handleSearch}
          ref={inputRef}
        />

        <Link
          className={buttonVariants({ variant: "ghost" })}
          href={"/posts/text"}
        >
          Text
        </Link>

        <Link
          className={buttonVariants({ variant: "ghost" })}
          href={"/posts/image"}
        >
          Image
        </Link>

        <Separator orientation="vertical" className="h-6" />
        <Button variant="ghost" onClick={handlePrevPage}>
          Prev
        </Button>
        <Button variant="ghost" onClick={handleNextPage}>
          Next
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-5">
        {cards}
      </div>

      <Footer />
    </>
  );
}
