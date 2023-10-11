import express from 'express';
import cors from 'cors';

import calender from './calendar/calendar.js'

const app = express();  //create an express app
const port = 5000;

app.use(cors());    //cors origin resource sharing
app.use(express.json());

app.use('/calender', calender);

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
})