import mongoose,{Schema,Document,models,model} from "mongoose";

export interface Category extends Document{
    name : string,
    image : string
}

const categorySchema : Schema<Category> = new Schema({
    name : {
        type: String,
        required : true,
    },
    image : {
        type : String,
    }


})

const CategoryModel = (models.Category as mongoose.Model<Category>) || model<Category>('Category',categorySchema)
export default CategoryModel


