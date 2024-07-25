'use client'

import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Order } from '@/models/order.model'
import { DataTable } from '@/components/data-table'
import { columns } from './columns'
import location from '@/assets/location.svg'
import call from '@/assets/callIcon.svg'
import userIcon from '@/assets/userIcon.svg'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { toast } from '@/components/ui/use-toast'
import { Link } from 'lucide-react'
import loader from '@/assets/loader.gif'


const FormSchema = z.object({
  status: z
    .string({
      required_error: "Please select an email to display.",
    })
})

function OrderPage() {
    const [order,setOrder] = useState<Order>()
    const[ color,setColor] = useState<string>('')
    const [orderItems,setOrderItems] = useState<any>([])
    const[changingStatus,setChangingStatus] = useState(false)
    const[loading,setLoading] = useState(false)


    const param = useParams<{orderNo:string}>()
    const id = param.orderNo

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          status: order?.status,
        },
      })
     
      async function onSubmit(data: z.infer<typeof FormSchema>) {
        setChangingStatus(true)
        try {
          const res = await axios.patch('/api/order/change-status',{
            orderId : id,
            status : data.status
          })
          if (order && data && typeof data.status !== 'undefined') {
            order.status = data.status;
          }
          console.log(order)
          
          toast({
            title: "Order status SuccessFully changed",
          })
        } catch (error) {
          console.log(error)
          toast({
            title: "Error in  changing order Status",
          })
        }
        finally{
          setChangingStatus(false)
        }



        
      }
    


// To fetxh order Details
    useEffect(()=>{
        const fecthOrder = async ()=>{
          setLoading(true)
            try {
                const res = await axios.get(`/api/order/get-one/${id}`)
                setOrder(res.data.data)
                setOrderItems(res?.data?.data?.items)
            } catch (error) {
                console.log(error)
            }
            finally{
              setLoading(false)
            }
        }
        fecthOrder()
    },[])

    useEffect(()=>{
      console.log(orderItems.length)
        if(order){
            if(order!.status == "Pending"){
                setColor("bg-blue-500")
            }
            else if(order!.status == "Completed"){
                setColor("bg-green-300")
            }
            else if(order!.status == "Cancelled"){
                setColor("bg-red-400")
            }
        }
        console.log(color)
    },[order,changingStatus])


    
  return (
    loading ?
      <Image src={loader} alt='Loading' className='mx-auto w-[50%] block'/>
    :
      <>
            <div className=" w-full mx-3 p-3 ml-52">
              <div className={`flex justify-between mr-72 ${color} rounded-lg pl-4`}>
                  <h1 className=" my-3 text-2xl font-semibold">#{order?.orderNo}</h1>
              </div>


              <div className='flex w-full justify-between '>
                  {/* Items Table  */}
                  <div className='w-full mr-72'>
                      <DataTable columns={columns} data={orderItems} />
                  </div>
                  {/* Order Details */}
                  <div className='rounded-md border bg-white my-5 p-3 px-5 w-72 fixed right-5 top-0 space-y-3 ml-3 h-[700px] mb-5'>
                      <Image src={userIcon} alt="user" className='w-[50%] mx-auto border rounded-3xl'/>
                      {/* <div className='bg-blue-600 text-white rounded-2xl p-1'>Customer</div> */}

                      <h1 className='text-2xl font-bold'>{order?.name}</h1>
                      
                      <div className='flex'>
                        <Image src={location} alt="" className='h-8 w-8'/>
                        <h1 className='pt-1 px-2'>Tabel {order?.tableNo}</h1>
                      </div>
                      <div className='flex mb-8'>
                        <Image src={call} alt="" className='h-7 w-7'/>
                        <h1 className='pt-1 px-4'>+91 {order?.phoneNo}</h1>
                      </div>
                      <hr />

                      {/* Order Instruction */}
                      <div className='space-y-3 max-h-52 overflow-hidden'>
                          <h1 className='font-semibold'>Order Instruction</h1>
                          <p>
                              Very Less chill. With some extra cheese and onion. 
                          </p>
                      </div>
                      <hr />

                      {/* Change Status */}
                      <div className='space-y-3'>
                          <h1 className='font-semibold'>Change Order Status</h1>
                          <Form {...form}>
                              <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                                  <FormField
                                  control={form.control}
                                  name="status"
                                  render={({ field }) => (
                                      <FormItem>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                          <FormControl>
                                          <SelectTrigger>
                                              <SelectValue placeholder={order?.status}/>
                                          </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                          <SelectItem value="Pending">Pending</SelectItem>
                                          <SelectItem value="Completed">Completed</SelectItem>
                                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                                          </SelectContent>
                                      </Select>
                                      <FormMessage />
                                      </FormItem>
                                  )}
                                  />
                                  <Button type="submit" disabled={changingStatus}>Submit</Button>
                              </form>
                          </Form>
                      </div>
                  </div>
              </div>
            </div>  
        
      </>
  )
}

export default OrderPage