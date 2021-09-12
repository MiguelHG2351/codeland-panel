import Mongo from '../../libs/Mongo';
import userModel from "../../models/users";

const actions = {
    async getAllUsers() {
        return  await userModel.aggregate(
            [
                {
                    $lookup: {
                        from: "projects",
                        localField: "_id",
                        foreignField: "users_id",
                        as: "projects"
                    },
                },
                {
                    $group: {
                        _id: "$_id",
                        username: {$first: "$username"},
                        email: {$first: "$email"},
                        projects: {$push: "$projects"},
                        cover: {$first: "$cover"},
                        created_at: {$first: "$created_at"},
                    }
                }
            ]
        )
    }
}

export default async function(req, res) {
    new Mongo();
    const user = await actions.getAllUsers();
    console.log(user);

    return res.json({
        user,
    });
}