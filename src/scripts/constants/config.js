// адрес API новостей
// const serverNewsUrl = process.env.NODE_ENV === 'development' ? 'https://newsapi.org/v2/everything' : 'https://newsapi.org/v2/everything';
const serverNewsUrl = process.env.NODE_ENV === 'development' ? 'https://praktikum.tk/news/v2/everything' : 'https://praktikum.tk/news/v2/everything';
const serverApiUrl = process.env.NODE_ENV === 'development' ? 'https://api.0911.ru' : 'https://api.0911.ru';

// текущая дата и -7 дней от нее
const toTimeStamp = Date.now();
const toDate = new Date(toTimeStamp);
const weekTime = 604800000;
const fromDate = new Date(toTimeStamp - weekTime);

// конфиг для поучения новостей
const configNews = {
  baseUrl: serverNewsUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  apiKey: '&apiKey=21b79c1ce8dd4de2b523a493956c04ed',
  reqNewsString: `${serverNewsUrl}?` + 'language=ru&' + 'sortBy=popularity&' + 'pageSize=100&' + `from=${fromDate.toISOString()}&` + `to=${toDate.toISOString()}&`,
};

const configMain = {
  apiUrl: serverApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
};

module.exports = { serverNewsUrl, configNews, configMain };
