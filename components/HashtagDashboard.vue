<template>
  <div class="ht-container">
    <div class="row">
      <div class="col-12">
        <div class="d-flex">
          <h1 class="text-white m-auto ">
            Übersicht für <code>#{{ hashtag.name }}</code>
            <b-badge class="h3">Platz {{ hashtag.ranking }}</b-badge>
          </h1>

          <b-button class="my-auto" variant="light" to="/">Zurück</b-button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-7">
        <div>
          <TweetsPerDay
            :hashtag="hashtag"
            :zoom="initialRange"
            @update:zoom="(ar) => (range = ar)"
          />
        </div>
      </div>
      <div class="col-5">
        <div>
          <Tweet
            :id="hashtag.topTweetId"
            :options="{ theme: 'dark' }"
            class="max-height-tweet"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-7">
        <div>
          <TweetsPerDayLang
            :hashtag="hashtag"
            :zoom="initialRange"
            @update:zoom="(ar) => (range = ar)"
          />
        </div>
      </div>
      <div class="col-5">
        <div>
          <TweetsPerLang :hashtag="hashtag" :range="range" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-7">
        <div>
          <SentimentPerDay
            :hashtag="hashtag"
            :zoom="initialRange"
            @update:zoom="(ar) => (range = ar)"
          />
        </div>
      </div>
      <div class="col-5">
        <div>
          <Sentiment :hashtag="hashtag" :range="range" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Tweet } from 'vue-tweet-embed'

import { Hashtag, Zoom } from '../types'
import TweetsPerDay from '~/components/Hashtag/TweetsPerDay.vue'
import TweetsPerDayLang from '~/components/Hashtag/TweetsPerDayLang.vue'
import TweetsPerLang from '~/components/Hashtag/TweetsPerLang.vue'
import SentimentPerDay from '~/components/Hashtag/SentimentPerDay.vue'
import Sentiment from '~/components/Hashtag/Sentiment.vue'

@Component({
  components: {
    TweetsPerDay,
    TweetsPerDayLang,
    TweetsPerLang,
    SentimentPerDay,
    Sentiment,
    Tweet
  }
})
export default class HashtagDashboard extends Vue {
  @Prop()
  hashtag!: Hashtag

  get initialRange(): Zoom {
    const sorted = Object.entries(this.hashtag.tweetDates)
      .filter(([, { total }]) => total > this.hashtag.tweets.total * 0.0005)
      .sort((a, b) => a[0].localeCompare(b[0]))
    return {
      min: +new Date(sorted[0][0]),
      max: +new Date(sorted[sorted.length - 1][0])
    }
  }

  range = this.initialRange
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
.max-height-tweet {
  max-height: 300px;
  overflow-y: auto;
}
</style>
