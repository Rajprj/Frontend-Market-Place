import mongoose from "mongoose";
import { apiError } from "../utils/apiError.js";

async function dbConnection() {
    try {
            const connectionInstence = await mongoose.connect("mongodb+srv://pr683027:rajaprj@cluster0.kjfcamd.mongodb.net/codemeDB") 
            console.log(`Database connection successfuly ! DB host: ${connectionInstence.connection.host}`);
                  
    } catch (error) {
        throw new apiError(400, "Somting went wrong while connecting the database")
    }
}

export {dbConnection}