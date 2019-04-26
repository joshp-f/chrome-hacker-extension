// document.body.appendChild('<div id="extension-entry"></div>')
// document.getElementById('extension-entry').appendChild()
$(document).ready(() => {

  let url = chrome.extension.getURL('index.html')
  $('body').prepend('<div id="hacker-placeholder"></div>')
  $('#hacker-placeholder').load(url,() => {
    // $.getScript(
    //   const scripts = ["https://unpkg.com/babel-standalone@6/babel.min.js",
    //   "https://unpkg.com/react@16/umd/react.development.js",
    //   "https://unpkg.com/react-dom@16/umd/react-dom.development.js",
    //   "result_bar.js" type="text/babel",
    //   "react_main.js" type="text/babel"]
  let url = chrome.extension.getURL('result_bar.js')
  console.log(url)
  $.getScript(url,)
  })
})
