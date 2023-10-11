import express from 'express';

import isHoliday from './checkHolidays.js';
import getHolidays from './getHolidays.js';

const router = express.Router();

router.get('/getholidays',(req,res)=>{
    const result=getHolidays();
    res.json(result);
})

router.post('/checkholiday', (req, res) => {
    const { date, typeOfHoliday, holidayName } = req.body;
    const result = isHoliday(date, typeOfHoliday, holidayName);
    res.json(result);
});



export default router;