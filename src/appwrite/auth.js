// service of Appwrite authentication
import conf from '../conf.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client(); // we are not making the setendpiont nand setproject here cz, better to do it in the constructor, so they will built when a client is created (object) 
    account; // this will be initialized in the constructor

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Set your Appwrite Endpoint
            .setProject(conf.appwriteProjectId); // Set your project ID
            // now we will the value of account
        this.account = new Account(this.client); // Initialize the Account service with the Client
    }

    // now we have have to make an account. we are making things in such a way that you can not know what i am using underthe hood(appwrite, firebase, mydb, etc), i made wrapper 
    // if you would change the backend, you just have to change the inner implementaion of the methods, not the method names or the way you call them.
    async createAccount(email, password, name) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount) {
                // if account is created successfully, we can also set the session and make the user logged in // call another method 
                return this.login(email, password);
            }
            else{
                return userAccount; // handle it later 
            }
            return userAccount; // return the response from the account creation
        } catch (error) {
            throw error; // throw the error if any
        }
    }
    async login(email, password){
        try {
            return session = await this.account.createEmailSession(email, password); // we got to know about these mthods like createEmailSession, create, etc from the appwrite docs    
        } catch (error) {
            throw error; // throw the error if any
        }
    }
    async getCurrentUser() { // just to get to know about whether the user is logged in or not.
        try {
            return await this.account.get(); // this will return the current user details
        } catch (error) {
            throw error; // throw the error if any
        }
        return null; // if there came a problem in ifelse , then we will return null
    }

    async logout() {
        try {
            return await this.account.deleteSession('current'); // this will delete the current session and log the user out, there is one more method deleteAllSessions, which will delete all the sessions of the user
        } catch (error) {
            throw error; // throw the error if any
        }
    }
}


// export default AuthService;
// better h ki object bana ke export kare
const authService = new AuthService(); // now this is oject, now any can accesss to the methods useing .dot

// all methods - account pe he lagte h, to ek account and ek client banana padega 

