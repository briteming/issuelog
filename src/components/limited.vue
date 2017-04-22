<template lang="pug">
.rate-limited
  svg.offline-icon(fill="#999999" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg")
    path(d="M0 0h24v24H0z" fill="none")
    path(d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z")
  p You reached the Github API limit request times
  p You have to wait {{ count }}
  a.btn(:href="githubLink", :style="{'margin-top': '20px'}") View in Github
</template>

<script>
import repo from '@/config/repository';

export default {
  props: {
    resetTime: {
      type: Number,
      required: true
    }
  },
  data () {
    const now = new Date().getTime();
    return {
      _countDown: null,
      remain: this.resetTime + (1000 * 10) - now
    };
  },
  computed: {
    count () {
      const millsecondPerMinute = 60 * 1000;
      const minutes = Math.floor(this.remain / millsecondPerMinute);
      const seconds = Math.floor(this.remain % millsecondPerMinute / 1000);
      return `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
    },
    githubLink () {
      return `https://github/${repo.owner}/${repo.repo}/issues`;
    }
  },
  methods: {
    countDown () {
      this._countDown = setInterval(() => {
        if (this.remain < 1000) {
          clearInterval(this._countDown);
          this.remain = 0;
          this._countDown = null;
          location.reload();
          return undefined;
        }
        const now = new Date().getTime();
        this.remain = this.resetTime + (1000 * 10) - now;
      }, 1000);
    }
  },
  mounted () {
    this.countDown();
  },
  destroyed () {
    if (this._countDown) {
      clearInterval(this._countDown);
      this._countDown = null;
    }
  }
};
</script>

<style scoped lang="stylus">
.rate-limited
  padding 30px 0
  text-align center
  p 
    color #999
    line-height 1.7
  .offline-icon 
    margin-bottom 20px
</style>
