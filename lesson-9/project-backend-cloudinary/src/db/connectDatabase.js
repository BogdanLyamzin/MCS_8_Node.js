import sequelize from "./sequelize.js";
import "./assosiations.js";

const connectDatabase = async()=> {
    try {
        await sequelize.authenticate();
        console.log("Successfullt connect database");
    }
    catch(error) {
        console.log("Faled connect database", error.message);
        throw error;
    }
}

export default connectDatabase;