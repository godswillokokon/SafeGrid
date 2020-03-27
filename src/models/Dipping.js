import request from 'helpers/request';
import UserModel from 'models/User';
import toastr from 'toastr';

const Dipping = {
  dippingList: {
    stock: [],
    records: [],
    stockIDs: [],
    loading: true,


    init: () => {
      Dipping.dippingList.loading = true;
      return request({
        method: 'POST',
        url: '/api/v1/stock/fetch',
        params: {
          'branch-ids': [UserModel.getBranch().id],
        },
      }, true).then((res) => {
        const data = res.data.data.data;
        Dipping.dippingList.stock = res.data.data.data;
        data.forEach((item) => {
          Dipping.dippingList.stockIDs.push(item.id);
        });
        return request({
          method: 'POST',
          url: 'api/v1/stock/records/fetch',
          params: {
            'stock-ids': Dipping.dippingList.stockIDs,
            'types': ['update'],
          },
        }, true).then((res) => {
          Dipping.dippingList.records = res.data.data.data;
          return Promise.resolve('Fetch completed');
        });
      });
    },

    filter: (data) => {
      console.log(data);
      Dipping.dippingList.loading = true;
      return request({
        method: 'POST',
        url: 'api/v1/stock/records/fetch',
        data,
      }, true).then((res) => {
        console.log(res);
        Dipping.dippingList.records = res.data.data.data;
        return Promise.resolve('Fetch completed');
      });
    },

    addDipping: (data) => {
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
      }).catch((error) => {
        toastr.warning(error.response.data.message);
      });
    },
  },
};

export default Dipping;
