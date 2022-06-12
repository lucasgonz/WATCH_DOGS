<template>
   <div class="container">
      <table>
         <!-- Table header -->
         <tr>
            <!-- For each title in data.header - sort function by key value -->
            <th @click="sort(obj.key)" v-for="obj in header" :key="obj.key">
               {{ obj.title }}
               <!-- Arrow Icon Change ascending value if available -->
               <v-icon @click="ascending = !ascending" v-if="obj.key != null" small right color="grey">{{
                  ascending ? 'mdi-arrow-down' : 'mdi-arrow-up'
               }}</v-icon>
            </th>
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
         header: {
            name: { title: 'Name', key: 'model' },
            charge: { title: 'Chargin', key: 'chargePct' },
            timeLeft: { title: 'Time left', key: 'timeLeft' },
            returnTime: { title: 'Return time', key: null },
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
      // Aassign to each drone a return time and a time left property
      this.drones.forEach((drone) => {
         drone.returnTime = ''
         drone.timeLeft = 0
      })
   },

   methods: {
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
tr {
   -webkit-box-shadow: 3px 2px 14px 2px rgba(0, 0, 0, 0.55);
   box-shadow: 3px 2px 14px 2px rgba(0, 0, 0, 0.55);
   border-radius: 10px;
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
