import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    extends: Line,
    mixins: [reactiveProp],
    props: ['options'],
    mounted() {
        // this.chartData is created in the mixin.
        // If you want to pass options please create a local options object
        // read documentations:
        // https://vue-chartjs.org/guide/#vue-single-file-components
        // https://www.chartjs.org/docs/2.9.4/
        this.renderChart(this.chartData, this.options)
    }
}