import Mongo from '../../libs/Mongo';

export default async function(req, res) {
    const db = new Mongo();

    res.json({
        user: await db.getAllUsers()
    });
}