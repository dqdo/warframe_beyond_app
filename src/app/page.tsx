'use client'
import Header from "@/app/components/Header";
import { SelectionBarButtons, SelectionBarSidebar } from "@/app/components/SelectionBar";
import { useState } from "react";
import { BuildSection } from "@/app/components/BuildSection";

export default function Home() {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  return (
    <>
      <div className="flex justify-between ml-4 mr-4">
        <Header />
        <SelectionBarButtons selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
      </div>
      <hr className="w-full border-white" />
      <SelectionBarSidebar selectedButton={selectedButton} />
      <BuildSection />
    </>
  );
}
