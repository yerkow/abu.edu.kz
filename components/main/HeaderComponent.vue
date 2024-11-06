<template>
  <header class="header">
    <div class="header__wrap">
      <a class="header-logo" href="/">
        <img src="/tpl/images/logo-header-white.png" srcset="/tpl/images/logo-header-white-2x.png 2x" alt="">
      </a>
      <div class="header-lang">
        <div class="header-lang__current">{{currentLang.name}}</div>
        <ul class="header-lang__list">
          <li v-for="locale in availableLocales" :key="locale.code">
            <a   :href="switchLocalePath(locale.code)">{{ locale.name }}</a>
          </li>
        </ul>


      </div>
      <div class="header-search-form">
        <form :action="localePath('/search/')">
          <svg class="header-search-form__icon loupe">
            <use xlink:href="/tpl/images/svg-symbols.svg#loupe"></use>
          </svg>
          <input class="header-search-form__field" type="search" name="value" :placeholder="$t('searchPlaceHolder')" :value="$route.query.value">
          <button class="header-search-form__btn" type="submit">
            <svg class="arrow-right">
              <use xlink:href="/tpl/images/svg-symbols.svg#arrow-right"></use>
            </svg>
          </button>
        </form>
      </div>
      <a class="header-docs white-btn" href="">{{$t('submitDocuments')}}</a>
      <div class="header-search-btn js-header-search">
        <svg class="loupe">
          <use xlink:href="/tpl/images/svg-symbols.svg#loupe"></use>
        </svg>
      </div>
<!--      <a class="header-personal" href="">-->
<!--        <svg class="personal">-->
<!--          <use xlink:href="/tpl/images/svg-symbols.svg#personal"></use>-->
<!--        </svg>-->
<!--      </a>-->
      <div class="header-settings">
        <div class="header-settings__btn">
          <svg class="settings">
            <use xlink:href="/tpl/images/svg-symbols.svg#settings"></use>
          </svg>
        </div>
        <ul class="header-settings__list">
          <li>
            <a href="http://platonus.semuniver.kz:8080/" target="_blank">АИС "Platonus"</a>
          </li>
          <li>
            <a href="https://ais.semuniver.kz/login.php" target="_blank">АИС "Университет"</a>
          </li>
          <li>
            <a href="http://edu.semuniver.kz/" target="_blank">ДОТ Портал</a>
          </li>

          <li>
            <a href="http://library.semuniver.kz/" target="_blank">{{$t('eLib')}}</a>
          </li>
          <li>
            <a href="http://vestnik.semuniver.kz/" target="_blank">{{$t('vestnik')}}</a>
          </li>
          <li>
            <a href="https://data-science.semuniver.kz/" target="_blank">Data Science</a>
          </li>
          <li>
            <a href="https://legalitas.semuniver.kz" target="_blank">Legalitas</a>
          </li>
          <li>
            <a href="https://oyshyl.semuniver.kz/" target="_blank">Oyshyl</a>
          </li>
        </ul>
      </div>
      <div class="header-vision js-bvi-open">
        <svg class="glasses">
          <use xlink:href="/tpl/images/svg-symbols.svg#glasses"></use>
        </svg>
      </div>
      <div class="header-toggle js-header-menu"></div>
    </div>
    <div class="header__tablet">
      <a class="header-logo" href="/">
        <img src="/tpl/images/logo-header-brown.png" srcset="/tpl/images/logo-header-brown-2x.png 2x" alt="">
      </a>
      <div class="header-toggle js-navigation"></div>
    </div>
    <div class="header-search">
        <form :action="localePath('/search/')" class="header-search__form">
        <input class="header-search__field" type="search" name="value" :placeholder="$t('searchPlaceHolder')">
        <button class="header-search__btn" type="submit">
          <svg class="arrow-right">
            <use xlink:href="/tpl/images/svg-symbols.svg#arrow-right"></use>
          </svg>
        </button>
      </form>
      <svg class="header-search__close close js-header-search">
        <use xlink:href="/tpl/images/svg-symbols.svg#close"></use>
      </svg>
    </div>
    <div class="header-menu-wrap">
      <div class="header-menu js-y-scroll">
        <div class="header-menu__close js-navigation"></div>
        <div class="header-menu__top">
          <div class="header-menu__search js-header-menu-search">
            <svg class="loupe">
              <use xlink:href="/tpl/images/svg-symbols.svg#loupe"></use>
            </svg>
          </div>
          <a class="header-menu__phone" :href="`tel:${siteOptions.phone}`">
            <svg class="phone">
              <use xlink:href="/tpl/images/svg-symbols.svg#phone"></use>
            </svg>
          </a>
<!--          <a class="header-menu__personal" href="tel:">-->
<!--            <svg class="personal">-->
<!--              <use xlink:href="/tpl/images/svg-symbols.svg#personal"></use>-->
<!--            </svg>-->
<!--          </a>-->
          <a class="header-menu__settings" href="/161-servisy" >
            <svg class="settings">
              <use xlink:href="/tpl/images/svg-symbols.svg#settings"></use>
            </svg>
          </a>
        </div>

        <div class="header-menu-search">
            <form :action="localePath('/search/')" >
            <input class="header-menu-search__field" type="search" name="value" :placeholder="$t('searchPlaceHolder')">
            <button class="header-menu-search__btn" type="submit">
              <svg class="arrow-right">
                <use xlink:href="/tpl/images/svg-symbols.svg#arrow-right"></use>
              </svg>
            </button>
          </form>
        </div>
        <NavMenuComponent/>
        <div class="header-menu__docs text-center">
          <a class="burgundy-btn" href="">{{$t('submitDocuments')}}</a>
        </div>
        <a class="header-menu__call" href="">
          <svg class="call">
            <use xlink:href="/tpl/images/svg-symbols.svg#call"></use>
          </svg>
          {{siteOptions.phone}}
        </a>

      </div>
    </div>

  </header>
</template>

<script>
    import NavMenuComponent from "./NavMenuComponent";
    export default {
        name: "HeaderComponent",
      components: {NavMenuComponent},

      computed: {

        availableLocales () {
          return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
        },
        currentLang(){
          return  this.$i18n.locales.filter(i => i.code == this.$i18n.locale)[0]
        },
        siteOptions(){
          return this.$store.getters['site/options'];
        }
      }

    }
</script>

<style scoped>

</style>
