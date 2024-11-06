export const state = () => ({
  options: [],
})

export const mutations = {
  setOptions(state, options) {
    state.options = options;
  },

}


export const actions = {

  async all({commit}) {
    try {
      return await this.$axios.$get(`https://back.abu.edu.kz/site/categories`);
    } catch (e) {
      throw e
    }
  },
  async getCategoryInfoByID({commit},categoryID) {
    try {
      return await this.$axios.$get(`https://back.abu.edu.kz/site/categories/`+categoryID);
    } catch (e) {
         commit('setError', e, {root: true})
      throw e
    }
  },
  async save({commit}, formData) {
    try {

      return await this.$axios.$post('https://back.abu.edu.kz/site/categories', formData)
    } catch (e) {
      //    commit('setError', e, {root: true})
      throw e
    }
  },
  async delete({commit}, id) {
    try {

      return await this.$axios.$delete('https://back.abu.edu.kz/site/categories', id);
    } catch (e) {
      //    commit('setError', e, {root: true})
      throw e
    }
  },

}

export const getters = {
  options: state => state.options
}