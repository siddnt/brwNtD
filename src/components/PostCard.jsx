import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

// here for id, you do write $ id , sytax of appwrite
function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`}> // link syntax is , jaha ho vaha se aage kaha jaana hai. you do not have to give whole url
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title} // you get back the url of the image from appwriteService.getFilePreview, which is the url of the image
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard