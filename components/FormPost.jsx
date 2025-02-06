"use client"

import FormSubmit from "@/components/FormSubmit";
import {useActionState} from "react";
import createPost from "@/actions/createpost";

export default function FormPost() {
    const [state, formAction] = useActionState(createPost, {});

    return <>
        <form action={formAction}>
            <div className="form-control mb-4">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title"/>
                { state?.errors ? ( state.errors.map((item, index) => item.label === "title" && <div key={`title-error-${index}`} className="text-red-400 text-sm ">{item.message}</div>) ): null }
            </div>
            <div className="form-control mb-4">
                <label htmlFor="image">Image</label>
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    id="image"
                    name="image"

                />
                { state?.errors ? ( state.errors.map((item, index) => item.label === "image" && <div key={`title-error-${index}`} className="text-red-400 text-sm ">{item.message}</div>) ): null }
            </div>
            <div className="form-control mb-4">
                <label htmlFor="content">Content</label>
                <textarea id="content" name="content" rows="5" />
                { state?.errors ? ( state.errors.map((item, index) => item.label === "content" && <div key={`title-error-${index}`} className="text-red-400 text-sm ">{item.message}</div>) ): null }
            </div>
            <p className="form-actions">
                <FormSubmit/>
            </p>
        </form>
    </>
}