import request from 'helpers/request';

const Receiveables = {
  profile: {},

  receiveablesList: {
    users: [],
    loading: true,

    fetch: () => {
      Receiveables.receiveablesList.loading = true;
      return request(
        {
          url: 'api/v1/admin/customers/receiveables',
        },
        true).then((res) => {
        Receiveables.receiveablesList.users = res.data.Result;
        return Promise.resolve('Fetch completed');
      });
    },
  },

  isAdmin: () => Receiveables.profile.Role == 'Admin',

  isSuperAdmin: () => Receiveables.profile.Role == 'Super Admin',

  isSuperVisor: () => Receiveables.profile.Role == 'Supervisor',
};

export default Receiveables;
