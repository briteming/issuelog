<template lang="pug">
.comment
  .avatar
    img(:src="comment.user.avatar_url")
  .comment-body
    .comment-meta
      strong {{ comment.user.login }}
      time {{ comment.created_at | datetime }}
    .body(v-html="content")
</template>

<script>
import markdown from '@/utils/markdown';

export default {
  props: {
    comment: Object,
    required: true
  },
  computed: {
    content () {
      if (!this.comment.body) return '';
      return markdown(this.comment.body);
    }
  }
};
</script>

<style lang="stylus" scoped>
.comment
  display flex
  margin 20px 0
.avatar
  img
    height 60px
    width 60px
    border-radius 50%
    border solid 1px #f0f0f0
.comment-body
  flex 1
  padding-left 15px
  padding-top 10px
  .comment-meta
    color #666
    font-size 14px
    time
      margin 0 10px
  .body
    padding-top 10px
    line-height 1.6

</style>
