import mongoose from "mongoose"

const connecting = {}


export const connectTODb = async () => {
    try {
        if (connecting.isConnected) {
            console.log("Using existing connection")
            return
        }
        const db = await mongoose.connect(process.env.MONGO_URL, {
            dbName: 'lamaDevNExtFull',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connected to DB")
        connecting.isConnected = db.connections[0].readyState;
         
    } catch (error) {        
        console.log(error)
        throw new Error("Error While connecting DB ",error)     
    }
}
