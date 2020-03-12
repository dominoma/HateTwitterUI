<template>
  <apexchart
    type="pie"
    :height="300"
    :options="chart.options"
    :series="chart.series"
  ></apexchart>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { Hashtag } from '~/types'

import LangCodes from '~/assets/data/langCodes.json'

@Component
export default class TweetsPerLang extends Vue {
  @Prop()
  hashtag!: Hashtag

  @Prop()
  range!: { min: number | undefined; max: number | undefined }

  @Emit('selected')
  handleLanguageSelect(lang: string) {
    return lang
  }

  /**
   * This function sums up all tweets by languages in the time range given by the property 'range'
   */
  getRangedData() {
    if (this.range && (this.range.min || this.range.max)) {
      return this.hashtag.langUsagePerDay
        .filter(({ date }) => {
          const ts = +new Date(date)
          return (
            (!this.range!.min || this.range!.min <= ts) &&
            (!this.range!.max || ts <= this.range!.max)
          )
        })
        .reduce((acc, el) => {
          acc[el.lang] = (acc[el.lang] || 0) + el.value
          return acc
        }, {} as { [lang: string]: number })
    } else {
      return this.hashtag.langUsage
    }
  }

  /**
   * Calculates the 5 most used languages and sums up the rest as 'Other' languages. Returns the chart data object.
   */
  get chart() {
    const others = Object.entries(this.getRangedData()).sort(
      (a, b) => b[1] - a[1]
    )
    const data = others.splice(0, 4).sort((a, b) => a[0].localeCompare(b[0]))

    const othersEntry = others.reduce(
      (acc, el) => {
        acc[1] += el[1]
        return acc
      },
      ['Andere', 0]
    )
    data.push(othersEntry)
    const lang = Object.fromEntries(data)
    return {
      options: {
        labels: Object.keys(lang).map((key) => (LangCodes as any)[key] || key),
        theme: {
          mode: 'dark',
          palette: 'palette1'
        },
        chart: {
          events: {
            dataPointSelection: (
              _event: any,
              _chartContext: any,
              config: any
            ) => {
              this.handleLanguageSelect(
                Object.keys(lang)[config.selectedDataPoints[0]]
              )
            }
          }
        },
        title: {
          text: 'Sprachverteilung',
          align: 'center'
        }
      },
      series: Object.values(lang)
    }
  }
}
</script>
