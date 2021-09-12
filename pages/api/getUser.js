import Mongo from '../../libs/Mongo';
import userModel from "../../models/users";
import projectsModel from "../../models/project";

const actions = {
    async getAllUsers() {
        return  await userModel.aggregate([
            {
                $lookup: {
                    from: "projects",
                    localField: "_id",
                    foreignField: "users_id",
                    as: "projects"
                },
            },
        ])
    },
}

export default async function(req, res) {
    new Mongo();
    const user = await actions.getAllUsers();

    return res.json({
        user,
    });
}