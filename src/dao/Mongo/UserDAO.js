import userModel from "../../models/User.js";

export default class Users {
    get = () =>{
        return userModel.find();
    }

    getBy = (params) =>{
        return userModel.findOne(params).lean();
    }

    getUserById = (id) =>{
        return userModel.findById(id);
    }

    save = async (user) =>{
        try {
            const createData = await userModel.create(user);
            return { success: true, data: createData };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    update = async (id, updateData) => {
        try {
            const user = await userModel.findById(id);
            if (!user) {
                return { success: false, error: 'User not found' };
            }
            user.name = updateData.name;
            user.email = updateData.email;
            user.bio = updateData.bio;
            user.avatar = updateData.avatar;
            await user.save();
            return { success: true, data: user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    }