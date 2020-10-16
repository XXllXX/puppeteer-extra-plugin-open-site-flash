const { PuppeteerExtraPlugin } = require('puppeteer-extra-plugin')
const { URL } = require('url')
/**
 * open flash
 */
class Plugin extends PuppeteerExtraPlugin {
  constructor(opts = {}) {
    super(opts)
  }

  get name() {
    return 'open-flash'
  }

  get defaults() {}

  get requirements() {
    return new Set(['launch', 'headful'])
  }

  // get dependencies() {
  //   return new Set(['flash'])
  // }

  async afterLaunch(browser, opts) {
    this.debug('browser has been launched', opts.options)
    const flash = this.openFlash
    browser.flash = async function(url) {
      await flash(this, url)
    }
  }

  async openFlash(browser, url) {
    if (!url) return
    const origin = new URL(url).origin
    const setting = `chrome://settings/content/siteDetails?site=${origin}`
    const page = await browser.newPage()
    await page.goto(setting, {
      timeout: 0,
      waitUntil: 'networkidle0',
    })
    await page.waitForTimeout(500)
    await page.evaluate(() => {
      var flash = document
        .querySelector('body > settings-ui')
        .shadowRoot.querySelector('#main')
        .shadowRoot.querySelector('settings-basic-page')
        .shadowRoot.querySelector(
          '#basicPage > settings-section.expanded > settings-privacy-page'
        )
        .shadowRoot.querySelector('#pages > settings-subpage > site-details')
        .shadowRoot.querySelector('#plugins')
        .shadowRoot.querySelector('#permission')
      flash.value = 'allow'
      var ev = document.createEvent('HTMLEvents')
      ev.initEvent('change', false, true)
      flash.dispatchEvent(ev)
    })
    await page.close()
    await page.waitForTimeout(500)
  }
}

module.exports = function(pluginConfig) {
  return new Plugin(pluginConfig)
}
