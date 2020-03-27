import request from 'helpers/request';
import UserModel from 'models/User';
import toastr from 'toastr';

const Stock = {
  stockList: {
    stock: [],
    stocks: [],
    stocksBalance: [],
    stockIDs: [],
    stockNames: [],
    loading: true,

    init: () => {
      Stock.stockList.loading = true;
      return request({
        method: 'POST',
        url: '/api/v1/stock/fetch',
        params: {
          'branch-ids': [UserModel.getBranch().id],
        },
      }, true).then((res) => {
        const data = res.data.data.data;
        Stock.stockList.stock = res.data.data.data;
        data.forEach((item) => {
          Stock.stockList.stockIDs.push(item.id);
          Stock.stockList.stockNames.push(item.name);
        });
        return request({
          method: 'POST',
          url: 'api/v1/stock/records/fetch',
          params: {
            'stock-ids': Stock.stockList.stockIDs,
            'types': ['addition'],
          },
        }, true).then((res) => {
          Stock.stockList.stocks = res.data.data.data;
          return Promise.resolve('Fetch completed');
        });
      });
    },

    filter: (data) => {
      console.log(data);
      Stock.stockList.loading = true;
      return request({
        method: 'POST',
        url: 'api/v1/stock/records/fetch',
        data,
      }, true).then((res) => {
        Stock.stockList.stocks = res.data.data.data;
        return Promise.resolve('Fetch completed');
      });
    },

    adminFilter: (data) => {
      Stock.stockList.loading = true;
      return request({
        method: 'POST',
        url: 'api/v1/stock/records/balance',
        data,
      }, true).then((res) => {
        Stock.stockList.stocksBalance = res.data.data;
        return Promise.resolve('Fetch completed');
      });
    },

    addStock: (data) => {
      return request({
        method: 'POST',
        url: 'api/v1/stock/records',
        data,
      }, true).then((res) => {
        $('#myModal').remove(),
        $('.modal-backdrop').remove();
        $('.modal-open').removeClass();
        toastr.success(res.data.message);
        window.location.reload();
      }).catch(function(error) {
        toastr.warning('Some Error Occured');
        console.log(error);
      });
    },
  },
};

export default Stock;
