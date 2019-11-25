const express = require('express');
const { team } = require('../controllers');
const { authUtil } = require('../utils');
const router = express.Router();

router.use(authUtil.verifyToken);
router.use(authUtil.isLoggedIn);

router.post('/create', team.createTeam);
router.get('/getAll', team.getTeams);
router.delete('/', team.deleteTeam);

module.exports = router;
