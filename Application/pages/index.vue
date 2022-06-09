<template>
  <div class="container">
    <!-- for each drones in drone add a new card and pass the data -->
    <card v-for="drone in data" :key="drone.model" :data="drone"></card>
  </div>
</template>

<script>
import card from '../components/card.vue'
import { mapState } from 'vuex'
export default {
  components: { card },
  name: 'IndexPage',

  computed: {
    // map drones stats from vuex store
    ...mapState({
      data: (state) => state.drones.data,
    }),
  },
  async mounted() {
    // fetch drones from vuex
    this.$store.dispatch('drones/fetchDrones').then(() => {
      this.$store.dispatch('drones/sortDronesByPropretie', 'chargePct')
    })
    // sort drones from vuex
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
