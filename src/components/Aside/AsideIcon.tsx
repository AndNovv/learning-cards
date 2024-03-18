import React from 'react'

const AsideIcon = ({ icon, description }: { icon: JSX.Element, description: string }) => {
    return (
        <div className='group relative flex items-center justify-center w-14 h-14 rounded-full hover:rounded-3xl bg-accent hover:bg-primary hover:text-primary-foreground cursor-pointer transition-all'>
            {icon}
            <div className='absolute left-20 min-h-fit bg-secondary text-secondary-foreground border p-2 rounded-xl invisible group-hover:visible'>
                <p className='text-nowrap'>{description}</p>
            </div>
        </div>
    )
}

export default AsideIcon