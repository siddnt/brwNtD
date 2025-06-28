const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL), 
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    // now this guarenttes that the values are always strings
    
}

export default conf;

// sometimes app crashes if we keep doing that import.meta.env.VITE_APPWRITE_URL eveywhere 
// so we are going to export some of the key values pairs here, to make the type safer and more readable