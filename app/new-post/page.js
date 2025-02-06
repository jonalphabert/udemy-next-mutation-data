import { storePost } from '@/lib/posts';
import {redirect} from "next/navigation";
import FormPost from "@/components/FormPost";

export default function NewPostPage() {
  async function createPost(previousState, formData) {
    "use server";

    console.log("From Data", formData);
    console.log("previousState", previousState);

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

    if(errors.length > 0) {
      return {errors}
    }

    return

    await storePost({
      imageUrl: '',
      title,
      content,
      userId: 1
    })

    redirect("/feed")
  }

  return (
    <>
      <h1 className={"font-merryweather text-4xl font-bold mb-8"}>Create a new post</h1>
      <FormPost action={createPost} />
    </>
  );
}
