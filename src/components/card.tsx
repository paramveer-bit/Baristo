import Image from 'next/image'
import React from 'react'

interface CardProps {
  image: string;
  name: string;
  value : number;
}

const Card : React.FC<CardProps> = ({ image, name, value }) => {
  return (
    <div className='bg-white p-3 rounded-lg flex items-center overflow-hidden'>
        <Image src={image} alt={name} width={50} height={50} className='h-24 w-24' />
        <div className='mx-4'>
            <h1 className='text-2xl font-semibold'>{value}</h1>
            <h1 className='text-xl font-medium'>{name}</h1>
        </div>
    </div>
  ) 
}

export default Card