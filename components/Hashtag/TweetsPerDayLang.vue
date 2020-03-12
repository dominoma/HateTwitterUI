<template>
  <apexchart
    type="area"
    :height="300"
    :options="chart.options"
    :series="chart.series"
  ></apexchart>
</template>
<script lang="ts">
import { Vue, Component, Prop, PropSync } from 'vue-property-decorator'
import { Hashtag, Zoom } from '~/types'

import LangCodes from '~/assets/data/langCodes.json'

/**
 * Chart which shows the number of tweets using a specific hashtag per day and per language (shows the 5 most used)
 * where each language is represented by a line in the graph.
 */
@Component
export default class TweetsPerDayLang extends Vue {
  @Prop()
  hashtag!: Hashtag

  @PropSync('zoom')
  zoomedArea!: Zoom

  /**
   * Calculates the five most used languages
   */
  get langs() {
    return Object.entries(this.hashtag.langUsage)
      .sort((a, b) => b[1] - a[1])
      .map(([l]) => l)
      .slice(0, 4)
      .sort((a, b) => a.localeCompare(b))
  }

  get chart() {
    return {
      options: {
        chart: {
          events: {
            zoomed: (_chartContext: any, { xaxis }: any) => {
              this.zoomedArea = xaxis
            },
            scrolled: (_chartContext: any, { xaxis }: any) => {
              this.zoomedArea = xaxis
            }
          },
          group: 'timeline',
          id: 'langs'
        },
        theme: {
          mode: 'dark',
          palette: 'palette1'
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          tooltip: {
            enabled: false
          },
          min: this.zoomedArea.min,
          max: this.zoomedArea.max
        },
        title: {
          text: 'Tweets pro Sprache',
          align: 'center'
        },
        dataLabels: {
          enabled: false
        }
      },
      series: this.langs.map((lang) => ({
        name: (LangCodes as any)[lang] || lang,
        data: this.hashtag.langUsagePerDay
          .filter((el) => el.lang === lang)
          .map(({ date, value }) => ({ x: date, y: value }))
          .sort((a, b) => a.x.localeCompare(b.x))
      }))
    }
  }
}
</script>
