import request from 'helpers/request';
import toastr from 'toastr';

const Branches = {
  branchList: {
    branchs: [],
    branchIDs: [],
    loading: true,

    fetch: () => {
      Branches.branchList.loading = true;
      return request({
        method: 'POST',
        url: '/api/v1/branch/fetch',
      }, true).then((res) => {
        Branches.branchList.branchs = res.data.data.data;
        const data = res.data.data.data;
        data.forEach((item) => {
          Branches.branchList.branchIDs.push(item.id);
        });
        return Promise.resolve('Fetch completed');
      });
    },

    addBranch: (data) => {
      return request({
        method: 'POST',
        url: 'api/v1/branch',
        data,
      }, true).then((res) => {
        $('#myModal').remove(),
        $('.modal-backdrop').remove();
        $('.modal-open').removeClass();
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

export default Branches;
