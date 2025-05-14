import Header from "@/app/components/Header";
import ButtonSelections from "@/app/components/SelectionBar/ButtonSelections"

export default function Home() {
  return (
    <>
      <div className="flex justify-between ml-4 mr-4">
        <Header />
        <ButtonSelections />
      </div>
    </>
  );
}
