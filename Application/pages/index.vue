<template>
  <div class="container">
    <table>
      <!-- Table header -->
      <tr>
        <th @click="sort(obj.key)" v-for="obj in header" :key="obj.key">
          {{ obj.title }}
          <v-icon
            @click="ascending = !ascending"
            v-if="obj.key != null"
            small
            right
            color="grey"
            >{{ ascending ? 'mdi-arrow-down' : 'mdi-arrow-up' }}</v-icon
          >
        </th>
      </tr>
      <!-- Table content with drones data -->
      <card
        v-on:updateData="
          (...args) => {
            updateD(drone, ...args)
          }
        "
        v-for="drone in drones"
        :data="drone"
        :key="drone.model"
      ></card>
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
      header: {
        name: { title: 'Name', key: 'model' },
        charge: { title: 'Chargin', key: 'chargePct' },
        timeLeft: { title: 'Time left', key: 'timeLeft' },
        returnTime: { title: 'Return time', key: 'returnTime' },
        rent: { title: 'Rent', key: null },
      },
      ascending: true,
    }
  },

  async mounted() {
    //fetch drones from api with axios
    this.drones = (await this.$axios.get('/api/drones')).data
    // sort drones by chargePct desc
    this.drones = sortObjectByPropreties(this.drones, 'chargePct', true)
  },
  methods: {
    updateD(old, newd) {
      this.drones[this.drones.indexOf(old)] = newd
    },
    sort(key) {
      if (key === null) return
      this.drones = sortObjectByPropreties(this.drones, key, this.ascending)
    },
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
