<template>
  <div class="container">
    <div class="header">
      <div class="group">
        <p style="width: 30px"></p>
        <p class="info-text">Name</p>
      </div>

      <p class="info-text">Chargin</p>
      <p>Time Left</p>
      <p>Return Time</p>
      <p style="width: 60px"></p>
    </div>
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
  color: rgb(155, 155, 155);
  background-color: #424242;
  border-radius: 5px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}

.header p {
  font-size: 14px;
  margin: 12px 12px;
}

.group {
  display: flex;
  flex-direction: row !important;
}

.info-text {
  width: 120px;
  margin-left: 20px !important;
}
</style>
