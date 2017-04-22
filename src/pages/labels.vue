<template lang="pug">
.labels-page
  master-header(title="Labels")
  .container
    list(
      url="/labels", 
      :size="100", 
      v-model="labels"
    )
      .labels
        label-component(
          v-for="label in labels",
          :label="label",
          :key="label.id"
        )
</template>

<script>
import MasterHeader from '@/components/master-header.vue';
import List from '@/components/list.vue';
import LabelComponent from '@/components/label.vue';

export default {
  components: {
    MasterHeader,
    List,
    LabelComponent
  },
  data () {
    return {
      labels: []
    };
  }
};
</script>
