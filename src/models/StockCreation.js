import request from 'helpers/request';
import UserModel from 'models/User';
import toastr from 'toastr';

const Stock = {
  stockList: {
    stocks: [],
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
        Stock.stockList.stocks = res.data.data.data;
        return Promise.resolve('Fetch completed');
      });
    },


    createStock: (data) => {
      return request({
        method: 'POST',
        url: 'api/v1/stock',
        data,
      }, true).then((res) => {
        $('#myModal').remove(),
        $('.modal-backdrop').remove();
        $('.modal-open').removeClass();
        toastr.success(res.data.message);
        window.location.reload();
      }).catch((error) => {
        toastr.warning(error.response.data.message);
      });
    },
  },
};

export default Stock;
