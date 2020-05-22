<template lang="pug">
  #main
    sui-container
      h2(is="sui-header") webtoon-searcher
      sui-input(placeholder="검색어" icon="search" v-model="searchQuery")
      sui-button(content="검색 설정" icon="setting" label-position="right" @click="clickSetting()")
      .animate__animated#setting-container(v-if="isSetting" :class="settingAnimation")
        sui-checkbox(v-for="(val, i) of providerList" :label="val.name" v-model="val.slug" :key="i")
      sui-divider
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      searchQuery: '',
      isSetting: false,
      settingAnimation: 'animate__bounceIn',
      providerList: [
        { name: '네이버 웹툰', slug: 'naverwebtoon' },
        { name: '다음 웹툰', slug: 'daumwebtoon' },
        { name: '레진코믹스', slug: 'lezhincomics' },
        { name: '카카오페이지', slug: 'kakaopage' },
      ],
    };
  },
  methods: {
    clickSetting() {
      if (this.isSetting) {
        this.settingAnimation = 'animate__bounceOut';
        setTimeout(() => {
          this.isSetting = !this.isSetting;
        }, 750);
      } else {
        this.settingAnimation = 'animate__bounceIn';
        this.isSetting = !this.isSetting;
      }
    },
  },
};
</script>

<style scoped>
.ui.container {
  text-align: center;
  padding-top: 32px;
}

.ui.button {
  margin: 0 12px;
}

#setting-container {
  border: 1px solid rgba(34,36,38,.15);
  border-radius: .28571429rem;
  width: 35%;
  margin: auto;
  margin-top: 16px;
  padding: .7rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap
}

#setting-container > .ui.checkbox {
  margin: 8px;
}
</style>
