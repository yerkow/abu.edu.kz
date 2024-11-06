export default function ({ $axios, redirect, store }) {

  $axios.interceptors.request.use(request => {
    if (store.getters['auth/isAuthenticated'] && !request.headers.common['Authorization']) {
      const token = store.getters['auth/token']
      request.headers.common['Authorization'] = `Bearer ${token}`
    }

    return request
  })

  $axios.onRequest(config => {
    const baseUrl = $axios.defaults.baseURL;

    const locale = store.getters['lang/locale'];

    if (locale) {
      config.headers.common['Accept-Language'] = locale;
    }
  });

  $axios.onError(error => {
    if (error.response) {
      if (error.response.status === 401) {
        redirect('/cabinet/login?message=session')
        store.dispatch('auth/logout')
      }



      if (error.response.status === 500) {
        store.dispatch('auth/logout')
      }
    }
  })
}
