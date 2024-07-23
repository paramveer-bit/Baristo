import React, { ChangeEvent, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { addCategorySchema } from '@/schemas/addCategory.Schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import itemImage from "@/assets/item-image.svg"
import { useUploadThing } from '@/utils/uploadthing'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import { isBase64Image } from '@/lib/utils'



function NewCategory() {

  const {toast} = useToast()
  const [open, setOpen] = React.useState(false)
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
        console.log("uploaded successfully!");
        console.log("-----------------")
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

  const form = useForm<z.infer<typeof addCategorySchema>>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof addCategorySchema>) => {
    setUploading(true);
    
    const blob = values.image;
    const hasImageChanged = isBase64Image(blob);


    if (hasImageChanged) {
      try{
        const imgRes = await startUpload(files);
        if (imgRes && imgRes[0].url) {
          values.image = imgRes[0].url;
        }  
        else{
          setUploading(false) 
          return
        }
      }
      catch {
        console.log("Can't create new category")
        return;
      }

      
    }
    
    console.log(values)

    try {
        const res = await axios.post('/api/category/create',values)
        console.log(res);
        toast({
            title : 'Success',
            description : res.data.message,
            className : " border-2 border-green-600"
        })
        setOpen(false)
        values.image = "";
        values.name = "";
        form.reset()
        setFiles([]);
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


  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger className="mr-6 my-2 bg-blue-500 text-xl px-3 rounded-md ">New Category</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <Button type="submit" className="bg-blue-500" disabled={uploading}>Submit</Button>
           </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default NewCategory