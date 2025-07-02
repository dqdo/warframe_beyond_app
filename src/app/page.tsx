'use client'
import Header from "@/app/components/Header";
import { SelectionBarButtons, SelectionBarSidebar } from "@/app/components/SelectionBar";
import { useState } from "react";
import { BuildSection } from "@/app/components/BuildSection";
import { ModSlotsContainer } from "@/app/components/ModSlotsContainer";

export default function Home() {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const isSidebarOpen = selectedButton !== null;

  return (
    <>
      <div className="flex justify-between ml-4 mr-4">
        <Header />
        <SelectionBarButtons selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
      </div>

      <hr className="w-full border-white" />

      <SelectionBarSidebar selectedButton={selectedButton} />

      <BuildSection />

      <div className={`flex items-center justify-center min-h-[50vh] mt-20 ${isSidebarOpen ? "mr-[15vw]" : ""}`}>
        <ModSlotsContainer isSidebarOpen={isSidebarOpen} />
      </div>

    </>
  );
}
