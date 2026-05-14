const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); 
const app = express();

// Налаштування сервера та портів
const PORT = process.env.PORT || 5005;

// Підключення Мідлварів (Middleware)
app.use(express.json());
app.use(express.static('public'));

// Головний маршрут для підключення до БД MongoDB
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/his_db';

mongoose.connect(dbURI)
    .then(() => console.log('✅ База даних (Docker) успішно підключена!'))
    .catch(err => console.log('❌ Помилка підключення до бази:', err));

// Реєстрація маршрутів
app.use('/api/patients', require('./routes/patients'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/services', require('./routes/services'));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Сервер працює: http://localhost:${PORT}`);
});