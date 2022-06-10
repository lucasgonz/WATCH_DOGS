<template>
  <div class="container">
    <table>
      <!-- Table header -->
      <tr>
        <th key="name">Name</th>
        <th>Chargin</th>
        <th>Time left</th>
        <th>Return time</th>
        <th>Rent</th>
      </tr>
      <!-- Table content with drones data -->
      <card v-for="drone in drones" :data="drone" :key="drone.model"></card>
    </table>
  </div>
</template>

<script>
import card from '../components/card.vue'
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
    this.drones = (await this.$axios.get('/api/drones')).data
    // sort drones by chargePct desc
    this.drones = sortObjectByPropreties(this.drones, 'chargePct', true)
  },
}
</script>

<style lang="scss">
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0em 1.5em;
  table-layout: fixed;
}

tr th {
  border-bottom: 1px solid #808080;
  padding: 20px;
  background-color: $secondary;
}

th,
td {
  text-align: center;
}
</style>
