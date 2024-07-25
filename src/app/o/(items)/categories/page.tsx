'use client'

import React, { useEffect, useState } from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import NewCategory from './AddCategory'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react'
import { useRouter } from 'next/navigation'
import loader from '@/assets/loader.gif'
import Image from 'next/image'



type cate = {
  _id : string
  image : string
  name : string
}

const data = [
  { image: "https://utfs.io/f/5d6b4ecd-f497-4d4b-bab5-17ffb5e430a5-2p.jpeg",
    name: "Pizzas",
    __v: 0,
    _id : "66926b4727280120864be468"
  },
  { image: "https://utfs.io/f/5d6b4ecd-f497-4d4b-bab5-17ffb5e430a5-2p.jpeg",
    name: "Pizzas",
    __v: 0,
    _id : "66926b4727280120864be468"
  },
  { image: "https://utfs.io/f/5d6b4ecd-f497-4d4b-bab5-17ffb5e430a5-2p.jpeg",
    name: "Pizzas",
    __v: 0,
    _id : "66926b4727280120864be468"
  },
  { image: "https://utfs.io/f/5d6b4ecd-f497-4d4b-bab5-17ffb5e430a5-2p.jpeg",
    name: "Pizzas",
    __v: 0,
    _id : "66926b4727280120864be468"
  },
  { image: "https://utfs.io/f/5d6b4ecd-f497-4d4b-bab5-17ffb5e430a5-2p.jpeg",
    name: "Pizzas",
    __v: 0,
    _id : "66926b4727280120864be468"
  },
  { image: "https://utfs.io/f/5d6b4ecd-f497-4d4b-bab5-17ffb5e430a5-2p.jpeg",
    name: "Pizzas",
    __v: 0,
    _id : "66926b4727280120864be468"
  },
  { image: "https://utfs.io/f/5d6b4ecd-f497-4d4b-bab5-17ffb5e430a5-2p.jpeg",
    name: "Pizzas",
    __v: 0,
    _id : "66926b4727280120864be468"
  },
  { image: "https://utfs.io/f/5d6b4ecd-f497-4d4b-bab5-17ffb5e430a5-2p.jpeg",
    name: "Pizzas",
    __v: 0,
    _id : "66926b4727280120864be468"
  },
  { image: "https://utfs.io/f/5d6b4ecd-f497-4d4b-bab5-17ffb5e430a5-2p.jpeg",
    name: "Pizzas",
    __v: 0,
    _id : "66926b4727280120864be468"
  },
  { image: "https://utfs.io/f/5d6b4ecd-f497-4d4b-bab5-17ffb5e430a5-2p.jpeg",
    name: "Pizzas",
    __v: 0,
    _id : "66926b4727280120864be468"
  },
]

function AddCategory() {
    const[categories,setCategories] = useState([])
    const router = useRouter()
    const[loading,setLoading] = useState(false)

  // Fetching all categories
    useEffect(()=>{
        const fetchCategory = async ()=>{
          setLoading(true)
            try{
                const res = await axios.get('/api/category/getall')
                setCategories(res.data.data)
                console.log(res.data.data)
            }catch{
              console.log("Error Occur while fetching")
            }
            finally {
              setLoading(false)
            }

        }
        fetchCategory()
    },[])

    const handelCategoryCard = (id:string)=>{
      router.push(`/o/categories/${id}`)
    }

    


  return (

    <div className=" w-full mx-3 p-3 ml-52"> 
      {
        loading ?
          <Image src={loader} alt='Loading' className='mx-auto w-[50%] block'/>
        :
          <>
            {/* Add Category Button */}
            <div className='flex justify-between'>
              <h1 className=" my-3 text-2xl font-semibold mx-4">Menu List</h1>
              {/* <Button >New Category</Button> */}
                <NewCategory />
            </div>
      
            <div className='grid grid-cols-3 gap-3'>
              {categories.map((category:cate, index) => (
                    <button onClick={()=>handelCategoryCard(category._id)}>
                      <div className="p-1" key={category._id}>
                        <Card className=''>
                          <CardHeader>
                            <img 
                              src={category.image} alt="" 
                              className='w-full h-52 rounded-sm' 
                            />
                            </CardHeader>
                          <CardContent className="flex justify-between">
                            <h1 className='text-2xl font-semibold'>{category.name}</h1>
                            <div className='font-medium font-serif'>
                              <h1>Total Items : 100</h1>
                              <h1>Revenue : ₹9590</h1>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </button>
                ))}
            </div>
          </>

      }
    </div>
  )
}

export default AddCategory