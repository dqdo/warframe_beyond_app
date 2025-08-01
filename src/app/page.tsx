'use client'
import Header from "@/app/components/Header";
import { SelectionBarButtons, SelectionBarSidebar } from "@/app/components/SelectionBar";
import { useEffect, useState } from "react";
import { BuildSection } from "@/app/components/BuildSection";
import { Slots } from "@/app/components/Slots";
import { ModWithTexture } from "./lib/api/fetchMods";
import { WarframeWithTexture } from "./lib/api/fetchWarframes";
import { WeaponWithTexture } from "./lib/api/fetchWeapons";

export default function Home() {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const isSidebarOpen = selectedButton !== null;
  const [selectedBuildType, setSelectedBuildType] = useState<string | null>(null);
  const [selectedMod, setSelectedMod] = useState<ModWithTexture | null>(null);
  const [assignedMods, setAssignedMods] = useState<Record<string, ModWithTexture | null>>({});
  const [totalDrain, setTotalDrain] = useState<number>(0);
  const [selectedWarframe, setSelectedWarframe] = useState<WarframeWithTexture | null>(null);
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponWithTexture | null>(null);
  const [calculatedDrains, setCalculatedDrains] = useState<Record<string, number>>({});

  console.log(assignedMods)

  useEffect(() => {
    setSelectedMod(null);
  }, [selectedBuildType]);

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-5 bg-[#121212]">
        <div className="flex justify-between ml-4 mr-4 py-2">
          <Header />
          <SelectionBarButtons selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
        </div>
        <hr className="w-full border-white" />
        <SelectionBarSidebar selectedButton={selectedButton} selectedBuildType={selectedBuildType} setSelectedMod={setSelectedMod} assignedMods={assignedMods} selectedMod={selectedMod} selectedWarframe={selectedWarframe} selectedWeapon={selectedWeapon} />
        <BuildSection selectedBuildType={selectedBuildType} onBuildTypeSelect={setSelectedBuildType} totalDrain={totalDrain} selectedWarframe={selectedWarframe} setSelectedWarframe={setSelectedWarframe} selectedWeapon={selectedWeapon} setSelectedWeapon={setSelectedWeapon} assignedMods={assignedMods} calculatedDrains={calculatedDrains} />
      </div>

      <div className="py-[9.5vh]">
        {selectedBuildType != null && (
          <div className={`min-h-[50vh] mt-2 ${isSidebarOpen ? "mr-[15vw]" : ""}`}>
            <div>
              <Slots isSidebarOpen={isSidebarOpen} setSelectedButton={setSelectedButton} selectedButton={selectedButton} selectedBuildType={selectedBuildType} selectedMod={selectedMod} assignedMods={assignedMods} setAssignedMods={setAssignedMods} setTotalDrain={setTotalDrain} setSelectedMod={setSelectedMod} calculatedDrains={calculatedDrains} setCalculatedDrains={setCalculatedDrains} />
            </div>
          </div>
        )}

      </div>

    </div>
  );
}