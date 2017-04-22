<template lang="pug">
transition(name="slide-up")
  .search-component(v-show="show")
    .search-header
      form(@submit="search")
        .container
          .search-box
            input.search-input#search_input(v-model="q")
            i.clear-icon(v-if="q", @click="clear")
              <svg fill="#999" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
                  <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            .search-button
              button.btn search
    list(
      :url="`/search/issues?${this.filter}`",
      :options="{baseURL: 'https://api.github.com'}",
      :auto="false",
      ref="list",
      @input="data => results = data.items"
    )
      .search-results.container
        archives(:posts="results", :auto="false")
      .empty(v-if="!results.length")
        svg(xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="#999999")
          path(d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm9 28H16c-3.31 0-6-2.69-6-6s2.69-6 6-6l.27.03c.89-3.46 4-6.03 7.73-6.03 4.42 0 8 3.58 8 8h1c2.76 0 5 2.24 5 5s-2.24 5-5 5z")
        p No results
</template>

<script>
import Vue from 'vue';
import List from '@/components/list.vue';
import repo from '@/config/repository';
import Archives from '@/components/archives.vue';

export default {
  components: {
    List,
    Archives
  },
  data () {
    return {
      q: '',
      results: [],
      show: false
    };
  },
  computed: {
    filter () {
      const query = `${this.q}+author:${repo.owner}+repo:${repo.owner}/${repo.repo}`;
      return `q=${query}`;
    }
  },
  methods: {
    search (e) {
      e.preventDefault();
      console.log(this.$refs.list);
      this.$refs.list.fetch();
    },
    open () {
      this.show = true;
      document.body.classList.add('search-open');
      Vue.nextTick().then(() => setTimeout(() => document.getElementById('search_input').focus(), 400));
    },
    close () {
      this.show = false;
      document.body.classList.remove('search-open');
    },
    toggle () {
      if (this.show) return this.close();
      this.open();
    },
    reset () {
      this.q = '';
      this.results = [];
    },
    clear () {
      this.q = '';
      document.getElementById('search_input').focus();
    }
  }
};
</script>

<style lang="stylus" scoped>
.search-component
  position absolute
  width 100%
  top 0
  left 0
  height calc(100vh - 55px)
  overflow auto
  background rgba(255, 255, 255, 1)
  z-index 100
  .search-header
    background #fafafa
    padding 50px 0 
    .search-box
      background #fff 
      height 44px
      border-radius 2px
      box-shadow 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)
      display flex
      .search-input
        flex 1
        border none
        outline none
        line-height 44px
        font-size 14px
        padding 0 10px
      .search-button
        padding 5px
        .btn
          height 34px
          line-height 34px
          margin 0
          text-transform uppercase
      .clear-icon
        padding-top 10px
.search-results
  padding-top 30px
.error
  padding 30px 0
  text-align center
  p 
    color #999
    padding-top 20px
    padding-bottom 20px
.slide-up-enter-active, .slide-up-leave-active
  transform translate3d(0, 0, 0)
  transition all .3s
.slide-up-enter, .slide-up-leave-to
  transform translate3d(0, 100%, 0)
</style>
