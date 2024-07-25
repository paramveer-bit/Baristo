'use client'

import { DataTable } from '@/components/data-table';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { columns } from './columns';
import loader from '@/assets/loader.gif'
import Image from 'next/image';


function Orders() {

  const[orders,setOrders] = useState([])
    const [filterCode,setFilterCode] = React.useState('');
    const { toast } = useToast();
    const[loading,setLoading] = useState(false)


    

    useEffect(()=>{
        const  fecthItems = async()=>{
          setLoading(true)
            try {
                const res = await axios.get('/api/order/get-all-orders')
                setOrders(res.data.data)
                console.log(res.data.data)
            } catch (error:any) {
                toast({
                    title : 'Failed',
                    description : error.response?.data.message || "Error in getting items",
                    variant : "destructive"
                });
            }
            finally{
              setLoading(false)
            }
        }
        fecthItems()
    },[])


  return (
    
    <div className=" w-full mx-3 p-3 ml-52">
      
      {
        loading ?
          <Image src={loader} alt='Loading' className='mx-auto w-[50%] block'/>
        :
          <>
            <div className=' flex justify-between mx-4' >
              <h1 className=" my-3 text-2xl font-semibold">Menu List</h1>
              <Input
                  placeholder='Enter Order Id'
                  className='h-10 rounded-lg my-auto w-auto'
                  value={filterCode}
                  onChange={(e:ChangeEvent<HTMLInputElement>)=>setFilterCode(e.target.value)}
              />
            </div>
            <DataTable columns={columns} data={orders} code={filterCode} accessorKey='orderNo'/>
          </>
      }

    </div>
  )
}

export default Orders