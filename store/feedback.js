export const state = () => ({})

export const mutations = {}

export const actions = {

  async rectorAsk({commit}, formData) {
    try {
      await this.$axios.$post('https://back.abu.edu.kz/rector/ask', formData)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },


}

export const getters = {}



