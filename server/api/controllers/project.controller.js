const { Project } = require('../models');
const sendErr = require('../utils/sendErr');

const create = async (req, res) => {
  try {
    const project = req.body;
    const exist = await Project.find({project_name: project.project_name});
    if (exist.length !== 0){
      return res.status(500).json({
        message: "Project already exists!",
        exist
      });
    };
    const createdProject = await Project.create(project);
    return res.status(200).json({
      message: "Project created!",
      createdProject
    })
  }catch (err){
    return sendErr(res, err);
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    return res.status(200).json({
      message: "Projects Found!",
      projects
    });
  } catch (err){
    return sendErr(res, err);
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = req.body;
    const exist = await Project.findOne(project);
    if (!exist){
      return res.status(500).json({
        message: 'Project does not exist',
      });
    }
    await Project.findOneAndDelete(project);
    return res.status(200).json({
      message: 'Successfully deleted'
    })
  }catch(err){
    return sendErr(res, err);
  }
};

// if you add functions above, add it here too
module.exports = {
  create,
  getProjects,
  deleteProject
};

