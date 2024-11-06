<template>
  <div class="">
    <div class="news__title title-1 wow fadeInDown" data-wow-duration="500ms">
      {{ $t('electronic_appeal.appeal') }}
    </div>
    <el-row justify="center" :gutter="24" shadow="always">
      <el-col :xs="24" :md="8">
        <el-card class="box-card mb">
          <h5><strong>{{ $t('electronic_appeal.appeal') }}</strong></h5>
          <p style="min-height: 100px;text-align: left;">
            {{ $t('electronic_appeal.appeal_description') }}
          </p>
          <div class="bottom clearfix">
            <a class="arrow-btn arrow-btn_burgundy" :href="localePath('/electronic-appeals/new-request')">
              {{ $t('send') }}
              <svg class="arrow-button">
                <use xlink:href="/tpl/images/svg-symbols.svg#arrow-button"></use>
              </svg>
            </a>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-card class="box-card mb">
          <h5><strong>
            {{ $t('electronic_appeal.claim') }}
          </strong></h5>
          <p style="min-height: 100px;text-align: left;">
            {{ $t('electronic_appeal.claim_description') }}
          </p>
          <div class="bottom clearfix">
            <a class="arrow-btn arrow-btn_burgundy" :href="localePath('/electronic-appeals/claim')">
              {{ $t('send') }}
              <svg class="arrow-button">
                <use xlink:href="/tpl/images/svg-symbols.svg#arrow-button"></use>
              </svg>
            </a>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-card class="box-card mb">
          <h5>
            <strong>
            {{ $t('electronic_appeal.corruption_report') }}
          </strong>
          </h5>
          <p style="min-height: 100px; text-align: left;">
            {{ $t('electronic_appeal.corruption_report_description') }}
          </p>
          <div class="bottom clearfix">
            <a class="arrow-btn arrow-btn_burgundy" :href="localePath('/electronic-appeals/corruption-report')">
              {{ $t('send') }}
              <svg class="arrow-button">
                <use xlink:href="/tpl/images/svg-symbols.svg#arrow-button"></use>
              </svg>
            </a>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="wrapper__main">
      <div
        v-html="siteOptions[`electronic-appeals${$t('currentLangUpper')}`]"
        class="content"
      >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "electronicAppealIndexComponent",
  computed: {
    siteOptions() {
      return this.$store.getters['site/options'];
    }
  },
}
</script>
