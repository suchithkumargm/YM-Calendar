import express from 'express';

import isHoliday from './checkHolidays.js';

const router = express.Router();

router.post('/checkholiday', (req, res) => {
    const { date, typeOfHoliday, holidayName } = req.body;
    const result = isHoliday(date, typeOfHoliday, holidayName);
    res.json(result);
});



export default router;