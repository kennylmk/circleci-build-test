const assert = require("assert");
const { expect } = require('chai');
const puppeteer = require('puppeteer');
const app = require('../server');

describe('UI test',()=>{
   
    let page;
    let result;

    // puppeteer options
    const opts = {
        headless: true,
        slowMo: 100,
        timeout: 60000
    };
  
    // expose variables
    before (async ()=> {
        browser = await puppeteer.launch(opts) // with visual
        page = await browser.newPage();
        await page.goto('http://localhost:1337');

    });
    
    // close browser and reset global variables
    after (async ()=> {
        await browser.close().promise;
        browser.close();
    });

    it('test to click button', async()=>{
        await page.click("button").promise;
    });

    it('test to disply text',async()=>{
        await page.waitFor('p');
        result = await page.$eval('p', result => result.innerText);
        console.log('result:'+result);
        expect(result).to.eql('Hello World for CircleCI');
    });  
})