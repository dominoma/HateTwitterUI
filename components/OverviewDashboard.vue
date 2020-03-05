<template>
  <div class="ht-container">
    <div class="row">
      <div class="col-7">
        <div>
          <b-form-tags
            :tags.sync="selectedHashtags"
            separator=" ,;"
            tag-pills
            placeholder="Hashtags zum Anzeigen eingeben"
            class="my-2"
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
            @update:zoom="
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
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Hashtag, Zoom, HashtagUsage } from '../types'
import HashtagBubbles from '~/components/Overview/HashtagBubbles.vue'
import HashtagsTotal from '~/components/Overview/HashtagsTotal.vue'
import HashtagsPerDay from '~/components/Overview/HashtagsPerDay.vue'

@Component({
  components: {
    HashtagBubbles,
    HashtagsTotal,
    HashtagsPerDay
  }
})
export default class OverviewDashboard extends Vue {
  selectedHashtags: string[] = []
  hashtagSearchValue = ''

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

  getInitialRange() {
    const l = this.hashtagList.map((ht) => {
      const l = Object.entries(ht.tweetDates)
        .filter(([, { total }]) => total > ht.tweets.total * 0.001)
        .sort((a, b) => b[1].total - a[1].total)
      return { min: l[0], max: l[l.length - 1] }
    })
    const min = l.concat().sort((a, b) => a.min[0].localeCompare(b.min[0]))
    const max = l.concat().sort((a, b) => b.max[0].localeCompare(a.max[0]))
    return {
      min: +new Date(min[0].min[0]),
      max: +new Date(max[0].max[0])
    }
  }

  initialRange = this.getInitialRange()
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
