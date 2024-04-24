"use client"
import LinkNavigationCard from "@/components/Main/LinkNavigationCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import library from '../../public/images/library.svg'
import learn from '../../public/images/learn.svg'
import review from '../../public/images/review.svg'
import stats from '../../public/images/stats.svg'
import { useSession } from "next-auth/react";

export default function Home() {

  const { status } = useSession()

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full w-full overflow-hidden">

      <ScrollArea className="paddings">
        <section className="flex flex-wrap justify-center items-center gap-4 w-full pb-6 pt-6 md:pt-0">
          <LinkNavigationCard navigatingForbidden={status === 'unauthenticated'} title={'Карточки'} description={"Алгоритмы подобрали для вас оптимальные слова"} href={'/learning'} image={learn} />
          <LinkNavigationCard navigatingForbidden={false} title={'Библиотека'} description={'Поиск новых коллекций'} href={'/collections'} image={library} />
          <LinkNavigationCard navigatingForbidden={false} title={'Обзор'} description={"В разработке..."} href={'/'} image={review} />
          <LinkNavigationCard navigatingForbidden={false} title={'Статистика'} description={'В разработке...'} href={'/'} image={stats} />
        </section>
      </ScrollArea>
    </div>
  );
}
