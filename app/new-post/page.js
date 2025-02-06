"use client"

import { storePost } from '@/lib/posts';
import {redirect} from "next/navigation";
import FormSubmit from "@/components/FormSubmit";
import {useFormState} from "react-dom";

export default function NewPostPage() {
  async function createPost(formData) {
    "use server";

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
    if(!image) {
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

    if(errors.length > 0) {
      return {errors}
    }

    await storePost({
      imageUrl: '',
      title,
      content,
      userId: 1
    })

    redirect("/feed")
  }

  const [state, formAction] = useFormState(createPost, {});


  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" required/>
        </p>
        <p className="form-control">
          <label htmlFor="image">Image URL</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
            required
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows="5" required/>
        </p>
        <p className="form-actions">
          <FormSubmit />
        </p>
      </form>
    </>
  );
}
