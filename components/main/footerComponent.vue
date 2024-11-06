<template>
  <footer class="footer">
    <div class="footer__wrap">
      <div class="footer__item">
        <div class="footer__title">{{$t('Contacts')}}</div>
        <ul class="footer-address">
          <li v-html="siteOptions['address'+$t('currentLangUpper')]"></li>
          <li>Тел.: {{siteOptions.phone}}, Факс: {{siteOptions.fax}}</li>
          <li><a :href="'mailto:'+siteOptions.email">{{siteOptions.email}}</a></li>
        </ul>
      </div>
      <div class="footer__item">
        <div class="footer__title">{{$t('headerSocialNetworks')}}</div>
        <ul class="footer-social">
          <li>
            <a :href="siteOptions.facebook" target="_blank" rel="nofollow">
              <svg class="fb">
                <use xlink:href="/tpl/images/svg-symbols.svg#fb"></use>
              </svg>
            </a>
          </li>
          <li>
            <a :href="siteOptions.instagram" target="_blank" rel="nofollow">
              <svg class="in">
                <use xlink:href="/tpl/images/svg-symbols.svg#in"></use>
              </svg>
            </a>
          </li>
          <li>
            <a :href="siteOptions.youtube" target="_blank" rel="nofollow">
              <svg class="yt">
                <use xlink:href="/tpl/images/svg-symbols.svg#yt"></use>
              </svg>
            </a>
          </li>
          <li>
            <a :href="siteOptions.vk" target="_blank" rel="nofollow">
              <svg class="vk">
                <use xlink:href="/tpl/images/svg-symbols.svg#vk"></use>
              </svg>
            </a>
          </li>
        </ul>
        <div class="footer-apply">
          <nuxt-link class="white-btn" :to="localePath('/electronic-appeals')">{{$t('electronicAppeal')}}</nuxt-link>
          <div class="footer-apply__info">{{$t('publicReceptionSlogan')}}</div>
        </div>
      </div>
      <div class="footer__item footer__item_last">
        <div class="mb2"></div>
        <!-- Yandex.Metrika informer -->
        <a href="https://metrika.yandex.kz/stat/?id=87457058&amp;from=informer"
           target="_blank" rel="nofollow"><img src="https://metrika-informer.com/informer/87457058/3_1_FFFFFFFF_EFEFEFFF_0_pageviews"
                                               style="width:88px; height:31px; border:0;" alt="Яндекс.Метрика" title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)" class="ym-advanced-informer" data-cid="87457058" data-lang="ru" /></a>
        <!-- /Yandex.Metrika informer -->


        <div class="footer-map" v-html="siteOptions.map">

        </div>
      </div>
    </div>
  </footer>
</template>

<script>
    export default {
        name: "footerComponent",
   computed:{
          siteOptions(){
            return this.$store.getters['site/options'];
     }
   }

    }
</script>

<style scoped>

</style>
