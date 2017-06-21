# GoogleChartsAngular4

This source code is a directive exculpated google charts JS library. It has been tested against Angular 4. It's supposed to work with Angular 2 as well, but it's not tested yet.

The google charts project site is https://developers.google.com/chart/

and this source code depends on the google.visualization.d.ts file in https://github.com/DefinitelyTyped/DefinitelyTyped

Sample:
<div [dataTable]="gauge_ChartData" [options]="gauge_ChartOptions" chartType="Gauge" googleChart></div>

