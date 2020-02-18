/* eslint-disable camelcase */
const checkItem = require('../utils/checkInputs');
const requestHandler = require('../utils/requestHandler');
const eventModel = require('../models/eventsModel');
const eventTeam = require('../models/eventTeamModel');
const userModel = require('../models/userModel');
const participants = require('../models/eventParticipantsModel');
const participantTeams = require('../models/participantTeamsModels');
const projectModel = require('../models/projectsModel');
require('dotenv').config();

/**
 * Validates all routes
 * @class EventValidator
 */
module.exports = class EventValidator {
  /**
   * Validates all event details
   * @param {obj} req
   * @param {obj} res
   * @param {obj} next
   * @returns {obj} Validation error messages or contents of req.body
   */
  static async validateID(req, res, next) {
    // validates provided ID is a number
    const { id } = req.params;
    const check = checkItem({ id });

    if (Object.keys(check).length > 0) {
      return res.status(400).json({
        statusCode: 400,
        data: [check]
      });
    }
    await eventModel
      .findById(id)
      .then(data => {
        if (data.length === 0) {
          return requestHandler.error(
            res,
            404,
            'This event id cannot be found,please provide a valid event id'
          );
        }
        req.event = data;
        return next();
      })
      .catch(error => {
        return requestHandler.error(res, 500, `Server error ${error}`);
      });
  }

  static async validateProjectID(req, res, next) {
    // validates provided ID is a number
    const { id } = req.params;
    const check = checkItem({ id });

    if (Object.keys(check).length > 0) {
      return res.status(400).json({
        statusCode: 400,
        data: [check]
      });
    }
    await projectModel
      .findProject(id)
      .then(data => {
        if (data.length === 0) {
          return requestHandler.error(
            res,
            404,
            'This project id cannot be found,please provide a valid project id'
          );
        }
        req.event = data;
        return next();
      })
      .catch(error => {
        return requestHandler.error(res, 500, `Server error ${error}`);
      });
  }

  static async eventValidation(req, res, next) {
    const { id } = req.params;
    const {
      event_title,
      participation_type,
      event_description,
      guidelines,
      start_date,
      end_date,
      location,
      category_id
    } = req.body;
    if (!id) {
      const exists = await eventModel.findByTitle(event_title);
      if (exists.length !== 0) {
        return requestHandler.error(
          res,
          409,
          'This event title already exists in the database, please pick a new event title!'
        );
      }
    }
    const check = checkItem({
      event_title,
      participation_type,
      event_description,
      guidelines,
      start_date,
      end_date,
      location,
      category_id
    });

    if (Object.keys(check).length > 0) {
      return requestHandler.error(res, 400, check);
    }
    return next();
  }

  static async teamValidation(req, res, next) {
    const { id } = req.params;
    const { email, role_type } = req.body;
    const userDetails = await userModel.getSingleUser({ email });
    const data = { ...userDetails, event_id: id, role_type };
    const team = await eventTeam.getTeam(id);
    const partparticipantsList = await participants.getByEventId(id);
    const validity = await partparticipantsList.find(
      user => user.user_id === data.id
    );
    if (validity) {
      return requestHandler.error(res, 400, 'This user is a participant');
    }
    if (team.length === 0) {
      req.team = data;
      return next();
    }
    const check = await team.find(user => user.email === data.email);

    if (check) {
      return requestHandler.error(res, 409, 'This user is already in the team');
    }
    req.team = data;
    return next();
  }

  static async projectValidation(req, res, next) {
    const { id } = req.params;
    const { project_title, participant_or_team_name } = req.body;
    if (!id) {
      const exists = await projectModel.findProjectTitle(project_title);
      if (exists.length !== 0) {
        return requestHandler.error(
          res,
          409,
          'This event title already exists in the database, please pick a new event title!'
        );
      }
    }
    const check = checkItem({
      project_title,
      participant_or_team_name
    });

    if (Object.keys(check).length > 0) {
      return requestHandler.error(res, 400, check);
    }
    return next();
  }

  static async checkEventOwner(req, res, next) {
    const { id } = req.params;
    const { teammate_id } = req.params;
    const { userId } = req.decodedToken;
    const checkEvent = await eventModel.getByUserId(1, 1, userId);
    if (Object.keys(checkEvent).length === 0) {
      return requestHandler.error(
        res,
        403,
        'You are not authorized to do this'
      );
    }
    if (teammate_id) {
      const team = await eventTeam.getTeam(id);
      const check = await team.find(
        user => String(user.user_id) === teammate_id
      );
      if (!check) {
        return requestHandler.error(res, 400, 'This user is not in the team');
      }
      req.team = check;
      return next();
    }
    return next();
  }

  static async validateParticipant(req, res, next) {
    const { userId } = req.decodedToken;
    const { id } = req.params;
    const partparticipantsList = await participants.getByEventId(id);
    const teamParticipantsList = await participantTeams.findTeamByEventId(id);
    const validTeamLead = await teamParticipantsList.find(
      user => user.team_lead === userId
    );
    const validity = await partparticipantsList.find(
      user => user.user_id === userId
    );
    if (!validity && validTeamLead === undefined) {
      return requestHandler.error(
        res,
        403,
        'You are not authorized to do this'
      );
    }
    return next();
  }

  static async restrictJudges(req, res, next) {
    const { userId } = req.decodedToken;
    const { id } = req.params;
    const team = await eventTeam.getTeam(id);
    const check = await team.find(user => user.user_id === userId);

    if (check) {
      return requestHandler.error(
        res,
        403,
        'Event judges or organisers are not allowed to participate'
      );
    }
    return next();
  }
};
