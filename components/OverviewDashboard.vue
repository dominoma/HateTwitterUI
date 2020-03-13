<template>
  <div class="ht-container">
    <div class="row">
      <div class="col-7">
        <div>
          <b-form-tags
            separator=" ,;"
            tag-pills
            placeholder="Hashtags zum Anzeigen eingeben"
            class="my-2"
            @input="handleTagsUpdated"
          ></b-form-tags>
        </div>
      </div>
      <div class="col-5">
        <div>
          <b-form-input
            v-model="hashtagSearchValue"
            placeholder="Direkt nach Hashtag suchen"
            class="my-2"
            @keydown.enter="handleHashtagSelected(hashtagSearchValue)"
          ></b-form-input>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div>
          <HashtagBubbles
            :hashtag-list="topHashtags"
            :zoom="{}"
            @selected="handleHashtagSelected"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-7">
        <div>
          <HashtagsPerDay
            :hashtag-list="top5Hashtags"
            :zoom="initialRange"
            @zoom-update="
              (ar) => {
                range = ar
              }
            "
          />
        </div>
      </div>
      <div class="col-5">
        <div>
          <HashtagsTotal
            :hashtag-list="hashtagList"
            :range="range"
            @selected="handleHashtagSelected"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { Hashtag, Zoom, HashtagUsage } from '../types'
import HashtagBubbles from '~/components/Overview/HashtagBubbles.vue'
import HashtagsTotal from '~/components/Overview/HashtagsTotal.vue'
import HashtagsPerDay from '~/components/Overview/HashtagsPerDay.vue'

/**
 * Dashboard which gives an overview of the top hashtags in out dataset.
 */
@Component({
  components: {
    HashtagBubbles,
    HashtagsTotal,
    HashtagsPerDay
  }
})
export default class OverviewDashboard extends Vue {
  hashtagSearchValue = ''

  @Emit('hashtags')
  handleTagsUpdated(tags: string[]) {
    return tags
  }

  @Prop()
  hashtagList!: Hashtag[]

  @Prop()
  topHashtags!: HashtagUsage[]

  get top5Hashtags() {
    return this.hashtagList
      .concat()
      .sort((a, b) => b.tweets.total - a.tweets.total)
      .slice(0, 5)
  }

  /**
   * Calculates the initial range for the HashtagsPerDay-chart in this dashboard.
   * It will show data in the time range where the hashtags were really used.
   * Really used means that the first day of the calculated range is the first day where more
   * than 0.1% of all tweets using one of the hashtags were posted.
   * The last day in this range is the last day where over 0.1% of the total tweets of one hashtag were posted.
   */
  get initialRange() {
    const sortedHashtags = this.hashtagList.map((ht) => {
      const sortedTweetDates = Object.entries(ht.tweetDates)
        .filter(([, { total }]) => total > ht.tweets.total * 0.001)
        .sort((a, b) => a[0].localeCompare(b[0]))
      return {
        min: sortedTweetDates[0],
        max: sortedTweetDates[sortedTweetDates.length - 1]
      }
    })
    const min = sortedHashtags
      .concat()
      .sort((a, b) => a.min[0].localeCompare(b.min[0]))
    const max = sortedHashtags
      .concat()
      .sort((a, b) => b.max[0].localeCompare(a.max[0]))
    return {
      min: +new Date(min[0].min[0]),
      max: +new Date(max[0].max[0])
    }
  }

  range: Zoom = this.initialRange

  handleHashtagSelected(hashtag: string) {
    this.$router.push(`hashtag/${hashtag}`)
  }
}
</script>

<style lang="scss">
@import '~/assets/themes/theme.scss';
.ht-container {
  margin: auto;
  max-width: 70rem;
}
.row {
  .col-7,
  .col-5,
  .col-12 {
    padding: 1rem;
    & > div {
      background: $dark;
      box-shadow: 0 0.5rem 1rem rgba(black, 0.15) !important;
      padding: 1rem;
      height: 100%;
    }
  }
}
</style>
