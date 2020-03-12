<template>
  <apexchart
    type="area"
    :height="300"
    :options="chart.options"
    :series="chart.series"
  ></apexchart>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { Hashtag, Zoom } from '~/types'

/**
 * Chart which shows the hashtag trend per day of all hashtags provided by 'hashtagList'
 */
@Component
export default class TweetsPerDayLang extends Vue {
  @Prop()
  zoom!: Zoom

  @Emit('zoom-update')
  handleZoomUpdate(zoom: Zoom) {
    return zoom
  }

  @Prop()
  hashtagList!: Hashtag[]

  get chart() {
    return {
      options: {
        chart: {
          events: {
            zoomed: (_chartContext: any, { xaxis }: any) => {
              this.handleZoomUpdate(xaxis)
            },
            scrolled: (_chartContext: any, { xaxis }: any) => {
              this.handleZoomUpdate(xaxis)
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
          min: this.zoom.min,
          max: this.zoom.max
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: 'Tweets pro Tag',
          align: 'center'
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
