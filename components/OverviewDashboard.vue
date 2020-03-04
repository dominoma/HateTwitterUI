<template>
  <div class="ht-container">
    <div class="row">
      <div class="col-7">
        <div>
          <b-form-tags
            v-model="selectedHashtags"
            separator=" ,;"
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
          ></b-form-input>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div>
          <HashtagBubbles
            :hashtag-list="hashtagList"
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
            :hashtag-list="hashtagList"
            :zoom="initialRange"
            @update:zoom="(ar) => (range = ar)"
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
import { Hashtag, Zoom } from '../types'
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
  range: Zoom = {
    min: +new Date('2018-01-07'),
    max: undefined
  }

  initialRange = this.range

  selectedHashtags: string[] = []
  hashtagSearchValue = ''
  log = console.log

  @Prop()
  hashtagList!: Hashtag[]

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
