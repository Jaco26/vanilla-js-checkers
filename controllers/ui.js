const UI_CONTROLLER = (function() {

  class El {
    constructor(selector) {
      this.el = document.querySelector(selector);
    }
    listen(event, handler) {
      this.el.addEventListener(event, handler);
      return this;
    }
  }

  function getEl(selector) {
    const element = new El(selector);
    return element
  }

  const uiConfig = {
    shouldAnimate: false,
  }

  getEl('#should-animate').listen('change', (e) => {
    uiConfig.shouldAnimate = e.target.checked;
  });

  return { uiConfig };

})();