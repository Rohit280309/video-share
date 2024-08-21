import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Connected to mongo successfully")
        });

        connection.on("error", (err) => {
            console.log("Error Connecting to DB: ", err);
            process.exit();
        })

    } catch (error: any) {
        console.log("Error Connecting to DataBase");
        console.log(error)
    }

}
