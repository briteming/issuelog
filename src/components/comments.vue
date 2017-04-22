<template lang="pug">
.post-comments
  list(
    :url="`/issues/${id}/comments`",
    v-model="comments",
    :placeholder="true"
  )
    .placeholder(v-if="!comments.length")
      .comment-holder(v-for="i in 5")
        .avatar-holder
        .content-holder
          .meta-holder
          p(v-for="k in Math.ceil(Math.random() * 3)")
    .comment-list(v-else)
      comment(
        v-for="comment in comments", 
        :comment="comment", 
        :key="comment.id"
      )
  .add-comment
    a.add-comment-button.btn(:href="`https://github.com/${repo.owner}/${repo.repo}/issues/${id}`") 添加评论

</template>

<script>
import List from './list.vue';
import Comment from './comment.vue';
import repo from '@/config/repository';

export default {
  components: {
    List,
    Comment
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      comments: [],
      repo
    };
  }
};
</script>

<style lang="stylus" scoped>
.comment-list
  padding-top 20px
.placeholder
  animation flash .8s infinite
  padding-top 20px
  .comment-holder
    display flex
    margin 20px 0
    .avatar-holder
      background #ddd
      height 60px
      width 60px
      border-radius 50%
    .content-holder
      flex 1
      padding-left 10px
      .meta-holder
        width 30%
        background #ddd
        height 14px
        margin-bottom 10px
      p
        background #ddd
        line-height 1.6
        margin-bottom 10px
        height 1rem
.add-comment
  text-align center
  padding-top 30px
</style>
