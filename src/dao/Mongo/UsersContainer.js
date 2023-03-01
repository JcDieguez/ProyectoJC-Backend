import userModel from "../../models/User.js";

export default class Users {
    get = () =>{
        return userModel.find();
    }

    getBy = (params) =>{
        return userModel.findOne(params);
    }

    save = async (user) =>{
        try {
            const createData = await userModel.create(user);
            return { success: true, data: createData };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}