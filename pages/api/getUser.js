import Mongo from '../../libs/Mongo';
import userModel from "../../models/users";

export default async function getUser(req, res) {
    new Mongo();
    
    const { id } = req.query;
    // const user = await userModel.findOne({ _id: id }).lean();
    const user = await userModel.findOne({ _id: id }).lean();

    res.json(user)
}