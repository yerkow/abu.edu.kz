export const state = () => ({
  error: null
})

export const actions = {
   async nuxtServerInit({dispatch}) {
     await  dispatch('site/fetchAllOptions')
    await  dispatch('site/getMenuItems')
     await  dispatch('auth/autoLogin')
  }
}

export const mutations = {
  setError(state, error) {
    state.error = error
  },
  clearError(state) {
    state.error = null
  }
}

export const getters = {
  error: state => state.error
}


export const strict = false
