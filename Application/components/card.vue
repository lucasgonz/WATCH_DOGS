<template>
  <div class="card">
    <div class="group">
      <!-- Status to component true | false | undefined (drone out of service) -->
      <status :status="isRenting"></status>
      <div class="info-text">
        <b>{{ data.manufacturer }}</b>
        <p class="snd">{{ data.model }}</p>
      </div>
    </div>
    <!-- Chargin bar of drone -->
    <div>
      <p>Usage</p>
      <v-progress-linear
        rounded
        :value="data.chargePct"
        :color="interpolateColor(data.chargePct)"
      ></v-progress-linear>
    </div>
    <!-- Return time or time left for drone -->
    <div>
      <p>Temps</p>
      <p class="snd">End time</p>
    </div>
    <div>
      <!-- Switch renting state and change icon -->
      <v-btn
        icon
        fab
        small
        :color="isRenting ? 'error' : 'success'"
        @click="isRenting = !isRenting"
      >
        <v-icon>{{ isRenting ? 'mdi-stop' : 'mdi-play' }}</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
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
    }
  },
  methods: {
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
    // if
  },
  computed: {},
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
  width: 100px;
}

.snd {
  color: rgb(155, 155, 155);
}
</style>
