const db = require('../data/dbConfig');

// project entries models
async function addProject(project) {
  const submittedProject = await db('project_entries')
    .insert(project)
    .returning('*');
  return submittedProject;
}

async function findProjectTitle(projectTitle) {
  const submitProject = await db('project_entries')
    .where({ project_title: projectTitle })
    .returning('*');
  return submitProject;
}
async function findAllProjectsByEventId(id) {
  const foundAllSubmissions = await db('project_entries')
    .where({
      event_id: id
    })
    .returning('*');
  return foundAllSubmissions;
}
async function findProject(id) {
  const foundSubmission = await db('project_entries')
    .where({
      id
    })
    .returning('*');
  return foundSubmission;
}
async function updateProject(id, project) {
  const updateSubmission = await db('project_entries')
    .where({ id })
    .update(project)
    .returning('*');
  return updateSubmission;
}
async function removeProject(id) {
  const deletedSubmission = await db('project_entries')
    .where({ id })
    .delete();
  return deletedSubmission;
}

module.exports = {
  // Project entries models
  addProject,
  findProject,
  findAllProjectsByEventId,
  updateProject,
  removeProject,
  findProjectTitle
};
