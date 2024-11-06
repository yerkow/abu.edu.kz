import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: null,
  userProfileInfo: [],
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },

  setProfileInfo(state, profileInfo) {
    state.userProfileInfo = profileInfo
  },


  clearToken(state) {
    state.token = null
  }
}

export const actions = {
  async login({commit, dispatch}, formData) {
    try {
      const data = await this.$axios.$post('https://back.abu.edu.kz/auth/login', formData);
      if (data.status == 'ok') {
        dispatch('setToken', data.token)

      }
      return data

    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },


  async createUser({commit, dispatch}, formData) {
    try {
      const data = await this.$axios.$post('https://back.abu.edu.kz/auth/create-user', formData);
      if (data.status == 'ok') {
        dispatch('setToken', data.token)
      }
      return data

    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async passwordRecovery({commit, dispatch}, formData) {
    try {
      const {token} = await this.$axios.$post('https://back.abu.edu.kz/auth/password-recovery', formData);
      dispatch('setToken', token)

      return data

    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async verifyEmail({commit, dispatch}, token) {
    try {
      return await this.$axios.$post('https://back.abu.edu.kz/auth/verify-email', token);
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async checkProfileIsComplete({commit, dispatch}, formData) {
    try {

      return await this.$axios.$post('https://back.abu.edu.kz/user/check-profile-info', formData);
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async updateUserInfo({commit, dispatch}, formData) {
    try {

      return await this.$axios.$post('https://back.abu.edu.kz/user/update-user-info', formData);


    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async getProfileInfo({commit, dispatch}, formData) {
    try {

      const profileInfo = await this.$axios.$post('https://back.abu.edu.kz/user/profile-info', formData);
      commit('setProfileInfo', profileInfo);
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  setToken({commit}, token) {
    this.$axios.setToken(token, 'Bearer')
    commit('setToken', token)
    Cookies.set('jwt-token', token)
  },
  logout({commit}) {
    this.$axios.setToken(false)
    commit('clearToken')
    Cookies.remove('jwt-token')
  },
  autoLogin({dispatch}) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie

    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies['jwt-token']

    if (isJWTValid(token)) {
      dispatch('setToken', token)
    } else {
      dispatch('logout')
    }
  }
}

export const getters = {
  isAuthenticated: state => Boolean(state.token),
  token: state => state.token,
  userProfileInfo: state => state.userProfileInfo,
}


function isJWTValid(token) {
  if (!token) {
    return false
  }

  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0

  return (new Date().getTime() / 1000) < expires
}
