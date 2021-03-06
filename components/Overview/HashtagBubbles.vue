<template>
  <apexchart
    type="bubble"
    :height="300"
    :options="chart.options"
    :series="chart.series"
  ></apexchart>
</template>
<script lang="ts">
import { Vue, Component, Prop, PropSync, Emit } from 'vue-property-decorator'
import { Zoom, HashtagUsage } from '~/types'

/**
 * overall sentiment is converted to percentage. -100% means that all tweets were negative, 100% menas all tweets were positive.
 */
function getSentiment(pos: number, neg: number) {
  return pos + neg === 0 ? 0 : Math.floor(((pos - neg) / (pos + neg)) * 100)
}

/**
 * Chart which shows all hashtags provided by 'hashtagList' as bubbles.
 * The position on the x-axis shows the date where the most of the tweets using that hashtag where posted.
 * The position on the y-axis shows the sentiment of the hashtag in percent. 100% => all tweets were positive, -100% => all tweets were negative
 */
@Component
export default class HashtagBubbles extends Vue {
  @Prop()
  hashtagList!: HashtagUsage[]

  @PropSync('zoom')
  zoomedArea!: Zoom

  @Emit('selected')
  handleDataSelected(hashtagName: string) {
    return hashtagName
  }

  /**
   * For better comparison the sizes of the buubbles are converted so that the bubbles can be compared by area and not by radius.
   *
   * eg: A bubble with 2 times more tweets posted than another hashtag has an area double the area than that other hashtag.
   */
  formatBubbleSize = {
    to: (v: number) => Math.floor((v / Math.PI) ** 0.5),
    from: (v: number) => Math.floor(v ** 2 * Math.PI)
  }

  get chart() {
    return {
      series: this.hashtagList.map((ht) => ({
        name: ht.name,
        data: [
          {
            y: getSentiment(ht.tweets.pos, ht.tweets.neg),
            z: this.formatBubbleSize.to(ht.tweets.total),
            x: ht.hypePeak
          }
        ]
      })),
      options: {
        chart: {
          events: {
            zoomed: (_chartContext: any, { xaxis }: any) => {
              this.zoomedArea = xaxis
            },
            scrolled: (_chartContext: any, { xaxis }: any) => {
              this.zoomedArea = xaxis
            },

            dataPointSelection: (
              _event: any,
              _chartContext: any,
              config: any
            ) => {
              this.handleDataSelected(
                this.chart.series[config.seriesIndex].name
              )
            }
          }
        },
        tooltip: {
          custom: ({ seriesIndex }: any) => {
            const series = this.chart.series[seriesIndex]
            return `
                <div class="apexcharts-tooltip-title" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">${
                  series.name
                }</div>
                <div class="apexcharts-tooltip-series-group apexcharts-active" style="display: flex;">
                  <span class="apexcharts-tooltip-marker" style="background-color: rgb(0, 143, 251);"></span>
                    <div class="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
                    <div class="apexcharts-tooltip-y-group">
                      <span class="apexcharts-tooltip-text-label">Höhepunkt: </span>
                      <span class="apexcharts-tooltip-text-value">${new Date(
                        series.data[0].x
                      ).toLocaleDateString()}</span>
                    </div>
                    <div class="apexcharts-tooltip-z-group">
                      <span class="apexcharts-tooltip-text-z-label">Tweets insgesamt: </span>
                      <span class="apexcharts-tooltip-text-z-value">${this.formatBubbleSize.from(
                        series.data[0].z
                      )}</span>
                    </div>
                    <div class="apexcharts-tooltip-y-group">
                      <span class="apexcharts-tooltip-text-label">Sentiment: </span>
                      <span class="apexcharts-tooltip-text-value">${
                        series.data[0].y
                      }%</span>
                    </div>
                  </div>
                </div>
              `
          }
        },
        theme: {
          mode: 'dark',
          palette: 'palette1'
        },
        xaxis: {
          type: 'datetime',
          tooltip: {
            enabled: false
          },
          min: this.zoomedArea.min,
          max: this.zoomedArea.max
        },
        yaxis: {
          title: {
            text: 'Kontext in %'
          }
        },
        title: {
          text: 'Top 30 Hashtags',
          align: 'center'
        }
      }
    }
  }
}
</script>
