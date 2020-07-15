// адрес API новостей
const serverNewsUrl = process.env.NODE_ENV === 'development' ? 'https://newsapi.org/v2/everything' : 'https://newsapi.org/v2/everything';
const serverApiUrl = process.env.NODE_ENV === 'development' ? 'https://api.0911.ru' : 'https://api.0911.ru';

// текущая дата и -7 дней от нее
const totimestamp = Date.now();
const to = new Date(totimestamp);
const from = new Date(totimestamp - 7*24*3600*1000);

// конфиг для поучения новостей
const configNews = {
  baseUrl: serverNewsUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  apiKey: '&apiKey=21b79c1ce8dd4de2b523a493956c04ed',
  reqNewsString: serverNewsUrl + '?' + 'language=ru&' + 'sortBy=popularity&' + 'pageSize=5&' + 'from=' + from.toISOString() + '&' + 'to=' + to.toISOString() + '&',
};

const configMain = {
  apiUrl: serverApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
};

module.exports = {serverNewsUrl, configNews, configMain};
