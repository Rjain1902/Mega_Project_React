import config from "../config/config";
import { Client,Databases,ID,Storage,Query } from "appwrite";
export class Service{
    client=new Client();
    database;
    bucket;
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.database=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
            return await this.database.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )

        }
        catch(error){
            console.log("Appwrite service :: createpost :: error",error)

        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.database.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        }
        catch(error){
            console.log(error)
        }
    }

    async deletePost(slug){
        try{
            await this.database.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteProjectId,
                slug)
                return true
            }
            
            catch(error){
                console.log("Appwrite service :: deletePost :: error",error)
                return false

            }

        }

    async getPost(slug){
        try{
            return await this.database.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionId,
                slug)
               

        }
        catch(error){
            console.log("Appwrite service :: getPost :: error",error)
            return false

        }
    }

    async getPosts(queries=[Query.equal("status","active ")]){
        try{
            return await this.database.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionId,
                queries 
            )

        }
        catch(error){
            console.log("Appwrite service :: getPosts :: error",error)

        }
    }

    //file upload services


    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
            
        }
        catch(error){
            console.log("Appwrite service :: getPosts :: error",error)

        }
    }


    async deleteFile(fieldID){
        try{
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fieldID
            )
            return true

        }
        catch(error){
            console.log("Appwrite service :: getPosts :: error",error)
            return false
        }
    }

    getFilePreview(fieldID){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fieldID
        )
    }
        
    
}

const service = new Service()
export default service