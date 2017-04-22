<template lang="pug">
.fetch-component
  template(v-if="status === 'error'")
    .error
      svg(fill="#999999" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg")
        path(d="M0 0h24v24H0z" fill="none")
        path(d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z")
      p 网络错误，请重试
      button.btn(@click="fetch") 重试
  template(v-else-if="status === 'empty'")
    .empty
      svg(xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="#999999")
        path(d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm9 28H16c-3.31 0-6-2.69-6-6s2.69-6 6-6l.27.03c.89-3.46 4-6.03 7.73-6.03 4.42 0 8 3.58 8 8h1c2.76 0 5 2.24 5 5s-2.24 5-5 5z")
      p 暂无数据
  template(v-else)
    slot
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    filter: Object,
    auto: {
      type: Boolean,
      default: true
    },
    options: Object
  },
  data () {
    return {
      res: {},
      status: 'pendding'
    };
  },
  methods: {
    fetch () {
      this.status = 'fetch';
      this.$emit('fetch');
      let options = {params: this.filter};
      if (this.options) {
        options = Object.assign({}, options, this.options);
      }
      this.$http.get(this.url, options).then(res => {
        this.res = res;
        if (Array.isArray(res.data) && !res.data.length) {
          this.status = 'empty';
        } else {
          this.status = 'success';
        }
        this.$emit('input', res.data);
        this.$emit('change', res);
      }).catch(error => {
        this.status = 'error';
        this.$emit('error', error);
        console.log(error);
      });
    }
  },
  mounted () {
    if (this.auto) this.fetch();
  }
};
</script>

<style lang="stylus" scoped>
.fetch-component
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
