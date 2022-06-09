// vuex component for drones

export const state = () => ({
  data: [],
  count: 2,
})

export const getters = {
  getDrones(state) {
    return state.data
  },
}

export const mutations = {
  updateData(state, values) {
    state.data = values
  },
}

export const actions = {
  //get drones from server
  fetchDrones: async function ({ commit }) {
    const response = await this.$axios.get('/api/drones')
    commit('updateData', response.data)
  },

  // sort drones by property
  sortDronesByPropretie: function ({ commit, state }, propretie, desc = true) {
    // make a copy of the data to be autorized of manipulation
    var data = [...state.data]

    //sort the data
    data.sort(function (a, b) {
      if (a[propretie] < b[propretie]) return -1

      if (a[propretie] > b[propretie]) return 1
    })

    // if desc is true reverse the data
    if (desc) data.reverse()

    commit('updateData', data)
  },
}
