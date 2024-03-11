import { Post, User } from "./model"
import { connectTODb } from "./utils";



export const getPosts =  async () => {
    try {
        connectTODb();
        const posts = await Post.find();
        return posts;        
    } catch (error) {
        console.log(error)
        throw new Error("Failed To fetch Posts!")
    }
};

export const getPost =  async (slug) => {
    try {        
        connectTODb();
        const post = await Post.find({slug: slug});
        return post;           
    } catch (error) {
        console.log(error)
        throw new Error("Failed To fetch Post!")    
    }
}

export const getUser =  async (id) => {
    try {
        connectTODb();
        const user = await User.findById({id: id});
        return user;      
    } catch (error) {
        console.log(error)
        throw new Error("Failed To fetch Post!")        
    }
}

export const getUsers =  async () => {
    try {
        connectTODb();
        const users = await User.find();
        return users;
    } catch (error) {
        console.log(error)
        throw new Error("Failed To fetch Posts!")
    }
}

