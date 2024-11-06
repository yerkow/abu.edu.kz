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
      return await this.$axios.$get(`https://back.abu.edu.kz/site/pages`);
    } catch (e) {
      throw e
    }
  },
  async getSectionsSortingData({commit}, parentID) {
    try {
      return await this.$axios.$get(`https://back.abu.edu.kz/site/sections-sort-data/` + parentID);
    } catch (e) {
      throw e
    }
  },
  async getSectionInfoByID({commit}, formData) {
    try {
      return await this.$axios.$get(`https://back.abu.edu.kz/site/pages/` + formData.pageID + '/sections/' + formData.sectionID);
    } catch (e) {
      //  commit('setError', e, {root: true})
      throw e
    }
  },
  async getSectionFilesByID({commit}, formData) {
    try {
      return await this.$axios.$get(`https://back.abu.edu.kz/site/pages/` + formData.pageID + '/sections/' + formData.sectionID + '/files');
    } catch (e) {
      // commit('setError', e, {root: true})
      throw e
    }
  },
  async getSectionPersonsByID({commit}, formData) {
    try {
      return await this.$axios.$get(`https://back.abu.edu.kz/site/pages/` + formData.pageID + '/sections/' + formData.sectionID + '/persons');
    } catch (e) {
      // commit('setError', e, {root: true})
      throw e
    }
  },
  async getPagesForCurrentCategoryByPageID({commit}, pageID) {
    try {
      return await this.$axios.$get(`https://back.abu.edu.kz/site/pages-for-current-category/` + pageID);
    } catch (e) {
      throw e
    }
  },
  async getPagesForCategoryByID({commit}, pageID) {
    try {
      return await this.$axios.$get(`https://back.abu.edu.kz/site/pages-for-category/` + pageID);
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async getContentByPageID({commit}, pageID) {
    try {
      return await this.$axios.$get(`https://back.abu.edu.kz/page-content/` + pageID);
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async updateOrdering({commit}, sortData) {
    try {
      return await this.$axios.$post(`https://back.abu.edu.kz/site/sections-sort-data/`, sortData);
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },


  async getPagesByParent({commit}, parentID) {
    try {
      return await this.$axios.$get(`https://back.abu.edu.kz/site/pages?parentID=` + parentID);
    } catch (e) {
      throw e
    }
  },
  async getPageStatuses({commit}, level) {
    try {
      return await this.$axios.$get(`https://back.abu.edu.kz/site/page-statuses`);
    } catch (e) {
      throw e
    }
  },
  async create({commit}, formData) {
    try {
      const fd = new FormData()
      fd.append('section_name', formData.sectionName)
      fd.append('section_type', formData.sectionType)
      fd.append('isAccordion', formData.isAccordion)
      fd.append('accordionRU', formData.accordionRU)
      fd.append('accordionKZ', formData.accordionKZ)
      fd.append('accordionEN', formData.accordionEN)


      return await this.$axios.$post('https://back.abu.edu.kz/site/pages/' + formData.pageID + '/sections', formData)
    } catch (e) {
      throw e
    }
  },
  async update({commit}, formData) {
    try {
      const fd = new FormData()
      fd.append('section_name', formData.sectionName)
      fd.append('section_type', formData.sectionType)
      fd.append('contentRU', formData.contentRU)
      fd.append('contentKZ', formData.contentKZ)
      fd.append('contentEN', formData.contentEN)
      fd.append('isAccordion', formData.isAccordion)
      fd.append('accordionRU', formData.accordionRU)
      fd.append('accordionKZ', formData.accordionKZ)
      fd.append('accordionEN', formData.accordionEN)
      return await this.$axios.$post(`https://back.abu.edu.kz/site/pages/` + formData.pageID + '/sections/' + formData.sectionID, fd)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async uploadFiles({commit}, formData) {
    try {
      const fd = new FormData()

      fd.append('titleRU', formData.titleRU)
      fd.append('titleKZ', formData.titleKZ)
      fd.append('titleEN', formData.titleEN)
      fd.append('fileRU', formData.fileRU, formData.fileRU.name)

      if(formData.cover!=null){
        fd.append('cover', formData.cover, formData.cover.name)
      }
      if(formData.fileKZ!=null){
        fd.append('fileKZ', formData.fileKZ, formData.fileKZ.name)
      }
      if(formData.fileEN!=null){
        fd.append('fileEN', formData.fileEN, formData.fileEN.name)
      }


      return await this.$axios.$post('https://back.abu.edu.kz/site/pages/' + formData.pageID + '/sections/' + formData.sectionID + '/files', fd)
    } catch (e) {
      //    commit('setError', e, {root: true})
      throw e
    }
  },
  async uploadPhotos({commit}, formData) {
    try {
      const fd = new FormData()


      fd.append('photos', formData.photos, formData.photos.name)

      return await this.$axios.$post('https://back.abu.edu.kz/site/pages/' + formData.pageID + '/sections/' + formData.sectionID + '/photos', fd)
    } catch (e) {
      //    commit('setError', e, {root: true})
      throw e
    }
  },
  async uploadPerson({commit}, formData) {
    try {
      const fd = new FormData()
      for (let prop in formData.controls) {
        fd.append(prop, formData.controls[prop])
      }
      return await this.$axios.$post('https://back.abu.edu.kz/site/pages/' + formData.pageID + '/sections/' + formData.sectionID + '/persons', fd)
    } catch (e) {
      //    commit('setError', e, {root: true})
      throw e
    }
  },
  async deletePerson({commit}, formData) {
    try {


      return await this.$axios.$delete('https://back.abu.edu.kz/site/pages/' + formData.pageID + '/sections/' + formData.sectionID + '/persons', formData)
    } catch (e) {
      //    commit('setError', e, {root: true})
      throw e
    }
  },
  async deleteFiles({commit}, formData) {
    try {

      return await this.$axios.$delete('https://back.abu.edu.kz/site/pages/' + formData.pageID + '/sections/' + formData.sectionID + '/files/' + formData.fileID)
    } catch (e) {
      //    commit('setError', e, {root: true})
      throw e
    }
  },

}

export const getters = {
  options: state => state.options
}
