<template lang="pug">
.common-list
  fetch(
    :url="url", 
    :filter="query",
    ref="fetch",
    @fetch="onFetch",
    @change="onChange",
    :auto="auto",
    :options="options"
  )
    div
      slot
  pagination(
    :size="size",
    :page="page",
    :pageCount="pageCount",
    @input="change"
  )
  spinner(ref="spinner")
</template>

<script>
import Pagination from './pagination.vue';
import Spinner from './spinner.vue';
import Fetch from './fetch.vue';
import { parseHeaderLink } from '@/utils/utils';

export default {
  components: {
    Pagination,
    Spinner,
    Fetch
  },
  props: {
    routeName: String,
    paramName: {
      type: String,
      default: 'page'
    },
    url: {
      type: String,
      required: true
    },
    value: Array,
    size: {
      type: Number,
      default: 10
    },
    filter: Object,
    placeholder: Boolean,
    auto: {
      type: Boolean,
      default: true
    },
    options: Object
  },
  data () {
    let page = 1;
    const pageParam = this.$route.params && this.$route.params[this.paramName];
    if (pageParam && /^\d+$/.test(pageParam)) {
      page = parseInt(pageParam, 10);
    }
    return {
      data: [],
      page,
      pageCount: 1,
      fetched: false
    };
  },
  computed: {
    query () {
      let query = {
        page: this.page,
        per_page: this.size
      };
      if (this.filter) {
        for (let k in this.filter) {
          const i = this.filter[k];
          if (i) {
            query[k] = i;
          }
        }
      }
      return query;
    }
  },
  methods: {
    fetch () {
      this.$refs.fetch.fetch();
    },
    onFetch () {
      if (this.placeholder && !this.fetched) return undefined;
      this.fetched = true;
      this.$refs.spinner.show();
    },
    onChange (res) {
      this.data = res.data;
      this.pageCount = parseHeaderLink(res.headers);
      this.$emit('input', res.data);
      this.$refs.spinner.hide();
    },
    change (page) {
      if (this.routeName) {
        const params = {};
        params[this.paramName] = page;
        this.$router.push({ name: this.routeName, params });
      }
      this.page = page;
      this.$refs.fetch.fetch();
    }
  }
  // mounted () {
  //   if (this.auto) this.fetch();
  // }
};
</script>

<style scoped lang="stylus">
.common-list
  position relative
  .empty, .error
    padding 30px 0
    text-align center
    p 
      color #999
      padding-top 20px
  .error
    p 
      padding-bottom 20px
</style>
