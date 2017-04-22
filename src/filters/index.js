import { dateFormat, datetimeFormat, except } from '@/utils/utils';

export default {
  install (Vue, options) {
    Vue.filter('date', dateFormat);
    Vue.filter('datetime', datetimeFormat);
    Vue.filter('except', except);
  }
};
