<template lang="pug">
router-link.label(
  :to="{ name: 'label', params: { label: label.name } }",
  :style="{'background-color': '#' + label.color, 'color' : isDark ? '#fff' : '#333' }"
) {{ label.name }}
</template>

<script>
import { isDarkColor } from '@/utils/utils';

export default {
  props: {
    label: {
      type: Object,
      required: true
    }
  },
  computed: {
    isDark () {
      if (!this.label.color) return false;
      return isDarkColor(this.label.color);
    }
  }
};
</script>

<style lang="stylus" scoped>
.label
  display inline-block
  padding 0 15px
  height 34px
  line-height 34px
  font-size 14px
  border-radius 4px
  margin 5px
  color #fff
  text-decoration none
  box-shadow inset 0 -2px 0 rgba(27,31,35,0.18)
  opacity .8
    &:hover
      opacity 1
</style>
