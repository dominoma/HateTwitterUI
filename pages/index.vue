<template>
  <OverviewDashboard :hashtag-list="hashtagList" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import OverviewDashboard from '~/components/OverviewDashboard.vue'
import hashtagList from '~/assets/data/hashtagList.json'

@Component({
  components: {
    OverviewDashboard
  }
})
export default class Index extends Vue {
  hashtagList = hashtagList
}
</script>

<style lang="scss"></style>
