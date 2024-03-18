import FlashCard from "@/components/FlashCard";
import { beginnerPack } from "@/data/data";

export default function Home() {
  return (
    <main className="flex flex-col px-10 py-4">

      <section className="flex flex-row flex-wrap gap-4">
        {beginnerPack.flashcards.map((flashcardInfo, index) => {
          return (
            <FlashCard flashcardInfo={flashcardInfo} key={`flashcard${index}`} />
          )
        })}
      </section>
    </main>
  );
}
