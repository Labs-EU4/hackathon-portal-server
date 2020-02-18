const db = require('../../models/projectsModel');
const grades = require('../../models/projectGradingModel');
const teamDb = require('../../models/eventTeamModel');
const requestHandler = require('../../utils/requestHandler');

// Project Submissions requirements

async function handleProjectEntriesDelete(req, res) {
  const { id } = req.params;
  await db
    .removeProject(id)
    .then(data => {
      return requestHandler.success(
        res,
        200,
        'Project submission deleted successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, ` server error ${error.message}`);
    });
}

async function handleProjectEntriesEdit(req, res) {
  const { userId } = req.decodedToken;
  const { id } = req.params;
  const projectSubmit = {
    project_title: req.body.project_title,
    participant_or_team_name: req.body.participant_or_team_name,
    event_id: req.body.event_id,
    project_writeups: req.body.project_writeups,
    git_url: req.body.git_url,
    video_url: req.body.video_url,
    submitted_by: userId
  };
  await db
    .updateProject(id, projectSubmit)
    .then(data => {
      return requestHandler.success(
        res,
        201,
        'Project edited successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, ` server error ${error.message}`);
    });
}

async function handleprojectEntriesPost(req, res) {
  const { userId } = req.decodedToken;
  const { id } = req.params;
  const projectSubmit = {
    project_title: req.body.project_title,
    participant_or_team_name: req.body.participant_or_team_name,
    event_id: id,
    project_writeups: req.body.project_writeups,
    git_url: req.body.git_url,
    video_url: req.body.video_url,
    submitted_by: userId
  };
  await db
    .addProject(projectSubmit)
    .then(data => {
      return requestHandler.success(
        res,
        201,
        'Project submitted successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, ` server error ${error.message}`);
    });
}

async function handleGetAllProjectEntries(req, res) {
  const { id } = req.params;
  try {
    const allSubmissions = await db.findAllProjectsByEventId(id);
    const projectGrades = await grades.findAllGradingsByEventId(id);
    const eventTeam = await teamDb.getTeam(id);

    const eventJudges = await eventTeam.filter(
      mate => mate.role_type === 'judge'
    );
    /**
     * Function to calculate total score for each project
     *
     * @param {*} submissions
     * @param {*} scores
     * @returns
     */
    const processedData = async (submissions, scores, judges) => {
      await submissions.map(submit => {
        const submittedProject = submit;
        submittedProject.average_rating = 0;
        submittedProject.acted_judges = 0;
        submittedProject.number_of_judges = judges.length;
        return scores.map(mark => {
          if (
            submittedProject.event_id === mark.project_event_id &&
            submittedProject.id === mark.project_id &&
            mark.judge_id
          ) {
            submittedProject.acted_judges += 1;
            submittedProject.average_rating += mark.average_rating;
            submittedProject.average_rating /= submittedProject.acted_judges;
          }
          return submittedProject;
        });
      });
      return submissions;
    };
    const allProjectScores = await processedData(
      allSubmissions,
      projectGrades,
      eventJudges
    );
    return requestHandler.success(
      res,
      200,
      'All Project submissions retrieved successfully',
      allProjectScores
    );
  } catch (error) {
    return requestHandler.error(res, 500, ` server error ${error.message}`);
  }
}

async function handleGetProjectEntry(req, res) {
  const { id } = req.params;
  await db
    .findProject(id)
    .then(data => {
      return requestHandler.success(
        res,
        200,
        'Project submission retrieved successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, ` server error ${error.message}`);
    });
}

module.exports = {
  handleprojectEntriesPost,
  handleGetAllProjectEntries,
  handleGetProjectEntry,
  handleProjectEntriesEdit,
  handleProjectEntriesDelete
};
