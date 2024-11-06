export const state = () => ({
counter:{
  newRequest:0,
  claim:0,
  corruptionReport:0,
}
})

export const mutations = {
  UPDATE_COUNTER(state, payload) {
    state.counter = payload;
  },

}


export const actions = {

  async getListByType({commit},payload) {
    try {
      return await this.$axios.$post(`https://back.abu.edu.kz/electronic-appeals/${payload.type}?status=${payload.status}`);
    } catch (e) {
      throw e
    }
  },

  async getInfoById({commit},payload) {
    try {
      return await this.$axios.$get(`https://back.abu.edu.kz/electronic-appeals/${payload.id}`);
    } catch (e) {
      throw e
    }
  },
  async getCountMessages({commit}) {
    try {
      const data =  await this.$axios.$get(`https://back.abu.edu.kz/electronic-appeals/counter`);
      commit('UPDATE_COUNTER',data)
    } catch (e) {
      throw e
    }
  },

  async registerAsk({commit}, formData) {
    try {
      await this.$axios.$post('https://back.abu.edu.kz/electronic-appeals', formData)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },



}

export const getters = {
  counter: state => state.counter
}
