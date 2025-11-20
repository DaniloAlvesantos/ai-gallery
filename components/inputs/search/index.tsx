"use client";
import { Input } from "@heroui/input";
import { SearchIcon } from "@/components/icons";
import { KeyboardEvent } from "react";

export const SearchInput = () => {
  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key !== "Enter") return;

    const param = encodeURIComponent(e.currentTarget.value);
    window.location.assign(`/?q=${param}`);
  };
  return (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm min-w-[11rem]",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      onKeyUp={handleSearch}
      type="search"
    />
  );
};
