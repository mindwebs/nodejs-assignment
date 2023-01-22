import mongoose, { CallbackError } from "mongoose";

export const connect = mongoose.connect(
    String(process.env.MONGO_URI),
    {},
    (err: CallbackError) => {
        if (err) console.error(err);
        else console.log("DB Connection Successful");
    }
);