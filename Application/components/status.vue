<template>
  <div class="status">
    <span v-bind:class="status" class="dot"></span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Status',
  props: {
    status: {
      type: String,
      default: undefined,
    },
  },
  computed: {},
  mounted() {
    console.log(this.status)
  },
})
</script>

<style lang="scss" scoped>
.dot {
  height: 12px;
  width: 12px;
  background-color: #7d7d7d;
  border-radius: 50%;
  display: inline-block;
  margin-right: 0px;
  margin-left: 20px;
}

.status {
  align-self: center;
  margin-right: 0px !important;
}

.active {
  background-color: #4caf50;
}

.unavailable {
  background-color: #f44336;
}
</style>
