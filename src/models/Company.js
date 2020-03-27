import request from 'helpers/request';
import toastr from 'toastr';

const Company = {
  profile: {},

  companyList: {
    companies: [],
    admins: [],
    companiesID: [],
    loading: true,

    fetch: () => {
      Company.companyList.loading = true;
      return request({
        method: 'POST',
        url: 'api/v1/company/fetch',
      }, true).then((res) => {
        Company.companyList.companies = res.data.data.data;
        const data = res.data.data.data;
        data.forEach((item) => {
          Company.companyList.companiesID.push(item.id);
        });
        return request({
          url: 'api/v1/company/fetch-users',
          params: {
            'company-ids': Company.companyList.companiesID,
          },
        }, true).then((res) => {
          Company.companyList.admins = res.data.data.data;
          return Promise.resolve('Fetch completed');
        });
      });
    },
    addCompany: (data) => {
      return request({
        method: 'POST',
        url: 'api/v1/company',
        params: data,
      }, true).then((res) => {
        $('#myModal').remove(),
        $('.modal-backdrop').remove();
        $('.modal-open').removeClass();
        toastr.success(res.data.message);
      }).catch((error) => {
        toastr.warning(error.response.data.message);
      });
    },
    deleteCompany: (data) => {
      return request({
        method: 'DELETE',
        url: 'api/v1/company',
        data,
      }, true).then((res) => {
        toastr.success(res.data.message);
      }).catch((error) => {
        toastr.warning(error.response.data.message);
      });
    },
    deactivateCompany: (data) => {
      return request({
        method: 'POST',
        url: 'api/v1/company/activation',
        data,
      }, true).then((res) => {
        toastr.success(res.data.message);
      }).catch((error) => {
        toastr.warning(error.response.data.message);
      });
    },
    addCompanyUser: (data) => {
      return request({
        method: 'POST',
        url: 'api/v1/company/admin',
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

export default Company;
