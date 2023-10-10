import axios from 'axios';
import cheerio from 'cheerio';

// URL of the website you want to scrape
const url = 'https://www.india.gov.in/calendar';

// Function to scrape data
async function scrapeWebsite() {
  try {
    // Make an HTTP GET request to the website
    const response = await axios.get(url);

    // Load the HTML content into Cheerio
    const $ = cheerio.load(response.data);

    // Find all HTML elements with class 'redcal'
    const elementsWithClassRedcal = $('.greenCal');

    // Loop through the elements and print their HTML content
    elementsWithClassRedcal.each((index, element) => {
      console.log($(element).html());
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the scraping function
scrapeWebsite();
