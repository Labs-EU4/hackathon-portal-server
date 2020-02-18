const db = require('../../models/eventParticipantsModel');
const requestHandler = require('../../utils/requestHandler');

async function handleEventsGetById(req, res) {
  const { id } = req.params;
  await db
    .getByEventId(id)
    .then(data => {
      return requestHandler.success(
        res,
        200,
        'Participant(s) retrieved successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(res, 404, `Event Not Found ${error.message}`);
    });
}

async function handleEventRegistration(req, res) {
  const { userId } = req.decodedToken;
  const { id } = req.params;
  await db
    .addCredentials({
      user_id: userId,
      event_id: id
    })
    .then(data => {
      return requestHandler.success(
        res,
        201,
        'Event registered successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(
        res,
        500,
        `Internal server error ${error.message}`
      );
    });
}

async function handleEventDelete(req, res) {
  const { userId } = req.decodedToken;
  const { id } = req.params;
  await db
    .remove(userId, id)
    .then(data => {
      return requestHandler.success(
        res,
        200,
        'Event deleted successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(
        res,
        500,
        `Internal server error ${error.message}`
      );
    });
}

const handleEventsUserSignedFor = async (req, res) => {
  try {
    const { perPage } = req.query;
    const { currentPage } = req.query;
    const { userId } = req.decodedToken;
    const registeredEvents = await db.getByUserId(perPage, currentPage, userId);
    return requestHandler.success(
      res,
      200,
      'Retrieved events registered by user successfully',
      registeredEvents
    );
  } catch (error) {
    return requestHandler.error(
      res,
      500,
      `Internal server error ${error.message}`
    );
  }
};

module.exports = {
  handleEventsGetById,
  handleEventRegistration,
  handleEventDelete,
  handleEventsUserSignedFor
};
