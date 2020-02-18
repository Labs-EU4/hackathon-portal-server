/* eslint-disable camelcase */
const requestHandler = require('../../utils/requestHandler');
const Mailer = require('../../utils/mailHandler');

const redirectUrl = process.env.REDIRECT_URL;

const participantInvite = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const emailBody = await Mailer.generateMailTemplate({
      receiverName: email,
      intro: 'Invite as Participant',
      text: `Hacky team want you to be part of team members, click the button below to join.`,
      actionBtnText: 'Join as Participant',
      actionBtnLink: `${redirectUrl}/register?team=${id}`
    });
    await Mailer.createMail({
      to: email,
      message: emailBody,
      subject: 'Invite to join Hackaton event'
    });
    return requestHandler.success(res, 200, 'Invite sent successfully');
  } catch (err) {
    return requestHandler.error(res, 500, `server error ${err.message}`);
  }
};

const organizerInvite = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role_type } = req.body;
    const emailBody = await Mailer.generateMailTemplate({
      receiverName: email,
      intro: `Invite as ${role_type}`,
      text: `Hacky team want you to be part of the organizers at a hackathon,
        click the button below to join.`,
      actionBtnText: `Join as ${role_type}`,
      actionBtnLink: `${redirectUrl}/register?team=${id}&role=${role_type}`
    });
    await Mailer.createMail({
      to: email,
      message: emailBody,
      subject: `Invite to join Hackaton event`
    });
    return requestHandler.success(res, 200, 'Invite sent successfully');
  } catch (err) {
    return requestHandler.error(res, 500, `server error ${err.message}`);
  }
};

module.exports = { participantInvite, organizerInvite };
