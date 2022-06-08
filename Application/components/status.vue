<template>
  <div class="status"><span class="dot"></span></div>
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
.dot {
  height: 12px;
  width: 12px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  margin-right: 0px;
  margin-left: 20px;
}

.status {
  align-self: center;
  margin-right: 0px !important;
}
</style>
