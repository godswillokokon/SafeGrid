import request from 'helpers/request';

const Report = {
  profile: {},

  reportList: {
    users: [],
    loading: true,

    fetch: () => {
      Report.reportList.loading = true;
      return request({
        url: 'api/v1/admin/customers/endDate',
      }, true).then((res) => {
        Report.reportList.users = res.data.Result;
        return Promise.resolve('Fetch completed');
      });
    },
  },

  isAdmin: () => Report.profile.Role == 'Admin',

  isSuperAdmin: () => Report.profile.Role == 'Super Admin',

  isSuperVisor: () => Report.profile.Role == 'Supervisor',
};

export default Report;
