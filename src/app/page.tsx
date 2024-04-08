import LinkNavigationCard from "@/components/Main/LinkNavigationCard";

export default async function Home() {

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full w-full">

      <section className="flex flex-wrap justify-center items-center gap-4 w-full">
        <LinkNavigationCard title={'Повторять слова'} description={"Алгоритмы подобрали для вас оптимальные слова"} href={'/learning'} image={'/images/learn.svg'} />
        <LinkNavigationCard title={'Библиотека'} description={'Поиск новых коллекций'} href={'/collections'} image={'/images/library.svg'} />
        <LinkNavigationCard title={'Обзор'} description={"В разработке..."} href={'/'} image={'/images/review.svg'} />
        <LinkNavigationCard title={'Статистика'} description={'В разработке...'} href={'/'} image={'/images/stats.svg'} />
      </section>
    </div>
  );
}
