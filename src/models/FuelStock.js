import request from 'helpers/request';
// import toastr from 'toastr';
const FuelStock = {
  profile: {},

  dippingList: {
    dipping: [],
    loading: true,

    fetch: () => {
      FuelStock.dippingList.loading = true;
      return request({
        url: '/api/v1/fuelStock',
      }, true).then((res) => {
        FuelStock.dippingList.dipping = res.data.Result;
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

export default FuelStock;
