<template>
  <div class="card">
    <div class="group">
      <!-- Status to component true | false | undefined (drone out of service) -->
      <status :status="rentingClass"></status>
      <div class="info-text">
        <b>{{ data.manufacturer }}</b>
        <p class="snd">{{ data.model }}</p>
      </div>
    </div>
    <!-- Chargin bar of drone -->
    <div class="info-text">
      <p>Usage</p>
      <v-progress-linear
        rounded
        :value="data.chargePct"
        :color="interpolateColor(data.chargePct)"
      ></v-progress-linear>
    </div>
    <!-- Return time or time left for drone -->
    <div v-if="isRenting">
      <p>Return Time</p>
      <p class="snd">{{ returnTime }}</p>
    </div>
    <div v-else>
      <p>Can Fly</p>
      <p class="snd">{{ getMinutesLeft() }} min</p>
    </div>
    <div>
      <!-- Switch renting state and change icon -->
      <v-btn
        icon
        fab
        small
        :disabled="canBeRented() ? false : true"
        :color="rentingClass"
        @click="canBeRented() ? startRenting() : undefined"
      >
        <v-icon>{{ isRenting ? 'mdi-stop' : 'mdi-play' }}</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ruleOfThree } from '../utils/utils'

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
      returnTime: '',
    }
  },
  mounted() {
    this.isRentable = this.canBeRented()
  },
  methods: {
    //get Current time, calcule new time by adding getMinutesLeft(), return `${hours}h${minutes}`
    getReturnTime() {
      const Time = new Date()
      Time.setMinutes(Time.getMinutes() + this.getMinutesLeft())
      return `${Time.getHours()}h${Time.getMinutes()}`
    },

    // procress maxflighttime and chargePct to get the time left
    getMinutesLeft() {
      return Math.round(
        ruleOfThree(100, this.data.maxFlightTimeMinutes, this.data.chargePct)
      )
    },
    // from a number between 0 and 100, return color between green, orange and red
    interpolateColor(value: number) {
      if (value < 33) {
        return 'red'
      } else if (value < 66) {
        return 'orange'
      } else {
        return 'green'
      }
    },
    // chargePct is under 10% can't rent anymore
    canBeRented() {
      if (this.data.chargePct < 10 && !this.isRenting) {
        return false
      }
      return true
    },
    startRenting() {
      this.isRenting = !this.isRenting
      this.returnTime = this.getReturnTime()
    },
    // function that discharge the drone 1% every second
    discharge() {
      // check if drone can be rented
      if (this.canBeRented()) {
        // set renting interval
        var interval = setInterval(() => {
          // if drone out of service or not renting, stop discharge
          if (this.data.chargePct === 0 || this.isRenting === false) {
            clearInterval(interval)
          }
          this.data.chargePct--
        }, 1000)
      }
    },
  },
  computed: {
    rentingClass() {
      if (this.isRentable == false) {
        return 'grey'
      }
      if (this.isRenting == true) {
        return 'error'
      }
      if (this.isRenting == false) {
        return 'success'
      }
    },
  },
  watch: {
    isRenting(value) {
      if (value) {
        this.discharge()
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.card {
  background-color: $secondary;
  border-radius: 5px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.card div {
  display: flex;
  flex-direction: column;
  align-items: baseline;
}

.card div * {
  margin: 7px 12px;
}

.group {
  flex-direction: row !important;
}

.info-text {
  width: 120px;
}

.snd {
  color: rgb(155, 155, 155);
}

.notUsable {
  background-color: #939393;
}
</style>
