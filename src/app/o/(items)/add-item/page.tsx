"use client"
 
import { z } from "zod"
import { addItemSchema } from "@/schemas/addItem.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { isBase64Image } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useUploadThing } from "@/utils/uploadthing";
import { useRouter } from "next/router"
import { usePathname } from "next/navigation"
import { Props } from "next/script"
import { ChangeEvent, useState } from "react"
import Image from "next/image"





function AddItem() {

    const { startUpload } = useUploadThing("imageUploader", {
        onClientUploadComplete: () => {
            console.log("uploaded successfully!");
        },
        onUploadError: () => {
            console.log("error occurred while uploading");
        },
        onUploadBegin: () => {
            console.log("upload has begun");
        },
    });
    
    const [files, setFiles] = useState<File[]>([]);


    const form = useForm<z.infer<typeof addItemSchema>>({
        resolver: zodResolver(addItemSchema),
        defaultValues: {
          name: "",
        },
      })

    const onSubmit = async (values: z.infer<typeof addItemSchema>) => {
        const blob = values.image;
        console.log(blob);
    
        const hasImageChanged = isBase64Image(blob);
        if (hasImageChanged) {
          const imgRes = await startUpload(files);
    
          if (imgRes && imgRes[0].url) {
            values.image = imgRes[0].url;
          }
        }

    
        console.log(values);
    
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



  return (
    <div className=" w-full mx-3 p-3"> 
        <div >
            <h1 className=" my-5 m-3 text-4xl font-semibold">Add New Item</h1>
        </div>

        <div className="w-full p-3 px-4 bg-white rounded-md">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex justify-between">
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
                    </div>
                    
                    
                    {/* Descriptin */}
                    <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Discription" {...field} />
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
                            <FormItem className="flex items-center gap-4">
                                <FormLabel className="account-form_image-label">
                                    {field.value ? (
                                    <Image
                                        src={field.value}
                                        alt="profile_icon"
                                        width={96}
                                        height={96}
                                        priority
                                        className="rounded-full object-contain w-24 h-24"
                                    />
                                    ) : (
                                    <Image
                                        src="/assets/profile.svg"
                                        alt="profile_icon"
                                        width={24}
                                        height={24}
                                        className="object-contain"
                                    />
                                    )}
                                </FormLabel>
                                <FormControl className="flex-1 text-base-semibold text-gray-200">
                                    <Input
                                    type="file"
                                    accept="image/*"
                                    placeholder="Add profile photo"
                                    className="account-form_image-input"
                                    onChange={(e) => handleImage(e, field.onChange)}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>

        
    </div>
  )
}

export default AddItem
