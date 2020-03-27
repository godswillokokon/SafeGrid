import request from 'helpers/request';
import UserModel from 'models/User';
import toastr from 'toastr';

const Invoice = {
  invoiceList: {
    invoice: [],
    stock: [],
    stockIDs: [],
    stockNames: [],
    loading: true,
    lastPage: 0,

    admin: () => {
      Invoice.invoiceList.loading = true;
      return request({
        method: 'POST',
        url: '/api/v1/stock/fetch',
      }, true).then((res) => {
        const data = res.data.data.data;
        Invoice.invoiceList.stock = res.data.data.data;
        data.forEach((item) => {
          Invoice.invoiceList.stockIDs.push(item.id);
          Invoice.invoiceList.stockNames.push(item.name);
        });
        return Invoice.invoiceList.fetchInvoices();
      });
    },

    fetchInvoices: (page = 1) => {
      return request({
        method: 'POST',
        url: 'api/v1/invoice/fetch',
        params: {
          'stock-ids': Invoice.invoiceList.stockIDs,
          'page': page,
        },
      }, true).then((res) => {
        Invoice.invoiceList.invoice = res.data.data.data;
        Invoice.invoiceList.lastPage = res.data.data.last_page;
        return Promise.resolve('Fetch completed');
      });
    },

    getAllStocks: () => {
      Invoice.invoiceList.loading = true;
      return request({
        method: 'GET',
        url: '/api/v1/stock/fetch-all-stocks',
      }, true).then((res) => {
        const data = res.data.data.data;
        Invoice.invoiceList.stock = res.data.data.data;
        data.forEach((item) => {
          Invoice.invoiceList.stockIDs.push(item.id);
          Invoice.invoiceList.stockNames.push(item.name);
        });
        return Invoice.invoiceList.fetchInvoices();
      });
    },


    fetch: () => {
      Invoice.invoiceList.loading = true;
      return request({
        method: 'POST',
        url: '/api/v1/stock/fetch',
        params: {
          'branch-ids': [UserModel.getBranch().id],
        },
      }, true).then((res) => {
        const data = res.data.data.data;
        Invoice.invoiceList.stock = res.data.data.data;
        data.forEach((item) => {
          Invoice.invoiceList.stockIDs.push(item.id);
          Invoice.invoiceList.stockNames.push(item.name);
        });
        return request({
          method: 'POST',
          url: 'api/v1/invoice/fetch',
          params: {
            'stock-ids': Invoice.invoiceList.stockIDs,
          },
        }, true).then((res) => {
          Invoice.invoiceList.invoice = res.data.data.data;
          console.log(res.data.data.data);
          return Promise.resolve('Fetch completed');
        });
      });
    },

    filter: (data) => {
      Invoice.invoiceList.loading = true;
      return request({
        method: 'POST',
        url: 'api/v1/invoice/fetch',
        data,
      }, true).then((res) => {
        Invoice.invoiceList.invoice = res.data.data.data;
        return Promise.resolve('Fetch completed');
      });
    },

    addInvoice: (data) => {
      return request({
        method: 'POST',
        url: 'api/v1/invoice',
        data,
      }, true).then((res) => {
        $('#myModal').remove(),
        $('.modal-backdrop').remove();
        $('.modal-open').removeClass();
        // window.location.reload();
        toastr.success(res.data.message);
      }).catch((error) => {
        toastr.warning(error.response.data.message);
      });
    },

    reverseInvoice: (data) => {
      return request({
        method: 'PUT',
        url: 'api/v1/invoice',
        data,
      }, true).then((res) => {
        toastr.success(res.data.message);
      }).catch((error) => {
        toastr.warning(error.response.data.message);
      });
    },

    deleteBranch: (data) => {
      return request({
        method: 'DELETE',
        url: 'api/v1/branch',
        data,
      }, true).then(function(response) {
        console.log(response);
      }).catch(function(error) {
        console.log(error);
      });
    },
  },
};

export default Invoice;
