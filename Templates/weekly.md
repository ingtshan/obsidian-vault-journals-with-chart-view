### summary
```dataviewjs
window.pages = dv.pages(`"${dv.current().file.folder}"`).where(p => p.file.name.match(new RegExp(`${dv.current().file.name.split('-')[0]}-\\d{2}-\\d{2}`))).sort(p => p.file.name)

dv.paragraph(window.pages.file.link.join(', '))
```


### sleep
```dataviewjs
const settings = {
	func: window.renderChart,
	range: 7
}
await dv.view("Utils/Views/SleepTracker", settings);
```
### weight
```dataviewjs
const settings = {
	label: "Weight",
	key: "Weight",
	max: 85,
	min: 65,
    margin: 3,
}
await dv.view("Utils/Views/LineChartWithMargin", settings);
```