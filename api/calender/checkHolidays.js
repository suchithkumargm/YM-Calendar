import { HolidayAPI } from 'holidayapi';

function isHoliday(date) {


const key = 'd6f4e678-d1ac-4b63-a4f0-fc80108a1c75';
const holidayApi = new HolidayAPI({ key });

// Fetch supported countries and subdivisions
holidayApi.countries()
  .then((countries) => { console.log(countries); })
  .catch((err) => { console.error(err); });

// Fetch supported languages
holidayApi.languages()
  .then((languages) => { console.log(languages); })
  .catch((err) => { console.error(err); });

// Fetch holidays with minimum parameters
holidayApi.holidays({ country: 'US', year: 2019 })
  .then((holidays) => { console.log(holidays); })
  .catch((err) => { console.error(err); });

// Async? Await? No problem!
(async () => {
  // Fetch supported countries and subdivisions
  const countries = await holidayApi.countries();

  // Fetch supported languages
  const languages = await holidayApi.languages();

  // Fetch holidays with minimum parameters
  const holidays = await holidayApi.holidays({
    country: 'US',
    year: 2019,
  });
})();
  
}

export default isHoliday;
