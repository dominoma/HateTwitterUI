<template>
  <OverviewDashboard :hashtag-list="hashtagList" :top-hashtags="topHashtags" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { fetchTopHashtags, fetchTop5Hashtags } from '../rest'
import { Hashtag, HashtagUsage } from '../types'
import OverviewDashboard from '~/components/OverviewDashboard.vue'

@Component({
  components: {
    OverviewDashboard
  },
  async asyncData() {
    return {
      hashtagList: await fetchTop5Hashtags(),
      topHashtags: await fetchTopHashtags()
    }
  }
})
export default class Index extends Vue {
  hashtagList!: Hashtag[]
  topHashtags!: HashtagUsage[]
}
</script>

<style lang="scss"></style>
