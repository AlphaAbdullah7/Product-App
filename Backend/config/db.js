import mongoose from "mongoose";

export const dbConnect = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};
