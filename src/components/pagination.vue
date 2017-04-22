<template lang="pug">
.pagination(v-if="_count > 1")
  ul
    li.prev(v-if="_page > 1")
      button.prev(@click="prev") 上一页
    li(v-for="number in _count", :key="number", :class="{ active: number === _page }")
      button(@click="e => goto(number)") {{ number }}
    li(v-if="_page < _count")
      button.next(@click="next") 下一页
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      default: 1
    },
    value: Number,
    size: {
      type: Number,
      default: 10
    },
    pageCount: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      pageNumber: undefined
    };
  },
  computed: {
    _count () {
      if (this.pageCount && !this.count) return this.pageCount;
      return Math.ceil(this.count / this.size);
    },
    _page: {
      get () {
        if (typeof this.pageNumber === 'undefined') {
          if (typeof this.value === 'number') {
            this.pageNumber = this.value;
          } else if (typeof this.page === 'number') {
            this.pageNumber = this.page;
          } else {
            this.pageNumber = 1;
          }
        }
        return this.pageNumber;
      },
      set (number) {
        this.pageNumber = number;
        this.$emit('input', number);
      }
    }
  },
  methods: {
    next () {
      if (this._page >= this._count) return undefined;
      this._page += 1;
      return undefined;
    },
    prev () {
      if (this._page <= 1) return undefined;
      this._page -= 1;
      return undefined;
    },
    goto (page) {
      if (page < 1 || page > this._count) return undefined;
      this._page = page;
      return undefined;
    }
  }
};
</script>

<style lang="stylus" scoped>
.pagination
  text-align center
  padding 20px 0
  li
    display inline-block
    button
      background transparent
      border none
      height 34px
      width 34px
      text-align center
      line-height 32px
      border-radius 50%
      color #50c87e
      font-size 1rem
      cursor pointer
      margin 0 5px
      padding 0
      outline 0
      &.prev, &.next
        width auto
    &.active
      button
        border solid 1px #50c87e


</style>
