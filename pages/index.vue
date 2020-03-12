<template>
  <OverviewDashboard
    :hashtag-list="hashtagList"
    :top-hashtags="topHashtags"
    @hashtags="handleTagsUpdated"
  />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { fetchTopHashtags, fetchTop5Hashtags, fetchHashtag } from '../rest'
import { Hashtag, HashtagUsage } from '../types'
import OverviewDashboard from '~/components/OverviewDashboard.vue'

/**
 * This class encapsulates the home page showing an overview of the top trending hashtags in our dataset
 */
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

  /**
   * Loads hashtags added to the overview by user
   */
  async handleTagsUpdated(tags: string[]) {
    try {
      if (tags.length === 0) {
        this.hashtagList = await fetchTop5Hashtags()
      } else {
        this.hashtagList = await Promise.all(
          tags.map((tag) => {
            const entry = this.hashtagList.find((ht) => ht.name === tag)
            return entry || fetchHashtag(tag)
          })
        )
      }
    } catch (e) {}
  }
}
</script>

<style lang="scss"></style>
