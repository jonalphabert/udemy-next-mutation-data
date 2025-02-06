"use server"
import {storePost, updatePostLikeStatus} from "@/lib/posts";
import {redirect} from "next/navigation";
import {uploadImage} from "@/lib/cloudinary";

export default async function posts(previousState, formData) {
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    let errors = []

    console.log(title, image, content);

    if(!title || title.trim().length === 0) {
        errors.push({
            label: "title",
            message: 'Please enter a title'
        });
    }
    if(!image || !image.size) {
        errors.push({
            label: "image",
            message: 'Please upload an image'
        });
    }
    if(!content || content.trim().length === 0) {
        errors.push({
            label: "content",
            message: 'Please enter a content field'
        });
    }

    let url;

    try{
        url = await uploadImage(image);
    } catch (error) {
        errors.push({
            label: "image",
            message: "Image upload failed"
        })
    }

    if(errors.length > 0) {
        return {errors}
    }

    await storePost({
        imageUrl: url,
        title,
        content,
        userId: 1
    })

    redirect("/feed")
}

export async function tooglePostLikeStatus(postId){
    updatePostLikeStatus(postId,2)
}

