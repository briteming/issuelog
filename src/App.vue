<template>
  <div id="app">
    <div class="global-header">
      <nav class="social-links">
        <router-link :to="{name: 'home'}">home</router-link>
        <a v-for="i in site.social" :href="i.url">{{ i.name }}</a>
        <i class="search-icon" @click="e => $refs.search.toggle()">
          <svg fill="#50c87e" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
          search
        </i>
      </nav>
      <h1 class="header-logo">{{ site.title }}</h1>
    </div>
    <div class="wrap">
      <limited v-if="limited" :resetTime="resetTime"></limited>
      <div v-else>
        <transition name="stack-in">
          <router-view></router-view>
        </transition>
      </div>
      <search ref="search"></search>
    </div>
    <div class="global-footer">
      &copy; {{ site.title }} {{ new Date().getFullYear() }}
    </div>
  </div>
</template>

<script>
import siteConfig from '@/config/site';
import Search from '@/components/search.vue';
import Limited from '@/components/limited.vue';
import eventBus from '@/utils/event-bus';

export default {
  name: 'app',
  components: {
    Search,
    Limited
  },
  data () {
    return {
      site: siteConfig,
      mode: 'in-out',
      limited: false,
      resetTime: 0
    };
  },
  watch: {
    '$route' (to, from) {
      this.$refs.search.close();
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.mode = toDepth > fromDepth ? 'in-out' : 'out-in';
    }
  },
  created () {
    eventBus.$on('ratelimited', resetTime => {
      this.limited = true;
      this.resetTime = (resetTime / 1) * 1000;
    });
  }
};
</script>

<style lang="stylus">
body {
  font-family: -apple-system, "Helvetica Neue", "Arial", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  font-weight: 400;
  font-style: normal;
  text-rendering: optimizeLegibility;
  line-height: 1;
  color: #333;
  &.search-open {
    overflow-y hidden
  }
}
.container {
  width: 660px;
  padding 0 20px
  margin: 0 auto;
}
a{
  color: #50c87e;
  text-decoration: none;
}
strong {
  font-weight: 700;
}
@keyframes flash {
  from {
    opacity: 1;
  }
  to {
    opacity: .5;
  }
}
.btn
  display inline-block
  padding 0 15px
  height 38px
  line-height 38px
  border none
  font-size 14px
  border-radius 4px
  margin 0 5px
  color #fff
  background #50c87e
  text-decoration none
  box-shadow inset 0 -3px 0 rgba(27,31,35,0.22)
  opacity .8
  cursor pointer
  &:hover
    opacity 1

@media(max-width: 768px)
  .container
    width auto
.stack-in-enter-active
  width 100%
  z-index 99
  transform translate3d(0, 0, 0)
  opacity 1
  position absolute
  top 0
  left 0
  transition all .5s
.stack-in-enter
  width 100%
  position absolute
  top 0
  left 0
  transform translate3d(0, 300px, 0)
  z-index 99
  opcity 0
.stack-in-leave
  opacity 1
.stack-in-leave-active
  opacity 0
  transform translate3d(0, 300px, 0)
  transition all .2s
</style>
<style scoped lang="stylus">
.global-header 
  height 54px
  padding 0 20px
  background #fff
  border-bottom #f0f0f0 solid 1px
  .social-links
    float right
    a 
      line-height 54px
      margin-left 15px
      text-transform uppercase
  .header-logo
    line-height 54px
    font-size 1.2rem
    color #666
.global-footer
  height 32px
  line-height 32px
  padding 0 20px
  border-top #f0f0f0 solid 1px
  font-size 14px
  color #999
.wrap
  min-height calc(100vh - 33px - 55px)
  position relative
.search-icon
  margin-left 15px
  cursor pointer
  text-transform uppercase
  color #50c87e
  svg
    vertical-align -6px
</style>
