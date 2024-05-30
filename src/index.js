import axios from 'axios';

async function fetchData() {
  try {
    const response = await axios.get('/data');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
