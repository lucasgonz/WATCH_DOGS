<template>
   <div>
      <!-- circle status indicator -->
      <status-indicator class="dot" :status="status" :pulse="pulse" />
   </div>
</template>

<script lang="ts">
import { StatusIndicator } from 'vue-status-indicator'
import Vue from 'vue'
export default Vue.extend({
   components: {
      StatusIndicator,
   },
   name: 'Status',
   props: {
      status: {
         type: String,
         default: undefined,
      },
      pulse: {
         type: Boolean,
         default: false,
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
   display: inline-block;
   margin-right: 20px;
   margin-left: 20px;
}
</style>
