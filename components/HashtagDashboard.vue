<template>
  <div class="ht-container">
    <div class="row">
      <div class="col-7">
        <div>
          <TweetsPerDay
            :hashtag="hashtag"
            @area-selected="(ar) => (range = ar)"
          />
        </div>
      </div>
      <div class="col-5">
        <div>
          <Tweet id="771763270273294336" :options="{ theme: 'dark' }" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-7">
        <div>
          <TweetsPerDayLang
            :hashtag="hashtag"
            @area-selected="(ar) => (range = ar)"
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
            @area-selected="(ar) => (range = ar)"
          />
        </div>
      </div>
      <div class="col-5">
        <div>
          <Sentiment :hashtag="hashtag" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Tweet } from 'vue-tweet-embed'

import { Hashtag } from '../types'
import TweetsPerDay from '~/components/TweetsPerDay.vue'
import TweetsPerDayLang from '~/components/TweetsPerDayLang.vue'
import TweetsPerLang from '~/components/TweetsPerLang.vue'
import SentimentPerDay from '~/components/SentimentPerDay.vue'
import Sentiment from '~/components/Sentiment.vue'

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
  range: { min: number | undefined; max: number | undefined } = {
    min: undefined,
    max: undefined
  }

  @Prop()
  hashtag!: Hashtag
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
  .col-5 {
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
