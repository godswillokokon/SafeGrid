import request from 'helpers/request';
import toastr from 'toastr';

const User = {
  profile: {},
  user: {},
  userList: {
    users: [],
    loading: true,

    fetch: () => {
      User.userList.loading = true;
      return request({
        url: 'api/v1/admin/users',
      }, true).then((res) => {
        User.userList.users = res.data.Result;
        return Promise.resolve('Fetch completed');
      });
    },

    addUser: (data) => {
      return request({
        method: 'POST',
        url: 'api/v1/admin/users',
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

  fetchSingleUser: (id) => {
    // User.userList.loading = true;
    return request({
      url: 'api/v1/admin/user/' + id,
    }, true).then((res) => {
      User.user = res.data.Result;
      return Promise.resolve('Fetch completed');
    });
  },

  isAdmin: () => {
    try {
      const company = User.profile.companies[0];
      return company.pivot.role == 'admin';
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  isSuperAdmin: () => {
    try {
      return User.profile.role == 'admin';
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  isBranchRep: () => {
    try {
      const branch = User.profile.branches[0];
      return branch.pivot.role;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  getRole: () => {
    if (User.isSuperAdmin()) {
      return 'super-admin';
    } else if (User.isAdmin()) {
      return 'admin';
    } else if (User.isBranchRep()) {
      return User.profile.branches[0].pivot.role;
    }
  },

  getBranch: () => {
    if (User.isBranchRep()) {
      return User.profile.branches[0];
    }

    return false;
  },

  getCompany: () => {
    if (User.isAdmin()) {
      return User.profile.companies[0];
    }

    return false;
  },
};

export default User;
