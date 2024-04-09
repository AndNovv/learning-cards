import React from 'react'
import LinkNavigationCard from '../Main/LinkNavigationCard'
import create from '../../../public/images/create.svg'
import library from '../../../public/images/library.svg'

const NothingToRepeatPage = () => {
    return (
        <div className="flex flex-col gap-10 justify-center items-center h-full w-full">

            <div className='px-6'>
                <h2 className='text-xl text-center opacity-60'>Вы уже повторили все слова. Cоздайте новую коллекцию или найдите подходящую в библиотеке!</h2>
            </div>
            <section className="flex flex-wrap justify-center items-center gap-4 w-full">
                <LinkNavigationCard title={'Создать коллекцию'} description={"С чистого листа"} href={'/create'} image={create} />
                <LinkNavigationCard title={'Библиотека'} description={'Поиск новых коллекций'} href={'/collections'} image={library} />
            </section>
        </div>
    )
}

export default NothingToRepeatPage