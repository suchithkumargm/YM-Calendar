import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isHoliday = (date, typeOfHoliday, holidayName) => {
    let data = [];
    const filePath = path.join(__dirname, 'holidays.json');

    try {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        data = JSON.parse(jsonData);
    } catch (err) {
        console.error('Error reading JSON file:', err);
        return { message: 'Internal server error' };
    }

    const existingEntryIndex = data.findIndex(entry => entry.date === date);

    if (existingEntryIndex !== -1) {
        // Date exists, delete the entry
        data.splice(existingEntryIndex, 1);
    } else {
        // Date doesn't exist, add the entry
        const newEntry = { date, typeOfHoliday, holidayName };
        data.push(newEntry);
    }

    try {
        fs.writeFileSync(filePath, JSON.stringify(data));
    } catch (err) {
        console.error('Error writing JSON file:', err);
        return { message: 'Internal server error' };
    }

    if (existingEntryIndex !== -1) {
        return { workingDay: true };
    } else {
        return { workingDay: false };
    }
}

export default isHoliday;
