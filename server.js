const express = require('express');
const { google } = require('googleapis');
const keys = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

const app = express();
const port = process.env.PORT || 3000;

const auth = new google.auth.GoogleAuth({
  credentials: keys,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

app.get('/data', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '197m6mi1R-rM-iUZgGLPY8xHKOvUOhKyEWMTkGH0RV7A',
      range: 'Лист1!A2',
    });

    res.send(response.data.values);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Error retrieving data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
