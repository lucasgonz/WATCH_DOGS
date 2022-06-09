<template>
  <div class="container">
    <!-- for each drones in drone add a new card and pass the data -->
    <card v-for="drone in drones" :key="drone.model" :data="drone"></card>
  </div>
</template>

<script>
import card from '../components/card.vue'
export default {
  components: { card },
  name: 'IndexPage',
  data() {
    return {
      drones: [],
    }
  },

  async mounted() {
    // HTTP request to get drones
    const response = await this.$axios.get('/api/drones')
    this.drones = response.data
    console.log(this.drones)
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
