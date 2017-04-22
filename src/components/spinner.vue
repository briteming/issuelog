<template lang="pug">
.spinner-component(v-show="isShow", :class="{fullscreen: fullscreen}")
  .spinner-modal(v-if="modal")
  .loader
</template>

<script>
export default {
  props: {
    modal: {
      type: Boolean,
      default: true
    },
    fullscreen: Boolean,
    lock: Boolean
  },
  data () {
    return {
      isShow: false
    };
  },
  methods: {
    show () {
      this.isShow = true;
      if (this.lock) {
        const body = document.body;
        body.classList.add('show-loading');
        body.style.height = window.innerHeight + 'px';
      }
    },
    hide () {
      this.isShow = false;
      if (this.lock) {
        const body = document.body;
        body.classList.remove('show-loading');
        body.style.height = 'auto';
      }
    }
  }
};
</script>

<style scoped>
.spinner-component {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
.fullscreen {
  position: fixed;
}
.spinner-modal {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, .3);
}
.loader,
.loader:after {
  border-radius: 50%;
  width: 4em;
  height: 4em;
}
.loader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  border-top: 2px solid rgba(0,0,0, 0.2);
  border-right: 2px solid rgba(0,0,0, 0.2);
  border-bottom: 2px solid rgba(0,0,0, 0.2);
  border-left: 2px solid #000000;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load 1.1s infinite linear;
  animation: load 1.1s infinite linear;
}
</style>

<style>
@-webkit-keyframes load {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
body.show-loading {
  overflow: hidden;
}
</style>
