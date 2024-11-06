

export const state = () => ({
  options: [],
})

export const mutations = {
  setOptions(state, options) {
    state.options = options;
  },

}


export const actions = {

  async getAllPages({commit}) {
    try {
      return  await this.$axios.$get(`https://back.abu.edu.kz/site/pages`);
    } catch (e) {
      throw e
    }
  },
  async getPagesSortingData({commit},parentID) {
    try {
      return  await this.$axios.$get(`https://back.abu.edu.kz/site/pages-sort-data/`+parentID);
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async getPageInfoByID({commit},pageID) {
    try {
      return  await this.$axios.$get(`https://back.abu.edu.kz/site/pages/`+pageID);
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async getPersonInfoByID({commit},personID) {
    try {
      return  await this.$axios.$get(`https://back.abu.edu.kz/site/person/`+personID);
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async getPagesForCurrentCategoryByPageID({commit},pageID) {
    try {
      return  await this.$axios.$get(`https://back.abu.edu.kz/site/pages-for-current-category/`+pageID);
    } catch (e) {
      throw e
    }
  },
  async getChildPagesCurrentPageByID({commit},pageID) {
    try {
      return  await this.$axios.$get(`https://back.abu.edu.kz/site/pages-for-category/`+pageID);
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async getParentsByPageID({commit},pageID) {
    try {
      return  await this.$axios.$get(`https://back.abu.edu.kz/page/breadcrumbs/`+pageID);
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async getContentByPageID({commit},pageID) {
    try {
      return  await this.$axios.$get(`https://back.abu.edu.kz/site/pages/`+pageID+'/sections');
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async updateOrdering({commit}, sortData) {
    try {
      return  await this.$axios.$post(`https://back.abu.edu.kz/site/pages-sort-data/`,sortData);
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },



  async getPagesByParent({commit},parentID) {
    try {
      return  await this.$axios.$get(`https://back.abu.edu.kz/site/pages?parentID=`+parentID);
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async getPageStatuses({commit},level) {
    try {
      return  await this.$axios.$get(`https://back.abu.edu.kz/site/page-statuses`);

    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async save({commit}, formData) {
    try {

      return await this.$axios.$post('https://back.abu.edu.kz/site/pages/',formData)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

}

export const getters = {
  options: state => state.options
}
