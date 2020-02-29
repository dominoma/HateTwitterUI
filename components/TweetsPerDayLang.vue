<template>
  <apexchart
    type="line"
    :height="300"
    :options="chart.options"
    :series="chart.series"
  ></apexchart>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Hashtag } from '~/types'

@Component
export default class TweetsPerDayLang extends Vue {
  @Prop()
  hashtag!: Hashtag

  get langs() {
    return Object.entries(this.hashtag.lang)
      .sort((a, b) => b[1] - a[1])
      .map(([l]) => l)
      .slice(0, 3)
  }

  get chart() {
    return {
      options: {
        chart: {},
        theme: {
          mode: 'dark',
          palette: 'palette1'
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime'
        },
        dataLabels: {
          enabled: false
        }
      },
      series: this.langs
        .map((lang) => ({
          name: lang,
          data: this.hashtag.dateLang
            .filter((el) => el.lang === lang)
            .map(({ date, value }) => ({ x: date, y: value }))
            .sort((a, b) => a.x.localeCompare(b.x))
        }))
        .reverse()
    }
  }
}
</script>
