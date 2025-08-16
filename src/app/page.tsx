'use client'
import Header from "@/app/components/Header";
import { SelectionBarButtons, SelectionBarSidebar } from "@/app/components/SelectionBar";
import { useEffect, useState, Suspense, useContext } from "react";
import { BuildSection } from "@/app/components/BuildSection";
import { Slots } from "@/app/components/Slots";
import Button from "./components/Elements/Button";
import { ModWithTexture } from "../../pages/api/fetchMods";
import { WarframeWithTexture } from "../../pages/api/fetchWarframes";
import { WeaponWithTexture } from "../../pages/api/fetchWeapons";
import { useSearchParams } from "next/navigation";
import { getBuild } from "./database/getBuild";
import Toast from "./components/Elements/Toast";
import { SessionContext } from "./SessionContext";
import Image from "next/image";
import { Modal } from "./components/Elements/Modal";
import { buildHandlers } from "./buildHandlers";

type Build = {
  buildID: string;
  buildName: string;
  auth0Owner: string;
  email: string;
  orokinReactor: boolean;
  itemRank: number;
  buildType: string | null;
  assignedMods: Record<string, ModWithTexture | null>;
  slotPolarities: Record<string, string>;
  currentModRanks: Record<string, number>;
  selectedWarframe: WarframeWithTexture | null;
  selectedWeapon: WeaponWithTexture | null;
};

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
  const [modalOpen, setModalOpen] = useState(false);
  const session = useContext(SessionContext);
  const [ownerBuilds, setOwnerBuilds] = useState<Build[]>([]);
  const [currentBuildOwner, setCurrentBuildOwner] = useState<string | null>(null);
  const [buildName, setBuildName] = useState("");
  const [buildsLoading, setBuildsLoading] = useState(false);

  const handlers = buildHandlers({
    session,
    searchParams,
    selectedWarframe,
    selectedWeapon,
    orokinReactor,
    itemRank,
    selectedBuildType,
    assignedMods,
    slotPolarities,
    currentModRanks,
    buildName,
    setToastMessage,
    setShowToast,
    setOwnerBuilds,
    setSelectedButton,
    setSelectedBuildType,
    setSelectedMod,
    setAssignedMods,
    setTotalDrain,
    setSelectedWarframe,
    setSelectedWeapon,
    setCalculatedDrains,
    setCurrentModRanks,
    setSlotPolarities,
    setItemRank,
    setOrokinReactor,
    setModalOpen: setModalOpen,
    setBuildName: setBuildName,
    setCurrentBuildOwner: setCurrentBuildOwner,
    setBuildsLoading: setBuildsLoading,
  });

  const getDisplayName = () => {
    return buildName ||
      (selectedWarframe?.name
        ? `${selectedWarframe.name} Build`
        : selectedWeapon?.name
          ? `${selectedWeapon.name} Build`
          : "Unnamed Build");
  };

  useEffect(() => {
    const buildParam = searchParams?.get("build");
    if (buildParam) {
      getBuild(buildParam).then((buildData) => {
        setCurrentBuildOwner(buildData.auth0Owner);
        setSelectedBuildType(buildData.buildType);
        setAssignedMods(buildData.assignedMods);
        setSlotPolarities(buildData.slotPolarities);
        setCurrentModRanks(buildData.currentModRanks);
        setSelectedWarframe(buildData.selectedWarframe);
        setSelectedWeapon(buildData.selectedWeapon);
        setItemRank(buildData.itemRank);
        setOrokinReactor(buildData.orokinReactor);
        setBuildName(buildData.buildName || "");
      }).catch(error => {
        console.error("Error loading build:", error);
      });
    }
  }, [searchParams]);

  return (
    <div>
      <div className="relative z-60">
        <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
      </div>
      <div className="fixed top-0 left-0 right-0 z-5 bg-[#121212]">
        <div className="flex justify-between ml-4 mr-4 py-2">
          <Header />
          <div className="flex gap-5">
            {session && session.user.sub === currentBuildOwner && (
              <>
                <Button text="⤓ Save Build" onClick={handlers.handleSaveBuild} />
              </>
            )}
            {session && (
              <>
                <Button text="👁 Show Builds" onClick={handlers.handleShowBuilds} />
              </>
            )}
            <Button text="⚒ New Build" onClick={handlers.handleNewBuild} />
            <Button text="🔗 Create Build" onClick={handlers.handleCreateBuild} />
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
          setIsDouble={setOrokinReactor}
          setSlotPolarities={setSlotPolarities} />
      </div>

      <div className="absolute top-[90px] right-0 flex items-center gap-2 p-2">
        <div className="border p-2 rounded border-gray-700 bg-neutral-800">
          {session ? (
            <a href="/auth/logout">Logout</a>
          ) : (
            <a href="/auth/login">Login</a>
          )}
        </div>

        {session && (
          <>
            {session.user.picture ? (
              <div className="relative group">
                <Image src={session.user.picture} alt="User profile" width={40} height={40} className="rounded-full" />
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                           bg-gray-800 text-white text-xs rounded px-2 py-1 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                           whitespace-nowrap z-10">
                  {session.user.name || "User"}
                </span>
              </div>
            ) : (
              <div className="text-white">
                {session.user.name}
              </div>
            )}
          </>
        )}
      </div>

      <div className="py-[120px]">
        <div className={`absolute left-1/2 -translate-x-1/2 top-25 ${isSidebarOpen ? 'right-[24vw]' : ''}`}>
          <input
            type="text"
            value={buildName}
            onChange={(e) => setBuildName(e.target.value)}
            placeholder={getDisplayName()}
            className="text-white rounded border border-gray-700 text-center"
          />
        </div>
        {selectedBuildType != null && (
          <div className={`min-h-[50vh] mt-5 ${isSidebarOpen ? "mr-[15vw]" : ""}`}>
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
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="p-4">
          <div>
            <h2 className="text-lg font-bold mb-5">Your Builds</h2>
          </div>
          {buildsLoading ? (
            <div className="flex justify-center items-center h-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : ownerBuilds.length === 0 ? (
            <p>No builds found.</p>
          ) : (
            <div>
              <div className={`h-160 w-full px-2 overflow-y-auto scrollbar-custom`}>
                <ul>
                  {ownerBuilds.map((build, index) => (
                    <li key={build.buildID} className={`border-b border-neutral-500 p-2 flex justify-between items-center ${index % 2 === 0 ? "bg-neutral-800" : "bg-neutral-900"}`}>
                      <span>{build.buildName}</span>
                      <div className="flex gap-1">
                        <Button text="Delete" onClick={() => handlers.handleDeleteBuild(build.buildID)} />
                        <div className="text-xl">|</div>
                        <Button text="Load" onClick={() => {
                          window.location.href = `?build=${build.buildID}`;
                        }} />

                        <div className="text-xl">|</div>
                        <Button text="Copy Link" onClick={() => {
                          const shareableUrl = `${window.location.origin}?build=${build.buildID}`;
                          navigator.clipboard.writeText(shareableUrl);
                          setToastMessage(`Link copied to clipboard: ${shareableUrl}`);
                          setShowToast(true);
                        }} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>}>
      <HomeContent />
    </Suspense>
  );
}