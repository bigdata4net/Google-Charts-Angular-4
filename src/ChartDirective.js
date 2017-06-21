"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var googleChartJSVersion = "current";
var googleChartsLoaded; //global indicator to make sure packages only loads once
var googleChartsLoading; //global indicator to make sure packages only loads once
var GoogleChart = (function () {
    function GoogleChart(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.waitInterval = 200;
    }
    GoogleChart.prototype.ngOnChanges = function () {
        this.drawChart();
    };
    GoogleChart.prototype.drawChart = function () {
        var _this = this;
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
                this.timer = setInterval(function () { return _this.drawChart(); }, this.waitInterval);
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
        drawGoogleChart(element, this.chartType, this.containerId, this.chartOptions, this.dataTable, this.dataSourceUrl, this.query, this.refreshInterval, this.view);
    };
    return GoogleChart;
}());
__decorate([
    core_1.Input('chartType'),
    __metadata("design:type", String)
], GoogleChart.prototype, "chartType", void 0);
__decorate([
    core_1.Input('containerId'),
    __metadata("design:type", String)
], GoogleChart.prototype, "containerId", void 0);
__decorate([
    core_1.Input('options'),
    __metadata("design:type", Object)
], GoogleChart.prototype, "chartOptions", void 0);
__decorate([
    core_1.Input('dataTable'),
    __metadata("design:type", Object)
], GoogleChart.prototype, "dataTable", void 0);
__decorate([
    core_1.Input('dataSourceUrl'),
    __metadata("design:type", String)
], GoogleChart.prototype, "dataSourceUrl", void 0);
__decorate([
    core_1.Input('query'),
    __metadata("design:type", String)
], GoogleChart.prototype, "query", void 0);
__decorate([
    core_1.Input('refreshInterval'),
    __metadata("design:type", Number)
], GoogleChart.prototype, "refreshInterval", void 0);
__decorate([
    core_1.Input('view'),
    __metadata("design:type", Object)
], GoogleChart.prototype, "view", void 0);
GoogleChart = __decorate([
    core_1.Directive({
        selector: '[googleChart]',
        inputs: ['chartType', 'containerId', 'options', 'dataTable', 'dataSourceUrl', 'query', 'refreshInterval', 'view']
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer])
], GoogleChart);
exports.GoogleChart = GoogleChart;
function drawGoogleChart(element, chartType, containerId, chartOptions, dataTable, dataSourceUrl, query, refreshInterval, view) {
    console.log("element:'" + element + "'");
    console.log("chartType:'" + chartType + "'");
    console.log("dataTable:'" + dataTable + "'");
    console.log("dataSourceUrl:'" + dataSourceUrl + "'");
    if (!chartType)
        return;
    if (!dataTable && !dataSourceUrl)
        return;
    var wrapper = new google.visualization.ChartWrapper({
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
//# sourceMappingURL=ChartDirective.js.map