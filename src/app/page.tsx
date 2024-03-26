import FlashCard from "@/components/FlashCard";
import { WordCollection } from "@/types/types";


export default async function Home() {

  let collections: WordCollection[]
  try {
    collections = []
  }
  catch (e) {
    return <div>Данные не найдены</div>
  }

  if (!collections.length) return <div>Данные не найдены</div>

  const collection = collections[1]


  return (
    <main className="flex flex-col px-10 py-4">

      <section className="flex flex-row flex-wrap gap-4">
        {collection.flashcards.map((flashcardInfo, index) => {
          return (
            <FlashCard flashcardInfo={flashcardInfo} key={`flashcard${index}`} />
          )
        })}
      </section>

    </main>
  );
}
