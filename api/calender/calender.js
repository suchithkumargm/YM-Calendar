import express from 'express';

import isHoliday from './checkHolidays.js';

const router = express.Router();

router.get('/getholidays/:date', (req, res) => {
    const { date } = req.params;
    const result = isHoliday(date);
    res.json({ isHoliday: result });
  });
  

export default router;