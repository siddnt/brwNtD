import conf from "../conf/conf";
import { Client, Databases, Storage, ID, Query } from "appwrite";

export class Service{
    client = new Client();
    databases; 
    bucket; // storage bhi bol skte ho
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Set your Appwrite Endpoint
            .setProject(conf.appwriteProjectId); // Set your project ID

        this.databases = new Databases(this.client, conf.appwriteDatabaseId); // Initialize the Databases service with the Client and Database ID
        this.bucket = new Storage(this.client, conf.appwriteBucketId); // Initialize the Storage service with the Client and Bucket ID
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            const post = await this.databases.createDocument( // again predifined method of appwrite, read docs 
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // using slug as the document ID, you can also use ID.unique() to generate a unique ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
            return post;
        } catch (error) {
            throw error; 
        }
    }
    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            const post = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
            return post;
        } catch (error) {
            throw error; 
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true; 
        } catch (error) {
            console.error("Error deleting post:", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            const post = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return post;
        } catch (error) {
            throw error; 
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]) { // we only want those posts which are active, so we will query them by status, we can only put queries on indexes.
        try {
            const posts = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
                // ,100,createdAt, there are many more options, like limit, order by, etc, read the docs.
            );
            return posts.documents; // return the array of documents
        } catch (error) {
            throw error; 
        }
    } 
    //file upload and delete service, later you put this in a separate file, but for now we will keep it here
    async uploadFile(file) {
        try {
            const response = await this.bucket.createFile(
                conf.appwriteBucketId, // the bucket ID where the file will be uploaded
                ID.unique(), // generate a unique ID for the file
                file // the file to be uploaded
            );
            return response; // return the response from the file upload
        } catch (error) {
            throw error; 
        }
    }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            ); // delete the file by its ID
            return true; // return true if the file is deleted successfully
        } catch (error) {
            console.error("Error deleting file:", error);
            return false; // return false if there is an error
        }
    }

    async getFilePreview(fileId) {
        try {
            const file = await this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            ); 
            return file; 
        } catch (error) {
            throw error; 
        }
    }
}

const service = new Service();
export default service;
