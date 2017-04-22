<template lang="pug">
.post-page
  .container
    .blog-post
      fetch(
        :url="`/issues/${id}`",
        ref="fetch",
        v-model="post"
      )
        .placeholder(v-if="!post.title")
          .place-title
          .place-paragraph(v-for="i in 5")
            p(v-for="k in Math.ceil(Math.random() * 10)")
            span(:style="{width: Math.random() * 100 + '%'}")
        article.post(v-else)
          header
            time.post-date {{ post.updated_at | date }}
            h1.post-title {{ post.title }}
          .post-body(v-html="content")
          .post-labels
            label-component(
              v-for="label in post.labels",
              :key="label.id",
              :label="label"
            )
      .comments
        .block-title
          h4 评论
        comments(:id="id")
</template>

<script>
import markdown from '@/utils/markdown';
import Comments from '@/components/comments.vue';
import LabelComponent from '@/components/label.vue';
import Fetch from '@/components/fetch.vue';

export default {
  components: {
    Comments,
    LabelComponent,
    Fetch
  },
  data () {
    return {
      post: {},
      id: this.$route.params.id / 1
    };
  },
  computed: {
    content () {
      if (!this.post.body) return '';
      return markdown(this.post.body);
    }
  },
  watch: {
    $route () {
      this.$refs.fetch.fetch();
    }
  },
  methods: {
    fetch () {
      this.$http.get(`/issues/${this.id}`).then(res => {
        this.post = res.data;
        return undefined;
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.post-page 
  background #fff
.blog-post
  padding-top 50px
.placeholder
  animation flash .8s infinite
  .place-title
    height 32px
    background #ddd
    width 55%
    margin-bottom 2rem 
  .place-paragraph
    margin-bottom 2rem
  p 
    line-height 1.8
    height 1rem
    margin-bottom 10px
    background #ddd
  span 
    display inline-block
    line-height 1.8
    background #ddd
    height 1rem
.post 
  .post-date
    display block
    color #999
    font-size 14px
    padding-bottom 10px
  .post-title
    font-size 1.6rem
    padding-bottom 20px
  .post-labels
    padding-top 20px
.comments
  padding 50px 0
.block-title
  position relative
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
</style>
<style lang="stylus">
.post-body 
  p
    line-height 1.7
    margin: 20px 0
  h1
    font-size 1.4rem
  h2 
    font-size 1.4rem
  h3 
    font-size 1.2rem
  h4 
    font-size 1.2rem
  h5 
    font-size 1rem
  h6 
    font-size .8rem
  code
    display inline-block
    background rgba(0, 0, 0, .05)
    padding 0 5px
    border-radius 3px
    color #2aa198
    font-size .9rem
  pre
    display: block;
    overflow-x: auto;
    line-height: 1.5;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 12px;
    padding: 1rem;
    white-space: pre;
    border-radius: 5px;
    background: #fdf6e3;
    color: #657b83;
    margin: 20px 0;
    code 
      display block
      font-size 12px
      background transparent
      padding 0
      border-radius 0
      color #657b83
/*

Orginal Style from ethanschoonover.com/solarized (c) Jeremy Hull <sourdrums@gmail.com>

*/
.hljs-comment,
.hljs-quote {
  color: #93a1a1;
}

/* Solarized Green */
.hljs-keyword,
.hljs-selector-tag,
.hljs-addition {
  color: #859900;
}

/* Solarized Cyan */
.hljs-number,
.hljs-string,
.hljs-meta .hljs-meta-string,
.hljs-literal,
.hljs-doctag,
.hljs-regexp {
  color: #2aa198;
}

/* Solarized Blue */
.hljs-title,
.hljs-section,
.hljs-name,
.hljs-selector-id,
.hljs-selector-class {
  color: #268bd2;
}

/* Solarized Yellow */
.hljs-attribute,
.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-class .hljs-title,
.hljs-type {
  color: #b58900;
}

/* Solarized Orange */
.hljs-symbol,
.hljs-bullet,
.hljs-subst,
.hljs-meta,
.hljs-meta .hljs-keyword,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-link {
  color: #cb4b16;
}

/* Solarized Red */
.hljs-built_in,
.hljs-deletion {
  color: #dc322f;
}

.hljs-formula {
  background: #eee8d5;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}
</style>
