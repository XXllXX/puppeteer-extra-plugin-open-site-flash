# puppeteer-extra-plugin-open-site-flash

puppeteer-extra-plugin-open-site-flash

## Install

```
yarn add puppeteer-extra-plugin-open-site-flash
```

## Use

```
await browser.flash('http://ultrasounds.com/')
```

## Example

```
const puppeteer = require('puppeteer-extra')
puppeteer.use(require('puppeteer-extra-plugin-open-site-flash')())

puppeteer.launch({ headless: true }).then(async browser => {
  const page = await browser.newPage()
  // open flash
  await browser.flash('http://ultrasounds.com/')
  await page.goto('http://ultrasounds.com', { waitUntil: 'domcontentloaded' })
  //...
  await browser.close()
})

```
