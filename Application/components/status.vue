<template>
  <div>
    <!-- circle status indicator -->
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
})
</script>

<style lang="scss" scoped>
div {
  margin-top: 10px;
  float: left;
}

.dot {
  height: 12px;
  width: 12px;
  background-color: #7d7d7d;
  border-radius: 50%;
  display: inline-block;
  margin-right: 20px;
  margin-left: 20px;
}

.active {
  background-color: #4caf50;
}

.unavailable {
  background-color: #f44336;
}
</style>
