import React from 'react'
import create from '../../../public/images/create.svg'
import library from '../../../public/images/library.svg'
import LinkNavigationCard from '@/components/Main/LinkNavigationCard'

const FinishedLearningPage = () => {
    return (
        <div className="flex flex-col gap-10 justify-center items-center h-full w-full paddings">

            <div className='px-6'>
                <h2 className='text-xl text-center opacity-60'>Вы уже повторили все слова. Cоздайте новую коллекцию или найдите подходящую в библиотеке!</h2>
            </div>
            <section className="flex flex-wrap justify-center items-center gap-4 w-full">
                <LinkNavigationCard navigatingForbidden={false} title={'Создать коллекцию'} description={"С чистого листа"} href={'/create'} image={create} />
                <LinkNavigationCard navigatingForbidden={false} title={'Библиотека'} description={'Поиск новых коллекций'} href={'/collections'} image={library} />
            </section>
        </div>
    )
}

export default FinishedLearningPage