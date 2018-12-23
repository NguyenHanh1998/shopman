// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv-pie", am4charts.PieChart);

chart.data = [{
  "item": "Jedi light saber",
  "revenue": 501.9
}, {
  "item": "Sith light saber",
  "revenue": 301.9
}, {
  "item": "Gray-Jedi light saber",
  "revenue": 201.1
}, {
	"item": "Stormtrooper Suit",
  "revenue": 165.8
}, {
  "item": "Jedi rode",
  "revenue": 139.9
}, {
  "item": "Stormtrooper gun",
  "revenue": 128.3
}, {
  "item": "Star Destroyer model",
  "revenue": 99
}, {
  "item": "Death Star model",
  "revenue": 60
}, {
  "item": "Others",
  "revenue": 50
}];

//create Series
var pieSeries = chart.series.push(new am4charts.PieSeries());

// setup Series
pieSeries.dataFields.value = "revenue";
pieSeries.dataFields.category = "item";

pieSeries.slices.template.stroke = am4core.color("#4a2abb");
pieSeries.slices.template.strokeWidth = 1;
pieSeries.slices.template.strokeOpacity = 0.5;

// Disable laber
pieSeries.labels.template.disabled = true;
pieSeries.ticks.template.disabled = true;

// Fix laber
// pieSeries.labels.template.text = "{category} : {value.value}";

// add legends
chart.legend = new am4charts.Legend();
chart.legend.itemContainers.template.paddingTop = 2;
chart.legend.itemContainers.template.paddingBottom = 2;
pieSeries.legendSettings.labelText = "[font-size:12px]{category} :[/]";
pieSeries.legendSettings.valueText = "[font-style: italic;]${value.value}[/]";

// Custom tooltips
pieSeries.slices.template.tooltipText = "{category}: {value.percent.}% ({value.value}$)";