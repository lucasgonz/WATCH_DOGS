<template>
  <div class="card">
    <div class="group">
      <!-- status to component true | false | undefined (drone out of service) -->
      <status :status="isRenting"></status>
      <div>
        <b>Name</b>
        <p>model</p>
      </div>
    </div>

    <div>
      <p>Chargement</p>
      <v-progress-linear rounded value="80" color="green"></v-progress-linear>
    </div>
    <div>
      <p>Temps</p>
      <p>End time</p>
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
</style>
