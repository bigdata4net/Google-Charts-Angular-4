# Google-Charts-Angular-4

This source code is a directive encapsulation of google charts JS library. It has been tested against Angular 4. It's supposed to work with Angular 2 as well, but not tested yet.

The google charts project site is https://developers.google.com/chart/

and this source code depends on the google.visualization/index.d.ts file in https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/google.visualization/index.d.ts

Sample:

Angular component template:
```html
<div [dataTable]="gauge_ChartData" [options]="gauge_ChartOptions" chartType="Gauge" googleChart></div>

index.html
```html
<head>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
</head>    

