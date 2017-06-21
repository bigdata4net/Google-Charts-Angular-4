import { Directive, Renderer, ElementRef, Input, Output, OnChanges, EventEmitter, HostBinding, HostListener } from '@angular/core';
const googleChartJSVersion: string = "current";
let googleChartsLoaded: any//global indicator to make sure packages only loads once
let googleChartsLoading: any//global indicator to make sure packages only loads once
@Directive({
    selector: '[googleChart]',
    inputs: ['chartType', 'containerId', 'options', 'dataTable', 'dataSourceUrl', 'query', 'refreshInterval', 'view']
})
export class GoogleChart implements OnChanges {
    @Input('chartType') chartType: string;
    @Input('containerId') containerId?: string;
    @Input('options') chartOptions?: Object;
    @Input('dataTable') dataTable?: Object;
    @Input('dataSourceUrl') dataSourceUrl?: string;
    @Input('query') query?: string;
    @Input('refreshInterval') refreshInterval?: number;
    @Input('view') view?: any;
    private timer: any;
    private waitInterval: number = 200;
    constructor(private el: ElementRef, private renderer: Renderer) {
    }

    ngOnChanges() {
        this.drawChart();
    }

    drawChart() {
        if (!googleChartsLoaded) {
            console.log("googleCharts not Loaded");
            if (!googleChartsLoading) {
                console.log("googleCharts loading");
                googleChartsLoading = true;
                google.charts.load(googleChartJSVersion);
                google.charts.setOnLoadCallback(function () {
                    console.log("googleCharts Loaded");
                    googleChartsLoaded = true;
                });
            }
            if (!this.timer) {
                console.log("Timer not set");
                this.timer = setInterval(() => this.drawChart(), this.waitInterval);
                console.log("timer set");
            }
            return;
        }
        if (this.timer) {
            console.log("clear timer");
            clearInterval(this.timer);
        }
        console.log("draw chart");
        var element = this.el.nativeElement;
        drawGoogleChart(element, this.chartType, this.containerId, this.chartOptions, this.dataTable,
            this.dataSourceUrl, this.query, this.refreshInterval, this.view);
    }
}


function drawGoogleChart(element: HTMLElement, chartType: string, containerId?: string, chartOptions?: Object, dataTable?: Object,
    dataSourceUrl?: string, query?: string, refreshInterval?: number, view?: any) {

    console.log("element:'" + element + "'");
    console.log("chartType:'" + chartType + "'");
    console.log("dataTable:'" + dataTable + "'");
    console.log("dataSourceUrl:'" + dataSourceUrl + "'");
    if (!chartType) //Invalid declaration
        return;

    if (!dataTable && !dataSourceUrl) //No data
        return;

    const wrapper = new google.visualization.ChartWrapper({
        chartType: chartType,
        options: chartOptions || {},
        dataTable: dataTable,
        dataSourceUrl: dataSourceUrl,
        query: query,
        refreshInterval: refreshInterval,
        containerId: containerId,
        view: view
    });
    wrapper.draw(element);
}