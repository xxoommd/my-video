"use strict";

const browser = {
  name: null,
  version: null,
  os: null,
  osVersion: null,
  touch: null,
  mobile: null,
  _canUse: null,

  canUse: function (p) {
    if (!this._canUse) this._canUse = document.createElement("div");

    var e = this._canUse.style,
      up = p.charAt(0).toUpperCase() + p.slice(1);

    return (
      p in e ||
      "Moz" + up in e ||
      "Webkit" + up in e ||
      "O" + up in e ||
      "ms" + up in e
    );
  },

  init: function () {
    var x = "other",
      y = 0,
      ua = navigator.userAgent,
      match;

    var browsers = [
      { name: "firefox", pattern: /Firefox\/([0-9\.]+)/ },
      { name: "bb", pattern: /BlackBerry.+Version\/([0-9\.]+)/ },
      { name: "bb", pattern: /BB[0-9]+.+Version\/([0-9\.]+)/ },
      { name: "opera", pattern: /OPR\/([0-9\.]+)/ },
      { name: "opera", pattern: /Opera\/([0-9\.]+)/ },
      { name: "edge", pattern: /Edge\/([0-9\.]+)/ },
      { name: "safari", pattern: /Version\/([0-9\.]+).+Safari/ },
      { name: "chrome", pattern: /Chrome\/([0-9\.]+)/ },
      { name: "ie", pattern: /MSIE ([0-9]+)/ },
      { name: "ie", pattern: /Trident\/.+rv:([0-9]+)/ },
    ];

    for (let i = 0; i < browsers.length; i++) {
      match = ua.match(browsers[i].pattern);
      if (match) {
        x = browsers[i].name;
        y = parseFloat(match[1]);
        break;
      }
    }

    this.name = x;
    this.version = y;

    var systems = [
      {
        name: "ios",
        pattern: /([0-9_]+) like Mac OS X/,
        version: (v) => v.replace(/_/g, "."),
      },
      { name: "ios", pattern: /CPU like Mac OS X/, version: () => 0 },
      { name: "wp", pattern: /Windows Phone ([0-9\.]+)/ },
      { name: "android", pattern: /Android ([0-9\.]+)/ },
      {
        name: "mac",
        pattern: /Macintosh.+Mac OS X ([0-9_]+)/,
        version: (v) => v.replace(/_/g, "."),
      },
      { name: "windows", pattern: /Windows NT ([0-9\.]+)/ },
      { name: "bb", pattern: /BlackBerry.+Version\/([0-9\.]+)/ },
      { name: "bb", pattern: /BB[0-9]+.+Version\/([0-9\.]+)/ },
      { name: "linux", pattern: /Linux/ },
      { name: "bsd", pattern: /BSD/ },
      { name: "unix", pattern: /X11/ },
    ];

    for (let i = 0; i < systems.length; i++) {
      match = ua.match(systems[i].pattern);
      if (match) {
        x = systems[i].name;
        y = systems[i].version
          ? systems[i].version(match[1])
          : parseFloat(match[1]);
        break;
      }
    }

    this.os = x;
    this.osVersion = y;

    this.touch =
      this.os === "wp"
        ? navigator.msMaxTouchPoints > 0
        : "ontouchstart" in window;
    this.mobile = ["wp", "android", "ios", "bb"].includes(this.os);
  },
};

browser.init();

export default browser;
