const eventTeam = require('../../models/eventTeamModel');
const requestHandler = require('../../utils/requestHandler');

async function handleAddTeamMember(req, res) {
  try {
    const newTeamMate = req.team;
    const member = await eventTeam.addTeamMember({
      user_id: newTeamMate.id,
      event_id: newTeamMate.event_id,
      role_type: newTeamMate.role_type
    });
    return requestHandler.success(res, 200, 'New member added successfully', {
      member
    });
  } catch (error) {
    return requestHandler.error(res, 500, `server error ${error.message}`);
  }
}

async function handleGetTeamMembers(req, res) {
  const { id } = req.params;
  try {
    const members = await eventTeam.getTeam(id);
    return requestHandler.success(res, 200, 'Team fetched successfully', {
      members
    });
  } catch (error) {
    return requestHandler.error(res, 500, `server error ${error.message}`);
  }
}

async function handleDeleteTeamMember(req, res) {
  const teamMate = req.team;
  try {
    await eventTeam.removeTeamMember({
      user_id: teamMate.user_id,
      event_id: teamMate.event_id
    });
    const currentTeam = await eventTeam.getTeam(teamMate.event_id);
    return requestHandler.success(
      res,
      200,
      'Team member deleted successfully',
      {
        currentTeam
      }
    );
  } catch (error) {
    return requestHandler.error(res, 500, `server error ${error.message}`);
  }
}

module.exports = {
  handleAddTeamMember,
  handleGetTeamMembers,
  handleDeleteTeamMember
};
