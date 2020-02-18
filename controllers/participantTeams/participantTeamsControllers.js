/* eslint-disable no-else-return */
const db = require('../../models/participantTeamsModels');
// const eventsDb = require('../../models/eventsModel');
const requestHandler = require('../../utils/requestHandler');

// Participant Teams Controllers

async function handleTeamDelete(req, res) {
  const { id } = req.params;
  await db
    .RemoveTeam(id)
    .then(data => {
      return requestHandler.success(
        res,
        200,
        'Team removed successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, ` server error ${error.message}`);
    });
}

async function handleTeamEdit(req, res) {
  const { userId } = req.decodedToken;
  const { id } = req.params;
  const participantTeam = {
    team_name: req.body.team_name,
    event_id: req.body.event_id,
    team_lead: userId
  };
  await db
    .updateTeam(id, participantTeam)
    .then(data => {
      return requestHandler.success(res, 201, 'Team edited successfully', data);
    })
    .catch(error => {
      return requestHandler.error(res, 500, ` server error ${error.message}`);
    });
}

async function handleCreateTeam(req, res) {
  const { userId } = req.decodedToken;
  const { id } = req.params;
  const participantTeam = {
    team_name: req.body.team_name,
    event_id: id,
    team_lead: userId
  };
  await db
    .createTeam(participantTeam)
    .then(data => {
      return requestHandler.success(
        res,
        201,
        'Team created successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, ` server error ${error.message}`);
    });
}

async function handleTeamGet(req, res) {
  const { id } = req.params;
  await db
    .findTeam(id)
    .then(data => {
      return requestHandler.success(
        res,
        200,
        'Team retrieved successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, ` server error ${error.message}`);
    });
}

async function handleAllTeamGet(req, res) {
  const { id } = req.params;
  await db
    .findTeamByEventId(id)
    .then(data => {
      return requestHandler.success(
        res,
        200,
        'All Event Teams retrieved successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, ` server error ${error.message}`);
    });
}

// participant team members controllers

async function handleTeamMateGet(req, res) {
  const { id } = req.params;
  await db
    .findTeamMate(id)
    .then(data => {
      return requestHandler.success(
        res,
        200,
        'Team mate retrieved successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, ` server error ${error.message}`);
    });
}

async function handleTeamMateDelete(req, res) {
  const { id } = req.params;
  await db
    .removeTeamMate(id)
    .then(data => {
      return requestHandler.success(
        res,
        200,
        'Team mate removed successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, ` server error ${error.message}`);
    });
}

async function handleAddTeamMembers(req, res) {
  // const { userId } = req.decodedToken;
  const { id } = req.params;
  const participantTeamMembers = {
    team_id: id,
    team_member: req.body.team_member
  };
  await db
    .addTeamMate(participantTeamMembers)
    .then(data => {
      return requestHandler.success(
        res,
        201,
        'Team member added successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, ` server error ${error.message}`);
    });
}

module.exports = {
  handleCreateTeam,
  handleAddTeamMembers,
  handleTeamDelete,
  handleTeamEdit,
  handleTeamGet,
  handleTeamMateGet,
  handleTeamMateDelete,
  handleAllTeamGet
};
