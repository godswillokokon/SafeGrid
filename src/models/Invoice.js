import request from 'helpers/request';
import UserModel from 'models/User';

const Invoice = {
  Invoice: {},

  invoiceList: {
    invoice: [],
    stock: [],
    stocks: [],
    stockIDs: [],
    invoiceData: [],
    invoiceList: [],
    revenue: [],
    loading: true,


    fetch: () => {
      Invoice.invoiceList.loading = true;
      return request({
        method: 'POST',
        url: '/api/v1/stock/fetch',
      }, true).then((res) => {
        const data = res.data.data.data;

        Invoice.invoiceList.stock = res.data.data.data;
        data.forEach((item) => {
          Invoice.invoiceList.stockIDs.push(item.id);
        });
        return request({
          method: 'POST',
          url: 'api/v1/invoice/fetch',
          params: {
            'stock-ids': Invoice.invoiceList.stockIDs,
          },
        }, true).then((res) => {
          Invoice.invoiceList.invoice = res.data.data.data;
          return Promise.resolve('Fetch completed');
        });
      });
    },

    fetchRevenue: (data) => {
      Invoice.invoiceList.loading = true;
      return request(
        {
          method: 'POST',
          url: 'api/v1/invoice/revenue',
          params: data,
        },
        true
      ).then((res) => {
        Invoice.invoiceList.revenue = res.data;
        return Promise.resolve('Fetch completed');
      });
    },

    init: () => {
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
        });
        return request({
          method: 'POST',
          url: 'api/v1/stock/records/fetch',
          params: {
            'stock-ids': [4],
          },
        }, true).then((res) => {
          Invoice.invoiceList.stocks = res.data.data.data;
          return Promise.resolve('Fetch completed');
        });
      });
    },


    postInvoice: (data) => {
      return request(
        {
          data,
        },
        true
      ).then((res) => {
        Invoice.invoiceList.invoiceData.push(res.config.data);
        return Promise.resolve('Fetch completed');
      });
    },
  },

};

export default Invoice;
