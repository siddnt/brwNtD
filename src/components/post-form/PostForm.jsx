import React from "react";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({post}){
    // you can have many info from useForm apart from just register or handleSubmit, it also gives watching capabilities(if you want to continiously monitor), setValue - to set any value in the form, etc.
    // this is way to set values in react froms, if you want control of form - control, getValues - to get the values of the form.
    const {register, handleSubmit, watch, setValue, control, getValues}= useForm({
        defaultValues: {
            title: post?.title || '', // either user came to create a new post or edit an existing post.
            content: post?.content || '', // if post is not there then it will be empty string, otherwise it will be the content of the post
            slug: post?.slug || '', // slug is the url of the post, which is unique, so it will be empty string if post is not there, otherwise it will be the slug of the post
            status: post?.status || 'active', 
        }
    }); 
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData); // this will give us the user data from the redux store, which is set in authSlice.

    
    // if user has submitted the form then he would have passed the data also
    const onSubmit = async (data) => {
        try {
            // two cases - either we are creating a new post or editing an existing post
            // if post is present then we are editing the post, otherwise we are creating a new post
            if (post) {
                // if post is present then we are editing the post
                const file = await data.image[0]? appwriteService.uploadFile(data.image[0]) : null;
                // you were having the post, so now delete the old image
                if(file){
                    appwriteService.deleteFile(post.featuredImage); 
                }
                // now we will update the post with the new data
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data, // this will spread the data object and add the properties to the post object
                    featuredImage: file ? file.$id : undefined, // if file is present then we will use the new file, otherwise we will use the old file
                });
                if(dbPost) {
                    navigate(`/post/${dbPost.$id}`); // navigate to the post page after updating the post
                }
            } else {
                // if post is not present then we are creating a new post
                // put check if there is an image or not, if there is an image then upload it
                const file = data.image && data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null; // if there is an image then upload it, otherwise set file to null
                // now create the post with the data and file
                const dbPost = await appwriteService.createPost({
                    ...data, // yaha pr object bana ke data spread out karna imp cz jo forms banege unme kabhi bhi user data nhi hoga
                    featuredImage: file ? file.$id : undefined, 
                    userId: userData.$id, // user id is required to create a post, so we will get it from the user data
                });
                if(dbPost) {
                    navigate(`/post/${dbPost.$id}`); // navigate to the post page after creating the post
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => { // you can put any other name also exceprt subsrction, and ye banta h watch method se. main thing is at last we write - subscription.unsubscribe() to stop watching the changes, otherwise it will keep watching the changes and will cause memory leak - memory management 
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            } // slug ke ander slugTransform(value.title) ye value fill karni h.
        });
        return () => subscription.unsubscribe(); // to optimise
    }, [watch, slugTransform, setValue]); // i will put watch on title, so that whenever title changes, slug will also change accordingly, and we will set the value of slug to the transformed value of title

}