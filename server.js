const express = require('express');
const { google } = require('googleapis');
const keys = require('./keys.json');

const app = express();
const PORT = process.env.PORT || 3000;

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets.readonly']
);

client.authorize((err, tokens) => {
    if (err) {
        console.log('Error connecting to Google Sheets API:', err);
        return;
    }
    console.log('Connected to Google Sheets API');
});

const sheets = google.sheets({ version: 'v4', auth: client });

app.get('/api/occupancy', async (req, res) => {
    try {
        const spreadsheetId = '197m6mi1R-rM-iUZgGLPY8xHKOvUOhKyEWMTkGH0RV7A'; // замените на ваш ID таблицы
        const range = 'Лист1!A2'; // замените на ваш диапазон данных
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: range,
        });
        const occupancyCount = response.data.values[0][0];
        res.json({ count: occupancyCount });
    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.use(express.static('dist'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
