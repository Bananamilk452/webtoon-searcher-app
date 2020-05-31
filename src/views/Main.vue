<script>
import Search from '@/components/Search.vue';
import debounce from 'debounce';

export default {
  name: 'Main',
  components: {
    Search,
  },
  data() {
    return {
      searchQuery: '',
      debouncedInput: '',
      isSetting: false,
      settingAnimation: 'animate__bounceIn',
      providerList: [
        {
          name: '네이버 웹툰', slug: 'NaverWebtoon', checked: true, color: '#00D464',
        },
        // { name: '다음 웹툰', slug: 'DaumWebtoon', checked: true },
        {
          name: '레진코믹스', slug: 'LezhinComics', checked: true, color: '#E01E00',
        },
        // { name: '카카오페이지', slug: 'KakaoPage', checked: true, color: '#FFD200' },
        {
          name: '미스터블루', slug: 'MrBlue', checked: true, color: '#2F6AAF',
        },
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
    assignQuery() {
      if (this.searchQuery === '') return;
      this.debouncedInput = this.searchQuery;
    },
  },
  watch: {
    // arrow function 시 this가 작동 안 함
    // eslint-disable-next-line func-names
    searchQuery: debounce(function () { this.assignQuery(); }, 1000),
  },
};
</script>

<template lang="pug">
  #main
    sui-container
      h2(is="sui-header") webtoon-searcher
      sui-input(placeholder="검색어" icon="search" v-model.trim="searchQuery" @keyup.enter="assignQuery")
      sui-button(content="검색 설정" icon="setting" label-position="right" @click="clickSetting()")
      .animate__animated#setting-container(v-if="isSetting" :class="settingAnimation")
        sui-checkbox(v-for="(val, i) of providerList" :label="val.name" v-model="val.checked" :key="i")
      sui-divider
      Search(:searchInput="debouncedInput" :providerList="providerList")
</template>

<style scoped>
.ui.container {
  text-align: center;
  padding-top: 32px;
  background-color: white;
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
