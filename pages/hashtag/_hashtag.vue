<template>
  <HashtagDashboard :hashtag="hashtag" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { fetchHashtag } from '~/rest'
import HashtagDashboard from '~/components/HashtagDashboard.vue'

@Component({
  components: {
    HashtagDashboard
  },
  async asyncData(context) {
    return { hashtag: await fetchHashtag(context.params.hashtag) }
  }
})
export default class Hashtag extends Vue {
  hashtag!: Hashtag
}
</script>

<style lang="scss"></style>
