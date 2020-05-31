<template lang="pug">
  #search
    .loader(v-if="isLoading")
    #mod-card(v-for="(v, i) of searchData" v-if="!isLoading")
      #mod-image
        img(:src="v.thumbnail")
      #mod-content
        #title-wrapper
          #mod-title {{ v.title }}
        p#mod-count {{ v.updatedAt }}
        #mod-des {{ v.genre }} / 작가 {{ v.author }}
          #mod-explicit {{ isExplicit(v.explicit) }}
        #mod-des(:style="providerColor(v.provider)") {{ providerName(v.provider) }}
      #mod-right
        a#mod-button-wrapper(:href="v.link" target="_blank" rel="noopener noreferrer")
          sui-button 바로가기
</template>

<script>
import qs from 'querystring';

export default {
  name: 'Search',
  data() {
    return {
      searchData: [],
      isLoading: false,
    };
  },
  props: [
    'searchInput',
    'providerList',
  ],
  watch: {
    searchInput() {
      this.isLoading = true;
      // providerString
      let providerString = '';
      for (let i = 0; i < this.providerList.length; i += 1) {
        if (this.providerList[i].checked) providerString += `${this.providerList[i].slug},`;
      }

      const settings = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
          provider: providerString.slice(0, -1),
          type: 'all',
          keyword: this.searchInput,
        },
      };
      this.$http.post('http://localhost:4000/search', qs.stringify(settings.data), settings.headers)
        .then((res) => {
          this.searchData = res.data;
          this.isLoading = false;
        });
    },
  },
  methods: {
    isExplicit(v) {
      if (v) return ' (19)';
      return '';
    },
    providerColor(v) {
      return `color: ${this.providerList.find((obj) => obj.slug === v).color}; font-weight: 600;`;
    },
    providerName(v) {
      return this.providerList.find((obj) => obj.slug === v).name;
    },
  },
};
</script>

<style scoped>
#mod-card {
  text-align: left;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  margin-bottom: 5px;
  padding: 1em;
  background-color: rgb(255, 255, 255);
  border-radius: .5rem;
  box-shadow: 0 4px 6px -1px
  rgba(0,0,0,.1),0 2px 4px -1px
  rgba(0,0,0,.06);
  background-color: #fff;
  border-width: 1px;
  border-color: #DAD8DE;
}

#mod-image > img {
  max-height: 160px;
  background-repeat: no-repeat;
  border-radius: .5rem;
}

#mod-right {
  display: flex;
  flex-direction: column;
}

#mod-title {
  font-size: 17px;
  font-weight: 600;
  display: inline;
}

#mod-count {
  display: inline;
  font-size: 12px;
  color: rgb(110, 103, 121);
  margin: 1.075px 0 1.075px 12px;
}

#mod-button-wrapper {
  display: flex;
  flex-direction: row;
}

#mod-des {
  display: inline;
  font-size: 14px;
  margin-left: 12px;
}

#mod-explicit {
  display: inline;
  font-size: 14px;
  color: rgb(218, 16, 16);
  font-weight: 600;
}

#mod-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

#mod-category {
  width: 30px;
  height: 30px;
  float: right;
}

#mod-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

#mod-category:nth-last-child(1) {
  margin: 0px !important;
}

#title-wrapper {
  margin-left: 12px;
  margin-bottom: 4px;
}
</style>
