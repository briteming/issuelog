import request from '@/utils/request';

export default {
  install (Vue) {
    Vue.prototype.$http = request;
  }
};
