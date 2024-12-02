const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/proxy', async (req, res) => {
    const trackCode = req.query.oddnum;

    if (!trackCode) {
        return res.status(400).json({ error: 'Трек-код не указан' });
    }

    try {
        const response = await fetch(`https://pomah.cn/Home/selectOne?oddnum=${trackCode}`);
        const text = await response.text();
        res.send(text);
    } catch (error) {
        console.error('Ошибка при запросе к API:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});