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

@Component
export default class TweetsPerDayLang extends Vue {
  @PropSync('zoom')
  zoomedArea!: Zoom

  @Prop()
  hashtagList!: Hashtag[]

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
          id: 'hashtags'
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
        dataLabels: {
          enabled: false
        }
      },
      series: this.hashtagList
        .map((ht) => ({
          name: ht.name,
          data: Object.entries(ht.tweetDates)
            .map(([date, { total }]) => ({
              x: date,
              y: total
            }))
            .sort((a, b) => a.x.localeCompare(b.x))
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
    }
  }
}
</script>
