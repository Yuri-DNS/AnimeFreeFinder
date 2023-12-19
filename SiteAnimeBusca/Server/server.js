const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const app = express();
const port = 3001;

// Use o middleware cors
app.use(cors());

app.get('/api/scrape', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://animesonlinecc.to/search/fullmetal%20alchemist');
    const html = await page.content();

    await browser.close();

    res.json({ html });
  } catch (error) {
    console.error('Erro ao obter HTML:', error.message);
    res.status(500).json({ error: 'Erro ao obter HTML' });
  }
});

app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});
