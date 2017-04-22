<template lang="pug">
.post-archive
  .placeholder(v-if="!posts.length && auto")
    .placeholder-article(v-for="i in 10")
      .article-title-holder
      p(v-for="k in Math.ceil(Math.random() * 5)")
  .posts(v-else)
    .post(v-for="post in posts")
      h2.post-title
        router-link(:to="`/post/${post.number}`") {{ post.title }}
      .post-except {{ post.body | except(50) }}
      .post-meta
        time {{ post.updated_at | date }}
        span.comment-number {{ post.comments }} comments
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true
    },
    auto: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="stylus" scoped>
.post
  margin-bottom 50px
  font-size .9rem
  .post-title 
    font-size 1.2rem
  .post-except
    line-height 1.6
    color #666
    padding 10px 0
  .post-meta
    color #999
    .comment-number
      padding-left 15px
.posts
  padding-top 20px
.placeholder
  padding-top 20px
  animation flash .8s infinite
  .placeholder-article
    margin-bottom 50px
    .article-title-holder
      height 24px
      background #ddd
      width 55%
      margin-bottom 1rem 
    p 
      line-height 1.6
      height 1rem
      margin-bottom 10px
      background #ddd
</style>
