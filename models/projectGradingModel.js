const db = require('../data/dbConfig');

// project grading models
async function addGrading(grade) {
  const submittedGrading = await db('project_grading')
    .insert(grade)
    .returning('*');
  return submittedGrading;
}
async function findAllGradingsByEventId(id) {
  const foundAllGrades = await db('project_grading as g')
    .join('project_entries as p', 'p.id', 'g.project_id')
    .join('events as e', 'e.id', 'g.project_event_id')
    .join('users as u', 'u.id', 'g.judge_id')
    .select(
      'g.project_id',
      'g.project_event_id',
      'g.judge_id',
      'g.product_design',
      'g.functionality',
      'g.innovation',
      'g.product_fit',
      'g.extensibility',
      'g.presentation',
      'g.average_rating',
      'p.project_writeups',
      'p.video_url',
      'p.git_url',
      'p.participant_or_team_name',
      'u.email as judge_email',
      'u.fullname as judge_fullname',
      'g.judge_comments'
    )
    .where({ project_event_id: id });
  return foundAllGrades;
}

async function findGrading(id) {
  const foundSubmission = await db('project_grading as g')
    .join('project_entries as p', 'p.id', 'g.project_id')
    .join('events as e', 'e.id', 'g.project_event_id')
    .join('users as u', 'u.id', 'g.judge_id')
    .select(
      'g.project_id',
      'g.project_event_id',
      'g.judge_id',
      'g.product_design',
      'g.functionality',
      'g.innovation',
      'g.product_fit',
      'g.extensibility',
      'g.presentation',
      'g.average_rating',
      'p.project_writeups',
      'p.video_url',
      'p.git_url',
      'p.participant_or_team_name',
      'u.email as judge_email',
      'u.fullname as judge_fullname',
      'g.judge_comments'
    )
    .where({ project_id: id });
  return foundSubmission;
}
async function updateGrading(id, grade) {
  const updateGrade = await db('project_grading')
    .where({ project_id: id })
    .update(grade)
    .returning('*');
  return updateGrade;
}
async function removeGrading(id) {
  const deletedSubmission = await db('project_grading')
    .where({ project_id: id })
    .delete();
  return deletedSubmission;
}

module.exports = {
  // Project grading models
  addGrading,
  findGrading,
  findAllGradingsByEventId,
  updateGrading,
  removeGrading
};
