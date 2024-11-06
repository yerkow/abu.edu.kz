import Vue from 'vue'
import VueMask from 'v-mask'
import VueMarkdown from 'vue-markdown'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/kz'
import DateFilter from '@/common/date.filter'

Vue.use(Element, { locale })

Vue.component('vue-markdown', VueMarkdown)

Vue.filter('date', DateFilter)
Vue.use(VueMask);
