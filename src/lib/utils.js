import mongoose from "mongoose"

// const connecting = {}


// export const connectTODb = async () => {
    
//     try {
//         if (connecting.isConnected) {
//             console.log("Using existing connection")
//             return
//         }
//         const db = await mongoose.connect(process.env.MONGODB_URL, {
//             dbName: 'lamaDevNExtFull',            
//         })
//         console.log("Connected to DB")
//         connecting.isConnected = db.connections[0].readyState;
         
//     } catch (error) {        
//         console.log(error)
//         throw new Error("Error While connecting DB ",error)     
//     }
// }



let isConnected = false; // track the connection
const uril = await process.env.MONGODB_URL;

export const connectTODb = async () => {
    
    mongoose.set("strictQuery", true);
    if (isConnected) {
        console.log("=> Mongodb is already connected ");
        return;
    }
    try {
        await mongoose.connect(uril, {
            dbName: "lamaDevNExtFull",
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("=> Connected to mongodb");
    }
    catch (err) {
        console.log(err);
    }

}
