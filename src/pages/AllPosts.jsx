import appwriteService from '../appwrite/config';
import { Container, PostForm } from '../components';
import React, { use, useEffect, useState } from 'react'; // we have to query for all the posts, they wont come directly


function AllPosts() {
    const [posts, setPosts] = useState([])// where we will take all the posts
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents) // what is this documents ? 
            }
        })
    }, [])
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts
