import request from 'helpers/request';

const Stock = {
  profile: {},

  stockList: {
    stock: [],
    branch: [],
    stockIDs: [],
    records: [],
    loading: true,
    lastPage: 0,

    fetch: () => {
      Stock.stockList.loading = true;
      return request({
        method: 'POST',
        url: '/api/v1/stock/fetch',
      }, true).then((res) => {
        const data = res.data.data.data;
        // Stock.stockList.stock = res.data.data.data;
        data.forEach((item) => {
          Stock.stockList.stockIDs.push(item.id);
        });
        return Stock.stockList.fetchRecords();
      });
    },

    fetchRecords(page=1) {
      return request({
        method: 'POST',
        url: 'api/v1/stock/records/fetch',
        params: {
          'stock-ids': Stock.stockList.stockIDs,
          'types': ['addition'],
          'page': page,
        },
      }, true).then((res) => {
        Stock.stockList.records = res.data.data.data;
        Stock.stockList.lastPage = res.data.data.last_page;
        return Promise.resolve('Fetch completed');
      });
    },

    getAllStocks: () => {
      Stock.stockList.loading = true;
      return request({
        method: 'GET',
        url: '/api/v1/stock/fetch-all-stocks',
      }, true).then((res) => {
        const data = res.data.data.data;
        // Stock.stockList.stock = res.data.data.data;
        data.forEach((item) => {
          Stock.stockList.stockIDs.push(item.id);
        });
        return Stock.stockList.fetchRecords();
      });
    },

    filter: (data) => {
      Stock.stockList.loading = true;
      return request({
        method: 'POST',
        url: 'api/v1/stock/records/fetch',
        data,
      }, true).then((res) => {
        Stock.stockList.records = res.data.data.data;
        return Promise.resolve('Fetch completed');
      });
    },

    addDipping: (data) => {
      return request({
        method: 'POST',
        url: 'api/v1/branch/user',
        data,
      }, true).then(function(response) {
        console.log(response);
      }).catch(function(error) {
        console.log(error);
      });
    },
  },
};

export default Stock;
