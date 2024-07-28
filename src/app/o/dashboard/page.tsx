'use client'

import React, { useEffect, useState } from 'react'
import Card from '@/components/card'
import more from '@/assets/more.svg'
import dollar from '@/assets/dollar.svg'
import rocket from '@/assets/rocket.svg'
import customer from '@/assets/customer.svg'
import Image from 'next/image'
import axios from 'axios'
import Chart from "@/app/o/dashboard/Chart"


export interface MonthDetails extends Document {
    month : number,
    year :  number,
    revenue : number,
    orders : number,
    customer : number
}

export interface RevenueDetails extends Document {
    totalRevenue : number,
    totalCount : number,
    totalCustomer : number,
}





function DashBoardPage() {

    const [revenueDetails,setRevenueDetails] = useState<RevenueDetails>()

    const [revenueChart,setRevenueChart] = useState([])

    useEffect(()=>{
        const featchDetails = async () =>{
            try {
                const res = await axios.get('/api/order/this-month-revnue')
                setRevenueDetails(res.data.data)
                console.log(res.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        featchDetails()
    },[])
    useEffect(()=>{
        console.log(revenueChart)
    },[revenueChart])

  return (
    revenueDetails!=undefined &&<div className=" w-full mx-3 p-3 ml-56">
        <h1 className=" my-3 text-2xl font-semibold">DashBoard</h1>
        <div className='grid gap-8 grid-cols-4 h-32 mt-7'>
            <Card image={dollar}  value={revenueDetails!.totalRevenue} name="Revenue"/>
            <Card image={rocket}  value={revenueDetails!.totalCount} name="Orders"/>
            <Card image={more}  value={2560} name="Items"/>
            <Card image={customer}  value={revenueDetails!.totalCustomer} name="Customers"/>
        </div>
        <div className='grid gap-8 grid-cols-2 mt-5'>
            <div className=''>
                <Chart />
            </div>
        </div>


    </div>
  )
}

export default DashBoardPage