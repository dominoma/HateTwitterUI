<template>
  <HashtagDashboard :hashtag="hashtag" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import HashtagDashboard from '~/components/HashtagDashboard.vue'
import hashtag from '~/assets/data/hashtag.json'

@Component({
  components: {
    HashtagDashboard
  }
})
export default class Index extends Vue {
  hashtag = hashtag
}
</script>

<style lang="scss"></style>
