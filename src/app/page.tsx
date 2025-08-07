'use client'
import Header from "@/app/components/Header";
import { SelectionBarButtons, SelectionBarSidebar } from "@/app/components/SelectionBar";
import { useEffect, useState } from "react";
import { BuildSection } from "@/app/components/BuildSection";
import { Slots } from "@/app/components/Slots";
import Button from "./components/Elements/Button";
import { createBuild } from "./database/createBuild";
import { ModWithTexture } from "../../pages/api/fetchMods";
import { WarframeWithTexture } from "../../pages/api/fetchWarframes";
import { WeaponWithTexture } from "../../pages/api/fetchWeapons";

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
  const [currentModRanks, setCurrentModRanks] = useState<Record<string, number>>({});
  const [slotPolarities, setSlotPolarities] = useState<Record<string, string>>({});

  const handleSaveBuild = () => {
    const buildData = {
      orokinReactor: true,
      itemRank: 30,
      buildType: selectedBuildType,
      assignedMods: assignedMods,
      slotPolarities: slotPolarities,
      currentModRanks: currentModRanks,
      selectedWarframe: selectedWarframe,
      selectedWeapon: selectedWeapon
    };

    createBuild(buildData)
      .then(buildID => {
        console.log("Build created with ID:", buildID);
        alert(`Build saved successfully! Build ID: ${buildID}`);
      })
      .catch(error => {
        console.error("Error creating build:", error);
        alert("Failed to save build. Please try again.");
      });
  };

  useEffect(() => {
    setSelectedMod(null);
  }, [selectedBuildType]);

  useEffect(() => {
    setAssignedMods({});
    setSelectedMod(null);
  }, [selectedWarframe, selectedWeapon]);

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-5 bg-[#121212]">
        <div className="flex justify-between ml-4 mr-4 py-2">
          <Header />
          <div className="flex gap-5">
            <Button
              text="🔗 Create & Save Build"
              onClick={handleSaveBuild}
            />
            <SelectionBarButtons selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
          </div>

        </div>
        <hr className="w-full border-white" />
        <SelectionBarSidebar selectedButton={selectedButton} selectedBuildType={selectedBuildType} setSelectedMod={setSelectedMod} assignedMods={assignedMods} selectedMod={selectedMod} selectedWarframe={selectedWarframe} selectedWeapon={selectedWeapon} />
        <BuildSection selectedBuildType={selectedBuildType} onBuildTypeSelect={setSelectedBuildType} totalDrain={totalDrain} selectedWarframe={selectedWarframe} setSelectedWarframe={setSelectedWarframe} selectedWeapon={selectedWeapon} setSelectedWeapon={setSelectedWeapon} assignedMods={assignedMods} calculatedDrains={calculatedDrains} />
      </div>

      <div className="py-[120px]">
        {selectedBuildType != null && (
          <div className={`min-h-[50vh] mt-2 ${isSidebarOpen ? "mr-[15vw]" : ""}`}>
            <div>
              <Slots
                isSidebarOpen={isSidebarOpen}
                setSelectedButton={setSelectedButton}
                selectedButton={selectedButton}
                selectedBuildType={selectedBuildType}
                selectedMod={selectedMod}
                assignedMods={assignedMods}
                setAssignedMods={setAssignedMods}
                setTotalDrain={setTotalDrain}
                setSelectedMod={setSelectedMod}
                calculatedDrains={calculatedDrains}
                setCalculatedDrains={setCalculatedDrains}
                currentRanks={currentModRanks}
                setCurrentRanks={setCurrentModRanks}
                slotPolarities={slotPolarities}
                setSlotPolarities={setSlotPolarities} />
            </div>
          </div>
        )}

      </div>

    </div>
  );
}