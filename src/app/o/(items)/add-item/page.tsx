"use client"
 
import { z } from "zod"
import { addItemSchema } from "@/schemas/addItem.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { isBase64Image } from "@/lib/utils";
import itemImage from "@/assets/item-image.svg"
import axios from 'axios'

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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


import { useUploadThing } from "@/utils/uploadthing";
import { useRouter } from "next/router"
import { usePathname } from "next/navigation"
import { Props } from "next/script"
import { ChangeEvent, useEffect, useState } from "react"
import Image from "next/image"
import { set } from "mongoose"
import { useToast } from "@/components/ui/use-toast"





function AddItem() {

    const { startUpload } = useUploadThing("imageUploader", {
        onClientUploadComplete: () => {
            console.log("uploaded successfully!");
        },
        onUploadError: () => {
            toast({
                title : 'Error while uploading image',
                variant : "destructive"
            })
        },
        onUploadBegin: () => {
            toast({
                title : 'Upload has begun',
                className : " border-2 border-green-600"
            })
        },
    });
    
    const [files, setFiles] = useState<File[]>([]);
    const [categories,setCategories] = useState([])
    const [uploading, setUploading] = useState(false);
    const { toast } = useToast();



    const form = useForm<z.infer<typeof addItemSchema>>({
        resolver: zodResolver(addItemSchema),
        defaultValues: {
          name: "",
        },
      })

    const onSubmit = async (values: z.infer<typeof addItemSchema>) => {
        setUploading(true);
        
        const blob = values.image;
        const hasImageChanged = isBase64Image(blob);
        if (hasImageChanged) {
          const imgRes = await startUpload(files);
    
          if (imgRes && imgRes[0].url) {
            values.image = imgRes[0].url;
          }
          else{
            setUploading(false) 
            return
          }
        }

        try {
            const res = await axios.post('/api/items/create-item',values)
            toast({
                title : 'Success',
                description : res.data.message,
                className : " border-2 border-green-600"
            })
        } catch (error:any) {
            toast({
                title : 'Failed',
                description : error.response?.data.message || "Error in SignUp",
                variant : "destructive"
            });
        }finally{
            setUploading(false);
        }
       

    
    
    }
    

    const handleImage = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void
      ) => {
        e.preventDefault();
    
        const fileReader = new FileReader();
    
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
          setFiles(Array.from(e.target.files));
    
          if (!file.type.includes("image")) return;
    
          fileReader.onload = async (event) => {
            const imageDataUrl = event.target?.result?.toString() ?? "";
            fieldChange(imageDataUrl);
          };
    
          fileReader.readAsDataURL(file);
        }
      };

      useEffect(() => {
        const fetchCategories = async () => {
          try {
            const res = await axios.get("/api/category/getall");
            // Assuming res.data.data is the array of categories you want to set
            if (res.data && res.data.data) {
              setCategories(res.data.data);
            } else {
              console.error("Unexpected response structure:", res.data);
            }
          } catch (error) {
            // Handle any errors that occurred during the fetch operation
            console.error("Failed to fetch categories:", error);
          }
        };
      
        fetchCategories();
      }, []);




  return (
    <div className=" w-full mx-3 p-3 ml-52"> 
        <div >
            <h1 className=" my-5 m-3 text-4xl font-semibold">Add New Item</h1>
        </div>

        <div className="w-full p-3 px-4 bg-white rounded-md">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex justify-between space-x-2">
                        {/* Coode */}
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Item Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="Item Code" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* name */}
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Itemname</FormLabel>
                            <FormControl>
                                <Input placeholder="Item Name" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        {/* prcie */}
                        <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input placeholder="Price" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        {/* Stock */}
                        <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Stock</FormLabel>
                            <FormControl>
                                <Input placeholder="Stock" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        {/* Category */}
                        <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem className="w-[20%]">
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Category" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.length>0?(
                                                categories.map((category:any)=>(
                                                    <>
                                                     <SelectItem value={category._id}>{category.name}</SelectItem>

                                                    </>
                                                ))
                                            ):(
                                            <>

                                            </>
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    
                    <div className="flex space-x-14">
                        {/* Descriptin */}
                        <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-[50%]">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea className=" h-36" placeholder="Discription" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        {/* Image */}
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem className="items-center gap-4 w-56">
                                    <FormLabel>
                                        Add Item Image
                                    </FormLabel>
                                    <div className=" space-y-2">
                                        <FormLabel className="account-form_image-label w-full">
                                            {field.value ? (
                                            <Image
                                                src={field.value}
                                                alt="profile_icon"
                                                width={100}
                                                height={100}
                                                priority
                                                className="rounded-md object-contain w-52 h-40 border-2"
                                            />
                                            ) : (
                                            <Image
                                                src={itemImage}
                                                alt="profile_icon"
                                                width={24}
                                                height={24}
                                                className="object-contain mt-3 h-24 w-24"
                                            />
                                            )}
                                        </FormLabel>
                                        <FormControl className=" text-base-semibold text-gray-200">
                                            <Input
                                            type="file"
                                            accept="image/*"
                                            placeholder="Add profile photo"
                                            className="account-form_image-input text-slate-600"
                                            onChange={(e) => handleImage(e, field.onChange)}
                                            />
                                    </FormControl>
                                    </div>
                                </FormItem>
                            )}
                        />

                        
                    </div>


                    <Button type="submit" disabled={uploading} className="bg-blue-500">Submit</Button>
                </form>
            </Form>
        </div>

        
    </div>
  )
}

export default AddItem
