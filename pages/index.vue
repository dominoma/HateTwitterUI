<template>
  <div class="ht-container">
    <div class="row">
      <div class="col-7">
        <TweetsPerDay :hashtag="hashtag" />
      </div>
      <div class="col-5"></div>
    </div>
    <div class="row">
      <div class="col-7">
        <TweetsPerDayLang :hashtag="hashtag" />
      </div>
      <div class="col-5">
        <TweetsPerLang :hashtag="hashtag" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import hashtag from './hashtag.json'
import TweetsPerDay from '~/components/TweetsPerDay.vue'
import TweetsPerDayLang from '~/components/TweetsPerDayLang.vue'
import TweetsPerLang from '~/components/TweetsPerLang.vue'

@Component({
  components: {
    TweetsPerDay,
    TweetsPerDayLang,
    TweetsPerLang
  }
})
export default class Index extends Vue {
  hashtag = hashtag
}
</script>

<style lang="scss">
.ht-container {
  margin: auto;
  max-width: 70rem;
}
.row {
  & > * {
    padding: 2rem;
  }
}
</style>
