const should = require('chai').should()
const puppeteer = require('puppeteer')
const { percySnapshot } = require('@percy/puppeteer')

const TEST_URL = "http://todomvc.com/examples/vanillajs/"

describe('Index', function() {

  let browser = null
  let page = null
  beforeEach(async function() {
    // Create a new Puppeteer browser instace for each test case
    browser = await puppeteer.launch({
      headless: true,
      timeout: 10000
    })
    page = await browser.newPage()
  })

  afterEach(function() {
    // Close the Puppeteer browser instance.
    browser.close()
  })

  it('Loads the app', async function() {
    await page.goto(TEST_URL)
    const mainContainer = await page.$('section.todoapp')
    should.exist(mainContainer)
    await percySnapshot(page, this.test.fullTitle())
  })

  it('With no todos, hides main section', async function() {
    await page.goto(TEST_URL)
    const hiddenMainSection = await page.$(".main[style*='display:none']")
    should.exist(hiddenMainSection)
  })
})
