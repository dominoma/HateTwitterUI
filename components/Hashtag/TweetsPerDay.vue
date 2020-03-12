<template>
  <apexchart
    type="line"
    :height="300"
    :options="chart.options"
    :series="chart.series"
  ></apexchart>
</template>
<script lang="ts">
import { Vue, Component, Prop, PropSync } from 'vue-property-decorator'
import { Hashtag, Zoom } from '~/types'

/**
 * Chart which shows the number of tweets using a specific hashtag per day
 */
@Component
export default class TweetsPerDay extends Vue {
  @Prop()
  hashtag!: Hashtag

  @PropSync('zoom')
  zoomedArea!: Zoom

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
          id: 'tweets'
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
          text: 'Tweets insgesamt',
          align: 'center'
        }
      },
      series: [
        {
          name: 'Tweets',
          data: Object.entries(this.hashtag.tweetDates)
            .map(([date, { total }]) => ({
              x: date,
              y: total
            }))
            .sort((a, b) => a.x.localeCompare(b.x))
        }
      ]
    }
  }
}
</script>
