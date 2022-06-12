<template>
   <tr>
      <td>
         <!-- Status to component positive | intermediary  | negative | undefined (drone out of service) -->
         <status :status="statusClass" :pulse="isRenting && isRentable"></status>
         <!-- Drone Name / Model -->
         <div style="text-align: left">
            <b>{{ data.manufacturer }}</b>
            <p class="snd">{{ data.model }}</p>
         </div>
      </td>

      <!-- Chargin bar of drone -->
      <td class="info-text">
         <!-- Color change depending chargPct -->
         <v-progress-linear rounded :value="data.chargePct" :color="interpolateColor(data.chargePct)"></v-progress-linear>
      </td>

      <!-- Return time or time left for drone -->
      <td>
         <p class="snd">{{ getMinutesLeft() }} min</p>
      </td>

      <!-- Return time for drone -->
      <td>
         <p class="snd">{{ isRenting ? data.returnTime : canBeRented() ? 'Available' : 'Out of service' }}</p>
      </td>

      <td>
         <!-- Switch renting state and change icon -->
         <v-btn icon fab small :disabled="canBeRented() ? false : true" :color="rentingClass" @click="canBeRented() ? startRenting() : undefined">
            <!-- Icon for renting state Play / Stop -->
            <v-icon>{{ isRenting ? 'mdi-stop' : 'mdi-play' }}</v-icon>
         </v-btn>
      </td>
   </tr>
</template>

<script lang="ts">
import Vue from 'vue'
import { ruleOfThree } from '../utils/utils'
import { config } from '../droneConfig'

export default Vue.extend({
   name: 'Card',

   props: {
      data: {
         type: Object,
         default: null,
      },
   },

   data() {
      return {
         isRenting: false,
         isRentable: true,
      }
   },
   mounted() {
      this.isRentable = this.canBeRented()
      this.data.returnTime = this.getReturnTime()
      this.data.timeLeft = this.getMinutesLeft()
   },

   methods: {
      //get Current time, calcule new time by adding getMinutesLeft(), return `${hours}h${minutes}`
      getReturnTime() {
         const Time = new Date()
         Time.setMinutes(Time.getMinutes() + this.getMinutesLeft())
         //format time to `hh:mm`
         return Time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },

      // procress maxflighttime and chargePct to get the time left
      getMinutesLeft() {
         return Math.round(ruleOfThree(100, this.data.maxFlightTimeMinutes, this.data.chargePct))
      },

      // from a number between 0 and 100, return color between green, orange and red
      interpolateColor(value: number) {
         return value <= 0 ? 'grey' : value < 33 ? 'red' : value < 66 ? 'orange' : 'green'
      },

      // chargePct is under 10% or isRenting can't rent
      canBeRented() {
         if (this.data.chargePct < config.minCharge && !this.isRenting) {
            return false
         }
         return true
      },
      // Set variables and get Return Time
      startRenting() {
         this.isRenting = !this.isRenting
         this.data.returnTime = this.getReturnTime()
      },
      // function that discharge the drone 1% every second
      discharge() {
         // check if drone can be rented
         if (this.canBeRented()) {
            // set renting interval
            var interval = setInterval(() => {
               // get charge % left - set  0 as mini value
               this.data.chargePct = Math.max(0, this.data.chargePct - config.dischargeRate)
               // update time left
               this.data.timeLeft = this.getMinutesLeft()

               // if drone out of service or not renting, stop discharge
               if (this.data.chargePct <= 0 || this.isRenting === false) {
                  if (this.data.chargePct <= config.minCharge) (this.isRentable = false), (this.isRenting = false)

                  clearInterval(interval)
               }
            }, config.timeRate * 1000)
         }
      },
   },
   computed: {
      // status color change denpending chargpPct && renting state
      statusClass() {
         if (this.isRentable == false) {
            return ''
         }

         if (this.isRenting) {
            if (this.data.chargePct <= 33) return 'negative'
            else return 'intermediary'
         } else return 'positive'
      },
      // Same for button
      rentingClass() {
         if (!this.isRentable) {
            return 'grey'
         }
         if (this.isRenting) return 'orange'
         else return 'green'
      },
   },
   watch: {
      // watch renting variable changes --> discharge if isRenting
      isRenting(value) {
         if (value) {
            this.discharge()
         }
      },
   },
})
</script>

<style lang="scss" scoped>
td {
   background-color: $secondary;
   padding: 15px 0px;
   padding-left: 20px;
}

tr {
   margin-bottom: 10px;
   flex-shrink: 0;
}

td:first-child,
th:first-child {
   border-radius: 10px 0 0 10px;
}

// Set border-radius on the top-right and bottom-right of the last table data on the table row
td:last-child,
th:last-child {
   border-radius: 0 10px 10px 0;
}

.snd {
   color: rgb(155, 155, 155);
}
</style>
