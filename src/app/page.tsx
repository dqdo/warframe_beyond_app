'use client'
import Header from "@/app/components/Header";
import { SelectionBarButtons, SelectionBarSidebar } from "@/app/components/SelectionBar";
import { useState } from "react";
import { BuildSection } from "@/app/components/BuildSection";
import { Slots } from "@/app/components/Slots";

export default function Home() {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const isSidebarOpen = selectedButton !== null;
  const [selectedBuildType, setSelectedBuildType] = useState<string | null>(null);

  return (
    <>
      <div className="flex justify-between ml-4 mr-4">
        <Header />
        <SelectionBarButtons selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
      </div>

      <hr className="w-full border-white" />

      <SelectionBarSidebar selectedButton={selectedButton} selectedBuildType={selectedBuildType} />

      <BuildSection selectedBuildType={selectedBuildType} onBuildTypeSelect={setSelectedBuildType} />

      {selectedBuildType != null && (
        <div className={`min-h-[50vh] mt-10 ${isSidebarOpen ? "mr-[15vw]" : ""}`}>
          <Slots isSidebarOpen={isSidebarOpen} setSelectedButton={setSelectedButton} selectedButton={selectedButton} selectedBuildType={selectedBuildType} />
        </div>
      )}

    </>
  );
}
