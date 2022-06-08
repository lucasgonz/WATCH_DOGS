<template>
  <div class="container">
    <card></card>
  </div>
</template>

<script>
import card from '../components/card.vue'
export default {
  components: { card },
  name: 'IndexPage',
  data() {
    return {
      drones: [
        {
          manufacturer: 'Parrot',
          model: 'Anafi',
          maxFlightTimeMinutes: 25,
          chargePct: 0,
        },
        {
          manufacturer: 'Yuneec',
          model: 'Breeze',
          maxFlightTimeMinutes: 22,
          chargePct: 100,
        },
        {
          manufacturer: 'Cheerson',
          model: 'CX-STARS',
          maxFlightTimeMinutes: 34,
          chargePct: 98,
        },
        {
          manufacturer: 'Cheerson',
          model: 'CX-32W',
          maxFlightTimeMinutes: 7,
          chargePct: 72,
        },
        {
          manufacturer: 'Cheerson',
          model: 'CX-20',
          maxFlightTimeMinutes: 15,
          chargePct: 2,
        },
      ],
    }
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
