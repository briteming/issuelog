<template lang="pug">
.index-page
  master-header(:title="label ? label : 'Latest'")
    .labels
      labels
        .cs-loader(slot="spinner")
          .cs-loader-inner
            label ●
            label ●
            label ●
  .container
    list(
      url="/issues",
      v-model="posts",
      :filter="filter",
      ref="list",
      :size="10",
      routeName="home",
      :placeholder="true"
    )
      archives(:posts="posts")
</template>

<script>
import Vue from 'vue';
import List from '@/components/list.vue';
import Labels from '@/components/labels.vue';
import MasterHeader from '@/components/master-header.vue';
import Archives from '@/components/archives.vue';

export default {
  components: {
    List,
    Labels,
    MasterHeader,
    Archives
  },
  watch: {
    $route () {
      this.posts = [];
      Vue.nextTick().then(() => this.$refs.list.fetch());
    }
  },
  computed: {
    label () {
      return this.$route.params.label;
    },
    filter () {
      return {
        labels: this.label
      };
    }
  },
  data () {
    return {
      posts: []
    };
  }
};
</script>

<style scoped lang="stylus">
.labels 
  padding-bottom 30px
  position relative
</style>

<style>
.cs-loader {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.cs-loader-inner {
  transform: translateY(-50%);
  top: 20px;
  position: absolute;
  width: calc(100% - 200px);
  padding: 0 100px;
  text-align: center;
}

.cs-loader-inner label {
  font-size: 14px;
  color: #50c87e;
  margin: 0 5px;
  opacity: 0;
  display:inline-block;
}

@keyframes lol {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  33% {
    opacity: 1;
    transform: translateX(0px);
  }
  66% {
    opacity: 1;
    transform: translateX(0px);
  }
  100% {
    opacity: 0;
    transform: translateX(100px);
  }
}

@-webkit-keyframes lol {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-100px);
  }
  33% {
    opacity: 1;
    -webkit-transform: translateX(0px);
  }
  66% {
    opacity: 1;
    -webkit-transform: translateX(0px);
  }
  100% {
    opacity: 0;
    -webkit-transform: translateX(100px);
  }
}

.cs-loader-inner label:nth-child(3) {
  -webkit-animation: lol 1.5s infinite ease-in-out;
  animation: lol 1.5s infinite ease-in-out;
}

.cs-loader-inner label:nth-child(2) {
  -webkit-animation: lol 1.5s 100ms infinite ease-in-out;
  animation: lol 1.5s 100ms infinite ease-in-out;
}

.cs-loader-inner label:nth-child(1) {
  -webkit-animation: lol 1.5s 200ms infinite ease-in-out;
  animation: lol 1.5s 200ms infinite ease-in-out;
}
</style>
