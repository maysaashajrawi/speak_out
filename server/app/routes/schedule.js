const express = require('express')
const router = require('express').Router();
const controller = require("../controller/schedule");
router.post('/createSchedule/:id', controller.createSchedule);
router.get('/getScheduleForUser/:id/:date', controller.getScheduleForUser);
router.get('/getScheduleForDoctor/:id', controller.getScheduleForDoctor);
router.post('/updateDisable/:id' , controller.updateDisable)
// export the router folder 
module.exports = router;