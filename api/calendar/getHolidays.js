import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getData = () => {
    const filePath = path.join(__dirname, 'holidays.json');

    try {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (err) {
        console.error('Error reading JSON file:', err);
        return [];
    }
}

const getHolidays = () => {
    const data = getData();
    return data.map(entry => entry.date);
}

export default getHolidays;
