<template>
  <div class="container">
    <!-- for each drones in drone add a new card and pass the data -->
    <card v-for="drone in drones" :key="drone.model" :data="drone"></card>
  </div>
</template>

<script>
import card from '../components/card.vue'
import { mapState } from 'vuex'
import { sortObjectByPropreties } from '../utils/utils.ts'

export default {
  components: { card },
  name: 'IndexPage',
  data: function () {
    return {
      drones: [],
    }
  },

  async mounted() {
    //fetch drones from api with axios
    const response = await this.$axios.get('/api/drones')
    this.drones = response.data
    // sort drones by chargePct desc
    this.drones = sortObjectByPropreties(this.drones, 'chargePct', true)
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
