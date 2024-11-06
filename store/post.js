const posts = [
  {title: 'Post 1', date: new Date(), views: 22, comments: [1, 2], _id: 'id1'},
  {title: 'Post 2', date: new Date(), views: 22, comments: [1, 2], _id: 'id2'}
]

export const state = () => ({
  allPosts: [],
})

export const mutations = {
  setAllPosts(state, allPosts) {
    state.allPostsForQuests = allPosts;
  },

}


export const actions = {
  async fetchAdmin({}) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(posts)
      }, 1000)
    })
  },
  async remove({}, id) {

  },

  async mainList({commit}) {
    try {
      return await this.$axios.$get(`https://back.abu.edu.kz/site/posts-main`);
    } catch (e) {
      throw e
    }
  },
  async getPostsByParams({commit}, formData) {
    try {

      if (formData.categoryID) {
        return await this.$axios.$get(`https://back.abu.edu.kz/site/posts/?page=` + formData.page + '&category=' + formData.categoryID,);
      }
      return await this.$axios.$get(`https://back.abu.edu.kz/site/posts/?page=` + formData.page);
    } catch (e) {
      throw e
    }
  },
  async getPostsByParams2({commit}, formData) {
    try {
      return await this.$axios.$get(`https://back.abu.edu.kz/site/posts2/?page=` + formData.page + '&lang=RU');

    } catch (e) {
      throw e
    }
  },
  async getPostInfoBySlug({commit}, slug) {
    try {
      return await this.$axios.$get(`https://back.abu.edu.kz/site/posts/` + slug);
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async save({commit}, formData) {
    try {
      const fd = new FormData()
      for (let prop in formData.controls) {
        fd.append(prop, formData.controls[prop])
      }
      return await this.$axios.$post('https://back.abu.edu.kz/site/posts', fd)
    } catch (e) {
      //    commit('setError', e, {root: true})
      throw e
    }
  },
  async uploadImage({commit}, formData) {
    try {
      const fd = new FormData()
      for (let prop in formData.controls) {
        fd.append(prop, formData.controls[prop])
      }

      return await this.$axios.$post('https://back.abu.edu.kz/site/posts', fd)
    } catch (e) {
      //    commit('setError', e, {root: true})
      throw e
    }
  },
  async fetchAdminById({}, id) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(posts.find(p => p._id === id))
      }, 1000)
    })
  },
  async fetchAllPostsForQuests({commit}) {
    try {
      const allPostsForQuests = await this.$axios.$get(`https://api.miras-edu.kz/posts/get-all-posts`);
      commit('setAllPostsForQuests', allPostsForQuests);
    } catch (e) {
      throw e
    }
  },

}

export const getters = {
  allPosts: state => state.allPosts
}
