import LinkNavigationCard from "@/components/Main/LinkNavigationCard";

export default async function Home() {

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full px-10 md:px-5 lg:px-10 xl:px-40">

      <section className="grid grid-cols-2 gap-4 w-full">
        <LinkNavigationCard title={'Повторять слова'} href={'/learning'} image={'/bg-images/3.jpg'} />
        <LinkNavigationCard title={'Найти новые коллекции'} href={'/collections'} image={'/bg-images/2.jpg'} />
      </section>
    </div>
  );
}
