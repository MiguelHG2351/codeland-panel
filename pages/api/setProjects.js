// import userTestModel from '../../models/users'
// import projectsModel from '../../models/project'

export default async (req, res) => {
    // const getUsers = await userTestModel.find({})
    // console.log(getUsers.length)
    // for(const user of getUsers) {
    //     // find projects and sets length in the user field
    //     const projects = await projectsModel.find({users_id: user._id})
    //     console.log(projects.length)
    //     const currentUser = await userTestModel.findByIdAndUpdate({ _id: user._id }, {$set: {
    //         projects_count: projects.length,
    //         blogs_count: 0,
    //         fragments_count: 0,
    //     }}, {new: true})
    // }
    
    res.json('Aguacate')

}