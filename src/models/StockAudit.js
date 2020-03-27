import request from 'helpers/request';


const Dipping = {
  dippingList: {
    stock: [],
    records: [],
    stockIDs: [],
    branchStockID: [],
    branchStockName: [],
    loading: true,
    lastPage: 0,

    init: () => {
      Dipping.dippingList.loading = true;
      return request({
        method: 'POST',
        url: '/api/v1/stock/fetch',
      }, true).then((res) => {
        const data = res.data.data.data;
        Dipping.dippingList.stock = res.data.data.data;
        data.forEach((item) => {
          Dipping.dippingList.stockIDs.push(item.id);
        });
        return Dipping.dippingList.fetchRecords();
      });
    },

    getAllStocks: () => {
      Dipping.dippingList.loading = true;
      return request({
        method: 'GET',
        url: '/api/v1/stock/fetch-all-stocks',
      }, true).then((res) => {
        const data = res.data.data.data;
        Dipping.dippingList.stock = res.data.data.data;
        data.forEach((item) => {
          Dipping.dippingList.stockIDs.push(item.id);
        });
        return Dipping.dippingList.fetchRecords();
      });
    },

    fetchRecords: (page = 1) => {
      return request({
        method: 'POST',
        url: 'api/v1/stock/records/fetch',
        params: {
          'stock-ids': Dipping.dippingList.stockIDs,
          'types': ['update'],
          'page': page,
        },
      }, true).then((res) => {
        Dipping.dippingList.records = res.data.data.data;
        Dipping.dippingList.lastPage = res.data.data.last_page;
        return Promise.resolve('Fetch completed');
      });
    },

    filter: (data) => {
      Dipping.dippingList.loading = true;
      return request({
        method: 'POST',
        url: 'api/v1/stock/records/fetch',
        data,
      }, true).then((res) => {
        Dipping.dippingList.records = res.data.data.data;
        return Promise.resolve('Fetch completed');
      });
    },


    addDipping: (data) => {
      return request({
        method: 'POST',
        url: 'api/v1/stock/records',
        data,
      }, true).then(function(response) {
        console.log(response);
      }).catch(function(error) {
        console.log(error);
      });
    },
  },
};

export default Dipping;
