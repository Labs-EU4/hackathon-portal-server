/* eslint-disable no-else-return */
const db = require('../../models/projectGradingModel');
const eventsDb = require('../../models/eventsModel');
const requestHandler = require('../../utils/requestHandler');

// Project grading

async function handleProjectGradingDelete(req, res) {
  const { id } = req.params;
  await db
    .removeGrading(id)
    .then(data => {
      return requestHandler.success(
        res,
        200,
        'Project grading deleted successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, ` server error ${error.message}`);
    });
}

async function handleProjectGradingEdit(req, res) {
  const { userId } = req.decodedToken;
  const { id } = req.params;

  let eventRubrics;
  await eventsDb
    .findById(req.body.project_event_id)
    .then(data => {
      data.map(items => {
        eventRubrics = items.rubrics;
        return eventRubrics;
      });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
  let totalRating = [];

  eventRubrics.map(rubricItem => {
    if (rubricItem === 'product_design') {
      totalRating = totalRating.concat(req.body.product_design);
    } else if (rubricItem === 'functionality') {
      totalRating = totalRating.concat(req.body.functionality);
    } else if (rubricItem === 'innovation') {
      totalRating = totalRating.concat(req.body.innovation);
    } else if (rubricItem === 'product_fit') {
      totalRating = totalRating.concat(req.body.product_fit);
    } else if (rubricItem === 'extensibility') {
      totalRating = totalRating.concat(req.body.extensibility);
    } else if (rubricItem === 'presentation') {
      totalRating = totalRating.concat(req.body.presentation);
    }
    return totalRating;
  });
  let avgRubrics = 0;
  let finalAvgRubrics = 0;
  function average(nums) {
    avgRubrics = nums.reduce((a, b) => a + b);
    finalAvgRubrics = (avgRubrics / nums.length).toFixed(1);
    return finalAvgRubrics;
  }
  average(totalRating);

  const editedProjectGraging = {
    product_design: req.body.product_design,
    functionality: req.body.functionality,
    project_id: id,
    innovation: req.body.innovation,
    product_fit: req.body.product_fit,
    extensibility: req.body.extensibility,
    presentation: req.body.presentation,
    judge_id: userId,
    project_event_id: req.body.project_event_id,
    judge_comments: req.body.judge_comments,
    average_rating: finalAvgRubrics
  };
  await db
    .updateGrading(id, editedProjectGraging)
    .then(data => {
      return requestHandler.success(
        res,
        200,
        'Grade edited successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, ` server error ${error.message}`);
    });
}

async function handleprojectGradingPost(req, res) {
  const { userId } = req.decodedToken;
  const { id } = req.params;
  let eventRubrics;
  await eventsDb
    .findById(req.body.project_event_id)
    .then(data => {
      data.map(items => {
        eventRubrics = items.rubrics;
        return eventRubrics;
      });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
  let totalRating = [];
  eventRubrics.map(rubricItem => {
    if (rubricItem === 'product_design') {
      totalRating = totalRating.concat(req.body.product_design);
    } else if (rubricItem === 'functionality') {
      totalRating = totalRating.concat(req.body.functionality);
    } else if (rubricItem === 'innovation') {
      totalRating = totalRating.concat(req.body.innovation);
    } else if (rubricItem === 'product_fit') {
      totalRating = totalRating.concat(req.body.product_fit);
    } else if (rubricItem === 'extensibility') {
      totalRating = totalRating.concat(req.body.extensibility);
    } else if (rubricItem === 'presentation') {
      totalRating = totalRating.concat(req.body.presentation);
    }
    return totalRating;
  });
  let avgRubrics = 0;
  let finalAvgRubrics = 0;
  function average(nums) {
    avgRubrics = nums.reduce((a, b) => a + b);
    finalAvgRubrics = (avgRubrics / nums.length).toFixed(1);
    return finalAvgRubrics;
  }
  average(totalRating);

  const projectGraging = {
    product_design: req.body.product_design,
    functionality: req.body.functionality,
    project_id: id,
    innovation: req.body.innovation,
    product_fit: req.body.product_fit,
    extensibility: req.body.extensibility,
    presentation: req.body.presentation,
    judge_id: userId,
    project_event_id: req.body.project_event_id,
    judge_comments: req.body.judge_comments,
    average_rating: finalAvgRubrics
  };
  await db
    .addGrading(projectGraging)
    .then(data => {
      return requestHandler.success(
        res,
        201,
        'Grade submitted successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, ` server error ${error.message}`);
    });
}

async function handleGetAllProjectGrading(req, res) {
  const { id } = req.params;
  await db
    .findAllGradingsByEventId(id)
    .then(data => {
      return requestHandler.success(
        res,
        200,
        'All project grades retrieved successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, ` server error ${error.message}`);
    });
}

async function handleGetProjectGrading(req, res) {
  const { id } = req.params;
  await db
    .findGrading(id)
    .then(data => {
      return requestHandler.success(
        res,
        200,
        'Project grade retrieved successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, ` server error ${error.message}`);
    });
}

module.exports = {
  handleprojectGradingPost,
  handleGetAllProjectGrading,
  handleGetProjectGrading,
  handleProjectGradingEdit,
  handleProjectGradingDelete
};
