"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from "axios"


const chartConfig = {
  visitors: {
    label: "Revenue",
  },
  totalRevenue: {    
    label: "Revenue",
    color: "hsl(221.2, 83.2%, 53.3%)",
  }
} satisfies ChartConfig

export default function Component() {
  const [timeRange, setTimeRange] = React.useState("90d")
  const [dataDisplay,setDataDisplay] = React.useState([{ totalRevenue: 2000,orderCount: 1,date: "2024-06-13" }])

  const[oneMonthData,setOneMonthData] = React.useState([]);
  const[sixMonthData,setSixMonthData] = React.useState([]);
  const[oneYearData,setOneYearData] = React.useState([]);
  const[allData,setAllData] = React.useState([]);

  const oneMonth = async ()=>{
    try {
        const res = axios.get('')
    } catch (error) {
        
    }
  }

  const sixMonth = async ()=>{
    try {
        const res = await axios.get('/api/order/six-month');
        setSixMonthData(res.data.data)
    } catch (error) {
        console.log("")
    }
  }

  const oneYear = async ()=>{
    try {
        const res = await axios.get('/api/order/one-year');
        setOneYearData(res.data.data)
    } catch (error) {
        console.log("")
    }
  }

  const allTime = async ()=>{
    try {
        const res = await axios.get('/api/order/all-time');
        setAllData(res.data.data)
    } catch (error) {
        console.log("")
    }
  }



  React.useEffect(()=>{
    oneMonth()
    sixMonth();
    oneYear();
    allTime();
  },[])

  React.useEffect(()=>{
    setData("180d")
  },[sixMonthData])


  
  const setData = (e:any)=>{
    setTimeRange(e)
    if(e=="30d"){
      if(oneMonthData.length==0){
          oneMonth()
      }
      setDataDisplay(oneMonthData)
    }
    else if(e=="180d"){
        if(sixMonthData.length==0){
            sixMonth()
        }
        setDataDisplay(sixMonthData)
    }
    else if(e=="365d"){
        if(oneYearData.length==0){
            oneYear()
        }
        setDataDisplay(oneYearData)
    }
    else if(e=="all"){
        if(allData.length==0){
            allTime()
        }
        setDataDisplay(allData)
    }
  }



 
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Revenue</CardTitle>
        </div>
        <Select value={timeRange} onValueChange={(e)=>setData(e)}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 1 months" />
          </SelectTrigger>

          <SelectContent className="rounded-xl">
            <SelectItem value="all" className="rounded-lg">
              All Time
            </SelectItem>
            <SelectItem value="365d" className="rounded-lg">
              Last 1 Year
            </SelectItem>
            <SelectItem value="180d" className="rounded-lg">
              Last 6 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={dataDisplay}>
            <defs>
              <linearGradient id="filltotalRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-totalRevenue)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-totalRevenue)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <YAxis
                dataKey="totalRevenue"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return value
                }}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="line"
                  payload={[{name:"Param"}]}
                  
                />
              }
            />
            <Area
              dataKey="totalRevenue"
              type="natural"
              fill="url(#filltotalRevenue)"
              stroke="var(--color-totalRevenue)"
              stackId="a"
            />
            {/* <ChartLegend content={<ChartLegendContent />} /> */}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
