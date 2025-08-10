'use client'
import Header from "@/app/components/Header";
import { SelectionBarButtons, SelectionBarSidebar } from "@/app/components/SelectionBar";
import { useEffect, useState, Suspense, useContext } from "react";
import { BuildSection } from "@/app/components/BuildSection";
import { Slots } from "@/app/components/Slots";
import Button from "./components/Elements/Button";
import { createBuild } from "./database/createBuild";
import { ModWithTexture } from "../../pages/api/fetchMods";
import { WarframeWithTexture } from "../../pages/api/fetchWarframes";
import { WeaponWithTexture } from "../../pages/api/fetchWeapons";
import { useSearchParams } from "next/navigation";
import { getBuild } from "./database/getBuild";
import Toast from "./components/Elements/Toast";
import { SessionContext } from "./SessionContext";

function HomeContent() {
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
  const [itemRank, setItemRank] = useState(30);
  const [orokinReactor, setOrokinReactor] = useState(true);
  const searchParams = useSearchParams();
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const session = useContext(SessionContext);

  const handleSaveBuild = () => {
    const buildData = {
      orokinReactor: orokinReactor,
      itemRank: itemRank,
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
        const shareableUrl = `${window.location.origin}?build=${buildID}`;
        navigator.clipboard.writeText(shareableUrl)
          .then(() => {
            setToastMessage(`Link copied to clipboard: ${shareableUrl}`);
            setShowToast(true);
          })
          .catch(() => {
            console.log("Clipboard write failed");
          });
        window.history.pushState({}, '', `?build=${buildID}`);
      })
      .catch(error => {
        console.error("Error creating build:", error);
      });
  };

  useEffect(() => {
    const buildParam = searchParams?.get("build");
    if (buildParam) {
      getBuild(buildParam).then((buildData) => {
        setSelectedBuildType(buildData.buildType);
        setAssignedMods(buildData.assignedMods);
        setSlotPolarities(buildData.slotPolarities);
        setCurrentModRanks(buildData.currentModRanks);
        setSelectedWarframe(buildData.selectedWarframe);
        setSelectedWeapon(buildData.selectedWeapon);
        setItemRank(buildData.itemRank);
        setOrokinReactor(buildData.orokinReactor);
      }).catch(error => {
        console.error("Error loading build:", error);
      });
    }
  }, [searchParams]);

  return (
    <div>
      <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
      <div className="fixed top-0 left-0 right-0 z-5 bg-[#121212]">
        <div className="flex justify-between ml-4 mr-4 py-2">
          <Header />
          <a href="/auth/login">Login</a>
          <a href="/auth/logout">Logout</a>
          {session?.user.name}
          {session && (
            <div>
              Logged in
              </div>
          )}
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
        <BuildSection
          selectedBuildType={selectedBuildType}
          onBuildTypeSelect={setSelectedBuildType}
          totalDrain={totalDrain}
          selectedWarframe={selectedWarframe}
          setSelectedWarframe={setSelectedWarframe}
          selectedWeapon={selectedWeapon}
          setSelectedWeapon={setSelectedWeapon}
          assignedMods={assignedMods}
          setAssignedMods={setAssignedMods}
          calculatedDrains={calculatedDrains}
          setCalculatedDrains={setCalculatedDrains}
          count={itemRank}
          setCount={setItemRank}
          isDouble={orokinReactor}
          setIsDouble={setOrokinReactor} />
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

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}