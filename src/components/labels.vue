<template lang="pug">
.labels-component
  template(v-if="labels.length")
    label-component(
      v-for="label in labels", 
      :label="label",
      :key="label.id"
    )
    router-link.label-page-link(:to="{name: 'labels'}") more
  template(v-else-if="error")
    .error-tip 网络错误，请稍后重试
  template(v-else)
    slot(name="spinner")
</template>

<script>
import LabelComponent from './label';

export default {
  components: {
    LabelComponent
  },
  props: {
    size: {
      type: Number,
      default: 4
    }
  },
  data () {
    return {
      labels: [],
      error: null
    };
  },
  methods: {
    fetch () {
      this.$http.get('/labels', { params: { page: 1, per_page: this.size, sort: 'comments' } }).then(res => {
        this.labels = res.data;
      }).catch(error => {
        this.error = error;
      });
    }
  },
  mounted () {
    this.fetch();
  }
};
</script>

<style scoped lang="stylus">
.labels-component
  min-height 44px
  text-align center
.label-page-link
  display inline-block
  margin-left 10px
  height 34px
  line-height 34px
  font-size 14px
.error-tip 
  color #999
  font-size 14px
</style>
