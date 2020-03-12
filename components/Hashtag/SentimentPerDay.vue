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

type Color = { red: number; green: number; blue: number }

/**
 * Calculates gradient bewteen 3 colors.
 * @param fadeFraction position of the requested color in the color range where 0 => color1, 0.5 => color2, 1 => color3
 */
function colorGradient(
  fadeFraction: number,
  rgbColor1: Color,
  rgbColor2: Color,
  rgbColor3: Color
) {
  let color1 = rgbColor1
  let color2 = rgbColor2
  let fade = fadeFraction * 2

  // Find which interval to use and adjust the fade percentage
  if (fade >= 1) {
    fade -= 1
    color1 = rgbColor2
    color2 = rgbColor3
  }

  const diffRed = color2.red - color1.red
  const diffGreen = color2.green - color1.green
  const diffBlue = color2.blue - color1.blue

  const gradient = {
    red: Math.floor(color1.red + diffRed * fade),
    green: Math.floor(color1.green + diffGreen * fade),
    blue: Math.floor(color1.blue + diffBlue * fade)
  }

  return (
    'rgb(' + gradient.red + ',' + gradient.green + ',' + gradient.blue + ')'
  )
}
/**
 * Line-Chart which visualizes sentiment per day. Its line is green when sentiment is high and red if sentiment is low. The line is yellow if sentiment is around 0%.
 */
@Component
export default class SentimentPerDay extends Vue {
  @Prop()
  hashtag!: Hashtag

  @PropSync('zoom')
  zoomedArea!: Zoom

  /** date-sorted data */
  readonly data = Object.entries(this.hashtag.tweetDates)
    .filter(([, { pos, neg }]) => pos > 0 && neg > 0)
    .map(([date, { pos, neg }]) => ({
      x: date,
      y: Math.floor(((pos - neg) / (pos + neg)) * 100)
    }))
    .sort((a, b) => a.x.localeCompare(b.x))

  getMinMax() {
    const arr = this.data.concat().sort((a, b) => a.y - b.y)
    return {
      min: arr[0],
      max: arr[arr.length - 1]
    }
  }

  /**
   * Calculates the min max and intermediate colors for the gradient of the chart.
   * The chart uses gradients relative to the highest and lowest points in the chart, but we want the gradient colors to be absolute.
   */
  getGradientColors() {
    const pick = (factor: number) =>
      colorGradient(
        factor,
        { red: 255, green: 0, blue: 0 },
        { red: 255, green: 255, blue: 0 },
        { red: 0, green: 255, blue: 0 }
      )
    const { min, max } = this.getMinMax()
    const minFac = (min.y + 100) / 200
    const maxFac = (max.y + 100) / 200
    const medFac = (max.y + min.y) / 400 + 0.5
    const minColor = pick(minFac)
    const maxColor = pick(maxFac)
    const medColor = pick(medFac)

    return { minColor, medColor, maxColor }
  }

  get chart() {
    const colors = this.getGradientColors()
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
          id: 'sentiment'
        },
        theme: {
          mode: 'dark'
        },
        stroke: {
          width: 7,
          curve: 'smooth'
        },
        title: {
          text: 'Sentiment-Verlauf',
          align: 'center'
        },
        fill: {
          type: 'gradient',
          gradient: {
            type: 'vertical',
            colorStops: [
              [
                {
                  offset: 0,
                  color: colors.maxColor,
                  opacity: 1
                },
                {
                  offset: 50,
                  color: colors.medColor,
                  opacity: 1
                },
                {
                  offset: 100,
                  color: colors.minColor,
                  opacity: 1
                }
              ]
            ]
          }
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
          min: -100,
          max: 100,
          title: {
            text: 'Kontext in %'
          }
        }
      },
      series: [
        {
          name: 'Kontext',
          data: this.data
        }
      ]
    }
  }
}
</script>
