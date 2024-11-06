export const state = () => ({
  options: [],
  menuItems: [],
  menuHtml: [],
})

export const mutations = {
  setOptions(state, options) {
    state.options = options;
  },
  setMenuItems(state, items) {
    state.menuItems = items;
  },
  setHtmlMenuItems(state, items) {
    state.menuHtml = items;
  },
}


export const actions = {
  async updateOrdering({commit}, sortData) {
    try {
      return await this.$axios.$post(`https://back.abu.edu.kz/site/sort-data/`, sortData);
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async getControls({commit}, model) {
    try {
      const formData = {
        model: model,
      }
      return await this.$axios.$post('https://back.abu.edu.kz/site/controls', formData)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async imageCrop({commit}, formData) {
    try {

      return await this.$axios.$post('https://back.abu.edu.kz/site/image-crop', formData)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async resetImageCrop({commit}, formData) {
    try {

      return await this.$axios.$post('https://back.abu.edu.kz/site/reset-image-crop', formData)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async updateSettings({commit}, formData) {
    try {


      return await this.$axios.$post('https://back.abu.edu.kz/site/options', formData)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async getAllOptions({commit}) {
    try {
      return await this.$axios.$get(`https://back.abu.edu.kz/site/options`);
    } catch (e) {
      throw e
    }
  },
  async fetchAllOptions({commit}) {
    try {
      const options = await this.$axios.$get(`https://back.abu.edu.kz/site/options`);
      commit('setOptions', options);
    } catch (e) {
      throw e
    }
  },
  async getAllLayouts({commit}) {
    try {
      return await this.$axios.$get(`https://back.abu.edu.kz/site/layouts`);
    } catch (e) {
      throw e
    }
  },
  async getAllLContentTypes({commit}) {
    try {
      return await this.$axios.$get(`https://back.abu.edu.kz/site/content-types`);
    } catch (e) {
      throw e
    }
  },
  async fetchMenuItems({commit}) {
    try {
      const menuItems = await this.$axios.$get(`https://back.abu.edu.kz/site/menu-json`);
      commit('setMenuItems', menuItems);
    } catch (e) {
      throw e
    }
  },
  async getMenuItems({commit}) {
    try {
      // const htmlMenuItems = await this.$axios.$get(`https://back.abu.edu.kz/site/menu-html`);
      const menuItems = await this.$axios.$get(`https://back.abu.edu.kz/site/menu-json`);
      commit('setMenuItems', menuItems);
    } catch (e) {
      throw e
    }
  },

}

export const getters = {
  options: state => state.options,
  menuItems: state => state.menuItems,
  menuHtml: state => state.menuHtml
}
