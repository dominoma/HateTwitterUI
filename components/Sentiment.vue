<template>
  <fusioncharts
    type="angulargauge"
    width="100%"
    :height="300"
    data-format="json"
    :data-source="dataSource"
  ></fusioncharts>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Sentiment extends Vue {
  dataSource = {
    chart: {
      caption: 'Sentiment-Kontext in %',
      lowerlimit: '-100',
      upperlimit: '100',
      showvalue: '1',
      numbersuffix: '%',
      theme: 'candy',
      showtooltip: '0'
    },
    colorrange: {
      color: [
        {
          minvalue: '-100',
          maxvalue: '-38',
          code: '#ff0000'
        },
        {
          minvalue: '-38',
          maxvalue: '38',
          code: '#ffff00'
        },
        {
          minvalue: '38',
          maxvalue: '100',
          code: '#00ff00'
        }
      ]
    },
    dials: {
      dial: [
        {
          value: '81'
        }
      ]
    }
  }
}
</script>
