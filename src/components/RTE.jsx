import React from "react";
import { Editor } from "@tinymce/tinymce-react"; // if you just want to return the editor, then it is very basic. 
// but as we desining editor in seperate place, as a seperate component, then if you would use in some form, post form, etc, so how you would get the reference of the editor. (so we can use forwardRef, but we are going to use some other way )
import { Controller } from "react-hook-form";



export default function RTE({ name, control, label, defaultValue = " " }) { // control came from react hook form , and this is responsible for taking all of its state to that form, compenent se form m.
    return (
        // now controller is having its own things , own vairblaes that can be used, se the docs 
        <Controller
            name={name || "content"} // in curly braces, because name is a variable.
            control={control} // ye control dega parent element, jo bhi parent element isko call karega , hum as it is pass karege, taaki vo poora control le paae

            // now how to render elements 
            render={({ field: { onChange } }) => ( // onChange pe tracking laga di, is field pe koi bhi change hota h to muighe imform karna wtih render 
                // now here jo bhi element render karwana hai, input ho to input, editor ho to editor, etc.
                <Editor
                    initialValue={defaultValue}
                    init={{
                        initialValue: defaultValue,
                        height: 500,
                        menubar: true,
                        plugins: [
                            "image",
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                            "anchor",
                        ],
                        toolbar:
                            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    }}
                    onEditorChange={onChange} // editor pe koi bhi change hota hai to hamari fields govern ho rhi h onchange se
                />
            )}
        />
    )
}