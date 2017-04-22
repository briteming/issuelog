<template lang="pug">
.container
  .site-meta
    .logo
      h1 {{ site.title }}
    .description {{ site.description }}
  slot
  .block-title
    h4 {{ title }}
</template>

<script>
import siteConfig from '@/config/site';

export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      site: siteConfig
    };
  }
};
</script>

<style lang="stylus" scoped>
.site-meta
  padding 50px 0
  text-align center
  .logo
    h1
      font-size 2.2rem
      font-weight 500
  .description
    padding-top 20px
    color #999
    line-height 1.6
.block-title
  position relative
  margin 30px 0
  &:before
    content ""
    height 1px 
    background #f0f0f0
    position absolute
    width 100%
    top 50%
    left 0
  h4 
    position relative
    font-weight 700
    display inline
    z-index 9
    padding-right 16px
    background #fff
    text-transform capitalize
</style>
