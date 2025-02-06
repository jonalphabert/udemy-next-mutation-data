"use client"

import {useFormStatus} from "react-dom";

export default function FormSubmit() {
    const status = useFormStatus()

    if(status.pending){
        return <div>
            Creating post...
        </div>
    }

    return (
        <>
            <button type="reset">Reset</button>
            <button>Create Post</button>
        </>
    )
}