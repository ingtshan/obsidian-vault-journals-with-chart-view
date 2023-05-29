### kr1 Bed Time Early And Sleep Enough
Principle 1: keep phone away from bed

### kr2 Keep Heath Weight

### Last Two Weeks
```dataviewjs
window.pages = dv.pages(`"${dv.current().file.folder}"`).where(p => p.file.name.match(new RegExp(`${dv.current().file.name.split('@')[1]}-\\d{2}-\\d{2}`))).sort(p => p.file.name).slice(-14);

dv.paragraph(window.pages.file.link.join(', '))
```
##### Sleep
```dataviewjs
const settings = {
	func: window.renderChart,
	range: 14
}
await dv.view("Utils/Views/SleepTracker", settings);
```

##### Weight
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