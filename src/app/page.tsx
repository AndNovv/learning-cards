import FlashCard from "@/components/FlashCard";
import { WordCollection } from "@/types/types";

async function fetchCollections() {
  try {
    const res = await fetch("http://localhost:3000/api/collections")
    const collections: WordCollection[] = await res.json()
    return collections
  }
  catch (e) {
    console.log(e)
  }
}


export default async function Home() {

  let collections
  try {
    collections = await fetchCollections()
  }
  catch (e) {
    return <div>Данные не найдены</div>
  }

  if (!collections) return <div>Данные не найдены</div>

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
