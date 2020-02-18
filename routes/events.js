/* eslint-disable no-use-before-define */
const { Router } = require('express');
const authenticate = require('../api/auth/authenticate');
const {
  handleEventsGetByUSerId,
  handleEventGetById,
  handleEventsDelete,
  handleEventsEdit,
  handleEventsPost,
  handleEventsGet
} = require('../controllers/events/eventsControllers');
const {
  handleAddTeamMember,
  handleGetTeamMembers,
  handleDeleteTeamMember
} = require('../controllers/eventTeam/eventTeamController');
const EventValidator = require('../middlewares/EventValidator');
const {
  handleEventsGetById,
  handleEventRegistration,
  handleEventDelete,
  handleEventsUserSignedFor
} = require('../controllers/eventParticipants/eventParticipantsController');

const {
  handleprojectEntriesPost,
  handleGetAllProjectEntries,
  handleGetProjectEntry,
  handleProjectEntriesEdit,
  handleProjectEntriesDelete
} = require('../controllers/projects/projectControllers');

const {
  handleprojectGradingPost,
  handleProjectGradingEdit,
  handleGetAllProjectGrading,
  handleGetProjectGrading,
  handleProjectGradingDelete
} = require('../controllers/projectGrading/projectGradingControllers');

const {
  handleCreateTeam,
  handleAddTeamMembers,
  handleTeamDelete,
  handleTeamEdit,
  handleTeamGet,
  handleTeamMateDelete,
  handleTeamMateGet,
  handleAllTeamGet
} = require('../controllers/participantTeams/participantTeamsControllers');

const {
  participantInvite,
  organizerInvite
} = require('../controllers/inviteController/inviteMail');
const UserValidator = require('../middlewares/UserValidator');

const router = Router();

router.post(
  '/',
  authenticate,
  EventValidator.eventValidation,
  handleEventsPost
);
router.get('/', authenticate, handleEventsGet);
router.get('/user-events', authenticate, handleEventsGetByUSerId);
router.put(
  '/:id',
  authenticate,
  EventValidator.validateID,
  EventValidator.eventValidation,
  handleEventsEdit
);
router.delete(
  '/:id',
  authenticate,
  EventValidator.validateID,
  handleEventsDelete
);
router.get('/:id', authenticate, EventValidator.validateID, handleEventGetById);
router.get(
  '/:id/team',
  authenticate,
  EventValidator.validateID,
  handleGetTeamMembers
);
router.post(
  '/:id/team',
  authenticate,
  EventValidator.validateID,
  EventValidator.checkEventOwner,
  EventValidator.teamValidation,
  handleAddTeamMember
);

router.delete(
  '/:id/team/:teammate_id',
  authenticate,
  EventValidator.validateID,
  EventValidator.checkEventOwner,
  handleDeleteTeamMember
);

// Events participants endpoints
router.get(
  '/:id/participants',
  authenticate,
  EventValidator.validateID,
  handleEventsGetById
);

router.get('/participants/user', authenticate, handleEventsUserSignedFor);

router.post(
  '/:id/participants',
  authenticate,
  EventValidator.validateID,
  EventValidator.restrictJudges,
  handleEventRegistration
);

router.delete(
  '/:id/participants',
  authenticate,
  EventValidator.validateID,
  handleEventDelete
);

// Events projects entries endpoints
router.post(
  '/:id/projects',
  authenticate,
  EventValidator.validateID,
  EventValidator.validateParticipant,
  EventValidator.projectValidation,
  handleprojectEntriesPost
);

router.get(
  '/:id/projects',
  authenticate,
  EventValidator.validateID,
  handleGetAllProjectEntries
);

router.get(
  '/projects/:id',
  authenticate,
  EventValidator.validateProjectID,
  handleGetProjectEntry
);

router.put(
  '/projects/:id',
  authenticate,
  EventValidator.validateProjectID,
  EventValidator.projectValidation,
  handleProjectEntriesEdit
);

router.delete(
  '/projects/:id',
  authenticate,
  EventValidator.checkEventOwner,
  EventValidator.validateProjectID,
  handleProjectEntriesDelete
);

// Project Grading
router.post(
  '/projects/:id/grading',
  authenticate,
  EventValidator.validateProjectID,
  handleprojectGradingPost
);

router.put(
  '/projects/:id/grading',
  authenticate,
  EventValidator.validateProjectID,
  handleProjectGradingEdit
);

router.get(
  '/projects/:id/grading',
  authenticate,
  EventValidator.validateProjectID,
  handleGetProjectGrading
);
router.get(
  '/:id/projects/grading',
  authenticate,
  EventValidator.validateID,
  handleGetAllProjectGrading
);
router.delete(
  '/projects/:id/grading',
  authenticate,
  EventValidator.validateProjectID,
  handleProjectGradingDelete
);

// Participant Teams
router.post(
  '/:id/participant-teams',
  authenticate,
  EventValidator.validateID,
  handleCreateTeam
);

router.get(
  '/:id/participant-teams',
  authenticate,
  EventValidator.validateID,
  handleAllTeamGet
);
router.post('/participant-teams/:id', authenticate, handleAddTeamMembers);
router.put('/participant-teams/:id', authenticate, handleTeamEdit);
router.get('/participant-teams/:id', authenticate, handleTeamGet);
router.get('/participant-teams/:id/members', authenticate, handleTeamMateGet);
router.delete('/participant-teams/:id', authenticate, handleTeamDelete);
router.delete(
  '/participant-teams/member/:id',
  authenticate,
  handleTeamMateDelete
);

router.post(
  '/participant-teams/invite/:id',
  UserValidator.inviteInput,
  participantInvite
);
router.post(
  '/event-teams/invite/:id',
  UserValidator.inviteInput,
  organizerInvite
);
module.exports = router;
