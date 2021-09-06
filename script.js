// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: cloud;
const url = 'https://fog.today'

const req = new Request(url + '/current.jpg')
const img = await req.loadImage()

const scale = await getScale()

const dc = new DrawContext()
dc.size = new Size(img.size.width * (1/scale), img.size.height * (1/scale))
dc.drawImageAtPoint(img, new Point(0, 0))
const cropped = dc.getImage()

const widget = new ListWidget()
widget.backgroundImage = cropped
widget.url = url

if (config.runsInApp) {
  const sizes = ['Small', 'Medium', 'Large']
  for (size of sizes) {
    await widget[`present${size}`]()
  }
  Script.complete()
}

Script.setWidget(widget)


async function getScale() {
  let { widgetParameter } = args
  
  if (!config.runsInWidget) {
    const alert = new Alert()
    alert.title = 'Scale'
    alert.addTextField('1.0')
    alert.addAction('Done')
    
    await alert.present()
    
    widgetParameter = alert.textFieldValue(0)
  }
  
  return widgetParameter ? parseFloat(widgetParameter, 10) : 1
}
