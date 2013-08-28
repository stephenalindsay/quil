var COMPILED = !0, goog = goog || {};
goog.global = this;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.provide = function(a) {
  if(!COMPILED) {
    if(goog.isProvided_(a)) {
      throw Error('Namespace "' + a + '" already declared.');
    }
    delete goog.implicitNamespaces_[a];
    for(var b = a;(b = b.substring(0, b.lastIndexOf("."))) && !goog.getObjectByName(b);) {
      goog.implicitNamespaces_[b] = !0
    }
  }
  goog.exportPath_(a)
};
goog.setTestOnly = function(a) {
  if(COMPILED && !goog.DEBUG) {
    throw a = a || "", Error("Importing test-only code into non-debug environment" + a ? ": " + a : ".");
  }
};
COMPILED || (goog.isProvided_ = function(a) {
  return!goog.implicitNamespaces_[a] && !!goog.getObjectByName(a)
}, goog.implicitNamespaces_ = {});
goog.exportPath_ = function(a, b, c) {
  a = a.split(".");
  c = c || goog.global;
  !(a[0] in c) && c.execScript && c.execScript("var " + a[0]);
  for(var d;a.length && (d = a.shift());) {
    !a.length && goog.isDef(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {}
  }
};
goog.getObjectByName = function(a, b) {
  for(var c = a.split("."), d = b || goog.global, e;e = c.shift();) {
    if(goog.isDefAndNotNull(d[e])) {
      d = d[e]
    }else {
      return null
    }
  }
  return d
};
goog.globalize = function(a, b) {
  var c = b || goog.global, d;
  for(d in a) {
    c[d] = a[d]
  }
};
goog.addDependency = function(a, b, c) {
  if(!COMPILED) {
    for(var d, a = a.replace(/\\/g, "/"), e = goog.dependencies_, f = 0;d = b[f];f++) {
      e.nameToPath[d] = a, a in e.pathToNames || (e.pathToNames[a] = {}), e.pathToNames[a][d] = !0
    }
    for(d = 0;b = c[d];d++) {
      a in e.requires || (e.requires[a] = {}), e.requires[a][b] = !0
    }
  }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.require = function(a) {
  if(!COMPILED && !goog.isProvided_(a)) {
    if(goog.ENABLE_DEBUG_LOADER) {
      var b = goog.getPathFromDeps_(a);
      if(b) {
        goog.included_[b] = !0;
        goog.writeScripts_();
        return
      }
    }
    a = "goog.require could not find: " + a;
    goog.global.console && goog.global.console.error(a);
    throw Error(a);
  }
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.identityFunction = function(a) {
  return a
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
  a.getInstance = function() {
    if(a.instance_) {
      return a.instance_
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
    return a.instance_ = new a
  }
};
goog.instantiatedSingletons_ = [];
!COMPILED && goog.ENABLE_DEBUG_LOADER && (goog.included_ = {}, goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}}, goog.inHtmlDocument_ = function() {
  var a = goog.global.document;
  return"undefined" != typeof a && "write" in a
}, goog.findBasePath_ = function() {
  if(goog.global.CLOSURE_BASE_PATH) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH
  }else {
    if(goog.inHtmlDocument_()) {
      for(var a = goog.global.document.getElementsByTagName("script"), b = a.length - 1;0 <= b;--b) {
        var c = a[b].src, d = c.lastIndexOf("?"), d = -1 == d ? c.length : d;
        if("base.js" == c.substr(d - 7, 7)) {
          goog.basePath = c.substr(0, d - 7);
          break
        }
      }
    }
  }
}, goog.importScript_ = function(a) {
  var b = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
  !goog.dependencies_.written[a] && b(a) && (goog.dependencies_.written[a] = !0)
}, goog.writeScriptTag_ = function(a) {
  return goog.inHtmlDocument_() ? (goog.global.document.write('<script type="text/javascript" src="' + a + '"><\/script>'), !0) : !1
}, goog.writeScripts_ = function() {
  function a(e) {
    if(!(e in d.written)) {
      if(!(e in d.visited) && (d.visited[e] = !0, e in d.requires)) {
        for(var g in d.requires[e]) {
          if(!goog.isProvided_(g)) {
            if(g in d.nameToPath) {
              a(d.nameToPath[g])
            }else {
              throw Error("Undefined nameToPath for " + g);
            }
          }
        }
      }
      e in c || (c[e] = !0, b.push(e))
    }
  }
  var b = [], c = {}, d = goog.dependencies_, e;
  for(e in goog.included_) {
    d.written[e] || a(e)
  }
  for(e = 0;e < b.length;e++) {
    if(b[e]) {
      goog.importScript_(goog.basePath + b[e])
    }else {
      throw Error("Undefined script input");
    }
  }
}, goog.getPathFromDeps_ = function(a) {
  return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.typeOf = function(a) {
  var b = typeof a;
  if("object" == b) {
    if(a) {
      if(a instanceof Array) {
        return"array"
      }
      if(a instanceof Object) {
        return b
      }
      var c = Object.prototype.toString.call(a);
      if("[object Window]" == c) {
        return"object"
      }
      if("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == b && "undefined" == typeof a.call) {
      return"object"
    }
  }
  return b
};
goog.isDef = function(a) {
  return void 0 !== a
};
goog.isNull = function(a) {
  return null === a
};
goog.isDefAndNotNull = function(a) {
  return null != a
};
goog.isArray = function(a) {
  return"array" == goog.typeOf(a)
};
goog.isArrayLike = function(a) {
  var b = goog.typeOf(a);
  return"array" == b || "object" == b && "number" == typeof a.length
};
goog.isDateLike = function(a) {
  return goog.isObject(a) && "function" == typeof a.getFullYear
};
goog.isString = function(a) {
  return"string" == typeof a
};
goog.isBoolean = function(a) {
  return"boolean" == typeof a
};
goog.isNumber = function(a) {
  return"number" == typeof a
};
goog.isFunction = function(a) {
  return"function" == goog.typeOf(a)
};
goog.isObject = function(a) {
  var b = typeof a;
  return"object" == b && null != a || "function" == b
};
goog.getUid = function(a) {
  return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function(a) {
  "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete a[goog.UID_PROPERTY_]
  }catch(b) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
  var b = goog.typeOf(a);
  if("object" == b || "array" == b) {
    if(a.clone) {
      return a.clone()
    }
    var b = "array" == b ? [] : {}, c;
    for(c in a) {
      b[c] = goog.cloneObject(a[c])
    }
    return b
  }
  return a
};
goog.bindNative_ = function(a, b, c) {
  return a.call.apply(a.bind, arguments)
};
goog.bindJs_ = function(a, b, c) {
  if(!a) {
    throw Error();
  }
  if(2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, d);
      return a.apply(b, c)
    }
  }
  return function() {
    return a.apply(b, arguments)
  }
};
goog.bind = function(a, b, c) {
  goog.bind = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bindNative_ : goog.bindJs_;
  return goog.bind.apply(null, arguments)
};
goog.partial = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = Array.prototype.slice.call(arguments);
    b.unshift.apply(b, c);
    return a.apply(this, b)
  }
};
goog.mixin = function(a, b) {
  for(var c in b) {
    a[c] = b[c]
  }
};
goog.now = Date.now || function() {
  return+new Date
};
goog.globalEval = function(a) {
  if(goog.global.execScript) {
    goog.global.execScript(a, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(null == goog.evalWorksForGlobals_ && (goog.global.eval("var _et_ = 1;"), "undefined" != typeof goog.global._et_ ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1), goog.evalWorksForGlobals_) {
        goog.global.eval(a)
      }else {
        var b = goog.global.document, c = b.createElement("script");
        c.type = "text/javascript";
        c.defer = !1;
        c.appendChild(b.createTextNode(a));
        b.body.appendChild(c);
        b.body.removeChild(c)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, b) {
  var c = function(a) {
    return goog.cssNameMapping_[a] || a
  }, d = function(a) {
    for(var a = a.split("-"), b = [], d = 0;d < a.length;d++) {
      b.push(c(a[d]))
    }
    return b.join("-")
  }, d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function(a) {
    return a
  };
  return b ? a + "-" + d(b) : d(a)
};
goog.setCssNameMapping = function(a, b) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = b
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(a, b) {
  var c = b || {}, d;
  for(d in c) {
    var e = ("" + c[d]).replace(/\$/g, "$$$$"), a = a.replace(RegExp("\\{\\$" + d + "\\}", "gi"), e)
  }
  return a
};
goog.exportSymbol = function(a, b, c) {
  goog.exportPath_(a, b, c)
};
goog.exportProperty = function(a, b, c) {
  a[b] = c
};
goog.inherits = function(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a
};
goog.base = function(a, b, c) {
  var d = arguments.callee.caller;
  if(d.superClass_) {
    return d.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1))
  }
  for(var e = Array.prototype.slice.call(arguments, 2), f = !1, g = a.constructor;g;g = g.superClass_ && g.superClass_.constructor) {
    if(g.prototype[b] === d) {
      f = !0
    }else {
      if(f) {
        return g.prototype[b].apply(a, e)
      }
    }
  }
  if(a[b] === d) {
    return a.constructor.prototype[b].apply(a, e)
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(a) {
  a.call(goog.global)
};
goog.string = {};
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(a, b) {
  return 0 == a.lastIndexOf(b, 0)
};
goog.string.endsWith = function(a, b) {
  var c = a.length - b.length;
  return 0 <= c && a.indexOf(b, c) == c
};
goog.string.caseInsensitiveStartsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length))
};
goog.string.caseInsensitiveEndsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length))
};
goog.string.subs = function(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = String(arguments[c]).replace(/\$/g, "$$$$"), a = a.replace(/\%s/, d)
  }
  return a
};
goog.string.collapseWhitespace = function(a) {
  return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function(a) {
  return/^[\s\xa0]*$/.test(a)
};
goog.string.isEmptySafe = function(a) {
  return goog.string.isEmpty(goog.string.makeSafe(a))
};
goog.string.isBreakingWhitespace = function(a) {
  return!/[^\t\n\r ]/.test(a)
};
goog.string.isAlpha = function(a) {
  return!/[^a-zA-Z]/.test(a)
};
goog.string.isNumeric = function(a) {
  return!/[^0-9]/.test(a)
};
goog.string.isAlphaNumeric = function(a) {
  return!/[^a-zA-Z0-9]/.test(a)
};
goog.string.isSpace = function(a) {
  return" " == a
};
goog.string.isUnicodeChar = function(a) {
  return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a
};
goog.string.stripNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(a) {
  return a.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(a) {
  return a.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.collapseBreakingSpaces = function(a) {
  return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
};
goog.string.trim = function(a) {
  return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(a) {
  return a.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(a) {
  return a.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(a, b) {
  var c = String(a).toLowerCase(), d = String(b).toLowerCase();
  return c < d ? -1 : c == d ? 0 : 1
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(a, b) {
  if(a == b) {
    return 0
  }
  if(!a) {
    return-1
  }
  if(!b) {
    return 1
  }
  for(var c = a.toLowerCase().match(goog.string.numerateCompareRegExp_), d = b.toLowerCase().match(goog.string.numerateCompareRegExp_), e = Math.min(c.length, d.length), f = 0;f < e;f++) {
    var g = c[f], h = d[f];
    if(g != h) {
      return c = parseInt(g, 10), !isNaN(c) && (d = parseInt(h, 10), !isNaN(d) && c - d) ? c - d : g < h ? -1 : 1
    }
  }
  return c.length != d.length ? c.length - d.length : a < b ? -1 : 1
};
goog.string.urlEncode = function(a) {
  return encodeURIComponent(String(a))
};
goog.string.urlDecode = function(a) {
  return decodeURIComponent(a.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(a, b) {
  return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>")
};
goog.string.htmlEscape = function(a, b) {
  if(b) {
    return a.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;")
  }
  if(!goog.string.allRe_.test(a)) {
    return a
  }
  -1 != a.indexOf("&") && (a = a.replace(goog.string.amperRe_, "&amp;"));
  -1 != a.indexOf("<") && (a = a.replace(goog.string.ltRe_, "&lt;"));
  -1 != a.indexOf(">") && (a = a.replace(goog.string.gtRe_, "&gt;"));
  -1 != a.indexOf('"') && (a = a.replace(goog.string.quotRe_, "&quot;"));
  return a
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function(a) {
  return goog.string.contains(a, "&") ? "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a
};
goog.string.unescapeEntitiesUsingDom_ = function(a) {
  var b = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'}, c = document.createElement("div");
  return a.replace(goog.string.HTML_ENTITY_PATTERN_, function(a, e) {
    var f = b[a];
    if(f) {
      return f
    }
    if("#" == e.charAt(0)) {
      var g = Number("0" + e.substr(1));
      isNaN(g) || (f = String.fromCharCode(g))
    }
    f || (c.innerHTML = a + " ", f = c.firstChild.nodeValue.slice(0, -1));
    return b[a] = f
  })
};
goog.string.unescapePureXmlEntities_ = function(a) {
  return a.replace(/&([^;]+);/g, function(a, c) {
    switch(c) {
      case "amp":
        return"&";
      case "lt":
        return"<";
      case "gt":
        return">";
      case "quot":
        return'"';
      default:
        if("#" == c.charAt(0)) {
          var d = Number("0" + c.substr(1));
          if(!isNaN(d)) {
            return String.fromCharCode(d)
          }
        }
        return a
    }
  })
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(a, b) {
  return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b)
};
goog.string.stripQuotes = function(a, b) {
  for(var c = b.length, d = 0;d < c;d++) {
    var e = 1 == c ? b : b.charAt(d);
    if(a.charAt(0) == e && a.charAt(a.length - 1) == e) {
      return a.substring(1, a.length - 1)
    }
  }
  return a
};
goog.string.truncate = function(a, b, c) {
  c && (a = goog.string.unescapeEntities(a));
  a.length > b && (a = a.substring(0, b - 3) + "...");
  c && (a = goog.string.htmlEscape(a));
  return a
};
goog.string.truncateMiddle = function(a, b, c, d) {
  c && (a = goog.string.unescapeEntities(a));
  if(d && a.length > b) {
    d > b && (d = b);
    var e = a.length - d, a = a.substring(0, b - d) + "..." + a.substring(e)
  }else {
    a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e))
  }
  c && (a = goog.string.htmlEscape(a));
  return a
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(a) {
  a = String(a);
  if(a.quote) {
    return a.quote()
  }
  for(var b = ['"'], c = 0;c < a.length;c++) {
    var d = a.charAt(c), e = d.charCodeAt(0);
    b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d))
  }
  b.push('"');
  return b.join("")
};
goog.string.escapeString = function(a) {
  for(var b = [], c = 0;c < a.length;c++) {
    b[c] = goog.string.escapeChar(a.charAt(c))
  }
  return b.join("")
};
goog.string.escapeChar = function(a) {
  if(a in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[a]
  }
  if(a in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a]
  }
  var b = a, c = a.charCodeAt(0);
  if(31 < c && 127 > c) {
    b = a
  }else {
    if(256 > c) {
      if(b = "\\x", 16 > c || 256 < c) {
        b += "0"
      }
    }else {
      b = "\\u", 4096 > c && (b += "0")
    }
    b += c.toString(16).toUpperCase()
  }
  return goog.string.jsEscapeCache_[a] = b
};
goog.string.toMap = function(a) {
  for(var b = {}, c = 0;c < a.length;c++) {
    b[a.charAt(c)] = !0
  }
  return b
};
goog.string.contains = function(a, b) {
  return-1 != a.indexOf(b)
};
goog.string.countOf = function(a, b) {
  return a && b ? a.split(b).length - 1 : 0
};
goog.string.removeAt = function(a, b, c) {
  var d = a;
  0 <= b && (b < a.length && 0 < c) && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
  return d
};
goog.string.remove = function(a, b) {
  var c = RegExp(goog.string.regExpEscape(b), "");
  return a.replace(c, "")
};
goog.string.removeAll = function(a, b) {
  var c = RegExp(goog.string.regExpEscape(b), "g");
  return a.replace(c, "")
};
goog.string.regExpEscape = function(a) {
  return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function(a, b) {
  return Array(b + 1).join(a)
};
goog.string.padNumber = function(a, b, c) {
  a = goog.isDef(c) ? a.toFixed(c) : String(a);
  c = a.indexOf(".");
  -1 == c && (c = a.length);
  return goog.string.repeat("0", Math.max(0, b - c)) + a
};
goog.string.makeSafe = function(a) {
  return null == a ? "" : String(a)
};
goog.string.buildString = function(a) {
  return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function(a, b) {
  for(var c = 0, d = goog.string.trim(String(a)).split("."), e = goog.string.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0;0 == c && g < f;g++) {
    var h = d[g] || "", i = e[g] || "", j = RegExp("(\\d*)(\\D*)", "g"), k = RegExp("(\\d*)(\\D*)", "g");
    do {
      var m = j.exec(h) || ["", "", ""], l = k.exec(i) || ["", "", ""];
      if(0 == m[0].length && 0 == l[0].length) {
        break
      }
      var c = 0 == m[1].length ? 0 : parseInt(m[1], 10), n = 0 == l[1].length ? 0 : parseInt(l[1], 10), c = goog.string.compareElements_(c, n) || goog.string.compareElements_(0 == m[2].length, 0 == l[2].length) || goog.string.compareElements_(m[2], l[2])
    }while(0 == c)
  }
  return c
};
goog.string.compareElements_ = function(a, b) {
  return a < b ? -1 : a > b ? 1 : 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(a) {
  for(var b = 0, c = 0;c < a.length;++c) {
    b = 31 * b + a.charCodeAt(c), b %= goog.string.HASHCODE_MAX_
  }
  return b
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
  return"goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(a) {
  var b = Number(a);
  return 0 == b && goog.string.isEmpty(a) ? NaN : b
};
goog.string.toCamelCase = function(a) {
  return String(a).replace(/\-([a-z])/g, function(a, c) {
    return c.toUpperCase()
  })
};
goog.string.toSelectorCase = function(a) {
  return String(a).replace(/([A-Z])/g, "-$1").toLowerCase()
};
goog.string.toTitleCase = function(a, b) {
  var c = goog.isString(b) ? goog.string.regExpEscape(b) : "\\s";
  return a.replace(RegExp("(^" + (c ? "|[" + c + "]+" : "") + ")([a-z])", "g"), function(a, b, c) {
    return b + c.toUpperCase()
  })
};
goog.string.parseInt = function(a) {
  isFinite(a) && (a = String(a));
  return goog.isString(a) ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN
};
goog.debug = {};
goog.debug.Error = function(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, goog.debug.Error) : this.stack = Error().stack || "";
  a && (this.message = String(a))
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, b) {
  b.unshift(a);
  goog.debug.Error.call(this, goog.string.subs.apply(null, b));
  b.shift();
  this.messagePattern = a
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.doAssertFailure_ = function(a, b, c, d) {
  var e = "Assertion failed";
  if(c) {
    var e = e + (": " + c), f = d
  }else {
    a && (e += ": " + a, f = b)
  }
  throw new goog.asserts.AssertionError("" + e, f || []);
};
goog.asserts.assert = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.fail = function(a, b) {
  if(goog.asserts.ENABLE_ASSERTS) {
    throw new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
  }
};
goog.asserts.assertNumber = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertString = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertFunction = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertObject = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertArray = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertBoolean = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertInstanceof = function(a, b, c, d) {
  goog.asserts.ENABLE_ASSERTS && !(a instanceof b) && goog.asserts.doAssertFailure_("instanceof check failed.", null, c, Array.prototype.slice.call(arguments, 3));
  return a
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = !0;
goog.array.peek = function(a) {
  return a[a.length - 1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.indexOf ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(a, b, c)
} : function(a, b, c) {
  c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if(goog.isString(a)) {
    return!goog.isString(b) || 1 != b.length ? -1 : a.indexOf(b, c)
  }
  for(;c < a.length;c++) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(a, b, null == c ? a.length - 1 : c)
} : function(a, b, c) {
  c = null == c ? a.length - 1 : c;
  0 > c && (c = Math.max(0, a.length + c));
  if(goog.isString(a)) {
    return!goog.isString(b) || 1 != b.length ? -1 : a.lastIndexOf(b, c)
  }
  for(;0 <= c;c--) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.forEach ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    f in e && b.call(c, e[f], f, a)
  }
};
goog.array.forEachRight = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;--d) {
    d in e && b.call(c, e[d], d, a)
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.filter ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0;h < d;h++) {
    if(h in g) {
      var i = g[h];
      b.call(c, i, h, a) && (e[f++] = i)
    }
  }
  return e
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.map ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.map.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = Array(d), f = goog.isString(a) ? a.split("") : a, g = 0;g < d;g++) {
    g in f && (e[g] = b.call(c, f[g], g, a))
  }
  return e
};
goog.array.reduce = function(a, b, c, d) {
  if(a.reduce) {
    return d ? a.reduce(goog.bind(b, d), c) : a.reduce(b, c)
  }
  var e = c;
  goog.array.forEach(a, function(c, g) {
    e = b.call(d, e, c, g, a)
  });
  return e
};
goog.array.reduceRight = function(a, b, c, d) {
  if(a.reduceRight) {
    return d ? a.reduceRight(goog.bind(b, d), c) : a.reduceRight(b, c)
  }
  var e = c;
  goog.array.forEachRight(a, function(c, g) {
    e = b.call(d, e, c, g, a)
  });
  return e
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.some ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.some.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && b.call(c, e[f], f, a)) {
      return!0
    }
  }
  return!1
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.every ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.every.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && !b.call(c, e[f], f, a)) {
      return!1
    }
  }
  return!0
};
goog.array.find = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndex = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && b.call(c, e[f], f, a)) {
      return f
    }
  }
  return-1
};
goog.array.findRight = function(a, b, c) {
  b = goog.array.findIndexRight(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndexRight = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;d--) {
    if(d in e && b.call(c, e[d], d, a)) {
      return d
    }
  }
  return-1
};
goog.array.contains = function(a, b) {
  return 0 <= goog.array.indexOf(a, b)
};
goog.array.isEmpty = function(a) {
  return 0 == a.length
};
goog.array.clear = function(a) {
  if(!goog.isArray(a)) {
    for(var b = a.length - 1;0 <= b;b--) {
      delete a[b]
    }
  }
  a.length = 0
};
goog.array.insert = function(a, b) {
  goog.array.contains(a, b) || a.push(b)
};
goog.array.insertAt = function(a, b, c) {
  goog.array.splice(a, c, 0, b)
};
goog.array.insertArrayAt = function(a, b, c) {
  goog.partial(goog.array.splice, a, c, 0).apply(null, b)
};
goog.array.insertBefore = function(a, b, c) {
  var d;
  2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d)
};
goog.array.remove = function(a, b) {
  var c = goog.array.indexOf(a, b), d;
  (d = 0 <= c) && goog.array.removeAt(a, c);
  return d
};
goog.array.removeAt = function(a, b) {
  goog.asserts.assert(null != a.length);
  return 1 == goog.array.ARRAY_PROTOTYPE_.splice.call(a, b, 1).length
};
goog.array.removeIf = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1
};
goog.array.concat = function(a) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
};
goog.array.toArray = function(a) {
  var b = a.length;
  if(0 < b) {
    for(var c = Array(b), d = 0;d < b;d++) {
      c[d] = a[d]
    }
    return c
  }
  return[]
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = arguments[c], e;
    if(goog.isArray(d) || (e = goog.isArrayLike(d)) && d.hasOwnProperty("callee")) {
      a.push.apply(a, d)
    }else {
      if(e) {
        for(var f = a.length, g = d.length, h = 0;h < g;h++) {
          a[f + h] = d[h]
        }
      }else {
        a.push(d)
      }
    }
  }
};
goog.array.splice = function(a, b, c, d) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(a, goog.array.slice(arguments, 1))
};
goog.array.slice = function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return 2 >= arguments.length ? goog.array.ARRAY_PROTOTYPE_.slice.call(a, b) : goog.array.ARRAY_PROTOTYPE_.slice.call(a, b, c)
};
goog.array.removeDuplicates = function(a, b) {
  for(var c = b || a, d = {}, e = 0, f = 0;f < a.length;) {
    var g = a[f++], h = goog.isObject(g) ? "o" + goog.getUid(g) : (typeof g).charAt(0) + g;
    Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, c[e++] = g)
  }
  c.length = e
};
goog.array.binarySearch = function(a, b, c) {
  return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b)
};
goog.array.binarySelect = function(a, b, c) {
  return goog.array.binarySearch_(a, b, !0, void 0, c)
};
goog.array.binarySearch_ = function(a, b, c, d, e) {
  for(var f = 0, g = a.length, h;f < g;) {
    var i = f + g >> 1, j;
    j = c ? b.call(e, a[i], i, a) : b(d, a[i]);
    0 < j ? f = i + 1 : (g = i, h = !j)
  }
  return h ? f : ~f
};
goog.array.sort = function(a, b) {
  goog.asserts.assert(null != a.length);
  goog.array.ARRAY_PROTOTYPE_.sort.call(a, b || goog.array.defaultCompare)
};
goog.array.stableSort = function(a, b) {
  for(var c = 0;c < a.length;c++) {
    a[c] = {index:c, value:a[c]}
  }
  var d = b || goog.array.defaultCompare;
  goog.array.sort(a, function(a, b) {
    return d(a.value, b.value) || a.index - b.index
  });
  for(c = 0;c < a.length;c++) {
    a[c] = a[c].value
  }
};
goog.array.sortObjectsByKey = function(a, b, c) {
  var d = c || goog.array.defaultCompare;
  goog.array.sort(a, function(a, c) {
    return d(a[b], c[b])
  })
};
goog.array.isSorted = function(a, b, c) {
  for(var b = b || goog.array.defaultCompare, d = 1;d < a.length;d++) {
    var e = b(a[d - 1], a[d]);
    if(0 < e || 0 == e && c) {
      return!1
    }
  }
  return!0
};
goog.array.equals = function(a, b, c) {
  if(!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) {
    return!1
  }
  for(var d = a.length, c = c || goog.array.defaultCompareEquality, e = 0;e < d;e++) {
    if(!c(a[e], b[e])) {
      return!1
    }
  }
  return!0
};
goog.array.compare = function(a, b, c) {
  return goog.array.equals(a, b, c)
};
goog.array.compare3 = function(a, b, c) {
  for(var c = c || goog.array.defaultCompare, d = Math.min(a.length, b.length), e = 0;e < d;e++) {
    var f = c(a[e], b[e]);
    if(0 != f) {
      return f
    }
  }
  return goog.array.defaultCompare(a.length, b.length)
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b
};
goog.array.binaryInsert = function(a, b, c) {
  c = goog.array.binarySearch(a, b, c);
  return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1
};
goog.array.binaryRemove = function(a, b, c) {
  b = goog.array.binarySearch(a, b, c);
  return 0 <= b ? goog.array.removeAt(a, b) : !1
};
goog.array.bucket = function(a, b) {
  for(var c = {}, d = 0;d < a.length;d++) {
    var e = a[d], f = b(e, d, a);
    goog.isDef(f) && (c[f] || (c[f] = [])).push(e)
  }
  return c
};
goog.array.repeat = function(a, b) {
  for(var c = [], d = 0;d < b;d++) {
    c[d] = a
  }
  return c
};
goog.array.flatten = function(a) {
  for(var b = [], c = 0;c < arguments.length;c++) {
    var d = arguments[c];
    goog.isArray(d) ? b.push.apply(b, goog.array.flatten.apply(null, d)) : b.push(d)
  }
  return b
};
goog.array.rotate = function(a, b) {
  goog.asserts.assert(null != a.length);
  a.length && (b %= a.length, 0 < b ? goog.array.ARRAY_PROTOTYPE_.unshift.apply(a, a.splice(-b, b)) : 0 > b && goog.array.ARRAY_PROTOTYPE_.push.apply(a, a.splice(0, -b)));
  return a
};
goog.array.zip = function(a) {
  if(!arguments.length) {
    return[]
  }
  for(var b = [], c = 0;;c++) {
    for(var d = [], e = 0;e < arguments.length;e++) {
      var f = arguments[e];
      if(c >= f.length) {
        return b
      }
      d.push(f[c])
    }
    b.push(d)
  }
};
goog.array.shuffle = function(a, b) {
  for(var c = b || Math.random, d = a.length - 1;0 < d;d--) {
    var e = Math.floor(c() * (d + 1)), f = a[d];
    a[d] = a[e];
    a[e] = f
  }
};
goog.object = {};
goog.object.forEach = function(a, b, c) {
  for(var d in a) {
    b.call(c, a[d], d, a)
  }
};
goog.object.filter = function(a, b, c) {
  var d = {}, e;
  for(e in a) {
    b.call(c, a[e], e, a) && (d[e] = a[e])
  }
  return d
};
goog.object.map = function(a, b, c) {
  var d = {}, e;
  for(e in a) {
    d[e] = b.call(c, a[e], e, a)
  }
  return d
};
goog.object.some = function(a, b, c) {
  for(var d in a) {
    if(b.call(c, a[d], d, a)) {
      return!0
    }
  }
  return!1
};
goog.object.every = function(a, b, c) {
  for(var d in a) {
    if(!b.call(c, a[d], d, a)) {
      return!1
    }
  }
  return!0
};
goog.object.getCount = function(a) {
  var b = 0, c;
  for(c in a) {
    b++
  }
  return b
};
goog.object.getAnyKey = function(a) {
  for(var b in a) {
    return b
  }
};
goog.object.getAnyValue = function(a) {
  for(var b in a) {
    return a[b]
  }
};
goog.object.contains = function(a, b) {
  return goog.object.containsValue(a, b)
};
goog.object.getValues = function(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = a[d]
  }
  return b
};
goog.object.getKeys = function(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = d
  }
  return b
};
goog.object.getValueByKeys = function(a, b) {
  for(var c = goog.isArrayLike(b), d = c ? b : arguments, c = c ? 0 : 1;c < d.length && !(a = a[d[c]], !goog.isDef(a));c++) {
  }
  return a
};
goog.object.containsKey = function(a, b) {
  return b in a
};
goog.object.containsValue = function(a, b) {
  for(var c in a) {
    if(a[c] == b) {
      return!0
    }
  }
  return!1
};
goog.object.findKey = function(a, b, c) {
  for(var d in a) {
    if(b.call(c, a[d], d, a)) {
      return d
    }
  }
};
goog.object.findValue = function(a, b, c) {
  return(b = goog.object.findKey(a, b, c)) && a[b]
};
goog.object.isEmpty = function(a) {
  for(var b in a) {
    return!1
  }
  return!0
};
goog.object.clear = function(a) {
  for(var b in a) {
    delete a[b]
  }
};
goog.object.remove = function(a, b) {
  var c;
  (c = b in a) && delete a[b];
  return c
};
goog.object.add = function(a, b, c) {
  if(b in a) {
    throw Error('The object already contains the key "' + b + '"');
  }
  goog.object.set(a, b, c)
};
goog.object.get = function(a, b, c) {
  return b in a ? a[b] : c
};
goog.object.set = function(a, b, c) {
  a[b] = c
};
goog.object.setIfUndefined = function(a, b, c) {
  return b in a ? a[b] : a[b] = c
};
goog.object.clone = function(a) {
  var b = {}, c;
  for(c in a) {
    b[c] = a[c]
  }
  return b
};
goog.object.unsafeClone = function(a) {
  var b = goog.typeOf(a);
  if("object" == b || "array" == b) {
    if(a.clone) {
      return a.clone()
    }
    var b = "array" == b ? [] : {}, c;
    for(c in a) {
      b[c] = goog.object.unsafeClone(a[c])
    }
    return b
  }
  return a
};
goog.object.transpose = function(a) {
  var b = {}, c;
  for(c in a) {
    b[a[c]] = c
  }
  return b
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function(a, b) {
  for(var c, d, e = 1;e < arguments.length;e++) {
    d = arguments[e];
    for(c in d) {
      a[c] = d[c]
    }
    for(var f = 0;f < goog.object.PROTOTYPE_FIELDS_.length;f++) {
      c = goog.object.PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }
};
goog.object.create = function(a) {
  var b = arguments.length;
  if(1 == b && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0])
  }
  if(b % 2) {
    throw Error("Uneven number of arguments");
  }
  for(var c = {}, d = 0;d < b;d += 2) {
    c[arguments[d]] = arguments[d + 1]
  }
  return c
};
goog.object.createSet = function(a) {
  var b = arguments.length;
  if(1 == b && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0])
  }
  for(var c = {}, d = 0;d < b;d++) {
    c[arguments[d]] = !0
  }
  return c
};
goog.string.format = function(a, b) {
  var c = Array.prototype.slice.call(arguments), d = c.shift();
  if("undefined" == typeof d) {
    throw Error("[goog.string.format] Template required");
  }
  return d.replace(/%([0\-\ \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g, function(a, b, d, h, i, j, k, m) {
    if("%" == j) {
      return"%"
    }
    var l = c.shift();
    if("undefined" == typeof l) {
      throw Error("[goog.string.format] Not enough arguments");
    }
    arguments[0] = l;
    return goog.string.format.demuxes_[j].apply(null, arguments)
  })
};
goog.string.format.demuxes_ = {};
goog.string.format.demuxes_.s = function(a, b, c) {
  return isNaN(c) || "" == c || a.length >= c ? a : a = -1 < b.indexOf("-", 0) ? a + goog.string.repeat(" ", c - a.length) : goog.string.repeat(" ", c - a.length) + a
};
goog.string.format.demuxes_.f = function(a, b, c, d, e) {
  d = a.toString();
  isNaN(e) || "" == e || (d = a.toFixed(e));
  var f;
  f = 0 > a ? "-" : 0 <= b.indexOf("+") ? "+" : 0 <= b.indexOf(" ") ? " " : "";
  0 <= a && (d = f + d);
  if(isNaN(c) || d.length >= c) {
    return d
  }
  d = isNaN(e) ? Math.abs(a).toString() : Math.abs(a).toFixed(e);
  a = c - d.length - f.length;
  0 <= b.indexOf("-", 0) ? d = f + d + goog.string.repeat(" ", a) : (b = 0 <= b.indexOf("0", 0) ? "0" : " ", d = f + goog.string.repeat(b, a) + d);
  return d
};
goog.string.format.demuxes_.d = function(a, b, c, d, e, f, g, h) {
  return goog.string.format.demuxes_.f(parseInt(a, 10), b, c, d, 0, f, g, h)
};
goog.string.format.demuxes_.i = goog.string.format.demuxes_.d;
goog.string.format.demuxes_.u = goog.string.format.demuxes_.d;
goog.string.StringBuffer = function(a, b) {
  null != a && this.append.apply(this, arguments)
};
goog.string.StringBuffer.prototype.buffer_ = "";
goog.string.StringBuffer.prototype.set = function(a) {
  this.buffer_ = "" + a
};
goog.string.StringBuffer.prototype.append = function(a, b, c) {
  this.buffer_ += a;
  if(null != b) {
    for(var d = 1;d < arguments.length;d++) {
      this.buffer_ += arguments[d]
    }
  }
  return this
};
goog.string.StringBuffer.prototype.clear = function() {
  this.buffer_ = ""
};
goog.string.StringBuffer.prototype.getLength = function() {
  return this.buffer_.length
};
goog.string.StringBuffer.prototype.toString = function() {
  return this.buffer_
};
var cljs = {core:{}};
cljs.core._STAR_unchecked_if_STAR_ = !1;
cljs.core._STAR_print_fn_STAR_ = function() {
  throw Error("No *print-fn* fn set for evaluation environment");
};
cljs.core.set_print_fn_BANG_ = function(a) {
  return cljs.core._STAR_print_fn_STAR_ = a
};
goog.exportSymbol("cljs.core.set_print_fn_BANG_", cljs.core.set_print_fn_BANG_);
cljs.core._STAR_flush_on_newline_STAR_ = !0;
cljs.core._STAR_print_readably_STAR_ = !0;
cljs.core._STAR_print_meta_STAR_ = !1;
cljs.core._STAR_print_dup_STAR_ = !1;
cljs.core.pr_opts = function() {
  return cljs.core.PersistentArrayMap.fromArray(["\ufdd0:flush-on-newline", cljs.core._STAR_flush_on_newline_STAR_, "\ufdd0:readably", cljs.core._STAR_print_readably_STAR_, "\ufdd0:meta", cljs.core._STAR_print_meta_STAR_, "\ufdd0:dup", cljs.core._STAR_print_dup_STAR_], !0)
};
cljs.core.truth_ = function(a) {
  return null != a && !1 !== a
};
cljs.core.not_native = null;
cljs.core.identical_QMARK_ = function(a, b) {
  return a === b
};
cljs.core.nil_QMARK_ = function(a) {
  return null == a
};
cljs.core.array_QMARK_ = function(a) {
  return a instanceof Array
};
cljs.core.number_QMARK_ = function(a) {
  return"number" === typeof a
};
cljs.core.not = function(a) {
  return cljs.core.truth_(a) ? !1 : !0
};
cljs.core.string_QMARK_ = function(a) {
  var b = goog.isString(a);
  return b ? "\ufdd0" !== a.charAt(0) : b
};
cljs.core.type_satisfies_ = function(a, b) {
  return a[goog.typeOf(null == b ? null : b)] ? !0 : a._ ? !0 : !1
};
cljs.core.is_proto_ = function(a) {
  return a.constructor.prototype === a
};
cljs.core._STAR_main_cli_fn_STAR_ = null;
cljs.core.type = function(a) {
  return null == a ? null : a.constructor
};
cljs.core.missing_protocol = function(a, b) {
  var c = cljs.core.type.call(null, b), c = cljs.core.truth_(cljs.core.truth_(c) ? c.cljs$lang$type : c) ? c.cljs$lang$ctorStr : goog.typeOf(b);
  return Error(["No protocol method ", a, " defined for type ", c, ": ", b].join(""))
};
cljs.core.aclone = function(a) {
  return a.slice()
};
cljs.core.array = function(a) {
  return Array.prototype.slice.call(arguments)
};
cljs.core.make_array = function() {
  var a = null, b = function(b, d) {
    return a.call(null, d)
  }, a = function(a, d) {
    switch(arguments.length) {
      case 1:
        return Array(a);
      case 2:
        return b.call(this, a, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return Array(a)
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  return a
}();
cljs.core.aget = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.apply.call(null, a, a.call(null, b, c), f)
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 2:
        return a[b];
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a[b]
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.aset = function(a, b, c) {
  return a[b] = c
};
cljs.core.alength = function(a) {
  return a.length
};
cljs.core.into_array = function() {
  var a = null, b = function(b) {
    return a.call(null, null, b)
  }, c = function(a, b) {
    return cljs.core.reduce.call(null, function(a, b) {
      a.push(b);
      return a
    }, [], b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.Fn = {};
cljs.core.IFn = {};
cljs.core._invoke = function() {
  var a = null, b = function(a) {
    var b;
    b = a ? a.cljs$core$IFn$_invoke$arity$1 : a;
    if(b) {
      return a.cljs$core$IFn$_invoke$arity$1(a)
    }
    b = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!b && (b = cljs.core._invoke._, !b)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return b.call(null, a)
  }, c = function(a, b) {
    var d;
    d = a ? a.cljs$core$IFn$_invoke$arity$2 : a;
    if(d) {
      return a.cljs$core$IFn$_invoke$arity$2(a, b)
    }
    d = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!d && (d = cljs.core._invoke._, !d)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return d.call(null, a, b)
  }, d = function(a, b, d) {
    var c;
    c = a ? a.cljs$core$IFn$_invoke$arity$3 : a;
    if(c) {
      return a.cljs$core$IFn$_invoke$arity$3(a, b, d)
    }
    c = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!c && (c = cljs.core._invoke._, !c)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return c.call(null, a, b, d)
  }, e = function(a, b, d, c) {
    var e;
    e = a ? a.cljs$core$IFn$_invoke$arity$4 : a;
    if(e) {
      return a.cljs$core$IFn$_invoke$arity$4(a, b, d, c)
    }
    e = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!e && (e = cljs.core._invoke._, !e)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return e.call(null, a, b, d, c)
  }, f = function(a, b, d, c, e) {
    var f;
    f = a ? a.cljs$core$IFn$_invoke$arity$5 : a;
    if(f) {
      return a.cljs$core$IFn$_invoke$arity$5(a, b, d, c, e)
    }
    f = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!f && (f = cljs.core._invoke._, !f)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return f.call(null, a, b, d, c, e)
  }, g = function(a, b, d, c, e, f) {
    var g;
    g = a ? a.cljs$core$IFn$_invoke$arity$6 : a;
    if(g) {
      return a.cljs$core$IFn$_invoke$arity$6(a, b, d, c, e, f)
    }
    g = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!g && (g = cljs.core._invoke._, !g)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return g.call(null, a, b, d, c, e, f)
  }, h = function(a, b, d, c, e, f, g) {
    var h;
    h = a ? a.cljs$core$IFn$_invoke$arity$7 : a;
    if(h) {
      return a.cljs$core$IFn$_invoke$arity$7(a, b, d, c, e, f, g)
    }
    h = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!h && (h = cljs.core._invoke._, !h)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return h.call(null, a, b, d, c, e, f, g)
  }, i = function(a, b, d, c, e, f, g, h) {
    var i;
    i = a ? a.cljs$core$IFn$_invoke$arity$8 : a;
    if(i) {
      return a.cljs$core$IFn$_invoke$arity$8(a, b, d, c, e, f, g, h)
    }
    i = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!i && (i = cljs.core._invoke._, !i)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return i.call(null, a, b, d, c, e, f, g, h)
  }, j = function(a, b, d, c, e, f, g, h, i) {
    var j;
    j = a ? a.cljs$core$IFn$_invoke$arity$9 : a;
    if(j) {
      return a.cljs$core$IFn$_invoke$arity$9(a, b, d, c, e, f, g, h, i)
    }
    j = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!j && (j = cljs.core._invoke._, !j)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return j.call(null, a, b, d, c, e, f, g, h, i)
  }, k = function(a, b, d, c, e, f, g, h, i, j) {
    var k;
    k = a ? a.cljs$core$IFn$_invoke$arity$10 : a;
    if(k) {
      return a.cljs$core$IFn$_invoke$arity$10(a, b, d, c, e, f, g, h, i, j)
    }
    k = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!k && (k = cljs.core._invoke._, !k)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return k.call(null, a, b, d, c, e, f, g, h, i, j)
  }, m = function(a, b, d, c, e, f, g, h, i, j, k) {
    var m;
    m = a ? a.cljs$core$IFn$_invoke$arity$11 : a;
    if(m) {
      return a.cljs$core$IFn$_invoke$arity$11(a, b, d, c, e, f, g, h, i, j, k)
    }
    m = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!m && (m = cljs.core._invoke._, !m)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return m.call(null, a, b, d, c, e, f, g, h, i, j, k)
  }, l = function(a, b, d, c, e, f, g, h, i, j, k, m) {
    var l;
    l = a ? a.cljs$core$IFn$_invoke$arity$12 : a;
    if(l) {
      return a.cljs$core$IFn$_invoke$arity$12(a, b, d, c, e, f, g, h, i, j, k, m)
    }
    l = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!l && (l = cljs.core._invoke._, !l)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return l.call(null, a, b, d, c, e, f, g, h, i, j, k, m)
  }, n = function(a, b, d, c, e, f, g, h, i, j, k, m, l) {
    var n;
    n = a ? a.cljs$core$IFn$_invoke$arity$13 : a;
    if(n) {
      return a.cljs$core$IFn$_invoke$arity$13(a, b, d, c, e, f, g, h, i, j, k, m, l)
    }
    n = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!n && (n = cljs.core._invoke._, !n)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return n.call(null, a, b, d, c, e, f, g, h, i, j, k, m, l)
  }, p = function(a, b, d, c, e, f, g, h, i, j, k, m, l, n) {
    var p;
    p = a ? a.cljs$core$IFn$_invoke$arity$14 : a;
    if(p) {
      return a.cljs$core$IFn$_invoke$arity$14(a, b, d, c, e, f, g, h, i, j, k, m, l, n)
    }
    p = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!p && (p = cljs.core._invoke._, !p)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return p.call(null, a, b, d, c, e, f, g, h, i, j, k, m, l, n)
  }, q = function(a, b, d, c, e, f, g, h, i, j, k, m, l, n, p) {
    var q;
    q = a ? a.cljs$core$IFn$_invoke$arity$15 : a;
    if(q) {
      return a.cljs$core$IFn$_invoke$arity$15(a, b, d, c, e, f, g, h, i, j, k, m, l, n, p)
    }
    q = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!q && (q = cljs.core._invoke._, !q)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return q.call(null, a, b, d, c, e, f, g, h, i, j, k, m, l, n, p)
  }, r = function(a, b, d, c, e, f, g, h, i, j, k, m, l, n, p, q) {
    var s;
    s = a ? a.cljs$core$IFn$_invoke$arity$16 : a;
    if(s) {
      return a.cljs$core$IFn$_invoke$arity$16(a, b, d, c, e, f, g, h, i, j, k, m, l, n, p, q)
    }
    s = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!s && (s = cljs.core._invoke._, !s)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return s.call(null, a, b, d, c, e, f, g, h, i, j, k, m, l, n, p, q)
  }, s = function(a, b, d, c, e, f, g, h, i, j, k, m, l, n, p, q, s) {
    var r;
    r = a ? a.cljs$core$IFn$_invoke$arity$17 : a;
    if(r) {
      return a.cljs$core$IFn$_invoke$arity$17(a, b, d, c, e, f, g, h, i, j, k, m, l, n, p, q, s)
    }
    r = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!r && (r = cljs.core._invoke._, !r)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return r.call(null, a, b, d, c, e, f, g, h, i, j, k, m, l, n, p, q, s)
  }, t = function(a, b, d, c, e, f, g, h, i, j, k, m, l, n, p, q, s, r) {
    var t;
    t = a ? a.cljs$core$IFn$_invoke$arity$18 : a;
    if(t) {
      return a.cljs$core$IFn$_invoke$arity$18(a, b, d, c, e, f, g, h, i, j, k, m, l, n, p, q, s, r)
    }
    t = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!t && (t = cljs.core._invoke._, !t)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return t.call(null, a, b, d, c, e, f, g, h, i, j, k, m, l, n, p, q, s, r)
  }, u = function(a, b, d, c, e, f, g, h, i, j, k, m, l, n, p, q, s, r, t) {
    var u;
    u = a ? a.cljs$core$IFn$_invoke$arity$19 : a;
    if(u) {
      return a.cljs$core$IFn$_invoke$arity$19(a, b, d, c, e, f, g, h, i, j, k, m, l, n, p, q, s, r, t)
    }
    u = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!u && (u = cljs.core._invoke._, !u)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return u.call(null, a, b, d, c, e, f, g, h, i, j, k, m, l, n, p, q, s, r, t)
  }, w = function(a, b, d, c, e, f, g, h, i, j, k, m, l, n, p, q, s, r, t, u) {
    var w;
    w = a ? a.cljs$core$IFn$_invoke$arity$20 : a;
    if(w) {
      return a.cljs$core$IFn$_invoke$arity$20(a, b, d, c, e, f, g, h, i, j, k, m, l, n, p, q, s, r, t, u)
    }
    w = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!w && (w = cljs.core._invoke._, !w)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return w.call(null, a, b, d, c, e, f, g, h, i, j, k, m, l, n, p, q, s, r, t, u)
  }, D = function(a, b, d, c, e, f, g, h, i, j, k, m, l, n, p, q, s, r, t, u, w) {
    var D;
    D = a ? a.cljs$core$IFn$_invoke$arity$21 : a;
    if(D) {
      return a.cljs$core$IFn$_invoke$arity$21(a, b, d, c, e, f, g, h, i, j, k, m, l, n, p, q, s, r, t, u, w)
    }
    D = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!D && (D = cljs.core._invoke._, !D)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return D.call(null, a, b, d, c, e, f, g, h, i, j, k, m, l, n, p, q, s, r, t, u, w)
  }, a = function(a, v, x, y, z, A, C, E, F, B, G, H, I, J, K, L, M, N, O, Z, $) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, v);
      case 3:
        return d.call(this, a, v, x);
      case 4:
        return e.call(this, a, v, x, y);
      case 5:
        return f.call(this, a, v, x, y, z);
      case 6:
        return g.call(this, a, v, x, y, z, A);
      case 7:
        return h.call(this, a, v, x, y, z, A, C);
      case 8:
        return i.call(this, a, v, x, y, z, A, C, E);
      case 9:
        return j.call(this, a, v, x, y, z, A, C, E, F);
      case 10:
        return k.call(this, a, v, x, y, z, A, C, E, F, B);
      case 11:
        return m.call(this, a, v, x, y, z, A, C, E, F, B, G);
      case 12:
        return l.call(this, a, v, x, y, z, A, C, E, F, B, G, H);
      case 13:
        return n.call(this, a, v, x, y, z, A, C, E, F, B, G, H, I);
      case 14:
        return p.call(this, a, v, x, y, z, A, C, E, F, B, G, H, I, J);
      case 15:
        return q.call(this, a, v, x, y, z, A, C, E, F, B, G, H, I, J, K);
      case 16:
        return r.call(this, a, v, x, y, z, A, C, E, F, B, G, H, I, J, K, L);
      case 17:
        return s.call(this, a, v, x, y, z, A, C, E, F, B, G, H, I, J, K, L, M);
      case 18:
        return t.call(this, a, v, x, y, z, A, C, E, F, B, G, H, I, J, K, L, M, N);
      case 19:
        return u.call(this, a, v, x, y, z, A, C, E, F, B, G, H, I, J, K, L, M, N, O);
      case 20:
        return w.call(this, a, v, x, y, z, A, C, E, F, B, G, H, I, J, K, L, M, N, O, Z);
      case 21:
        return D.call(this, a, v, x, y, z, A, C, E, F, B, G, H, I, J, K, L, M, N, O, Z, $)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$4 = e;
  a.cljs$core$IFn$_invoke$arity$5 = f;
  a.cljs$core$IFn$_invoke$arity$6 = g;
  a.cljs$core$IFn$_invoke$arity$7 = h;
  a.cljs$core$IFn$_invoke$arity$8 = i;
  a.cljs$core$IFn$_invoke$arity$9 = j;
  a.cljs$core$IFn$_invoke$arity$10 = k;
  a.cljs$core$IFn$_invoke$arity$11 = m;
  a.cljs$core$IFn$_invoke$arity$12 = l;
  a.cljs$core$IFn$_invoke$arity$13 = n;
  a.cljs$core$IFn$_invoke$arity$14 = p;
  a.cljs$core$IFn$_invoke$arity$15 = q;
  a.cljs$core$IFn$_invoke$arity$16 = r;
  a.cljs$core$IFn$_invoke$arity$17 = s;
  a.cljs$core$IFn$_invoke$arity$18 = t;
  a.cljs$core$IFn$_invoke$arity$19 = u;
  a.cljs$core$IFn$_invoke$arity$20 = w;
  a.cljs$core$IFn$_invoke$arity$21 = D;
  return a
}();
cljs.core.ICounted = {};
cljs.core._count = function(a) {
  var b;
  b = a ? a.cljs$core$ICounted$_count$arity$1 : a;
  if(b) {
    return a.cljs$core$ICounted$_count$arity$1(a)
  }
  b = cljs.core._count[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._count._, !b)) {
    throw cljs.core.missing_protocol.call(null, "ICounted.-count", a);
  }
  return b.call(null, a)
};
cljs.core.IEmptyableCollection = {};
cljs.core._empty = function(a) {
  var b;
  b = a ? a.cljs$core$IEmptyableCollection$_empty$arity$1 : a;
  if(b) {
    return a.cljs$core$IEmptyableCollection$_empty$arity$1(a)
  }
  b = cljs.core._empty[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._empty._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IEmptyableCollection.-empty", a);
  }
  return b.call(null, a)
};
cljs.core.ICollection = {};
cljs.core._conj = function(a, b) {
  var c;
  c = a ? a.cljs$core$ICollection$_conj$arity$2 : a;
  if(c) {
    return a.cljs$core$ICollection$_conj$arity$2(a, b)
  }
  c = cljs.core._conj[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._conj._, !c)) {
    throw cljs.core.missing_protocol.call(null, "ICollection.-conj", a);
  }
  return c.call(null, a, b)
};
cljs.core.IIndexed = {};
cljs.core._nth = function() {
  var a = null, b = function(a, b) {
    var c;
    c = a ? a.cljs$core$IIndexed$_nth$arity$2 : a;
    if(c) {
      return a.cljs$core$IIndexed$_nth$arity$2(a, b)
    }
    c = cljs.core._nth[goog.typeOf(null == a ? null : a)];
    if(!c && (c = cljs.core._nth._, !c)) {
      throw cljs.core.missing_protocol.call(null, "IIndexed.-nth", a);
    }
    return c.call(null, a, b)
  }, c = function(a, b, c) {
    var g;
    g = a ? a.cljs$core$IIndexed$_nth$arity$3 : a;
    if(g) {
      return a.cljs$core$IIndexed$_nth$arity$3(a, b, c)
    }
    g = cljs.core._nth[goog.typeOf(null == a ? null : a)];
    if(!g && (g = cljs.core._nth._, !g)) {
      throw cljs.core.missing_protocol.call(null, "IIndexed.-nth", a);
    }
    return g.call(null, a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.ASeq = {};
cljs.core.ISeq = {};
cljs.core._first = function(a) {
  var b;
  b = a ? a.cljs$core$ISeq$_first$arity$1 : a;
  if(b) {
    return a.cljs$core$ISeq$_first$arity$1(a)
  }
  b = cljs.core._first[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._first._, !b)) {
    throw cljs.core.missing_protocol.call(null, "ISeq.-first", a);
  }
  return b.call(null, a)
};
cljs.core._rest = function(a) {
  var b;
  b = a ? a.cljs$core$ISeq$_rest$arity$1 : a;
  if(b) {
    return a.cljs$core$ISeq$_rest$arity$1(a)
  }
  b = cljs.core._rest[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._rest._, !b)) {
    throw cljs.core.missing_protocol.call(null, "ISeq.-rest", a);
  }
  return b.call(null, a)
};
cljs.core.INext = {};
cljs.core._next = function(a) {
  var b;
  b = a ? a.cljs$core$INext$_next$arity$1 : a;
  if(b) {
    return a.cljs$core$INext$_next$arity$1(a)
  }
  b = cljs.core._next[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._next._, !b)) {
    throw cljs.core.missing_protocol.call(null, "INext.-next", a);
  }
  return b.call(null, a)
};
cljs.core.ILookup = {};
cljs.core._lookup = function() {
  var a = null, b = function(a, b) {
    var c;
    c = a ? a.cljs$core$ILookup$_lookup$arity$2 : a;
    if(c) {
      return a.cljs$core$ILookup$_lookup$arity$2(a, b)
    }
    c = cljs.core._lookup[goog.typeOf(null == a ? null : a)];
    if(!c && (c = cljs.core._lookup._, !c)) {
      throw cljs.core.missing_protocol.call(null, "ILookup.-lookup", a);
    }
    return c.call(null, a, b)
  }, c = function(a, b, c) {
    var g;
    g = a ? a.cljs$core$ILookup$_lookup$arity$3 : a;
    if(g) {
      return a.cljs$core$ILookup$_lookup$arity$3(a, b, c)
    }
    g = cljs.core._lookup[goog.typeOf(null == a ? null : a)];
    if(!g && (g = cljs.core._lookup._, !g)) {
      throw cljs.core.missing_protocol.call(null, "ILookup.-lookup", a);
    }
    return g.call(null, a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.IAssociative = {};
cljs.core._contains_key_QMARK_ = function(a, b) {
  var c;
  c = a ? a.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 : a;
  if(c) {
    return a.cljs$core$IAssociative$_contains_key_QMARK_$arity$2(a, b)
  }
  c = cljs.core._contains_key_QMARK_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._contains_key_QMARK_._, !c)) {
    throw cljs.core.missing_protocol.call(null, "IAssociative.-contains-key?", a);
  }
  return c.call(null, a, b)
};
cljs.core._assoc = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IAssociative$_assoc$arity$3 : a;
  if(d) {
    return a.cljs$core$IAssociative$_assoc$arity$3(a, b, c)
  }
  d = cljs.core._assoc[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._assoc._, !d)) {
    throw cljs.core.missing_protocol.call(null, "IAssociative.-assoc", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.IMap = {};
cljs.core._dissoc = function(a, b) {
  var c;
  c = a ? a.cljs$core$IMap$_dissoc$arity$2 : a;
  if(c) {
    return a.cljs$core$IMap$_dissoc$arity$2(a, b)
  }
  c = cljs.core._dissoc[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._dissoc._, !c)) {
    throw cljs.core.missing_protocol.call(null, "IMap.-dissoc", a);
  }
  return c.call(null, a, b)
};
cljs.core.IMapEntry = {};
cljs.core._key = function(a) {
  var b;
  b = a ? a.cljs$core$IMapEntry$_key$arity$1 : a;
  if(b) {
    return a.cljs$core$IMapEntry$_key$arity$1(a)
  }
  b = cljs.core._key[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._key._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IMapEntry.-key", a);
  }
  return b.call(null, a)
};
cljs.core._val = function(a) {
  var b;
  b = a ? a.cljs$core$IMapEntry$_val$arity$1 : a;
  if(b) {
    return a.cljs$core$IMapEntry$_val$arity$1(a)
  }
  b = cljs.core._val[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._val._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IMapEntry.-val", a);
  }
  return b.call(null, a)
};
cljs.core.ISet = {};
cljs.core._disjoin = function(a, b) {
  var c;
  c = a ? a.cljs$core$ISet$_disjoin$arity$2 : a;
  if(c) {
    return a.cljs$core$ISet$_disjoin$arity$2(a, b)
  }
  c = cljs.core._disjoin[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._disjoin._, !c)) {
    throw cljs.core.missing_protocol.call(null, "ISet.-disjoin", a);
  }
  return c.call(null, a, b)
};
cljs.core.IStack = {};
cljs.core._peek = function(a) {
  var b;
  b = a ? a.cljs$core$IStack$_peek$arity$1 : a;
  if(b) {
    return a.cljs$core$IStack$_peek$arity$1(a)
  }
  b = cljs.core._peek[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._peek._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IStack.-peek", a);
  }
  return b.call(null, a)
};
cljs.core._pop = function(a) {
  var b;
  b = a ? a.cljs$core$IStack$_pop$arity$1 : a;
  if(b) {
    return a.cljs$core$IStack$_pop$arity$1(a)
  }
  b = cljs.core._pop[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._pop._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IStack.-pop", a);
  }
  return b.call(null, a)
};
cljs.core.IVector = {};
cljs.core._assoc_n = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IVector$_assoc_n$arity$3 : a;
  if(d) {
    return a.cljs$core$IVector$_assoc_n$arity$3(a, b, c)
  }
  d = cljs.core._assoc_n[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._assoc_n._, !d)) {
    throw cljs.core.missing_protocol.call(null, "IVector.-assoc-n", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.IDeref = {};
cljs.core._deref = function(a) {
  var b;
  b = a ? a.cljs$core$IDeref$_deref$arity$1 : a;
  if(b) {
    return a.cljs$core$IDeref$_deref$arity$1(a)
  }
  b = cljs.core._deref[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._deref._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IDeref.-deref", a);
  }
  return b.call(null, a)
};
cljs.core.IDerefWithTimeout = {};
cljs.core._deref_with_timeout = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3 : a;
  if(d) {
    return a.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3(a, b, c)
  }
  d = cljs.core._deref_with_timeout[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._deref_with_timeout._, !d)) {
    throw cljs.core.missing_protocol.call(null, "IDerefWithTimeout.-deref-with-timeout", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.IMeta = {};
cljs.core._meta = function(a) {
  var b;
  b = a ? a.cljs$core$IMeta$_meta$arity$1 : a;
  if(b) {
    return a.cljs$core$IMeta$_meta$arity$1(a)
  }
  b = cljs.core._meta[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._meta._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IMeta.-meta", a);
  }
  return b.call(null, a)
};
cljs.core.IWithMeta = {};
cljs.core._with_meta = function(a, b) {
  var c;
  c = a ? a.cljs$core$IWithMeta$_with_meta$arity$2 : a;
  if(c) {
    return a.cljs$core$IWithMeta$_with_meta$arity$2(a, b)
  }
  c = cljs.core._with_meta[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._with_meta._, !c)) {
    throw cljs.core.missing_protocol.call(null, "IWithMeta.-with-meta", a);
  }
  return c.call(null, a, b)
};
cljs.core.IReduce = {};
cljs.core._reduce = function() {
  var a = null, b = function(a, b) {
    var c;
    c = a ? a.cljs$core$IReduce$_reduce$arity$2 : a;
    if(c) {
      return a.cljs$core$IReduce$_reduce$arity$2(a, b)
    }
    c = cljs.core._reduce[goog.typeOf(null == a ? null : a)];
    if(!c && (c = cljs.core._reduce._, !c)) {
      throw cljs.core.missing_protocol.call(null, "IReduce.-reduce", a);
    }
    return c.call(null, a, b)
  }, c = function(a, b, c) {
    var g;
    g = a ? a.cljs$core$IReduce$_reduce$arity$3 : a;
    if(g) {
      return a.cljs$core$IReduce$_reduce$arity$3(a, b, c)
    }
    g = cljs.core._reduce[goog.typeOf(null == a ? null : a)];
    if(!g && (g = cljs.core._reduce._, !g)) {
      throw cljs.core.missing_protocol.call(null, "IReduce.-reduce", a);
    }
    return g.call(null, a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.IKVReduce = {};
cljs.core._kv_reduce = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IKVReduce$_kv_reduce$arity$3 : a;
  if(d) {
    return a.cljs$core$IKVReduce$_kv_reduce$arity$3(a, b, c)
  }
  d = cljs.core._kv_reduce[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._kv_reduce._, !d)) {
    throw cljs.core.missing_protocol.call(null, "IKVReduce.-kv-reduce", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.IEquiv = {};
cljs.core._equiv = function(a, b) {
  var c;
  c = a ? a.cljs$core$IEquiv$_equiv$arity$2 : a;
  if(c) {
    return a.cljs$core$IEquiv$_equiv$arity$2(a, b)
  }
  c = cljs.core._equiv[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._equiv._, !c)) {
    throw cljs.core.missing_protocol.call(null, "IEquiv.-equiv", a);
  }
  return c.call(null, a, b)
};
cljs.core.IHash = {};
cljs.core._hash = function(a) {
  var b;
  b = a ? a.cljs$core$IHash$_hash$arity$1 : a;
  if(b) {
    return a.cljs$core$IHash$_hash$arity$1(a)
  }
  b = cljs.core._hash[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._hash._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IHash.-hash", a);
  }
  return b.call(null, a)
};
cljs.core.ISeqable = {};
cljs.core._seq = function(a) {
  var b;
  b = a ? a.cljs$core$ISeqable$_seq$arity$1 : a;
  if(b) {
    return a.cljs$core$ISeqable$_seq$arity$1(a)
  }
  b = cljs.core._seq[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._seq._, !b)) {
    throw cljs.core.missing_protocol.call(null, "ISeqable.-seq", a);
  }
  return b.call(null, a)
};
cljs.core.ISequential = {};
cljs.core.IList = {};
cljs.core.IRecord = {};
cljs.core.IReversible = {};
cljs.core._rseq = function(a) {
  var b;
  b = a ? a.cljs$core$IReversible$_rseq$arity$1 : a;
  if(b) {
    return a.cljs$core$IReversible$_rseq$arity$1(a)
  }
  b = cljs.core._rseq[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._rseq._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IReversible.-rseq", a);
  }
  return b.call(null, a)
};
cljs.core.ISorted = {};
cljs.core._sorted_seq = function(a, b) {
  var c;
  c = a ? a.cljs$core$ISorted$_sorted_seq$arity$2 : a;
  if(c) {
    return a.cljs$core$ISorted$_sorted_seq$arity$2(a, b)
  }
  c = cljs.core._sorted_seq[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._sorted_seq._, !c)) {
    throw cljs.core.missing_protocol.call(null, "ISorted.-sorted-seq", a);
  }
  return c.call(null, a, b)
};
cljs.core._sorted_seq_from = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$ISorted$_sorted_seq_from$arity$3 : a;
  if(d) {
    return a.cljs$core$ISorted$_sorted_seq_from$arity$3(a, b, c)
  }
  d = cljs.core._sorted_seq_from[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._sorted_seq_from._, !d)) {
    throw cljs.core.missing_protocol.call(null, "ISorted.-sorted-seq-from", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._entry_key = function(a, b) {
  var c;
  c = a ? a.cljs$core$ISorted$_entry_key$arity$2 : a;
  if(c) {
    return a.cljs$core$ISorted$_entry_key$arity$2(a, b)
  }
  c = cljs.core._entry_key[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._entry_key._, !c)) {
    throw cljs.core.missing_protocol.call(null, "ISorted.-entry-key", a);
  }
  return c.call(null, a, b)
};
cljs.core._comparator = function(a) {
  var b;
  b = a ? a.cljs$core$ISorted$_comparator$arity$1 : a;
  if(b) {
    return a.cljs$core$ISorted$_comparator$arity$1(a)
  }
  b = cljs.core._comparator[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._comparator._, !b)) {
    throw cljs.core.missing_protocol.call(null, "ISorted.-comparator", a);
  }
  return b.call(null, a)
};
cljs.core.IWriter = {};
cljs.core._write = function(a, b) {
  var c;
  c = a ? a.cljs$core$IWriter$_write$arity$2 : a;
  if(c) {
    return a.cljs$core$IWriter$_write$arity$2(a, b)
  }
  c = cljs.core._write[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._write._, !c)) {
    throw cljs.core.missing_protocol.call(null, "IWriter.-write", a);
  }
  return c.call(null, a, b)
};
cljs.core._flush = function(a) {
  var b;
  b = a ? a.cljs$core$IWriter$_flush$arity$1 : a;
  if(b) {
    return a.cljs$core$IWriter$_flush$arity$1(a)
  }
  b = cljs.core._flush[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._flush._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IWriter.-flush", a);
  }
  return b.call(null, a)
};
cljs.core.IPrintWithWriter = {};
cljs.core._pr_writer = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IPrintWithWriter$_pr_writer$arity$3 : a;
  if(d) {
    return a.cljs$core$IPrintWithWriter$_pr_writer$arity$3(a, b, c)
  }
  d = cljs.core._pr_writer[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._pr_writer._, !d)) {
    throw cljs.core.missing_protocol.call(null, "IPrintWithWriter.-pr-writer", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.IPending = {};
cljs.core._realized_QMARK_ = function(a) {
  var b;
  b = a ? a.cljs$core$IPending$_realized_QMARK_$arity$1 : a;
  if(b) {
    return a.cljs$core$IPending$_realized_QMARK_$arity$1(a)
  }
  b = cljs.core._realized_QMARK_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._realized_QMARK_._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IPending.-realized?", a);
  }
  return b.call(null, a)
};
cljs.core.IWatchable = {};
cljs.core._notify_watches = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IWatchable$_notify_watches$arity$3 : a;
  if(d) {
    return a.cljs$core$IWatchable$_notify_watches$arity$3(a, b, c)
  }
  d = cljs.core._notify_watches[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._notify_watches._, !d)) {
    throw cljs.core.missing_protocol.call(null, "IWatchable.-notify-watches", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._add_watch = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IWatchable$_add_watch$arity$3 : a;
  if(d) {
    return a.cljs$core$IWatchable$_add_watch$arity$3(a, b, c)
  }
  d = cljs.core._add_watch[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._add_watch._, !d)) {
    throw cljs.core.missing_protocol.call(null, "IWatchable.-add-watch", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._remove_watch = function(a, b) {
  var c;
  c = a ? a.cljs$core$IWatchable$_remove_watch$arity$2 : a;
  if(c) {
    return a.cljs$core$IWatchable$_remove_watch$arity$2(a, b)
  }
  c = cljs.core._remove_watch[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._remove_watch._, !c)) {
    throw cljs.core.missing_protocol.call(null, "IWatchable.-remove-watch", a);
  }
  return c.call(null, a, b)
};
cljs.core.IEditableCollection = {};
cljs.core._as_transient = function(a) {
  var b;
  b = a ? a.cljs$core$IEditableCollection$_as_transient$arity$1 : a;
  if(b) {
    return a.cljs$core$IEditableCollection$_as_transient$arity$1(a)
  }
  b = cljs.core._as_transient[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._as_transient._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IEditableCollection.-as-transient", a);
  }
  return b.call(null, a)
};
cljs.core.ITransientCollection = {};
cljs.core._conj_BANG_ = function(a, b) {
  var c;
  c = a ? a.cljs$core$ITransientCollection$_conj_BANG_$arity$2 : a;
  if(c) {
    return a.cljs$core$ITransientCollection$_conj_BANG_$arity$2(a, b)
  }
  c = cljs.core._conj_BANG_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._conj_BANG_._, !c)) {
    throw cljs.core.missing_protocol.call(null, "ITransientCollection.-conj!", a);
  }
  return c.call(null, a, b)
};
cljs.core._persistent_BANG_ = function(a) {
  var b;
  b = a ? a.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 : a;
  if(b) {
    return a.cljs$core$ITransientCollection$_persistent_BANG_$arity$1(a)
  }
  b = cljs.core._persistent_BANG_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._persistent_BANG_._, !b)) {
    throw cljs.core.missing_protocol.call(null, "ITransientCollection.-persistent!", a);
  }
  return b.call(null, a)
};
cljs.core.ITransientAssociative = {};
cljs.core._assoc_BANG_ = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 : a;
  if(d) {
    return a.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(a, b, c)
  }
  d = cljs.core._assoc_BANG_[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._assoc_BANG_._, !d)) {
    throw cljs.core.missing_protocol.call(null, "ITransientAssociative.-assoc!", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.ITransientMap = {};
cljs.core._dissoc_BANG_ = function(a, b) {
  var c;
  c = a ? a.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 : a;
  if(c) {
    return a.cljs$core$ITransientMap$_dissoc_BANG_$arity$2(a, b)
  }
  c = cljs.core._dissoc_BANG_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._dissoc_BANG_._, !c)) {
    throw cljs.core.missing_protocol.call(null, "ITransientMap.-dissoc!", a);
  }
  return c.call(null, a, b)
};
cljs.core.ITransientVector = {};
cljs.core._assoc_n_BANG_ = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3 : a;
  if(d) {
    return a.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(a, b, c)
  }
  d = cljs.core._assoc_n_BANG_[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._assoc_n_BANG_._, !d)) {
    throw cljs.core.missing_protocol.call(null, "ITransientVector.-assoc-n!", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._pop_BANG_ = function(a) {
  var b;
  b = a ? a.cljs$core$ITransientVector$_pop_BANG_$arity$1 : a;
  if(b) {
    return a.cljs$core$ITransientVector$_pop_BANG_$arity$1(a)
  }
  b = cljs.core._pop_BANG_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._pop_BANG_._, !b)) {
    throw cljs.core.missing_protocol.call(null, "ITransientVector.-pop!", a);
  }
  return b.call(null, a)
};
cljs.core.ITransientSet = {};
cljs.core._disjoin_BANG_ = function(a, b) {
  var c;
  c = a ? a.cljs$core$ITransientSet$_disjoin_BANG_$arity$2 : a;
  if(c) {
    return a.cljs$core$ITransientSet$_disjoin_BANG_$arity$2(a, b)
  }
  c = cljs.core._disjoin_BANG_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._disjoin_BANG_._, !c)) {
    throw cljs.core.missing_protocol.call(null, "ITransientSet.-disjoin!", a);
  }
  return c.call(null, a, b)
};
cljs.core.IComparable = {};
cljs.core._compare = function(a, b) {
  var c;
  c = a ? a.cljs$core$IComparable$_compare$arity$2 : a;
  if(c) {
    return a.cljs$core$IComparable$_compare$arity$2(a, b)
  }
  c = cljs.core._compare[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._compare._, !c)) {
    throw cljs.core.missing_protocol.call(null, "IComparable.-compare", a);
  }
  return c.call(null, a, b)
};
cljs.core.IChunk = {};
cljs.core._drop_first = function(a) {
  var b;
  b = a ? a.cljs$core$IChunk$_drop_first$arity$1 : a;
  if(b) {
    return a.cljs$core$IChunk$_drop_first$arity$1(a)
  }
  b = cljs.core._drop_first[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._drop_first._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IChunk.-drop-first", a);
  }
  return b.call(null, a)
};
cljs.core.IChunkedSeq = {};
cljs.core._chunked_first = function(a) {
  var b;
  b = a ? a.cljs$core$IChunkedSeq$_chunked_first$arity$1 : a;
  if(b) {
    return a.cljs$core$IChunkedSeq$_chunked_first$arity$1(a)
  }
  b = cljs.core._chunked_first[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._chunked_first._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IChunkedSeq.-chunked-first", a);
  }
  return b.call(null, a)
};
cljs.core._chunked_rest = function(a) {
  var b;
  b = a ? a.cljs$core$IChunkedSeq$_chunked_rest$arity$1 : a;
  if(b) {
    return a.cljs$core$IChunkedSeq$_chunked_rest$arity$1(a)
  }
  b = cljs.core._chunked_rest[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._chunked_rest._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IChunkedSeq.-chunked-rest", a);
  }
  return b.call(null, a)
};
cljs.core.IChunkedNext = {};
cljs.core._chunked_next = function(a) {
  var b;
  b = a ? a.cljs$core$IChunkedNext$_chunked_next$arity$1 : a;
  if(b) {
    return a.cljs$core$IChunkedNext$_chunked_next$arity$1(a)
  }
  b = cljs.core._chunked_next[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._chunked_next._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IChunkedNext.-chunked-next", a);
  }
  return b.call(null, a)
};
cljs.core.INamed = {};
cljs.core._name = function(a) {
  var b;
  b = a ? a.cljs$core$INamed$_name$arity$1 : a;
  if(b) {
    return a.cljs$core$INamed$_name$arity$1(a)
  }
  b = cljs.core._name[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._name._, !b)) {
    throw cljs.core.missing_protocol.call(null, "INamed.-name", a);
  }
  return b.call(null, a)
};
cljs.core._namespace = function(a) {
  var b;
  b = a ? a.cljs$core$INamed$_namespace$arity$1 : a;
  if(b) {
    return a.cljs$core$INamed$_namespace$arity$1(a)
  }
  b = cljs.core._namespace[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._namespace._, !b)) {
    throw cljs.core.missing_protocol.call(null, "INamed.-namespace", a);
  }
  return b.call(null, a)
};
cljs.core.StringBufferWriter = function(a) {
  this.sb = a;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 1073741824
};
cljs.core.StringBufferWriter.cljs$lang$type = !0;
cljs.core.StringBufferWriter.cljs$lang$ctorStr = "cljs.core/StringBufferWriter";
cljs.core.StringBufferWriter.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/StringBufferWriter")
};
cljs.core.StringBufferWriter.prototype.cljs$core$IWriter$_write$arity$2 = function(a, b) {
  return this.sb.append(b)
};
cljs.core.StringBufferWriter.prototype.cljs$core$IWriter$_flush$arity$1 = function() {
  return null
};
cljs.core.pr_str_STAR_ = function(a) {
  var b = new goog.string.StringBuffer, c = new cljs.core.StringBufferWriter(b);
  cljs.core._pr_writer.call(null, a, c, cljs.core.pr_opts.call(null));
  cljs.core._flush.call(null, c);
  return"" + cljs.core.str(b)
};
cljs.core.instance_QMARK_ = function(a, b) {
  return b instanceof a
};
cljs.core.symbol_QMARK_ = function(a) {
  return a instanceof cljs.core.Symbol
};
cljs.core.Symbol = function(a, b, c, d, e) {
  this.ns = a;
  this.name = b;
  this.str = c;
  this._hash = d;
  this._meta = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2154168321
};
cljs.core.Symbol.cljs$lang$type = !0;
cljs.core.Symbol.cljs$lang$ctorStr = "cljs.core/Symbol";
cljs.core.Symbol.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/Symbol")
};
cljs.core.Symbol.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b) {
  return cljs.core._write.call(null, b, this.str)
};
cljs.core.Symbol.prototype.cljs$core$INamed$ = !0;
cljs.core.Symbol.prototype.cljs$core$INamed$_name$arity$1 = function() {
  return this.name
};
cljs.core.Symbol.prototype.cljs$core$INamed$_namespace$arity$1 = function() {
  return this.ns
};
cljs.core.Symbol.prototype.cljs$core$IHash$_hash$arity$1 = function() {
  -1 === this._hash && (this._hash = cljs.core.hash_combine.call(null, cljs.core.hash.call(null, this.ns), cljs.core.hash.call(null, this.name)));
  return this._hash
};
cljs.core.Symbol.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.Symbol(this.ns, this.name, this.str, this._hash, b)
};
cljs.core.Symbol.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this._meta
};
cljs.core.Symbol.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, c, this, null);
      case 3:
        return cljs.core._lookup.call(null, c, this, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.Symbol.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.Symbol.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return b instanceof cljs.core.Symbol ? this.str === b.str : !1
};
cljs.core.Symbol.prototype.toString = function() {
  return this.str
};
cljs.core.symbol = function() {
  var a = null, b = function(b) {
    return b instanceof cljs.core.Symbol ? b : a.call(null, null, b)
  }, c = function(a, b) {
    var c = null != a ? [cljs.core.str(a), cljs.core.str("/"), cljs.core.str(b)].join("") : b;
    return new cljs.core.Symbol(a, b, c, -1, null)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.seq = function(a) {
  if(null == a) {
    return null
  }
  var b;
  a ? (b = (b = a.cljs$lang$protocol_mask$partition0$ & 8388608) ? b : a.cljs$core$ISeqable$, b = b ? !0 : !1) : b = !1;
  if(b) {
    return cljs.core._seq.call(null, a)
  }
  if(a instanceof Array || cljs.core.string_QMARK_.call(null, a)) {
    return 0 === a.length ? null : new cljs.core.IndexedSeq(a, 0)
  }
  if(cljs.core.type_satisfies_.call(null, cljs.core.ILookup, a)) {
    return cljs.core._seq.call(null, a)
  }
  throw Error([cljs.core.str(a), cljs.core.str("is not ISeqable")].join(""));
};
cljs.core.first = function(a) {
  if(null == a) {
    return null
  }
  var b;
  a ? (b = (b = a.cljs$lang$protocol_mask$partition0$ & 64) ? b : a.cljs$core$ISeq$, b = b ? !0 : !1) : b = !1;
  if(b) {
    return cljs.core._first.call(null, a)
  }
  a = cljs.core.seq.call(null, a);
  return null == a ? null : cljs.core._first.call(null, a)
};
cljs.core.rest = function(a) {
  if(null != a) {
    var b;
    a ? (b = (b = a.cljs$lang$protocol_mask$partition0$ & 64) ? b : a.cljs$core$ISeq$, b = b ? !0 : !1) : b = !1;
    if(b) {
      return cljs.core._rest.call(null, a)
    }
    a = cljs.core.seq.call(null, a);
    return null != a ? cljs.core._rest.call(null, a) : cljs.core.List.EMPTY
  }
  return cljs.core.List.EMPTY
};
cljs.core.next = function(a) {
  if(null == a) {
    a = null
  }else {
    var b;
    a ? (b = (b = a.cljs$lang$protocol_mask$partition0$ & 128) ? b : a.cljs$core$INext$, b = b ? !0 : !1) : b = !1;
    a = b ? cljs.core._next.call(null, a) : cljs.core.seq.call(null, cljs.core.rest.call(null, a))
  }
  return a
};
cljs.core._EQ_ = function() {
  var a = null, b = function(a, b) {
    var c = a === b;
    return c ? c : cljs.core._equiv.call(null, a, b)
  }, c = function(b, c, d) {
    for(;;) {
      if(cljs.core.truth_(a.call(null, b, c))) {
        if(cljs.core.next.call(null, d)) {
          b = c, c = cljs.core.first.call(null, d), d = cljs.core.next.call(null, d)
        }else {
          return a.call(null, c, cljs.core.first.call(null, d))
        }
      }else {
        return!1
      }
    }
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function() {
    return!0
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.IHash["null"] = !0;
cljs.core._hash["null"] = function() {
  return 0
};
cljs.core.INext["null"] = !0;
cljs.core._next["null"] = function() {
  return null
};
cljs.core.IKVReduce["null"] = !0;
cljs.core._kv_reduce["null"] = function(a, b, c) {
  return c
};
cljs.core.ISet["null"] = !0;
cljs.core._disjoin["null"] = function() {
  return null
};
cljs.core.ICounted["null"] = !0;
cljs.core._count["null"] = function() {
  return 0
};
cljs.core.IStack["null"] = !0;
cljs.core._peek["null"] = function() {
  return null
};
cljs.core._pop["null"] = function() {
  return null
};
cljs.core.IEquiv["null"] = !0;
cljs.core._equiv["null"] = function(a, b) {
  return null == b
};
cljs.core.IWithMeta["null"] = !0;
cljs.core._with_meta["null"] = function() {
  return null
};
cljs.core.IMeta["null"] = !0;
cljs.core._meta["null"] = function() {
  return null
};
cljs.core.IEmptyableCollection["null"] = !0;
cljs.core._empty["null"] = function() {
  return null
};
cljs.core.IMap["null"] = !0;
cljs.core._dissoc["null"] = function() {
  return null
};
Date.prototype.cljs$core$IEquiv$ = !0;
Date.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  var c = b instanceof Date;
  return c ? a.toString() === b.toString() : c
};
cljs.core.IHash.number = !0;
cljs.core._hash.number = function(a) {
  return Math.floor(a) % 2147483647
};
cljs.core.IEquiv.number = !0;
cljs.core._equiv.number = function(a, b) {
  return a === b
};
cljs.core.IHash["boolean"] = !0;
cljs.core._hash["boolean"] = function(a) {
  return!0 === a ? 1 : 0
};
cljs.core.IMeta["function"] = !0;
cljs.core._meta["function"] = function() {
  return null
};
cljs.core.Fn["function"] = !0;
cljs.core.IHash._ = !0;
cljs.core._hash._ = function(a) {
  return goog.getUid(a)
};
cljs.core.inc = function(a) {
  return a + 1
};
cljs.core.Reduced = function(a) {
  this.val = a;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32768
};
cljs.core.Reduced.cljs$lang$type = !0;
cljs.core.Reduced.cljs$lang$ctorStr = "cljs.core/Reduced";
cljs.core.Reduced.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/Reduced")
};
cljs.core.Reduced.prototype.cljs$core$IDeref$_deref$arity$1 = function() {
  return this.val
};
cljs.core.reduced = function(a) {
  return new cljs.core.Reduced(a)
};
cljs.core.reduced_QMARK_ = function(a) {
  return a instanceof cljs.core.Reduced
};
cljs.core.ci_reduce = function() {
  var a = null, b = function(a, b) {
    var c = cljs.core._count.call(null, a);
    if(0 === c) {
      return b.call(null)
    }
    for(var d = cljs.core._nth.call(null, a, 0), i = 1;;) {
      if(i < c) {
        d = b.call(null, d, cljs.core._nth.call(null, a, i));
        if(cljs.core.reduced_QMARK_.call(null, d)) {
          return cljs.core.deref.call(null, d)
        }
        i += 1
      }else {
        return d
      }
    }
  }, c = function(a, b, c) {
    for(var d = cljs.core._count.call(null, a), i = 0;;) {
      if(i < d) {
        c = b.call(null, c, cljs.core._nth.call(null, a, i));
        if(cljs.core.reduced_QMARK_.call(null, c)) {
          return cljs.core.deref.call(null, c)
        }
        i += 1
      }else {
        return c
      }
    }
  }, d = function(a, b, c, d) {
    for(var i = cljs.core._count.call(null, a);;) {
      if(d < i) {
        c = b.call(null, c, cljs.core._nth.call(null, a, d));
        if(cljs.core.reduced_QMARK_.call(null, c)) {
          return cljs.core.deref.call(null, c)
        }
        d += 1
      }else {
        return c
      }
    }
  }, a = function(a, f, g, h) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  return a
}();
cljs.core.array_reduce = function() {
  var a = null, b = function(a, b) {
    var c = a.length;
    if(0 === a.length) {
      return b.call(null)
    }
    for(var d = a[0], i = 1;;) {
      if(i < c) {
        d = b.call(null, d, a[i]);
        if(cljs.core.reduced_QMARK_.call(null, d)) {
          return cljs.core.deref.call(null, d)
        }
        i += 1
      }else {
        return d
      }
    }
  }, c = function(a, b, c) {
    for(var d = a.length, i = 0;;) {
      if(i < d) {
        c = b.call(null, c, a[i]);
        if(cljs.core.reduced_QMARK_.call(null, c)) {
          return cljs.core.deref.call(null, c)
        }
        i += 1
      }else {
        return c
      }
    }
  }, d = function(a, b, c, d) {
    for(var i = a.length;;) {
      if(d < i) {
        c = b.call(null, c, a[d]);
        if(cljs.core.reduced_QMARK_.call(null, c)) {
          return cljs.core.deref.call(null, c)
        }
        d += 1
      }else {
        return c
      }
    }
  }, a = function(a, f, g, h) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  return a
}();
cljs.core.counted_QMARK_ = function(a) {
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 2) ? b : a.cljs$core$ICounted$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_.call(null, cljs.core.ICounted, a)
  }
  return cljs.core.type_satisfies_.call(null, cljs.core.ICounted, a)
};
cljs.core.indexed_QMARK_ = function(a) {
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 16) ? b : a.cljs$core$IIndexed$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, a)
  }
  return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, a)
};
cljs.core.IndexedSeq = function(a, b) {
  this.arr = a;
  this.i = b;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 166199550
};
cljs.core.IndexedSeq.cljs$lang$type = !0;
cljs.core.IndexedSeq.cljs$lang$ctorStr = "cljs.core/IndexedSeq";
cljs.core.IndexedSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/IndexedSeq")
};
cljs.core.IndexedSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.IndexedSeq.prototype.cljs$core$INext$_next$arity$1 = function() {
  return this.i + 1 < this.arr.length ? new cljs.core.IndexedSeq(this.arr, this.i + 1) : null
};
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, a)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReversible$_rseq$arity$1 = function(a) {
  var b = a.cljs$core$ICounted$_count$arity$1(a);
  return 0 < b ? new cljs.core.RSeq(a, b - 1, null) : cljs.core.List.EMPTY
};
cljs.core.IndexedSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.array_reduce.call(null, this.arr, b, this.arr[this.i], this.i + 1)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.array_reduce.call(null, this.arr, b, c, this.i)
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.arr.length - this.i
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return this.arr[this.i]
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return this.i + 1 < this.arr.length ? new cljs.core.IndexedSeq(this.arr, this.i + 1) : cljs.core.list.call(null)
};
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  var c = b + this.i;
  return c < this.arr.length ? this.arr[c] : null
};
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  a = b + this.i;
  return a < this.arr.length ? this.arr[a] : c
};
cljs.core.IndexedSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.List.EMPTY
};
cljs.core.prim_seq = function() {
  var a = null, b = function(b) {
    return a.call(null, b, 0)
  }, c = function(a, b) {
    return b < a.length ? new cljs.core.IndexedSeq(a, b) : null
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.array_seq = function() {
  var a = null, b = function(a) {
    return cljs.core.prim_seq.call(null, a, 0)
  }, c = function(a, b) {
    return cljs.core.prim_seq.call(null, a, b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.ICounted.array = !0;
cljs.core._count.array = function(a) {
  return a.length
};
cljs.core.RSeq = function(a, b, c) {
  this.ci = a;
  this.i = b;
  this.meta = c;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850574
};
cljs.core.RSeq.cljs$lang$type = !0;
cljs.core.RSeq.cljs$lang$ctorStr = "cljs.core/RSeq";
cljs.core.RSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/RSeq")
};
cljs.core.RSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.RSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, a)
};
cljs.core.RSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.RSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.RSeq.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.i + 1
};
cljs.core.RSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return cljs.core._nth.call(null, this.ci, this.i)
};
cljs.core.RSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return 0 < this.i ? new cljs.core.RSeq(this.ci, this.i - 1, null) : cljs.core.List.EMPTY
};
cljs.core.RSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.RSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.RSeq(this.ci, this.i, b)
};
cljs.core.RSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.RSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.second = function(a) {
  return cljs.core.first.call(null, cljs.core.next.call(null, a))
};
cljs.core.ffirst = function(a) {
  return cljs.core.first.call(null, cljs.core.first.call(null, a))
};
cljs.core.nfirst = function(a) {
  return cljs.core.next.call(null, cljs.core.first.call(null, a))
};
cljs.core.fnext = function(a) {
  return cljs.core.first.call(null, cljs.core.next.call(null, a))
};
cljs.core.nnext = function(a) {
  return cljs.core.next.call(null, cljs.core.next.call(null, a))
};
cljs.core.last = function(a) {
  for(;;) {
    var b = cljs.core.next.call(null, a);
    if(null != b) {
      a = b
    }else {
      return cljs.core.first.call(null, a)
    }
  }
};
cljs.core.IEquiv._ = !0;
cljs.core._equiv._ = function(a, b) {
  return a === b
};
cljs.core.conj = function() {
  var a = null, b = function(a, b) {
    return null != a ? cljs.core._conj.call(null, a, b) : cljs.core.list.call(null, b)
  }, c = function(b, c, d) {
    for(;;) {
      if(cljs.core.truth_(d)) {
        b = a.call(null, b, c), c = cljs.core.first.call(null, d), d = cljs.core.next.call(null, d)
      }else {
        return a.call(null, b, c)
      }
    }
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.empty = function(a) {
  return cljs.core._empty.call(null, a)
};
cljs.core.accumulating_seq_count = function(a) {
  for(var a = cljs.core.seq.call(null, a), b = 0;;) {
    if(cljs.core.counted_QMARK_.call(null, a)) {
      return b + cljs.core._count.call(null, a)
    }
    a = cljs.core.next.call(null, a);
    b += 1
  }
};
cljs.core.count = function(a) {
  return cljs.core.counted_QMARK_.call(null, a) ? cljs.core._count.call(null, a) : cljs.core.accumulating_seq_count.call(null, a)
};
cljs.core.linear_traversal_nth = function() {
  var a = null, b = function(a, b) {
    for(;;) {
      if(null == a) {
        throw Error("Index out of bounds");
      }
      if(0 === b) {
        if(cljs.core.seq.call(null, a)) {
          return cljs.core.first.call(null, a)
        }
        throw Error("Index out of bounds");
      }
      if(cljs.core.indexed_QMARK_.call(null, a)) {
        return cljs.core._nth.call(null, a, b)
      }
      if(cljs.core.seq.call(null, a)) {
        var c = cljs.core.next.call(null, a), g = b - 1, a = c, b = g
      }else {
        throw Error("Index out of bounds");
      }
    }
  }, c = function(a, b, c) {
    for(;;) {
      if(null == a) {
        return c
      }
      if(0 === b) {
        return cljs.core.seq.call(null, a) ? cljs.core.first.call(null, a) : c
      }
      if(cljs.core.indexed_QMARK_.call(null, a)) {
        return cljs.core._nth.call(null, a, b, c)
      }
      if(cljs.core.seq.call(null, a)) {
        a = cljs.core.next.call(null, a), b -= 1
      }else {
        return c
      }
    }
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.nth = function() {
  var a = null, b = function(a, b) {
    var c;
    null == a ? c = null : (a ? (c = (c = a.cljs$lang$protocol_mask$partition0$ & 16) ? c : a.cljs$core$IIndexed$, c = c ? !0 : !1) : c = !1, c = c ? cljs.core._nth.call(null, a, Math.floor(b)) : a instanceof Array ? b < a.length ? a[b] : null : cljs.core.string_QMARK_.call(null, a) ? b < a.length ? a[b] : null : cljs.core.linear_traversal_nth.call(null, a, Math.floor(b)));
    return c
  }, c = function(a, b, c) {
    if(null != a) {
      var g;
      a ? (g = (g = a.cljs$lang$protocol_mask$partition0$ & 16) ? g : a.cljs$core$IIndexed$, g = g ? !0 : !1) : g = !1;
      a = g ? cljs.core._nth.call(null, a, Math.floor(b), c) : a instanceof Array ? b < a.length ? a[b] : c : cljs.core.string_QMARK_.call(null, a) ? b < a.length ? a[b] : c : cljs.core.linear_traversal_nth.call(null, a, Math.floor(b), c)
    }else {
      a = c
    }
    return a
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.get = function() {
  var a = null, b = function(a, b) {
    var c;
    null == a ? c = null : (a ? (c = (c = a.cljs$lang$protocol_mask$partition0$ & 256) ? c : a.cljs$core$ILookup$, c = c ? !0 : !1) : c = !1, c = c ? cljs.core._lookup.call(null, a, b) : a instanceof Array ? b < a.length ? a[b] : null : cljs.core.string_QMARK_.call(null, a) ? b < a.length ? a[b] : null : cljs.core.type_satisfies_.call(null, cljs.core.ILookup, a) ? cljs.core._lookup.call(null, a, b) : null);
    return c
  }, c = function(a, b, c) {
    if(null != a) {
      var g;
      a ? (g = (g = a.cljs$lang$protocol_mask$partition0$ & 256) ? g : a.cljs$core$ILookup$, g = g ? !0 : !1) : g = !1;
      a = g ? cljs.core._lookup.call(null, a, b, c) : a instanceof Array ? b < a.length ? a[b] : c : cljs.core.string_QMARK_.call(null, a) ? b < a.length ? a[b] : c : cljs.core.type_satisfies_.call(null, cljs.core.ILookup, a) ? cljs.core._lookup.call(null, a, b, c) : c
    }else {
      a = c
    }
    return a
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.assoc = function() {
  var a = null, b = function(a, b, c) {
    return null != a ? cljs.core._assoc.call(null, a, b, c) : cljs.core.hash_map.call(null, b, c)
  }, c = function(b, c, d, h) {
    for(;;) {
      if(b = a.call(null, b, c, d), cljs.core.truth_(h)) {
        c = cljs.core.first.call(null, h), d = cljs.core.second.call(null, h), h = cljs.core.nnext.call(null, h)
      }else {
        return b
      }
    }
  }, d = function(a, b, d, h) {
    var i = null;
    3 < arguments.length && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return c.call(this, a, b, d, i)
  };
  d.cljs$lang$maxFixedArity = 3;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), h = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, h, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g, h) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, c, g);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, g, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.dissoc = function() {
  var a = null, b = function(a, b) {
    return cljs.core._dissoc.call(null, a, b)
  }, c = function(b, c, d) {
    for(;;) {
      if(b = a.call(null, b, c), cljs.core.truth_(d)) {
        c = cljs.core.first.call(null, d), d = cljs.core.next.call(null, d)
      }else {
        return b
      }
    }
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.fn_QMARK_ = function(a) {
  var b = goog.isFunction(a);
  return b ? b : a ? cljs.core.truth_(cljs.core.truth_(null) ? null : a.cljs$core$Fn$) ? !0 : a.cljs$lang$protocol_mask$partition$ ? !1 : cljs.core.type_satisfies_.call(null, cljs.core.Fn, a) : cljs.core.type_satisfies_.call(null, cljs.core.Fn, a)
};
cljs.core.with_meta = function with_meta(b, c) {
  var d = cljs.core.fn_QMARK_.call(null, b);
  d && (d = b ? ((d = b.cljs$lang$protocol_mask$partition0$ & 262144) ? d : b.cljs$core$IWithMeta$) || (b.cljs$lang$protocol_mask$partition0$ ? 0 : cljs.core.type_satisfies_.call(null, cljs.core.IWithMeta, b)) : cljs.core.type_satisfies_.call(null, cljs.core.IWithMeta, b), d = !d);
  return d ? with_meta.call(null, function() {
    if(void 0 === cljs.core.t5168) {
      cljs.core.t5168 = {};
      cljs.core.t5168 = function(b, c, d, e) {
        this.meta = b;
        this.o = c;
        this.with_meta = d;
        this.meta5169 = e;
        this.cljs$lang$protocol_mask$partition1$ = 0;
        this.cljs$lang$protocol_mask$partition0$ = 393217
      };
      cljs.core.t5168.cljs$lang$type = !0;
      cljs.core.t5168.cljs$lang$ctorStr = "cljs.core/t5168";
      cljs.core.t5168.cljs$lang$ctorPrWriter = function(b, c) {
        return cljs.core._write.call(null, c, "cljs.core/t5168")
      };
      var d = cljs.core.t5168.prototype, f = function(b, c) {
        return cljs.core.apply.call(null, b.o, c)
      }, g = function(b, c) {
        var b = this, d = null;
        1 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
        return f.call(this, b, d)
      };
      g.cljs$lang$maxFixedArity = 1;
      g.cljs$lang$applyTo = function(b) {
        var c = cljs.core.first(b), b = cljs.core.rest(b);
        return f(c, b)
      };
      g.cljs$core$IFn$_invoke$arity$variadic = f;
      d.call = g;
      cljs.core.t5168.prototype.apply = function(b, c) {
        b = this;
        return b.call.apply(b, [b].concat(c.slice()))
      };
      cljs.core.t5168.prototype.cljs$core$Fn$ = !0;
      cljs.core.t5168.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
        return this.meta5169
      };
      cljs.core.t5168.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(b, c) {
        return new cljs.core.t5168(this.meta, this.o, this.with_meta, c)
      }
    }
    return new cljs.core.t5168(c, b, with_meta, null)
  }(), c) : cljs.core._with_meta.call(null, b, c)
};
cljs.core.meta = function(a) {
  var b;
  a ? (b = (b = a.cljs$lang$protocol_mask$partition0$ & 131072) ? b : a.cljs$core$IMeta$, b = b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_.call(null, cljs.core.IMeta, a)) : b = cljs.core.type_satisfies_.call(null, cljs.core.IMeta, a);
  return b ? cljs.core._meta.call(null, a) : null
};
cljs.core.peek = function(a) {
  return cljs.core._peek.call(null, a)
};
cljs.core.pop = function(a) {
  return cljs.core._pop.call(null, a)
};
cljs.core.disj = function() {
  var a = null, b = function(a, b) {
    return cljs.core._disjoin.call(null, a, b)
  }, c = function(b, c, d) {
    for(;;) {
      if(b = a.call(null, b, c), cljs.core.truth_(d)) {
        c = cljs.core.first.call(null, d), d = cljs.core.next.call(null, d)
      }else {
        return b
      }
    }
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.string_hash_cache = {};
cljs.core.string_hash_cache_count = 0;
cljs.core.add_to_string_hash_cache = function(a) {
  var b = goog.string.hashCode(a);
  cljs.core.string_hash_cache[a] = b;
  cljs.core.string_hash_cache_count += 1;
  return b
};
cljs.core.check_string_hash_cache = function(a) {
  255 < cljs.core.string_hash_cache_count && (cljs.core.string_hash_cache = {}, cljs.core.string_hash_cache_count = 0);
  var b = cljs.core.string_hash_cache[a];
  return"number" === typeof b ? b : cljs.core.add_to_string_hash_cache.call(null, a)
};
cljs.core.hash = function() {
  var a = null, b = function(b) {
    return a.call(null, b, !0)
  }, c = function(a, b) {
    var c = goog.isString(a);
    return(c ? b : c) ? cljs.core.check_string_hash_cache.call(null, a) : cljs.core._hash.call(null, a)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.empty_QMARK_ = function(a) {
  var b = null == a;
  return b ? b : cljs.core.not.call(null, cljs.core.seq.call(null, a))
};
cljs.core.coll_QMARK_ = function(a) {
  if(null == a) {
    return!1
  }
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 8) ? b : a.cljs$core$ICollection$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_.call(null, cljs.core.ICollection, a)
  }
  return cljs.core.type_satisfies_.call(null, cljs.core.ICollection, a)
};
cljs.core.set_QMARK_ = function(a) {
  if(null == a) {
    return!1
  }
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 4096) ? b : a.cljs$core$ISet$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_.call(null, cljs.core.ISet, a)
  }
  return cljs.core.type_satisfies_.call(null, cljs.core.ISet, a)
};
cljs.core.associative_QMARK_ = function(a) {
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 512) ? b : a.cljs$core$IAssociative$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_.call(null, cljs.core.IAssociative, a)
  }
  return cljs.core.type_satisfies_.call(null, cljs.core.IAssociative, a)
};
cljs.core.sequential_QMARK_ = function(a) {
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 16777216) ? b : a.cljs$core$ISequential$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_.call(null, cljs.core.ISequential, a)
  }
  return cljs.core.type_satisfies_.call(null, cljs.core.ISequential, a)
};
cljs.core.reduceable_QMARK_ = function(a) {
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 524288) ? b : a.cljs$core$IReduce$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_.call(null, cljs.core.IReduce, a)
  }
  return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, a)
};
cljs.core.map_QMARK_ = function(a) {
  if(null == a) {
    return!1
  }
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 1024) ? b : a.cljs$core$IMap$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_.call(null, cljs.core.IMap, a)
  }
  return cljs.core.type_satisfies_.call(null, cljs.core.IMap, a)
};
cljs.core.vector_QMARK_ = function(a) {
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 16384) ? b : a.cljs$core$IVector$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_.call(null, cljs.core.IVector, a)
  }
  return cljs.core.type_satisfies_.call(null, cljs.core.IVector, a)
};
cljs.core.chunked_seq_QMARK_ = function(a) {
  var b = a instanceof cljs.core.ChunkedCons;
  return b ? b : a instanceof cljs.core.ChunkedSeq
};
cljs.core.js_obj = function() {
  var a = null, b = function(a) {
    return cljs.core.apply.call(null, goog.object.create, a)
  }, c = function(a) {
    var c = null;
    0 < arguments.length && (c = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return b.call(this, c)
  };
  c.cljs$lang$maxFixedArity = 0;
  c.cljs$lang$applyTo = function(a) {
    a = cljs.core.seq(a);
    return b(a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a) {
    switch(arguments.length) {
      case 0:
        return{};
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(arguments, 0))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 0;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return{}
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.js_keys = function(a) {
  var b = [];
  goog.object.forEach(a, function(a, d) {
    return b.push(d)
  });
  return b
};
cljs.core.js_delete = function(a, b) {
  return delete a[b]
};
cljs.core.array_copy = function(a, b, c, d, e) {
  for(;;) {
    if(0 === e) {
      return c
    }
    c[d] = a[b];
    d += 1;
    e -= 1;
    b += 1
  }
};
cljs.core.array_copy_downward = function(a, b, c, d, e) {
  b += e - 1;
  for(d += e - 1;;) {
    if(0 === e) {
      return c
    }
    c[d] = a[b];
    d -= 1;
    e -= 1;
    b -= 1
  }
};
cljs.core.lookup_sentinel = {};
cljs.core.false_QMARK_ = function(a) {
  return!1 === a
};
cljs.core.true_QMARK_ = function(a) {
  return!0 === a
};
cljs.core.undefined_QMARK_ = function(a) {
  return void 0 === a
};
cljs.core.seq_QMARK_ = function(a) {
  if(null == a) {
    return!1
  }
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 64) ? b : a.cljs$core$ISeq$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_.call(null, cljs.core.ISeq, a)
  }
  return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, a)
};
cljs.core.seqable_QMARK_ = function(a) {
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 8388608) ? b : a.cljs$core$ISeqable$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_.call(null, cljs.core.ISeqable, a)
  }
  return cljs.core.type_satisfies_.call(null, cljs.core.ISeqable, a)
};
cljs.core.boolean$ = function(a) {
  return cljs.core.truth_(a) ? !0 : !1
};
cljs.core.keyword_QMARK_ = function(a) {
  var b = goog.isString(a);
  return b ? "\ufdd0" === a.charAt(0) : b
};
cljs.core.ifn_QMARK_ = function(a) {
  var b = cljs.core.fn_QMARK_.call(null, a);
  return b ? b : a ? (b = (b = a.cljs$lang$protocol_mask$partition0$ & 1) ? b : a.cljs$core$IFn$, b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_.call(null, cljs.core.IFn, a)) : cljs.core.type_satisfies_.call(null, cljs.core.IFn, a)
};
cljs.core.integer_QMARK_ = function(a) {
  var b = "number" === typeof a;
  return b && (b = !isNaN(a)) ? (b = Infinity !== a) ? parseFloat(a) === parseInt(a, 10) : b : b
};
cljs.core.contains_QMARK_ = function(a, b) {
  return cljs.core.get.call(null, a, b, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel ? !1 : !0
};
cljs.core.find = function(a, b) {
  var c;
  if(c = null != a) {
    c = (c = cljs.core.associative_QMARK_.call(null, a)) ? cljs.core.contains_QMARK_.call(null, a, b) : c
  }
  return c ? cljs.core.PersistentVector.fromArray([b, cljs.core.get.call(null, a, b)], !0) : null
};
cljs.core.distinct_QMARK_ = function() {
  var a = null, b = function(a, b) {
    return!cljs.core._EQ_.call(null, a, b)
  }, c = function(a, b, c) {
    if(cljs.core._EQ_.call(null, a, b)) {
      return!1
    }
    a = cljs.core.PersistentHashSet.fromArray([b, null, a, null], !0);
    for(b = c;;) {
      var d = cljs.core.first.call(null, b), c = cljs.core.next.call(null, b);
      if(cljs.core.truth_(b)) {
        if(cljs.core.contains_QMARK_.call(null, a, d)) {
          return!1
        }
        a = cljs.core.conj.call(null, a, d);
        b = c
      }else {
        return!0
      }
    }
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function() {
    return!0
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.compare = function(a, b) {
  if(a === b) {
    return 0
  }
  if(null == a) {
    return-1
  }
  if(null == b) {
    return 1
  }
  if(cljs.core.type.call(null, a) === cljs.core.type.call(null, b)) {
    var c;
    a ? (c = (c = a.cljs$lang$protocol_mask$partition1$ & 2048) ? c : a.cljs$core$IComparable$, c = c ? !0 : !1) : c = !1;
    return c ? cljs.core._compare.call(null, a, b) : goog.array.defaultCompare(a, b)
  }
  throw Error("compare on non-nil objects of different types");
};
cljs.core.compare_indexed = function() {
  var a = null, b = function(b, c) {
    var f = cljs.core.count.call(null, b), g = cljs.core.count.call(null, c);
    return f < g ? -1 : f > g ? 1 : a.call(null, b, c, f, 0)
  }, c = function(a, b, c, g) {
    for(;;) {
      var h = cljs.core.compare.call(null, cljs.core.nth.call(null, a, g), cljs.core.nth.call(null, b, g)), i;
      i = (i = 0 === h) ? g + 1 < c : i;
      if(i) {
        g += 1
      }else {
        return h
      }
    }
  }, a = function(a, e, f, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 4:
        return c.call(this, a, e, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$4 = c;
  return a
}();
cljs.core.fn__GT_comparator = function(a) {
  return cljs.core._EQ_.call(null, a, cljs.core.compare) ? cljs.core.compare : function(b, c) {
    var d = a.call(null, b, c);
    return"number" === typeof d ? d : cljs.core.truth_(d) ? -1 : cljs.core.truth_(a.call(null, c, b)) ? 1 : 0
  }
};
cljs.core.sort = function() {
  var a = null, b = function(b) {
    return a.call(null, cljs.core.compare, b)
  }, c = function(a, b) {
    if(cljs.core.seq.call(null, b)) {
      var c = cljs.core.to_array.call(null, b);
      goog.array.stableSort(c, cljs.core.fn__GT_comparator.call(null, a));
      return cljs.core.seq.call(null, c)
    }
    return cljs.core.List.EMPTY
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.sort_by = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, cljs.core.compare, c)
  }, c = function(a, b, c) {
    return cljs.core.sort.call(null, function(c, f) {
      return cljs.core.fn__GT_comparator.call(null, b).call(null, a.call(null, c), a.call(null, f))
    }, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.seq_reduce = function() {
  var a = null, b = function(a, b) {
    var c = cljs.core.seq.call(null, b);
    return c ? cljs.core.reduce.call(null, a, cljs.core.first.call(null, c), cljs.core.next.call(null, c)) : a.call(null)
  }, c = function(a, b, c) {
    for(c = cljs.core.seq.call(null, c);;) {
      if(c) {
        b = a.call(null, b, cljs.core.first.call(null, c));
        if(cljs.core.reduced_QMARK_.call(null, b)) {
          return cljs.core.deref.call(null, b)
        }
        c = cljs.core.next.call(null, c)
      }else {
        return b
      }
    }
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.shuffle = function(a) {
  a = cljs.core.to_array.call(null, a);
  goog.array.shuffle(a);
  return cljs.core.vec.call(null, a)
};
cljs.core.reduce = function() {
  var a = null, b = function(a, b) {
    var c;
    b ? (c = (c = b.cljs$lang$protocol_mask$partition0$ & 524288) ? c : b.cljs$core$IReduce$, c = c ? !0 : !1) : c = !1;
    return c ? cljs.core._reduce.call(null, b, a) : b instanceof Array ? cljs.core.array_reduce.call(null, b, a) : cljs.core.string_QMARK_.call(null, b) ? cljs.core.array_reduce.call(null, b, a) : cljs.core.type_satisfies_.call(null, cljs.core.IReduce, b) ? cljs.core._reduce.call(null, b, a) : cljs.core.seq_reduce.call(null, a, b)
  }, c = function(a, b, c) {
    var g;
    c ? (g = (g = c.cljs$lang$protocol_mask$partition0$ & 524288) ? g : c.cljs$core$IReduce$, g = g ? !0 : !1) : g = !1;
    return g ? cljs.core._reduce.call(null, c, a, b) : c instanceof Array ? cljs.core.array_reduce.call(null, c, a, b) : cljs.core.string_QMARK_.call(null, c) ? cljs.core.array_reduce.call(null, c, a, b) : cljs.core.type_satisfies_.call(null, cljs.core.IReduce, c) ? cljs.core._reduce.call(null, c, a, b) : cljs.core.seq_reduce.call(null, a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.reduce_kv = function(a, b, c) {
  return cljs.core._kv_reduce.call(null, c, a, b)
};
cljs.core._PLUS_ = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.reduce.call(null, a, b + c, f)
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 0:
        return 0;
      case 1:
        return a;
      case 2:
        return a + b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return 0
  };
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a + b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core._ = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.reduce.call(null, a, b - c, f)
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 1:
        return-a;
      case 2:
        return a - b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return-a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a - b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core._STAR_ = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.reduce.call(null, a, b * c, f)
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 0:
        return 1;
      case 1:
        return a;
      case 2:
        return a * b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return 1
  };
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a * b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core._SLASH_ = function() {
  var a = null, b = function(b) {
    return a.call(null, 1, b)
  }, c = function(b, c, d) {
    return cljs.core.reduce.call(null, a, a.call(null, b, c), d)
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a / c;
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a / b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core._LT_ = function() {
  var a = null, b = function(a, b, c) {
    for(;;) {
      if(a < b) {
        if(cljs.core.next.call(null, c)) {
          a = b, b = cljs.core.first.call(null, c), c = cljs.core.next.call(null, c)
        }else {
          return b < cljs.core.first.call(null, c)
        }
      }else {
        return!1
      }
    }
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a < b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function() {
    return!0
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a < b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core._LT__EQ_ = function() {
  var a = null, b = function(a, b, c) {
    for(;;) {
      if(a <= b) {
        if(cljs.core.next.call(null, c)) {
          a = b, b = cljs.core.first.call(null, c), c = cljs.core.next.call(null, c)
        }else {
          return b <= cljs.core.first.call(null, c)
        }
      }else {
        return!1
      }
    }
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a <= b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function() {
    return!0
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a <= b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core._GT_ = function() {
  var a = null, b = function(a, b, c) {
    for(;;) {
      if(a > b) {
        if(cljs.core.next.call(null, c)) {
          a = b, b = cljs.core.first.call(null, c), c = cljs.core.next.call(null, c)
        }else {
          return b > cljs.core.first.call(null, c)
        }
      }else {
        return!1
      }
    }
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a > b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function() {
    return!0
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a > b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core._GT__EQ_ = function() {
  var a = null, b = function(a, b, c) {
    for(;;) {
      if(a >= b) {
        if(cljs.core.next.call(null, c)) {
          a = b, b = cljs.core.first.call(null, c), c = cljs.core.next.call(null, c)
        }else {
          return b >= cljs.core.first.call(null, c)
        }
      }else {
        return!1
      }
    }
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a >= b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function() {
    return!0
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a >= b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.dec = function(a) {
  return a - 1
};
cljs.core.max = function() {
  var a = null, b = function(a, b) {
    return a > b ? a : b
  }, c = function(b, c, d) {
    return cljs.core.reduce.call(null, a, b > c ? b : c, d)
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.min = function() {
  var a = null, b = function(a, b) {
    return a < b ? a : b
  }, c = function(b, c, d) {
    return cljs.core.reduce.call(null, a, b < c ? b : c, d)
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.byte$ = function(a) {
  return a
};
cljs.core.char$ = function(a) {
  if("number" === typeof a) {
    return String.fromCharCode(a)
  }
  var b;
  b = (b = cljs.core.string_QMARK_.call(null, a)) ? 1 === a.length : b;
  if(b) {
    return a
  }
  throw Error("Argument to char must be a character or number");
};
cljs.core.short$ = function(a) {
  return a
};
cljs.core.float$ = function(a) {
  return a
};
cljs.core.double$ = function(a) {
  return a
};
cljs.core.unchecked_byte = function(a) {
  return a
};
cljs.core.unchecked_char = function(a) {
  return a
};
cljs.core.unchecked_short = function(a) {
  return a
};
cljs.core.unchecked_float = function(a) {
  return a
};
cljs.core.unchecked_double = function(a) {
  return a
};
cljs.core.unchecked_add = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.reduce.call(null, a, b + c, f)
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 0:
        return 0;
      case 1:
        return a;
      case 2:
        return a + b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return 0
  };
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a + b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.unchecked_add_int = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.reduce.call(null, a, b + c, f)
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 0:
        return 0;
      case 1:
        return a;
      case 2:
        return a + b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return 0
  };
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a + b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.unchecked_dec = function(a) {
  return a - 1
};
cljs.core.unchecked_dec_int = function(a) {
  return a - 1
};
cljs.core.unchecked_divide_int = function() {
  var a = null, b = function(b) {
    return a.call(null, 1, b)
  }, c = function(b, c, d) {
    return cljs.core.reduce.call(null, a, a.call(null, b, c), d)
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a / c;
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a / b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.unchecked_inc = function(a) {
  return a + 1
};
cljs.core.unchecked_inc_int = function(a) {
  return a + 1
};
cljs.core.unchecked_multiply = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.reduce.call(null, a, b * c, f)
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 0:
        return 1;
      case 1:
        return a;
      case 2:
        return a * b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return 1
  };
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a * b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.unchecked_multiply_int = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.reduce.call(null, a, b * c, f)
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 0:
        return 1;
      case 1:
        return a;
      case 2:
        return a * b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return 1
  };
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a * b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.unchecked_negate = function(a) {
  return-a
};
cljs.core.unchecked_negate_int = function(a) {
  return-a
};
cljs.core.unchecked_remainder_int = function(a, b) {
  return cljs.core.mod.call(null, a, b)
};
cljs.core.unchecked_substract = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.reduce.call(null, a, b - c, f)
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 1:
        return-a;
      case 2:
        return a - b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return-a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a - b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.unchecked_substract_int = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.reduce.call(null, a, b - c, f)
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 1:
        return-a;
      case 2:
        return a - b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return-a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a - b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.fix = function(a) {
  return 0 <= a ? Math.floor.call(null, a) : Math.ceil.call(null, a)
};
cljs.core.int$ = function(a) {
  return a | 0
};
cljs.core.unchecked_int = function(a) {
  return cljs.core.fix.call(null, a)
};
cljs.core.long$ = function(a) {
  return cljs.core.fix.call(null, a)
};
cljs.core.unchecked_long = function(a) {
  return cljs.core.fix.call(null, a)
};
cljs.core.booleans = function(a) {
  return a
};
cljs.core.bytes = function(a) {
  return a
};
cljs.core.chars = function(a) {
  return a
};
cljs.core.shorts = function(a) {
  return a
};
cljs.core.ints = function(a) {
  return a
};
cljs.core.floats = function(a) {
  return a
};
cljs.core.doubles = function(a) {
  return a
};
cljs.core.longs = function(a) {
  return a
};
cljs.core.js_mod = function(a, b) {
  return a % b
};
cljs.core.mod = function(a, b) {
  return(a % b + b) % b
};
cljs.core.quot = function(a, b) {
  return cljs.core.fix.call(null, (a - a % b) / b)
};
cljs.core.rem = function(a, b) {
  var c = cljs.core.quot.call(null, a, b);
  return a - b * c
};
cljs.core.rand = function() {
  var a = null, b = function() {
    return Math.random.call(null)
  }, c = function(b) {
    return b * a.call(null)
  }, a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  return a
}();
cljs.core.rand_int = function(a) {
  return cljs.core.fix.call(null, cljs.core.rand.call(null, a))
};
cljs.core.bit_xor = function(a, b) {
  return a ^ b
};
cljs.core.bit_and = function(a, b) {
  return a & b
};
cljs.core.bit_or = function(a, b) {
  return a | b
};
cljs.core.bit_and_not = function(a, b) {
  return a & ~b
};
cljs.core.bit_clear = function(a, b) {
  return a & ~(1 << b)
};
cljs.core.bit_flip = function(a, b) {
  return a ^ 1 << b
};
cljs.core.bit_not = function(a) {
  return~a
};
cljs.core.bit_set = function(a, b) {
  return a | 1 << b
};
cljs.core.bit_test = function(a, b) {
  return 0 != (a & 1 << b)
};
cljs.core.bit_shift_left = function(a, b) {
  return a << b
};
cljs.core.bit_shift_right = function(a, b) {
  return a >> b
};
cljs.core.bit_shift_right_zero_fill = function(a, b) {
  return a >>> b
};
cljs.core.bit_count = function(a) {
  a -= a >> 1 & 1431655765;
  a = (a & 858993459) + (a >> 2 & 858993459);
  return 16843009 * (a + (a >> 4) & 252645135) >> 24
};
cljs.core._EQ__EQ_ = function() {
  var a = null, b = function(a, b) {
    return cljs.core._equiv.call(null, a, b)
  }, c = function(b, c, d) {
    for(;;) {
      if(cljs.core.truth_(a.call(null, b, c))) {
        if(cljs.core.next.call(null, d)) {
          b = c, c = cljs.core.first.call(null, d), d = cljs.core.next.call(null, d)
        }else {
          return a.call(null, c, cljs.core.first.call(null, d))
        }
      }else {
        return!1
      }
    }
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function() {
    return!0
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.pos_QMARK_ = function(a) {
  return 0 < a
};
cljs.core.zero_QMARK_ = function(a) {
  return 0 === a
};
cljs.core.neg_QMARK_ = function(a) {
  return 0 > a
};
cljs.core.nthnext = function(a, b) {
  for(var c = b, d = cljs.core.seq.call(null, a);;) {
    if(cljs.core.truth_(function() {
      var a = d;
      return a ? 0 < c : a
    }())) {
      var e = c - 1, f = cljs.core.next.call(null, d), c = e, d = f
    }else {
      return d
    }
  }
};
cljs.core.str_STAR_ = function() {
  var a = null, b = function(a) {
    return null == a ? "" : a.toString()
  }, c = function(b, c) {
    return function(b, c) {
      for(;;) {
        if(cljs.core.truth_(c)) {
          var d = b.append(a.call(null, cljs.core.first.call(null, c))), e = cljs.core.next.call(null, c), b = d, c = e
        }else {
          return a.call(null, b)
        }
      }
    }.call(null, new goog.string.StringBuffer(a.call(null, b)), c)
  }, d = function(a, b) {
    var d = null;
    1 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return c.call(this, a, d)
  };
  d.cljs$lang$maxFixedArity = 1;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c) {
    switch(arguments.length) {
      case 0:
        return"";
      case 1:
        return b.call(this, a);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(arguments, 1))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return""
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.str = function() {
  var a = null, b = function(a) {
    return cljs.core.keyword_QMARK_.call(null, a) ? cljs.core.str_STAR_.call(null, ":", a.substring(2, a.length)) : null == a ? "" : a.toString()
  }, c = function(b, c) {
    return function(b, c) {
      for(;;) {
        if(cljs.core.truth_(c)) {
          var d = b.append(a.call(null, cljs.core.first.call(null, c))), e = cljs.core.next.call(null, c), b = d, c = e
        }else {
          return cljs.core.str_STAR_.call(null, b)
        }
      }
    }.call(null, new goog.string.StringBuffer(a.call(null, b)), c)
  }, d = function(a, b) {
    var d = null;
    1 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return c.call(this, a, d)
  };
  d.cljs$lang$maxFixedArity = 1;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c) {
    switch(arguments.length) {
      case 0:
        return"";
      case 1:
        return b.call(this, a);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(arguments, 1))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return""
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.subs = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return a.substring(c);
      case 3:
        return a.substring(c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, c) {
    return a.substring(c)
  };
  a.cljs$core$IFn$_invoke$arity$3 = function(a, c, d) {
    return a.substring(c, d)
  };
  return a
}();
cljs.core.format = function() {
  var a = function(a, b) {
    var e = cljs.core.map.call(null, function(a) {
      var b;
      b = (b = cljs.core.keyword_QMARK_.call(null, a)) ? b : a instanceof cljs.core.Symbol;
      return b ? "" + cljs.core.str(a) : a
    }, b);
    return cljs.core.apply.call(null, goog.string.format, a, e)
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.keyword = function() {
  var a = null, b = function(a) {
    return cljs.core.keyword_QMARK_.call(null, a) ? a : a instanceof cljs.core.Symbol ? cljs.core.str_STAR_.call(null, "\ufdd0", ":", cljs.core.subs.call(null, a, 2)) : cljs.core.str_STAR_.call(null, "\ufdd0", ":", a)
  }, c = function(b, c) {
    return a.call(null, cljs.core.str_STAR_.call(null, b, "/", c))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.equiv_sequential = function(a, b) {
  return cljs.core.boolean$.call(null, cljs.core.sequential_QMARK_.call(null, b) ? function() {
    for(var c = cljs.core.seq.call(null, a), d = cljs.core.seq.call(null, b);;) {
      if(null == c) {
        return null == d
      }
      if(null != d && cljs.core._EQ_.call(null, cljs.core.first.call(null, c), cljs.core.first.call(null, d))) {
        c = cljs.core.next.call(null, c), d = cljs.core.next.call(null, d)
      }else {
        return!1
      }
    }
  }() : null)
};
cljs.core.hash_combine = function(a, b) {
  return a ^ b + 2654435769 + (a << 6) + (a >> 2)
};
cljs.core.hash_coll = function(a) {
  return cljs.core.reduce.call(null, function(a, c) {
    return cljs.core.hash_combine.call(null, a, cljs.core.hash.call(null, c, !1))
  }, cljs.core.hash.call(null, cljs.core.first.call(null, a), !1), cljs.core.next.call(null, a))
};
cljs.core.hash_imap = function(a) {
  for(var b = 0, a = cljs.core.seq.call(null, a);;) {
    if(a) {
      var c = cljs.core.first.call(null, a), b = (b + (cljs.core.hash.call(null, cljs.core.key.call(null, c)) ^ cljs.core.hash.call(null, cljs.core.val.call(null, c)))) % 4503599627370496, a = cljs.core.next.call(null, a)
    }else {
      return b
    }
  }
};
cljs.core.hash_iset = function(a) {
  for(var b = 0, a = cljs.core.seq.call(null, a);;) {
    if(a) {
      var c = cljs.core.first.call(null, a), b = (b + cljs.core.hash.call(null, c)) % 4503599627370496, a = cljs.core.next.call(null, a)
    }else {
      return b
    }
  }
};
cljs.core.extend_object_BANG_ = function(a, b) {
  for(var c = cljs.core.seq.call(null, b), d = null, e = 0, f = 0;;) {
    if(f < e) {
      var g = cljs.core._nth.call(null, d, f), h = cljs.core.nth.call(null, g, 0, null), g = cljs.core.nth.call(null, g, 1, null), h = cljs.core.name.call(null, h);
      a[h] = g;
      f += 1
    }else {
      if(c = cljs.core.seq.call(null, c)) {
        cljs.core.chunked_seq_QMARK_.call(null, c) ? (e = cljs.core.chunk_first.call(null, c), c = cljs.core.chunk_rest.call(null, c), d = e, e = cljs.core.count.call(null, e)) : (e = cljs.core.first.call(null, c), d = cljs.core.nth.call(null, e, 0, null), e = cljs.core.nth.call(null, e, 1, null), d = cljs.core.name.call(null, d), a[d] = e, c = cljs.core.next.call(null, c), d = null, e = 0), f = 0
      }else {
        break
      }
    }
  }
  return a
};
cljs.core.List = function(a, b, c, d, e) {
  this.meta = a;
  this.first = b;
  this.rest = c;
  this.count = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 65413358
};
cljs.core.List.cljs$lang$type = !0;
cljs.core.List.cljs$lang$ctorStr = "cljs.core/List";
cljs.core.List.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/List")
};
cljs.core.List.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll.call(null, a)
};
cljs.core.List.prototype.cljs$core$INext$_next$arity$1 = function() {
  return 1 === this.count ? null : this.rest
};
cljs.core.List.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return new cljs.core.List(this.meta, b, a, this.count + 1, null)
};
cljs.core.List.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.List.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.List.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.count
};
cljs.core.List.prototype.cljs$core$IStack$_peek$arity$1 = function() {
  return this.first
};
cljs.core.List.prototype.cljs$core$IStack$_pop$arity$1 = function(a) {
  return a.cljs$core$ISeq$_rest$arity$1(a)
};
cljs.core.List.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return this.first
};
cljs.core.List.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return 1 === this.count ? cljs.core.List.EMPTY : this.rest
};
cljs.core.List.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.List.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.List(b, this.first, this.rest, this.count, this.__hash)
};
cljs.core.List.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.List.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.List.EMPTY
};
cljs.core.EmptyList = function(a) {
  this.meta = a;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 65413326
};
cljs.core.EmptyList.cljs$lang$type = !0;
cljs.core.EmptyList.cljs$lang$ctorStr = "cljs.core/EmptyList";
cljs.core.EmptyList.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/EmptyList")
};
cljs.core.EmptyList.prototype.cljs$core$IHash$_hash$arity$1 = function() {
  return 0
};
cljs.core.EmptyList.prototype.cljs$core$INext$_next$arity$1 = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return new cljs.core.List(this.meta, b, null, 1, null)
};
cljs.core.EmptyList.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.EmptyList.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return 0
};
cljs.core.EmptyList.prototype.cljs$core$IStack$_peek$arity$1 = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$IStack$_pop$arity$1 = function() {
  throw Error("Can't pop empty list");
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return cljs.core.List.EMPTY
};
cljs.core.EmptyList.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.EmptyList(b)
};
cljs.core.EmptyList.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return a
};
cljs.core.List.EMPTY = new cljs.core.EmptyList(null);
cljs.core.reversible_QMARK_ = function(a) {
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 134217728) ? b : a.cljs$core$IReversible$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_.call(null, cljs.core.IReversible, a)
  }
  return cljs.core.type_satisfies_.call(null, cljs.core.IReversible, a)
};
cljs.core.rseq = function(a) {
  return cljs.core._rseq.call(null, a)
};
cljs.core.reverse = function(a) {
  return cljs.core.reversible_QMARK_.call(null, a) ? cljs.core.rseq.call(null, a) : cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, a)
};
cljs.core.list = function() {
  var a = function(a) {
    var b;
    if(a instanceof cljs.core.IndexedSeq) {
      b = a.arr
    }else {
      a: {
        for(b = [];;) {
          if(null != a) {
            b.push(cljs.core._first.call(null, a)), a = cljs.core._next.call(null, a)
          }else {
            break a
          }
        }
        b = void 0
      }
    }
    for(var a = b.length, e = cljs.core.List.EMPTY;;) {
      if(0 < a) {
        var f = a - 1, e = cljs.core._conj.call(null, e, b[a - 1]), a = f
      }else {
        return e
      }
    }
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.Cons = function(a, b, c, d) {
  this.meta = a;
  this.first = b;
  this.rest = c;
  this.__hash = d;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 65405164
};
cljs.core.Cons.cljs$lang$type = !0;
cljs.core.Cons.cljs$lang$ctorStr = "cljs.core/Cons";
cljs.core.Cons.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/Cons")
};
cljs.core.Cons.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll.call(null, a)
};
cljs.core.Cons.prototype.cljs$core$INext$_next$arity$1 = function() {
  return null == this.rest ? null : cljs.core._seq.call(null, this.rest)
};
cljs.core.Cons.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return new cljs.core.Cons(null, b, a, this.__hash)
};
cljs.core.Cons.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.Cons.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.Cons.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return this.first
};
cljs.core.Cons.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return null == this.rest ? cljs.core.List.EMPTY : this.rest
};
cljs.core.Cons.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.Cons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.Cons(b, this.first, this.rest, this.__hash)
};
cljs.core.Cons.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.cons = function(a, b) {
  return function() {
    var a = null == b;
    return a ? a : b ? (a = (a = b.cljs$lang$protocol_mask$partition0$ & 64) ? a : b.cljs$core$ISeq$, a ? !0 : !1) : !1
  }() ? new cljs.core.Cons(null, a, b, null) : new cljs.core.Cons(null, a, cljs.core.seq.call(null, b), null)
};
cljs.core.list_QMARK_ = function(a) {
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 33554432) ? b : a.cljs$core$IList$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_.call(null, cljs.core.IList, a)
  }
  return cljs.core.type_satisfies_.call(null, cljs.core.IList, a)
};
cljs.core.ICounted.string = !0;
cljs.core._count.string = function(a) {
  return a.length
};
cljs.core.IHash.string = !0;
cljs.core._hash.string = function(a) {
  return goog.string.hashCode(a)
};
cljs.core.Keyword = function(a) {
  this.k = a;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 1
};
cljs.core.Keyword.cljs$lang$type = !0;
cljs.core.Keyword.cljs$lang$ctorStr = "cljs.core/Keyword";
cljs.core.Keyword.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/Keyword")
};
cljs.core.Keyword.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e;
        e = a;
        e = this;
        if(null == c) {
          e = null
        }else {
          var f = c.strobj;
          e = null == f ? cljs.core._lookup.call(null, c, e.k, null) : f[e.k]
        }
        return e;
      case 3:
        return e = null == c ? d : cljs.core._lookup.call(null, c, this.k, d), e
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.Keyword.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
String.prototype.cljs$core$IFn$ = !0;
String.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.get.call(null, c, this.toString());
      case 3:
        return cljs.core.get.call(null, c, this.toString(), d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
String.prototype.apply = function(a, b) {
  return a.call.apply(a, [a].concat(b.slice()))
};
String.prototype.apply = function(a, b) {
  return 2 > b.length ? cljs.core.get.call(null, b[0], a) : cljs.core.get.call(null, b[0], a, b[1])
};
cljs.core.lazy_seq_value = function(a) {
  var b = a.x;
  if(a.realized) {
    return b
  }
  a.x = b.call(null);
  a.realized = !0;
  return a.x
};
cljs.core.LazySeq = function(a, b, c, d) {
  this.meta = a;
  this.realized = b;
  this.x = c;
  this.__hash = d;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850700
};
cljs.core.LazySeq.cljs$lang$type = !0;
cljs.core.LazySeq.cljs$lang$ctorStr = "cljs.core/LazySeq";
cljs.core.LazySeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/LazySeq")
};
cljs.core.LazySeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll.call(null, a)
};
cljs.core.LazySeq.prototype.cljs$core$INext$_next$arity$1 = function(a) {
  return cljs.core._seq.call(null, a.cljs$core$ISeq$_rest$arity$1(a))
};
cljs.core.LazySeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, a)
};
cljs.core.LazySeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.LazySeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return cljs.core.seq.call(null, cljs.core.lazy_seq_value.call(null, a))
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$_first$arity$1 = function(a) {
  return cljs.core.first.call(null, cljs.core.lazy_seq_value.call(null, a))
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return cljs.core.rest.call(null, cljs.core.lazy_seq_value.call(null, a))
};
cljs.core.LazySeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.LazySeq(b, this.realized, this.x, this.__hash)
};
cljs.core.LazySeq.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.ChunkBuffer = function(a, b) {
  this.buf = a;
  this.end = b;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2
};
cljs.core.ChunkBuffer.cljs$lang$type = !0;
cljs.core.ChunkBuffer.cljs$lang$ctorStr = "cljs.core/ChunkBuffer";
cljs.core.ChunkBuffer.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/ChunkBuffer")
};
cljs.core.ChunkBuffer.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.end
};
cljs.core.ChunkBuffer.prototype.add = function(a) {
  this.buf[this.end] = a;
  return this.end += 1
};
cljs.core.ChunkBuffer.prototype.chunk = function() {
  var a = new cljs.core.ArrayChunk(this.buf, 0, this.end);
  this.buf = null;
  return a
};
cljs.core.chunk_buffer = function(a) {
  return new cljs.core.ChunkBuffer(Array(a), 0)
};
cljs.core.ArrayChunk = function(a, b, c) {
  this.arr = a;
  this.off = b;
  this.end = c;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 524306
};
cljs.core.ArrayChunk.cljs$lang$type = !0;
cljs.core.ArrayChunk.cljs$lang$ctorStr = "cljs.core/ArrayChunk";
cljs.core.ArrayChunk.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/ArrayChunk")
};
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.array_reduce.call(null, this.arr, b, this.arr[this.off], this.off + 1)
};
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.array_reduce.call(null, this.arr, b, c, this.off)
};
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$ = !0;
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$_drop_first$arity$1 = function() {
  if(this.off === this.end) {
    throw Error("-drop-first of empty chunk");
  }
  return new cljs.core.ArrayChunk(this.arr, this.off + 1, this.end)
};
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  return this.arr[this.off + b]
};
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  a = (a = 0 <= b) ? b < this.end - this.off : a;
  return a ? this.arr[this.off + b] : c
};
cljs.core.ArrayChunk.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.end - this.off
};
cljs.core.array_chunk = function() {
  var a = null, b = function(a) {
    return new cljs.core.ArrayChunk(a, 0, a.length)
  }, c = function(a, b) {
    return new cljs.core.ArrayChunk(a, b, a.length)
  }, d = function(a, b, c) {
    return new cljs.core.ArrayChunk(a, b, c)
  }, a = function(a, f, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, f);
      case 3:
        return d.call(this, a, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  return a
}();
cljs.core.ChunkedCons = function(a, b, c, d) {
  this.chunk = a;
  this.more = b;
  this.meta = c;
  this.__hash = d;
  this.cljs$lang$protocol_mask$partition0$ = 31850604;
  this.cljs$lang$protocol_mask$partition1$ = 1536
};
cljs.core.ChunkedCons.cljs$lang$type = !0;
cljs.core.ChunkedCons.cljs$lang$ctorStr = "cljs.core/ChunkedCons";
cljs.core.ChunkedCons.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/ChunkedCons")
};
cljs.core.ChunkedCons.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll.call(null, a)
};
cljs.core.ChunkedCons.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, a)
};
cljs.core.ChunkedCons.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return cljs.core._nth.call(null, this.chunk, 0)
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return 1 < cljs.core._count.call(null, this.chunk) ? new cljs.core.ChunkedCons(cljs.core._drop_first.call(null, this.chunk), this.more, this.meta, null) : null == this.more ? cljs.core.List.EMPTY : this.more
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = function() {
  return null == this.more ? null : this.more
};
cljs.core.ChunkedCons.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.ChunkedCons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.ChunkedCons(this.chunk, this.more, b, this.__hash)
};
cljs.core.ChunkedCons.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.ChunkedCons.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = function() {
  return this.chunk
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = function() {
  return null == this.more ? cljs.core.List.EMPTY : this.more
};
cljs.core.chunk_cons = function(a, b) {
  return 0 === cljs.core._count.call(null, a) ? b : new cljs.core.ChunkedCons(a, b, null, null)
};
cljs.core.chunk_append = function(a, b) {
  return a.add(b)
};
cljs.core.chunk = function(a) {
  return a.chunk()
};
cljs.core.chunk_first = function(a) {
  return cljs.core._chunked_first.call(null, a)
};
cljs.core.chunk_rest = function(a) {
  return cljs.core._chunked_rest.call(null, a)
};
cljs.core.chunk_next = function(a) {
  var b;
  a ? (b = (b = a.cljs$lang$protocol_mask$partition1$ & 1024) ? b : a.cljs$core$IChunkedNext$, b = b ? !0 : !1) : b = !1;
  return b ? cljs.core._chunked_next.call(null, a) : cljs.core.seq.call(null, cljs.core._chunked_rest.call(null, a))
};
cljs.core.to_array = function(a) {
  for(var b = [];;) {
    if(cljs.core.seq.call(null, a)) {
      b.push(cljs.core.first.call(null, a)), a = cljs.core.next.call(null, a)
    }else {
      return b
    }
  }
};
cljs.core.to_array_2d = function(a) {
  for(var b = Array(cljs.core.count.call(null, a)), c = 0, a = cljs.core.seq.call(null, a);;) {
    if(a) {
      b[c] = cljs.core.to_array.call(null, cljs.core.first.call(null, a)), c += 1, a = cljs.core.next.call(null, a)
    }else {
      break
    }
  }
  return b
};
cljs.core.int_array = function() {
  var a = null, b = function(b) {
    if("number" === typeof b) {
      return a.call(null, b, null)
    }
    if(cljs.core.seq_QMARK_.call(null, b)) {
      return cljs.core.into_array.call(null, b)
    }
    throw Error("int-array called with something other than size or ISeq");
  }, c = function(a, b) {
    var c = Array(a);
    if(cljs.core.seq_QMARK_.call(null, b)) {
      for(var g = 0, h = cljs.core.seq.call(null, b);;) {
        if(cljs.core.truth_(function() {
          var b = h;
          return b ? g < a : b
        }())) {
          c[g] = cljs.core.first.call(null, h);
          var i = g + 1, j = cljs.core.next.call(null, h), g = i, h = j
        }else {
          return c
        }
      }
    }else {
      for(i = 0;;) {
        if(i < a) {
          c[i] = b, i += 1
        }else {
          break
        }
      }
      return c
    }
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.long_array = function() {
  var a = null, b = function(b) {
    if("number" === typeof b) {
      return a.call(null, b, null)
    }
    if(cljs.core.seq_QMARK_.call(null, b)) {
      return cljs.core.into_array.call(null, b)
    }
    throw Error("long-array called with something other than size or ISeq");
  }, c = function(a, b) {
    var c = Array(a);
    if(cljs.core.seq_QMARK_.call(null, b)) {
      for(var g = 0, h = cljs.core.seq.call(null, b);;) {
        if(cljs.core.truth_(function() {
          var b = h;
          return b ? g < a : b
        }())) {
          c[g] = cljs.core.first.call(null, h);
          var i = g + 1, j = cljs.core.next.call(null, h), g = i, h = j
        }else {
          return c
        }
      }
    }else {
      for(i = 0;;) {
        if(i < a) {
          c[i] = b, i += 1
        }else {
          break
        }
      }
      return c
    }
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.double_array = function() {
  var a = null, b = function(b) {
    if("number" === typeof b) {
      return a.call(null, b, null)
    }
    if(cljs.core.seq_QMARK_.call(null, b)) {
      return cljs.core.into_array.call(null, b)
    }
    throw Error("double-array called with something other than size or ISeq");
  }, c = function(a, b) {
    var c = Array(a);
    if(cljs.core.seq_QMARK_.call(null, b)) {
      for(var g = 0, h = cljs.core.seq.call(null, b);;) {
        if(cljs.core.truth_(function() {
          var b = h;
          return b ? g < a : b
        }())) {
          c[g] = cljs.core.first.call(null, h);
          var i = g + 1, j = cljs.core.next.call(null, h), g = i, h = j
        }else {
          return c
        }
      }
    }else {
      for(i = 0;;) {
        if(i < a) {
          c[i] = b, i += 1
        }else {
          break
        }
      }
      return c
    }
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.object_array = function() {
  var a = null, b = function(b) {
    if("number" === typeof b) {
      return a.call(null, b, null)
    }
    if(cljs.core.seq_QMARK_.call(null, b)) {
      return cljs.core.into_array.call(null, b)
    }
    throw Error("object-array called with something other than size or ISeq");
  }, c = function(a, b) {
    var c = Array(a);
    if(cljs.core.seq_QMARK_.call(null, b)) {
      for(var g = 0, h = cljs.core.seq.call(null, b);;) {
        if(cljs.core.truth_(function() {
          var b = h;
          return b ? g < a : b
        }())) {
          c[g] = cljs.core.first.call(null, h);
          var i = g + 1, j = cljs.core.next.call(null, h), g = i, h = j
        }else {
          return c
        }
      }
    }else {
      for(i = 0;;) {
        if(i < a) {
          c[i] = b, i += 1
        }else {
          break
        }
      }
      return c
    }
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.bounded_count = function(a, b) {
  if(cljs.core.counted_QMARK_.call(null, a)) {
    return cljs.core.count.call(null, a)
  }
  for(var c = a, d = b, e = 0;;) {
    if(cljs.core.truth_(function() {
      var a = 0 < d;
      return a ? cljs.core.seq.call(null, c) : a
    }())) {
      var f = cljs.core.next.call(null, c), g = d - 1, e = e + 1, c = f, d = g
    }else {
      return e
    }
  }
};
cljs.core.spread = function spread(b) {
  return null == b ? null : null == cljs.core.next.call(null, b) ? cljs.core.seq.call(null, cljs.core.first.call(null, b)) : cljs.core.cons.call(null, cljs.core.first.call(null, b), spread.call(null, cljs.core.next.call(null, b)))
};
cljs.core.concat = function() {
  var a = null, b = function() {
    return new cljs.core.LazySeq(null, !1, function() {
      return null
    }, null)
  }, c = function(a) {
    return new cljs.core.LazySeq(null, !1, function() {
      return a
    }, null)
  }, d = function(b, c) {
    return new cljs.core.LazySeq(null, !1, function() {
      var d = cljs.core.seq.call(null, b);
      return d ? cljs.core.chunked_seq_QMARK_.call(null, d) ? cljs.core.chunk_cons.call(null, cljs.core.chunk_first.call(null, d), a.call(null, cljs.core.chunk_rest.call(null, d), c)) : cljs.core.cons.call(null, cljs.core.first.call(null, d), a.call(null, cljs.core.rest.call(null, d), c)) : c
    }, null)
  }, e = function(b, c, d) {
    return function k(a, b) {
      return new cljs.core.LazySeq(null, !1, function() {
        var c = cljs.core.seq.call(null, a);
        return c ? cljs.core.chunked_seq_QMARK_.call(null, c) ? cljs.core.chunk_cons.call(null, cljs.core.chunk_first.call(null, c), k.call(null, cljs.core.chunk_rest.call(null, c), b)) : cljs.core.cons.call(null, cljs.core.first.call(null, c), k.call(null, cljs.core.rest.call(null, c), b)) : cljs.core.truth_(b) ? k.call(null, cljs.core.first.call(null, b), cljs.core.next.call(null, b)) : null
      }, null)
    }.call(null, a.call(null, b, c), d)
  }, f = function(a, b, c) {
    var d = null;
    2 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return e.call(this, a, b, d)
  };
  f.cljs$lang$maxFixedArity = 2;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.rest(a);
    return e(b, c, a)
  };
  f.cljs$core$IFn$_invoke$arity$variadic = e;
  a = function(a, e, i) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a);
      case 2:
        return d.call(this, a, e);
      default:
        return f.cljs$core$IFn$_invoke$arity$variadic(a, e, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  a.cljs$core$IFn$_invoke$arity$2 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = f.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.list_STAR_ = function() {
  var a = null, b = function(a) {
    return cljs.core.seq.call(null, a)
  }, c = function(a, b) {
    return cljs.core.cons.call(null, a, b)
  }, d = function(a, b, c) {
    return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, c))
  }, e = function(a, b, c, d) {
    return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, d)))
  }, f = function(a, b, c, d, e) {
    return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, cljs.core.cons.call(null, d, cljs.core.spread.call(null, e)))))
  }, g = function(a, b, c, d, e) {
    var g = null;
    4 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
    return f.call(this, a, b, c, d, g)
  };
  g.cljs$lang$maxFixedArity = 4;
  g.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), e = cljs.core.first(a), a = cljs.core.rest(a);
    return f(b, c, d, e, a)
  };
  g.cljs$core$IFn$_invoke$arity$variadic = f;
  a = function(a, f, j, k, m) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, f);
      case 3:
        return d.call(this, a, f, j);
      case 4:
        return e.call(this, a, f, j, k);
      default:
        return g.cljs$core$IFn$_invoke$arity$variadic(a, f, j, k, cljs.core.array_seq(arguments, 4))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = g.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$4 = e;
  a.cljs$core$IFn$_invoke$arity$variadic = g.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.transient$ = function(a) {
  return cljs.core._as_transient.call(null, a)
};
cljs.core.persistent_BANG_ = function(a) {
  return cljs.core._persistent_BANG_.call(null, a)
};
cljs.core.conj_BANG_ = function(a, b) {
  return cljs.core._conj_BANG_.call(null, a, b)
};
cljs.core.assoc_BANG_ = function(a, b, c) {
  return cljs.core._assoc_BANG_.call(null, a, b, c)
};
cljs.core.dissoc_BANG_ = function(a, b) {
  return cljs.core._dissoc_BANG_.call(null, a, b)
};
cljs.core.pop_BANG_ = function(a) {
  return cljs.core._pop_BANG_.call(null, a)
};
cljs.core.disj_BANG_ = function(a, b) {
  return cljs.core._disjoin_BANG_.call(null, a, b)
};
cljs.core.apply_to = function(a, b, c) {
  var d = cljs.core.seq.call(null, c);
  if(0 === b) {
    return a.call(null)
  }
  var c = cljs.core._first.call(null, d), e = cljs.core._rest.call(null, d);
  if(1 === b) {
    return a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.call(null, c)
  }
  var d = cljs.core._first.call(null, e), f = cljs.core._rest.call(null, e);
  if(2 === b) {
    return a.cljs$core$IFn$_invoke$arity$2 ? a.cljs$core$IFn$_invoke$arity$2(c, d) : a.call(null, c, d)
  }
  var e = cljs.core._first.call(null, f), g = cljs.core._rest.call(null, f);
  if(3 === b) {
    return a.cljs$core$IFn$_invoke$arity$3 ? a.cljs$core$IFn$_invoke$arity$3(c, d, e) : a.call(null, c, d, e)
  }
  var f = cljs.core._first.call(null, g), h = cljs.core._rest.call(null, g);
  if(4 === b) {
    return a.cljs$core$IFn$_invoke$arity$4 ? a.cljs$core$IFn$_invoke$arity$4(c, d, e, f) : a.call(null, c, d, e, f)
  }
  g = cljs.core._first.call(null, h);
  h = cljs.core._rest.call(null, h);
  if(5 === b) {
    return a.cljs$core$IFn$_invoke$arity$5 ? a.cljs$core$IFn$_invoke$arity$5(c, d, e, f, g) : a.call(null, c, d, e, f, g)
  }
  var a = cljs.core._first.call(null, h), i = cljs.core._rest.call(null, h);
  if(6 === b) {
    return a.cljs$core$IFn$_invoke$arity$6 ? a.cljs$core$IFn$_invoke$arity$6(c, d, e, f, g, a) : a.call(null, c, d, e, f, g, a)
  }
  var h = cljs.core._first.call(null, i), j = cljs.core._rest.call(null, i);
  if(7 === b) {
    return a.cljs$core$IFn$_invoke$arity$7 ? a.cljs$core$IFn$_invoke$arity$7(c, d, e, f, g, a, h) : a.call(null, c, d, e, f, g, a, h)
  }
  var i = cljs.core._first.call(null, j), k = cljs.core._rest.call(null, j);
  if(8 === b) {
    return a.cljs$core$IFn$_invoke$arity$8 ? a.cljs$core$IFn$_invoke$arity$8(c, d, e, f, g, a, h, i) : a.call(null, c, d, e, f, g, a, h, i)
  }
  var j = cljs.core._first.call(null, k), m = cljs.core._rest.call(null, k);
  if(9 === b) {
    return a.cljs$core$IFn$_invoke$arity$9 ? a.cljs$core$IFn$_invoke$arity$9(c, d, e, f, g, a, h, i, j) : a.call(null, c, d, e, f, g, a, h, i, j)
  }
  var k = cljs.core._first.call(null, m), l = cljs.core._rest.call(null, m);
  if(10 === b) {
    return a.cljs$core$IFn$_invoke$arity$10 ? a.cljs$core$IFn$_invoke$arity$10(c, d, e, f, g, a, h, i, j, k) : a.call(null, c, d, e, f, g, a, h, i, j, k)
  }
  var m = cljs.core._first.call(null, l), n = cljs.core._rest.call(null, l);
  if(11 === b) {
    return a.cljs$core$IFn$_invoke$arity$11 ? a.cljs$core$IFn$_invoke$arity$11(c, d, e, f, g, a, h, i, j, k, m) : a.call(null, c, d, e, f, g, a, h, i, j, k, m)
  }
  var l = cljs.core._first.call(null, n), p = cljs.core._rest.call(null, n);
  if(12 === b) {
    return a.cljs$core$IFn$_invoke$arity$12 ? a.cljs$core$IFn$_invoke$arity$12(c, d, e, f, g, a, h, i, j, k, m, l) : a.call(null, c, d, e, f, g, a, h, i, j, k, m, l)
  }
  var n = cljs.core._first.call(null, p), q = cljs.core._rest.call(null, p);
  if(13 === b) {
    return a.cljs$core$IFn$_invoke$arity$13 ? a.cljs$core$IFn$_invoke$arity$13(c, d, e, f, g, a, h, i, j, k, m, l, n) : a.call(null, c, d, e, f, g, a, h, i, j, k, m, l, n)
  }
  var p = cljs.core._first.call(null, q), r = cljs.core._rest.call(null, q);
  if(14 === b) {
    return a.cljs$core$IFn$_invoke$arity$14 ? a.cljs$core$IFn$_invoke$arity$14(c, d, e, f, g, a, h, i, j, k, m, l, n, p) : a.call(null, c, d, e, f, g, a, h, i, j, k, m, l, n, p)
  }
  var q = cljs.core._first.call(null, r), s = cljs.core._rest.call(null, r);
  if(15 === b) {
    return a.cljs$core$IFn$_invoke$arity$15 ? a.cljs$core$IFn$_invoke$arity$15(c, d, e, f, g, a, h, i, j, k, m, l, n, p, q) : a.call(null, c, d, e, f, g, a, h, i, j, k, m, l, n, p, q)
  }
  var r = cljs.core._first.call(null, s), t = cljs.core._rest.call(null, s);
  if(16 === b) {
    return a.cljs$core$IFn$_invoke$arity$16 ? a.cljs$core$IFn$_invoke$arity$16(c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r) : a.call(null, c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r)
  }
  var s = cljs.core._first.call(null, t), u = cljs.core._rest.call(null, t);
  if(17 === b) {
    return a.cljs$core$IFn$_invoke$arity$17 ? a.cljs$core$IFn$_invoke$arity$17(c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r, s) : a.call(null, c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r, s)
  }
  var t = cljs.core._first.call(null, u), w = cljs.core._rest.call(null, u);
  if(18 === b) {
    return a.cljs$core$IFn$_invoke$arity$18 ? a.cljs$core$IFn$_invoke$arity$18(c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r, s, t) : a.call(null, c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r, s, t)
  }
  u = cljs.core._first.call(null, w);
  w = cljs.core._rest.call(null, w);
  if(19 === b) {
    return a.cljs$core$IFn$_invoke$arity$19 ? a.cljs$core$IFn$_invoke$arity$19(c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r, s, t, u) : a.call(null, c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r, s, t, u)
  }
  var D = cljs.core._first.call(null, w);
  cljs.core._rest.call(null, w);
  if(20 === b) {
    return a.cljs$core$IFn$_invoke$arity$20 ? a.cljs$core$IFn$_invoke$arity$20(c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r, s, t, u, D) : a.call(null, c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r, s, t, u, D)
  }
  throw Error("Only up to 20 arguments supported on functions");
};
cljs.core.apply = function() {
  var a = null, b = function(a, b) {
    var c = a.cljs$lang$maxFixedArity;
    if(a.cljs$lang$applyTo) {
      var d = cljs.core.bounded_count.call(null, b, c + 1);
      return d <= c ? cljs.core.apply_to.call(null, a, d, b) : a.cljs$lang$applyTo(b)
    }
    return a.apply(a, cljs.core.to_array.call(null, b))
  }, c = function(a, b, c) {
    b = cljs.core.list_STAR_.call(null, b, c);
    c = a.cljs$lang$maxFixedArity;
    if(a.cljs$lang$applyTo) {
      var d = cljs.core.bounded_count.call(null, b, c + 1);
      return d <= c ? cljs.core.apply_to.call(null, a, d, b) : a.cljs$lang$applyTo(b)
    }
    return a.apply(a, cljs.core.to_array.call(null, b))
  }, d = function(a, b, c, d) {
    b = cljs.core.list_STAR_.call(null, b, c, d);
    c = a.cljs$lang$maxFixedArity;
    return a.cljs$lang$applyTo ? (d = cljs.core.bounded_count.call(null, b, c + 1), d <= c ? cljs.core.apply_to.call(null, a, d, b) : a.cljs$lang$applyTo(b)) : a.apply(a, cljs.core.to_array.call(null, b))
  }, e = function(a, b, c, d, e) {
    b = cljs.core.list_STAR_.call(null, b, c, d, e);
    c = a.cljs$lang$maxFixedArity;
    return a.cljs$lang$applyTo ? (d = cljs.core.bounded_count.call(null, b, c + 1), d <= c ? cljs.core.apply_to.call(null, a, d, b) : a.cljs$lang$applyTo(b)) : a.apply(a, cljs.core.to_array.call(null, b))
  }, f = function(a, b, c, d, e, f) {
    b = cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, cljs.core.cons.call(null, d, cljs.core.cons.call(null, e, cljs.core.spread.call(null, f)))));
    c = a.cljs$lang$maxFixedArity;
    return a.cljs$lang$applyTo ? (d = cljs.core.bounded_count.call(null, b, c + 1), d <= c ? cljs.core.apply_to.call(null, a, d, b) : a.cljs$lang$applyTo(b)) : a.apply(a, cljs.core.to_array.call(null, b))
  }, g = function(a, b, c, d, e, g) {
    var n = null;
    5 < arguments.length && (n = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0));
    return f.call(this, a, b, c, d, e, n)
  };
  g.cljs$lang$maxFixedArity = 5;
  g.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), e = cljs.core.first(a), a = cljs.core.next(a), g = cljs.core.first(a), a = cljs.core.rest(a);
    return f(b, c, d, e, g, a)
  };
  g.cljs$core$IFn$_invoke$arity$variadic = f;
  a = function(a, f, j, k, m, l) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, j);
      case 4:
        return d.call(this, a, f, j, k);
      case 5:
        return e.call(this, a, f, j, k, m);
      default:
        return g.cljs$core$IFn$_invoke$arity$variadic(a, f, j, k, m, cljs.core.array_seq(arguments, 5))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 5;
  a.cljs$lang$applyTo = g.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  a.cljs$core$IFn$_invoke$arity$5 = e;
  a.cljs$core$IFn$_invoke$arity$variadic = g.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.vary_meta = function() {
  var a = function(a, b, e) {
    return cljs.core.with_meta.call(null, a, cljs.core.apply.call(null, b, cljs.core.meta.call(null, a), e))
  }, b = function(b, d, e) {
    var f = null;
    2 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.next(b), e = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, e, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.not_EQ_ = function() {
  var a = null, b = function(a, b) {
    return!cljs.core._EQ_.call(null, a, b)
  }, c = function(a, b, c) {
    return cljs.core.not.call(null, cljs.core.apply.call(null, cljs.core._EQ_, a, b, c))
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return!1;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function() {
    return!1
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.not_empty = function(a) {
  return cljs.core.seq.call(null, a) ? a : null
};
cljs.core.every_QMARK_ = function(a, b) {
  for(;;) {
    if(null == cljs.core.seq.call(null, b)) {
      return!0
    }
    if(cljs.core.truth_(a.call(null, cljs.core.first.call(null, b)))) {
      var c = a, d = cljs.core.next.call(null, b), a = c, b = d
    }else {
      return!1
    }
  }
};
cljs.core.not_every_QMARK_ = function(a, b) {
  return!cljs.core.every_QMARK_.call(null, a, b)
};
cljs.core.some = function(a, b) {
  for(;;) {
    if(cljs.core.seq.call(null, b)) {
      var c = a.call(null, cljs.core.first.call(null, b));
      if(cljs.core.truth_(c)) {
        return c
      }
      var c = a, d = cljs.core.next.call(null, b), a = c, b = d
    }else {
      return null
    }
  }
};
cljs.core.not_any_QMARK_ = function(a, b) {
  return cljs.core.not.call(null, cljs.core.some.call(null, a, b))
};
cljs.core.even_QMARK_ = function(a) {
  if(cljs.core.integer_QMARK_.call(null, a)) {
    return 0 === (a & 1)
  }
  throw Error([cljs.core.str("Argument must be an integer: "), cljs.core.str(a)].join(""));
};
cljs.core.odd_QMARK_ = function(a) {
  return!cljs.core.even_QMARK_.call(null, a)
};
cljs.core.identity = function(a) {
  return a
};
cljs.core.complement = function(a) {
  var b = null, c = function(b, c, d) {
    return cljs.core.not.call(null, cljs.core.apply.call(null, a, b, c, d))
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  b = function(b, c, g) {
    switch(arguments.length) {
      case 0:
        return cljs.core.not.call(null, a.call(null));
      case 1:
        return cljs.core.not.call(null, a.call(null, b));
      case 2:
        return cljs.core.not.call(null, a.call(null, b, c));
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(b, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = d.cljs$lang$applyTo;
  return b
};
cljs.core.constantly = function(a) {
  var b = function(b) {
    0 < arguments.length && cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0);
    return a
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    cljs.core.seq(b);
    return a
  };
  b.cljs$core$IFn$_invoke$arity$variadic = function() {
    return a
  };
  return b
};
cljs.core.comp = function() {
  var a = null, b = function() {
    return cljs.core.identity
  }, c = function(a, b) {
    var c = null, d = function(c, d, e, f) {
      return a.call(null, cljs.core.apply.call(null, b, c, d, e, f))
    }, e = function(a, b, c, e) {
      var f = null;
      3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return d.call(this, a, b, c, f)
    };
    e.cljs$lang$maxFixedArity = 3;
    e.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), e = cljs.core.first(a), a = cljs.core.rest(a);
      return d(b, c, e, a)
    };
    e.cljs$core$IFn$_invoke$arity$variadic = d;
    c = function(c, d, f, i) {
      switch(arguments.length) {
        case 0:
          return a.call(null, b.call(null));
        case 1:
          return a.call(null, b.call(null, c));
        case 2:
          return a.call(null, b.call(null, c, d));
        case 3:
          return a.call(null, b.call(null, c, d, f));
        default:
          return e.cljs$core$IFn$_invoke$arity$variadic(c, d, f, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    c.cljs$lang$maxFixedArity = 3;
    c.cljs$lang$applyTo = e.cljs$lang$applyTo;
    return c
  }, d = function(a, b, c) {
    var d = null, e = function(d, e, f, j) {
      return a.call(null, b.call(null, cljs.core.apply.call(null, c, d, e, f, j)))
    }, f = function(a, b, c, d) {
      var f = null;
      3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return e.call(this, a, b, c, f)
    };
    f.cljs$lang$maxFixedArity = 3;
    f.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return e(b, c, d, a)
    };
    f.cljs$core$IFn$_invoke$arity$variadic = e;
    d = function(d, e, j, k) {
      switch(arguments.length) {
        case 0:
          return a.call(null, b.call(null, c.call(null)));
        case 1:
          return a.call(null, b.call(null, c.call(null, d)));
        case 2:
          return a.call(null, b.call(null, c.call(null, d, e)));
        case 3:
          return a.call(null, b.call(null, c.call(null, d, e, j)));
        default:
          return f.cljs$core$IFn$_invoke$arity$variadic(d, e, j, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = f.cljs$lang$applyTo;
    return d
  }, e = function(a, b, c, d) {
    var e = cljs.core.reverse.call(null, cljs.core.list_STAR_.call(null, a, b, c, d)), f = function(a) {
      for(var a = cljs.core.apply.call(null, cljs.core.first.call(null, e), a), b = cljs.core.next.call(null, e);;) {
        if(b) {
          a = cljs.core.first.call(null, b).call(null, a), b = cljs.core.next.call(null, b)
        }else {
          return a
        }
      }
    }, a = function(a) {
      var b = null;
      0 < arguments.length && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
      return f.call(this, b)
    };
    a.cljs$lang$maxFixedArity = 0;
    a.cljs$lang$applyTo = function(a) {
      a = cljs.core.seq(a);
      return f(a)
    };
    a.cljs$core$IFn$_invoke$arity$variadic = f;
    return a
  }, f = function(a, b, c, d) {
    var f = null;
    3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return e.call(this, a, b, c, f)
  };
  f.cljs$lang$maxFixedArity = 3;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return e(b, c, d, a)
  };
  f.cljs$core$IFn$_invoke$arity$variadic = e;
  a = function(a, e, i, j) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return a;
      case 2:
        return c.call(this, a, e);
      case 3:
        return d.call(this, a, e, i);
      default:
        return f.cljs$core$IFn$_invoke$arity$variadic(a, e, i, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = f.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.partial = function() {
  var a = null, b = function(a, b) {
    var c = function(c) {
      return cljs.core.apply.call(null, a, b, c)
    }, d = function(a) {
      var b = null;
      0 < arguments.length && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
      return c.call(this, b)
    };
    d.cljs$lang$maxFixedArity = 0;
    d.cljs$lang$applyTo = function(a) {
      a = cljs.core.seq(a);
      return c(a)
    };
    d.cljs$core$IFn$_invoke$arity$variadic = c;
    return d
  }, c = function(a, b, c) {
    var d = function(d) {
      return cljs.core.apply.call(null, a, b, c, d)
    }, e = function(a) {
      var b = null;
      0 < arguments.length && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
      return d.call(this, b)
    };
    e.cljs$lang$maxFixedArity = 0;
    e.cljs$lang$applyTo = function(a) {
      a = cljs.core.seq(a);
      return d(a)
    };
    e.cljs$core$IFn$_invoke$arity$variadic = d;
    return e
  }, d = function(a, b, c, d) {
    var e = function(e) {
      return cljs.core.apply.call(null, a, b, c, d, e)
    }, f = function(a) {
      var b = null;
      0 < arguments.length && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
      return e.call(this, b)
    };
    f.cljs$lang$maxFixedArity = 0;
    f.cljs$lang$applyTo = function(a) {
      a = cljs.core.seq(a);
      return e(a)
    };
    f.cljs$core$IFn$_invoke$arity$variadic = e;
    return f
  }, e = function(a, b, c, d, e) {
    var f = function(f) {
      return cljs.core.apply.call(null, a, b, c, d, cljs.core.concat.call(null, e, f))
    }, l = function(a) {
      var b = null;
      0 < arguments.length && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
      return f.call(this, b)
    };
    l.cljs$lang$maxFixedArity = 0;
    l.cljs$lang$applyTo = function(a) {
      a = cljs.core.seq(a);
      return f(a)
    };
    l.cljs$core$IFn$_invoke$arity$variadic = f;
    return l
  }, f = function(a, b, c, d, f) {
    var m = null;
    4 < arguments.length && (m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
    return e.call(this, a, b, c, d, m)
  };
  f.cljs$lang$maxFixedArity = 4;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return e(b, c, d, f, a)
  };
  f.cljs$core$IFn$_invoke$arity$variadic = e;
  a = function(a, e, i, j, k) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, i);
      case 4:
        return d.call(this, a, e, i, j);
      default:
        return f.cljs$core$IFn$_invoke$arity$variadic(a, e, i, j, cljs.core.array_seq(arguments, 4))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = f.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.fnil = function() {
  var a = null, b = function(a, b) {
    var c = null, d = function(c, d, g, h) {
      return cljs.core.apply.call(null, a, null == c ? b : c, d, g, h)
    }, i = function(a, b, c, e) {
      var f = null;
      3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return d.call(this, a, b, c, f)
    };
    i.cljs$lang$maxFixedArity = 3;
    i.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), e = cljs.core.first(a), a = cljs.core.rest(a);
      return d(b, c, e, a)
    };
    i.cljs$core$IFn$_invoke$arity$variadic = d;
    c = function(c, d, g, h) {
      switch(arguments.length) {
        case 1:
          return a.call(null, null == c ? b : c);
        case 2:
          return a.call(null, null == c ? b : c, d);
        case 3:
          return a.call(null, null == c ? b : c, d, g);
        default:
          return i.cljs$core$IFn$_invoke$arity$variadic(c, d, g, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    c.cljs$lang$maxFixedArity = 3;
    c.cljs$lang$applyTo = i.cljs$lang$applyTo;
    return c
  }, c = function(a, b, c) {
    var d = null, i = function(d, h, i, j) {
      return cljs.core.apply.call(null, a, null == d ? b : d, null == h ? c : h, i, j)
    }, j = function(a, b, c, d) {
      var e = null;
      3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return i.call(this, a, b, c, e)
    };
    j.cljs$lang$maxFixedArity = 3;
    j.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return i(b, c, d, a)
    };
    j.cljs$core$IFn$_invoke$arity$variadic = i;
    d = function(d, h, i, n) {
      switch(arguments.length) {
        case 2:
          return a.call(null, null == d ? b : d, null == h ? c : h);
        case 3:
          return a.call(null, null == d ? b : d, null == h ? c : h, i);
        default:
          return j.cljs$core$IFn$_invoke$arity$variadic(d, h, i, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = j.cljs$lang$applyTo;
    return d
  }, d = function(a, b, c, d) {
    var i = null, j = function(i, j, k, p) {
      return cljs.core.apply.call(null, a, null == i ? b : i, null == j ? c : j, null == k ? d : k, p)
    }, k = function(a, b, c, d) {
      var e = null;
      3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return j.call(this, a, b, c, e)
    };
    k.cljs$lang$maxFixedArity = 3;
    k.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return j(b, c, d, a)
    };
    k.cljs$core$IFn$_invoke$arity$variadic = j;
    i = function(i, j, n, p) {
      switch(arguments.length) {
        case 2:
          return a.call(null, null == i ? b : i, null == j ? c : j);
        case 3:
          return a.call(null, null == i ? b : i, null == j ? c : j, null == n ? d : n);
        default:
          return k.cljs$core$IFn$_invoke$arity$variadic(i, j, n, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    i.cljs$lang$maxFixedArity = 3;
    i.cljs$lang$applyTo = k.cljs$lang$applyTo;
    return i
  }, a = function(a, f, g, h) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  return a
}();
cljs.core.map_indexed = function(a, b) {
  return function d(b, f) {
    return new cljs.core.LazySeq(null, !1, function() {
      var g = cljs.core.seq.call(null, f);
      if(g) {
        if(cljs.core.chunked_seq_QMARK_.call(null, g)) {
          for(var h = cljs.core.chunk_first.call(null, g), i = cljs.core.count.call(null, h), j = cljs.core.chunk_buffer.call(null, i), k = 0;;) {
            if(k < i) {
              cljs.core.chunk_append.call(null, j, a.call(null, b + k, cljs.core._nth.call(null, h, k))), k += 1
            }else {
              break
            }
          }
          return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, j), d.call(null, b + i, cljs.core.chunk_rest.call(null, g)))
        }
        return cljs.core.cons.call(null, a.call(null, b, cljs.core.first.call(null, g)), d.call(null, b + 1, cljs.core.rest.call(null, g)))
      }
      return null
    }, null)
  }.call(null, 0, b)
};
cljs.core.keep = function keep(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    var d = cljs.core.seq.call(null, c);
    if(d) {
      if(cljs.core.chunked_seq_QMARK_.call(null, d)) {
        for(var e = cljs.core.chunk_first.call(null, d), f = cljs.core.count.call(null, e), g = cljs.core.chunk_buffer.call(null, f), h = 0;;) {
          if(h < f) {
            var i = b.call(null, cljs.core._nth.call(null, e, h));
            null != i && cljs.core.chunk_append.call(null, g, i);
            h += 1
          }else {
            break
          }
        }
        return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, g), keep.call(null, b, cljs.core.chunk_rest.call(null, d)))
      }
      e = b.call(null, cljs.core.first.call(null, d));
      return null == e ? keep.call(null, b, cljs.core.rest.call(null, d)) : cljs.core.cons.call(null, e, keep.call(null, b, cljs.core.rest.call(null, d)))
    }
    return null
  }, null)
};
cljs.core.keep_indexed = function(a, b) {
  return function d(b, f) {
    return new cljs.core.LazySeq(null, !1, function() {
      var g = cljs.core.seq.call(null, f);
      if(g) {
        if(cljs.core.chunked_seq_QMARK_.call(null, g)) {
          for(var h = cljs.core.chunk_first.call(null, g), i = cljs.core.count.call(null, h), j = cljs.core.chunk_buffer.call(null, i), k = 0;;) {
            if(k < i) {
              var m = a.call(null, b + k, cljs.core._nth.call(null, h, k));
              null != m && cljs.core.chunk_append.call(null, j, m);
              k += 1
            }else {
              break
            }
          }
          return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, j), d.call(null, b + i, cljs.core.chunk_rest.call(null, g)))
        }
        h = a.call(null, b, cljs.core.first.call(null, g));
        return null == h ? d.call(null, b + 1, cljs.core.rest.call(null, g)) : cljs.core.cons.call(null, h, d.call(null, b + 1, cljs.core.rest.call(null, g)))
      }
      return null
    }, null)
  }.call(null, 0, b)
};
cljs.core.every_pred = function() {
  var a = null, b = function(a) {
    var b = null, c = function(b) {
      return cljs.core.boolean$.call(null, a.call(null, b))
    }, d = function(b, c) {
      return cljs.core.boolean$.call(null, function() {
        var d = a.call(null, b);
        return cljs.core.truth_(d) ? a.call(null, c) : d
      }())
    }, e = function(b, c, d) {
      return cljs.core.boolean$.call(null, function() {
        var e = a.call(null, b);
        return cljs.core.truth_(e) ? (e = a.call(null, c), cljs.core.truth_(e) ? a.call(null, d) : e) : e
      }())
    }, f = function(c, d, e, f) {
      return cljs.core.boolean$.call(null, function() {
        var i = b.call(null, c, d, e);
        return cljs.core.truth_(i) ? cljs.core.every_QMARK_.call(null, a, f) : i
      }())
    }, l = function(a, b, c, d) {
      var e = null;
      3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return f.call(this, a, b, c, e)
    };
    l.cljs$lang$maxFixedArity = 3;
    l.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return f(b, c, d, a)
    };
    l.cljs$core$IFn$_invoke$arity$variadic = f;
    b = function(a, b, f, g) {
      switch(arguments.length) {
        case 0:
          return!0;
        case 1:
          return c.call(this, a);
        case 2:
          return d.call(this, a, b);
        case 3:
          return e.call(this, a, b, f);
        default:
          return l.cljs$core$IFn$_invoke$arity$variadic(a, b, f, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = l.cljs$lang$applyTo;
    b.cljs$core$IFn$_invoke$arity$0 = function() {
      return!0
    };
    b.cljs$core$IFn$_invoke$arity$1 = c;
    b.cljs$core$IFn$_invoke$arity$2 = d;
    b.cljs$core$IFn$_invoke$arity$3 = e;
    b.cljs$core$IFn$_invoke$arity$variadic = l.cljs$core$IFn$_invoke$arity$variadic;
    return b
  }, c = function(a, b) {
    var c = null, d = function(c) {
      return cljs.core.boolean$.call(null, function() {
        var d = a.call(null, c);
        return cljs.core.truth_(d) ? b.call(null, c) : d
      }())
    }, e = function(c, d) {
      return cljs.core.boolean$.call(null, function() {
        var e = a.call(null, c);
        return cljs.core.truth_(e) && (e = a.call(null, d), cljs.core.truth_(e)) ? (e = b.call(null, c), cljs.core.truth_(e) ? b.call(null, d) : e) : e
      }())
    }, f = function(c, d, e) {
      return cljs.core.boolean$.call(null, function() {
        var f = a.call(null, c);
        return cljs.core.truth_(f) && (f = a.call(null, d), cljs.core.truth_(f) && (f = a.call(null, e), cljs.core.truth_(f) && (f = b.call(null, c), cljs.core.truth_(f)))) ? (f = b.call(null, d), cljs.core.truth_(f) ? b.call(null, e) : f) : f
      }())
    }, l = function(d, e, f, j) {
      return cljs.core.boolean$.call(null, function() {
        var k = c.call(null, d, e, f);
        return cljs.core.truth_(k) ? cljs.core.every_QMARK_.call(null, function(c) {
          var d = a.call(null, c);
          return cljs.core.truth_(d) ? b.call(null, c) : d
        }, j) : k
      }())
    }, n = function(a, b, c, d) {
      var e = null;
      3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return l.call(this, a, b, c, e)
    };
    n.cljs$lang$maxFixedArity = 3;
    n.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return l(b, c, d, a)
    };
    n.cljs$core$IFn$_invoke$arity$variadic = l;
    c = function(a, b, c, g) {
      switch(arguments.length) {
        case 0:
          return!0;
        case 1:
          return d.call(this, a);
        case 2:
          return e.call(this, a, b);
        case 3:
          return f.call(this, a, b, c);
        default:
          return n.cljs$core$IFn$_invoke$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    c.cljs$lang$maxFixedArity = 3;
    c.cljs$lang$applyTo = n.cljs$lang$applyTo;
    c.cljs$core$IFn$_invoke$arity$0 = function() {
      return!0
    };
    c.cljs$core$IFn$_invoke$arity$1 = d;
    c.cljs$core$IFn$_invoke$arity$2 = e;
    c.cljs$core$IFn$_invoke$arity$3 = f;
    c.cljs$core$IFn$_invoke$arity$variadic = n.cljs$core$IFn$_invoke$arity$variadic;
    return c
  }, d = function(a, b, c) {
    var d = null, e = function(d) {
      return cljs.core.boolean$.call(null, function() {
        var e = a.call(null, d);
        return cljs.core.truth_(e) ? (e = b.call(null, d), cljs.core.truth_(e) ? c.call(null, d) : e) : e
      }())
    }, f = function(d, e) {
      return cljs.core.boolean$.call(null, function() {
        var f = a.call(null, d);
        return cljs.core.truth_(f) && (f = b.call(null, d), cljs.core.truth_(f) && (f = c.call(null, d), cljs.core.truth_(f) && (f = a.call(null, e), cljs.core.truth_(f)))) ? (f = b.call(null, e), cljs.core.truth_(f) ? c.call(null, e) : f) : f
      }())
    }, l = function(d, e, f) {
      return cljs.core.boolean$.call(null, function() {
        var j = a.call(null, d);
        return cljs.core.truth_(j) && (j = b.call(null, d), cljs.core.truth_(j) && (j = c.call(null, d), cljs.core.truth_(j) && (j = a.call(null, e), cljs.core.truth_(j) && (j = b.call(null, e), cljs.core.truth_(j) && (j = c.call(null, e), cljs.core.truth_(j) && (j = a.call(null, f), cljs.core.truth_(j))))))) ? (j = b.call(null, f), cljs.core.truth_(j) ? c.call(null, f) : j) : j
      }())
    }, n = function(e, f, k, m) {
      return cljs.core.boolean$.call(null, function() {
        var l = d.call(null, e, f, k);
        return cljs.core.truth_(l) ? cljs.core.every_QMARK_.call(null, function(d) {
          var e = a.call(null, d);
          return cljs.core.truth_(e) ? (e = b.call(null, d), cljs.core.truth_(e) ? c.call(null, d) : e) : e
        }, m) : l
      }())
    }, p = function(a, b, c, d) {
      var e = null;
      3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return n.call(this, a, b, c, e)
    };
    p.cljs$lang$maxFixedArity = 3;
    p.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return n(b, c, d, a)
    };
    p.cljs$core$IFn$_invoke$arity$variadic = n;
    d = function(a, b, c, d) {
      switch(arguments.length) {
        case 0:
          return!0;
        case 1:
          return e.call(this, a);
        case 2:
          return f.call(this, a, b);
        case 3:
          return l.call(this, a, b, c);
        default:
          return p.cljs$core$IFn$_invoke$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = p.cljs$lang$applyTo;
    d.cljs$core$IFn$_invoke$arity$0 = function() {
      return!0
    };
    d.cljs$core$IFn$_invoke$arity$1 = e;
    d.cljs$core$IFn$_invoke$arity$2 = f;
    d.cljs$core$IFn$_invoke$arity$3 = l;
    d.cljs$core$IFn$_invoke$arity$variadic = p.cljs$core$IFn$_invoke$arity$variadic;
    return d
  }, e = function(a, b, c, d) {
    var e = cljs.core.list_STAR_.call(null, a, b, c, d), f = null, l = function(a) {
      return cljs.core.every_QMARK_.call(null, function(b) {
        return b.call(null, a)
      }, e)
    }, n = function(a, b) {
      return cljs.core.every_QMARK_.call(null, function(c) {
        var d = c.call(null, a);
        return cljs.core.truth_(d) ? c.call(null, b) : d
      }, e)
    }, p = function(a, b, c) {
      return cljs.core.every_QMARK_.call(null, function(d) {
        var e = d.call(null, a);
        return cljs.core.truth_(e) ? (e = d.call(null, b), cljs.core.truth_(e) ? d.call(null, c) : e) : e
      }, e)
    }, q = function(a, b, c, d) {
      return cljs.core.boolean$.call(null, function() {
        var g = f.call(null, a, b, c);
        return cljs.core.truth_(g) ? cljs.core.every_QMARK_.call(null, function(a) {
          return cljs.core.every_QMARK_.call(null, a, d)
        }, e) : g
      }())
    }, r = function(a, b, c, d) {
      var e = null;
      3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return q.call(this, a, b, c, e)
    };
    r.cljs$lang$maxFixedArity = 3;
    r.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return q(b, c, d, a)
    };
    r.cljs$core$IFn$_invoke$arity$variadic = q;
    f = function(a, b, c, d) {
      switch(arguments.length) {
        case 0:
          return!0;
        case 1:
          return l.call(this, a);
        case 2:
          return n.call(this, a, b);
        case 3:
          return p.call(this, a, b, c);
        default:
          return r.cljs$core$IFn$_invoke$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    f.cljs$lang$maxFixedArity = 3;
    f.cljs$lang$applyTo = r.cljs$lang$applyTo;
    f.cljs$core$IFn$_invoke$arity$0 = function() {
      return!0
    };
    f.cljs$core$IFn$_invoke$arity$1 = l;
    f.cljs$core$IFn$_invoke$arity$2 = n;
    f.cljs$core$IFn$_invoke$arity$3 = p;
    f.cljs$core$IFn$_invoke$arity$variadic = r.cljs$core$IFn$_invoke$arity$variadic;
    return f
  }, f = function(a, b, c, d) {
    var f = null;
    3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return e.call(this, a, b, c, f)
  };
  f.cljs$lang$maxFixedArity = 3;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return e(b, c, d, a)
  };
  f.cljs$core$IFn$_invoke$arity$variadic = e;
  a = function(a, e, i, j) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e);
      case 3:
        return d.call(this, a, e, i);
      default:
        return f.cljs$core$IFn$_invoke$arity$variadic(a, e, i, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = f.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.some_fn = function() {
  var a = null, b = function(a) {
    var b = null, c = function(b) {
      return a.call(null, b)
    }, d = function(b, c) {
      var d = a.call(null, b);
      return cljs.core.truth_(d) ? d : a.call(null, c)
    }, e = function(b, c, d) {
      b = a.call(null, b);
      if(cljs.core.truth_(b)) {
        return b
      }
      c = a.call(null, c);
      return cljs.core.truth_(c) ? c : a.call(null, d)
    }, f = function(c, d, e, f) {
      c = b.call(null, c, d, e);
      return cljs.core.truth_(c) ? c : cljs.core.some.call(null, a, f)
    }, l = function(a, b, c, d) {
      var e = null;
      3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return f.call(this, a, b, c, e)
    };
    l.cljs$lang$maxFixedArity = 3;
    l.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return f(b, c, d, a)
    };
    l.cljs$core$IFn$_invoke$arity$variadic = f;
    b = function(a, b, f, g) {
      switch(arguments.length) {
        case 0:
          return null;
        case 1:
          return c.call(this, a);
        case 2:
          return d.call(this, a, b);
        case 3:
          return e.call(this, a, b, f);
        default:
          return l.cljs$core$IFn$_invoke$arity$variadic(a, b, f, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = l.cljs$lang$applyTo;
    b.cljs$core$IFn$_invoke$arity$0 = function() {
      return null
    };
    b.cljs$core$IFn$_invoke$arity$1 = c;
    b.cljs$core$IFn$_invoke$arity$2 = d;
    b.cljs$core$IFn$_invoke$arity$3 = e;
    b.cljs$core$IFn$_invoke$arity$variadic = l.cljs$core$IFn$_invoke$arity$variadic;
    return b
  }, c = function(a, b) {
    var c = null, d = function(c) {
      var d = a.call(null, c);
      return cljs.core.truth_(d) ? d : b.call(null, c)
    }, e = function(c, d) {
      var e = a.call(null, c);
      if(cljs.core.truth_(e)) {
        return e
      }
      e = a.call(null, d);
      if(cljs.core.truth_(e)) {
        return e
      }
      e = b.call(null, c);
      return cljs.core.truth_(e) ? e : b.call(null, d)
    }, f = function(c, d, e) {
      var f = a.call(null, c);
      if(cljs.core.truth_(f)) {
        return f
      }
      f = a.call(null, d);
      if(cljs.core.truth_(f)) {
        return f
      }
      f = a.call(null, e);
      if(cljs.core.truth_(f)) {
        return f
      }
      c = b.call(null, c);
      if(cljs.core.truth_(c)) {
        return c
      }
      d = b.call(null, d);
      return cljs.core.truth_(d) ? d : b.call(null, e)
    }, l = function(d, e, f, j) {
      d = c.call(null, d, e, f);
      return cljs.core.truth_(d) ? d : cljs.core.some.call(null, function(c) {
        var d = a.call(null, c);
        return cljs.core.truth_(d) ? d : b.call(null, c)
      }, j)
    }, n = function(a, b, c, d) {
      var e = null;
      3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return l.call(this, a, b, c, e)
    };
    n.cljs$lang$maxFixedArity = 3;
    n.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return l(b, c, d, a)
    };
    n.cljs$core$IFn$_invoke$arity$variadic = l;
    c = function(a, b, c, g) {
      switch(arguments.length) {
        case 0:
          return null;
        case 1:
          return d.call(this, a);
        case 2:
          return e.call(this, a, b);
        case 3:
          return f.call(this, a, b, c);
        default:
          return n.cljs$core$IFn$_invoke$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    c.cljs$lang$maxFixedArity = 3;
    c.cljs$lang$applyTo = n.cljs$lang$applyTo;
    c.cljs$core$IFn$_invoke$arity$0 = function() {
      return null
    };
    c.cljs$core$IFn$_invoke$arity$1 = d;
    c.cljs$core$IFn$_invoke$arity$2 = e;
    c.cljs$core$IFn$_invoke$arity$3 = f;
    c.cljs$core$IFn$_invoke$arity$variadic = n.cljs$core$IFn$_invoke$arity$variadic;
    return c
  }, d = function(a, b, c) {
    var d = null, e = function(d) {
      var e = a.call(null, d);
      if(cljs.core.truth_(e)) {
        return e
      }
      e = b.call(null, d);
      return cljs.core.truth_(e) ? e : c.call(null, d)
    }, f = function(d, e) {
      var f = a.call(null, d);
      if(cljs.core.truth_(f)) {
        return f
      }
      f = b.call(null, d);
      if(cljs.core.truth_(f)) {
        return f
      }
      f = c.call(null, d);
      if(cljs.core.truth_(f)) {
        return f
      }
      f = a.call(null, e);
      if(cljs.core.truth_(f)) {
        return f
      }
      f = b.call(null, e);
      return cljs.core.truth_(f) ? f : c.call(null, e)
    }, l = function(d, e, f) {
      var j = a.call(null, d);
      if(cljs.core.truth_(j)) {
        return j
      }
      j = b.call(null, d);
      if(cljs.core.truth_(j)) {
        return j
      }
      d = c.call(null, d);
      if(cljs.core.truth_(d)) {
        return d
      }
      d = a.call(null, e);
      if(cljs.core.truth_(d)) {
        return d
      }
      d = b.call(null, e);
      if(cljs.core.truth_(d)) {
        return d
      }
      e = c.call(null, e);
      if(cljs.core.truth_(e)) {
        return e
      }
      e = a.call(null, f);
      if(cljs.core.truth_(e)) {
        return e
      }
      e = b.call(null, f);
      return cljs.core.truth_(e) ? e : c.call(null, f)
    }, n = function(e, f, k, l) {
      e = d.call(null, e, f, k);
      return cljs.core.truth_(e) ? e : cljs.core.some.call(null, function(d) {
        var e = a.call(null, d);
        if(cljs.core.truth_(e)) {
          return e
        }
        e = b.call(null, d);
        return cljs.core.truth_(e) ? e : c.call(null, d)
      }, l)
    }, p = function(a, b, c, d) {
      var e = null;
      3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return n.call(this, a, b, c, e)
    };
    p.cljs$lang$maxFixedArity = 3;
    p.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return n(b, c, d, a)
    };
    p.cljs$core$IFn$_invoke$arity$variadic = n;
    d = function(a, b, c, d) {
      switch(arguments.length) {
        case 0:
          return null;
        case 1:
          return e.call(this, a);
        case 2:
          return f.call(this, a, b);
        case 3:
          return l.call(this, a, b, c);
        default:
          return p.cljs$core$IFn$_invoke$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = p.cljs$lang$applyTo;
    d.cljs$core$IFn$_invoke$arity$0 = function() {
      return null
    };
    d.cljs$core$IFn$_invoke$arity$1 = e;
    d.cljs$core$IFn$_invoke$arity$2 = f;
    d.cljs$core$IFn$_invoke$arity$3 = l;
    d.cljs$core$IFn$_invoke$arity$variadic = p.cljs$core$IFn$_invoke$arity$variadic;
    return d
  }, e = function(a, b, c, d) {
    var e = cljs.core.list_STAR_.call(null, a, b, c, d), f = null, l = function(a) {
      return cljs.core.some.call(null, function(b) {
        return b.call(null, a)
      }, e)
    }, n = function(a, b) {
      return cljs.core.some.call(null, function(c) {
        var d = c.call(null, a);
        return cljs.core.truth_(d) ? d : c.call(null, b)
      }, e)
    }, p = function(a, b, c) {
      return cljs.core.some.call(null, function(d) {
        var e = d.call(null, a);
        if(cljs.core.truth_(e)) {
          return e
        }
        e = d.call(null, b);
        return cljs.core.truth_(e) ? e : d.call(null, c)
      }, e)
    }, q = function(a, b, c, d) {
      a = f.call(null, a, b, c);
      return cljs.core.truth_(a) ? a : cljs.core.some.call(null, function(a) {
        return cljs.core.some.call(null, a, d)
      }, e)
    }, r = function(a, b, c, d) {
      var e = null;
      3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return q.call(this, a, b, c, e)
    };
    r.cljs$lang$maxFixedArity = 3;
    r.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return q(b, c, d, a)
    };
    r.cljs$core$IFn$_invoke$arity$variadic = q;
    f = function(a, b, c, d) {
      switch(arguments.length) {
        case 0:
          return null;
        case 1:
          return l.call(this, a);
        case 2:
          return n.call(this, a, b);
        case 3:
          return p.call(this, a, b, c);
        default:
          return r.cljs$core$IFn$_invoke$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    f.cljs$lang$maxFixedArity = 3;
    f.cljs$lang$applyTo = r.cljs$lang$applyTo;
    f.cljs$core$IFn$_invoke$arity$0 = function() {
      return null
    };
    f.cljs$core$IFn$_invoke$arity$1 = l;
    f.cljs$core$IFn$_invoke$arity$2 = n;
    f.cljs$core$IFn$_invoke$arity$3 = p;
    f.cljs$core$IFn$_invoke$arity$variadic = r.cljs$core$IFn$_invoke$arity$variadic;
    return f
  }, f = function(a, b, c, d) {
    var f = null;
    3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return e.call(this, a, b, c, f)
  };
  f.cljs$lang$maxFixedArity = 3;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return e(b, c, d, a)
  };
  f.cljs$core$IFn$_invoke$arity$variadic = e;
  a = function(a, e, i, j) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e);
      case 3:
        return d.call(this, a, e, i);
      default:
        return f.cljs$core$IFn$_invoke$arity$variadic(a, e, i, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = f.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.map = function() {
  var a = null, b = function(b, c) {
    return new cljs.core.LazySeq(null, !1, function() {
      var d = cljs.core.seq.call(null, c);
      if(d) {
        if(cljs.core.chunked_seq_QMARK_.call(null, d)) {
          for(var e = cljs.core.chunk_first.call(null, d), f = cljs.core.count.call(null, e), m = cljs.core.chunk_buffer.call(null, f), l = 0;;) {
            if(l < f) {
              cljs.core.chunk_append.call(null, m, b.call(null, cljs.core._nth.call(null, e, l))), l += 1
            }else {
              break
            }
          }
          return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, m), a.call(null, b, cljs.core.chunk_rest.call(null, d)))
        }
        return cljs.core.cons.call(null, b.call(null, cljs.core.first.call(null, d)), a.call(null, b, cljs.core.rest.call(null, d)))
      }
      return null
    }, null)
  }, c = function(b, c, d) {
    return new cljs.core.LazySeq(null, !1, function() {
      var e = cljs.core.seq.call(null, c), f = cljs.core.seq.call(null, d);
      return(e ? f : e) ? cljs.core.cons.call(null, b.call(null, cljs.core.first.call(null, e), cljs.core.first.call(null, f)), a.call(null, b, cljs.core.rest.call(null, e), cljs.core.rest.call(null, f))) : null
    }, null)
  }, d = function(b, c, d, e) {
    return new cljs.core.LazySeq(null, !1, function() {
      var f = cljs.core.seq.call(null, c), m = cljs.core.seq.call(null, d), l = cljs.core.seq.call(null, e);
      return(f ? m ? l : m : f) ? cljs.core.cons.call(null, b.call(null, cljs.core.first.call(null, f), cljs.core.first.call(null, m), cljs.core.first.call(null, l)), a.call(null, b, cljs.core.rest.call(null, f), cljs.core.rest.call(null, m), cljs.core.rest.call(null, l))) : null
    }, null)
  }, e = function(b, c, d, e, f) {
    return a.call(null, function(a) {
      return cljs.core.apply.call(null, b, a)
    }, function l(b) {
      return new cljs.core.LazySeq(null, !1, function() {
        var c = a.call(null, cljs.core.seq, b);
        return cljs.core.every_QMARK_.call(null, cljs.core.identity, c) ? cljs.core.cons.call(null, a.call(null, cljs.core.first, c), l.call(null, a.call(null, cljs.core.rest, c))) : null
      }, null)
    }.call(null, cljs.core.conj.call(null, f, e, d, c)))
  }, f = function(a, b, c, d, f) {
    var m = null;
    4 < arguments.length && (m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
    return e.call(this, a, b, c, d, m)
  };
  f.cljs$lang$maxFixedArity = 4;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return e(b, c, d, f, a)
  };
  f.cljs$core$IFn$_invoke$arity$variadic = e;
  a = function(a, e, i, j, k) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, i);
      case 4:
        return d.call(this, a, e, i, j);
      default:
        return f.cljs$core$IFn$_invoke$arity$variadic(a, e, i, j, cljs.core.array_seq(arguments, 4))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = f.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.take = function take(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    if(0 < b) {
      var d = cljs.core.seq.call(null, c);
      return d ? cljs.core.cons.call(null, cljs.core.first.call(null, d), take.call(null, b - 1, cljs.core.rest.call(null, d))) : null
    }
    return null
  }, null)
};
cljs.core.drop = function(a, b) {
  var c = function(a, b) {
    for(;;) {
      var c = cljs.core.seq.call(null, b);
      if(cljs.core.truth_(function() {
        var b = 0 < a;
        return b ? c : b
      }())) {
        var g = a - 1, h = cljs.core.rest.call(null, c), a = g, b = h
      }else {
        return c
      }
    }
  };
  return new cljs.core.LazySeq(null, !1, function() {
    return c.call(null, a, b)
  }, null)
};
cljs.core.drop_last = function() {
  var a = null, b = function(b) {
    return a.call(null, 1, b)
  }, c = function(a, b) {
    return cljs.core.map.call(null, function(a) {
      return a
    }, b, cljs.core.drop.call(null, a, b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.take_last = function(a, b) {
  for(var c = cljs.core.seq.call(null, b), d = cljs.core.seq.call(null, cljs.core.drop.call(null, a, b));;) {
    if(d) {
      c = cljs.core.next.call(null, c), d = cljs.core.next.call(null, d)
    }else {
      return c
    }
  }
};
cljs.core.drop_while = function(a, b) {
  var c = function(a, b) {
    for(;;) {
      var c = cljs.core.seq.call(null, b);
      if(cljs.core.truth_(function() {
        var b = c;
        return b ? a.call(null, cljs.core.first.call(null, c)) : b
      }())) {
        var g = a, h = cljs.core.rest.call(null, c), a = g, b = h
      }else {
        return c
      }
    }
  };
  return new cljs.core.LazySeq(null, !1, function() {
    return c.call(null, a, b)
  }, null)
};
cljs.core.cycle = function cycle(b) {
  return new cljs.core.LazySeq(null, !1, function() {
    var c = cljs.core.seq.call(null, b);
    return c ? cljs.core.concat.call(null, c, cycle.call(null, c)) : null
  }, null)
};
cljs.core.split_at = function(a, b) {
  return cljs.core.PersistentVector.fromArray([cljs.core.take.call(null, a, b), cljs.core.drop.call(null, a, b)], !0)
};
cljs.core.repeat = function() {
  var a = null, b = function(b) {
    return new cljs.core.LazySeq(null, !1, function() {
      return cljs.core.cons.call(null, b, a.call(null, b))
    }, null)
  }, c = function(b, c) {
    return cljs.core.take.call(null, b, a.call(null, c))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.replicate = function(a, b) {
  return cljs.core.take.call(null, a, cljs.core.repeat.call(null, b))
};
cljs.core.repeatedly = function() {
  var a = null, b = function(b) {
    return new cljs.core.LazySeq(null, !1, function() {
      return cljs.core.cons.call(null, b.call(null), a.call(null, b))
    }, null)
  }, c = function(b, c) {
    return cljs.core.take.call(null, b, a.call(null, c))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.iterate = function iterate(b, c) {
  return cljs.core.cons.call(null, c, new cljs.core.LazySeq(null, !1, function() {
    return iterate.call(null, b, b.call(null, c))
  }, null))
};
cljs.core.interleave = function() {
  var a = null, b = function(b, c) {
    return new cljs.core.LazySeq(null, !1, function() {
      var d = cljs.core.seq.call(null, b), h = cljs.core.seq.call(null, c);
      return(d ? h : d) ? cljs.core.cons.call(null, cljs.core.first.call(null, d), cljs.core.cons.call(null, cljs.core.first.call(null, h), a.call(null, cljs.core.rest.call(null, d), cljs.core.rest.call(null, h)))) : null
    }, null)
  }, c = function(b, c, d) {
    return new cljs.core.LazySeq(null, !1, function() {
      var h = cljs.core.map.call(null, cljs.core.seq, cljs.core.conj.call(null, d, c, b));
      return cljs.core.every_QMARK_.call(null, cljs.core.identity, h) ? cljs.core.concat.call(null, cljs.core.map.call(null, cljs.core.first, h), cljs.core.apply.call(null, a, cljs.core.map.call(null, cljs.core.rest, h))) : null
    }, null)
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.interpose = function(a, b) {
  return cljs.core.drop.call(null, 1, cljs.core.interleave.call(null, cljs.core.repeat.call(null, a), b))
};
cljs.core.flatten1 = function(a) {
  return function c(a, e) {
    return new cljs.core.LazySeq(null, !1, function() {
      var f = cljs.core.seq.call(null, a);
      return f ? cljs.core.cons.call(null, cljs.core.first.call(null, f), c.call(null, cljs.core.rest.call(null, f), e)) : cljs.core.seq.call(null, e) ? c.call(null, cljs.core.first.call(null, e), cljs.core.rest.call(null, e)) : null
    }, null)
  }.call(null, null, a)
};
cljs.core.mapcat = function() {
  var a = null, b = function(a, b) {
    return cljs.core.flatten1.call(null, cljs.core.map.call(null, a, b))
  }, c = function(a, b, c) {
    return cljs.core.flatten1.call(null, cljs.core.apply.call(null, cljs.core.map, a, b, c))
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.filter = function filter(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    var d = cljs.core.seq.call(null, c);
    if(d) {
      if(cljs.core.chunked_seq_QMARK_.call(null, d)) {
        for(var e = cljs.core.chunk_first.call(null, d), f = cljs.core.count.call(null, e), g = cljs.core.chunk_buffer.call(null, f), h = 0;;) {
          if(h < f) {
            cljs.core.truth_(b.call(null, cljs.core._nth.call(null, e, h))) && cljs.core.chunk_append.call(null, g, cljs.core._nth.call(null, e, h)), h += 1
          }else {
            break
          }
        }
        return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, g), filter.call(null, b, cljs.core.chunk_rest.call(null, d)))
      }
      e = cljs.core.first.call(null, d);
      d = cljs.core.rest.call(null, d);
      return cljs.core.truth_(b.call(null, e)) ? cljs.core.cons.call(null, e, filter.call(null, b, d)) : filter.call(null, b, d)
    }
    return null
  }, null)
};
cljs.core.remove = function(a, b) {
  return cljs.core.filter.call(null, cljs.core.complement.call(null, a), b)
};
cljs.core.tree_seq = function(a, b, c) {
  return function e(c) {
    return new cljs.core.LazySeq(null, !1, function() {
      return cljs.core.cons.call(null, c, cljs.core.truth_(a.call(null, c)) ? cljs.core.mapcat.call(null, e, b.call(null, c)) : null)
    }, null)
  }.call(null, c)
};
cljs.core.flatten = function(a) {
  return cljs.core.filter.call(null, function(a) {
    return!cljs.core.sequential_QMARK_.call(null, a)
  }, cljs.core.rest.call(null, cljs.core.tree_seq.call(null, cljs.core.sequential_QMARK_, cljs.core.seq, a)))
};
cljs.core.into = function(a, b) {
  var c;
  null != a ? (a ? (c = (c = a.cljs$lang$protocol_mask$partition1$ & 4) ? c : a.cljs$core$IEditableCollection$, c = c ? !0 : !1) : c = !1, c = c ? cljs.core.persistent_BANG_.call(null, cljs.core.reduce.call(null, cljs.core._conj_BANG_, cljs.core.transient$.call(null, a), b)) : cljs.core.reduce.call(null, cljs.core._conj, a, b)) : c = cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, b);
  return c
};
cljs.core.mapv = function() {
  var a = null, b = function(a, b) {
    return cljs.core.persistent_BANG_.call(null, cljs.core.reduce.call(null, function(b, c) {
      return cljs.core.conj_BANG_.call(null, b, a.call(null, c))
    }, cljs.core.transient$.call(null, cljs.core.PersistentVector.EMPTY), b))
  }, c = function(a, b, c) {
    return cljs.core.into.call(null, cljs.core.PersistentVector.EMPTY, cljs.core.map.call(null, a, b, c))
  }, d = function(a, b, c, d) {
    return cljs.core.into.call(null, cljs.core.PersistentVector.EMPTY, cljs.core.map.call(null, a, b, c, d))
  }, e = function(a, b, c, d, e) {
    return cljs.core.into.call(null, cljs.core.PersistentVector.EMPTY, cljs.core.apply.call(null, cljs.core.map, a, b, c, d, e))
  }, f = function(a, b, c, d, f) {
    var m = null;
    4 < arguments.length && (m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
    return e.call(this, a, b, c, d, m)
  };
  f.cljs$lang$maxFixedArity = 4;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return e(b, c, d, f, a)
  };
  f.cljs$core$IFn$_invoke$arity$variadic = e;
  a = function(a, e, i, j, k) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, i);
      case 4:
        return d.call(this, a, e, i, j);
      default:
        return f.cljs$core$IFn$_invoke$arity$variadic(a, e, i, j, cljs.core.array_seq(arguments, 4))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = f.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.filterv = function(a, b) {
  return cljs.core.persistent_BANG_.call(null, cljs.core.reduce.call(null, function(b, d) {
    return cljs.core.truth_(a.call(null, d)) ? cljs.core.conj_BANG_.call(null, b, d) : b
  }, cljs.core.transient$.call(null, cljs.core.PersistentVector.EMPTY), b))
};
cljs.core.partition = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, b, c)
  }, c = function(b, c, d) {
    return new cljs.core.LazySeq(null, !1, function() {
      var h = cljs.core.seq.call(null, d);
      if(h) {
        var i = cljs.core.take.call(null, b, h);
        return b === cljs.core.count.call(null, i) ? cljs.core.cons.call(null, i, a.call(null, b, c, cljs.core.drop.call(null, c, h))) : null
      }
      return null
    }, null)
  }, d = function(b, c, d, h) {
    return new cljs.core.LazySeq(null, !1, function() {
      var i = cljs.core.seq.call(null, h);
      if(i) {
        var j = cljs.core.take.call(null, b, i);
        return b === cljs.core.count.call(null, j) ? cljs.core.cons.call(null, j, a.call(null, b, c, d, cljs.core.drop.call(null, c, i))) : cljs.core.list.call(null, cljs.core.take.call(null, b, cljs.core.concat.call(null, j, d)))
      }
      return null
    }, null)
  }, a = function(a, f, g, h) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  return a
}();
cljs.core.get_in = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, c, null)
  }, c = function(a, b, c) {
    for(var g = cljs.core.lookup_sentinel, b = cljs.core.seq.call(null, b);;) {
      if(b) {
        var h;
        if(h = a) {
          var i = void 0;
          i = (i = h.cljs$lang$protocol_mask$partition0$ & 256) ? i : h.cljs$core$ILookup$;
          h = i ? !0 : h.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_.call(null, cljs.core.ILookup, h)
        }else {
          h = cljs.core.type_satisfies_.call(null, cljs.core.ILookup, h)
        }
        if(h) {
          a = cljs.core.get.call(null, a, cljs.core.first.call(null, b), g);
          if(g === a) {
            return c
          }
          b = cljs.core.next.call(null, b)
        }else {
          return c
        }
      }else {
        return a
      }
    }
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.assoc_in = function assoc_in(b, c, d) {
  var e = cljs.core.nth.call(null, c, 0, null), c = cljs.core.nthnext.call(null, c, 1);
  return cljs.core.truth_(c) ? cljs.core.assoc.call(null, b, e, assoc_in.call(null, cljs.core.get.call(null, b, e), c, d)) : cljs.core.assoc.call(null, b, e, d)
};
cljs.core.update_in = function() {
  var a = null, b = function(b, c, d) {
    var e = cljs.core.nth.call(null, c, 0, null), c = cljs.core.nthnext.call(null, c, 1);
    return cljs.core.truth_(c) ? cljs.core.assoc.call(null, b, e, a.call(null, cljs.core.get.call(null, b, e), c, d)) : cljs.core.assoc.call(null, b, e, d.call(null, cljs.core.get.call(null, b, e)))
  }, c = function(b, c, d, e) {
    var f = cljs.core.nth.call(null, c, 0, null), c = cljs.core.nthnext.call(null, c, 1);
    return cljs.core.truth_(c) ? cljs.core.assoc.call(null, b, f, a.call(null, cljs.core.get.call(null, b, f), c, d, e)) : cljs.core.assoc.call(null, b, f, d.call(null, cljs.core.get.call(null, b, f), e))
  }, d = function(b, c, d, e, f) {
    var g = cljs.core.nth.call(null, c, 0, null), c = cljs.core.nthnext.call(null, c, 1);
    return cljs.core.truth_(c) ? cljs.core.assoc.call(null, b, g, a.call(null, cljs.core.get.call(null, b, g), c, d, e, f)) : cljs.core.assoc.call(null, b, g, d.call(null, cljs.core.get.call(null, b, g), e, f))
  }, e = function(b, c, d, e, f, g) {
    var n = cljs.core.nth.call(null, c, 0, null), c = cljs.core.nthnext.call(null, c, 1);
    return cljs.core.truth_(c) ? cljs.core.assoc.call(null, b, n, a.call(null, cljs.core.get.call(null, b, n), c, d, e, f, g)) : cljs.core.assoc.call(null, b, n, d.call(null, cljs.core.get.call(null, b, n), e, f, g))
  }, f = function(b, c, d, e, f, g, n) {
    var p = cljs.core.nth.call(null, c, 0, null), c = cljs.core.nthnext.call(null, c, 1);
    return cljs.core.truth_(c) ? cljs.core.assoc.call(null, b, p, cljs.core.apply.call(null, a, cljs.core.get.call(null, b, p), c, d, e, f, g, n)) : cljs.core.assoc.call(null, b, p, cljs.core.apply.call(null, d, cljs.core.get.call(null, b, p), e, f, g, n))
  }, g = function(a, b, c, d, e, g, n) {
    var p = null;
    6 < arguments.length && (p = cljs.core.array_seq(Array.prototype.slice.call(arguments, 6), 0));
    return f.call(this, a, b, c, d, e, g, p)
  };
  g.cljs$lang$maxFixedArity = 6;
  g.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), e = cljs.core.first(a), a = cljs.core.next(a), g = cljs.core.first(a), a = cljs.core.next(a), n = cljs.core.first(a), a = cljs.core.rest(a);
    return f(b, c, d, e, g, n, a)
  };
  g.cljs$core$IFn$_invoke$arity$variadic = f;
  a = function(a, f, j, k, m, l, n) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, f, j);
      case 4:
        return c.call(this, a, f, j, k);
      case 5:
        return d.call(this, a, f, j, k, m);
      case 6:
        return e.call(this, a, f, j, k, m, l);
      default:
        return g.cljs$core$IFn$_invoke$arity$variadic(a, f, j, k, m, l, cljs.core.array_seq(arguments, 6))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 6;
  a.cljs$lang$applyTo = g.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$4 = c;
  a.cljs$core$IFn$_invoke$arity$5 = d;
  a.cljs$core$IFn$_invoke$arity$6 = e;
  a.cljs$core$IFn$_invoke$arity$variadic = g.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.VectorNode = function(a, b) {
  this.edit = a;
  this.arr = b
};
cljs.core.VectorNode.cljs$lang$type = !0;
cljs.core.VectorNode.cljs$lang$ctorStr = "cljs.core/VectorNode";
cljs.core.VectorNode.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/VectorNode")
};
cljs.core.pv_fresh_node = function(a) {
  return new cljs.core.VectorNode(a, Array(32))
};
cljs.core.pv_aget = function(a, b) {
  return a.arr[b]
};
cljs.core.pv_aset = function(a, b, c) {
  return a.arr[b] = c
};
cljs.core.pv_clone_node = function(a) {
  return new cljs.core.VectorNode(a.edit, a.arr.slice())
};
cljs.core.tail_off = function(a) {
  a = a.cnt;
  return 32 > a ? 0 : a - 1 >>> 5 << 5
};
cljs.core.new_path = function(a, b, c) {
  for(;;) {
    if(0 === b) {
      return c
    }
    var d = cljs.core.pv_fresh_node.call(null, a);
    cljs.core.pv_aset.call(null, d, 0, c);
    c = d;
    b -= 5
  }
};
cljs.core.push_tail = function push_tail(b, c, d, e) {
  var f = cljs.core.pv_clone_node.call(null, d), g = b.cnt - 1 >>> c & 31;
  5 === c ? cljs.core.pv_aset.call(null, f, g, e) : (d = cljs.core.pv_aget.call(null, d, g), b = null != d ? push_tail.call(null, b, c - 5, d, e) : cljs.core.new_path.call(null, null, c - 5, e), cljs.core.pv_aset.call(null, f, g, b));
  return f
};
cljs.core.array_for = function(a, b) {
  var c;
  c = (c = 0 <= b) ? b < a.cnt : c;
  if(c) {
    if(b >= cljs.core.tail_off.call(null, a)) {
      return a.tail
    }
    c = a.root;
    for(var d = a.shift;;) {
      if(0 < d) {
        c = cljs.core.pv_aget.call(null, c, b >>> d & 31), d -= 5
      }else {
        return c.arr
      }
    }
  }else {
    throw Error([cljs.core.str("No item "), cljs.core.str(b), cljs.core.str(" in vector of length "), cljs.core.str(a.cnt)].join(""));
  }
};
cljs.core.do_assoc = function do_assoc(b, c, d, e, f) {
  var g = cljs.core.pv_clone_node.call(null, d);
  if(0 === c) {
    cljs.core.pv_aset.call(null, g, e & 31, f)
  }else {
    var h = e >>> c & 31;
    cljs.core.pv_aset.call(null, g, h, do_assoc.call(null, b, c - 5, cljs.core.pv_aget.call(null, d, h), e, f))
  }
  return g
};
cljs.core.pop_tail = function pop_tail(b, c, d) {
  var e = b.cnt - 2 >>> c & 31;
  if(5 < c) {
    b = pop_tail.call(null, b, c - 5, cljs.core.pv_aget.call(null, d, e));
    c = null == b;
    if(c ? 0 === e : c) {
      return null
    }
    d = cljs.core.pv_clone_node.call(null, d);
    cljs.core.pv_aset.call(null, d, e, b);
    return d
  }
  if(0 === e) {
    return null
  }
  d = cljs.core.pv_clone_node.call(null, d);
  cljs.core.pv_aset.call(null, d, e, null);
  return d
};
cljs.core.PersistentVector = function(a, b, c, d, e, f) {
  this.meta = a;
  this.cnt = b;
  this.shift = c;
  this.root = d;
  this.tail = e;
  this.__hash = f;
  this.cljs$lang$protocol_mask$partition1$ = 4;
  this.cljs$lang$protocol_mask$partition0$ = 167668511
};
cljs.core.PersistentVector.cljs$lang$type = !0;
cljs.core.PersistentVector.cljs$lang$ctorStr = "cljs.core/PersistentVector";
cljs.core.PersistentVector.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/PersistentVector")
};
cljs.core.PersistentVector.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function() {
  return new cljs.core.TransientVector(this.cnt, this.shift, cljs.core.tv_editable_root.call(null, this.root), cljs.core.tv_editable_tail.call(null, this.tail))
};
cljs.core.PersistentVector.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll.call(null, a)
};
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, null)
};
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, c)
};
cljs.core.PersistentVector.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  var d;
  d = (d = 0 <= b) ? b < this.cnt : d;
  if(d) {
    return cljs.core.tail_off.call(null, a) <= b ? (a = this.tail.slice(), a[b & 31] = c, new cljs.core.PersistentVector(this.meta, this.cnt, this.shift, this.root, a, null)) : new cljs.core.PersistentVector(this.meta, this.cnt, this.shift, cljs.core.do_assoc.call(null, a, this.shift, this.root, b, c), this.tail, null)
  }
  if(b === this.cnt) {
    return a.cljs$core$ICollection$_conj$arity$2(a, c)
  }
  throw Error([cljs.core.str("Index "), cljs.core.str(b), cljs.core.str(" out of bounds  [0,"), cljs.core.str(this.cnt), cljs.core.str("]")].join(""));
};
cljs.core.PersistentVector.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentVector.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.PersistentVector.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(a, b, c) {
  for(var c = [0, c], d = 0;;) {
    if(d < this.cnt) {
      var e = cljs.core.array_for.call(null, a, d), f = e.length;
      a: {
        for(var g = 0, h = c[1];;) {
          if(g < f) {
            if(h = b.call(null, h, g + d, e[g]), cljs.core.reduced_QMARK_.call(null, h)) {
              e = h;
              break a
            }else {
              g += 1
            }
          }else {
            c[0] = f;
            e = c[1] = h;
            break a
          }
        }
        e = void 0
      }
      if(cljs.core.reduced_QMARK_.call(null, e)) {
        return cljs.core.deref.call(null, e)
      }
      d += c[0]
    }else {
      return c[1]
    }
  }
};
cljs.core.PersistentVector.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  if(32 > this.cnt - cljs.core.tail_off.call(null, a)) {
    var c = this.tail.slice();
    c.push(b);
    return new cljs.core.PersistentVector(this.meta, this.cnt + 1, this.shift, this.root, c, null)
  }
  var d = this.cnt >>> 5 > 1 << this.shift, c = d ? this.shift + 5 : this.shift;
  d ? (d = cljs.core.pv_fresh_node.call(null, null), cljs.core.pv_aset.call(null, d, 0, this.root), cljs.core.pv_aset.call(null, d, 1, cljs.core.new_path.call(null, null, this.shift, new cljs.core.VectorNode(null, this.tail)))) : d = cljs.core.push_tail.call(null, a, this.shift, this.root, new cljs.core.VectorNode(null, this.tail));
  return new cljs.core.PersistentVector(this.meta, this.cnt + 1, c, d, [b], null)
};
cljs.core.PersistentVector.prototype.cljs$core$IReversible$_rseq$arity$1 = function(a) {
  return 0 < this.cnt ? new cljs.core.RSeq(a, this.cnt - 1, null) : cljs.core.List.EMPTY
};
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_key$arity$1 = function(a) {
  return a.cljs$core$IIndexed$_nth$arity$2(a, 0)
};
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_val$arity$1 = function(a) {
  return a.cljs$core$IIndexed$_nth$arity$2(a, 1)
};
cljs.core.PersistentVector.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.call(null, a, b)
};
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.call(null, a, b, c)
};
cljs.core.PersistentVector.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return 0 === this.cnt ? null : 32 > this.cnt ? cljs.core.array_seq.call(null, this.tail) : cljs.core.chunked_seq.call(null, a, 0, 0)
};
cljs.core.PersistentVector.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.cnt
};
cljs.core.PersistentVector.prototype.cljs$core$IStack$_peek$arity$1 = function(a) {
  return 0 < this.cnt ? a.cljs$core$IIndexed$_nth$arity$2(a, this.cnt - 1) : null
};
cljs.core.PersistentVector.prototype.cljs$core$IStack$_pop$arity$1 = function(a) {
  if(0 === this.cnt) {
    throw Error("Can't pop empty vector");
  }
  if(1 === this.cnt) {
    return cljs.core._with_meta.call(null, cljs.core.PersistentVector.EMPTY, this.meta)
  }
  if(1 < this.cnt - cljs.core.tail_off.call(null, a)) {
    return new cljs.core.PersistentVector(this.meta, this.cnt - 1, this.shift, this.root, this.tail.slice(0, -1), null)
  }
  var b = cljs.core.array_for.call(null, a, this.cnt - 2), a = cljs.core.pop_tail.call(null, a, this.shift, this.root), a = null == a ? cljs.core.PersistentVector.EMPTY_NODE : a, c = this.cnt - 1, d;
  d = (d = 5 < this.shift) ? null == cljs.core.pv_aget.call(null, a, 1) : d;
  return d ? new cljs.core.PersistentVector(this.meta, c, this.shift - 5, cljs.core.pv_aget.call(null, a, 0), b, null) : new cljs.core.PersistentVector(this.meta, c, this.shift, a, b, null)
};
cljs.core.PersistentVector.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(a, b, c) {
  return a.cljs$core$IAssociative$_assoc$arity$3(a, b, c)
};
cljs.core.PersistentVector.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.PersistentVector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentVector(b, this.cnt, this.shift, this.root, this.tail, this.__hash)
};
cljs.core.PersistentVector.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  return cljs.core.array_for.call(null, a, b)[b & 31]
};
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  var d;
  d = (d = 0 <= b) ? b < this.cnt : d;
  return d ? a.cljs$core$IIndexed$_nth$arity$2(a, b) : c
};
cljs.core.PersistentVector.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.EMPTY, this.meta)
};
cljs.core.PersistentVector.EMPTY_NODE = new cljs.core.VectorNode(null, Array(32));
cljs.core.PersistentVector.EMPTY = new cljs.core.PersistentVector(null, 0, 5, cljs.core.PersistentVector.EMPTY_NODE, [], 0);
cljs.core.PersistentVector.fromArray = function(a, b) {
  var c = a.length, d = b ? a : a.slice();
  if(32 > c) {
    return new cljs.core.PersistentVector(null, c, 5, cljs.core.PersistentVector.EMPTY_NODE, d, null)
  }
  for(var e = d.slice(0, 32), f = new cljs.core.PersistentVector(null, 32, 5, cljs.core.PersistentVector.EMPTY_NODE, e, null), e = 32, g = cljs.core._as_transient.call(null, f);;) {
    if(e < c) {
      f = e + 1, g = cljs.core.conj_BANG_.call(null, g, d[e]), e = f
    }else {
      return cljs.core.persistent_BANG_.call(null, g)
    }
  }
};
cljs.core.vec = function(a) {
  return cljs.core._persistent_BANG_.call(null, cljs.core.reduce.call(null, cljs.core._conj_BANG_, cljs.core._as_transient.call(null, cljs.core.PersistentVector.EMPTY), a))
};
cljs.core.vector = function() {
  var a = function(a) {
    return cljs.core.vec.call(null, a)
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.ChunkedSeq = function(a, b, c, d, e, f) {
  this.vec = a;
  this.node = b;
  this.i = c;
  this.off = d;
  this.meta = e;
  this.__hash = f;
  this.cljs$lang$protocol_mask$partition0$ = 31719660;
  this.cljs$lang$protocol_mask$partition1$ = 1536
};
cljs.core.ChunkedSeq.cljs$lang$type = !0;
cljs.core.ChunkedSeq.cljs$lang$ctorStr = "cljs.core/ChunkedSeq";
cljs.core.ChunkedSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/ChunkedSeq")
};
cljs.core.ChunkedSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll.call(null, a)
};
cljs.core.ChunkedSeq.prototype.cljs$core$INext$_next$arity$1 = function(a) {
  return this.off + 1 < this.node.length ? (a = cljs.core.chunked_seq.call(null, this.vec, this.node, this.i, this.off + 1), null == a ? null : a) : a.cljs$core$IChunkedNext$_chunked_next$arity$1(a)
};
cljs.core.ChunkedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, a)
};
cljs.core.ChunkedSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return this.node[this.off]
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return this.off + 1 < this.node.length ? (a = cljs.core.chunked_seq.call(null, this.vec, this.node, this.i, this.off + 1), null == a ? cljs.core.List.EMPTY : a) : a.cljs$core$IChunkedSeq$_chunked_rest$arity$1(a)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = function() {
  var a = this.node.length, a = this.i + a < cljs.core._count.call(null, this.vec) ? cljs.core.chunked_seq.call(null, this.vec, this.i + a, 0) : null;
  return null == a ? null : a
};
cljs.core.ChunkedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return cljs.core.chunked_seq.call(null, this.vec, this.node, this.i, this.off, b)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.ChunkedSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.EMPTY, this.meta)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = function() {
  return cljs.core.array_chunk.call(null, this.node, this.off)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = function() {
  var a = this.node.length, a = this.i + a < cljs.core._count.call(null, this.vec) ? cljs.core.chunked_seq.call(null, this.vec, this.i + a, 0) : null;
  return null == a ? cljs.core.List.EMPTY : a
};
cljs.core.chunked_seq = function() {
  var a = null, b = function(a, b, c) {
    return new cljs.core.ChunkedSeq(a, cljs.core.array_for.call(null, a, b), b, c, null, null)
  }, c = function(a, b, c, d) {
    return new cljs.core.ChunkedSeq(a, b, c, d, null, null)
  }, d = function(a, b, c, d, i) {
    return new cljs.core.ChunkedSeq(a, b, c, d, i, null)
  }, a = function(a, f, g, h, i) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, f, g);
      case 4:
        return c.call(this, a, f, g, h);
      case 5:
        return d.call(this, a, f, g, h, i)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$4 = c;
  a.cljs$core$IFn$_invoke$arity$5 = d;
  return a
}();
cljs.core.Subvec = function(a, b, c, d, e) {
  this.meta = a;
  this.v = b;
  this.start = c;
  this.end = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32400159
};
cljs.core.Subvec.cljs$lang$type = !0;
cljs.core.Subvec.cljs$lang$ctorStr = "cljs.core/Subvec";
cljs.core.Subvec.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/Subvec")
};
cljs.core.Subvec.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll.call(null, a)
};
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, null)
};
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, c)
};
cljs.core.Subvec.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  a = this.start + b;
  return cljs.core.build_subvec.call(null, this.meta, cljs.core.assoc.call(null, this.v, a, c), this.start, this.end > a + 1 ? this.end : a + 1, null)
};
cljs.core.Subvec.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.Subvec.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.Subvec.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.build_subvec.call(null, this.meta, cljs.core._assoc_n.call(null, this.v, this.end, b), this.start, this.end + 1, null)
};
cljs.core.Subvec.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.call(null, a, b)
};
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.call(null, a, b, c)
};
cljs.core.Subvec.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  var a = this;
  return function c(d) {
    return d === a.end ? null : cljs.core.cons.call(null, cljs.core._nth.call(null, a.v, d), new cljs.core.LazySeq(null, !1, function() {
      return c.call(null, d + 1)
    }, null))
  }.call(null, a.start)
};
cljs.core.Subvec.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.end - this.start
};
cljs.core.Subvec.prototype.cljs$core$IStack$_peek$arity$1 = function() {
  return cljs.core._nth.call(null, this.v, this.end - 1)
};
cljs.core.Subvec.prototype.cljs$core$IStack$_pop$arity$1 = function() {
  if(this.start === this.end) {
    throw Error("Can't pop empty vector");
  }
  return cljs.core.build_subvec.call(null, this.meta, this.v, this.start, this.end - 1, null)
};
cljs.core.Subvec.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(a, b, c) {
  return a.cljs$core$IAssociative$_assoc$arity$3(a, b, c)
};
cljs.core.Subvec.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.Subvec.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return cljs.core.build_subvec.call(null, b, this.v, this.start, this.end, this.__hash)
};
cljs.core.Subvec.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  return cljs.core._nth.call(null, this.v, this.start + b)
};
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  return cljs.core._nth.call(null, this.v, this.start + b, c)
};
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.EMPTY, this.meta)
};
cljs.core.build_subvec = function(a, b, c, d, e) {
  for(;;) {
    if(b instanceof cljs.core.Subvec) {
      var f = b.start + c, g = b.start + d, b = b.v, c = f, d = g
    }else {
      var h = cljs.core.count.call(null, b);
      if(function() {
        var a = 0 > c;
        return a || (a = 0 > d) ? a : (a = c > h) ? a : d > h
      }()) {
        throw Error("Index out of bounds");
      }
      return new cljs.core.Subvec(a, b, c, d, e)
    }
  }
};
cljs.core.subvec = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, c, cljs.core.count.call(null, b))
  }, c = function(a, b, c) {
    return cljs.core.build_subvec.call(null, null, a, b, c, null)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.tv_ensure_editable = function(a, b) {
  return a === b.edit ? b : new cljs.core.VectorNode(a, b.arr.slice())
};
cljs.core.tv_editable_root = function(a) {
  return new cljs.core.VectorNode({}, a.arr.slice())
};
cljs.core.tv_editable_tail = function(a) {
  var b = Array(32);
  cljs.core.array_copy.call(null, a, 0, b, 0, a.length);
  return b
};
cljs.core.tv_push_tail = function tv_push_tail(b, c, d, e) {
  var f = cljs.core.tv_ensure_editable.call(null, b.root.edit, d), g = b.cnt - 1 >>> c & 31;
  cljs.core.pv_aset.call(null, f, g, 5 === c ? e : function() {
    var d = cljs.core.pv_aget.call(null, f, g);
    return null != d ? tv_push_tail.call(null, b, c - 5, d, e) : cljs.core.new_path.call(null, b.root.edit, c - 5, e)
  }());
  return f
};
cljs.core.tv_pop_tail = function tv_pop_tail(b, c, d) {
  var d = cljs.core.tv_ensure_editable.call(null, b.root.edit, d), e = b.cnt - 2 >>> c & 31;
  if(5 < c) {
    b = tv_pop_tail.call(null, b, c - 5, cljs.core.pv_aget.call(null, d, e));
    c = null == b;
    if(c ? 0 === e : c) {
      return null
    }
    cljs.core.pv_aset.call(null, d, e, b);
    return d
  }
  if(0 === e) {
    return null
  }
  cljs.core.pv_aset.call(null, d, e, null);
  return d
};
cljs.core.editable_array_for = function(a, b) {
  var c;
  c = (c = 0 <= b) ? b < a.cnt : c;
  if(c) {
    if(b >= cljs.core.tail_off.call(null, a)) {
      return a.tail
    }
    for(var d = c = a.root, e = a.shift;;) {
      if(0 < e) {
        d = cljs.core.tv_ensure_editable.call(null, c.edit, cljs.core.pv_aget.call(null, d, b >>> e & 31)), e -= 5
      }else {
        return d.arr
      }
    }
  }else {
    throw Error([cljs.core.str("No item "), cljs.core.str(b), cljs.core.str(" in transient vector of length "), cljs.core.str(a.cnt)].join(""));
  }
};
cljs.core.TransientVector = function(a, b, c, d) {
  this.cnt = a;
  this.shift = b;
  this.root = c;
  this.tail = d;
  this.cljs$lang$protocol_mask$partition0$ = 275;
  this.cljs$lang$protocol_mask$partition1$ = 88
};
cljs.core.TransientVector.cljs$lang$type = !0;
cljs.core.TransientVector.cljs$lang$ctorStr = "cljs.core/TransientVector";
cljs.core.TransientVector.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/TransientVector")
};
cljs.core.TransientVector.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.TransientVector.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, null)
};
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, c)
};
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  if(this.root.edit) {
    return cljs.core.array_for.call(null, a, b)[b & 31]
  }
  throw Error("nth after persistent!");
};
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  var d;
  d = (d = 0 <= b) ? b < this.cnt : d;
  return d ? a.cljs$core$IIndexed$_nth$arity$2(a, b) : c
};
cljs.core.TransientVector.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  if(this.root.edit) {
    return this.cnt
  }
  throw Error("count after persistent!");
};
cljs.core.TransientVector.prototype.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3 = function(a, b, c) {
  var d = this;
  if(d.root.edit) {
    var e;
    e = (e = 0 <= b) ? b < d.cnt : e;
    if(e) {
      return cljs.core.tail_off.call(null, a) <= b ? d.tail[b & 31] = c : (e = function g(a, e) {
        var j = cljs.core.tv_ensure_editable.call(null, d.root.edit, e);
        if(0 === a) {
          cljs.core.pv_aset.call(null, j, b & 31, c)
        }else {
          var k = b >>> a & 31;
          cljs.core.pv_aset.call(null, j, k, g.call(null, a - 5, cljs.core.pv_aget.call(null, j, k)))
        }
        return j
      }.call(null, d.shift, d.root), d.root = e), a
    }
    if(b === d.cnt) {
      return a.cljs$core$ITransientCollection$_conj_BANG_$arity$2(a, c)
    }
    throw Error([cljs.core.str("Index "), cljs.core.str(b), cljs.core.str(" out of bounds for TransientVector of length"), cljs.core.str(d.cnt)].join(""));
  }
  throw Error("assoc! after persistent!");
};
cljs.core.TransientVector.prototype.cljs$core$ITransientVector$_pop_BANG_$arity$1 = function(a) {
  if(this.root.edit) {
    if(0 === this.cnt) {
      throw Error("Can't pop empty vector");
    }
    if(1 === this.cnt) {
      this.cnt = 0
    }else {
      if(0 < (this.cnt - 1 & 31)) {
        this.cnt -= 1
      }else {
        var b = cljs.core.editable_array_for.call(null, a, this.cnt - 2), c;
        c = cljs.core.tv_pop_tail.call(null, a, this.shift, this.root);
        c = null != c ? c : new cljs.core.VectorNode(this.root.edit, Array(32));
        var d;
        d = (d = 5 < this.shift) ? null == cljs.core.pv_aget.call(null, c, 1) : d;
        d ? (this.root = cljs.core.tv_ensure_editable.call(null, this.root.edit, cljs.core.pv_aget.call(null, c, 0)), this.shift -= 5) : this.root = c;
        this.cnt -= 1;
        this.tail = b
      }
    }
    return a
  }
  throw Error("pop! after persistent!");
};
cljs.core.TransientVector.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(a, b, c) {
  return a.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(a, b, c)
};
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(a, b) {
  if(this.root.edit) {
    if(32 > this.cnt - cljs.core.tail_off.call(null, a)) {
      this.tail[this.cnt & 31] = b
    }else {
      var c = new cljs.core.VectorNode(this.root.edit, this.tail), d = Array(32);
      d[0] = b;
      this.tail = d;
      if(this.cnt >>> 5 > 1 << this.shift) {
        var d = Array(32), e = this.shift + 5;
        d[0] = this.root;
        d[1] = cljs.core.new_path.call(null, this.root.edit, this.shift, c);
        this.root = new cljs.core.VectorNode(this.root.edit, d);
        this.shift = e
      }else {
        this.root = cljs.core.tv_push_tail.call(null, a, this.shift, this.root, c)
      }
    }
    this.cnt += 1;
    return a
  }
  throw Error("conj! after persistent!");
};
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(a) {
  if(this.root.edit) {
    this.root.edit = null;
    var a = this.cnt - cljs.core.tail_off.call(null, a), b = Array(a);
    cljs.core.array_copy.call(null, this.tail, 0, b, 0, a);
    return new cljs.core.PersistentVector(null, this.cnt, this.shift, this.root, b, null)
  }
  throw Error("persistent! called twice");
};
cljs.core.PersistentQueueSeq = function(a, b, c, d) {
  this.meta = a;
  this.front = b;
  this.rear = c;
  this.__hash = d;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850572
};
cljs.core.PersistentQueueSeq.cljs$lang$type = !0;
cljs.core.PersistentQueueSeq.cljs$lang$ctorStr = "cljs.core/PersistentQueueSeq";
cljs.core.PersistentQueueSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/PersistentQueueSeq")
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll.call(null, a)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, a)
};
cljs.core.PersistentQueueSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return cljs.core.first.call(null, this.front)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  var b = cljs.core.next.call(null, this.front);
  return b ? new cljs.core.PersistentQueueSeq(this.meta, b, this.rear, null) : null == this.rear ? a.cljs$core$IEmptyableCollection$_empty$arity$1(a) : new cljs.core.PersistentQueueSeq(this.meta, this.rear, null, null)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentQueueSeq(b, this.front, this.rear, this.__hash)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.PersistentQueue = function(a, b, c, d, e) {
  this.meta = a;
  this.count = b;
  this.front = c;
  this.rear = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31858766
};
cljs.core.PersistentQueue.cljs$lang$type = !0;
cljs.core.PersistentQueue.cljs$lang$ctorStr = "cljs.core/PersistentQueue";
cljs.core.PersistentQueue.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/PersistentQueue")
};
cljs.core.PersistentQueue.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll.call(null, a)
};
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  var c = this;
  return cljs.core.truth_(c.front) ? new cljs.core.PersistentQueue(c.meta, c.count + 1, c.front, cljs.core.conj.call(null, function() {
    var a = c.rear;
    return cljs.core.truth_(a) ? a : cljs.core.PersistentVector.EMPTY
  }(), b), null) : new cljs.core.PersistentQueue(c.meta, c.count + 1, cljs.core.conj.call(null, c.front, b), cljs.core.PersistentVector.EMPTY, null)
};
cljs.core.PersistentQueue.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  var a = this, b = cljs.core.seq.call(null, a.rear);
  return cljs.core.truth_(function() {
    var c = a.front;
    return cljs.core.truth_(c) ? c : b
  }()) ? new cljs.core.PersistentQueueSeq(null, a.front, cljs.core.seq.call(null, b), null) : null
};
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.count
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_peek$arity$1 = function() {
  return cljs.core.first.call(null, this.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_pop$arity$1 = function(a) {
  return cljs.core.truth_(this.front) ? (a = cljs.core.next.call(null, this.front)) ? new cljs.core.PersistentQueue(this.meta, this.count - 1, a, this.rear, null) : new cljs.core.PersistentQueue(this.meta, this.count - 1, cljs.core.seq.call(null, this.rear), cljs.core.PersistentVector.EMPTY, null) : a
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return cljs.core.first.call(null, this.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return cljs.core.rest.call(null, cljs.core.seq.call(null, a))
};
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentQueue(b, this.count, this.front, this.rear, this.__hash)
};
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.PersistentQueue.EMPTY
};
cljs.core.PersistentQueue.EMPTY = new cljs.core.PersistentQueue(null, 0, null, cljs.core.PersistentVector.EMPTY, 0);
cljs.core.NeverEquiv = function() {
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2097152
};
cljs.core.NeverEquiv.cljs$lang$type = !0;
cljs.core.NeverEquiv.cljs$lang$ctorStr = "cljs.core/NeverEquiv";
cljs.core.NeverEquiv.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/NeverEquiv")
};
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$_equiv$arity$2 = function() {
  return!1
};
cljs.core.never_equiv = new cljs.core.NeverEquiv;
cljs.core.equiv_map = function(a, b) {
  return cljs.core.boolean$.call(null, cljs.core.map_QMARK_.call(null, b) ? cljs.core.count.call(null, a) === cljs.core.count.call(null, b) ? cljs.core.every_QMARK_.call(null, cljs.core.identity, cljs.core.map.call(null, function(a) {
    return cljs.core._EQ_.call(null, cljs.core.get.call(null, b, cljs.core.first.call(null, a), cljs.core.never_equiv), cljs.core.second.call(null, a))
  }, a)) : null : null)
};
cljs.core.scan_array = function(a, b, c) {
  for(var d = c.length, e = 0;;) {
    if(e < d) {
      if(b === c[e]) {
        return e
      }
      e += a
    }else {
      return null
    }
  }
};
cljs.core.obj_map_compare_keys = function(a, b) {
  var c = cljs.core.hash.call(null, a), d = cljs.core.hash.call(null, b);
  return c < d ? -1 : c > d ? 1 : 0
};
cljs.core.obj_map__GT_hash_map = function(a, b, c) {
  for(var d = a.keys, e = d.length, f = a.strobj, a = cljs.core.meta.call(null, a), g = 0, h = cljs.core.transient$.call(null, cljs.core.PersistentHashMap.EMPTY);;) {
    if(g < e) {
      var i = d[g], g = g + 1, h = cljs.core.assoc_BANG_.call(null, h, i, f[i])
    }else {
      return cljs.core.with_meta.call(null, cljs.core.persistent_BANG_.call(null, cljs.core.assoc_BANG_.call(null, h, b, c)), a)
    }
  }
};
cljs.core.obj_clone = function(a, b) {
  for(var c = {}, d = b.length, e = 0;;) {
    if(e < d) {
      var f = b[e];
      c[f] = a[f];
      e += 1
    }else {
      break
    }
  }
  return c
};
cljs.core.ObjMap = function(a, b, c, d, e) {
  this.meta = a;
  this.keys = b;
  this.strobj = c;
  this.update_count = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 4;
  this.cljs$lang$protocol_mask$partition0$ = 16123663
};
cljs.core.ObjMap.cljs$lang$type = !0;
cljs.core.ObjMap.cljs$lang$ctorStr = "cljs.core/ObjMap";
cljs.core.ObjMap.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/ObjMap")
};
cljs.core.ObjMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(a) {
  return cljs.core.transient$.call(null, cljs.core.into.call(null, cljs.core.hash_map.call(null), a))
};
cljs.core.ObjMap.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_imap.call(null, a)
};
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  a = (a = goog.isString(b)) ? null != cljs.core.scan_array.call(null, 1, b, this.keys) : a;
  return a ? this.strobj[b] : c
};
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  if(goog.isString(b)) {
    var d;
    d = (d = this.update_count > cljs.core.ObjMap.HASHMAP_THRESHOLD) ? d : this.keys.length >= cljs.core.ObjMap.HASHMAP_THRESHOLD;
    if(d) {
      return cljs.core.obj_map__GT_hash_map.call(null, a, b, c)
    }
    if(null != cljs.core.scan_array.call(null, 1, b, this.keys)) {
      return a = cljs.core.obj_clone.call(null, this.strobj, this.keys), a[b] = c, new cljs.core.ObjMap(this.meta, this.keys, a, this.update_count + 1, null)
    }
    a = cljs.core.obj_clone.call(null, this.strobj, this.keys);
    d = this.keys.slice();
    a[b] = c;
    d.push(b);
    return new cljs.core.ObjMap(this.meta, d, a, this.update_count + 1, null)
  }
  return cljs.core.obj_map__GT_hash_map.call(null, a, b, c)
};
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(a, b) {
  var c;
  c = (c = goog.isString(b)) ? null != cljs.core.scan_array.call(null, 1, b, this.keys) : c;
  return c ? !0 : !1
};
cljs.core.ObjMap.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.ObjMap.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.ObjMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(a, b, c) {
  for(a = this.keys.sort(cljs.core.obj_map_compare_keys);;) {
    if(cljs.core.seq.call(null, a)) {
      var d = cljs.core.first.call(null, a), c = b.call(null, c, d, this.strobj[d]);
      if(cljs.core.reduced_QMARK_.call(null, c)) {
        return cljs.core.deref.call(null, c)
      }
      a = cljs.core.rest.call(null, a)
    }else {
      return c
    }
  }
};
cljs.core.ObjMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.vector_QMARK_.call(null, b) ? a.cljs$core$IAssociative$_assoc$arity$3(a, cljs.core._nth.call(null, b, 0), cljs.core._nth.call(null, b, 1)) : cljs.core.reduce.call(null, cljs.core._conj, a, b)
};
cljs.core.ObjMap.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.ObjMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  var a = this;
  return 0 < a.keys.length ? cljs.core.map.call(null, function(b) {
    return cljs.core.vector.call(null, b, a.strobj[b])
  }, a.keys.sort(cljs.core.obj_map_compare_keys)) : null
};
cljs.core.ObjMap.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.keys.length
};
cljs.core.ObjMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_map.call(null, a, b)
};
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.ObjMap(b, this.keys, this.strobj, this.update_count, this.__hash)
};
cljs.core.ObjMap.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta.call(null, cljs.core.ObjMap.EMPTY, this.meta)
};
cljs.core.ObjMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(a, b) {
  var c;
  c = (c = goog.isString(b)) ? null != cljs.core.scan_array.call(null, 1, b, this.keys) : c;
  if(c) {
    c = this.keys.slice();
    var d = cljs.core.obj_clone.call(null, this.strobj, this.keys);
    c.splice(cljs.core.scan_array.call(null, 1, b, c), 1);
    delete d[b];
    return new cljs.core.ObjMap(this.meta, c, d, this.update_count + 1, null)
  }
  return a
};
cljs.core.ObjMap.EMPTY = new cljs.core.ObjMap(null, [], {}, 0, 0);
cljs.core.ObjMap.HASHMAP_THRESHOLD = 8;
cljs.core.ObjMap.fromObject = function(a, b) {
  return new cljs.core.ObjMap(null, a, b, 0, null)
};
cljs.core.array_map_index_of_nil_QMARK_ = function(a) {
  for(var b = a.length, c = 0;;) {
    if(b <= c) {
      return-1
    }
    if(null == a[c]) {
      return c
    }
    c += 2
  }
};
cljs.core.array_map_index_of_symbol_QMARK_ = function(a, b, c) {
  for(var b = a.length, c = c.str, d = 0;;) {
    if(b <= d) {
      return-1
    }
    var e;
    e = a[d];
    var f = e instanceof cljs.core.Symbol;
    e = f ? c === e.str : f;
    if(e) {
      return d
    }
    d += 2
  }
};
cljs.core.array_map_index_of_identical_QMARK_ = function(a, b, c) {
  for(var b = a.length, d = 0;;) {
    if(b <= d) {
      return-1
    }
    if(c === a[d]) {
      return d
    }
    d += 2
  }
};
cljs.core.array_map_index_of_equiv_QMARK_ = function(a, b, c) {
  for(var b = a.length, d = 0;;) {
    if(b <= d) {
      return-1
    }
    if(cljs.core._EQ_.call(null, c, a[d])) {
      return d
    }
    d += 2
  }
};
cljs.core.array_map_index_of = function(a, b) {
  var c = a.arr;
  var d = goog.isString(b);
  return(d ? d : "number" === typeof b) ? cljs.core.array_map_index_of_identical_QMARK_.call(null, c, a, b) : b instanceof cljs.core.Symbol ? cljs.core.array_map_index_of_symbol_QMARK_.call(null, c, a, b) : null == b ? cljs.core.array_map_index_of_nil_QMARK_.call(null, c, a, b) : cljs.core.array_map_index_of_equiv_QMARK_.call(null, c, a, b)
};
cljs.core.array_map_extend_kv = function(a, b, c) {
  for(var a = a.arr, d = a.length, e = Array(d + 2), f = 0;;) {
    if(f < d) {
      e[f] = a[f], f += 1
    }else {
      break
    }
  }
  e[d] = b;
  e[d + 1] = c;
  return e
};
cljs.core.PersistentArrayMap = function(a, b, c, d) {
  this.meta = a;
  this.cnt = b;
  this.arr = c;
  this.__hash = d;
  this.cljs$lang$protocol_mask$partition1$ = 4;
  this.cljs$lang$protocol_mask$partition0$ = 16123663
};
cljs.core.PersistentArrayMap.cljs$lang$type = !0;
cljs.core.PersistentArrayMap.cljs$lang$ctorStr = "cljs.core/PersistentArrayMap";
cljs.core.PersistentArrayMap.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/PersistentArrayMap")
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function() {
  return new cljs.core.TransientArrayMap({}, this.arr.length, this.arr.slice())
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_imap.call(null, a)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  a = cljs.core.array_map_index_of.call(null, a, b);
  return-1 === a ? c : this.arr[a + 1]
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  var d = cljs.core.array_map_index_of.call(null, a, b);
  if(-1 === d) {
    return this.cnt < cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD ? (c = cljs.core.array_map_extend_kv.call(null, a, b, c), new cljs.core.PersistentArrayMap(this.meta, this.cnt + 1, c, null)) : cljs.core._with_meta.call(null, cljs.core._assoc.call(null, cljs.core.into.call(null, cljs.core.PersistentHashMap.EMPTY, a), b, c), this.meta)
  }
  if(c === this.arr[d + 1]) {
    return a
  }
  a = this.arr.slice();
  a[d + 1] = c;
  return new cljs.core.PersistentArrayMap(this.meta, this.cnt, a, null)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(a, b) {
  return-1 !== cljs.core.array_map_index_of.call(null, a, b)
};
cljs.core.PersistentArrayMap.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentArrayMap.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(a, b, c) {
  for(var a = this.arr.length, d = 0;;) {
    if(d < a) {
      c = b.call(null, c, this.arr[d], this.arr[d + 1]);
      if(cljs.core.reduced_QMARK_.call(null, c)) {
        return cljs.core.deref.call(null, c)
      }
      d += 2
    }else {
      return c
    }
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.vector_QMARK_.call(null, b) ? a.cljs$core$IAssociative$_assoc$arity$3(a, cljs.core._nth.call(null, b, 0), cljs.core._nth.call(null, b, 1)) : cljs.core.reduce.call(null, cljs.core._conj, a, b)
};
cljs.core.PersistentArrayMap.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  var a = this;
  if(0 < a.cnt) {
    var b = a.arr.length;
    return function d(e) {
      return new cljs.core.LazySeq(null, !1, function() {
        return e < b ? cljs.core.cons.call(null, cljs.core.PersistentVector.fromArray([a.arr[e], a.arr[e + 1]], !0), d.call(null, e + 2)) : null
      }, null)
    }.call(null, 0)
  }
  return null
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.cnt
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_map.call(null, a, b)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentArrayMap(b, this.cnt, this.arr, this.__hash)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core._with_meta.call(null, cljs.core.PersistentArrayMap.EMPTY, this.meta)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(a, b) {
  if(0 <= cljs.core.array_map_index_of.call(null, a, b)) {
    var c = this.arr.length, d = c - 2;
    if(0 === d) {
      return a.cljs$core$IEmptyableCollection$_empty$arity$1(a)
    }
    for(var d = Array(d), e = 0, f = 0;;) {
      if(e >= c) {
        return new cljs.core.PersistentArrayMap(this.meta, this.cnt - 1, d, null)
      }
      cljs.core._EQ_.call(null, b, this.arr[e]) || (d[f] = this.arr[e], d[f + 1] = this.arr[e + 1], f += 2);
      e += 2
    }
  }else {
    return a
  }
};
cljs.core.PersistentArrayMap.EMPTY = new cljs.core.PersistentArrayMap(null, 0, [], null);
cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD = 8;
cljs.core.PersistentArrayMap.fromArray = function(a, b) {
  var c = b ? a : a.slice();
  return new cljs.core.PersistentArrayMap(null, c.length / 2, c, null)
};
cljs.core.TransientArrayMap = function(a, b, c) {
  this.editable_QMARK_ = a;
  this.len = b;
  this.arr = c;
  this.cljs$lang$protocol_mask$partition1$ = 56;
  this.cljs$lang$protocol_mask$partition0$ = 258
};
cljs.core.TransientArrayMap.cljs$lang$type = !0;
cljs.core.TransientArrayMap.cljs$lang$ctorStr = "cljs.core/TransientArrayMap";
cljs.core.TransientArrayMap.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/TransientArrayMap")
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = function(a, b) {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    var c = cljs.core.array_map_index_of.call(null, a, b);
    0 <= c && (this.arr[c] = this.arr[this.len - 2], this.arr[c + 1] = this.arr[this.len - 1], c = this.arr, c.pop(), c.pop(), this.len -= 2);
    return a
  }
  throw Error("dissoc! after persistent!");
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(a, b, c) {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    var d = cljs.core.array_map_index_of.call(null, a, b);
    if(-1 === d) {
      return this.len + 2 <= 2 * cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD ? (this.len += 2, this.arr.push(b), this.arr.push(c), a) : cljs.core.assoc_BANG_.call(null, cljs.core.array__GT_transient_hash_map.call(null, this.len, this.arr), b, c)
    }
    c !== this.arr[d + 1] && (this.arr[d + 1] = c);
    return a
  }
  throw Error("assoc! after persistent!");
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(a, b) {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    var c;
    b ? (c = (c = b.cljs$lang$protocol_mask$partition0$ & 2048) ? c : b.cljs$core$IMapEntry$, c = c ? !0 : b.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_.call(null, cljs.core.IMapEntry, b)) : c = cljs.core.type_satisfies_.call(null, cljs.core.IMapEntry, b);
    if(c) {
      return a.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(a, cljs.core.key.call(null, b), cljs.core.val.call(null, b))
    }
    c = cljs.core.seq.call(null, b);
    for(var d = a;;) {
      var e = cljs.core.first.call(null, c);
      if(cljs.core.truth_(e)) {
        c = cljs.core.next.call(null, c), d = d.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(d, cljs.core.key.call(null, e), cljs.core.val.call(null, e))
      }else {
        return d
      }
    }
  }else {
    throw Error("conj! after persistent!");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function() {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    return this.editable_QMARK_ = !1, new cljs.core.PersistentArrayMap(null, cljs.core.quot.call(null, this.len, 2), this.arr, null)
  }
  throw Error("persistent! called twice");
};
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    return a = cljs.core.array_map_index_of.call(null, a, b), -1 === a ? c : this.arr[a + 1]
  }
  throw Error("lookup after persistent!");
};
cljs.core.TransientArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    return cljs.core.quot.call(null, this.len, 2)
  }
  throw Error("count after persistent!");
};
cljs.core.array__GT_transient_hash_map = function(a, b) {
  for(var c = cljs.core.transient$.call(null, cljs.core.ObjMap.EMPTY), d = 0;;) {
    if(d < a) {
      c = cljs.core.assoc_BANG_.call(null, c, b[d], b[d + 1]), d += 2
    }else {
      return c
    }
  }
};
cljs.core.Box = function(a) {
  this.val = a
};
cljs.core.Box.cljs$lang$type = !0;
cljs.core.Box.cljs$lang$ctorStr = "cljs.core/Box";
cljs.core.Box.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/Box")
};
cljs.core.key_test = function(a, b) {
  return goog.isString(a) ? a === b : cljs.core._EQ_.call(null, a, b)
};
cljs.core.mask = function(a, b) {
  return a >>> b & 31
};
cljs.core.clone_and_set = function() {
  var a = null, b = function(a, b, c) {
    a = a.slice();
    a[b] = c;
    return a
  }, c = function(a, b, c, g, h) {
    a = a.slice();
    a[b] = c;
    a[g] = h;
    return a
  }, a = function(a, e, f, g, h) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, e, f);
      case 5:
        return c.call(this, a, e, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$5 = c;
  return a
}();
cljs.core.remove_pair = function(a, b) {
  var c = Array(a.length - 2);
  cljs.core.array_copy.call(null, a, 0, c, 0, 2 * b);
  cljs.core.array_copy.call(null, a, 2 * (b + 1), c, 2 * b, c.length - 2 * b);
  return c
};
cljs.core.bitmap_indexed_node_index = function(a, b) {
  return cljs.core.bit_count.call(null, a & b - 1)
};
cljs.core.bitpos = function(a, b) {
  return 1 << (a >>> b & 31)
};
cljs.core.edit_and_set = function() {
  var a = null, b = function(a, b, c, g) {
    a = a.ensure_editable(b);
    a.arr[c] = g;
    return a
  }, c = function(a, b, c, g, h, i) {
    a = a.ensure_editable(b);
    a.arr[c] = g;
    a.arr[h] = i;
    return a
  }, a = function(a, e, f, g, h, i) {
    switch(arguments.length) {
      case 4:
        return b.call(this, a, e, f, g);
      case 6:
        return c.call(this, a, e, f, g, h, i)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$4 = b;
  a.cljs$core$IFn$_invoke$arity$6 = c;
  return a
}();
cljs.core.inode_kv_reduce = function(a, b, c) {
  for(var d = a.length, e = 0;;) {
    if(e < d) {
      var f = a[e];
      null != f ? c = b.call(null, c, f, a[e + 1]) : (f = a[e + 1], c = null != f ? f.kv_reduce(b, c) : c);
      if(cljs.core.reduced_QMARK_.call(null, c)) {
        return cljs.core.deref.call(null, c)
      }
      e += 2
    }else {
      return c
    }
  }
};
cljs.core.BitmapIndexedNode = function(a, b, c) {
  this.edit = a;
  this.bitmap = b;
  this.arr = c
};
cljs.core.BitmapIndexedNode.cljs$lang$type = !0;
cljs.core.BitmapIndexedNode.cljs$lang$ctorStr = "cljs.core/BitmapIndexedNode";
cljs.core.BitmapIndexedNode.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/BitmapIndexedNode")
};
cljs.core.BitmapIndexedNode.prototype.edit_and_remove_pair = function(a, b, c) {
  if(this.bitmap === b) {
    return null
  }
  var a = this.ensure_editable(a), d = a.arr, e = d.length;
  a.bitmap ^= b;
  cljs.core.array_copy.call(null, d, 2 * (c + 1), d, 2 * c, e - 2 * (c + 1));
  d[e - 2] = null;
  d[e - 1] = null;
  return a
};
cljs.core.BitmapIndexedNode.prototype.inode_assoc_BANG_ = function(a, b, c, d, e, f) {
  var g = 1 << (c >>> b & 31), h = cljs.core.bitmap_indexed_node_index.call(null, this.bitmap, g);
  if(0 === (this.bitmap & g)) {
    var i = cljs.core.bit_count.call(null, this.bitmap);
    if(2 * i < this.arr.length) {
      return a = this.ensure_editable(a), b = a.arr, f.val = !0, cljs.core.array_copy_downward.call(null, b, 2 * h, b, 2 * (h + 1), 2 * (i - h)), b[2 * h] = d, b[2 * h + 1] = e, a.bitmap |= g, a
    }
    if(16 <= i) {
      h = Array(32);
      h[c >>> b & 31] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(a, b + 5, c, d, e, f);
      for(e = d = 0;;) {
        if(32 > d) {
          0 !== (this.bitmap >>> d & 1) && (h[d] = null != this.arr[e] ? cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(a, b + 5, cljs.core.hash.call(null, this.arr[e]), this.arr[e], this.arr[e + 1], f) : this.arr[e + 1], e += 2), d += 1
        }else {
          break
        }
      }
      return new cljs.core.ArrayNode(a, i + 1, h)
    }
    b = Array(2 * (i + 4));
    cljs.core.array_copy.call(null, this.arr, 0, b, 0, 2 * h);
    b[2 * h] = d;
    b[2 * h + 1] = e;
    cljs.core.array_copy.call(null, this.arr, 2 * h, b, 2 * (h + 1), 2 * (i - h));
    f.val = !0;
    a = this.ensure_editable(a);
    a.arr = b;
    a.bitmap |= g;
    return a
  }
  i = this.arr[2 * h];
  g = this.arr[2 * h + 1];
  if(null == i) {
    return i = g.inode_assoc_BANG_(a, b + 5, c, d, e, f), i === g ? this : cljs.core.edit_and_set.call(null, this, a, 2 * h + 1, i)
  }
  if(cljs.core.key_test.call(null, d, i)) {
    return e === g ? this : cljs.core.edit_and_set.call(null, this, a, 2 * h + 1, e)
  }
  f.val = !0;
  return cljs.core.edit_and_set.call(null, this, a, 2 * h, null, 2 * h + 1, cljs.core.create_node.call(null, a, b + 5, i, g, c, d, e))
};
cljs.core.BitmapIndexedNode.prototype.inode_seq = function() {
  return cljs.core.create_inode_seq.call(null, this.arr)
};
cljs.core.BitmapIndexedNode.prototype.inode_without_BANG_ = function(a, b, c, d, e) {
  var f = 1 << (c >>> b & 31);
  if(0 === (this.bitmap & f)) {
    return this
  }
  var g = cljs.core.bitmap_indexed_node_index.call(null, this.bitmap, f), h = this.arr[2 * g], i = this.arr[2 * g + 1];
  return null == h ? (b = i.inode_without_BANG_(a, b + 5, c, d, e), b === i ? this : null != b ? cljs.core.edit_and_set.call(null, this, a, 2 * g + 1, b) : this.bitmap === f ? null : this.edit_and_remove_pair(a, f, g)) : cljs.core.key_test.call(null, d, h) ? (e[0] = !0, this.edit_and_remove_pair(a, f, g)) : this
};
cljs.core.BitmapIndexedNode.prototype.ensure_editable = function(a) {
  if(a === this.edit) {
    return this
  }
  var b = cljs.core.bit_count.call(null, this.bitmap), c = Array(0 > b ? 4 : 2 * (b + 1));
  cljs.core.array_copy.call(null, this.arr, 0, c, 0, 2 * b);
  return new cljs.core.BitmapIndexedNode(a, this.bitmap, c)
};
cljs.core.BitmapIndexedNode.prototype.kv_reduce = function(a, b) {
  return cljs.core.inode_kv_reduce.call(null, this.arr, a, b)
};
cljs.core.BitmapIndexedNode.prototype.inode_find = function(a, b, c, d) {
  var e = 1 << (b >>> a & 31);
  if(0 === (this.bitmap & e)) {
    return d
  }
  var f = cljs.core.bitmap_indexed_node_index.call(null, this.bitmap, e), e = this.arr[2 * f], f = this.arr[2 * f + 1];
  return null == e ? f.inode_find(a + 5, b, c, d) : cljs.core.key_test.call(null, c, e) ? cljs.core.PersistentVector.fromArray([e, f], !0) : d
};
cljs.core.BitmapIndexedNode.prototype.inode_without = function(a, b, c) {
  var d = 1 << (b >>> a & 31);
  if(0 === (this.bitmap & d)) {
    return this
  }
  var e = cljs.core.bitmap_indexed_node_index.call(null, this.bitmap, d), f = this.arr[2 * e], g = this.arr[2 * e + 1];
  return null == f ? (a = g.inode_without(a + 5, b, c), a === g ? this : null != a ? new cljs.core.BitmapIndexedNode(null, this.bitmap, cljs.core.clone_and_set.call(null, this.arr, 2 * e + 1, a)) : this.bitmap === d ? null : new cljs.core.BitmapIndexedNode(null, this.bitmap ^ d, cljs.core.remove_pair.call(null, this.arr, e))) : cljs.core.key_test.call(null, c, f) ? new cljs.core.BitmapIndexedNode(null, this.bitmap ^ d, cljs.core.remove_pair.call(null, this.arr, e)) : this
};
cljs.core.BitmapIndexedNode.prototype.inode_assoc = function(a, b, c, d, e) {
  var f = 1 << (b >>> a & 31), g = cljs.core.bitmap_indexed_node_index.call(null, this.bitmap, f);
  if(0 === (this.bitmap & f)) {
    var h = cljs.core.bit_count.call(null, this.bitmap);
    if(16 <= h) {
      g = Array(32);
      g[b >>> a & 31] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(a + 5, b, c, d, e);
      for(d = c = 0;;) {
        if(32 > c) {
          0 !== (this.bitmap >>> c & 1) && (g[c] = null != this.arr[d] ? cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(a + 5, cljs.core.hash.call(null, this.arr[d]), this.arr[d], this.arr[d + 1], e) : this.arr[d + 1], d += 2), c += 1
        }else {
          break
        }
      }
      return new cljs.core.ArrayNode(null, h + 1, g)
    }
    a = Array(2 * (h + 1));
    cljs.core.array_copy.call(null, this.arr, 0, a, 0, 2 * g);
    a[2 * g] = c;
    a[2 * g + 1] = d;
    cljs.core.array_copy.call(null, this.arr, 2 * g, a, 2 * (g + 1), 2 * (h - g));
    e.val = !0;
    return new cljs.core.BitmapIndexedNode(null, this.bitmap | f, a)
  }
  h = this.arr[2 * g];
  f = this.arr[2 * g + 1];
  if(null == h) {
    return h = f.inode_assoc(a + 5, b, c, d, e), h === f ? this : new cljs.core.BitmapIndexedNode(null, this.bitmap, cljs.core.clone_and_set.call(null, this.arr, 2 * g + 1, h))
  }
  if(cljs.core.key_test.call(null, c, h)) {
    return d === f ? this : new cljs.core.BitmapIndexedNode(null, this.bitmap, cljs.core.clone_and_set.call(null, this.arr, 2 * g + 1, d))
  }
  e.val = !0;
  return new cljs.core.BitmapIndexedNode(null, this.bitmap, cljs.core.clone_and_set.call(null, this.arr, 2 * g, null, 2 * g + 1, cljs.core.create_node.call(null, a + 5, h, f, b, c, d)))
};
cljs.core.BitmapIndexedNode.prototype.inode_lookup = function(a, b, c, d) {
  var e = 1 << (b >>> a & 31);
  if(0 === (this.bitmap & e)) {
    return d
  }
  var f = cljs.core.bitmap_indexed_node_index.call(null, this.bitmap, e), e = this.arr[2 * f], f = this.arr[2 * f + 1];
  return null == e ? f.inode_lookup(a + 5, b, c, d) : cljs.core.key_test.call(null, c, e) ? f : d
};
cljs.core.BitmapIndexedNode.EMPTY = new cljs.core.BitmapIndexedNode(null, 0, []);
cljs.core.pack_array_node = function(a, b, c) {
  for(var d = a.arr, a = 2 * (a.cnt - 1), e = Array(a), f = 0, g = 1, h = 0;;) {
    if(f < a) {
      var i;
      i = (i = f !== c) ? null != d[f] : i;
      i && (e[g] = d[f], g += 2, h |= 1 << f);
      f += 1
    }else {
      return new cljs.core.BitmapIndexedNode(b, h, e)
    }
  }
};
cljs.core.ArrayNode = function(a, b, c) {
  this.edit = a;
  this.cnt = b;
  this.arr = c
};
cljs.core.ArrayNode.cljs$lang$type = !0;
cljs.core.ArrayNode.cljs$lang$ctorStr = "cljs.core/ArrayNode";
cljs.core.ArrayNode.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/ArrayNode")
};
cljs.core.ArrayNode.prototype.inode_assoc_BANG_ = function(a, b, c, d, e, f) {
  var g = c >>> b & 31, h = this.arr[g];
  if(null == h) {
    return a = cljs.core.edit_and_set.call(null, this, a, g, cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(a, b + 5, c, d, e, f)), a.cnt += 1, a
  }
  b = h.inode_assoc_BANG_(a, b + 5, c, d, e, f);
  return b === h ? this : cljs.core.edit_and_set.call(null, this, a, g, b)
};
cljs.core.ArrayNode.prototype.inode_seq = function() {
  return cljs.core.create_array_node_seq.call(null, this.arr)
};
cljs.core.ArrayNode.prototype.inode_without_BANG_ = function(a, b, c, d, e) {
  var f = c >>> b & 31, g = this.arr[f];
  if(null == g) {
    return this
  }
  b = g.inode_without_BANG_(a, b + 5, c, d, e);
  if(b === g) {
    return this
  }
  if(null == b) {
    if(8 >= this.cnt) {
      return cljs.core.pack_array_node.call(null, this, a, f)
    }
    a = cljs.core.edit_and_set.call(null, this, a, f, b);
    a.cnt -= 1;
    return a
  }
  return cljs.core.edit_and_set.call(null, this, a, f, b)
};
cljs.core.ArrayNode.prototype.ensure_editable = function(a) {
  return a === this.edit ? this : new cljs.core.ArrayNode(a, this.cnt, this.arr.slice())
};
cljs.core.ArrayNode.prototype.kv_reduce = function(a, b) {
  for(var c = this.arr.length, d = 0, e = b;;) {
    if(d < c) {
      var f = this.arr[d];
      if(null != f && (e = f.kv_reduce(a, e), cljs.core.reduced_QMARK_.call(null, e))) {
        return cljs.core.deref.call(null, e)
      }
      d += 1
    }else {
      return e
    }
  }
};
cljs.core.ArrayNode.prototype.inode_find = function(a, b, c, d) {
  var e = this.arr[b >>> a & 31];
  return null != e ? e.inode_find(a + 5, b, c, d) : d
};
cljs.core.ArrayNode.prototype.inode_without = function(a, b, c) {
  var d = b >>> a & 31, e = this.arr[d];
  return null != e ? (a = e.inode_without(a + 5, b, c), a === e ? this : null == a ? 8 >= this.cnt ? cljs.core.pack_array_node.call(null, this, null, d) : new cljs.core.ArrayNode(null, this.cnt - 1, cljs.core.clone_and_set.call(null, this.arr, d, a)) : new cljs.core.ArrayNode(null, this.cnt, cljs.core.clone_and_set.call(null, this.arr, d, a))) : this
};
cljs.core.ArrayNode.prototype.inode_assoc = function(a, b, c, d, e) {
  var f = b >>> a & 31, g = this.arr[f];
  if(null == g) {
    return new cljs.core.ArrayNode(null, this.cnt + 1, cljs.core.clone_and_set.call(null, this.arr, f, cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(a + 5, b, c, d, e)))
  }
  a = g.inode_assoc(a + 5, b, c, d, e);
  return a === g ? this : new cljs.core.ArrayNode(null, this.cnt, cljs.core.clone_and_set.call(null, this.arr, f, a))
};
cljs.core.ArrayNode.prototype.inode_lookup = function(a, b, c, d) {
  var e = this.arr[b >>> a & 31];
  return null != e ? e.inode_lookup(a + 5, b, c, d) : d
};
cljs.core.hash_collision_node_find_index = function(a, b, c) {
  for(var b = 2 * b, d = 0;;) {
    if(d < b) {
      if(cljs.core.key_test.call(null, c, a[d])) {
        return d
      }
      d += 2
    }else {
      return-1
    }
  }
};
cljs.core.HashCollisionNode = function(a, b, c, d) {
  this.edit = a;
  this.collision_hash = b;
  this.cnt = c;
  this.arr = d
};
cljs.core.HashCollisionNode.cljs$lang$type = !0;
cljs.core.HashCollisionNode.cljs$lang$ctorStr = "cljs.core/HashCollisionNode";
cljs.core.HashCollisionNode.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/HashCollisionNode")
};
cljs.core.HashCollisionNode.prototype.inode_assoc_BANG_ = function(a, b, c, d, e, f) {
  if(c === this.collision_hash) {
    b = cljs.core.hash_collision_node_find_index.call(null, this.arr, this.cnt, d);
    if(-1 === b) {
      if(this.arr.length > 2 * this.cnt) {
        return a = cljs.core.edit_and_set.call(null, this, a, 2 * this.cnt, d, 2 * this.cnt + 1, e), f.val = !0, a.cnt += 1, a
      }
      b = this.arr.length;
      c = Array(b + 2);
      cljs.core.array_copy.call(null, this.arr, 0, c, 0, b);
      c[b] = d;
      c[b + 1] = e;
      f.val = !0;
      return this.ensure_editable_array(a, this.cnt + 1, c)
    }
    return this.arr[b + 1] === e ? this : cljs.core.edit_and_set.call(null, this, a, b + 1, e)
  }
  return(new cljs.core.BitmapIndexedNode(a, 1 << (this.collision_hash >>> b & 31), [null, this, null, null])).inode_assoc_BANG_(a, b, c, d, e, f)
};
cljs.core.HashCollisionNode.prototype.inode_seq = function() {
  return cljs.core.create_inode_seq.call(null, this.arr)
};
cljs.core.HashCollisionNode.prototype.inode_without_BANG_ = function(a, b, c, d, e) {
  b = cljs.core.hash_collision_node_find_index.call(null, this.arr, this.cnt, d);
  if(-1 === b) {
    return this
  }
  e[0] = !0;
  if(1 === this.cnt) {
    return null
  }
  a = this.ensure_editable(a);
  e = a.arr;
  e[b] = e[2 * this.cnt - 2];
  e[b + 1] = e[2 * this.cnt - 1];
  e[2 * this.cnt - 1] = null;
  e[2 * this.cnt - 2] = null;
  a.cnt -= 1;
  return a
};
cljs.core.HashCollisionNode.prototype.ensure_editable = function(a) {
  if(a === this.edit) {
    return this
  }
  var b = Array(2 * (this.cnt + 1));
  cljs.core.array_copy.call(null, this.arr, 0, b, 0, 2 * this.cnt);
  return new cljs.core.HashCollisionNode(a, this.collision_hash, this.cnt, b)
};
cljs.core.HashCollisionNode.prototype.kv_reduce = function(a, b) {
  return cljs.core.inode_kv_reduce.call(null, this.arr, a, b)
};
cljs.core.HashCollisionNode.prototype.inode_find = function(a, b, c, d) {
  a = cljs.core.hash_collision_node_find_index.call(null, this.arr, this.cnt, c);
  return 0 > a ? d : cljs.core.key_test.call(null, c, this.arr[a]) ? cljs.core.PersistentVector.fromArray([this.arr[a], this.arr[a + 1]], !0) : d
};
cljs.core.HashCollisionNode.prototype.inode_without = function(a, b, c) {
  a = cljs.core.hash_collision_node_find_index.call(null, this.arr, this.cnt, c);
  return-1 === a ? this : 1 === this.cnt ? null : new cljs.core.HashCollisionNode(null, this.collision_hash, this.cnt - 1, cljs.core.remove_pair.call(null, this.arr, cljs.core.quot.call(null, a, 2)))
};
cljs.core.HashCollisionNode.prototype.inode_assoc = function(a, b, c, d, e) {
  return b === this.collision_hash ? (a = cljs.core.hash_collision_node_find_index.call(null, this.arr, this.cnt, c), -1 === a ? (a = this.arr.length, b = Array(a + 2), cljs.core.array_copy.call(null, this.arr, 0, b, 0, a), b[a] = c, b[a + 1] = d, e.val = !0, new cljs.core.HashCollisionNode(null, this.collision_hash, this.cnt + 1, b)) : cljs.core._EQ_.call(null, this.arr[a], d) ? this : new cljs.core.HashCollisionNode(null, this.collision_hash, this.cnt, cljs.core.clone_and_set.call(null, this.arr, 
  a + 1, d))) : (new cljs.core.BitmapIndexedNode(null, 1 << (this.collision_hash >>> a & 31), [null, this])).inode_assoc(a, b, c, d, e)
};
cljs.core.HashCollisionNode.prototype.inode_lookup = function(a, b, c, d) {
  a = cljs.core.hash_collision_node_find_index.call(null, this.arr, this.cnt, c);
  return 0 > a ? d : cljs.core.key_test.call(null, c, this.arr[a]) ? this.arr[a + 1] : d
};
cljs.core.HashCollisionNode.prototype.ensure_editable_array = function(a, b, c) {
  return a === this.edit ? (this.arr = c, this.cnt = b, this) : new cljs.core.HashCollisionNode(this.edit, this.collision_hash, b, c)
};
cljs.core.create_node = function() {
  var a = null, b = function(a, b, c, g, h, i) {
    var j = cljs.core.hash.call(null, b);
    if(j === g) {
      return new cljs.core.HashCollisionNode(null, j, 2, [b, c, h, i])
    }
    var k = new cljs.core.Box(!1);
    return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(a, j, b, c, k).inode_assoc(a, g, h, i, k)
  }, c = function(a, b, c, g, h, i, j) {
    var k = cljs.core.hash.call(null, c);
    if(k === h) {
      return new cljs.core.HashCollisionNode(null, k, 2, [c, g, i, j])
    }
    var m = new cljs.core.Box(!1);
    return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(a, b, k, c, g, m).inode_assoc_BANG_(a, b, h, i, j, m)
  }, a = function(a, e, f, g, h, i, j) {
    switch(arguments.length) {
      case 6:
        return b.call(this, a, e, f, g, h, i);
      case 7:
        return c.call(this, a, e, f, g, h, i, j)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$6 = b;
  a.cljs$core$IFn$_invoke$arity$7 = c;
  return a
}();
cljs.core.NodeSeq = function(a, b, c, d, e) {
  this.meta = a;
  this.nodes = b;
  this.i = c;
  this.s = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850572
};
cljs.core.NodeSeq.cljs$lang$type = !0;
cljs.core.NodeSeq.cljs$lang$ctorStr = "cljs.core/NodeSeq";
cljs.core.NodeSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/NodeSeq")
};
cljs.core.NodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll.call(null, a)
};
cljs.core.NodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, a)
};
cljs.core.NodeSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.NodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return null == this.s ? cljs.core.PersistentVector.fromArray([this.nodes[this.i], this.nodes[this.i + 1]], !0) : cljs.core.first.call(null, this.s)
};
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return null == this.s ? cljs.core.create_inode_seq.call(null, this.nodes, this.i + 2, null) : cljs.core.create_inode_seq.call(null, this.nodes, this.i, cljs.core.next.call(null, this.s))
};
cljs.core.NodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.NodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.NodeSeq(b, this.nodes, this.i, this.s, this.__hash)
};
cljs.core.NodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.NodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.create_inode_seq = function() {
  var a = null, b = function(b) {
    return a.call(null, b, 0, null)
  }, c = function(a, b, c) {
    if(null == c) {
      for(c = a.length;;) {
        if(b < c) {
          if(null != a[b]) {
            return new cljs.core.NodeSeq(null, a, b, null, null)
          }
          var g = a[b + 1];
          if(cljs.core.truth_(g) && (g = g.inode_seq(), cljs.core.truth_(g))) {
            return new cljs.core.NodeSeq(null, a, b + 2, g, null)
          }
          b += 2
        }else {
          return null
        }
      }
    }else {
      return new cljs.core.NodeSeq(null, a, b, c, null)
    }
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.ArrayNodeSeq = function(a, b, c, d, e) {
  this.meta = a;
  this.nodes = b;
  this.i = c;
  this.s = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850572
};
cljs.core.ArrayNodeSeq.cljs$lang$type = !0;
cljs.core.ArrayNodeSeq.cljs$lang$ctorStr = "cljs.core/ArrayNodeSeq";
cljs.core.ArrayNodeSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/ArrayNodeSeq")
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll.call(null, a)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, a)
};
cljs.core.ArrayNodeSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return cljs.core.first.call(null, this.s)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return cljs.core.create_array_node_seq.call(null, null, this.nodes, this.i, cljs.core.next.call(null, this.s))
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.ArrayNodeSeq(b, this.nodes, this.i, this.s, this.__hash)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.create_array_node_seq = function() {
  var a = null, b = function(b) {
    return a.call(null, null, b, 0, null)
  }, c = function(a, b, c, g) {
    if(null == g) {
      for(g = b.length;;) {
        if(c < g) {
          var h = b[c];
          if(cljs.core.truth_(h) && (h = h.inode_seq(), cljs.core.truth_(h))) {
            return new cljs.core.ArrayNodeSeq(a, b, c + 1, h, null)
          }
          c += 1
        }else {
          return null
        }
      }
    }else {
      return new cljs.core.ArrayNodeSeq(a, b, c, g, null)
    }
  }, a = function(a, e, f, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 4:
        return c.call(this, a, e, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$4 = c;
  return a
}();
cljs.core.PersistentHashMap = function(a, b, c, d, e, f) {
  this.meta = a;
  this.cnt = b;
  this.root = c;
  this.has_nil_QMARK_ = d;
  this.nil_val = e;
  this.__hash = f;
  this.cljs$lang$protocol_mask$partition1$ = 4;
  this.cljs$lang$protocol_mask$partition0$ = 16123663
};
cljs.core.PersistentHashMap.cljs$lang$type = !0;
cljs.core.PersistentHashMap.cljs$lang$ctorStr = "cljs.core/PersistentHashMap";
cljs.core.PersistentHashMap.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/PersistentHashMap")
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function() {
  return new cljs.core.TransientHashMap({}, this.root, this.cnt, this.has_nil_QMARK_, this.nil_val)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_imap.call(null, a)
};
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return null == b ? this.has_nil_QMARK_ ? this.nil_val : c : null == this.root ? c : this.root.inode_lookup(0, cljs.core.hash.call(null, b), b, c)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  if(null == b) {
    var d;
    d = (d = this.has_nil_QMARK_) ? c === this.nil_val : d;
    return d ? a : new cljs.core.PersistentHashMap(this.meta, this.has_nil_QMARK_ ? this.cnt : this.cnt + 1, this.root, !0, c, null)
  }
  d = new cljs.core.Box(!1);
  c = (null == this.root ? cljs.core.BitmapIndexedNode.EMPTY : this.root).inode_assoc(0, cljs.core.hash.call(null, b), b, c, d);
  return c === this.root ? a : new cljs.core.PersistentHashMap(this.meta, d.val ? this.cnt + 1 : this.cnt, c, this.has_nil_QMARK_, this.nil_val, null)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(a, b) {
  return null == b ? this.has_nil_QMARK_ : null == this.root ? !1 : this.root.inode_lookup(0, cljs.core.hash.call(null, b), b, cljs.core.lookup_sentinel) !== cljs.core.lookup_sentinel
};
cljs.core.PersistentHashMap.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentHashMap.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.PersistentHashMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(a, b, c) {
  a = this.has_nil_QMARK_ ? b.call(null, c, null, this.nil_val) : c;
  return cljs.core.reduced_QMARK_.call(null, a) ? cljs.core.deref.call(null, a) : null != this.root ? this.root.kv_reduce(b, a) : a
};
cljs.core.PersistentHashMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.vector_QMARK_.call(null, b) ? a.cljs$core$IAssociative$_assoc$arity$3(a, cljs.core._nth.call(null, b, 0), cljs.core._nth.call(null, b, 1)) : cljs.core.reduce.call(null, cljs.core._conj, a, b)
};
cljs.core.PersistentHashMap.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.PersistentHashMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  if(0 < this.cnt) {
    var a = null != this.root ? this.root.inode_seq() : null;
    return this.has_nil_QMARK_ ? cljs.core.cons.call(null, cljs.core.PersistentVector.fromArray([null, this.nil_val], !0), a) : a
  }
  return null
};
cljs.core.PersistentHashMap.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.cnt
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_map.call(null, a, b)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentHashMap(b, this.cnt, this.root, this.has_nil_QMARK_, this.nil_val, this.__hash)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core._with_meta.call(null, cljs.core.PersistentHashMap.EMPTY, this.meta)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(a, b) {
  if(null == b) {
    return this.has_nil_QMARK_ ? new cljs.core.PersistentHashMap(this.meta, this.cnt - 1, this.root, !1, null, null) : a
  }
  if(null == this.root) {
    return a
  }
  var c = this.root.inode_without(0, cljs.core.hash.call(null, b), b);
  return c === this.root ? a : new cljs.core.PersistentHashMap(this.meta, this.cnt - 1, c, this.has_nil_QMARK_, this.nil_val, null)
};
cljs.core.PersistentHashMap.EMPTY = new cljs.core.PersistentHashMap(null, 0, null, !1, null, 0);
cljs.core.PersistentHashMap.fromArrays = function(a, b) {
  for(var c = a.length, d = 0, e = cljs.core.transient$.call(null, cljs.core.PersistentHashMap.EMPTY);;) {
    if(d < c) {
      var f = d + 1, e = cljs.core.assoc_BANG_.call(null, e, a[d], b[d]), d = f
    }else {
      return cljs.core.persistent_BANG_.call(null, e)
    }
  }
};
cljs.core.TransientHashMap = function(a, b, c, d, e) {
  this.edit = a;
  this.root = b;
  this.count = c;
  this.has_nil_QMARK_ = d;
  this.nil_val = e;
  this.cljs$lang$protocol_mask$partition1$ = 56;
  this.cljs$lang$protocol_mask$partition0$ = 258
};
cljs.core.TransientHashMap.cljs$lang$type = !0;
cljs.core.TransientHashMap.cljs$lang$ctorStr = "cljs.core/TransientHashMap";
cljs.core.TransientHashMap.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/TransientHashMap")
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = function(a, b) {
  return a.without_BANG_(b)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(a, b, c) {
  return a.assoc_BANG_(b, c)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(a, b) {
  return a.conj_BANG_(b)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(a) {
  return a.persistent_BANG_()
};
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return null == b ? this.has_nil_QMARK_ ? this.nil_val : null : null == this.root ? null : this.root.inode_lookup(0, cljs.core.hash.call(null, b), b)
};
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return null == b ? this.has_nil_QMARK_ ? this.nil_val : c : null == this.root ? c : this.root.inode_lookup(0, cljs.core.hash.call(null, b), b, c)
};
cljs.core.TransientHashMap.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  if(this.edit) {
    return this.count
  }
  throw Error("count after persistent!");
};
cljs.core.TransientHashMap.prototype.conj_BANG_ = function(a) {
  if(this.edit) {
    var b;
    a ? (b = (b = a.cljs$lang$protocol_mask$partition0$ & 2048) ? b : a.cljs$core$IMapEntry$, b = b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_.call(null, cljs.core.IMapEntry, a)) : b = cljs.core.type_satisfies_.call(null, cljs.core.IMapEntry, a);
    if(b) {
      return this.assoc_BANG_(cljs.core.key.call(null, a), cljs.core.val.call(null, a))
    }
    a = cljs.core.seq.call(null, a);
    for(b = this;;) {
      var c = cljs.core.first.call(null, a);
      if(cljs.core.truth_(c)) {
        a = cljs.core.next.call(null, a), b = b.assoc_BANG_(cljs.core.key.call(null, c), cljs.core.val.call(null, c))
      }else {
        return b
      }
    }
  }else {
    throw Error("conj! after persistent");
  }
};
cljs.core.TransientHashMap.prototype.assoc_BANG_ = function(a, b) {
  if(this.edit) {
    if(null == a) {
      this.nil_val !== b && (this.nil_val = b), this.has_nil_QMARK_ || (this.count += 1, this.has_nil_QMARK_ = !0)
    }else {
      var c = new cljs.core.Box(!1), d = (null == this.root ? cljs.core.BitmapIndexedNode.EMPTY : this.root).inode_assoc_BANG_(this.edit, 0, cljs.core.hash.call(null, a), a, b, c);
      d !== this.root && (this.root = d);
      c.val && (this.count += 1)
    }
    return this
  }
  throw Error("assoc! after persistent!");
};
cljs.core.TransientHashMap.prototype.without_BANG_ = function(a) {
  if(this.edit) {
    if(null == a) {
      this.has_nil_QMARK_ && (this.has_nil_QMARK_ = !1, this.nil_val = null, this.count -= 1)
    }else {
      if(null != this.root) {
        var b = new cljs.core.Box(!1), a = this.root.inode_without_BANG_(this.edit, 0, cljs.core.hash.call(null, a), a, b);
        a !== this.root && (this.root = a);
        cljs.core.truth_(b[0]) && (this.count -= 1)
      }
    }
    return this
  }
  throw Error("dissoc! after persistent!");
};
cljs.core.TransientHashMap.prototype.persistent_BANG_ = function() {
  if(this.edit) {
    return this.edit = null, new cljs.core.PersistentHashMap(null, this.count, this.root, this.has_nil_QMARK_, this.nil_val, null)
  }
  throw Error("persistent! called twice");
};
cljs.core.tree_map_seq_push = function(a, b, c) {
  for(var d = b;;) {
    if(null != a) {
      b = c ? a.left : a.right, d = cljs.core.conj.call(null, d, a), a = b
    }else {
      return d
    }
  }
};
cljs.core.PersistentTreeMapSeq = function(a, b, c, d, e) {
  this.meta = a;
  this.stack = b;
  this.ascending_QMARK_ = c;
  this.cnt = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850574
};
cljs.core.PersistentTreeMapSeq.cljs$lang$type = !0;
cljs.core.PersistentTreeMapSeq.cljs$lang$ctorStr = "cljs.core/PersistentTreeMapSeq";
cljs.core.PersistentTreeMapSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/PersistentTreeMapSeq")
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll.call(null, a)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, a)
};
cljs.core.PersistentTreeMapSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return 0 > this.cnt ? cljs.core.count.call(null, cljs.core.next.call(null, a)) + 1 : this.cnt
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return cljs.core.peek.call(null, this.stack)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  var a = cljs.core.first.call(null, this.stack), a = cljs.core.tree_map_seq_push.call(null, this.ascending_QMARK_ ? a.right : a.left, cljs.core.next.call(null, this.stack), this.ascending_QMARK_);
  return null != a ? new cljs.core.PersistentTreeMapSeq(null, a, this.ascending_QMARK_, this.cnt - 1, null) : cljs.core.List.EMPTY
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentTreeMapSeq(b, this.stack, this.ascending_QMARK_, this.cnt, this.__hash)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.create_tree_map_seq = function(a, b, c) {
  return new cljs.core.PersistentTreeMapSeq(null, cljs.core.tree_map_seq_push.call(null, a, null, b), b, c, null)
};
cljs.core.balance_left = function(a, b, c, d) {
  return c instanceof cljs.core.RedNode ? c.left instanceof cljs.core.RedNode ? new cljs.core.RedNode(c.key, c.val, c.left.blacken(), new cljs.core.BlackNode(a, b, c.right, d, null), null) : c.right instanceof cljs.core.RedNode ? new cljs.core.RedNode(c.right.key, c.right.val, new cljs.core.BlackNode(c.key, c.val, c.left, c.right.left, null), new cljs.core.BlackNode(a, b, c.right.right, d, null), null) : new cljs.core.BlackNode(a, b, c, d, null) : new cljs.core.BlackNode(a, b, c, d, null)
};
cljs.core.balance_right = function(a, b, c, d) {
  return d instanceof cljs.core.RedNode ? d.right instanceof cljs.core.RedNode ? new cljs.core.RedNode(d.key, d.val, new cljs.core.BlackNode(a, b, c, d.left, null), d.right.blacken(), null) : d.left instanceof cljs.core.RedNode ? new cljs.core.RedNode(d.left.key, d.left.val, new cljs.core.BlackNode(a, b, c, d.left.left, null), new cljs.core.BlackNode(d.key, d.val, d.left.right, d.right, null), null) : new cljs.core.BlackNode(a, b, c, d, null) : new cljs.core.BlackNode(a, b, c, d, null)
};
cljs.core.balance_left_del = function(a, b, c, d) {
  if(c instanceof cljs.core.RedNode) {
    return new cljs.core.RedNode(a, b, c.blacken(), d, null)
  }
  if(d instanceof cljs.core.BlackNode) {
    return cljs.core.balance_right.call(null, a, b, c, d.redden())
  }
  var e;
  e = (e = d instanceof cljs.core.RedNode) ? d.left instanceof cljs.core.BlackNode : e;
  if(e) {
    return new cljs.core.RedNode(d.left.key, d.left.val, new cljs.core.BlackNode(a, b, c, d.left.left, null), cljs.core.balance_right.call(null, d.key, d.val, d.left.right, d.right.redden()), null)
  }
  throw Error("red-black tree invariant violation");
};
cljs.core.balance_right_del = function(a, b, c, d) {
  if(d instanceof cljs.core.RedNode) {
    return new cljs.core.RedNode(a, b, c, d.blacken(), null)
  }
  if(c instanceof cljs.core.BlackNode) {
    return cljs.core.balance_left.call(null, a, b, c.redden(), d)
  }
  var e;
  e = (e = c instanceof cljs.core.RedNode) ? c.right instanceof cljs.core.BlackNode : e;
  if(e) {
    return new cljs.core.RedNode(c.right.key, c.right.val, cljs.core.balance_left.call(null, c.key, c.val, c.left.redden(), c.right.left), new cljs.core.BlackNode(a, b, c.right.right, d, null), null)
  }
  throw Error("red-black tree invariant violation");
};
cljs.core.tree_map_kv_reduce = function tree_map_kv_reduce(b, c, d) {
  d = null != b.left ? tree_map_kv_reduce.call(null, b.left, c, d) : d;
  if(cljs.core.reduced_QMARK_.call(null, d)) {
    return cljs.core.deref.call(null, d)
  }
  d = c.call(null, d, b.key, b.val);
  if(cljs.core.reduced_QMARK_.call(null, d)) {
    return cljs.core.deref.call(null, d)
  }
  b = null != b.right ? tree_map_kv_reduce.call(null, b.right, c, d) : d;
  return cljs.core.reduced_QMARK_.call(null, b) ? cljs.core.deref.call(null, b) : b
};
cljs.core.BlackNode = function(a, b, c, d, e) {
  this.key = a;
  this.val = b;
  this.left = c;
  this.right = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32402207
};
cljs.core.BlackNode.cljs$lang$type = !0;
cljs.core.BlackNode.cljs$lang$ctorStr = "cljs.core/BlackNode";
cljs.core.BlackNode.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/BlackNode")
};
cljs.core.BlackNode.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll.call(null, a)
};
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, null)
};
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, c)
};
cljs.core.BlackNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  return cljs.core.assoc.call(null, cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b, c)
};
cljs.core.BlackNode.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.BlackNode.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.BlackNode.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.PersistentVector.fromArray([this.key, this.val, b], !0)
};
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_key$arity$1 = function() {
  return this.key
};
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_val$arity$1 = function() {
  return this.val
};
cljs.core.BlackNode.prototype.add_right = function(a) {
  return a.balance_right(this)
};
cljs.core.BlackNode.prototype.redden = function() {
  return new cljs.core.RedNode(this.key, this.val, this.left, this.right, null)
};
cljs.core.BlackNode.prototype.remove_right = function(a) {
  return cljs.core.balance_right_del.call(null, this.key, this.val, this.left, a)
};
cljs.core.BlackNode.prototype.replace = function(a, b, c, d) {
  return new cljs.core.BlackNode(a, b, c, d, null)
};
cljs.core.BlackNode.prototype.kv_reduce = function(a, b) {
  return cljs.core.tree_map_kv_reduce.call(null, this, a, b)
};
cljs.core.BlackNode.prototype.remove_left = function(a) {
  return cljs.core.balance_left_del.call(null, this.key, this.val, a, this.right)
};
cljs.core.BlackNode.prototype.add_left = function(a) {
  return a.balance_left(this)
};
cljs.core.BlackNode.prototype.balance_left = function(a) {
  return new cljs.core.BlackNode(a.key, a.val, this, a.right, null)
};
cljs.core.BlackNode.prototype.balance_right = function(a) {
  return new cljs.core.BlackNode(a.key, a.val, a.left, this, null)
};
cljs.core.BlackNode.prototype.blacken = function() {
  return this
};
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.call(null, a, b)
};
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.call(null, a, b, c)
};
cljs.core.BlackNode.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  return cljs.core.list.call(null, this.key, this.val)
};
cljs.core.BlackNode.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return 2
};
cljs.core.BlackNode.prototype.cljs$core$IStack$_peek$arity$1 = function() {
  return this.val
};
cljs.core.BlackNode.prototype.cljs$core$IStack$_pop$arity$1 = function() {
  return cljs.core.PersistentVector.fromArray([this.key], !0)
};
cljs.core.BlackNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(a, b, c) {
  return cljs.core._assoc_n.call(null, cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b, c)
};
cljs.core.BlackNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.BlackNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b)
};
cljs.core.BlackNode.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return null
};
cljs.core.BlackNode.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  return 0 === b ? this.key : 1 === b ? this.val : null
};
cljs.core.BlackNode.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  return 0 === b ? this.key : 1 === b ? this.val : c
};
cljs.core.BlackNode.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.PersistentVector.EMPTY
};
cljs.core.RedNode = function(a, b, c, d, e) {
  this.key = a;
  this.val = b;
  this.left = c;
  this.right = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32402207
};
cljs.core.RedNode.cljs$lang$type = !0;
cljs.core.RedNode.cljs$lang$ctorStr = "cljs.core/RedNode";
cljs.core.RedNode.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/RedNode")
};
cljs.core.RedNode.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll.call(null, a)
};
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, null)
};
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, c)
};
cljs.core.RedNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  return cljs.core.assoc.call(null, cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b, c)
};
cljs.core.RedNode.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.RedNode.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.RedNode.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.PersistentVector.fromArray([this.key, this.val, b], !0)
};
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_key$arity$1 = function() {
  return this.key
};
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_val$arity$1 = function() {
  return this.val
};
cljs.core.RedNode.prototype.add_right = function(a) {
  return new cljs.core.RedNode(this.key, this.val, this.left, a, null)
};
cljs.core.RedNode.prototype.redden = function() {
  throw Error("red-black tree invariant violation");
};
cljs.core.RedNode.prototype.remove_right = function(a) {
  return new cljs.core.RedNode(this.key, this.val, this.left, a, null)
};
cljs.core.RedNode.prototype.replace = function(a, b, c, d) {
  return new cljs.core.RedNode(a, b, c, d, null)
};
cljs.core.RedNode.prototype.kv_reduce = function(a, b) {
  return cljs.core.tree_map_kv_reduce.call(null, this, a, b)
};
cljs.core.RedNode.prototype.remove_left = function(a) {
  return new cljs.core.RedNode(this.key, this.val, a, this.right, null)
};
cljs.core.RedNode.prototype.add_left = function(a) {
  return new cljs.core.RedNode(this.key, this.val, a, this.right, null)
};
cljs.core.RedNode.prototype.balance_left = function(a) {
  return this.left instanceof cljs.core.RedNode ? new cljs.core.RedNode(this.key, this.val, this.left.blacken(), new cljs.core.BlackNode(a.key, a.val, this.right, a.right, null), null) : this.right instanceof cljs.core.RedNode ? new cljs.core.RedNode(this.right.key, this.right.val, new cljs.core.BlackNode(this.key, this.val, this.left, this.right.left, null), new cljs.core.BlackNode(a.key, a.val, this.right.right, a.right, null), null) : new cljs.core.BlackNode(a.key, a.val, this, a.right, null)
};
cljs.core.RedNode.prototype.balance_right = function(a) {
  return this.right instanceof cljs.core.RedNode ? new cljs.core.RedNode(this.key, this.val, new cljs.core.BlackNode(a.key, a.val, a.left, this.left, null), this.right.blacken(), null) : this.left instanceof cljs.core.RedNode ? new cljs.core.RedNode(this.left.key, this.left.val, new cljs.core.BlackNode(a.key, a.val, a.left, this.left.left, null), new cljs.core.BlackNode(this.key, this.val, this.left.right, this.right, null), null) : new cljs.core.BlackNode(a.key, a.val, a.left, this, null)
};
cljs.core.RedNode.prototype.blacken = function() {
  return new cljs.core.BlackNode(this.key, this.val, this.left, this.right, null)
};
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.call(null, a, b)
};
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.call(null, a, b, c)
};
cljs.core.RedNode.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  return cljs.core.list.call(null, this.key, this.val)
};
cljs.core.RedNode.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return 2
};
cljs.core.RedNode.prototype.cljs$core$IStack$_peek$arity$1 = function() {
  return this.val
};
cljs.core.RedNode.prototype.cljs$core$IStack$_pop$arity$1 = function() {
  return cljs.core.PersistentVector.fromArray([this.key], !0)
};
cljs.core.RedNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(a, b, c) {
  return cljs.core._assoc_n.call(null, cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b, c)
};
cljs.core.RedNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.RedNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b)
};
cljs.core.RedNode.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return null
};
cljs.core.RedNode.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  return 0 === b ? this.key : 1 === b ? this.val : null
};
cljs.core.RedNode.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  return 0 === b ? this.key : 1 === b ? this.val : c
};
cljs.core.RedNode.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.PersistentVector.EMPTY
};
cljs.core.tree_map_add = function tree_map_add(b, c, d, e, f) {
  if(null == c) {
    return new cljs.core.RedNode(d, e, null, null, null)
  }
  var g = b.call(null, d, c.key);
  if(0 === g) {
    return f[0] = c, null
  }
  if(0 > g) {
    return b = tree_map_add.call(null, b, c.left, d, e, f), null != b ? c.add_left(b) : null
  }
  b = tree_map_add.call(null, b, c.right, d, e, f);
  return null != b ? c.add_right(b) : null
};
cljs.core.tree_map_append = function tree_map_append(b, c) {
  if(null == b) {
    return c
  }
  if(null == c) {
    return b
  }
  if(b instanceof cljs.core.RedNode) {
    if(c instanceof cljs.core.RedNode) {
      var d = tree_map_append.call(null, b.right, c.left);
      return d instanceof cljs.core.RedNode ? new cljs.core.RedNode(d.key, d.val, new cljs.core.RedNode(b.key, b.val, b.left, d.left, null), new cljs.core.RedNode(c.key, c.val, d.right, c.right, null), null) : new cljs.core.RedNode(b.key, b.val, b.left, new cljs.core.RedNode(c.key, c.val, d, c.right, null), null)
    }
    return new cljs.core.RedNode(b.key, b.val, b.left, tree_map_append.call(null, b.right, c), null)
  }
  if(c instanceof cljs.core.RedNode) {
    return new cljs.core.RedNode(c.key, c.val, tree_map_append.call(null, b, c.left), c.right, null)
  }
  d = tree_map_append.call(null, b.right, c.left);
  return d instanceof cljs.core.RedNode ? new cljs.core.RedNode(d.key, d.val, new cljs.core.BlackNode(b.key, b.val, b.left, d.left, null), new cljs.core.BlackNode(c.key, c.val, d.right, c.right, null), null) : cljs.core.balance_left_del.call(null, b.key, b.val, b.left, new cljs.core.BlackNode(c.key, c.val, d, c.right, null))
};
cljs.core.tree_map_remove = function tree_map_remove(b, c, d, e) {
  if(null != c) {
    var f = b.call(null, d, c.key);
    if(0 === f) {
      return e[0] = c, cljs.core.tree_map_append.call(null, c.left, c.right)
    }
    if(0 > f) {
      return b = tree_map_remove.call(null, b, c.left, d, e), e = (d = null != b) ? d : null != e[0], e ? c.left instanceof cljs.core.BlackNode ? cljs.core.balance_left_del.call(null, c.key, c.val, b, c.right) : new cljs.core.RedNode(c.key, c.val, b, c.right, null) : null
    }
    b = tree_map_remove.call(null, b, c.right, d, e);
    e = (d = null != b) ? d : null != e[0];
    return e ? c.right instanceof cljs.core.BlackNode ? cljs.core.balance_right_del.call(null, c.key, c.val, c.left, b) : new cljs.core.RedNode(c.key, c.val, c.left, b, null) : null
  }
  return null
};
cljs.core.tree_map_replace = function tree_map_replace(b, c, d, e) {
  var f = c.key, g = b.call(null, d, f);
  return 0 === g ? c.replace(f, e, c.left, c.right) : 0 > g ? c.replace(f, c.val, tree_map_replace.call(null, b, c.left, d, e), c.right) : c.replace(f, c.val, c.left, tree_map_replace.call(null, b, c.right, d, e))
};
cljs.core.PersistentTreeMap = function(a, b, c, d, e) {
  this.comp = a;
  this.tree = b;
  this.cnt = c;
  this.meta = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 418776847
};
cljs.core.PersistentTreeMap.cljs$lang$type = !0;
cljs.core.PersistentTreeMap.cljs$lang$ctorStr = "cljs.core/PersistentTreeMap";
cljs.core.PersistentTreeMap.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/PersistentTreeMap")
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_imap.call(null, a)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  a = a.entry_at(b);
  return null != a ? a.val : c
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  var d = [null], e = cljs.core.tree_map_add.call(null, this.comp, this.tree, b, c, d);
  return null == e ? (d = cljs.core.nth.call(null, d, 0), cljs.core._EQ_.call(null, c, d.val) ? a : new cljs.core.PersistentTreeMap(this.comp, cljs.core.tree_map_replace.call(null, this.comp, this.tree, b, c), this.cnt, this.meta, null)) : new cljs.core.PersistentTreeMap(this.comp, e.blacken(), this.cnt + 1, this.meta, null)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(a, b) {
  return null != a.entry_at(b)
};
cljs.core.PersistentTreeMap.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentTreeMap.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(a, b, c) {
  return null != this.tree ? cljs.core.tree_map_kv_reduce.call(null, this.tree, b, c) : c
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.vector_QMARK_.call(null, b) ? a.cljs$core$IAssociative$_assoc$arity$3(a, cljs.core._nth.call(null, b, 0), cljs.core._nth.call(null, b, 1)) : cljs.core.reduce.call(null, cljs.core._conj, a, b)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IReversible$_rseq$arity$1 = function() {
  return 0 < this.cnt ? cljs.core.create_tree_map_seq.call(null, this.tree, !1, this.cnt) : null
};
cljs.core.PersistentTreeMap.prototype.entry_at = function(a) {
  for(var b = this.tree;;) {
    if(null != b) {
      var c = this.comp.call(null, a, b.key);
      if(0 === c) {
        return b
      }
      b = 0 > c ? b.left : b.right
    }else {
      return null
    }
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = function(a, b) {
  return 0 < this.cnt ? cljs.core.create_tree_map_seq.call(null, this.tree, b, this.cnt) : null
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = function(a, b, c) {
  if(0 < this.cnt) {
    for(var a = null, d = this.tree;;) {
      if(null != d) {
        var e = this.comp.call(null, b, d.key);
        if(0 === e) {
          return new cljs.core.PersistentTreeMapSeq(null, cljs.core.conj.call(null, a, d), c, -1, null)
        }
        cljs.core.truth_(c) ? 0 > e ? (a = cljs.core.conj.call(null, a, d), d = d.left) : d = d.right : 0 < e ? (a = cljs.core.conj.call(null, a, d), d = d.right) : d = d.left
      }else {
        return null == a ? null : new cljs.core.PersistentTreeMapSeq(null, a, c, -1, null)
      }
    }
  }else {
    return null
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_entry_key$arity$2 = function(a, b) {
  return cljs.core.key.call(null, b)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_comparator$arity$1 = function() {
  return this.comp
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  return 0 < this.cnt ? cljs.core.create_tree_map_seq.call(null, this.tree, !0, this.cnt) : null
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.cnt
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_map.call(null, a, b)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentTreeMap(this.comp, this.tree, this.cnt, b, this.__hash)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta.call(null, cljs.core.PersistentTreeMap.EMPTY, this.meta)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(a, b) {
  var c = [null], d = cljs.core.tree_map_remove.call(null, this.comp, this.tree, b, c);
  return null == d ? null == cljs.core.nth.call(null, c, 0) ? a : new cljs.core.PersistentTreeMap(this.comp, null, 0, this.meta, null) : new cljs.core.PersistentTreeMap(this.comp, d.blacken(), this.cnt - 1, this.meta, null)
};
cljs.core.PersistentTreeMap.EMPTY = new cljs.core.PersistentTreeMap(cljs.core.compare, null, 0, null, 0);
cljs.core.hash_map = function() {
  var a = function(a) {
    for(var a = cljs.core.seq.call(null, a), b = cljs.core.transient$.call(null, cljs.core.PersistentHashMap.EMPTY);;) {
      if(a) {
        var e = cljs.core.nnext.call(null, a), b = cljs.core.assoc_BANG_.call(null, b, cljs.core.first.call(null, a), cljs.core.second.call(null, a)), a = e
      }else {
        return cljs.core.persistent_BANG_.call(null, b)
      }
    }
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.array_map = function() {
  var a = function(a) {
    return new cljs.core.PersistentArrayMap(null, cljs.core.quot.call(null, cljs.core.count.call(null, a), 2), cljs.core.apply.call(null, cljs.core.array, a), null)
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.obj_map = function() {
  var a = function(a) {
    for(var b = [], e = {}, a = cljs.core.seq.call(null, a);;) {
      if(a) {
        b.push(cljs.core.first.call(null, a)), e[cljs.core.first.call(null, a)] = cljs.core.second.call(null, a), a = cljs.core.nnext.call(null, a)
      }else {
        return cljs.core.ObjMap.fromObject.call(null, b, e)
      }
    }
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.sorted_map = function() {
  var a = function(a) {
    for(var a = cljs.core.seq.call(null, a), b = cljs.core.PersistentTreeMap.EMPTY;;) {
      if(a) {
        var e = cljs.core.nnext.call(null, a), b = cljs.core.assoc.call(null, b, cljs.core.first.call(null, a), cljs.core.second.call(null, a)), a = e
      }else {
        return b
      }
    }
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.sorted_map_by = function() {
  var a = function(a, b) {
    for(var e = cljs.core.seq.call(null, b), f = new cljs.core.PersistentTreeMap(cljs.core.fn__GT_comparator.call(null, a), null, 0, null, 0);;) {
      if(e) {
        var g = cljs.core.nnext.call(null, e), f = cljs.core.assoc.call(null, f, cljs.core.first.call(null, e), cljs.core.second.call(null, e)), e = g
      }else {
        return f
      }
    }
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.keys = function(a) {
  return cljs.core.seq.call(null, cljs.core.map.call(null, cljs.core.first, a))
};
cljs.core.key = function(a) {
  return cljs.core._key.call(null, a)
};
cljs.core.vals = function(a) {
  return cljs.core.seq.call(null, cljs.core.map.call(null, cljs.core.second, a))
};
cljs.core.val = function(a) {
  return cljs.core._val.call(null, a)
};
cljs.core.merge = function() {
  var a = function(a) {
    return cljs.core.truth_(cljs.core.some.call(null, cljs.core.identity, a)) ? cljs.core.reduce.call(null, function(a, b) {
      return cljs.core.conj.call(null, cljs.core.truth_(a) ? a : cljs.core.ObjMap.EMPTY, b)
    }, a) : null
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.merge_with = function() {
  var a = function(a, b) {
    if(cljs.core.truth_(cljs.core.some.call(null, cljs.core.identity, b))) {
      var e = function(b, d) {
        var e = cljs.core.first.call(null, d), i = cljs.core.second.call(null, d);
        return cljs.core.contains_QMARK_.call(null, b, e) ? cljs.core.assoc.call(null, b, e, a.call(null, cljs.core.get.call(null, b, e), i)) : cljs.core.assoc.call(null, b, e, i)
      };
      return cljs.core.reduce.call(null, function(a, b) {
        return cljs.core.reduce.call(null, e, cljs.core.truth_(a) ? a : cljs.core.ObjMap.EMPTY, cljs.core.seq.call(null, b))
      }, b)
    }
    return null
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.select_keys = function(a, b) {
  for(var c = cljs.core.ObjMap.EMPTY, d = cljs.core.seq.call(null, b);;) {
    if(d) {
      var e = cljs.core.first.call(null, d), f = cljs.core.get.call(null, a, e, "\ufdd0:cljs.core/not-found"), c = cljs.core.not_EQ_.call(null, f, "\ufdd0:cljs.core/not-found") ? cljs.core.assoc.call(null, c, e, f) : c, d = cljs.core.next.call(null, d)
    }else {
      return c
    }
  }
};
cljs.core.PersistentHashSet = function(a, b, c) {
  this.meta = a;
  this.hash_map = b;
  this.__hash = c;
  this.cljs$lang$protocol_mask$partition1$ = 4;
  this.cljs$lang$protocol_mask$partition0$ = 15077647
};
cljs.core.PersistentHashSet.cljs$lang$type = !0;
cljs.core.PersistentHashSet.cljs$lang$ctorStr = "cljs.core/PersistentHashSet";
cljs.core.PersistentHashSet.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/PersistentHashSet")
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function() {
  return new cljs.core.TransientHashSet(cljs.core._as_transient.call(null, this.hash_map))
};
cljs.core.PersistentHashSet.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_iset.call(null, a)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null, this.hash_map, b)) ? b : c
};
cljs.core.PersistentHashSet.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentHashSet.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.PersistentHashSet.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return new cljs.core.PersistentHashSet(this.meta, cljs.core.assoc.call(null, this.hash_map, b, null), null)
};
cljs.core.PersistentHashSet.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  return cljs.core.keys.call(null, this.hash_map)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ISet$_disjoin$arity$2 = function(a, b) {
  return new cljs.core.PersistentHashSet(this.meta, cljs.core._dissoc.call(null, this.hash_map, b), null)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return cljs.core._count.call(null, this.hash_map)
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  var c = cljs.core.set_QMARK_.call(null, b);
  return c ? (c = cljs.core.count.call(null, a) === cljs.core.count.call(null, b)) ? cljs.core.every_QMARK_.call(null, function(b) {
    return cljs.core.contains_QMARK_.call(null, a, b)
  }, b) : c : c
};
cljs.core.PersistentHashSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentHashSet(b, this.hash_map, this.__hash)
};
cljs.core.PersistentHashSet.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta.call(null, cljs.core.PersistentHashSet.EMPTY, this.meta)
};
cljs.core.PersistentHashSet.EMPTY = new cljs.core.PersistentHashSet(null, cljs.core.PersistentArrayMap.EMPTY, 0);
cljs.core.PersistentHashSet.fromArray = function(a, b) {
  var c = a.length;
  if(c / 2 <= cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD) {
    return c = b ? a : a.slice(), new cljs.core.PersistentHashSet(null, cljs.core.PersistentArrayMap.fromArray.call(null, c, !0), null)
  }
  for(var d = 0, e = cljs.core.transient$.call(null, cljs.core.PersistentHashSet.EMPTY);;) {
    if(d < c) {
      var f = d + 2, e = cljs.core.conj_BANG_.call(null, e, a[d]), d = f
    }else {
      return cljs.core.persistent_BANG_.call(null, e)
    }
  }
};
cljs.core.TransientHashSet = function(a) {
  this.transient_map = a;
  this.cljs$lang$protocol_mask$partition0$ = 259;
  this.cljs$lang$protocol_mask$partition1$ = 136
};
cljs.core.TransientHashSet.cljs$lang$type = !0;
cljs.core.TransientHashSet.cljs$lang$ctorStr = "cljs.core/TransientHashSet";
cljs.core.TransientHashSet.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/TransientHashSet")
};
cljs.core.TransientHashSet.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e;
        e = cljs.core._lookup.call(null, this.transient_map, c, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel ? null : c;
        return e;
      case 3:
        return e = cljs.core._lookup.call(null, this.transient_map, c, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel ? d : c, e
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.TransientHashSet.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return cljs.core._lookup.call(null, this.transient_map, b, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel ? c : b
};
cljs.core.TransientHashSet.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return cljs.core.count.call(null, this.transient_map)
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientSet$_disjoin_BANG_$arity$2 = function(a, b) {
  this.transient_map = cljs.core.dissoc_BANG_.call(null, this.transient_map, b);
  return a
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(a, b) {
  this.transient_map = cljs.core.assoc_BANG_.call(null, this.transient_map, b, null);
  return a
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function() {
  return new cljs.core.PersistentHashSet(null, cljs.core.persistent_BANG_.call(null, this.transient_map), null)
};
cljs.core.PersistentTreeSet = function(a, b, c) {
  this.meta = a;
  this.tree_map = b;
  this.__hash = c;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 417730831
};
cljs.core.PersistentTreeSet.cljs$lang$type = !0;
cljs.core.PersistentTreeSet.cljs$lang$ctorStr = "cljs.core/PersistentTreeSet";
cljs.core.PersistentTreeSet.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/PersistentTreeSet")
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_iset.call(null, a)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  a = this.tree_map.entry_at(b);
  return null != a ? a.key : c
};
cljs.core.PersistentTreeSet.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentTreeSet.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return new cljs.core.PersistentTreeSet(this.meta, cljs.core.assoc.call(null, this.tree_map, b, null), null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IReversible$_rseq$arity$1 = function() {
  return cljs.core.map.call(null, cljs.core.key, cljs.core.rseq.call(null, this.tree_map))
};
cljs.core.PersistentTreeSet.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = function(a, b) {
  return cljs.core.map.call(null, cljs.core.key, cljs.core._sorted_seq.call(null, this.tree_map, b))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = function(a, b, c) {
  return cljs.core.map.call(null, cljs.core.key, cljs.core._sorted_seq_from.call(null, this.tree_map, b, c))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_entry_key$arity$2 = function(a, b) {
  return b
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_comparator$arity$1 = function() {
  return cljs.core._comparator.call(null, this.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  return cljs.core.keys.call(null, this.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISet$_disjoin$arity$2 = function(a, b) {
  return new cljs.core.PersistentTreeSet(this.meta, cljs.core.dissoc.call(null, this.tree_map, b), null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return cljs.core.count.call(null, this.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  var c = cljs.core.set_QMARK_.call(null, b);
  return c ? (c = cljs.core.count.call(null, a) === cljs.core.count.call(null, b)) ? cljs.core.every_QMARK_.call(null, function(b) {
    return cljs.core.contains_QMARK_.call(null, a, b)
  }, b) : c : c
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentTreeSet(b, this.tree_map, this.__hash)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta.call(null, cljs.core.PersistentTreeSet.EMPTY, this.meta)
};
cljs.core.PersistentTreeSet.EMPTY = new cljs.core.PersistentTreeSet(null, cljs.core.PersistentTreeMap.EMPTY, 0);
cljs.core.hash_set = function() {
  var a = null, b = function() {
    return cljs.core.PersistentHashSet.EMPTY
  }, c = function(a) {
    var b = a instanceof cljs.core.IndexedSeq;
    if(b ? a.arr.length < cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD : b) {
      for(var a = a.arr, b = a.length, c = Array(2 * b), d = 0;;) {
        if(d < b) {
          var i = 2 * d;
          c[i] = a[d];
          c[i + 1] = null;
          d += 1
        }else {
          return cljs.core.PersistentHashSet.fromArray.call(null, c, !0)
        }
      }
    }else {
      for(c = cljs.core._as_transient.call(null, cljs.core.PersistentHashSet.EMPTY);;) {
        if(null != a) {
          b = cljs.core._next.call(null, a), c = cljs.core._conj_BANG_.call(null, c, cljs.core._first.call(null, a)), a = b
        }else {
          return cljs.core._persistent_BANG_.call(null, c)
        }
      }
    }
  }, d = function(a) {
    var b = null;
    0 < arguments.length && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return c.call(this, b)
  };
  d.cljs$lang$maxFixedArity = 0;
  d.cljs$lang$applyTo = function(a) {
    a = cljs.core.seq(a);
    return c(a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(arguments, 0))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 0;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.set = function(a) {
  return cljs.core.apply.call(null, cljs.core.hash_set, a)
};
cljs.core.sorted_set = function() {
  var a = function(a) {
    return cljs.core.reduce.call(null, cljs.core._conj, cljs.core.PersistentTreeSet.EMPTY, a)
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.sorted_set_by = function() {
  var a = function(a, b) {
    return cljs.core.reduce.call(null, cljs.core._conj, new cljs.core.PersistentTreeSet(null, cljs.core.sorted_map_by.call(null, a), 0), b)
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.replace = function(a, b) {
  if(cljs.core.vector_QMARK_.call(null, b)) {
    var c = cljs.core.count.call(null, b);
    return cljs.core.reduce.call(null, function(b, c) {
      var f = cljs.core.find.call(null, a, cljs.core.nth.call(null, b, c));
      return cljs.core.truth_(f) ? cljs.core.assoc.call(null, b, c, cljs.core.second.call(null, f)) : b
    }, b, cljs.core.take.call(null, c, cljs.core.iterate.call(null, cljs.core.inc, 0)))
  }
  return cljs.core.map.call(null, function(b) {
    var c = cljs.core.find.call(null, a, b);
    return cljs.core.truth_(c) ? cljs.core.second.call(null, c) : b
  }, b)
};
cljs.core.distinct = function(a) {
  return function c(a, e) {
    return new cljs.core.LazySeq(null, !1, function() {
      return function(a, d) {
        for(;;) {
          var e = a, i = cljs.core.nth.call(null, e, 0, null);
          if(e = cljs.core.seq.call(null, e)) {
            if(cljs.core.contains_QMARK_.call(null, d, i)) {
              i = cljs.core.rest.call(null, e), e = d, a = i, d = e
            }else {
              return cljs.core.cons.call(null, i, c.call(null, cljs.core.rest.call(null, e), cljs.core.conj.call(null, d, i)))
            }
          }else {
            return null
          }
        }
      }.call(null, a, e)
    }, null)
  }.call(null, a, cljs.core.PersistentHashSet.EMPTY)
};
cljs.core.butlast = function(a) {
  for(var b = cljs.core.PersistentVector.EMPTY;;) {
    if(cljs.core.next.call(null, a)) {
      b = cljs.core.conj.call(null, b, cljs.core.first.call(null, a)), a = cljs.core.next.call(null, a)
    }else {
      return cljs.core.seq.call(null, b)
    }
  }
};
cljs.core.name = function(a) {
  if(a && cljs.core.truth_(cljs.core.truth_(null) ? null : a.cljs$core$INamed$)) {
    return cljs.core._name.call(null, a)
  }
  if(cljs.core.string_QMARK_.call(null, a)) {
    return a
  }
  if(cljs.core.keyword_QMARK_.call(null, a)) {
    var b = a.lastIndexOf("/", a.length - 2);
    return 0 > b ? cljs.core.subs.call(null, a, 2) : cljs.core.subs.call(null, a, b + 1)
  }
  throw Error([cljs.core.str("Doesn't support name: "), cljs.core.str(a)].join(""));
};
cljs.core.namespace = function(a) {
  if(a && cljs.core.truth_(cljs.core.truth_(null) ? null : a.cljs$core$INamed$)) {
    return cljs.core._namespace.call(null, a)
  }
  if(cljs.core.keyword_QMARK_.call(null, a)) {
    var b = a.lastIndexOf("/", a.length - 2);
    return-1 < b ? cljs.core.subs.call(null, a, 2, b) : null
  }
  throw Error([cljs.core.str("Doesn't support namespace: "), cljs.core.str(a)].join(""));
};
cljs.core.zipmap = function(a, b) {
  for(var c = cljs.core.ObjMap.EMPTY, d = cljs.core.seq.call(null, a), e = cljs.core.seq.call(null, b);;) {
    var f;
    f = (f = d) ? e : f;
    if(f) {
      c = cljs.core.assoc.call(null, c, cljs.core.first.call(null, d), cljs.core.first.call(null, e)), d = cljs.core.next.call(null, d), e = cljs.core.next.call(null, e)
    }else {
      return c
    }
  }
};
cljs.core.max_key = function() {
  var a = null, b = function(a, b, c) {
    return a.call(null, b) > a.call(null, c) ? b : c
  }, c = function(b, c, d, h) {
    return cljs.core.reduce.call(null, function(c, d) {
      return a.call(null, b, c, d)
    }, a.call(null, b, c, d), h)
  }, d = function(a, b, d, h) {
    var i = null;
    3 < arguments.length && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return c.call(this, a, b, d, i)
  };
  d.cljs$lang$maxFixedArity = 3;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), h = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, h, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g, h) {
    switch(arguments.length) {
      case 2:
        return c;
      case 3:
        return b.call(this, a, c, g);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, g, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return b
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.min_key = function() {
  var a = null, b = function(a, b, c) {
    return a.call(null, b) < a.call(null, c) ? b : c
  }, c = function(b, c, d, h) {
    return cljs.core.reduce.call(null, function(c, d) {
      return a.call(null, b, c, d)
    }, a.call(null, b, c, d), h)
  }, d = function(a, b, d, h) {
    var i = null;
    3 < arguments.length && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return c.call(this, a, b, d, i)
  };
  d.cljs$lang$maxFixedArity = 3;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), h = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, h, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g, h) {
    switch(arguments.length) {
      case 2:
        return c;
      case 3:
        return b.call(this, a, c, g);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, g, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return b
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.partition_all = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, b, c)
  }, c = function(b, c, f) {
    return new cljs.core.LazySeq(null, !1, function() {
      var g = cljs.core.seq.call(null, f);
      return g ? cljs.core.cons.call(null, cljs.core.take.call(null, b, g), a.call(null, b, c, cljs.core.drop.call(null, c, g))) : null
    }, null)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.take_while = function take_while(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    var d = cljs.core.seq.call(null, c);
    return d ? cljs.core.truth_(b.call(null, cljs.core.first.call(null, d))) ? cljs.core.cons.call(null, cljs.core.first.call(null, d), take_while.call(null, b, cljs.core.rest.call(null, d))) : null : null
  }, null)
};
cljs.core.mk_bound_fn = function(a, b, c) {
  return function(d) {
    var e = cljs.core._comparator.call(null, a);
    return b.call(null, e.call(null, cljs.core._entry_key.call(null, a, d), c), 0)
  }
};
cljs.core.subseq = function() {
  var a = null, b = function(a, b, c) {
    var g = cljs.core.mk_bound_fn.call(null, a, b, c);
    return cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._GT_, null, cljs.core._GT__EQ_, null], !0).call(null, b)) ? (a = cljs.core._sorted_seq_from.call(null, a, c, !0), cljs.core.truth_(a) ? (b = cljs.core.nth.call(null, a, 0, null), cljs.core.truth_(g.call(null, b)) ? a : cljs.core.next.call(null, a)) : null) : cljs.core.take_while.call(null, g, cljs.core._sorted_seq.call(null, a, !0))
  }, c = function(a, b, c, g, h) {
    var i = cljs.core._sorted_seq_from.call(null, a, c, !0);
    if(cljs.core.truth_(i)) {
      var j = cljs.core.nth.call(null, i, 0, null);
      return cljs.core.take_while.call(null, cljs.core.mk_bound_fn.call(null, a, g, h), cljs.core.truth_(cljs.core.mk_bound_fn.call(null, a, b, c).call(null, j)) ? i : cljs.core.next.call(null, i))
    }
    return null
  }, a = function(a, e, f, g, h) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, e, f);
      case 5:
        return c.call(this, a, e, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$5 = c;
  return a
}();
cljs.core.rsubseq = function() {
  var a = null, b = function(a, b, c) {
    var g = cljs.core.mk_bound_fn.call(null, a, b, c);
    return cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._LT_, null, cljs.core._LT__EQ_, null], !0).call(null, b)) ? (a = cljs.core._sorted_seq_from.call(null, a, c, !1), cljs.core.truth_(a) ? (b = cljs.core.nth.call(null, a, 0, null), cljs.core.truth_(g.call(null, b)) ? a : cljs.core.next.call(null, a)) : null) : cljs.core.take_while.call(null, g, cljs.core._sorted_seq.call(null, a, !1))
  }, c = function(a, b, c, g, h) {
    var i = cljs.core._sorted_seq_from.call(null, a, h, !1);
    if(cljs.core.truth_(i)) {
      var j = cljs.core.nth.call(null, i, 0, null);
      return cljs.core.take_while.call(null, cljs.core.mk_bound_fn.call(null, a, b, c), cljs.core.truth_(cljs.core.mk_bound_fn.call(null, a, g, h).call(null, j)) ? i : cljs.core.next.call(null, i))
    }
    return null
  }, a = function(a, e, f, g, h) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, e, f);
      case 5:
        return c.call(this, a, e, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$5 = c;
  return a
}();
cljs.core.Range = function(a, b, c, d, e) {
  this.meta = a;
  this.start = b;
  this.end = c;
  this.step = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32375006
};
cljs.core.Range.cljs$lang$type = !0;
cljs.core.Range.cljs$lang$ctorStr = "cljs.core/Range";
cljs.core.Range.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/Range")
};
cljs.core.Range.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll.call(null, a)
};
cljs.core.Range.prototype.cljs$core$INext$_next$arity$1 = function() {
  return 0 < this.step ? this.start + this.step < this.end ? new cljs.core.Range(this.meta, this.start + this.step, this.end, this.step, null) : null : this.start + this.step > this.end ? new cljs.core.Range(this.meta, this.start + this.step, this.end, this.step, null) : null
};
cljs.core.Range.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, a)
};
cljs.core.Range.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.call(null, a, b)
};
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.call(null, a, b, c)
};
cljs.core.Range.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return 0 < this.step ? this.start < this.end ? a : null : this.start > this.end ? a : null
};
cljs.core.Range.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return cljs.core.not.call(null, a.cljs$core$ISeqable$_seq$arity$1(a)) ? 0 : Math.ceil((this.end - this.start) / this.step)
};
cljs.core.Range.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return this.start
};
cljs.core.Range.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return null != a.cljs$core$ISeqable$_seq$arity$1(a) ? new cljs.core.Range(this.meta, this.start + this.step, this.end, this.step, null) : cljs.core.List.EMPTY
};
cljs.core.Range.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.Range.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.Range(b, this.start, this.end, this.step, this.__hash)
};
cljs.core.Range.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  if(b < a.cljs$core$ICounted$_count$arity$1(a)) {
    return this.start + b * this.step
  }
  var c;
  c = (c = this.start > this.end) ? 0 === this.step : c;
  if(c) {
    return this.start
  }
  throw Error("Index out of bounds");
};
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  if(b < a.cljs$core$ICounted$_count$arity$1(a)) {
    return this.start + b * this.step
  }
  a = (a = this.start > this.end) ? 0 === this.step : a;
  return a ? this.start : c
};
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.range = function() {
  var a = null, b = function() {
    return a.call(null, 0, Number.MAX_VALUE, 1)
  }, c = function(b) {
    return a.call(null, 0, b, 1)
  }, d = function(b, c) {
    return a.call(null, b, c, 1)
  }, e = function(a, b, c) {
    return new cljs.core.Range(null, a, b, c, null)
  }, a = function(a, g, h) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a);
      case 2:
        return d.call(this, a, g);
      case 3:
        return e.call(this, a, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  a.cljs$core$IFn$_invoke$arity$2 = d;
  a.cljs$core$IFn$_invoke$arity$3 = e;
  return a
}();
cljs.core.take_nth = function take_nth(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    var d = cljs.core.seq.call(null, c);
    return d ? cljs.core.cons.call(null, cljs.core.first.call(null, d), take_nth.call(null, b, cljs.core.drop.call(null, b, d))) : null
  }, null)
};
cljs.core.split_with = function(a, b) {
  return cljs.core.PersistentVector.fromArray([cljs.core.take_while.call(null, a, b), cljs.core.drop_while.call(null, a, b)], !0)
};
cljs.core.partition_by = function partition_by(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    var d = cljs.core.seq.call(null, c);
    if(d) {
      var e = cljs.core.first.call(null, d), f = b.call(null, e), e = cljs.core.cons.call(null, e, cljs.core.take_while.call(null, function(c, d) {
        return function(c) {
          return cljs.core._EQ_.call(null, d, b.call(null, c))
        }
      }(e, f), cljs.core.next.call(null, d)));
      return cljs.core.cons.call(null, e, partition_by.call(null, b, cljs.core.seq.call(null, cljs.core.drop.call(null, cljs.core.count.call(null, e), d))))
    }
    return null
  }, null)
};
cljs.core.frequencies = function(a) {
  return cljs.core.persistent_BANG_.call(null, cljs.core.reduce.call(null, function(a, c) {
    return cljs.core.assoc_BANG_.call(null, a, c, cljs.core.get.call(null, a, c, 0) + 1)
  }, cljs.core.transient$.call(null, cljs.core.ObjMap.EMPTY), a))
};
cljs.core.reductions = function() {
  var a = null, b = function(b, c) {
    return new cljs.core.LazySeq(null, !1, function() {
      var f = cljs.core.seq.call(null, c);
      return f ? a.call(null, b, cljs.core.first.call(null, f), cljs.core.rest.call(null, f)) : cljs.core.list.call(null, b.call(null))
    }, null)
  }, c = function(b, c, f) {
    return cljs.core.cons.call(null, c, new cljs.core.LazySeq(null, !1, function() {
      var g = cljs.core.seq.call(null, f);
      return g ? a.call(null, b, b.call(null, c, cljs.core.first.call(null, g)), cljs.core.rest.call(null, g)) : null
    }, null))
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.juxt = function() {
  var a = null, b = function(a) {
    var b = null, c = function(b, c, d, e) {
      return cljs.core.vector.call(null, cljs.core.apply.call(null, a, b, c, d, e))
    }, d = function(a, b, d, e) {
      var f = null;
      3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return c.call(this, a, b, d, f)
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), e = cljs.core.first(a), a = cljs.core.rest(a);
      return c(b, d, e, a)
    };
    d.cljs$core$IFn$_invoke$arity$variadic = c;
    b = function(b, c, e, f) {
      switch(arguments.length) {
        case 0:
          return cljs.core.vector.call(null, a.call(null));
        case 1:
          return cljs.core.vector.call(null, a.call(null, b));
        case 2:
          return cljs.core.vector.call(null, a.call(null, b, c));
        case 3:
          return cljs.core.vector.call(null, a.call(null, b, c, e));
        default:
          return d.cljs$core$IFn$_invoke$arity$variadic(b, c, e, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = d.cljs$lang$applyTo;
    return b
  }, c = function(a, b) {
    var c = null, d = function(c, d, e, f) {
      return cljs.core.vector.call(null, cljs.core.apply.call(null, a, c, d, e, f), cljs.core.apply.call(null, b, c, d, e, f))
    }, e = function(a, b, c, e) {
      var f = null;
      3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return d.call(this, a, b, c, f)
    };
    e.cljs$lang$maxFixedArity = 3;
    e.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), e = cljs.core.first(a), a = cljs.core.rest(a);
      return d(b, c, e, a)
    };
    e.cljs$core$IFn$_invoke$arity$variadic = d;
    c = function(c, d, f, i) {
      switch(arguments.length) {
        case 0:
          return cljs.core.vector.call(null, a.call(null), b.call(null));
        case 1:
          return cljs.core.vector.call(null, a.call(null, c), b.call(null, c));
        case 2:
          return cljs.core.vector.call(null, a.call(null, c, d), b.call(null, c, d));
        case 3:
          return cljs.core.vector.call(null, a.call(null, c, d, f), b.call(null, c, d, f));
        default:
          return e.cljs$core$IFn$_invoke$arity$variadic(c, d, f, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    c.cljs$lang$maxFixedArity = 3;
    c.cljs$lang$applyTo = e.cljs$lang$applyTo;
    return c
  }, d = function(a, b, c) {
    var d = null, e = function(d, e, f, j) {
      return cljs.core.vector.call(null, cljs.core.apply.call(null, a, d, e, f, j), cljs.core.apply.call(null, b, d, e, f, j), cljs.core.apply.call(null, c, d, e, f, j))
    }, f = function(a, b, c, d) {
      var f = null;
      3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return e.call(this, a, b, c, f)
    };
    f.cljs$lang$maxFixedArity = 3;
    f.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return e(b, c, d, a)
    };
    f.cljs$core$IFn$_invoke$arity$variadic = e;
    d = function(d, e, j, k) {
      switch(arguments.length) {
        case 0:
          return cljs.core.vector.call(null, a.call(null), b.call(null), c.call(null));
        case 1:
          return cljs.core.vector.call(null, a.call(null, d), b.call(null, d), c.call(null, d));
        case 2:
          return cljs.core.vector.call(null, a.call(null, d, e), b.call(null, d, e), c.call(null, d, e));
        case 3:
          return cljs.core.vector.call(null, a.call(null, d, e, j), b.call(null, d, e, j), c.call(null, d, e, j));
        default:
          return f.cljs$core$IFn$_invoke$arity$variadic(d, e, j, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = f.cljs$lang$applyTo;
    return d
  }, e = function(a, b, c, d) {
    var e = cljs.core.list_STAR_.call(null, a, b, c, d), a = null, f = function(a, b, c, d) {
      return cljs.core.reduce.call(null, function(e, f) {
        return cljs.core.conj.call(null, e, cljs.core.apply.call(null, f, a, b, c, d))
      }, cljs.core.PersistentVector.EMPTY, e)
    }, l = function(a, b, c, d) {
      var e = null;
      3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return f.call(this, a, b, c, e)
    };
    l.cljs$lang$maxFixedArity = 3;
    l.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return f(b, c, d, a)
    };
    l.cljs$core$IFn$_invoke$arity$variadic = f;
    a = function(a, b, c, d) {
      switch(arguments.length) {
        case 0:
          return cljs.core.reduce.call(null, function(a, b) {
            return cljs.core.conj.call(null, a, b.call(null))
          }, cljs.core.PersistentVector.EMPTY, e);
        case 1:
          var f = a;
          return cljs.core.reduce.call(null, function(a, b) {
            return cljs.core.conj.call(null, a, b.call(null, f))
          }, cljs.core.PersistentVector.EMPTY, e);
        case 2:
          var g = a, h = b;
          return cljs.core.reduce.call(null, function(a, b) {
            return cljs.core.conj.call(null, a, b.call(null, g, h))
          }, cljs.core.PersistentVector.EMPTY, e);
        case 3:
          var i = a, j = b, m = c;
          return cljs.core.reduce.call(null, function(a, b) {
            return cljs.core.conj.call(null, a, b.call(null, i, j, m))
          }, cljs.core.PersistentVector.EMPTY, e);
        default:
          return l.cljs$core$IFn$_invoke$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    a.cljs$lang$maxFixedArity = 3;
    a.cljs$lang$applyTo = l.cljs$lang$applyTo;
    return a
  }, f = function(a, b, c, d) {
    var f = null;
    3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return e.call(this, a, b, c, f)
  };
  f.cljs$lang$maxFixedArity = 3;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return e(b, c, d, a)
  };
  f.cljs$core$IFn$_invoke$arity$variadic = e;
  a = function(a, e, i, j) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e);
      case 3:
        return d.call(this, a, e, i);
      default:
        return f.cljs$core$IFn$_invoke$arity$variadic(a, e, i, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = f.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.dorun = function() {
  var a = null, b = function(a) {
    for(;;) {
      if(cljs.core.seq.call(null, a)) {
        a = cljs.core.next.call(null, a)
      }else {
        return null
      }
    }
  }, c = function(a, b) {
    for(;;) {
      if(cljs.core.truth_(function() {
        var c = cljs.core.seq.call(null, b);
        return c ? 0 < a : c
      }())) {
        var c = a - 1, g = cljs.core.next.call(null, b), a = c, b = g
      }else {
        return null
      }
    }
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.doall = function() {
  var a = null, b = function(a) {
    cljs.core.dorun.call(null, a);
    return a
  }, c = function(a, b) {
    cljs.core.dorun.call(null, a, b);
    return b
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.regexp_QMARK_ = function(a) {
  return a instanceof RegExp
};
cljs.core.re_matches = function(a, b) {
  var c = a.exec(b);
  return cljs.core._EQ_.call(null, cljs.core.first.call(null, c), b) ? 1 === cljs.core.count.call(null, c) ? cljs.core.first.call(null, c) : cljs.core.vec.call(null, c) : null
};
cljs.core.re_find = function(a, b) {
  var c = a.exec(b);
  return null == c ? null : 1 === cljs.core.count.call(null, c) ? cljs.core.first.call(null, c) : cljs.core.vec.call(null, c)
};
cljs.core.re_seq = function re_seq(b, c) {
  var d = cljs.core.re_find.call(null, b, c), e = c.search(b), f = cljs.core.coll_QMARK_.call(null, d) ? cljs.core.first.call(null, d) : d, g = cljs.core.subs.call(null, c, e + cljs.core.count.call(null, f));
  return cljs.core.truth_(d) ? new cljs.core.LazySeq(null, !1, function() {
    return cljs.core.cons.call(null, d, re_seq.call(null, b, g))
  }, null) : null
};
cljs.core.re_pattern = function(a) {
  var b = cljs.core.re_find.call(null, /^(?:\(\?([idmsux]*)\))?(.*)/, a);
  cljs.core.nth.call(null, b, 0, null);
  a = cljs.core.nth.call(null, b, 1, null);
  b = cljs.core.nth.call(null, b, 2, null);
  return RegExp(b, a)
};
cljs.core.pr_sequential_writer = function(a, b, c, d, e, f, g) {
  cljs.core._write.call(null, a, c);
  cljs.core.seq.call(null, g) && b.call(null, cljs.core.first.call(null, g), a, f);
  for(var c = cljs.core.seq.call(null, cljs.core.next.call(null, g)), g = null, h = 0, i = 0;;) {
    if(i < h) {
      var j = cljs.core._nth.call(null, g, i);
      cljs.core._write.call(null, a, d);
      b.call(null, j, a, f);
      i += 1
    }else {
      if(c = cljs.core.seq.call(null, c)) {
        g = c, cljs.core.chunked_seq_QMARK_.call(null, g) ? (c = cljs.core.chunk_first.call(null, g), i = cljs.core.chunk_rest.call(null, g), g = c, h = cljs.core.count.call(null, c), c = i) : (c = cljs.core.first.call(null, g), cljs.core._write.call(null, a, d), b.call(null, c, a, f), c = cljs.core.next.call(null, g), g = null, h = 0), i = 0
      }else {
        break
      }
    }
  }
  return cljs.core._write.call(null, a, e)
};
cljs.core.write_all = function() {
  var a = function(a, b) {
    for(var e = cljs.core.seq.call(null, b), f = null, g = 0, h = 0;;) {
      if(h < g) {
        var i = cljs.core._nth.call(null, f, h);
        cljs.core._write.call(null, a, i);
        h += 1
      }else {
        if(e = cljs.core.seq.call(null, e)) {
          f = e, cljs.core.chunked_seq_QMARK_.call(null, f) ? (e = cljs.core.chunk_first.call(null, f), g = cljs.core.chunk_rest.call(null, f), f = e, i = cljs.core.count.call(null, e), e = g, g = i) : (i = cljs.core.first.call(null, f), cljs.core._write.call(null, a, i), e = cljs.core.next.call(null, f), f = null, g = 0), h = 0
        }else {
          return null
        }
      }
    }
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.string_print = function(a) {
  cljs.core._STAR_print_fn_STAR_.call(null, a);
  return null
};
cljs.core.flush = function() {
  return null
};
cljs.core.char_escapes = {'"':'\\"', "\\":"\\\\", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t"};
cljs.core.quote_string = function(a) {
  return[cljs.core.str('"'), cljs.core.str(a.replace(RegExp('[\\\\"\b\f\n\r\t]', "g"), function(a) {
    return cljs.core.char_escapes[a]
  })), cljs.core.str('"')].join("")
};
cljs.core.pr_writer = function pr_writer(b, c, d) {
  if(null == b) {
    return cljs.core._write.call(null, c, "nil")
  }
  if(void 0 === b) {
    return cljs.core._write.call(null, c, "#<undefined>")
  }
  cljs.core.truth_(function() {
    var c = cljs.core.get.call(null, d, "\ufdd0:meta");
    return cljs.core.truth_(c) ? (b ? (c = (c = b.cljs$lang$protocol_mask$partition0$ & 131072) ? c : b.cljs$core$IMeta$, c = c ? !0 : b.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_.call(null, cljs.core.IMeta, b)) : c = cljs.core.type_satisfies_.call(null, cljs.core.IMeta, b), cljs.core.truth_(c) ? cljs.core.meta.call(null, b) : c) : c
  }()) && (cljs.core._write.call(null, c, "^"), pr_writer.call(null, cljs.core.meta.call(null, b), c, d), cljs.core._write.call(null, c, " "));
  if(null == b) {
    return cljs.core._write.call(null, c, "nil")
  }
  if(b.cljs$lang$type) {
    return b.cljs$lang$ctorPrWriter(b, c, d)
  }
  var e;
  b ? (e = (e = b.cljs$lang$protocol_mask$partition0$ & 2147483648) ? e : b.cljs$core$IPrintWithWriter$, e = e ? !0 : !1) : e = !1;
  if(e) {
    return cljs.core._pr_writer.call(null, b, c, d)
  }
  e = cljs.core.type.call(null, b) === Boolean;
  return(e ? e : "number" === typeof b) ? cljs.core._write.call(null, c, "" + cljs.core.str(b)) : b instanceof Array ? cljs.core.pr_sequential_writer.call(null, c, pr_writer, "#<Array [", ", ", "]>", d, b) : goog.isString(b) ? cljs.core.keyword_QMARK_.call(null, b) ? (cljs.core._write.call(null, c, ":"), e = cljs.core.namespace.call(null, b), cljs.core.truth_(e) && cljs.core.write_all.call(null, c, "" + cljs.core.str(e), "/"), cljs.core._write.call(null, c, cljs.core.name.call(null, b))) : b instanceof 
  cljs.core.Symbol ? (e = cljs.core.namespace.call(null, b), cljs.core.truth_(e) && cljs.core.write_all.call(null, c, "" + cljs.core.str(e), "/"), cljs.core._write.call(null, c, cljs.core.name.call(null, b))) : cljs.core.truth_((new cljs.core.Keyword("\ufdd0:readably")).call(null, d)) ? cljs.core._write.call(null, c, cljs.core.quote_string.call(null, b)) : cljs.core._write.call(null, c, b) : cljs.core.fn_QMARK_.call(null, b) ? cljs.core.write_all.call(null, c, "#<", "" + cljs.core.str(b), ">") : 
  b instanceof Date ? (e = function(b, c) {
    for(var d = "" + cljs.core.str(b);;) {
      if(cljs.core.count.call(null, d) < c) {
        d = [cljs.core.str("0"), cljs.core.str(d)].join("")
      }else {
        return d
      }
    }
  }, cljs.core.write_all.call(null, c, '#inst "', "" + cljs.core.str(b.getUTCFullYear()), "-", e.call(null, b.getUTCMonth() + 1, 2), "-", e.call(null, b.getUTCDate(), 2), "T", e.call(null, b.getUTCHours(), 2), ":", e.call(null, b.getUTCMinutes(), 2), ":", e.call(null, b.getUTCSeconds(), 2), ".", e.call(null, b.getUTCMilliseconds(), 3), "-", '00:00"')) : cljs.core.truth_(cljs.core.regexp_QMARK_.call(null, b)) ? cljs.core.write_all.call(null, c, '#"', b.source, '"') : cljs.core.write_all.call(null, 
  c, "#<", "" + cljs.core.str(b), ">")
};
cljs.core.pr_seq_writer = function(a, b, c) {
  cljs.core.pr_writer.call(null, cljs.core.first.call(null, a), b, c);
  for(var a = cljs.core.seq.call(null, cljs.core.next.call(null, a)), d = null, e = 0, f = 0;;) {
    if(f < e) {
      var g = cljs.core._nth.call(null, d, f);
      cljs.core._write.call(null, b, " ");
      cljs.core.pr_writer.call(null, g, b, c);
      f += 1
    }else {
      if(a = cljs.core.seq.call(null, a)) {
        d = a, cljs.core.chunked_seq_QMARK_.call(null, d) ? (a = cljs.core.chunk_first.call(null, d), e = cljs.core.chunk_rest.call(null, d), d = a, g = cljs.core.count.call(null, a), a = e, e = g) : (g = cljs.core.first.call(null, d), cljs.core._write.call(null, b, " "), cljs.core.pr_writer.call(null, g, b, c), a = cljs.core.next.call(null, d), d = null, e = 0), f = 0
      }else {
        return null
      }
    }
  }
};
cljs.core.pr_sb_with_opts = function(a, b) {
  var c = new goog.string.StringBuffer, d = new cljs.core.StringBufferWriter(c);
  cljs.core.pr_seq_writer.call(null, a, d, b);
  cljs.core._flush.call(null, d);
  return c
};
cljs.core.pr_str_with_opts = function(a, b) {
  return cljs.core.empty_QMARK_.call(null, a) ? "" : "" + cljs.core.str(cljs.core.pr_sb_with_opts.call(null, a, b))
};
cljs.core.prn_str_with_opts = function(a, b) {
  if(cljs.core.empty_QMARK_.call(null, a)) {
    return"\n"
  }
  var c = cljs.core.pr_sb_with_opts.call(null, a, b);
  c.append("\n");
  return"" + cljs.core.str(c)
};
cljs.core.pr_with_opts = function(a, b) {
  return cljs.core.string_print.call(null, cljs.core.pr_str_with_opts.call(null, a, b))
};
cljs.core.newline = function(a) {
  cljs.core.string_print.call(null, "\n");
  return cljs.core.truth_(cljs.core.get.call(null, a, "\ufdd0:flush-on-newline")) ? cljs.core.flush.call(null) : null
};
cljs.core.pr_str = function() {
  var a = function(a) {
    return cljs.core.pr_str_with_opts.call(null, a, cljs.core.pr_opts.call(null))
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.prn_str = function() {
  var a = function(a) {
    return cljs.core.prn_str_with_opts.call(null, a, cljs.core.pr_opts.call(null))
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.pr = function() {
  var a = function(a) {
    return cljs.core.pr_with_opts.call(null, a, cljs.core.pr_opts.call(null))
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.print = function() {
  var a = function(a) {
    return cljs.core.pr_with_opts.call(null, a, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0:readably", !1))
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.print_str = function() {
  var a = function(a) {
    return cljs.core.pr_str_with_opts.call(null, a, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0:readably", !1))
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.println = function() {
  var a = function(a) {
    cljs.core.pr_with_opts.call(null, a, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0:readably", !1));
    return cljs.core.newline.call(null, cljs.core.pr_opts.call(null))
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.println_str = function() {
  var a = function(a) {
    return cljs.core.prn_str_with_opts.call(null, a, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0:readably", !1))
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.prn = function() {
  var a = function(a) {
    cljs.core.pr_with_opts.call(null, a, cljs.core.pr_opts.call(null));
    return cljs.core.newline.call(null, cljs.core.pr_opts.call(null))
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.printf = function() {
  var a = function(a, b) {
    return cljs.core.print.call(null, cljs.core.apply.call(null, cljs.core.format, a, b))
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.IndexedSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.Subvec.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.Subvec.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "[", " ", "]", c, a)
};
cljs.core.ChunkedCons.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.ChunkedCons.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, function(a) {
    return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "", " ", "", c, a)
  }, "{", ", ", "}", c, a)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, function(a) {
    return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "", " ", "", c, a)
  }, "{", ", ", "}", c, a)
};
cljs.core.PersistentQueue.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "#queue [", " ", "]", c, cljs.core.seq.call(null, a))
};
cljs.core.LazySeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.LazySeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.RSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.RSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "#{", " ", "}", c, a)
};
cljs.core.NodeSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.NodeSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.RedNode.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.RedNode.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "[", " ", "]", c, a)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, function(a) {
    return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "", " ", "", c, a)
  }, "{", ", ", "}", c, a)
};
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "#{", " ", "}", c, a)
};
cljs.core.PersistentVector.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentVector.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "[", " ", "]", c, a)
};
cljs.core.List.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.List.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.EmptyList.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.EmptyList.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b) {
  return cljs.core._write.call(null, b, "()")
};
cljs.core.BlackNode.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.BlackNode.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "[", " ", "]", c, a)
};
cljs.core.Cons.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.Cons.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.Range.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.Range.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.ObjMap.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.ObjMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, function(a) {
    return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "", " ", "", c, a)
  }, "{", ", ", "}", c, a)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.PersistentVector.prototype.cljs$core$IComparable$ = !0;
cljs.core.PersistentVector.prototype.cljs$core$IComparable$_compare$arity$2 = function(a, b) {
  return cljs.core.compare_indexed.call(null, a, b)
};
cljs.core.Subvec.prototype.cljs$core$IComparable$ = !0;
cljs.core.Subvec.prototype.cljs$core$IComparable$_compare$arity$2 = function(a, b) {
  return cljs.core.compare_indexed.call(null, a, b)
};
cljs.core.Atom = function(a, b, c, d) {
  this.state = a;
  this.meta = b;
  this.validator = c;
  this.watches = d;
  this.cljs$lang$protocol_mask$partition0$ = 2153938944;
  this.cljs$lang$protocol_mask$partition1$ = 2
};
cljs.core.Atom.cljs$lang$type = !0;
cljs.core.Atom.cljs$lang$ctorStr = "cljs.core/Atom";
cljs.core.Atom.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/Atom")
};
cljs.core.Atom.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return goog.getUid(a)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = function(a, b, c) {
  for(var d = cljs.core.seq.call(null, this.watches), e = null, f = 0, g = 0;;) {
    if(g < f) {
      var h = cljs.core._nth.call(null, e, g), i = cljs.core.nth.call(null, h, 0, null), h = cljs.core.nth.call(null, h, 1, null);
      h.call(null, i, a, b, c);
      g += 1
    }else {
      if(d = cljs.core.seq.call(null, d)) {
        cljs.core.chunked_seq_QMARK_.call(null, d) ? (e = cljs.core.chunk_first.call(null, d), d = cljs.core.chunk_rest.call(null, d), i = e, f = cljs.core.count.call(null, e), e = i) : (e = cljs.core.first.call(null, d), i = cljs.core.nth.call(null, e, 0, null), h = cljs.core.nth.call(null, e, 1, null), h.call(null, i, a, b, c), d = cljs.core.next.call(null, d), e = null, f = 0), g = 0
      }else {
        return null
      }
    }
  }
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_add_watch$arity$3 = function(a, b, c) {
  return a.watches = cljs.core.assoc.call(null, this.watches, b, c)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = function(a, b) {
  return a.watches = cljs.core.dissoc.call(null, this.watches, b)
};
cljs.core.Atom.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  cljs.core._write.call(null, b, "#<Atom: ");
  cljs.core.pr_writer.call(null, this.state, b, c);
  return cljs.core._write.call(null, b, ">")
};
cljs.core.Atom.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.Atom.prototype.cljs$core$IDeref$_deref$arity$1 = function() {
  return this.state
};
cljs.core.Atom.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return a === b
};
cljs.core.atom = function() {
  var a = null, b = function(a) {
    return new cljs.core.Atom(a, null, null, null)
  }, c = function(a, b) {
    var c = cljs.core.seq_QMARK_.call(null, b) ? cljs.core.apply.call(null, cljs.core.hash_map, b) : b, d = cljs.core.get.call(null, c, "\ufdd0:validator"), c = cljs.core.get.call(null, c, "\ufdd0:meta");
    return new cljs.core.Atom(a, c, d, null)
  }, d = function(a, b) {
    var d = null;
    1 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return c.call(this, a, d)
  };
  d.cljs$lang$maxFixedArity = 1;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(arguments, 1))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.reset_BANG_ = function(a, b) {
  var c = a.validator;
  if(cljs.core.truth_(c) && !cljs.core.truth_(c.call(null, b))) {
    throw Error([cljs.core.str("Assert failed: "), cljs.core.str("Validator rejected reference state"), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list(new cljs.core.Symbol(null, "validate", "validate", 1233162959, null), new cljs.core.Symbol(null, "new-value", "new-value", 972165309, null)), cljs.core.hash_map("\ufdd0:line", 6673, "\ufdd0:column", 13))))].join(""));
  }
  c = a.state;
  a.state = b;
  cljs.core._notify_watches.call(null, a, c, b);
  return b
};
cljs.core.swap_BANG_ = function() {
  var a = null, b = function(a, b) {
    return cljs.core.reset_BANG_.call(null, a, b.call(null, a.state))
  }, c = function(a, b, c) {
    return cljs.core.reset_BANG_.call(null, a, b.call(null, a.state, c))
  }, d = function(a, b, c, d) {
    return cljs.core.reset_BANG_.call(null, a, b.call(null, a.state, c, d))
  }, e = function(a, b, c, d, e) {
    return cljs.core.reset_BANG_.call(null, a, b.call(null, a.state, c, d, e))
  }, f = function(a, b, c, d, e, f) {
    return cljs.core.reset_BANG_.call(null, a, cljs.core.apply.call(null, b, a.state, c, d, e, f))
  }, g = function(a, b, c, d, e, g) {
    var n = null;
    5 < arguments.length && (n = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0));
    return f.call(this, a, b, c, d, e, n)
  };
  g.cljs$lang$maxFixedArity = 5;
  g.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), e = cljs.core.first(a), a = cljs.core.next(a), g = cljs.core.first(a), a = cljs.core.rest(a);
    return f(b, c, d, e, g, a)
  };
  g.cljs$core$IFn$_invoke$arity$variadic = f;
  a = function(a, f, j, k, m, l) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, j);
      case 4:
        return d.call(this, a, f, j, k);
      case 5:
        return e.call(this, a, f, j, k, m);
      default:
        return g.cljs$core$IFn$_invoke$arity$variadic(a, f, j, k, m, cljs.core.array_seq(arguments, 5))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 5;
  a.cljs$lang$applyTo = g.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  a.cljs$core$IFn$_invoke$arity$5 = e;
  a.cljs$core$IFn$_invoke$arity$variadic = g.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.compare_and_set_BANG_ = function(a, b, c) {
  return cljs.core._EQ_.call(null, a.state, b) ? (cljs.core.reset_BANG_.call(null, a, c), !0) : !1
};
cljs.core.deref = function(a) {
  return cljs.core._deref.call(null, a)
};
cljs.core.set_validator_BANG_ = function(a, b) {
  return a.validator = b
};
cljs.core.get_validator = function(a) {
  return a.validator
};
cljs.core.alter_meta_BANG_ = function() {
  var a = function(a, b, e) {
    return a.meta = cljs.core.apply.call(null, b, a.meta, e)
  }, b = function(b, d, e) {
    var f = null;
    2 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.next(b), e = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, e, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.reset_meta_BANG_ = function(a, b) {
  return a.meta = b
};
cljs.core.add_watch = function(a, b, c) {
  return cljs.core._add_watch.call(null, a, b, c)
};
cljs.core.remove_watch = function(a, b) {
  return cljs.core._remove_watch.call(null, a, b)
};
cljs.core.gensym_counter = null;
cljs.core.gensym = function() {
  var a = null, b = function() {
    return a.call(null, "G__")
  }, c = function(a) {
    null == cljs.core.gensym_counter && (cljs.core.gensym_counter = cljs.core.atom.call(null, 0));
    return cljs.core.symbol.call(null, [cljs.core.str(a), cljs.core.str(cljs.core.swap_BANG_.call(null, cljs.core.gensym_counter, cljs.core.inc))].join(""))
  }, a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  return a
}();
cljs.core.fixture1 = 1;
cljs.core.fixture2 = 2;
cljs.core.Delay = function(a, b) {
  this.state = a;
  this.f = b;
  this.cljs$lang$protocol_mask$partition1$ = 1;
  this.cljs$lang$protocol_mask$partition0$ = 32768
};
cljs.core.Delay.cljs$lang$type = !0;
cljs.core.Delay.cljs$lang$ctorStr = "cljs.core/Delay";
cljs.core.Delay.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/Delay")
};
cljs.core.Delay.prototype.cljs$core$IPending$_realized_QMARK_$arity$1 = function() {
  return(new cljs.core.Keyword("\ufdd0:done")).call(null, cljs.core.deref.call(null, this.state))
};
cljs.core.Delay.prototype.cljs$core$IDeref$_deref$arity$1 = function() {
  var a = this;
  return(new cljs.core.Keyword("\ufdd0:value")).call(null, cljs.core.swap_BANG_.call(null, a.state, function(b) {
    var b = cljs.core.seq_QMARK_.call(null, b) ? cljs.core.apply.call(null, cljs.core.hash_map, b) : b, c = cljs.core.get.call(null, b, "\ufdd0:done");
    return cljs.core.truth_(c) ? b : cljs.core.PersistentArrayMap.fromArray(["\ufdd0:done", !0, "\ufdd0:value", a.f.call(null)], !0)
  }))
};
cljs.core.delay_QMARK_ = function(a) {
  return a instanceof cljs.core.Delay
};
cljs.core.force = function(a) {
  return cljs.core.delay_QMARK_.call(null, a) ? cljs.core.deref.call(null, a) : a
};
cljs.core.realized_QMARK_ = function(a) {
  return cljs.core._realized_QMARK_.call(null, a)
};
cljs.core.IEncodeJS = {};
cljs.core._clj__GT_js = function(a) {
  var b;
  b = a ? a.cljs$core$IEncodeJS$_clj__GT_js$arity$1 : a;
  if(b) {
    return a.cljs$core$IEncodeJS$_clj__GT_js$arity$1(a)
  }
  b = cljs.core._clj__GT_js[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._clj__GT_js._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IEncodeJS.-clj->js", a);
  }
  return b.call(null, a)
};
cljs.core._key__GT_js = function(a) {
  var b;
  b = a ? a.cljs$core$IEncodeJS$_key__GT_js$arity$1 : a;
  if(b) {
    return a.cljs$core$IEncodeJS$_key__GT_js$arity$1(a)
  }
  b = cljs.core._key__GT_js[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._key__GT_js._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IEncodeJS.-key->js", a);
  }
  return b.call(null, a)
};
cljs.core.key__GT_js = function(a) {
  return(a ? cljs.core.truth_(cljs.core.truth_(null) ? null : a.cljs$core$IEncodeJS$) || (a.cljs$lang$protocol_mask$partition$ ? 0 : cljs.core.type_satisfies_.call(null, cljs.core.IEncodeJS, a)) : cljs.core.type_satisfies_.call(null, cljs.core.IEncodeJS, a)) ? cljs.core._clj__GT_js.call(null, a) : function() {
    var b = cljs.core.string_QMARK_.call(null, a);
    return b || (b = "number" === typeof a) ? b : (b = cljs.core.keyword_QMARK_.call(null, a)) ? b : a instanceof cljs.core.Symbol
  }() ? cljs.core.clj__GT_js.call(null, a) : cljs.core.pr_str.call(null, a)
};
cljs.core.clj__GT_js = function clj__GT_js(b) {
  if(null == b) {
    return null
  }
  if(b ? cljs.core.truth_(cljs.core.truth_(null) ? null : b.cljs$core$IEncodeJS$) || (b.cljs$lang$protocol_mask$partition$ ? 0 : cljs.core.type_satisfies_.call(null, cljs.core.IEncodeJS, b)) : cljs.core.type_satisfies_.call(null, cljs.core.IEncodeJS, b)) {
    return cljs.core._clj__GT_js.call(null, b)
  }
  if(cljs.core.keyword_QMARK_.call(null, b)) {
    return cljs.core.name.call(null, b)
  }
  if(b instanceof cljs.core.Symbol) {
    return"" + cljs.core.str(b)
  }
  if(cljs.core.map_QMARK_.call(null, b)) {
    for(var c = {}, b = cljs.core.seq.call(null, b), d = null, e = 0, f = 0;;) {
      if(f < e) {
        var g = cljs.core._nth.call(null, d, f), h = cljs.core.nth.call(null, g, 0, null), g = cljs.core.nth.call(null, g, 1, null);
        c[cljs.core.key__GT_js.call(null, h)] = clj__GT_js.call(null, g);
        f += 1
      }else {
        if(b = cljs.core.seq.call(null, b)) {
          cljs.core.chunked_seq_QMARK_.call(null, b) ? (e = cljs.core.chunk_first.call(null, b), b = cljs.core.chunk_rest.call(null, b), d = e, e = cljs.core.count.call(null, e)) : (e = cljs.core.first.call(null, b), d = cljs.core.nth.call(null, e, 0, null), e = cljs.core.nth.call(null, e, 1, null), c[cljs.core.key__GT_js.call(null, d)] = clj__GT_js.call(null, e), b = cljs.core.next.call(null, b), d = null, e = 0), f = 0
        }else {
          break
        }
      }
    }
    return c
  }
  return cljs.core.coll_QMARK_.call(null, b) ? cljs.core.apply.call(null, cljs.core.array, cljs.core.map.call(null, clj__GT_js, b)) : b
};
cljs.core.IEncodeClojure = {};
cljs.core._js__GT_clj = function(a, b) {
  var c;
  c = a ? a.cljs$core$IEncodeClojure$_js__GT_clj$arity$2 : a;
  if(c) {
    return a.cljs$core$IEncodeClojure$_js__GT_clj$arity$2(a, b)
  }
  c = cljs.core._js__GT_clj[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._js__GT_clj._, !c)) {
    throw cljs.core.missing_protocol.call(null, "IEncodeClojure.-js->clj", a);
  }
  return c.call(null, a, b)
};
cljs.core.js__GT_clj = function() {
  var a = null, b = function(b) {
    return a.call(null, b, cljs.core.PersistentArrayMap.fromArray(["\ufdd0:keywordize-keys", !1], !0))
  }, c = function(a, b) {
    var c = cljs.core.IEncodeClojure;
    if(c ? cljs.core.truth_(cljs.core.truth_(null) ? null : c.cljs$core$x$) || (c.cljs$lang$protocol_mask$partition$ ? 0 : cljs.core.type_satisfies_.call(null, a, c)) : cljs.core.type_satisfies_.call(null, a, c)) {
      return cljs.core._js__GT_clj.call(null, a, cljs.core.apply.call(null, cljs.core.array_map, b))
    }
    if(cljs.core.seq.call(null, b)) {
      var d = cljs.core.seq_QMARK_.call(null, b) ? cljs.core.apply.call(null, cljs.core.hash_map, b) : b, i = cljs.core.get.call(null, d, "\ufdd0:keywordize-keys"), j = cljs.core.truth_(i) ? cljs.core.keyword : cljs.core.str;
      return function m(a) {
        return cljs.core.seq_QMARK_.call(null, a) ? cljs.core.doall.call(null, cljs.core.map.call(null, m, a)) : cljs.core.coll_QMARK_.call(null, a) ? cljs.core.into.call(null, cljs.core.empty.call(null, a), cljs.core.map.call(null, m, a)) : a instanceof Array ? cljs.core.vec.call(null, cljs.core.map.call(null, m, a)) : cljs.core.type.call(null, a) === Object ? cljs.core.into.call(null, cljs.core.ObjMap.EMPTY, function(b, c, d, e) {
          return function t(b) {
            return new cljs.core.LazySeq(null, !1, function() {
              for(;;) {
                var c = cljs.core.seq.call(null, b);
                if(c) {
                  if(cljs.core.chunked_seq_QMARK_.call(null, c)) {
                    var d = cljs.core.chunk_first.call(null, c), f = cljs.core.count.call(null, d), g = cljs.core.chunk_buffer.call(null, f);
                    a: {
                      for(var h = 0;;) {
                        if(h < f) {
                          var i = cljs.core._nth.call(null, d, h);
                          cljs.core.chunk_append.call(null, g, cljs.core.PersistentVector.fromArray([e.call(null, i), m.call(null, a[i])], !0));
                          h += 1
                        }else {
                          d = !0;
                          break a
                        }
                      }
                      d = void 0
                    }
                    return d ? cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, g), t.call(null, cljs.core.chunk_rest.call(null, c))) : cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, g), null)
                  }
                  g = cljs.core.first.call(null, c);
                  return cljs.core.cons.call(null, cljs.core.PersistentVector.fromArray([e.call(null, g), m.call(null, a[g])], !0), t.call(null, cljs.core.rest.call(null, c)))
                }
                return null
              }
            }, null)
          }
        }(b, d, i, j).call(null, cljs.core.js_keys.call(null, a))) : a
      }.call(null, a)
    }
    return null
  }, d = function(a, b) {
    var d = null;
    1 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return c.call(this, a, d)
  };
  d.cljs$lang$maxFixedArity = 1;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(arguments, 1))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.memoize = function(a) {
  var b = cljs.core.atom.call(null, cljs.core.ObjMap.EMPTY), c = function(c) {
    var d = cljs.core.get.call(null, cljs.core.deref.call(null, b), c);
    if(cljs.core.truth_(d)) {
      return d
    }
    d = cljs.core.apply.call(null, a, c);
    cljs.core.swap_BANG_.call(null, b, cljs.core.assoc, c, d);
    return d
  }, d = function(a) {
    var b = null;
    0 < arguments.length && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return c.call(this, b)
  };
  d.cljs$lang$maxFixedArity = 0;
  d.cljs$lang$applyTo = function(a) {
    a = cljs.core.seq(a);
    return c(a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  return d
};
cljs.core.trampoline = function() {
  var a = null, b = function(a) {
    for(;;) {
      if(a = a.call(null), !cljs.core.fn_QMARK_.call(null, a)) {
        return a
      }
    }
  }, c = function(b, c) {
    return a.call(null, function() {
      return cljs.core.apply.call(null, b, c)
    })
  }, d = function(a, b) {
    var d = null;
    1 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return c.call(this, a, d)
  };
  d.cljs$lang$maxFixedArity = 1;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(arguments, 1))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.rand = function() {
  var a = null, b = function() {
    return a.call(null, 1)
  }, c = function(a) {
    return Math.random.call(null) * a
  }, a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  return a
}();
cljs.core.rand_int = function(a) {
  return Math.floor.call(null, Math.random.call(null) * a)
};
cljs.core.rand_nth = function(a) {
  return cljs.core.nth.call(null, a, cljs.core.rand_int.call(null, cljs.core.count.call(null, a)))
};
cljs.core.group_by = function(a, b) {
  return cljs.core.reduce.call(null, function(b, d) {
    var e = a.call(null, d);
    return cljs.core.assoc.call(null, b, e, cljs.core.conj.call(null, cljs.core.get.call(null, b, e, cljs.core.PersistentVector.EMPTY), d))
  }, cljs.core.ObjMap.EMPTY, b)
};
cljs.core.make_hierarchy = function() {
  return cljs.core.PersistentArrayMap.fromArray(["\ufdd0:parents", cljs.core.ObjMap.EMPTY, "\ufdd0:descendants", cljs.core.ObjMap.EMPTY, "\ufdd0:ancestors", cljs.core.ObjMap.EMPTY], !0)
};
cljs.core._global_hierarchy = null;
cljs.core.get_global_hierarchy = function() {
  null == cljs.core._global_hierarchy && (cljs.core._global_hierarchy = cljs.core.atom.call(null, cljs.core.make_hierarchy.call(null)));
  return cljs.core._global_hierarchy
};
cljs.core.swap_global_hierarchy_BANG_ = function() {
  var a = function(a, b) {
    return cljs.core.apply.call(null, cljs.core.swap_BANG_, cljs.core.get_global_hierarchy.call(null), a, b)
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.isa_QMARK_ = function() {
  var a = null, b = function(b, c) {
    return a.call(null, cljs.core.deref.call(null, cljs.core.get_global_hierarchy.call(null)), b, c)
  }, c = function(b, c, f) {
    var g = cljs.core._EQ_.call(null, c, f);
    if(!g && !(g = cljs.core.contains_QMARK_.call(null, (new cljs.core.Keyword("\ufdd0:ancestors")).call(null, b).call(null, c), f)) && (g = cljs.core.vector_QMARK_.call(null, f))) {
      if(g = cljs.core.vector_QMARK_.call(null, c)) {
        if(g = cljs.core.count.call(null, f) === cljs.core.count.call(null, c)) {
          for(var g = !0, h = 0;;) {
            var i;
            i = (i = cljs.core.not.call(null, g)) ? i : h === cljs.core.count.call(null, f);
            if(i) {
              return g
            }
            g = a.call(null, b, c.call(null, h), f.call(null, h));
            h += 1
          }
        }else {
          return g
        }
      }else {
        return g
      }
    }else {
      return g
    }
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.parents = function() {
  var a = null, b = function(b) {
    return a.call(null, cljs.core.deref.call(null, cljs.core.get_global_hierarchy.call(null)), b)
  }, c = function(a, b) {
    return cljs.core.not_empty.call(null, cljs.core.get.call(null, (new cljs.core.Keyword("\ufdd0:parents")).call(null, a), b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.ancestors = function() {
  var a = null, b = function(b) {
    return a.call(null, cljs.core.deref.call(null, cljs.core.get_global_hierarchy.call(null)), b)
  }, c = function(a, b) {
    return cljs.core.not_empty.call(null, cljs.core.get.call(null, (new cljs.core.Keyword("\ufdd0:ancestors")).call(null, a), b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.descendants = function() {
  var a = null, b = function(b) {
    return a.call(null, cljs.core.deref.call(null, cljs.core.get_global_hierarchy.call(null)), b)
  }, c = function(a, b) {
    return cljs.core.not_empty.call(null, cljs.core.get.call(null, (new cljs.core.Keyword("\ufdd0:descendants")).call(null, a), b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.derive = function() {
  var a = null, b = function(b, c) {
    if(!cljs.core.truth_(cljs.core.namespace.call(null, c))) {
      throw Error([cljs.core.str("Assert failed: "), cljs.core.str(cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list(new cljs.core.Symbol(null, "namespace", "namespace", -388313324, null), new cljs.core.Symbol(null, "parent", "parent", 1659011683, null)), cljs.core.hash_map("\ufdd0:line", 7014, "\ufdd0:column", 12))))].join(""));
    }
    cljs.core.swap_global_hierarchy_BANG_.call(null, a, b, c);
    return null
  }, c = function(a, b, c) {
    if(!cljs.core.not_EQ_.call(null, b, c)) {
      throw Error([cljs.core.str("Assert failed: "), cljs.core.str(cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list(new cljs.core.Symbol(null, "not=", "not=", -1637144189, null), new cljs.core.Symbol(null, "tag", "tag", -1640416941, null), new cljs.core.Symbol(null, "parent", "parent", 1659011683, null)), cljs.core.hash_map("\ufdd0:line", 7018, "\ufdd0:column", 12))))].join(""));
    }
    var g = (new cljs.core.Keyword("\ufdd0:parents")).call(null, a), h = (new cljs.core.Keyword("\ufdd0:descendants")).call(null, a), i = (new cljs.core.Keyword("\ufdd0:ancestors")).call(null, a), j;
    j = function(a, b, c, d, e) {
      return cljs.core.reduce.call(null, function(a, b) {
        return cljs.core.assoc.call(null, a, b, cljs.core.reduce.call(null, cljs.core.conj, cljs.core.get.call(null, e, b, cljs.core.PersistentHashSet.EMPTY), cljs.core.cons.call(null, d, e.call(null, d))))
      }, a, cljs.core.cons.call(null, b, c.call(null, b)))
    };
    if(cljs.core.contains_QMARK_.call(null, g.call(null, b), c)) {
      b = null
    }else {
      if(cljs.core.contains_QMARK_.call(null, i.call(null, b), c)) {
        throw Error([cljs.core.str(b), cljs.core.str("already has"), cljs.core.str(c), cljs.core.str("as ancestor")].join(""));
      }
      if(cljs.core.contains_QMARK_.call(null, i.call(null, c), b)) {
        throw Error([cljs.core.str("Cyclic derivation:"), cljs.core.str(c), cljs.core.str("has"), cljs.core.str(b), cljs.core.str("as ancestor")].join(""));
      }
      b = cljs.core.PersistentArrayMap.fromArray(["\ufdd0:parents", cljs.core.assoc.call(null, (new cljs.core.Keyword("\ufdd0:parents")).call(null, a), b, cljs.core.conj.call(null, cljs.core.get.call(null, g, b, cljs.core.PersistentHashSet.EMPTY), c)), "\ufdd0:ancestors", j.call(null, (new cljs.core.Keyword("\ufdd0:ancestors")).call(null, a), b, h, c, i), "\ufdd0:descendants", j.call(null, (new cljs.core.Keyword("\ufdd0:descendants")).call(null, a), c, i, b, h)], !0)
    }
    return cljs.core.truth_(b) ? b : a
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.underive = function() {
  var a = null, b = function(b, c) {
    cljs.core.swap_global_hierarchy_BANG_.call(null, a, b, c);
    return null
  }, c = function(a, b, c) {
    var g = (new cljs.core.Keyword("\ufdd0:parents")).call(null, a), h = cljs.core.truth_(g.call(null, b)) ? cljs.core.disj.call(null, g.call(null, b), c) : cljs.core.PersistentHashSet.EMPTY, h = cljs.core.truth_(cljs.core.not_empty.call(null, h)) ? cljs.core.assoc.call(null, g, b, h) : cljs.core.dissoc.call(null, g, b), h = cljs.core.flatten.call(null, cljs.core.map.call(null, function(a) {
      return cljs.core.cons.call(null, cljs.core.first.call(null, a), cljs.core.interpose.call(null, cljs.core.first.call(null, a), cljs.core.second.call(null, a)))
    }, cljs.core.seq.call(null, h)));
    return cljs.core.contains_QMARK_.call(null, g.call(null, b), c) ? cljs.core.reduce.call(null, function(a, b) {
      return cljs.core.apply.call(null, cljs.core.derive, a, b)
    }, cljs.core.make_hierarchy.call(null), cljs.core.partition.call(null, 2, h)) : a
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.reset_cache = function(a, b, c, d) {
  cljs.core.swap_BANG_.call(null, a, function() {
    return cljs.core.deref.call(null, b)
  });
  return cljs.core.swap_BANG_.call(null, c, function() {
    return cljs.core.deref.call(null, d)
  })
};
cljs.core.prefers_STAR_ = function prefers_STAR_(b, c, d) {
  var e = cljs.core.deref.call(null, d).call(null, b), e = cljs.core.truth_(cljs.core.truth_(e) ? e.call(null, c) : e) ? !0 : null;
  if(cljs.core.truth_(e)) {
    return e
  }
  a: {
    for(e = cljs.core.parents.call(null, c);;) {
      if(0 < cljs.core.count.call(null, e)) {
        cljs.core.truth_(prefers_STAR_.call(null, b, cljs.core.first.call(null, e), d)), e = cljs.core.rest.call(null, e)
      }else {
        e = null;
        break a
      }
    }
    e = void 0
  }
  if(cljs.core.truth_(e)) {
    return e
  }
  a: {
    for(b = cljs.core.parents.call(null, b);;) {
      if(0 < cljs.core.count.call(null, b)) {
        cljs.core.truth_(prefers_STAR_.call(null, cljs.core.first.call(null, b), c, d)), b = cljs.core.rest.call(null, b)
      }else {
        c = null;
        break a
      }
    }
    c = void 0
  }
  return cljs.core.truth_(c) ? c : !1
};
cljs.core.dominates = function(a, b, c) {
  c = cljs.core.prefers_STAR_.call(null, a, b, c);
  return cljs.core.truth_(c) ? c : cljs.core.isa_QMARK_.call(null, a, b)
};
cljs.core.find_and_cache_best_method = function find_and_cache_best_method(b, c, d, e, f, g, h) {
  var i = cljs.core.reduce.call(null, function(e, g) {
    var h = cljs.core.nth.call(null, g, 0, null);
    cljs.core.nth.call(null, g, 1, null);
    if(cljs.core.isa_QMARK_.call(null, cljs.core.deref.call(null, d), c, h)) {
      var i = cljs.core.truth_(function() {
        var b = null == e;
        return b ? b : cljs.core.dominates.call(null, h, cljs.core.first.call(null, e), f)
      }()) ? g : e;
      if(!cljs.core.truth_(cljs.core.dominates.call(null, cljs.core.first.call(null, i), h, f))) {
        throw Error([cljs.core.str("Multiple methods in multimethod '"), cljs.core.str(b), cljs.core.str("' match dispatch value: "), cljs.core.str(c), cljs.core.str(" -> "), cljs.core.str(h), cljs.core.str(" and "), cljs.core.str(cljs.core.first.call(null, i)), cljs.core.str(", and neither is preferred")].join(""));
      }
      return i
    }
    return e
  }, null, cljs.core.deref.call(null, e));
  if(cljs.core.truth_(i)) {
    if(cljs.core._EQ_.call(null, cljs.core.deref.call(null, h), cljs.core.deref.call(null, d))) {
      return cljs.core.swap_BANG_.call(null, g, cljs.core.assoc, c, cljs.core.second.call(null, i)), cljs.core.second.call(null, i)
    }
    cljs.core.reset_cache.call(null, g, e, h, d);
    return find_and_cache_best_method.call(null, b, c, d, e, f, g, h)
  }
  return null
};
cljs.core.IMultiFn = {};
cljs.core._reset = function(a) {
  var b;
  b = a ? a.cljs$core$IMultiFn$_reset$arity$1 : a;
  if(b) {
    return a.cljs$core$IMultiFn$_reset$arity$1(a)
  }
  b = cljs.core._reset[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._reset._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IMultiFn.-reset", a);
  }
  return b.call(null, a)
};
cljs.core._add_method = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IMultiFn$_add_method$arity$3 : a;
  if(d) {
    return a.cljs$core$IMultiFn$_add_method$arity$3(a, b, c)
  }
  d = cljs.core._add_method[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._add_method._, !d)) {
    throw cljs.core.missing_protocol.call(null, "IMultiFn.-add-method", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._remove_method = function(a, b) {
  var c;
  c = a ? a.cljs$core$IMultiFn$_remove_method$arity$2 : a;
  if(c) {
    return a.cljs$core$IMultiFn$_remove_method$arity$2(a, b)
  }
  c = cljs.core._remove_method[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._remove_method._, !c)) {
    throw cljs.core.missing_protocol.call(null, "IMultiFn.-remove-method", a);
  }
  return c.call(null, a, b)
};
cljs.core._prefer_method = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IMultiFn$_prefer_method$arity$3 : a;
  if(d) {
    return a.cljs$core$IMultiFn$_prefer_method$arity$3(a, b, c)
  }
  d = cljs.core._prefer_method[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._prefer_method._, !d)) {
    throw cljs.core.missing_protocol.call(null, "IMultiFn.-prefer-method", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._get_method = function(a, b) {
  var c;
  c = a ? a.cljs$core$IMultiFn$_get_method$arity$2 : a;
  if(c) {
    return a.cljs$core$IMultiFn$_get_method$arity$2(a, b)
  }
  c = cljs.core._get_method[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._get_method._, !c)) {
    throw cljs.core.missing_protocol.call(null, "IMultiFn.-get-method", a);
  }
  return c.call(null, a, b)
};
cljs.core._methods = function(a) {
  var b;
  b = a ? a.cljs$core$IMultiFn$_methods$arity$1 : a;
  if(b) {
    return a.cljs$core$IMultiFn$_methods$arity$1(a)
  }
  b = cljs.core._methods[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._methods._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IMultiFn.-methods", a);
  }
  return b.call(null, a)
};
cljs.core._prefers = function(a) {
  var b;
  b = a ? a.cljs$core$IMultiFn$_prefers$arity$1 : a;
  if(b) {
    return a.cljs$core$IMultiFn$_prefers$arity$1(a)
  }
  b = cljs.core._prefers[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._prefers._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IMultiFn.-prefers", a);
  }
  return b.call(null, a)
};
cljs.core._dispatch = function(a, b) {
  var c;
  c = a ? a.cljs$core$IMultiFn$_dispatch$arity$2 : a;
  if(c) {
    return a.cljs$core$IMultiFn$_dispatch$arity$2(a, b)
  }
  c = cljs.core._dispatch[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._dispatch._, !c)) {
    throw cljs.core.missing_protocol.call(null, "IMultiFn.-dispatch", a);
  }
  return c.call(null, a, b)
};
cljs.core.do_dispatch = function(a, b, c) {
  b = cljs.core.apply.call(null, b, c);
  a = cljs.core._get_method.call(null, a, b);
  if(!cljs.core.truth_(a)) {
    throw Error([cljs.core.str("No method in multimethod '"), cljs.core.str(cljs.core.name), cljs.core.str("' for dispatch value: "), cljs.core.str(b)].join(""));
  }
  return cljs.core.apply.call(null, a, c)
};
cljs.core.MultiFn = function(a, b, c, d, e, f, g, h) {
  this.name = a;
  this.dispatch_fn = b;
  this.default_dispatch_val = c;
  this.hierarchy = d;
  this.method_table = e;
  this.prefer_table = f;
  this.method_cache = g;
  this.cached_hierarchy = h;
  this.cljs$lang$protocol_mask$partition0$ = 4194304;
  this.cljs$lang$protocol_mask$partition1$ = 256
};
cljs.core.MultiFn.cljs$lang$type = !0;
cljs.core.MultiFn.cljs$lang$ctorStr = "cljs.core/MultiFn";
cljs.core.MultiFn.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/MultiFn")
};
cljs.core.MultiFn.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return goog.getUid(a)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_reset$arity$1 = function(a) {
  cljs.core.swap_BANG_.call(null, this.method_table, function() {
    return cljs.core.ObjMap.EMPTY
  });
  cljs.core.swap_BANG_.call(null, this.method_cache, function() {
    return cljs.core.ObjMap.EMPTY
  });
  cljs.core.swap_BANG_.call(null, this.prefer_table, function() {
    return cljs.core.ObjMap.EMPTY
  });
  cljs.core.swap_BANG_.call(null, this.cached_hierarchy, function() {
    return null
  });
  return a
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_add_method$arity$3 = function(a, b, c) {
  cljs.core.swap_BANG_.call(null, this.method_table, cljs.core.assoc, b, c);
  cljs.core.reset_cache.call(null, this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy);
  return a
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_remove_method$arity$2 = function(a, b) {
  cljs.core.swap_BANG_.call(null, this.method_table, cljs.core.dissoc, b);
  cljs.core.reset_cache.call(null, this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy);
  return a
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_get_method$arity$2 = function(a, b) {
  cljs.core._EQ_.call(null, cljs.core.deref.call(null, this.cached_hierarchy), cljs.core.deref.call(null, this.hierarchy)) || cljs.core.reset_cache.call(null, this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy);
  var c = cljs.core.deref.call(null, this.method_cache).call(null, b);
  if(cljs.core.truth_(c)) {
    return c
  }
  c = cljs.core.find_and_cache_best_method.call(null, this.name, b, this.hierarchy, this.method_table, this.prefer_table, this.method_cache, this.cached_hierarchy);
  return cljs.core.truth_(c) ? c : cljs.core.deref.call(null, this.method_table).call(null, this.default_dispatch_val)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefer_method$arity$3 = function(a, b, c) {
  if(cljs.core.truth_(cljs.core.prefers_STAR_.call(null, b, c, this.prefer_table))) {
    throw Error([cljs.core.str("Preference conflict in multimethod '"), cljs.core.str(this.name), cljs.core.str("': "), cljs.core.str(c), cljs.core.str(" is already preferred to "), cljs.core.str(b)].join(""));
  }
  cljs.core.swap_BANG_.call(null, this.prefer_table, function(a) {
    return cljs.core.assoc.call(null, a, b, cljs.core.conj.call(null, cljs.core.get.call(null, a, b, cljs.core.PersistentHashSet.EMPTY), c))
  });
  return cljs.core.reset_cache.call(null, this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_methods$arity$1 = function() {
  return cljs.core.deref.call(null, this.method_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefers$arity$1 = function() {
  return cljs.core.deref.call(null, this.prefer_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_dispatch$arity$2 = function(a, b) {
  return cljs.core.do_dispatch.call(null, a, this.dispatch_fn, b)
};
cljs.core.MultiFn.prototype.call = function() {
  var a = function(a, b) {
    return cljs.core._dispatch.call(null, this, b)
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.MultiFn.prototype.apply = function(a, b) {
  return cljs.core._dispatch.call(null, this, b)
};
cljs.core.remove_all_methods = function(a) {
  return cljs.core._reset.call(null, a)
};
cljs.core.remove_method = function(a, b) {
  return cljs.core._remove_method.call(null, a, b)
};
cljs.core.prefer_method = function(a, b, c) {
  return cljs.core._prefer_method.call(null, a, b, c)
};
cljs.core.methods$ = function(a) {
  return cljs.core._methods.call(null, a)
};
cljs.core.get_method = function(a, b) {
  return cljs.core._get_method.call(null, a, b)
};
cljs.core.prefers = function(a) {
  return cljs.core._prefers.call(null, a)
};
cljs.core.UUID = function(a) {
  this.uuid = a;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2153775104
};
cljs.core.UUID.cljs$lang$type = !0;
cljs.core.UUID.cljs$lang$ctorStr = "cljs.core/UUID";
cljs.core.UUID.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/UUID")
};
cljs.core.UUID.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return goog.string.hashCode(cljs.core.pr_str.call(null, a))
};
cljs.core.UUID.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b) {
  return cljs.core._write.call(null, b, [cljs.core.str('#uuid "'), cljs.core.str(this.uuid), cljs.core.str('"')].join(""))
};
cljs.core.UUID.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  var c = b instanceof cljs.core.UUID;
  return c ? this.uuid === b.uuid : c
};
cljs.core.ExceptionInfo = function(a, b, c) {
  this.message = a;
  this.data = b;
  this.cause = c
};
cljs.core.ExceptionInfo.cljs$lang$type = !0;
cljs.core.ExceptionInfo.cljs$lang$ctorStr = "cljs.core/ExceptionInfo";
cljs.core.ExceptionInfo.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core/ExceptionInfo")
};
cljs.core.ExceptionInfo.prototype = Error();
cljs.core.ExceptionInfo.prototype.constructor = cljs.core.ExceptionInfo;
cljs.core.ex_info = function() {
  var a = null, b = function(a, b) {
    return new cljs.core.ExceptionInfo(a, b, null)
  }, c = function(a, b, c) {
    return new cljs.core.ExceptionInfo(a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.ex_data = function(a) {
  return a instanceof cljs.core.ExceptionInfo ? a.data : null
};
cljs.core.ex_message = function(a) {
  return a instanceof Error ? a.message : null
};
cljs.core.ex_cause = function(a) {
  return a instanceof cljs.core.ExceptionInfo ? a.cause : null
};
cljs.core.comparator = function(a) {
  return function(b, c) {
    return cljs.core.truth_(a.call(null, b, c)) ? -1 : cljs.core.truth_(a.call(null, c, b)) ? 1 : 0
  }
};
cljs.core.special_symbol_QMARK_ = function(a) {
  return cljs.core.contains_QMARK_.call(null, cljs.core.set([new cljs.core.Symbol(null, "deftype*", "deftype*", -978581244, null), new cljs.core.Symbol(null, "new", "new", -1640422567, null), new cljs.core.Symbol(null, "try*", "try*", -1636962424, null), new cljs.core.Symbol(null, "quote", "quote", -1532577739, null), new cljs.core.Symbol(null, "&", "&", -1640531489, null), new cljs.core.Symbol(null, "set!", "set!", -1637004872, null), new cljs.core.Symbol(null, "recur", "recur", -1532142362, null), 
  new cljs.core.Symbol(null, ".", ".", -1640531481, null), new cljs.core.Symbol(null, "ns", "ns", -1640528002, null), new cljs.core.Symbol(null, "do", "do", -1640528316, null), new cljs.core.Symbol(null, "fn*", "fn*", -1640430053, null), new cljs.core.Symbol(null, "throw", "throw", -1530191713, null), new cljs.core.Symbol(null, "letfn*", "letfn*", 1548249632, null), new cljs.core.Symbol(null, "js*", "js*", -1640426054, null), new cljs.core.Symbol(null, "defrecord*", "defrecord*", 774272013, null), 
  new cljs.core.Symbol(null, "let*", "let*", -1637213400, null), new cljs.core.Symbol(null, "loop*", "loop*", -1537374273, null), new cljs.core.Symbol(null, "if", "if", -1640528170, null), new cljs.core.Symbol(null, "def", "def", -1640432194, null)]), a)
};
var quil = {util:{}};
quil.util.int_like_QMARK_ = function() {
  return!0
};
quil.util.resolve_constant_key = function(a, b) {
  if(cljs.core.truth_(cljs.core.get.call(null, b, a))) {
    return cljs.core.get.call(null, b, a)
  }
  if(cljs.core.truth_(cljs.core.some.call(null, cljs.core.PersistentHashSet.fromArray([a, null], !0), cljs.core.vals.call(null, b)))) {
    return a
  }
  throw Error([cljs.core.str("Expecting a keyword, got: "), cljs.core.str(a), cljs.core.str(". Expected one of: "), cljs.core.str(cljs.core.vec.call(null, cljs.core.sort.call(null, cljs.core.keys.call(null, b))))].join(""));
};
quil.util.length_of_longest_key = function(a) {
  a = cljs.core.last.call(null, cljs.core.sort.call(null, cljs.core.map.call(null, function(a) {
    return a.length()
  }, cljs.core.keys.call(null, a))));
  return cljs.core.truth_(a) ? a : 0
};
quil.util.gen_padding = function() {
  var a = null, b = function(b) {
    return a.call(null, "", b, " ")
  }, c = function(b, c) {
    return a.call(null, "", b, c)
  }, d = function(b, c, d) {
    return 0 < c ? a.call(null, [cljs.core.str(b), cljs.core.str(d)].join(""), c - 1, d) : b
  }, a = function(a, f, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, f);
      case 3:
        return d.call(this, a, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  return a
}();
quil.util.print_definition_list = function(a) {
  var b = quil.util.length_of_longest_key.call(null, a);
  return cljs.core.dorun.call(null, cljs.core.map.call(null, function(a) {
    var d = cljs.core.nth.call(null, a, 0, null), a = cljs.core.nth.call(null, a, 1, null), e = d.length(), e = quil.util.gen_padding.call(null, b - e);
    return cljs.core.println.call(null, d, e, "- ", a)
  }, a))
};
quil.version = {};
quil.version.QUIL_VERSION = cljs.core.PersistentArrayMap.fromArray(["\ufdd0:major", 1, "\ufdd0:minor", 0, "\ufdd0:patch", 0, "\ufdd0:snapshot", !0], !0);
quil.version.QUIL_VERSION_STR = function() {
  var a = quil.version.QUIL_VERSION;
  return[cljs.core.str("v"), cljs.core.str((new cljs.core.Keyword("\ufdd0:major")).call(null, a)), cljs.core.str("."), cljs.core.str((new cljs.core.Keyword("\ufdd0:minor")).call(null, a)), cljs.core.str(!cljs.core._EQ_.call(null, 0, (new cljs.core.Keyword("\ufdd0:patch")).call(null, a)) ? (new cljs.core.Keyword("\ufdd0:patch")).call(null, a) : ""), cljs.core.str(cljs.core.truth_((new cljs.core.Keyword("\ufdd0:snapshot")).call(null, a)) ? "-dev" : "")].join("")
}();
var clojure = {set:{}};
clojure.set.bubble_max_key = function(a, b) {
  var c = cljs.core.apply.call(null, cljs.core.max_key, a, b);
  return cljs.core.cons.call(null, c, cljs.core.remove.call(null, function(a) {
    return c === a
  }, b))
};
clojure.set.union = function() {
  var a = null, b = function() {
    return cljs.core.PersistentHashSet.EMPTY
  }, c = function(a, b) {
    return cljs.core.count.call(null, a) < cljs.core.count.call(null, b) ? cljs.core.reduce.call(null, cljs.core.conj, b, a) : cljs.core.reduce.call(null, cljs.core.conj, a, b)
  }, d = function(a, b, c) {
    a = clojure.set.bubble_max_key.call(null, cljs.core.count, cljs.core.conj.call(null, c, b, a));
    return cljs.core.reduce.call(null, cljs.core.into, cljs.core.first.call(null, a), cljs.core.rest.call(null, a))
  }, e = function(a, b, c) {
    var e = null;
    2 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return d.call(this, a, b, e)
  };
  e.cljs$lang$maxFixedArity = 2;
  e.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.rest(a);
    return d(b, c, a)
  };
  e.cljs$core$IFn$_invoke$arity$variadic = d;
  a = function(a, d, h) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return a;
      case 2:
        return c.call(this, a, d);
      default:
        return e.cljs$core$IFn$_invoke$arity$variadic(a, d, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$variadic = e.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
clojure.set.intersection = function() {
  var a = null, b = function(a, b) {
    for(;;) {
      if(cljs.core.count.call(null, b) < cljs.core.count.call(null, a)) {
        var c = a, a = b, b = c
      }else {
        return cljs.core.reduce.call(null, function(a, b) {
          return function(a, c) {
            return cljs.core.contains_QMARK_.call(null, b, c) ? a : cljs.core.disj.call(null, a, c)
          }
        }(a, b), a, a)
      }
    }
  }, c = function(b, c, d) {
    b = clojure.set.bubble_max_key.call(null, function(a) {
      return-cljs.core.count.call(null, a)
    }, cljs.core.conj.call(null, d, c, b));
    return cljs.core.reduce.call(null, a, cljs.core.first.call(null, b), cljs.core.rest.call(null, b))
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
clojure.set.difference = function() {
  var a = null, b = function(a, b) {
    return cljs.core.count.call(null, a) < cljs.core.count.call(null, b) ? cljs.core.reduce.call(null, function(a, c) {
      return cljs.core.contains_QMARK_.call(null, b, c) ? cljs.core.disj.call(null, a, c) : a
    }, a, a) : cljs.core.reduce.call(null, cljs.core.disj, a, b)
  }, c = function(b, c, d) {
    return cljs.core.reduce.call(null, a, b, cljs.core.conj.call(null, d, c))
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
clojure.set.select = function(a, b) {
  return cljs.core.reduce.call(null, function(b, d) {
    return cljs.core.truth_(a.call(null, d)) ? b : cljs.core.disj.call(null, b, d)
  }, b, b)
};
clojure.set.project = function(a, b) {
  return cljs.core.set.call(null, cljs.core.map.call(null, function(a) {
    return cljs.core.select_keys.call(null, a, b)
  }, a))
};
clojure.set.rename_keys = function(a, b) {
  return cljs.core.reduce.call(null, function(a, b) {
    var e = cljs.core.nth.call(null, b, 0, null), f = cljs.core.nth.call(null, b, 1, null), g;
    g = (g = cljs.core.not_EQ_.call(null, e, f)) ? cljs.core.contains_QMARK_.call(null, a, e) : g;
    return g ? cljs.core.dissoc.call(null, cljs.core.assoc.call(null, a, f, cljs.core.get.call(null, a, e)), e) : a
  }, a, b)
};
clojure.set.rename = function(a, b) {
  return cljs.core.set.call(null, cljs.core.map.call(null, function(a) {
    return clojure.set.rename_keys.call(null, a, b)
  }, a))
};
clojure.set.index = function(a, b) {
  return cljs.core.reduce.call(null, function(a, d) {
    var e = cljs.core.select_keys.call(null, d, b);
    return cljs.core.assoc.call(null, a, e, cljs.core.conj.call(null, cljs.core.get.call(null, a, e, cljs.core.PersistentHashSet.EMPTY), d))
  }, cljs.core.ObjMap.EMPTY, a)
};
clojure.set.map_invert = function(a) {
  return cljs.core.reduce.call(null, function(a, c) {
    var d = cljs.core.nth.call(null, c, 0, null), e = cljs.core.nth.call(null, c, 1, null);
    return cljs.core.assoc.call(null, a, e, d)
  }, cljs.core.ObjMap.EMPTY, a)
};
clojure.set.join = function() {
  var a = null, b = function(a, b) {
    var c;
    c = (c = cljs.core.seq.call(null, a)) ? cljs.core.seq.call(null, b) : c;
    if(c) {
      var g = clojure.set.intersection.call(null, cljs.core.set.call(null, cljs.core.keys.call(null, cljs.core.first.call(null, a))), cljs.core.set.call(null, cljs.core.keys.call(null, cljs.core.first.call(null, b)))), h = cljs.core.count.call(null, a) <= cljs.core.count.call(null, b) ? cljs.core.PersistentVector.fromArray([a, b], !0) : cljs.core.PersistentVector.fromArray([b, a], !0);
      c = cljs.core.nth.call(null, h, 0, null);
      var h = cljs.core.nth.call(null, h, 1, null), i = clojure.set.index.call(null, c, g);
      return cljs.core.reduce.call(null, function(a, b) {
        var c = i.call(null, cljs.core.select_keys.call(null, b, g));
        return cljs.core.truth_(c) ? cljs.core.reduce.call(null, function(a, c) {
          return cljs.core.conj.call(null, a, cljs.core.merge.call(null, c, b))
        }, a, c) : a
      }, cljs.core.PersistentHashSet.EMPTY, h)
    }
    return cljs.core.PersistentHashSet.EMPTY
  }, c = function(a, b, c) {
    var a = cljs.core.count.call(null, a) <= cljs.core.count.call(null, b) ? cljs.core.PersistentVector.fromArray([a, b, clojure.set.map_invert.call(null, c)], !0) : cljs.core.PersistentVector.fromArray([b, a, c], !0), b = cljs.core.nth.call(null, a, 0, null), c = cljs.core.nth.call(null, a, 1, null), g = cljs.core.nth.call(null, a, 2, null), h = clojure.set.index.call(null, b, cljs.core.vals.call(null, g));
    return cljs.core.reduce.call(null, function(a, b) {
      var c = h.call(null, clojure.set.rename_keys.call(null, cljs.core.select_keys.call(null, b, cljs.core.keys.call(null, g)), g));
      return cljs.core.truth_(c) ? cljs.core.reduce.call(null, function(a, c) {
        return cljs.core.conj.call(null, a, cljs.core.merge.call(null, c, b))
      }, a, c) : a
    }, cljs.core.PersistentHashSet.EMPTY, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
clojure.set.subset_QMARK_ = function(a, b) {
  var c = cljs.core.count.call(null, a) <= cljs.core.count.call(null, b);
  return c ? cljs.core.every_QMARK_.call(null, function(a) {
    return cljs.core.contains_QMARK_.call(null, b, a)
  }, a) : c
};
clojure.set.superset_QMARK_ = function(a, b) {
  var c = cljs.core.count.call(null, a) >= cljs.core.count.call(null, b);
  return c ? cljs.core.every_QMARK_.call(null, function(b) {
    return cljs.core.contains_QMARK_.call(null, a, b)
  }, b) : c
};
quil.core = {};
quil.core._STAR_pjs_STAR_ = null;
quil.core._STAR_state_STAR_ = null;
quil.core.current_surface = function() {
  return quil.core._STAR_pjs_STAR_
};
quil.core.current_applet = quil.core.current_surface;
quil.core.state = function(a) {
  return cljs.core.get.call(null, cljs.core.deref.call(null, quil.core._STAR_state_STAR_), a)
};
quil.core.set_state_BANG_ = function() {
  var a = function(a) {
    return cljs.core.not.call(null, cljs.core.deref.call(null, quil.core._STAR_state_STAR_)) ? cljs.core.reset_BANG_.call(null, quil.core._STAR_state_STAR_, cljs.core.apply.call(null, cljs.core.hash_map, a)) : console.log("State already set!")
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
quil.core.abs_int = function(a) {
  return PApplet.abs.call(null, a | 0)
};
quil.core.abs_float = function(a) {
  return PApplet.abs.call(null, a)
};
quil.core.abs = function(a) {
  return cljs.core.truth_(quil.util.int_like_QMARK_.call(null, a)) ? quil.core.abs_int.call(null, a) : quil.core.abs_float.call(null, a)
};
quil.core.acos = function(a) {
  return PApplet.acos.call(null, a)
};
quil.core.alpha = function(a) {
  return quil.core.current_surface.call(null).alpha(a | 0)
};
quil.core.ambient_float = function() {
  var a = null, b = function(a) {
    return quil.core.current_surface.call(null).ambient(a)
  }, c = function(a, b, c) {
    return quil.core.current_surface.call(null).ambient(a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
quil.core.ambient_int = function(a) {
  return quil.core.current_surface.call(null).ambient(a | 0)
};
quil.core.ambient = function() {
  var a = null, b = function(a) {
    return cljs.core.truth_(quil.util.int_like_QMARK_.call(null, a)) ? quil.core.ambient_int.call(null, a) : quil.core.ambient_float.call(null, a)
  }, c = function(a, b, c) {
    return quil.core.ambient_float.call(null, a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
quil.core.ambient_light = function() {
  var a = null, b = function(a, b, c) {
    return quil.core.current_surface.call(null).ambientLight(a, b, c)
  }, c = function(a, b, c, g, h, i) {
    return quil.core.current_surface.call(null).ambientLight(a, b, c, g, h, i)
  }, a = function(a, e, f, g, h, i) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, e, f);
      case 6:
        return c.call(this, a, e, f, g, h, i)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$6 = c;
  return a
}();
quil.core.apply_matrix = function() {
  var a = null, b = function(a, b, c, g, h, i) {
    return quil.core.current_surface.call(null).applyMatrix(a, b, c, g, h, i)
  }, c = function(a, b, c, g, h, i, j, k, m, l, n, p, q, r, s) {
    return quil.core.current_surface.call(null).applyMatrix(a, b, c, 3, h, i, j, 13, m, l, n, 23, q, r, s, 33)
  }, a = function(a, e, f, g, h, i, j, k, m, l, n, p, q, r, s, t) {
    switch(arguments.length) {
      case 6:
        return b.call(this, a, e, f, g, h, i);
      case 16:
        return c.call(this, a, e, f, g, h, i, j, k, m, l, n, p, q, r, s, t)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$6 = b;
  a.cljs$core$IFn$_invoke$arity$16 = c;
  return a
}();
quil.core.arc = function(a, b, c, d, e, f) {
  return quil.core.current_surface.call(null).arc(a, b, c, d, e, f)
};
quil.core.asin = function(a) {
  return PApplet.asin.call(null, a)
};
quil.core.atan = function(a) {
  return PApplet.atan.call(null, a)
};
quil.core.atan2 = function(a, b) {
  return PApplet.atan2.call(null, a, b)
};
quil.core.background_float = function() {
  var a = null, b = function(a) {
    return quil.core.current_surface.call(null).background(a)
  }, c = function(a, b) {
    return quil.core.current_surface.call(null).background(a, b)
  }, d = function(a, b, c) {
    return quil.core.current_surface.call(null).background(a, b, c)
  }, e = function(a, b, c, d) {
    return quil.core.current_surface.call(null).background(a, b, c, d)
  }, a = function(a, g, h, i) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, g);
      case 3:
        return d.call(this, a, g, h);
      case 4:
        return e.call(this, a, g, h, i)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$4 = e;
  return a
}();
quil.core.background_int = function() {
  var a = null, b = function(a) {
    return quil.core.current_surface.call(null).background(a | 0)
  }, c = function(a, b) {
    return quil.core.current_surface.call(null).background(a | 0, b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
quil.core.background = function() {
  var a = null, b = function(a) {
    return cljs.core.truth_(quil.util.int_like_QMARK_.call(null, a)) ? quil.core.background_int.call(null, a) : quil.core.background_float.call(null, a)
  }, c = function(a, b) {
    return cljs.core.truth_(quil.util.int_like_QMARK_.call(null, a)) ? quil.core.background_int.call(null, a, b) : quil.core.background_float.call(null, a, b)
  }, d = function(a, b, c) {
    return quil.core.background_float.call(null, a, b, c)
  }, e = function(a, b, c, d) {
    return quil.core.background_float.call(null, a, b, c, d)
  }, a = function(a, g, h, i) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, g);
      case 3:
        return d.call(this, a, g, h);
      case 4:
        return e.call(this, a, g, h, i)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$4 = e;
  return a
}();
quil.core.background_image = function(a) {
  return quil.core.current_surface.call(null).background(a)
};
quil.core.begin_camera = function() {
  return quil.core.current_surface.call(null).beginCamera()
};
quil.core.end_camera = function() {
  return quil.core.current_surface.call(null).endCamera()
};
quil.core.begin_raw = function() {
  var a = null, b = function(a) {
    return quil.core.current_surface.call(null).beginRaw(a)
  }, c = function(a, b) {
    return quil.core.current_applet.call(null).beginRaw(a, b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
quil.core.render_modes = cljs.core.PersistentArrayMap.fromArray(["\ufdd0:p2d", Processing.prototype.P2D, "\ufdd0:p3d", Processing.prototype.P3D, "\ufdd0:java2d", Processing.prototype.JAVA2D, "\ufdd0:opengl", Processing.prototype.OPENGL, "\ufdd0:pdf", Processing.prototype.PDF, "\ufdd0:dxf", Processing.prototype.DXF], !0);
quil.core.begin_record = function(a, b) {
  var c = quil.util.resolve_constant_key.call(null, a, quil.core.render_modes);
  cljs.core.println.call(null, "renderer: ", c);
  return quil.core.current_applet.call(null).beginRecord("" + cljs.core.str(c), "" + cljs.core.str(b))
};
quil.core.end_record = function() {
  return quil.core.current_applet.call(null).endRecord()
};
quil.core.shape_modes = cljs.core.PersistentArrayMap.fromArray(["\ufdd0:points", Processing.prototype.POINTS, "\ufdd0:lines", Processing.prototype.LINES, "\ufdd0:triangles", Processing.prototype.TRIANGLES, "\ufdd0:triangle-strip", Processing.prototype.TRIANGLE_STRIP, "\ufdd0:triangle-fan", Processing.prototype.TRIANGLE_FAN, "\ufdd0:quads", Processing.prototype.QUADS, "\ufdd0:quad-strip", Processing.prototype.QUAD_STRIP], !0);
quil.core.begin_shape = function() {
  var a = null, b = function() {
    return quil.core.current_surface.call(null).beginShape()
  }, c = function(a) {
    a = quil.util.resolve_constant_key.call(null, a, quil.core.shape_modes);
    return quil.core.current_surface.call(null).beginShape(a | 0)
  }, a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  return a
}();
quil.core.bezier = function() {
  var a = null, b = function(a, b, c, g, h, i, j, k) {
    return quil.core.current_surface.call(null).bezier(a, b, c, g, h, i, j, k)
  }, c = function(a, b, c, g, h, i, j, k, m, l, n, p) {
    return quil.core.current_surface.call(null).bezier(a, b, c, g, h, i, j, k, m, l, n, p)
  }, a = function(a, e, f, g, h, i, j, k, m, l, n, p) {
    switch(arguments.length) {
      case 8:
        return b.call(this, a, e, f, g, h, i, j, k);
      case 12:
        return c.call(this, a, e, f, g, h, i, j, k, m, l, n, p)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$8 = b;
  a.cljs$core$IFn$_invoke$arity$12 = c;
  return a
}();
quil.core.bezier_detail = function(a) {
  return quil.core.current_surface.call(null).bezierDetail(a | 0)
};
quil.core.bezier_point = function(a, b, c, d, e) {
  return quil.core.current_surface.call(null).bezierPoint(a, b, c, d, e)
};
quil.core.bezier_tangent = function(a, b, c, d, e) {
  return quil.core.current_surface.call(null).bezierTangent(a, b, c, d, e)
};
quil.core.bezier_vertex = function() {
  var a = null, b = function(a, b, c, g, h, i) {
    return quil.core.current_surface.call(null).bezierVertex(a, b, c, g, h, i)
  }, c = function(a, b, c, g, h, i, j, k, m) {
    return quil.core.current_surface.call(null).bezierVertex(a, b, c, g, h, i, j, k, m)
  }, a = function(a, e, f, g, h, i, j, k, m) {
    switch(arguments.length) {
      case 6:
        return b.call(this, a, e, f, g, h, i);
      case 9:
        return c.call(this, a, e, f, g, h, i, j, k, m)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$6 = b;
  a.cljs$core$IFn$_invoke$arity$9 = c;
  return a
}();
quil.core.binary = function() {
  var a = null, b = function(a) {
    return PApplet.binary.call(null, "number" === typeof a ? a | 0 : a)
  }, c = function(a, b) {
    return PApplet.binary.call(null, a | 0, b | 0)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
quil.core.unbinary = function(a) {
  return PApplet.unbinary.call(null, "" + cljs.core.str(a))
};
quil.core.blend_modes = cljs.core.PersistentHashMap.fromArrays("\ufdd0:subtract \ufdd0:hard-light \ufdd0:lightest \ufdd0:difference \ufdd0:soft-light \ufdd0:screen \ufdd0:dodge \ufdd0:blend \ufdd0:overlay \ufdd0:darkest \ufdd0:add \ufdd0:exclusion \ufdd0:burn \ufdd0:multiply".split(" "), [Processing.prototype.SUBTRACT, Processing.prototype.HARD_LIGHT, Processing.prototype.LIGHTEST, Processing.prototype.DIFFERENCE, Processing.prototype.SOFT_LIGHT, Processing.prototype.SCREEN, Processing.prototype.DODGE, 
Processing.prototype.BLEND, Processing.prototype.OVERLAY, Processing.prototype.DARKEST, Processing.prototype.ADD, Processing.prototype.EXCLUSION, Processing.prototype.BURN, Processing.prototype.MULTIPLY]);
quil.core.blend = function() {
  var a = null, b = function(a, b, c, g, h, i, j, k, m) {
    m = quil.util.resolve_constant_key.call(null, m, quil.core.blend_modes);
    return quil.core.current_surface.call(null).blend(a | 0, b | 0, c | 0, g | 0, h | 0, i | 0, j | 0, k | 0, m | 0)
  }, c = function(a, b, c, g, h, i, j, k, m, l) {
    l = quil.util.resolve_constant_key.call(null, l, quil.core.blend_modes);
    return quil.core.current_surface.call(null).blend(a, b | 0, c | 0, g | 0, h | 0, i | 0, j | 0, k | 0, m | 0, l | 0)
  }, a = function(a, e, f, g, h, i, j, k, m, l) {
    switch(arguments.length) {
      case 9:
        return b.call(this, a, e, f, g, h, i, j, k, m);
      case 10:
        return c.call(this, a, e, f, g, h, i, j, k, m, l)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$9 = b;
  a.cljs$core$IFn$_invoke$arity$10 = c;
  return a
}();
quil.core.blend_color = function(a, b, c) {
  c = quil.util.resolve_constant_key.call(null, c, quil.core.blend_modes);
  return PApplet.blendColor.call(null, a | 0, b | 0, c | 0)
};
quil.core.blue = function(a) {
  return quil.core.current_surface.call(null).blue(a | 0)
};
quil.core.box = function() {
  var a = null, b = function(a) {
    return quil.core.current_surface.call(null).box(a)
  }, c = function(a, b, c) {
    return quil.core.current_surface.call(null).box(a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
quil.core.brightness = function(a) {
  return quil.core.current_surface.call(null).brightness(a | 0)
};
quil.core.camera = function() {
  var a = null, b = function() {
    return quil.core.current_surface.call(null).camera()
  }, c = function(a, b, c, g, h, i, j, k, m) {
    return quil.core.current_surface.call(null).camera(a, b, c, g, h, i, j, k, m)
  }, a = function(a, e, f, g, h, i, j, k, m) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 9:
        return c.call(this, a, e, f, g, h, i, j, k, m)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$9 = c;
  return a
}();
quil.core.ceil = function(a) {
  return PApplet.ceil.call(null, a)
};
quil.core.color = function() {
  var a = null, b = function(a) {
    return quil.core.current_surface.call(null).color(a)
  }, c = function(a, b) {
    return quil.core.current_surface.call(null).color(a, b)
  }, d = function(a, b, c) {
    return quil.core.current_surface.call(null).color(a, b, c)
  }, e = function(a, b, c, d) {
    return quil.core.current_surface.call(null).color(a, b, c, d)
  }, a = function(a, g, h, i) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, g);
      case 3:
        return d.call(this, a, g, h);
      case 4:
        return e.call(this, a, g, h, i)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$4 = e;
  return a
}();
quil.core.color_modes = cljs.core.PersistentArrayMap.fromArray(["\ufdd0:rgb", 1, "\ufdd0:hsb", 3], !0);
quil.core.color_mode = function() {
  var a = null, b = function(a) {
    a = quil.util.resolve_constant_key.call(null, a, quil.core.color_modes);
    return quil.core.current_surface.call(null).colorMode(a | 0)
  }, c = function(a, b) {
    var c = quil.util.resolve_constant_key.call(null, a, quil.core.color_modes);
    return quil.core.current_surface.call(null).colorMode(c | 0, b)
  }, d = function(a, b, c, d) {
    a = quil.util.resolve_constant_key.call(null, a, quil.core.color_modes);
    return quil.core.current_surface.call(null).colorMode(a | 0, b, c, d)
  }, e = function(a, b, c, d, e) {
    a = quil.util.resolve_constant_key.call(null, a, quil.core.color_modes);
    return quil.core.current_surface.call(null).colorMode(a | 0, b, c, d, e)
  }, a = function(a, g, h, i, j) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, g);
      case 4:
        return d.call(this, a, g, h, i);
      case 5:
        return e.call(this, a, g, h, i, j)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  a.cljs$core$IFn$_invoke$arity$5 = e;
  return a
}();
quil.core.constrain_float = function(a, b, c) {
  return PApplet.constrain.call(null, a, b, c)
};
quil.core.constrain_int = function(a, b, c) {
  return PApplet.constrain.call(null, a | 0, b | 0, c | 0)
};
quil.core.constrain = function(a, b, c) {
  return cljs.core.truth_(quil.util.int_like_QMARK_.call(null, a)) ? quil.core.constrain_int.call(null, a, b, c) : quil.core.constrain_float.call(null, a, b, c)
};
quil.core.copy = function() {
  var a = null, b = function(a, b) {
    var c = cljs.core.nth.call(null, a, 0, null), g = cljs.core.nth.call(null, a, 1, null), h = cljs.core.nth.call(null, a, 2, null), i = cljs.core.nth.call(null, a, 3, null), j = cljs.core.nth.call(null, b, 0, null), k = cljs.core.nth.call(null, b, 1, null), m = cljs.core.nth.call(null, b, 2, null), l = cljs.core.nth.call(null, b, 3, null);
    return quil.core.current_surface.call(null).copy(c | 0, g | 0, h | 0, i | 0, j | 0, k | 0, m | 0, l | 0)
  }, c = function(a, b, c) {
    var g = cljs.core.nth.call(null, b, 0, null), h = cljs.core.nth.call(null, b, 1, null), i = cljs.core.nth.call(null, b, 2, null), b = cljs.core.nth.call(null, b, 3, null), j = cljs.core.nth.call(null, c, 0, null), k = cljs.core.nth.call(null, c, 1, null), m = cljs.core.nth.call(null, c, 2, null), c = cljs.core.nth.call(null, c, 3, null);
    return quil.core.current_surface.call(null).copy(a, g | 0, h | 0, i | 0, b | 0, j | 0, k | 0, m | 0, c | 0)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
quil.core.cos = function(a) {
  return quil.core._STAR_pjs_STAR_.cos(a)
};
quil.core.available_fonts = function() {
  return cljs.core.seq.call(null, PFont.list.call(null))
};
quil.core.font_available_QMARK_ = function(a) {
  return cljs.core.truth_(cljs.core.some.call(null, cljs.core.PersistentHashSet.fromArray([a, null], !0), quil.core.available_fonts.call(null))) ? !0 : !1
};
quil.core.create_font = function() {
  var a = null, b = function(a, b) {
    return quil.core.current_applet.call(null).createFont("" + cljs.core.str(a), b)
  }, c = function(a, b, c) {
    return quil.core.current_applet.call(null).createFont("" + cljs.core.str(a), b, c)
  }, d = function(a, b, c, d) {
    return quil.core.current_applet.call(null).createFont("" + cljs.core.str(a), b, c, d)
  }, a = function(a, f, g, h) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  return a
}();
quil.core.graphic_render_modes = cljs.core.select_keys.call(null, quil.core.render_modes, cljs.core.PersistentVector.fromArray(["\ufdd0:p2d", "\ufdd0:p3d", "\ufdd0:java2d", "\ufdd0:pdf"], !0));
quil.core.create_graphics = function() {
  var a = null, b = function(a, b, c) {
    return quil.core.current_applet.call(null).createGraphics(a | 0, b | 0, quil.util.resolve_constant_key.call(null, c, quil.core.graphic_render_modes))
  }, c = function(a, b, c, g) {
    return quil.core.current_applet.call(null).createGraphics(a | 0, b | 0, quil.util.resolve_constant_key.call(null, c, quil.core.graphic_render_modes), "" + cljs.core.str(g))
  }, a = function(a, e, f, g) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, e, f);
      case 4:
        return c.call(this, a, e, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$4 = c;
  return a
}();
quil.core.create_image = function(a, b, c) {
  return quil.core.current_applet.call(null).createImage(a | 0, b | 0, c | 0)
};
quil.core.create_input = function(a) {
  return quil.core.current_applet.call(null).createInput("" + cljs.core.str(a))
};
quil.core.create_input_raw = function(a) {
  return quil.core.current_applet.call(null).createInputRaw(a)
};
quil.core.create_output = function(a) {
  return quil.core.current_applet.call(null).createOutput("" + cljs.core.str(a))
};
quil.core.cursor_modes = cljs.core.PersistentArrayMap.fromArray(["\ufdd0:arrow", Processing.prototype.ARROW, "\ufdd0:cross", Processing.prototype.CROSS, "\ufdd0:hand", Processing.prototype.HAND, "\ufdd0:move", Processing.prototype.MOVE, "\ufdd0:text", Processing.prototype.TEXT, "\ufdd0:wait", Processing.prototype.WAIT], !0);
quil.core.cursor = function() {
  var a = null, b = function() {
    return quil.core.current_applet.call(null).cursor()
  }, c = function(a) {
    return quil.core.current_applet.call(null).cursor(quil.util.resolve_constant_key.call(null, a, quil.core.cursor_modes) | 0)
  }, a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  return a
}();
quil.core.cursor_image = function() {
  var a = null, b = function(a) {
    return quil.core.current_applet.call(null).cursor(a)
  }, c = function(a, b, c) {
    return quil.core.current_applet.call(null).cursor(a, b | 0, c | 0)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
quil.core.curve = function() {
  var a = null, b = function(a, b, c, g, h, i, j, k) {
    return quil.core.current_surface.call(null).curve(a, b, c, g, h, i, j, k)
  }, c = function(a, b, c, g, h, i, j, k, m, l, n, p) {
    return quil.core.current_surface.call(null).curve(a, b, c, g, h, i, j, k, m, l, n, p)
  }, a = function(a, e, f, g, h, i, j, k, m, l, n, p) {
    switch(arguments.length) {
      case 8:
        return b.call(this, a, e, f, g, h, i, j, k);
      case 12:
        return c.call(this, a, e, f, g, h, i, j, k, m, l, n, p)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$8 = b;
  a.cljs$core$IFn$_invoke$arity$12 = c;
  return a
}();
quil.core.curve_detail = function(a) {
  return quil.core.current_surface.call(null).curveDetail(a | 0)
};
quil.core.curve_point = function(a, b, c, d, e) {
  return quil.core.current_surface.call(null).bezierPoint(a, b, c, d, e)
};
quil.core.curve_tangent = function(a, b, c, d, e) {
  return quil.core.current_surface.call(null).curveTangent(a, b, c, d, e)
};
quil.core.curve_tightness = function(a) {
  return quil.core.current_surface.call(null).curveTightness(a)
};
quil.core.curve_vertex = function() {
  var a = null, b = function(a, b) {
    return quil.core.current_surface.call(null).curveVertex(a, b)
  }, c = function(a, b, c) {
    return quil.core.current_surface.call(null).curveVertex(a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
quil.core.day = function() {
  return PApplet.day.call(null)
};
quil.core.degrees = function(a) {
  return PApplet.degrees.call(null, a)
};
quil.core.delay_frame = function(a) {
  return quil.core.current_applet.call(null).delay(a | 0)
};
quil.core.directional_light = function(a, b, c, d, e, f) {
  return quil.core.current_surface.call(null).directionalLight(a, b, c, d, e, f)
};
quil.core.dist = function() {
  var a = null, b = function(a, b, c, g) {
    return PApplet.dist.call(null, a, b, c, g)
  }, c = function(a, b, c, g, h, i) {
    return PApplet.dist.call(null, a, b, c, g, h, i)
  }, a = function(a, e, f, g, h, i) {
    switch(arguments.length) {
      case 4:
        return b.call(this, a, e, f, g);
      case 6:
        return c.call(this, a, e, f, g, h, i)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$4 = b;
  a.cljs$core$IFn$_invoke$arity$6 = c;
  return a
}();
quil.core.ellipse = function(a, b, c, d) {
  return quil.core.current_surface.call(null).ellipse(a, b, c, d)
};
quil.core.ellipse_modes = cljs.core.PersistentArrayMap.fromArray(["\ufdd0:center", Processing.prototype.CENTER, "\ufdd0:radius", Processing.prototype.RADIUS, "\ufdd0:corner", Processing.prototype.CORNER, "\ufdd0:corners", Processing.prototype.CORNERS], !0);
quil.core.ellipse_mode = function(a) {
  a = quil.util.resolve_constant_key.call(null, a, quil.core.ellipse_modes);
  return quil.core.current_surface.call(null).ellipseMode(a | 0)
};
quil.core.emissive_float = function() {
  var a = null, b = function(a) {
    return quil.core.current_surface.call(null).emissive(a)
  }, c = function(a, b, c) {
    return quil.core.current_surface.call(null).emissive(a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
quil.core.emissive_int = function(a) {
  return quil.core.current_surface.call(null).emissive(a | 0)
};
quil.core.emissive = function() {
  var a = null, b = function(a) {
    return cljs.core.truth_(quil.util.int_like_QMARK_.call(null, a)) ? quil.core.emissive_int.call(null, a) : quil.core.emissive_float.call(null, a)
  }, c = function(a, b, c) {
    return quil.core.emissive_float.call(null, a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
quil.core.end_raw = function() {
  return quil.core.current_applet.call(null).endRaw()
};
quil.core.end_shape = function() {
  var a = null, b = function() {
    return quil.core.current_applet.call(null).endShape()
  }, c = function(a) {
    if(!cljs.core._EQ_.call(null, "\ufdd0:close", a)) {
      throw Error([cljs.core.str("Unknown mode value: "), cljs.core.str(a), cljs.core.str(". Expected :close")].join(""));
    }
    return quil.core.current_applet.call(null).endShape(Processing.prototype.CLOSE)
  }, a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  return a
}();
quil.core.exp = function(a) {
  return PApplet.exp.call(null, a)
};
quil.core.fill_float = function() {
  var a = null, b = function(a) {
    return quil.core.current_surface.call(null).fill(a)
  }, c = function(a, b) {
    return quil.core.current_surface.call(null).fill(a, b)
  }, d = function(a, b, c) {
    return quil.core.current_surface.call(null).fill(a, b, c)
  }, e = function(a, b, c, d) {
    return quil.core.current_surface.call(null).fill(a, b, c, d)
  }, a = function(a, g, h, i) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, g);
      case 3:
        return d.call(this, a, g, h);
      case 4:
        return e.call(this, a, g, h, i)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$4 = e;
  return a
}();
quil.core.fill_int = function() {
  var a = null, b = function(a) {
    return quil.core.current_surface.call(null).fill(a | 0)
  }, c = function(a, b) {
    return quil.core.current_surface.call(null).fill(a | 0, b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
quil.core.fill = function() {
  var a = null, b = function(a) {
    return cljs.core.truth_(quil.util.int_like_QMARK_.call(null, a)) ? quil.core.fill_int.call(null, a) : quil.core.fill_float.call(null, a)
  }, c = function(a, b) {
    return cljs.core.truth_(quil.util.int_like_QMARK_.call(null, a)) ? quil.core.fill_int.call(null, a, b) : quil.core.fill_float.call(null, a, b)
  }, d = function(a, b, c) {
    return quil.core.fill_float.call(null, a, b, c)
  }, e = function(a, b, c, d) {
    return quil.core.fill_float.call(null, a, b, c, d)
  }, a = function(a, g, h, i) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, g);
      case 3:
        return d.call(this, a, g, h);
      case 4:
        return e.call(this, a, g, h, i)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$4 = e;
  return a
}();
quil.core.filter_modes = cljs.core.PersistentArrayMap.fromArray(["\ufdd0:threshold", Processing.prototype.THRESHOLD, "\ufdd0:gray", Processing.prototype.GRAY, "\ufdd0:invert", Processing.prototype.INVERT, "\ufdd0:posterize", Processing.prototype.POSTERIZE, "\ufdd0:blur", Processing.prototype.BLUR, "\ufdd0:opaque", Processing.prototype.OPAQUE, "\ufdd0:erode", Processing.prototype.ERODE, "\ufdd0:dilate", Processing.prototype.DILATE], !0);
quil.core.display_filter = function() {
  var a = null, b = function(a) {
    a = quil.util.resolve_constant_key.call(null, a, quil.core.filter_modes);
    return quil.core.current_applet.call(null).filter(a | 0)
  }, c = function(a, b) {
    var c = quil.util.resolve_constant_key.call(null, a, quil.core.filter_modes);
    return quil.core.current_applet.call(null).filter(c | 0, b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
quil.core.focused = function() {
  return quil.core.current_applet.call(null).focussed
};
quil.core.frame_count = function() {
  return quil.core.current_applet.call(null).frameCount
};
quil.core.current_frame_rate = function() {
  return quil.core.current_applet.call(null).frameRate
};
quil.core.target_frame_rate = function() {
  return cljs.core.deref.call(null, quil.applet.target_frame_rate.call(null))
};
quil.core.frame_rate = function(a) {
  return quil.core.current_applet.call(null).frameRate(a)
};
quil.core.frustum = function(a, b, c, d, e, f) {
  return quil.core.current_surface.call(null).frustum(a, b, c, d, e, f)
};
quil.core.get_pixel = function() {
  var a = null, b = function() {
    return quil.core.current_surface.call(null).get()
  }, c = function(a, b) {
    return quil.core.current_surface.call(null).get(a | 0, b | 0)
  }, d = function(a, b, c, d) {
    return quil.core.current_surface.call(null).get(a | 0, b | 0, c | 0, d | 0)
  }, a = function(a, f, g, h) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 2:
        return c.call(this, a, f);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  return a
}();
quil.core.pixels = function() {
  quil.core.load_pixels.call(null);
  return quil.core.current_surface.call(null).pixels
};
quil.core.green = function(a) {
  return quil.core.current_surface.call(null).green(a | 0)
};
quil.core.hex = function() {
  var a = null, b = function(a) {
    return PApplet.hex.call(null, a)
  }, c = function(a, b) {
    return PApplet.hex.call(null, a | 0, b | 0)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
quil.core.unhex = function(a) {
  return PApplet.unhex.call(null, "" + cljs.core.str(a))
};
quil.core.height = function() {
  return quil.core._STAR_pjs_STAR_.height
};
quil.core.hint_options = cljs.core.PersistentHashMap.fromArrays("\ufdd0:enable-depth-sort \ufdd0:enable-opengl-2x-smooth \ufdd0:enable-opengl-error-report \ufdd0:enable-depth-mask \ufdd0:enable-opengl-4x-smooth \ufdd0:disable-native-fonts \ufdd0:disable-opengl-error-report \ufdd0:disable-depth-test \ufdd0:enable-depth-test \ufdd0:enable-native-fonts \ufdd0:disable-depth-sort \ufdd0:disable-depth-mask \ufdd0:disable-accurate-textures \ufdd0:enable-accurate-textures".split(" "), [Processing.prototype.ENABLE_DEPTH_SORT, 
Processing.prototype.ENABLE_OPENGL_2X_SMOOTH, Processing.prototype.ENABLE_OPENGL_ERROR_REPORT, Processing.prototype.ENABLE_DEPTH_MASK, Processing.prototype.ENABLE_OPENGL_4X_SMOOTH, Processing.prototype.DISABLE_NATIVE_FONTS, Processing.prototype.DISABLE_OPENGL_ERROR_REPORT, Processing.prototype.DISABLE_DEPTH_TEST, Processing.prototype.ENABLE_DEPTH_TEST, Processing.prototype.ENABLE_NATIVE_FONTS, Processing.prototype.DISABLE_DEPTH_SORT, Processing.prototype.DISABLE_DEPTH_MASK, Processing.prototype.DISABLE_ACCURATE_TEXTURES, 
Processing.prototype.ENABLE_ACCURATE_TEXTURES]);
quil.core.hint = function(a) {
  a = cljs.core.keyword_QMARK_.call(null, a) ? cljs.core.get.call(null, quil.core.hint_options, a) : a;
  return quil.core.current_surface.call(null).hint(a | 0)
};
quil.core.hour = function() {
  return PApplet.hour.call(null)
};
quil.core.hue = function(a) {
  return quil.core.current_surface.call(null).hue(a | 0)
};
quil.core.image = function() {
  var a = null, b = function(a, b, c) {
    return quil.core.current_surface.call(null).image(a, b, c)
  }, c = function(a, b, c, d, i) {
    return quil.core.current_surface.call(null).image(a, b, c, d, i)
  }, d = function(a, b, c, d, i, j, k, m, l) {
    return quil.core.current_surface.call(null).image(a, b, c, d, i, j, k, m, l)
  }, a = function(a, f, g, h, i, j, k, m, l) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, f, g);
      case 5:
        return c.call(this, a, f, g, h, i);
      case 9:
        return d.call(this, a, f, g, h, i, j, k, m, l)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$5 = c;
  a.cljs$core$IFn$_invoke$arity$9 = d;
  return a
}();
quil.core.image_modes = cljs.core.PersistentArrayMap.fromArray(["\ufdd0:corner", Processing.prototype.CORNER, "\ufdd0:corners", Processing.prototype.CORNERS, "\ufdd0:center", Processing.prototype.CENTER], !0);
quil.core.image_mode = function(a) {
  a = quil.util.resolve_constant_key.call(null, a, quil.core.image_modes);
  return quil.core.current_surface.call(null).imageMode(a | 0)
};
quil.core.light_falloff = function(a, b, c) {
  return quil.core.current_surface.call(null).lightFalloff(a, b, c)
};
quil.core.lerp_color = function(a, b, c) {
  return quil.core.current_surface.call(null).lerpColor(a | 0, b | 0, c)
};
quil.core.lerp = function(a, b, c) {
  return PApplet.lerp.call(null, a, b, c)
};
quil.core.raw_key = function() {
  return quil.core.current_applet.call(null).key
};
quil.core.key_code = function() {
  return quil.core.current_applet.call(null).keyCode
};
quil.core.key_pressed_QMARK_ = function() {
  return quil.core.current_applet.call(null).keyPressed
};
quil.core.lights = function() {
  return quil.core.current_surface.call(null).lights()
};
quil.core.light_specular = function(a, b, c) {
  return quil.core.current_surface.call(null).lightSpecular(a, b, c)
};
quil.core.line = function() {
  var a = null, b = function(b, c) {
    return cljs.core.apply.call(null, a, cljs.core.concat.call(null, b, c))
  }, c = function(a, b, c, d) {
    return quil.core.current_surface.call(null).line(a, b, c, d)
  }, d = function(a, b, c, d, i, j) {
    return quil.core.current_surface.call(null).line(a, b, c, d, i, j)
  }, a = function(a, f, g, h, i, j) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 4:
        return c.call(this, a, f, g, h);
      case 6:
        return d.call(this, a, f, g, h, i, j)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$4 = c;
  a.cljs$core$IFn$_invoke$arity$6 = d;
  return a
}();
quil.core.load_bytes = function(a) {
  return quil.core.current_applet.call(null).loadBytes("" + cljs.core.str(a))
};
quil.core.load_font = function(a) {
  return quil.core.current_applet.call(null).loadFont("" + cljs.core.str(a))
};
quil.core.load_image = function(a) {
  return quil.core.current_applet.call(null).loadImage("" + cljs.core.str(a))
};
quil.core.load_pixels = function() {
  return quil.core.current_surface.call(null).loadPixels()
};
quil.core.load_shape = function(a) {
  return quil.core.current_applet.call(null).loadShape(a)
};
quil.core.load_strings = function(a) {
  return quil.core.current_applet.call(null).loadStrings(a)
};
quil.core.log = function(a) {
  return PApplet.log.call(null, a)
};
quil.core.start_loop = function() {
  return quil.core.current_applet.call(null).loop()
};
quil.core.mag = function() {
  var a = null, b = function(a, b) {
    return PApplet.mag.call(null, a, b)
  }, c = function(a, b, c) {
    return PApplet.mag.call(null, a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
quil.core.map_range = function(a, b, c, d, e) {
  return PApplet.map.call(null, a, b, c, d, e)
};
quil.core.mask_image = function(a) {
  return quil.core.current_surface.call(null).mask(a)
};
quil.core.millis = function() {
  return quil.core.current_applet.call(null).millis()
};
quil.core.minute = function() {
  return PApplet.minute.call(null)
};
quil.core.model_x = function(a, b, c) {
  return quil.core.current_surface.call(null).modelX(a, b, c)
};
quil.core.model_y = function(a, b, c) {
  return quil.core.current_surface.call(null).modelY(a, b, c)
};
quil.core.model_z = function(a, b, c) {
  return quil.core.current_surface.call(null).modelZ(a, b, c)
};
quil.core.month = function() {
  return PApplet.month.call(null)
};
quil.core.mouse_button = function() {
  var a = quil.core.current_applet.call(null).mouseButton, b = cljs.core._EQ_;
  if(b.call(null, PConstants.LEFT, a)) {
    return"\ufdd0:left"
  }
  if(b.call(null, PConstants.RIGHT, a)) {
    return"\ufdd0:right"
  }
  if(b.call(null, PConstants.CENTER, a)) {
    return"\ufdd0:center"
  }
  throw Error([cljs.core.str("No matching clause: "), cljs.core.str(a)].join(""));
};
quil.core.mouse_state = function() {
  return quil.core.current_applet.call(null).mousePressed
};
quil.core.mouse_x = function() {
  return quil.core.current_applet.call(null).mouseX
};
quil.core.mouse_y = function() {
  return quil.core.current_applet.call(null).mouseY
};
quil.core.pmouse_x = function() {
  return quil.core.current_applet.call(null).pmouseX
};
quil.core.pmouse_y = function() {
  return quil.core.current_applet.call(null).pmouseY
};
quil.core.no_cursor = function() {
  return quil.core.current_applet.call(null).noCursor()
};
quil.core.no_fill = function() {
  return quil.core.current_surface.call(null).noFill()
};
quil.core.noise = function() {
  var a = null, b = function(a) {
    return quil.core.current_applet.call(null).noise(a)
  }, c = function(a, b) {
    return quil.core.current_applet.call(null).noise(a, b)
  }, d = function(a, b, c) {
    return quil.core.current_applet.call(null).noise(a, b, c)
  }, a = function(a, f, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, f);
      case 3:
        return d.call(this, a, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  return a
}();
quil.core.noise_detail = function() {
  var a = null, b = function(a) {
    return quil.core.current_applet.call(null).noiseDetail(a | 0)
  }, c = function(a, b) {
    return quil.core.current_applet.call(null).noiseDetail(a | 0, b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
quil.core.noise_seed = function(a) {
  return quil.core.current_applet.call(null).noiseSeed(a | 0)
};
quil.core.no_lights = function() {
  return quil.core.current_surface.call(null).noLights()
};
quil.core.no_loop = function() {
  return quil.core.current_applet.call(null).noLoop()
};
quil.core.norm = function(a, b, c) {
  return PApplet.norm.call(null, a, b, c)
};
quil.core.normal = function(a, b, c) {
  return quil.core.current_surface.call(null).normal(a, b, c)
};
quil.core.no_smooth = function() {
  return quil.core.current_surface.call(null).noSmooth()
};
quil.core.no_stroke = function() {
  return quil.core.current_surface.call(null).noStroke()
};
quil.core.no_tint = function() {
  return quil.core.current_surface.call(null).noTint()
};
quil.core.ortho = function() {
  var a = null, b = function() {
    return quil.core.current_surface.call(null).ortho()
  }, c = function(a, b, c, g, h, i) {
    return quil.core.current_surface.call(null).ortho(a, b, c, g, h, i)
  }, a = function(a, e, f, g, h, i) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 6:
        return c.call(this, a, e, f, g, h, i)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$6 = c;
  return a
}();
quil.core.perspective = function() {
  var a = null, b = function() {
    return quil.core.current_surface.call(null).perspective()
  }, c = function(a, b, c, g) {
    return quil.core.current_surface.call(null).perspective(a, b, c, g)
  }, a = function(a, e, f, g) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 4:
        return c.call(this, a, e, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$4 = c;
  return a
}();
quil.core.point = function() {
  var a = null, b = function(a, b) {
    return quil.core.current_surface.call(null).point(a, b)
  }, c = function(a, b, c) {
    return quil.core.current_surface.call(null).point(a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
quil.core.point_light = function(a, b, c, d, e, f) {
  return quil.core.current_surface.call(null).pointLight(a, b, c, d, e, f)
};
quil.core.pop_matrix = function() {
  return quil.core.current_surface.call(null).popMatrix()
};
quil.core.pop_style = function() {
  return quil.core.current_surface.call(null).popStyle()
};
quil.core.pow = function(a, b) {
  return quil.core._STAR_pjs_STAR_.pow(a, b)
};
quil.core.print_camera = function() {
  return quil.core.current_surface.call(null).printCamera()
};
quil.core.print_matrix = function() {
  return quil.core.current_surface.call(null).printMatrix()
};
quil.core.print_projection = function() {
  return quil.core.current_surface.call(null).printProjection()
};
quil.core.push_matrix = function() {
  return quil.core.current_surface.call(null).pushMatrix()
};
quil.core.push_style = function() {
  return quil.core.current_surface.call(null).pushStyle()
};
quil.core.quad = function(a, b, c, d, e, f, g, h) {
  return quil.core.current_surface.call(null).quad(a, b, c, d, e, f, g, h)
};
quil.core.radians = function(a) {
  return quil.core._STAR_pjs_STAR_.radians(a)
};
quil.core.random = function() {
  var a = null, b = function(a) {
    return quil.core.current_applet.call(null).random(a)
  }, c = function(a, b) {
    return quil.core.current_applet.call(null).random(a, b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
quil.core.random_seed = function(a) {
  return quil.core.current_applet.call(null).randomSeed(a)
};
quil.core.rect = function(a, b, c, d) {
  return quil.core.current_surface.call(null).rect(a, b, c, d)
};
quil.core.rect_modes = cljs.core.PersistentArrayMap.fromArray(["\ufdd0:corner", Processing.prototype.CORNER, "\ufdd0:corners", Processing.prototype.CORNERS, "\ufdd0:center", Processing.prototype.CENTER, "\ufdd0:radius", Processing.prototype.RADIUS], !0);
quil.core.rect_mode = function(a) {
  a = quil.util.resolve_constant_key.call(null, a, quil.core.rect_modes);
  return quil.core.current_surface.call(null).rectMode(a | 0)
};
quil.core.red = function(a) {
  return quil.core.current_surface.call(null).red(a | 0)
};
quil.core.redraw = function() {
  return quil.core.current_applet.call(null).redraw()
};
quil.core.request_image = function() {
  var a = null, b = function(a) {
    return quil.core.current_applet.call(null).requestImage("" + cljs.core.str(a))
  }, c = function(a, b) {
    return quil.core.current_applet.call(null).requestImage("" + cljs.core.str(a), "" + cljs.core.str(b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
quil.core.reset_matrix = function() {
  return quil.core.current_surface.call(null).resetMatrix()
};
quil.core.rotate = function() {
  var a = null, b = function(a) {
    return quil.core.current_surface.call(null).rotate(a)
  }, c = function(a, b, c, g) {
    return quil.core.current_surface.call(null).rotate(a, b, c, g)
  }, a = function(a, e, f, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 4:
        return c.call(this, a, e, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$4 = c;
  return a
}();
quil.core.rotate_x = function(a) {
  return quil.core.current_surface.call(null).rotateX(a)
};
quil.core.rotate_y = function(a) {
  return quil.core.current_surface.call(null).rotateY(a)
};
quil.core.rotate_z = function(a) {
  return quil.core.current_surface.call(null).rotateZ(a)
};
quil.core.round = function(a) {
  return PApplet.round.call(null, a)
};
quil.core.saturation = function(a) {
  return quil.core.current_surface.call(null).saturation(a | 0)
};
quil.core.save = function(a) {
  return quil.core.current_surface.call(null).save("" + cljs.core.str(a))
};
quil.core.save_frame = function() {
  var a = null, b = function() {
    return quil.core.current_applet.call(null).saveFrame()
  }, c = function(a) {
    return quil.core.current_applet.call(null).saveFrame("" + cljs.core.str(a))
  }, a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  return a
}();
quil.core.scale = function() {
  var a = null, b = function(a) {
    return quil.core.current_surface.call(null).scale(a)
  }, c = function(a, b) {
    return quil.core.current_surface.call(null).scale(a, b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
quil.core.screen_x = function(a, b, c) {
  return quil.core.current_surface.call(null).screenX(a, b, c)
};
quil.core.screen_y = function(a, b, c) {
  return quil.core.current_surface.call(null).screenY(a, b, c)
};
quil.core.screen_z = function(a, b, c) {
  return quil.core.current_surface.call(null).screenX(a, b, c)
};
quil.core.seconds = function() {
  return PApplet.second.call(null)
};
quil.core.set_pixel = function(a, b, c) {
  return quil.core.current_surface.call(null).set(a | 0, b | 0, c | 0)
};
quil.core.set_image = function(a, b, c) {
  return quil.core.current_surface.call(null).set(a | 0, b | 0, c)
};
quil.core.shape = function() {
  var a = null, b = function(a) {
    return quil.core.current_surface.call(null).shape(a)
  }, c = function(a, b, c) {
    return quil.core.current_surface.call(null).shape(a, b, c)
  }, d = function(a, b, c, d, i) {
    return quil.core.current_surface.call(null).shape(a, b, c, d, i)
  }, a = function(a, f, g, h, i) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 3:
        return c.call(this, a, f, g);
      case 5:
        return d.call(this, a, f, g, h, i)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$5 = d;
  return a
}();
quil.core.shear_x = function(a) {
  return quil.core.current_surface.call(null).shearX(a)
};
quil.core.shear_y = function(a) {
  return quil.core.current_surface.call(null).shearY(a)
};
quil.core.p_shape_modes = cljs.core.PersistentArrayMap.fromArray(["\ufdd0:corner", Processing.prototype.CORNER, "\ufdd0:corners", Processing.prototype.CORNERS, "\ufdd0:center", Processing.prototype.CENTER], !0);
quil.core.shape_mode = function(a) {
  a = quil.util.resolve_constant_key.call(null, a, quil.core.p_shape_modes);
  return quil.core.current_surface.call(null).shapeMode(a | 0)
};
quil.core.shininess = function(a) {
  return quil.core.current_surface.call(null).shininess(a)
};
quil.core.sin = function(a) {
  return quil.core._STAR_pjs_STAR_.sin(a)
};
quil.core.size = function() {
  var a = function() {
    cljs.core.println.call(null, "Deprecated - size should be specified as a :size key to applet or defapplet");
    return null
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
quil.core.smooth = function() {
  return quil.core.current_surface.call(null).smooth()
};
quil.core.specular = function() {
  var a = null, b = function(a) {
    return quil.core.current_surface.call(null).specular(a)
  }, c = function(a, b) {
    return quil.core.current_surface.call(null).specular(a, b)
  }, d = function(a, b, c) {
    return quil.core.current_surface.call(null).specular(a, b, c)
  }, e = function(a, b, c, d) {
    return quil.core.current_surface.call(null).specular(a, b, c, d)
  }, a = function(a, g, h, i) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, g);
      case 3:
        return d.call(this, a, g, h);
      case 4:
        return e.call(this, a, g, h, i)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$4 = e;
  return a
}();
quil.core.sphere = function(a) {
  return quil.core.current_surface.call(null).sphere(a)
};
quil.core.sphere_detail = function() {
  var a = null, b = function(a) {
    return quil.core.current_surface.call(null).sphereDetail(a | 0)
  }, c = function(a, b) {
    return quil.core.current_surface.call(null).sphereDetail(a | 0, b | 0)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
quil.core.spot_light = function() {
  var a = null, b = function(a, b, c, g, h) {
    var i = cljs.core.nth.call(null, a, 0, null), j = cljs.core.nth.call(null, a, 1, null), a = cljs.core.nth.call(null, a, 2, null), k = cljs.core.nth.call(null, b, 0, null), m = cljs.core.nth.call(null, b, 1, null), b = cljs.core.nth.call(null, b, 2, null), l = cljs.core.nth.call(null, c, 0, null), n = cljs.core.nth.call(null, c, 1, null), c = cljs.core.nth.call(null, c, 2, null);
    return quil.core.current_surface.call(null).spotLight(i, j, a, k, m, b, l, n, c, g, h)
  }, c = function(a, b, c, g, h, i, j, k, m, l, n) {
    return quil.core.current_surface.call(null).spotLight(a, b, c, g, h, i, j, k, m, l, n)
  }, a = function(a, e, f, g, h, i, j, k, m, l, n) {
    switch(arguments.length) {
      case 5:
        return b.call(this, a, e, f, g, h);
      case 11:
        return c.call(this, a, e, f, g, h, i, j, k, m, l, n)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$5 = b;
  a.cljs$core$IFn$_invoke$arity$11 = c;
  return a
}();
quil.core.sq = function(a) {
  return PApplet.sq.call(null, a)
};
quil.core.sqrt = function(a) {
  return PApplet.sqrt.call(null, a)
};
quil.core.stroke_float = function() {
  var a = null, b = function(a) {
    return quil.core.current_surface.call(null).stroke(a)
  }, c = function(a, b) {
    return quil.core.current_surface.call(null).stroke(a, b)
  }, d = function(a, b, c) {
    return quil.core.current_surface.call(null).stroke(a, b, c)
  }, e = function(a, b, c, d) {
    return quil.core.current_surface.call(null).stroke(a, b, c, d)
  }, a = function(a, g, h, i) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, g);
      case 3:
        return d.call(this, a, g, h);
      case 4:
        return e.call(this, a, g, h, i)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$4 = e;
  return a
}();
quil.core.stroke_int = function() {
  var a = null, b = function(a) {
    return quil.core.current_surface.call(null).stroke(a | 0)
  }, c = function(a, b) {
    return quil.core.current_surface.call(null).stroke(a | 0, b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
quil.core.stroke = function() {
  var a = null, b = function(a) {
    return cljs.core.truth_(quil.util.int_like_QMARK_.call(null, a)) ? quil.core.stroke_int.call(null, a) : quil.core.stroke_float.call(null, a)
  }, c = function(a, b) {
    return cljs.core.truth_(quil.util.int_like_QMARK_.call(null, a)) ? quil.core.stroke_int.call(null, a, b) : quil.core.stroke_float.call(null, a, b)
  }, d = function(a, b, c) {
    return quil.core.stroke_float.call(null, a, b, c)
  }, e = function(a, b, c, d) {
    return quil.core.stroke_float.call(null, a, b, c, d)
  }, a = function(a, g, h, i) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, g);
      case 3:
        return d.call(this, a, g, h);
      case 4:
        return e.call(this, a, g, h, i)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$4 = e;
  return a
}();
quil.core.stroke_cap_modes = cljs.core.PersistentArrayMap.fromArray(["\ufdd0:square", Processing.prototype.SQUARE, "\ufdd0:round", Processing.prototype.ROUND, "\ufdd0:project", Processing.prototype.PROJECT, "\ufdd0:model", Processing.prototype.MODEL], !0);
quil.core.stroke_cap = function(a) {
  a = quil.util.resolve_constant_key.call(null, a, quil.core.stroke_cap_modes);
  return quil.core.current_surface.call(null).strokeCap(a | 0)
};
quil.core.stroke_join_modes = cljs.core.PersistentArrayMap.fromArray(["\ufdd0:miter", Processing.prototype.MITER, "\ufdd0:bevel", Processing.prototype.BEVEL, "\ufdd0:round", Processing.prototype.ROUND], !0);
quil.core.stroke_join = function(a) {
  a = quil.util.resolve_constant_key.call(null, a, quil.core.stroke_join_modes);
  return quil.core.current_surface.call(null).strokeJoin(a | 0)
};
quil.core.stroke_weight = function(a) {
  return quil.core.current_surface.call(null).strokeWeight(a)
};
quil.core.tan = function(a) {
  return PApplet.tan.call(null, a)
};
quil.core.text_char = function() {
  var a = null, b = function(a) {
    return quil.core.current_surface.call(null).text(cljs.core.char$.call(null, a))
  }, c = function(a, b, c) {
    return quil.core.current_surface.call(null).text(cljs.core.char$.call(null, a), b, c)
  }, d = function(a, b, c, d) {
    return quil.core.current_surface.call(null).text(cljs.core.char$.call(null, a), b, c, d)
  }, a = function(a, f, g, h) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 3:
        return c.call(this, a, f, g);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  return a
}();
quil.core.text_num = function() {
  var a = null, b = function(a, b, c) {
    return quil.core.current_surface.call(null).text(a, b, c)
  }, c = function(a, b, c, g) {
    return quil.core.current_surface.call(null).text(a, b, c, g)
  }, a = function(a, e, f, g) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, e, f);
      case 4:
        return c.call(this, a, e, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$4 = c;
  return a
}();
quil.core.text = function() {
  var a = null, b = function(a) {
    return quil.core.current_surface.call(null).text(a)
  }, c = function(a, b, c) {
    return quil.core.current_surface.call(null).text(a, b, c)
  }, d = function(a, b, c, d) {
    return quil.core.current_surface.call(null).text(a, b, c, d)
  }, e = function(a, b, c, d, e) {
    return quil.core.current_surface.call(null).text(a, b, c, d, e)
  }, f = function(a, b, c, d, e, f) {
    return quil.core.current_surface.call(null).text(a, b, c, d, e, f)
  }, a = function(a, h, i, j, k, m) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 3:
        return c.call(this, a, h, i);
      case 4:
        return d.call(this, a, h, i, j);
      case 5:
        return e.call(this, a, h, i, j, k);
      case 6:
        return f.call(this, a, h, i, j, k, m)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  a.cljs$core$IFn$_invoke$arity$5 = e;
  a.cljs$core$IFn$_invoke$arity$6 = f;
  return a
}();
quil.core.horizontal_alignment_modes = cljs.core.PersistentArrayMap.fromArray(["\ufdd0:left", Processing.prototype.LEFT, "\ufdd0:center", Processing.prototype.CENTER, "\ufdd0:right", Processing.prototype.RIGHT], !0);
quil.core.vertical_alignment_modes = cljs.core.PersistentArrayMap.fromArray(["\ufdd0:top", Processing.prototype.TOP, "\ufdd0:bottom", Processing.prototype.BOTTOM, "\ufdd0:center", Processing.prototype.CENTER, "\ufdd0:baseline", Processing.prototype.BASELINE], !0);
quil.core.text_align = function() {
  var a = null, b = function(a) {
    a = quil.util.resolve_constant_key.call(null, a, quil.core.horizontal_alignment_modes);
    return quil.core.current_surface.call(null).textAlign(a | 0)
  }, c = function(a, b) {
    var c = quil.util.resolve_constant_key.call(null, a, quil.core.horizontal_alignment_modes), g = quil.util.resolve_constant_key.call(null, b, quil.core.vertical_alignment_modes);
    return quil.core.current_surface.call(null).textAlign(c | 0, g | 0)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
quil.core.text_ascent = function() {
  return quil.core.current_surface.call(null).textAscent()
};
quil.core.text_descent = function() {
  return quil.core.current_surface.call(null).textDescent()
};
quil.core.text_font = function() {
  var a = null, b = function(a) {
    return quil.core.current_surface.call(null).textFont(a)
  }, c = function(a, b) {
    return quil.core.current_surface.call(null).textFont(a, b | 0)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
quil.core.text_leading = function(a) {
  return quil.core.current_surface.call(null).textLeading(a)
};
quil.core.text_modes = cljs.core.PersistentArrayMap.fromArray(["\ufdd0:model", Processing.prototype.MODEL, "\ufdd0:shape", Processing.prototype.SHAPE, "\ufdd0:screen", Processing.prototype.SCREEN], !0);
quil.core.text_mode = function(a) {
  a = quil.util.resolve_constant_key.call(null, a, quil.core.text_modes);
  return quil.core.current_surface.call(null).textMode(a | 0)
};
quil.core.text_size = function(a) {
  return quil.core.current_surface.call(null).textSize(a)
};
quil.core.texture = function(a) {
  return quil.core.current_surface.call(null).texture(a)
};
quil.core.texture_modes = cljs.core.PersistentArrayMap.fromArray(["\ufdd0:image", Processing.prototype.IMAGE, "\ufdd0:normalized", Processing.prototype.NORMALIZED], !0);
quil.core.texture_mode = function(a) {
  a = quil.util.resolve_constant_key.call(null, a, quil.core.texture_modes);
  return quil.core.current_surface.call(null).textureMode(a | 0)
};
quil.core.text_width = function(a) {
  a = cljs.core._EQ_.call(null, quil.core.class$.call(null, a), quil.core.class$.call(null, "a")) ? cljs.core.char$.call(null, a) : "" + cljs.core.str(a);
  return quil.core.current_surface.call(null).textWidth(a)
};
quil.core.tint_float = function() {
  var a = null, b = function(a) {
    return quil.core.current_surface.call(null).tint(a)
  }, c = function(a, b) {
    return quil.core.current_surface.call(null).tint(a, b)
  }, d = function(a, b, c) {
    return quil.core.current_surface.call(null).tint(a, b, c)
  }, e = function(a, b, c, d) {
    return quil.core.current_surface.call(null).tint(b, b, c, d)
  }, a = function(a, g, h, i) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, g);
      case 3:
        return d.call(this, a, g, h);
      case 4:
        return e.call(this, a, g, h, i)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$4 = e;
  return a
}();
quil.core.tint_int = function() {
  var a = null, b = function(a) {
    return quil.core.current_surface.call(null).tint(a | 0)
  }, c = function(a, b) {
    return quil.core.current_surface.call(null).tint(a | 0, b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
quil.core.tint = function() {
  var a = null, b = function(a) {
    return cljs.core.truth_(quil.util.int_like_QMARK_.call(null, a)) ? quil.core.tint_int.call(null, a) : quil.core.tint_float.call(null, a)
  }, c = function(a, b) {
    return cljs.core.truth_(quil.util.int_like_QMARK_.call(null, a)) ? quil.core.tint_int.call(null, a, b) : quil.core.tint_float.call(null, a, b)
  }, d = function(a, b, c) {
    return quil.core.tint_float.call(null, a, b, c)
  }, e = function(a, b, c, d) {
    return quil.core.tint_float.call(null, a, b, c, d)
  }, a = function(a, g, h, i) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, g);
      case 3:
        return d.call(this, a, g, h);
      case 4:
        return e.call(this, a, g, h, i)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$4 = e;
  return a
}();
quil.core.translate = function() {
  var a = null, b = function(b) {
    return cljs.core.apply.call(null, a, b)
  }, c = function(a, b) {
    return quil.core.current_surface.call(null).translate(a, b)
  }, d = function(a, b, c) {
    return quil.core.current_surface.call(null).translate(a, b, c)
  }, a = function(a, f, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, f);
      case 3:
        return d.call(this, a, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  return a
}();
quil.core.triangle = function(a, b, c, d, e, f) {
  return quil.core.current_surface.call(null).triangle(a, b, c, d, e, f)
};
quil.core.update_pixels = function() {
  return quil.core.current_surface.call(null).updatePixels()
};
quil.core.vertex = function() {
  var a = null, b = function(a, b) {
    return quil.core.current_surface.call(null).vertex(a, b)
  }, c = function(a, b, c) {
    return quil.core.current_surface.call(null).vertex(a, b, c)
  }, d = function(a, b, c, d) {
    return quil.core.current_surface.call(null).vertex(a, b, c, d)
  }, e = function(a, b, c, d, e) {
    return quil.core.current_surface.call(null).vertex(a, b, c, d, e)
  }, a = function(a, g, h, i, j) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, g);
      case 3:
        return c.call(this, a, g, h);
      case 4:
        return d.call(this, a, g, h, i);
      case 5:
        return e.call(this, a, g, h, i, j)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  a.cljs$core$IFn$_invoke$arity$5 = e;
  return a
}();
quil.core.year = function() {
  return PApplet.year.call(null)
};
quil.core.width = function() {
  return quil.core._STAR_pjs_STAR_.width
};
quil.core.quil_version = function() {
  return quil.version.QUIL_VERSION_STR
};
quil.core.PI = Math.PI;
quil.core.HALF_PI = quil.core.PI / 2;
quil.core.THIRD_PI = quil.core.PI / 3;
quil.core.QUARTER_PI = quil.core.PI / 4;
quil.core.TWO_PI = 2 * quil.core.PI;
quil.core.DEG_TO_RAD = quil.core.PI / 180;
quil.core.RAD_TO_DEG = 180 / quil.core.PI;
quil.core.defsketch_old = function() {
  var a = function(a, b) {
    var e = document.getElementById(a);
    if(cljs.core.truth_(e)) {
      var e = cljs.core.apply.call(null, cljs.core.hash_map, b), f = cljs.core.seq_QMARK_.call(null, e) ? cljs.core.apply.call(null, cljs.core.hash_map, e) : e, g = cljs.core.get.call(null, f, "\ufdd0:renderer"), h = cljs.core.get.call(null, f, "\ufdd0:size"), e = cljs.core.get.call(null, f, "\ufdd0:draw"), i = cljs.core.get.call(null, f, "\ufdd0:setup");
      cljs.core.get.call(null, f, "\ufdd0:title");
      var j = cljs.core.nth.call(null, h, 0, null), k = cljs.core.nth.call(null, h, 1, null), m = cljs.core.atom.call(null, null), f = document.getElementById(a), l = new Processing(f), n = cljs.core.truth_(e) ? e : function() {
        return null
      };
      l.setup = function() {
        var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
        try {
          return quil.core._STAR_pjs_STAR_ = l, quil.core._STAR_state_STAR_ = m, cljs.core._EQ_.call(null, "\ufdd0:p3d", g) ? l.size(j, k, l.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", g) ? l.size(j, k, l.OPENGL) : l.size(j, k), i.call(null), l.loop()
        }finally {
          quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
        }
      };
      l.draw = function() {
        var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
        try {
          return quil.core._STAR_pjs_STAR_ = l, quil.core._STAR_state_STAR_ = m, n.call(null)
        }finally {
          quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
        }
      };
      return l.setup()
    }
    return console.log("No canvas element with id : ", a)
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
quil.core.key_coded_QMARK_ = function(a) {
  return cljs.core._EQ_.call(null, PConstants.CODED, a | 0)
};
quil.core.KEY_CODES = cljs.core.ObjMap.EMPTY;
quil.core.key_as_keyword = function() {
  var a = quil.core.raw_key.call(null), b = quil.core.key_code.call(null);
  return cljs.core.truth_(quil.core.key_coded_QMARK_.call(null, a)) ? cljs.core.get.call(null, quil.core.KEY_CODES, b, "\ufdd0:unknown-key") : cljs.core.keyword.call(null, "" + cljs.core.str(a))
};
quil.core.debug = function() {
  var a = null, b = function(b) {
    return a.call(null, b, 300)
  }, c = function(a, b) {
    cljs.core.println.call(null, a);
    return Thread.sleep.call(null, b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
quil.examples = {};
quil.examples.sl = {};
quil.examples.sl.drum_machine = {};
quil.examples.sl.drum_machine.step_count = cljs.core.atom.call(null, 1);
quil.examples.sl.drum_machine.tick = cljs.core.atom.call(null, 0);
quil.examples.sl.drum_machine.fr = cljs.core.atom.call(null, 20);
quil.examples.sl.drum_machine.bpm = cljs.core.atom.call(null, 90);
quil.examples.sl.drum_machine.step_ratio = cljs.core.atom.call(null, cljs.core.deref.call(null, quil.examples.sl.drum_machine.fr) / (cljs.core.deref.call(null, quil.examples.sl.drum_machine.bpm) / 60));
quil.examples.sl.drum_machine.pad_size = 80;
quil.examples.sl.drum_machine.corner_radius = 8;
quil.examples.sl.drum_machine.set_BPM = function(a) {
  return cljs.core.reset_BANG_.call(null, quil.examples.sl.drum_machine.bpm, 60 > a ? 60 : 240 < a ? 240 : a)
};
quil.examples.sl.drum_machine.draw_pad = function(a, b, c) {
  quil.core.fill.call(null, 255);
  quil.core.rect.call(null, a, b, quil.examples.sl.drum_machine.pad_size, quil.examples.sl.drum_machine.pad_size, quil.examples.sl.drum_machine.corner_radius);
  quil.core.fill.call(null, 1, 255);
  cljs.core._EQ_.call(null, c, cljs.core.deref.call(null, quil.examples.sl.drum_machine.step_count)) ? quil.core.fill.call(null, 253, 253, 150) : quil.core.fill.call(null, 128);
  return quil.core.rect.call(null, a + 5, b + 5, quil.examples.sl.drum_machine.pad_size - 10, quil.examples.sl.drum_machine.pad_size - 10, quil.examples.sl.drum_machine.corner_radius)
};
quil.examples.sl.drum_machine.draw_pads = function() {
  for(var a = cljs.core.seq.call(null, cljs.core.range.call(null, 1, 9)), b = null, c = 0, d = 0;;) {
    if(d < c) {
      var e = cljs.core._nth.call(null, b, d);
      quil.examples.sl.drum_machine.draw_pad.call(null, 10 + 90 * (e - 1), 280, e);
      quil.examples.sl.drum_machine.draw_pad.call(null, 10 + 90 * (e - 1), 380, 10 + e);
      d += 1
    }else {
      if(a = cljs.core.seq.call(null, a)) {
        b = a, cljs.core.chunked_seq_QMARK_.call(null, b) ? (a = cljs.core.chunk_first.call(null, b), c = cljs.core.chunk_rest.call(null, b), b = a, e = cljs.core.count.call(null, a), a = c, c = e) : (e = cljs.core.first.call(null, b), quil.examples.sl.drum_machine.draw_pad.call(null, 10 + 90 * (e - 1), 280, e), quil.examples.sl.drum_machine.draw_pad.call(null, 10 + 90 * (e - 1), 380, 10 + e), a = cljs.core.next.call(null, b), b = null, c = 0), d = 0
      }else {
        return null
      }
    }
  }
};
quil.examples.sl.drum_machine.static_text = function() {
  quil.core.text_font.call(null, quil.core.create_font.call(null, "monospace", 24));
  quil.core.fill.call(null, 255);
  quil.core.text.call(null, "Simple Drum Sequencer", 10, 50);
  quil.core.text_font.call(null, quil.core.create_font.call(null, "monospace", 18));
  quil.core.text.call(null, "Creative Programming for Digital Media", 10, 100);
  quil.core.text.call(null, "Coursera - Assignment 1", 10, 130);
  return quil.core.text.call(null, "BPM : ", 10, 550)
};
quil.examples.sl.drum_machine.setup = function() {
  quil.core.smooth.call(null);
  quil.core.background.call(null, 0);
  return quil.examples.sl.drum_machine.static_text.call(null)
};
quil.examples.sl.drum_machine.draw = function() {
  return quil.examples.sl.drum_machine.draw_pads.call(null)
};
var temp__4090__auto___25165 = document.getElementById("drum-machine");
if(cljs.core.truth_(temp__4090__auto___25165)) {
  var canvas__3573__auto___25166 = temp__4090__auto___25165, state__3574__auto___25167 = cljs.core.atom.call(null, null), pjs__3575__auto___25168 = new Processing(canvas__3573__auto___25166), binding_fn__3576__auto___25169 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___25167, pjs__3575__auto___25168), draw__3578__auto___25170 = cljs.core.truth_(quil.examples.sl.drum_machine.draw) ? quil.examples.sl.drum_machine.draw : function() {
    return function() {
      return null
    }
  }(state__3574__auto___25167, pjs__3575__auto___25168, binding_fn__3576__auto___25169), mouse_moved__3579__auto___25171 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___25167, pjs__3575__auto___25168, binding_fn__3576__auto___25169, draw__3578__auto___25170), key_typed__3580__auto___25172 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___25167, pjs__3575__auto___25168, binding_fn__3576__auto___25169, draw__3578__auto___25170, mouse_moved__3579__auto___25171);
  pjs__3575__auto___25168.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___25168, quil.core._STAR_state_STAR_ = state__3574__auto___25167, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___25168.size(800, 600, pjs__3575__auto___25168.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___25168.size(800, 600, pjs__3575__auto___25168.OPENGL) : pjs__3575__auto___25168.size(800, 600), quil.examples.sl.drum_machine.setup.call(null), pjs__3575__auto___25168.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___25168.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___25168, quil.core._STAR_state_STAR_ = state__3574__auto___25167, draw__3578__auto___25170.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___25168.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___25168, quil.core._STAR_state_STAR_ = state__3574__auto___25167, key_typed__3580__auto___25172.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___25168.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___25168, quil.core._STAR_state_STAR_ = state__3574__auto___25167, mouse_moved__3579__auto___25171.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___25168.setup()
}else {
  console.log("No canvas element with id : ", "drum-machine")
}
;quil.helpers = {};
quil.helpers.calc = {};
quil.helpers.calc.mul_add = function mul_add(b, c, d) {
  var e;
  if(e = "number" === typeof c) {
    e = (e = "number" === typeof d) ? "number" === typeof b : e
  }
  if(e) {
    return d + c * b
  }
  var c = cljs.core.sequential_QMARK_.call(null, c) ? cljs.core.PersistentVector.fromArray([cljs.core.first.call(null, c), cljs.core.next.call(null, c)], !0) : cljs.core.PersistentVector.fromArray([c, c], !0), f = cljs.core.nth.call(null, c, 0, null), g = cljs.core.nth.call(null, c, 1, null), d = cljs.core.sequential_QMARK_.call(null, d) ? cljs.core.PersistentVector.fromArray([cljs.core.first.call(null, d), cljs.core.next.call(null, d)], !0) : cljs.core.PersistentVector.fromArray([d, d], !0), h = 
  cljs.core.nth.call(null, d, 0, null), i = cljs.core.nth.call(null, d, 1, null), b = cljs.core.sequential_QMARK_.call(null, b) ? cljs.core.PersistentVector.fromArray([cljs.core.first.call(null, b), cljs.core.next.call(null, b)], !0) : cljs.core.PersistentVector.fromArray([b, b], !0), j = cljs.core.nth.call(null, b, 0, null), k = cljs.core.nth.call(null, b, 1, null);
  return new cljs.core.LazySeq(null, !1, function() {
    return cljs.core.cons.call(null, h + f * j, cljs.core.truth_(cljs.core.truth_(g) ? cljs.core.truth_(i) ? k : i : g) ? mul_add.call(null, k, g, i) : cljs.core.PersistentVector.EMPTY)
  }, null)
};
quil.helpers.calc.mod_range = function(a, b, c) {
  if(b > c) {
    throw Error([cljs.core.str("Error in mod-range: min is greater than max (> "), cljs.core.str(b), cljs.core.str(" "), cljs.core.str(c), cljs.core.str(")")].join(""));
  }
  if(0 > b) {
    return b *= -1, a = cljs.core.mod.call(null, a, c + b), a - b
  }
  a = cljs.core.mod.call(null, a, c - b);
  return a + b
};
quil.helpers.seqs = {};
quil.helpers.seqs.range_incl = function() {
  var a = null, b = function() {
    return a.call(null, 0, Double.POSITIVE_INFINITY)
  }, c = function(b) {
    return a.call(null, 0, b)
  }, d = function(b, c) {
    return b < c ? a.call(null, b, c, 1) : a.call(null, b, c, -1)
  }, e = function(b, c, d) {
    return new cljs.core.LazySeq(null, !1, function() {
      for(var e = cljs.core.chunk_buffer.call(null, 32), j = 0 < d ? cljs.core._LT__EQ_ : cljs.core._GT__EQ_, k = b;;) {
        if(cljs.core.truth_(function() {
          var a = 32 > cljs.core.count.call(null, e);
          return a ? j.call(null, k, c) : a
        }())) {
          cljs.core.chunk_append.call(null, e, k), k += d
        }else {
          return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, e), cljs.core.truth_(j.call(null, k, c)) ? a.call(null, k, c, d) : null)
        }
      }
    }, null)
  }, a = function(a, g, h) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a);
      case 2:
        return d.call(this, a, g);
      case 3:
        return e.call(this, a, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  a.cljs$core$IFn$_invoke$arity$2 = d;
  a.cljs$core$IFn$_invoke$arity$3 = e;
  return a
}();
quil.helpers.seqs.indexed_range_incl = function() {
  var a = null, b = function() {
    return a.call(null, 0, Double.POSITIVE_INFINITY)
  }, c = function(b) {
    return a.call(null, 0, b)
  }, d = function(b, c) {
    return b < c ? a.call(null, b, c, 1) : a.call(null, b, c, -1)
  }, e = function(a, b, c) {
    return cljs.core.map.call(null, cljs.core.list, cljs.core.range.call(null), quil.helpers.seqs.range_incl.call(null, a, b, c))
  }, a = function(a, g, h) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a);
      case 2:
        return d.call(this, a, g);
      case 3:
        return e.call(this, a, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  a.cljs$core$IFn$_invoke$arity$2 = d;
  a.cljs$core$IFn$_invoke$arity$3 = e;
  return a
}();
quil.helpers.seqs.indexed_range = function() {
  var a = null, b = function() {
    return a.call(null, 0, Double.POSITIVE_INFINITY)
  }, c = function(b) {
    return a.call(null, 0, b)
  }, d = function(b, c) {
    return b < c ? a.call(null, b, c, 1) : a.call(null, b, c, -1)
  }, e = function(a, b, c) {
    return cljs.core.map.call(null, cljs.core.list, cljs.core.range.call(null), cljs.core.range.call(null, a, b, c))
  }, a = function(a, g, h) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a);
      case 2:
        return d.call(this, a, g);
      case 3:
        return e.call(this, a, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  a.cljs$core$IFn$_invoke$arity$2 = d;
  a.cljs$core$IFn$_invoke$arity$3 = e;
  return a
}();
quil.helpers.seqs.steps = function() {
  var a = null, b = function() {
    return a.call(null, 1)
  }, c = function(b) {
    return a.call(null, 0, b)
  }, d = function(b, c) {
    var d = cljs.core.sequential_QMARK_.call(null, c) ? cljs.core.PersistentVector.fromArray([cljs.core.first.call(null, c), cljs.core.next.call(null, c)], !0) : cljs.core.PersistentVector.fromArray([c, c], !0), h = cljs.core.nth.call(null, d, 0, null), i = cljs.core.nth.call(null, d, 1, null);
    return new cljs.core.LazySeq(null, !1, function() {
      return cljs.core.cons.call(null, b, cljs.core.truth_(i) ? a.call(null, h + b, i) : cljs.core.PersistentVector.fromArray([h + b], !0))
    }, null)
  }, a = function(a, f) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a);
      case 2:
        return d.call(this, a, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  a.cljs$core$IFn$_invoke$arity$2 = d;
  return a
}();
quil.helpers.seqs.cycle_between = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, b, c, 1, 1)
  }, c = function(b, c, d) {
    return a.call(null, b, b, c, d, d)
  }, d = function(b, c, d, e) {
    return a.call(null, b, b, c, d, e)
  }, e = function(b, c, d, e, f) {
    return a.call(null, b, c, d, e, f, "\ufdd0:up")
  }, f = function(b, c, d, e, f, m) {
    var l = 0 > e ? -1 * e : e, n = 0 > f ? -1 * f : f, e = cljs.core._EQ_.call(null, "\ufdd0:up", m) ? b + l : b - n, m = cljs.core._EQ_.call(null, "\ufdd0:up", m) ? e > d ? cljs.core.PersistentVector.fromArray([b - n, "\ufdd0:down"], !0) : cljs.core.PersistentVector.fromArray([e, "\ufdd0:up"], !0) : e < c ? cljs.core.PersistentVector.fromArray([b + l, "\ufdd0:up"], !0) : cljs.core.PersistentVector.fromArray([e, "\ufdd0:down"], !0), p = cljs.core.nth.call(null, m, 0, null), q = cljs.core.nth.call(null, 
    m, 1, null);
    return new cljs.core.LazySeq(null, !1, function() {
      return cljs.core.cons.call(null, b, a.call(null, p, c, d, l, n, q))
    }, null)
  }, a = function(a, h, i, j, k, m) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, h);
      case 3:
        return c.call(this, a, h, i);
      case 4:
        return d.call(this, a, h, i, j);
      case 5:
        return e.call(this, a, h, i, j, k);
      case 6:
        return f.call(this, a, h, i, j, k, m)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  a.cljs$core$IFn$_invoke$arity$5 = e;
  a.cljs$core$IFn$_invoke$arity$6 = f;
  return a
}();
quil.helpers.seqs.tap = function() {
  var a = null, b = function(b) {
    return a.call(null, "--\>", b)
  }, c = function(a, b) {
    return cljs.core.map.call(null, function(b) {
      cljs.core.println.call(null, [cljs.core.str(a), cljs.core.str(" "), cljs.core.str(b)].join(""));
      return b
    }, b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
quil.helpers.seqs.swap_returning_prev_BANG_ = function() {
  var a = function(a, b, e) {
    for(;;) {
      var f = cljs.core.deref.call(null, a), g = cljs.core.apply.call(null, b, cljs.core.cons.call(null, f, e)), h = cljs.core.compare_and_set_BANG_.call(null, a, f, g);
      if(cljs.core.truth_(h)) {
        return cljs.core.PersistentVector.fromArray([f, g], !0)
      }
    }
  }, b = function(b, d, e) {
    var f = null;
    2 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.next(b), e = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, e, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
quil.helpers.seqs.seq__GT_stream = function(a) {
  var b = cljs.core.atom.call(null, cljs.core.seq.call(null, a));
  return function() {
    var a = quil.helpers.seqs.swap_returning_prev_BANG_.call(null, b, cljs.core.rest), d = cljs.core.nth.call(null, a, 0, null);
    cljs.core.nth.call(null, a, 1, null);
    return cljs.core.first.call(null, d)
  }
};
quil.helpers.seqs.tally = function() {
  var a = null, b = function(b) {
    return a.call(null, b, 0)
  }, c = function(b, c) {
    return new cljs.core.LazySeq(null, !1, function() {
      var f = cljs.core.first.call(null, b) + c, g = cljs.core.next.call(null, b);
      return cljs.core.cons.call(null, f, g ? a.call(null, g, f) : cljs.core.PersistentVector.EMPTY)
    }, null)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
quil.helpers.seqs.perlin_noise_seq = function perlin_noise_seq(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    return cljs.core.cons.call(null, quil.core.noise.call(null, b), perlin_noise_seq.call(null, b + c, c))
  }, null)
};
quil.examples.gen_art = {};
quil.examples.gen_art.wave_clock = {};
quil.examples.gen_art.wave_clock.mk_lines_stream = function() {
  var a = quil.core.width.call(null) / 2, b = quil.core.height.call(null) / 2, c = quil.helpers.seqs.steps.call(null, quil.core.random.call(null, 10), 0.005), d = quil.helpers.seqs.steps.call(null, quil.core.random.call(null, 10), 0.005), e = quil.helpers.seqs.steps.call(null, quil.core.random.call(null, 10), 0.01), e = cljs.core.map.call(null, quil.core.noise, e), f = quil.helpers.seqs.steps.call(null, quil.core.random.call(null, 10), 0.01), f = cljs.core.map.call(null, quil.core.noise, f), d = 
  cljs.core.map.call(null, quil.core.noise, d), d = quil.helpers.calc.mul_add.call(null, d, 6, -3), d = quil.helpers.seqs.steps.call(null, -(quil.core.PI / 2), d), d = cljs.core.map.call(null, function(a) {
    return cljs.core.mod.call(null, a, 360)
  }, d), d = cljs.core.map.call(null, quil.core.radians, d), a = quil.helpers.calc.mul_add.call(null, e, 100, a - 50), b = quil.helpers.calc.mul_add.call(null, f, 100, b - 50), c = cljs.core.map.call(null, quil.core.noise, c), c = quil.helpers.calc.mul_add.call(null, c, 550, 1), g = cljs.core.map.call(null, quil.core.cos, d), e = cljs.core.map.call(null, quil.core.sin, d), d = cljs.core.map.call(null, function(a) {
    return quil.core.PI + a
  }, d), f = cljs.core.map.call(null, quil.core.cos, d), d = cljs.core.map.call(null, quil.core.sin, d), g = quil.helpers.calc.mul_add.call(null, g, c, a), e = quil.helpers.calc.mul_add.call(null, e, c, b), a = quil.helpers.calc.mul_add.call(null, f, c, a), c = quil.helpers.calc.mul_add.call(null, d, c, b), c = cljs.core.map.call(null, cljs.core.list, g, e, a, c);
  return quil.helpers.seqs.seq__GT_stream.call(null, c)
};
quil.examples.gen_art.wave_clock.mk_cols_stream = function() {
  var a = quil.helpers.seqs.cycle_between.call(null, 0, 255);
  return quil.helpers.seqs.seq__GT_stream.call(null, a)
};
quil.examples.gen_art.wave_clock.setup = function() {
  quil.core.smooth.call(null);
  quil.core.frame_rate.call(null, 30);
  quil.core.background.call(null, 255);
  quil.core.no_fill.call(null);
  quil.core.stroke_weight.call(null, 3);
  return quil.core.set_state_BANG_.call(null, "\ufdd0:lines-str", quil.examples.gen_art.wave_clock.mk_lines_stream.call(null), "\ufdd0:cols-str", quil.examples.gen_art.wave_clock.mk_cols_stream.call(null))
};
quil.examples.gen_art.wave_clock.draw = function() {
  var a = quil.core.state.call(null, "\ufdd0:lines-str"), b = quil.core.state.call(null, "\ufdd0:cols-str"), a = a.call(null), b = b.call(null);
  quil.core.stroke.call(null, b, 60);
  return cljs.core.apply.call(null, quil.core.line, a)
};
var temp__4090__auto___5033 = document.getElementById("gen-art-19");
if(cljs.core.truth_(temp__4090__auto___5033)) {
  var canvas__3573__auto___5034 = temp__4090__auto___5033, state__3574__auto___5035 = cljs.core.atom.call(null, null), pjs__3575__auto___5036 = new Processing(canvas__3573__auto___5034), binding_fn__3576__auto___5037 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___5035, pjs__3575__auto___5036), draw__3578__auto___5038 = cljs.core.truth_(quil.examples.gen_art.wave_clock.draw) ? quil.examples.gen_art.wave_clock.draw : function() {
    return function() {
      return null
    }
  }(state__3574__auto___5035, pjs__3575__auto___5036, binding_fn__3576__auto___5037), mouse_moved__3579__auto___5039 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___5035, pjs__3575__auto___5036, binding_fn__3576__auto___5037, draw__3578__auto___5038), key_typed__3580__auto___5040 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___5035, pjs__3575__auto___5036, binding_fn__3576__auto___5037, draw__3578__auto___5038, mouse_moved__3579__auto___5039);
  pjs__3575__auto___5036.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___5036, quil.core._STAR_state_STAR_ = state__3574__auto___5035, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___5036.size(500, 300, pjs__3575__auto___5036.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___5036.size(500, 300, pjs__3575__auto___5036.OPENGL) : pjs__3575__auto___5036.size(500, 300), quil.examples.gen_art.wave_clock.setup.call(null), pjs__3575__auto___5036.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___5036.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___5036, quil.core._STAR_state_STAR_ = state__3574__auto___5035, draw__3578__auto___5038.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___5036.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___5036, quil.core._STAR_state_STAR_ = state__3574__auto___5035, key_typed__3580__auto___5040.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___5036.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___5036, quil.core._STAR_state_STAR_ = state__3574__auto___5035, mouse_moved__3579__auto___5039.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___5036.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-19")
}
;quil.helpers.drawing = {};
quil.helpers.drawing.line_join_points = function() {
  var a = null, b = function(b) {
    return new cljs.core.LazySeq(null, !1, function() {
      var c = cljs.core.take.call(null, 2, b);
      return cljs.core._EQ_.call(null, 2, cljs.core.count.call(null, c)) ? cljs.core.cons.call(null, cljs.core.apply.call(null, cljs.core.concat, c), a.call(null, cljs.core.drop.call(null, 1, b))) : null
    }, null)
  }, c = function(b, c) {
    return new cljs.core.LazySeq(null, !1, function() {
      var d;
      d = (d = cljs.core.next.call(null, b)) ? cljs.core.next.call(null, c) : d;
      return d ? cljs.core.cons.call(null, cljs.core.PersistentVector.fromArray([cljs.core.first.call(null, b), cljs.core.first.call(null, c), cljs.core.second.call(null, b), cljs.core.second.call(null, c)], !0), a.call(null, cljs.core.next.call(null, b), cljs.core.next.call(null, c))) : cljs.core.PersistentVector.EMPTY
    }, null)
  }, d = function(b, c, d) {
    return new cljs.core.LazySeq(null, !1, function() {
      var h;
      if(h = cljs.core.next.call(null, b)) {
        h = (h = cljs.core.next.call(null, c)) ? cljs.core.next.call(null, d) : h
      }
      return h ? cljs.core.cons.call(null, cljs.core.PersistentVector.fromArray([cljs.core.first.call(null, b), cljs.core.first.call(null, c), cljs.core.first.call(null, d), cljs.core.second.call(null, b), cljs.core.second.call(null, c), cljs.core.second.call(null, d)], !0), a.call(null, cljs.core.next.call(null, b), cljs.core.next.call(null, c), cljs.core.next.call(null, d))) : cljs.core.PersistentVector.EMPTY
    }, null)
  }, a = function(a, f, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, f);
      case 3:
        return d.call(this, a, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  return a
}();
quil.examples.gen_art.rand_walk_scribble = {};
quil.examples.gen_art.rand_walk_scribble.rand_walk_ys = function rand_walk_ys(b) {
  return new cljs.core.LazySeq(null, !1, function() {
    return cljs.core.cons.call(null, b, rand_walk_ys.call(null, b + (cljs.core.rand.call(null, 20) - 10)))
  }, null)
};
quil.examples.gen_art.rand_walk_scribble.setup = function() {
  quil.core.background.call(null, 255);
  quil.core.stroke_weight.call(null, 5);
  quil.core.smooth.call(null);
  quil.core.stroke.call(null, 0, 30);
  quil.core.line.call(null, 20, 50, 480, 50);
  quil.core.stroke.call(null, 20, 50, 70);
  var a = quil.helpers.seqs.range_incl.call(null, 20, quil.core.width.call(null) - 20, 10), b = quil.examples.gen_art.rand_walk_scribble.rand_walk_ys.call(null, quil.core.height.call(null) / 2), a = quil.helpers.drawing.line_join_points.call(null, a, b);
  return cljs.core.dorun.call(null, cljs.core.map.call(null, function(a) {
    return cljs.core.apply.call(null, quil.core.line, a)
  }, a))
};
var temp__4090__auto___4979 = document.getElementById("gen-art-6");
if(cljs.core.truth_(temp__4090__auto___4979)) {
  var canvas__3573__auto___4980 = temp__4090__auto___4979, state__3574__auto___4981 = cljs.core.atom.call(null, null), pjs__3575__auto___4982 = new Processing(canvas__3573__auto___4980), binding_fn__3576__auto___4983 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___4981, pjs__3575__auto___4982), draw__3578__auto___4984 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4981, pjs__3575__auto___4982, binding_fn__3576__auto___4983), mouse_moved__3579__auto___4985 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4981, pjs__3575__auto___4982, binding_fn__3576__auto___4983, draw__3578__auto___4984), key_typed__3580__auto___4986 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4981, pjs__3575__auto___4982, binding_fn__3576__auto___4983, draw__3578__auto___4984, mouse_moved__3579__auto___4985);
  pjs__3575__auto___4982.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4982, quil.core._STAR_state_STAR_ = state__3574__auto___4981, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___4982.size(500, 100, pjs__3575__auto___4982.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___4982.size(500, 100, pjs__3575__auto___4982.OPENGL) : pjs__3575__auto___4982.size(500, 100), quil.examples.gen_art.rand_walk_scribble.setup.call(null), pjs__3575__auto___4982.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4982.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4982, quil.core._STAR_state_STAR_ = state__3574__auto___4981, draw__3578__auto___4984.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4982.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4982, quil.core._STAR_state_STAR_ = state__3574__auto___4981, key_typed__3580__auto___4986.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4982.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4982, quil.core._STAR_state_STAR_ = state__3574__auto___4981, mouse_moved__3579__auto___4985.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4982.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-6")
}
;quil.examples.gen_art.spiral_sphere = {};
quil.examples.gen_art.spiral_sphere.radius = 100;
quil.examples.gen_art.spiral_sphere.setup = function() {
  quil.core.background.call(null, 255);
  return quil.core.stroke.call(null, 0)
};
quil.examples.gen_art.spiral_sphere.draw = function() {
  quil.core.background.call(null, 255);
  quil.core.translate.call(null, quil.core.width.call(null) / 2, quil.core.height.call(null) / 2, 0);
  quil.core.rotate_y.call(null, 0.03 * quil.core.frame_count.call(null));
  quil.core.rotate_x.call(null, 0.04 * quil.core.frame_count.call(null));
  var a;
  a = function c(a) {
    return new cljs.core.LazySeq(null, !1, function() {
      for(;;) {
        var e = cljs.core.seq.call(null, a);
        if(e) {
          if(cljs.core.chunked_seq_QMARK_.call(null, e)) {
            var f = cljs.core.chunk_first.call(null, e), g = cljs.core.count.call(null, f), h = cljs.core.chunk_buffer.call(null, g);
            return function() {
              for(var a = 0;;) {
                if(a < g) {
                  var c = cljs.core._nth.call(null, f, a);
                  cljs.core.chunk_append.call(null, h, function() {
                    var a = quil.core.radians.call(null, 18 * c), d = quil.core.radians.call(null, c), e = quil.examples.gen_art.spiral_sphere.radius * quil.core.cos.call(null, a) * quil.core.sin.call(null, d), a = quil.examples.gen_art.spiral_sphere.radius * quil.core.sin.call(null, a) * quil.core.sin.call(null, d), d = quil.examples.gen_art.spiral_sphere.radius * quil.core.cos.call(null, d);
                    return cljs.core.PersistentVector.fromArray([e, a, d], !0)
                  }());
                  a += 1
                }else {
                  return!0
                }
              }
            }() ? cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, h), c.call(null, cljs.core.chunk_rest.call(null, e))) : cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, h), null)
          }
          var i = cljs.core.first.call(null, e);
          return cljs.core.cons.call(null, function() {
            var a = quil.core.radians.call(null, 18 * i), c = quil.core.radians.call(null, i), d = quil.examples.gen_art.spiral_sphere.radius * quil.core.cos.call(null, a) * quil.core.sin.call(null, c), a = quil.examples.gen_art.spiral_sphere.radius * quil.core.sin.call(null, a) * quil.core.sin.call(null, c), c = quil.examples.gen_art.spiral_sphere.radius * quil.core.cos.call(null, c);
            return cljs.core.PersistentVector.fromArray([d, a, c], !0)
          }(), c.call(null, cljs.core.rest.call(null, e)))
        }
        return null
      }
    }, null)
  }.call(null, cljs.core.range.call(null, 0, 180));
  return cljs.core.dorun.call(null, cljs.core.map.call(null, function(a) {
    return cljs.core.apply.call(null, quil.core.line, a)
  }, quil.helpers.drawing.line_join_points.call(null, a)))
};
var temp__4090__auto___3836 = document.getElementById("gen-art-29");
if(cljs.core.truth_(temp__4090__auto___3836)) {
  var canvas__3573__auto___3837 = temp__4090__auto___3836, state__3574__auto___3838 = cljs.core.atom.call(null, null), pjs__3575__auto___3839 = new Processing(canvas__3573__auto___3837), binding_fn__3576__auto___3840 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___3838, pjs__3575__auto___3839), draw__3578__auto___3841 = cljs.core.truth_(quil.examples.gen_art.spiral_sphere.draw) ? quil.examples.gen_art.spiral_sphere.draw : function() {
    return function() {
      return null
    }
  }(state__3574__auto___3838, pjs__3575__auto___3839, binding_fn__3576__auto___3840), mouse_moved__3579__auto___3842 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3838, pjs__3575__auto___3839, binding_fn__3576__auto___3840, draw__3578__auto___3841), key_typed__3580__auto___3843 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3838, pjs__3575__auto___3839, binding_fn__3576__auto___3840, draw__3578__auto___3841, mouse_moved__3579__auto___3842);
  pjs__3575__auto___3839.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3839, quil.core._STAR_state_STAR_ = state__3574__auto___3838, cljs.core._EQ_.call(null, "\ufdd0:p3d", "\ufdd0:opengl") ? pjs__3575__auto___3839.size(500, 300, pjs__3575__auto___3839.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", "\ufdd0:opengl") ? pjs__3575__auto___3839.size(500, 300, pjs__3575__auto___3839.OPENGL) : pjs__3575__auto___3839.size(500, 300), quil.examples.gen_art.spiral_sphere.setup.call(null), pjs__3575__auto___3839.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3839.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3839, quil.core._STAR_state_STAR_ = state__3574__auto___3838, draw__3578__auto___3841.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3839.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3839, quil.core._STAR_state_STAR_ = state__3574__auto___3838, key_typed__3580__auto___3843.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3839.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3839, quil.core._STAR_state_STAR_ = state__3574__auto___3838, mouse_moved__3579__auto___3842.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3839.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-29")
}
;quil.examples.gen_art.noise_perspective = {};
quil.examples.gen_art.noise_perspective.draw_point = function(a, b, c) {
  quil.core.push_matrix.call(null);
  quil.core.translate.call(null, a, 250 - b, -1 * b);
  a = 35 * c;
  c = quil.helpers.calc.mul_add.call(null, c, 120, 150);
  quil.core.fill.call(null, c, c);
  quil.core.sphere.call(null, a);
  return quil.core.pop_matrix.call(null)
};
quil.examples.gen_art.noise_perspective.draw = function() {
  quil.core.background.call(null, 0);
  for(var a = quil.core.state.call(null, "\ufdd0:shifts").call(null), b = cljs.core.nth.call(null, a, 0, null), a = cljs.core.nth.call(null, a, 1, null), c = cljs.core.seq.call(null, quil.helpers.seqs.indexed_range_incl.call(null, 0, quil.core.width.call(null), 5)), d = null, e = 0, f = 0;;) {
    if(f < e) {
      for(var g = cljs.core._nth.call(null, d, f), h = cljs.core.nth.call(null, g, 0, null), g = cljs.core.nth.call(null, g, 1, null), i = cljs.core.seq.call(null, quil.helpers.seqs.indexed_range_incl.call(null, 0, quil.core.height.call(null), 5)), j = null, k = 0, m = 0;;) {
        if(m < k) {
          var l = cljs.core._nth.call(null, j, m), n = cljs.core.nth.call(null, l, 0, null), l = cljs.core.nth.call(null, l, 1, null), n = quil.helpers.calc.mul_add.call(null, n, 0.1, a), p = quil.helpers.calc.mul_add.call(null, h, 0.1, b);
          quil.examples.gen_art.noise_perspective.draw_point.call(null, g, l, quil.core.noise.call(null, p, n));
          m += 1
        }else {
          if(i = cljs.core.seq.call(null, i)) {
            cljs.core.chunked_seq_QMARK_.call(null, i) ? (k = cljs.core.chunk_first.call(null, i), i = cljs.core.chunk_rest.call(null, i), j = k, k = cljs.core.count.call(null, k)) : (j = cljs.core.first.call(null, i), k = cljs.core.nth.call(null, j, 0, null), j = cljs.core.nth.call(null, j, 1, null), k = quil.helpers.calc.mul_add.call(null, k, 0.1, a), m = quil.helpers.calc.mul_add.call(null, h, 0.1, b), quil.examples.gen_art.noise_perspective.draw_point.call(null, g, j, quil.core.noise.call(null, 
            m, k)), i = cljs.core.next.call(null, i), j = null, k = 0), m = 0
          }else {
            break
          }
        }
      }
      f += 1
    }else {
      if(h = cljs.core.seq.call(null, c)) {
        c = h;
        if(cljs.core.chunked_seq_QMARK_.call(null, c)) {
          g = cljs.core.chunk_first.call(null, c), c = cljs.core.chunk_rest.call(null, c), h = g, g = cljs.core.count.call(null, g), d = h, e = g
        }else {
          g = cljs.core.first.call(null, c);
          h = cljs.core.nth.call(null, g, 0, null);
          g = cljs.core.nth.call(null, g, 1, null);
          d = cljs.core.seq.call(null, quil.helpers.seqs.indexed_range_incl.call(null, 0, quil.core.height.call(null), 5));
          e = null;
          for(i = f = 0;;) {
            if(i < f) {
              j = cljs.core._nth.call(null, e, i), k = cljs.core.nth.call(null, j, 0, null), j = cljs.core.nth.call(null, j, 1, null), k = quil.helpers.calc.mul_add.call(null, k, 0.1, a), m = quil.helpers.calc.mul_add.call(null, h, 0.1, b), quil.examples.gen_art.noise_perspective.draw_point.call(null, g, j, quil.core.noise.call(null, m, k)), i += 1
            }else {
              if(d = cljs.core.seq.call(null, d)) {
                cljs.core.chunked_seq_QMARK_.call(null, d) ? (f = cljs.core.chunk_first.call(null, d), d = cljs.core.chunk_rest.call(null, d), e = f, f = cljs.core.count.call(null, f)) : (e = cljs.core.first.call(null, d), f = cljs.core.nth.call(null, e, 0, null), e = cljs.core.nth.call(null, e, 1, null), f = quil.helpers.calc.mul_add.call(null, f, 0.1, a), i = quil.helpers.calc.mul_add.call(null, h, 0.1, b), quil.examples.gen_art.noise_perspective.draw_point.call(null, g, e, quil.core.noise.call(null, 
                i, f)), d = cljs.core.next.call(null, d), e = null, f = 0), i = 0
              }else {
                break
              }
            }
          }
          c = cljs.core.next.call(null, c);
          d = null;
          e = 0
        }
        f = 0
      }else {
        return null
      }
    }
  }
};
quil.examples.gen_art.noise_perspective.setup = function() {
  quil.core.smooth.call(null);
  quil.core.background.call(null, 0);
  quil.core.sphere_detail.call(null, 8);
  quil.core.no_stroke.call(null);
  var a = quil.helpers.seqs.steps.call(null, quil.core.random.call(null, 10), 0.01), b = quil.helpers.seqs.steps.call(null, quil.core.random.call(null, 10), 0.01), a = cljs.core.map.call(null, cljs.core.list, a, b);
  return quil.core.set_state_BANG_.call(null, "\ufdd0:shifts", quil.helpers.seqs.seq__GT_stream.call(null, a))
};
var temp__4090__auto___4601 = document.getElementById("gen-art-27");
if(cljs.core.truth_(temp__4090__auto___4601)) {
  var canvas__3573__auto___4602 = temp__4090__auto___4601, state__3574__auto___4603 = cljs.core.atom.call(null, null), pjs__3575__auto___4604 = new Processing(canvas__3573__auto___4602), binding_fn__3576__auto___4605 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___4603, pjs__3575__auto___4604), draw__3578__auto___4606 = cljs.core.truth_(quil.examples.gen_art.noise_perspective.draw) ? quil.examples.gen_art.noise_perspective.draw : function() {
    return function() {
      return null
    }
  }(state__3574__auto___4603, pjs__3575__auto___4604, binding_fn__3576__auto___4605), mouse_moved__3579__auto___4607 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4603, pjs__3575__auto___4604, binding_fn__3576__auto___4605, draw__3578__auto___4606), key_typed__3580__auto___4608 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4603, pjs__3575__auto___4604, binding_fn__3576__auto___4605, draw__3578__auto___4606, mouse_moved__3579__auto___4607);
  pjs__3575__auto___4604.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4604, quil.core._STAR_state_STAR_ = state__3574__auto___4603, cljs.core._EQ_.call(null, "\ufdd0:p3d", "\ufdd0:opengl") ? pjs__3575__auto___4604.size(500, 300, pjs__3575__auto___4604.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", "\ufdd0:opengl") ? pjs__3575__auto___4604.size(500, 300, pjs__3575__auto___4604.OPENGL) : pjs__3575__auto___4604.size(500, 300), quil.examples.gen_art.noise_perspective.setup.call(null), pjs__3575__auto___4604.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4604.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4604, quil.core._STAR_state_STAR_ = state__3574__auto___4603, draw__3578__auto___4606.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4604.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4604, quil.core._STAR_state_STAR_ = state__3574__auto___4603, key_typed__3580__auto___4608.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4604.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4604, quil.core._STAR_state_STAR_ = state__3574__auto___4603, mouse_moved__3579__auto___4607.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4604.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-27")
}
;quil.examples.gen_art.random_scribble = {};
quil.examples.gen_art.random_scribble.rand_y = function(a) {
  return a + cljs.core.rand.call(null, quil.core.height.call(null) - 2 * a)
};
quil.examples.gen_art.random_scribble.setup = function() {
  quil.core.background.call(null, 255);
  quil.core.stroke_weight.call(null, 5);
  quil.core.smooth.call(null);
  quil.core.stroke.call(null, 0, 30);
  quil.core.line.call(null, 20, 50, 480, 50);
  quil.core.stroke.call(null, 20, 50, 70);
  var a = quil.helpers.seqs.range_incl.call(null, 20, quil.core.width.call(null) - 20, 10), b = cljs.core.repeatedly.call(null, function(a, b, e) {
    return function() {
      return quil.examples.gen_art.random_scribble.rand_y.call(null, e)
    }
  }(10, 20, 10, a)), a = quil.helpers.drawing.line_join_points.call(null, a, b);
  return cljs.core.dorun.call(null, cljs.core.map.call(null, function(a) {
    return cljs.core.apply.call(null, quil.core.line, a)
  }, a))
};
var temp__4090__auto___5059 = document.getElementById("gen-art-5");
if(cljs.core.truth_(temp__4090__auto___5059)) {
  var canvas__3573__auto___5060 = temp__4090__auto___5059, state__3574__auto___5061 = cljs.core.atom.call(null, null), pjs__3575__auto___5062 = new Processing(canvas__3573__auto___5060), binding_fn__3576__auto___5063 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___5061, pjs__3575__auto___5062), draw__3578__auto___5064 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___5061, pjs__3575__auto___5062, binding_fn__3576__auto___5063), mouse_moved__3579__auto___5065 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___5061, pjs__3575__auto___5062, binding_fn__3576__auto___5063, draw__3578__auto___5064), key_typed__3580__auto___5066 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___5061, pjs__3575__auto___5062, binding_fn__3576__auto___5063, draw__3578__auto___5064, mouse_moved__3579__auto___5065);
  pjs__3575__auto___5062.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___5062, quil.core._STAR_state_STAR_ = state__3574__auto___5061, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___5062.size(500, 100, pjs__3575__auto___5062.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___5062.size(500, 100, pjs__3575__auto___5062.OPENGL) : pjs__3575__auto___5062.size(500, 100), quil.examples.gen_art.random_scribble.setup.call(null), pjs__3575__auto___5062.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___5062.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___5062, quil.core._STAR_state_STAR_ = state__3574__auto___5061, draw__3578__auto___5064.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___5062.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___5062, quil.core._STAR_state_STAR_ = state__3574__auto___5061, key_typed__3580__auto___5066.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___5062.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___5062, quil.core._STAR_state_STAR_ = state__3574__auto___5061, mouse_moved__3579__auto___5065.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___5062.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-5")
}
;quil.examples.gen_art.fading_horizontal_lines = {};
quil.examples.gen_art.fading_horizontal_lines.draw_line = function(a) {
  quil.core.stroke.call(null, 0, 255 - a);
  quil.core.line.call(null, 10, a, quil.core.width.call(null) - 20, a);
  quil.core.stroke.call(null, 255, a);
  return quil.core.line.call(null, 10, a + 4, quil.core.width.call(null) - 20, a + 4)
};
quil.examples.gen_art.fading_horizontal_lines.setup = function() {
  quil.core.background.call(null, 180);
  quil.core.stroke_weight.call(null, 4);
  quil.core.stroke_cap.call(null, "\ufdd0:square");
  var a = cljs.core.range.call(null, 10, quil.core.height.call(null) - 15, 10);
  return cljs.core.dorun.call(null, cljs.core.map.call(null, quil.examples.gen_art.fading_horizontal_lines.draw_line, a))
};
var temp__4090__auto___3710 = document.getElementById("gen-art-4");
if(cljs.core.truth_(temp__4090__auto___3710)) {
  var canvas__3573__auto___3711 = temp__4090__auto___3710, state__3574__auto___3712 = cljs.core.atom.call(null, null), pjs__3575__auto___3713 = new Processing(canvas__3573__auto___3711), binding_fn__3576__auto___3714 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___3712, pjs__3575__auto___3713), draw__3578__auto___3715 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3712, pjs__3575__auto___3713, binding_fn__3576__auto___3714), mouse_moved__3579__auto___3716 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3712, pjs__3575__auto___3713, binding_fn__3576__auto___3714, draw__3578__auto___3715), key_typed__3580__auto___3717 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3712, pjs__3575__auto___3713, binding_fn__3576__auto___3714, draw__3578__auto___3715, mouse_moved__3579__auto___3716);
  pjs__3575__auto___3713.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3713, quil.core._STAR_state_STAR_ = state__3574__auto___3712, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___3713.size(500, 300, pjs__3575__auto___3713.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___3713.size(500, 300, pjs__3575__auto___3713.OPENGL) : pjs__3575__auto___3713.size(500, 300), quil.examples.gen_art.fading_horizontal_lines.setup.call(null), pjs__3575__auto___3713.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3713.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3713, quil.core._STAR_state_STAR_ = state__3574__auto___3712, draw__3578__auto___3715.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3713.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3713, quil.core._STAR_state_STAR_ = state__3574__auto___3712, key_typed__3580__auto___3717.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3713.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3713, quil.core._STAR_state_STAR_ = state__3574__auto___3712, mouse_moved__3579__auto___3716.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3713.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-4")
}
;quil.examples.mouse_example = {};
quil.examples.mouse_example.setup = function() {
  quil.core.smooth.call(null);
  quil.core.no_stroke.call(null);
  return quil.core.set_state_BANG_.call(null, "\ufdd0:mouse-position", cljs.core.atom.call(null, cljs.core.PersistentVector.fromArray([0, 0], !0)))
};
quil.examples.mouse_example.draw = function() {
  quil.core.background_float.call(null, 125);
  quil.core.stroke_weight.call(null, 20);
  quil.core.stroke_float.call(null, 10);
  var a = cljs.core.deref.call(null, quil.core.state.call(null, "\ufdd0:mouse-position")), b = cljs.core.nth.call(null, a, 0, null), a = cljs.core.nth.call(null, a, 1, null);
  return quil.core.point.call(null, b, a)
};
quil.examples.mouse_example.mouse_moved = function() {
  var a = quil.core.mouse_x.call(null), b = quil.core.mouse_y.call(null);
  return cljs.core.reset_BANG_.call(null, quil.core.state.call(null, "\ufdd0:mouse-position"), cljs.core.PersistentVector.fromArray([a, b], !0))
};
var temp__4090__auto___3631 = document.getElementById("mouse-example");
if(cljs.core.truth_(temp__4090__auto___3631)) {
  var canvas__3573__auto___3632 = temp__4090__auto___3631, state__3574__auto___3633 = cljs.core.atom.call(null, null), pjs__3575__auto___3634 = new Processing(canvas__3573__auto___3632), binding_fn__3576__auto___3635 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___3633, pjs__3575__auto___3634), draw__3578__auto___3636 = cljs.core.truth_(quil.examples.mouse_example.draw) ? quil.examples.mouse_example.draw : function() {
    return function() {
      return null
    }
  }(state__3574__auto___3633, pjs__3575__auto___3634, binding_fn__3576__auto___3635), mouse_moved__3579__auto___3637 = cljs.core.truth_(quil.examples.mouse_example.mouse_moved) ? quil.examples.mouse_example.mouse_moved : function() {
    return function() {
      return null
    }
  }(state__3574__auto___3633, pjs__3575__auto___3634, binding_fn__3576__auto___3635, draw__3578__auto___3636), key_typed__3580__auto___3638 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3633, pjs__3575__auto___3634, binding_fn__3576__auto___3635, draw__3578__auto___3636, mouse_moved__3579__auto___3637);
  pjs__3575__auto___3634.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3634, quil.core._STAR_state_STAR_ = state__3574__auto___3633, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___3634.size(200, 200, pjs__3575__auto___3634.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___3634.size(200, 200, pjs__3575__auto___3634.OPENGL) : pjs__3575__auto___3634.size(200, 200), quil.examples.mouse_example.setup.call(null), pjs__3575__auto___3634.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3634.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3634, quil.core._STAR_state_STAR_ = state__3574__auto___3633, draw__3578__auto___3636.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3634.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3634, quil.core._STAR_state_STAR_ = state__3574__auto___3633, key_typed__3580__auto___3638.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3634.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3634, quil.core._STAR_state_STAR_ = state__3574__auto___3633, mouse_moved__3579__auto___3637.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3634.setup()
}else {
  console.log("No canvas element with id : ", "mouse-example")
}
;quil.examples.gen_art.cross_with_circle = {};
quil.examples.gen_art.cross_with_circle.setup = function() {
  quil.core.smooth.call(null);
  quil.core.background.call(null, 230, 230, 230);
  quil.core.stroke.call(null, 130, 0, 0);
  quil.core.stroke_weight.call(null, 4);
  var a = quil.core.width.call(null) / 2, b = quil.core.height.call(null) / 2, c = a - 70, d = a + 70, e = b + 70, f = b - 70;
  quil.core.line.call(null, c, f, d, e);
  quil.core.line.call(null, d, f, c, e);
  quil.core.fill.call(null, 255, 150);
  return quil.core.ellipse.call(null, a, b, 50, 50)
};
var temp__4090__auto___3735 = document.getElementById("gen-art-1");
if(cljs.core.truth_(temp__4090__auto___3735)) {
  var canvas__3573__auto___3736 = temp__4090__auto___3735, state__3574__auto___3737 = cljs.core.atom.call(null, null), pjs__3575__auto___3738 = new Processing(canvas__3573__auto___3736), binding_fn__3576__auto___3739 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___3737, pjs__3575__auto___3738), draw__3578__auto___3740 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3737, pjs__3575__auto___3738, binding_fn__3576__auto___3739), mouse_moved__3579__auto___3741 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3737, pjs__3575__auto___3738, binding_fn__3576__auto___3739, draw__3578__auto___3740), key_typed__3580__auto___3742 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3737, pjs__3575__auto___3738, binding_fn__3576__auto___3739, draw__3578__auto___3740, mouse_moved__3579__auto___3741);
  pjs__3575__auto___3738.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3738, quil.core._STAR_state_STAR_ = state__3574__auto___3737, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___3738.size(500, 300, pjs__3575__auto___3738.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___3738.size(500, 300, pjs__3575__auto___3738.OPENGL) : pjs__3575__auto___3738.size(500, 300), quil.examples.gen_art.cross_with_circle.setup.call(null), pjs__3575__auto___3738.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3738.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3738, quil.core._STAR_state_STAR_ = state__3574__auto___3737, draw__3578__auto___3740.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3738.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3738, quil.core._STAR_state_STAR_ = state__3574__auto___3737, key_typed__3580__auto___3742.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3738.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3738, quil.core._STAR_state_STAR_ = state__3574__auto___3737, mouse_moved__3579__auto___3741.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3738.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-1")
}
;quil.examples.gen_art.squared_noise_grid = {};
quil.examples.gen_art.squared_noise_grid.draw_point = function(a, b, c) {
  c *= 10;
  return quil.core.rect.call(null, a, b, c, c)
};
quil.examples.gen_art.squared_noise_grid.draw_squares = function(a, b) {
  return cljs.core.dorun.call(null, function d(e) {
    return new cljs.core.LazySeq(null, !1, function() {
      for(var f = e;;) {
        var g = cljs.core.seq.call(null, f);
        if(g) {
          var h = g, i = cljs.core.first.call(null, h), g = function(d, e) {
            return function l(d) {
              return new cljs.core.LazySeq(null, !1, function() {
                for(;;) {
                  var f = cljs.core.seq.call(null, d);
                  if(f) {
                    if(cljs.core.chunked_seq_QMARK_.call(null, f)) {
                      var g = cljs.core.chunk_first.call(null, f), h = cljs.core.count.call(null, g), i = cljs.core.chunk_buffer.call(null, h);
                      return function() {
                        for(var d = 0;;) {
                          if(d < h) {
                            var f = cljs.core._nth.call(null, g, d);
                            cljs.core.chunk_append.call(null, i, function() {
                              var d = quil.helpers.calc.mul_add.call(null, f, 0.01, a), g = quil.helpers.calc.mul_add.call(null, e, 0.01, b);
                              quil.core.noise.call(null, d, g);
                              return quil.examples.gen_art.squared_noise_grid.draw_point.call(null, f, e, quil.core.noise.call(null, d, g))
                            }());
                            d += 1
                          }else {
                            return!0
                          }
                        }
                      }() ? cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, i), l.call(null, cljs.core.chunk_rest.call(null, f))) : cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, i), null)
                    }
                    var j = cljs.core.first.call(null, f);
                    return cljs.core.cons.call(null, function() {
                      var d = quil.helpers.calc.mul_add.call(null, j, 0.01, a), f = quil.helpers.calc.mul_add.call(null, e, 0.01, b);
                      quil.core.noise.call(null, d, f);
                      return quil.examples.gen_art.squared_noise_grid.draw_point.call(null, j, e, quil.core.noise.call(null, d, f))
                    }(), l.call(null, cljs.core.rest.call(null, f)))
                  }
                  return null
                }
              }, null)
            }
          }(f, i, h, g);
          if(g = cljs.core.seq.call(null, g.call(null, quil.helpers.seqs.range_incl.call(null, 0, quil.core.width.call(null), 5)))) {
            return cljs.core.concat.call(null, g, d.call(null, cljs.core.rest.call(null, f)))
          }
          f = cljs.core.rest.call(null, f)
        }else {
          return null
        }
      }
    }, null)
  }.call(null, quil.helpers.seqs.range_incl.call(null, 0, quil.core.height.call(null), 5)))
};
quil.examples.gen_art.squared_noise_grid.setup = function() {
  quil.core.smooth.call(null);
  quil.core.background.call(null, 255);
  return quil.examples.gen_art.squared_noise_grid.draw_squares.call(null, quil.core.random.call(null, 10), quil.core.random.call(null, 10))
};
var temp__4090__auto___3909 = document.getElementById("gen-art-21");
if(cljs.core.truth_(temp__4090__auto___3909)) {
  var canvas__3573__auto___3910 = temp__4090__auto___3909, state__3574__auto___3911 = cljs.core.atom.call(null, null), pjs__3575__auto___3912 = new Processing(canvas__3573__auto___3910), binding_fn__3576__auto___3913 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___3911, pjs__3575__auto___3912), draw__3578__auto___3914 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3911, pjs__3575__auto___3912, binding_fn__3576__auto___3913), mouse_moved__3579__auto___3915 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3911, pjs__3575__auto___3912, binding_fn__3576__auto___3913, draw__3578__auto___3914), key_typed__3580__auto___3916 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3911, pjs__3575__auto___3912, binding_fn__3576__auto___3913, draw__3578__auto___3914, mouse_moved__3579__auto___3915);
  pjs__3575__auto___3912.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3912, quil.core._STAR_state_STAR_ = state__3574__auto___3911, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___3912.size(300, 300, pjs__3575__auto___3912.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___3912.size(300, 300, pjs__3575__auto___3912.OPENGL) : pjs__3575__auto___3912.size(300, 300), quil.examples.gen_art.squared_noise_grid.setup.call(null), pjs__3575__auto___3912.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3912.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3912, quil.core._STAR_state_STAR_ = state__3574__auto___3911, draw__3578__auto___3914.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3912.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3912, quil.core._STAR_state_STAR_ = state__3574__auto___3911, key_typed__3580__auto___3916.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3912.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3912, quil.core._STAR_state_STAR_ = state__3574__auto___3911, mouse_moved__3579__auto___3915.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3912.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-21")
}
;quil.examples.gen_art.perlin_noise_scribble = {};
quil.examples.gen_art.perlin_noise_scribble.setup = function() {
  quil.core.background.call(null, 255);
  quil.core.stroke_weight.call(null, 5);
  quil.core.smooth.call(null);
  quil.core.stroke.call(null, 0, 30);
  quil.core.line.call(null, 20, 50, 480, 50);
  quil.core.stroke.call(null, 20, 50, 70);
  var a = cljs.core.rand.call(null, 10), b = quil.helpers.seqs.range_incl.call(null, 20, quil.core.width.call(null) - 20, 10), a = quil.helpers.seqs.perlin_noise_seq.call(null, a, 0.1), a = quil.helpers.calc.mul_add.call(null, a, 80, 10), b = quil.helpers.drawing.line_join_points.call(null, b, a);
  return cljs.core.dorun.call(null, cljs.core.map.call(null, function(a) {
    return cljs.core.apply.call(null, quil.core.line, a)
  }, b))
};
var temp__4090__auto___4468 = document.getElementById("gen-art-7");
if(cljs.core.truth_(temp__4090__auto___4468)) {
  var canvas__3573__auto___4469 = temp__4090__auto___4468, state__3574__auto___4470 = cljs.core.atom.call(null, null), pjs__3575__auto___4471 = new Processing(canvas__3573__auto___4469), binding_fn__3576__auto___4472 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___4470, pjs__3575__auto___4471), draw__3578__auto___4473 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4470, pjs__3575__auto___4471, binding_fn__3576__auto___4472), mouse_moved__3579__auto___4474 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4470, pjs__3575__auto___4471, binding_fn__3576__auto___4472, draw__3578__auto___4473), key_typed__3580__auto___4475 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4470, pjs__3575__auto___4471, binding_fn__3576__auto___4472, draw__3578__auto___4473, mouse_moved__3579__auto___4474);
  pjs__3575__auto___4471.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4471, quil.core._STAR_state_STAR_ = state__3574__auto___4470, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___4471.size(500, 100, pjs__3575__auto___4471.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___4471.size(500, 100, pjs__3575__auto___4471.OPENGL) : pjs__3575__auto___4471.size(500, 100), quil.examples.gen_art.perlin_noise_scribble.setup.call(null), pjs__3575__auto___4471.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4471.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4471, quil.core._STAR_state_STAR_ = state__3574__auto___4470, draw__3578__auto___4473.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4471.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4471, quil.core._STAR_state_STAR_ = state__3574__auto___4470, key_typed__3580__auto___4475.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4471.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4471, quil.core._STAR_state_STAR_ = state__3574__auto___4470, mouse_moved__3579__auto___4474.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4471.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-7")
}
;var example2 = {draw:function() {
  quil.core.background_float.call(null, 125);
  quil.core.stroke_float.call(null, 10);
  quil.core.fill_float.call(null, cljs.core.rand_int.call(null, 125), cljs.core.rand_int.call(null, 125), cljs.core.rand_int.call(null, 125));
  var a = cljs.core.PersistentVector.fromArray([100, 100], !0);
  quil.core.push_matrix.call(null);
  quil.core.translate.call(null, a);
  a = cljs.core.PersistentVector.fromArray([quil.core.QUARTER_PI], !0);
  quil.core.push_matrix.call(null);
  cljs.core.apply.call(null, quil.core.rotate, a);
  quil.core.begin_shape.call(null);
  quil.core.vertex.call(null, -50, 50);
  quil.core.vertex.call(null, 50, 50);
  quil.core.vertex.call(null, 50, -50);
  quil.core.vertex.call(null, -50, -50);
  quil.core.end_shape.call(null, "\ufdd0:close");
  quil.core.pop_matrix.call(null);
  quil.core.pop_matrix.call(null);
  return quil.core.display_filter.call(null, "\ufdd0:invert")
}, setup:function() {
  quil.core.smooth.call(null);
  quil.core.no_stroke.call(null);
  quil.core.fill.call(null, 226);
  return quil.core.frame_rate.call(null, 10)
}}, temp__4090__auto___5086 = document.getElementById("example2");
if(cljs.core.truth_(temp__4090__auto___5086)) {
  var canvas__3573__auto___5087 = temp__4090__auto___5086, state__3574__auto___5088 = cljs.core.atom.call(null, null), pjs__3575__auto___5089 = new Processing(canvas__3573__auto___5087), binding_fn__3576__auto___5090 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___5088, pjs__3575__auto___5089), draw__3578__auto___5091 = cljs.core.truth_(example2.draw) ? example2.draw : function() {
    return function() {
      return null
    }
  }(state__3574__auto___5088, pjs__3575__auto___5089, binding_fn__3576__auto___5090), mouse_moved__3579__auto___5092 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___5088, pjs__3575__auto___5089, binding_fn__3576__auto___5090, draw__3578__auto___5091), key_typed__3580__auto___5093 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___5088, pjs__3575__auto___5089, binding_fn__3576__auto___5090, draw__3578__auto___5091, mouse_moved__3579__auto___5092);
  pjs__3575__auto___5089.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___5089, quil.core._STAR_state_STAR_ = state__3574__auto___5088, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___5089.size(200, 200, pjs__3575__auto___5089.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___5089.size(200, 200, pjs__3575__auto___5089.OPENGL) : pjs__3575__auto___5089.size(200, 200), example2.setup.call(null), pjs__3575__auto___5089.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___5089.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___5089, quil.core._STAR_state_STAR_ = state__3574__auto___5088, draw__3578__auto___5091.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___5089.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___5089, quil.core._STAR_state_STAR_ = state__3574__auto___5088, key_typed__3580__auto___5093.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___5089.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___5089, quil.core._STAR_state_STAR_ = state__3574__auto___5088, mouse_moved__3579__auto___5092.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___5089.setup()
}else {
  console.log("No canvas element with id : ", "example2")
}
;quil.examples.gen_art.noise_circle = {};
quil.examples.gen_art.noise_circle.custom_noise = function(a) {
  return quil.core.pow.call(null, quil.core.sin.call(null, a), 3)
};
quil.examples.gen_art.noise_circle.setup = function() {
  quil.core.background.call(null, 255);
  quil.core.stroke_weight.call(null, 5);
  quil.core.smooth.call(null);
  quil.core.stroke.call(null, 0, 30);
  quil.core.no_fill.call(null);
  var a = cljs.core.rand.call(null, 10), b = quil.helpers.seqs.range_incl.call(null, 0, 360), c = cljs.core.map.call(null, quil.core.radians, b), d = cljs.core.range.call(null, a, Number.POSITIVE_INFINITY, 0.1), e = cljs.core.map.call(null, function(a) {
    return 30 * quil.examples.gen_art.noise_circle.custom_noise.call(null, a)
  }, d), f = cljs.core.map.call(null, cljs.core._PLUS_, e, cljs.core.repeat.call(null, 100)), g = cljs.core.map.call(null, function(a, b) {
    return function(a, c) {
      return quil.helpers.calc.mul_add.call(null, quil.core.cos.call(null, c), a, b)
    }
  }(100, 250, 150, a, b, c, d, e, f), f, c), a = cljs.core.map.call(null, function(a, b, c) {
    return function(a, b) {
      return quil.helpers.calc.mul_add.call(null, quil.core.sin.call(null, b), a, c)
    }
  }(100, 250, 150, a, b, c, d, e, f, g), f, c);
  quil.core.ellipse.call(null, 250, 150, 200, 200);
  quil.core.stroke.call(null, 20, 50, 70);
  quil.core.stroke_weight.call(null, 1);
  quil.core.begin_shape.call(null);
  quil.core.fill.call(null, 20, 50, 70, 50);
  cljs.core.dorun.call(null, cljs.core.map.call(null, quil.core.curve_vertex, g, a));
  return quil.core.end_shape.call(null)
};
var temp__4090__auto___4230 = document.getElementById("gen-art-15");
if(cljs.core.truth_(temp__4090__auto___4230)) {
  var canvas__3573__auto___4231 = temp__4090__auto___4230, state__3574__auto___4232 = cljs.core.atom.call(null, null), pjs__3575__auto___4233 = new Processing(canvas__3573__auto___4231), binding_fn__3576__auto___4234 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___4232, pjs__3575__auto___4233), draw__3578__auto___4235 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4232, pjs__3575__auto___4233, binding_fn__3576__auto___4234), mouse_moved__3579__auto___4236 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4232, pjs__3575__auto___4233, binding_fn__3576__auto___4234, draw__3578__auto___4235), key_typed__3580__auto___4237 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4232, pjs__3575__auto___4233, binding_fn__3576__auto___4234, draw__3578__auto___4235, mouse_moved__3579__auto___4236);
  pjs__3575__auto___4233.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4233, quil.core._STAR_state_STAR_ = state__3574__auto___4232, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___4233.size(500, 300, pjs__3575__auto___4233.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___4233.size(500, 300, pjs__3575__auto___4233.OPENGL) : pjs__3575__auto___4233.size(500, 300), quil.examples.gen_art.noise_circle.setup.call(null), pjs__3575__auto___4233.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4233.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4233, quil.core._STAR_state_STAR_ = state__3574__auto___4232, draw__3578__auto___4235.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4233.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4233, quil.core._STAR_state_STAR_ = state__3574__auto___4232, key_typed__3580__auto___4237.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4233.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4233, quil.core._STAR_state_STAR_ = state__3574__auto___4232, mouse_moved__3579__auto___4236.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4233.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-15")
}
;quil.examples.gen_art.circle_from_fading_opposing_lines = {};
quil.examples.gen_art.circle_from_fading_opposing_lines.setup = function() {
  quil.core.background.call(null, 255);
  quil.core.stroke_weight.call(null, 0.5);
  quil.core.smooth.call(null);
  quil.core.stroke.call(null, 20, 50, 70);
  var a = quil.helpers.seqs.range_incl.call(null, 0, 360), b = cljs.core.map.call(null, quil.core.radians, a), c = cljs.core.map.call(null, cljs.core._PLUS_, b, cljs.core.repeat.call(null, quil.core.PI)), d = cljs.core.cycle.call(null, quil.helpers.seqs.range_incl.call(null, 255, 0, -1)), e = cljs.core.map.call(null, function(a, b) {
    return function(c) {
      return quil.helpers.calc.mul_add.call(null, quil.core.cos.call(null, c), a, b)
    }
  }(130, 250, 150, a, b, c, d), b), f = cljs.core.map.call(null, function(a, b, c) {
    return function(b) {
      return quil.helpers.calc.mul_add.call(null, quil.core.sin.call(null, b), a, c)
    }
  }(130, 250, 150, a, b, c, d, e), b), g = cljs.core.map.call(null, function(a, b) {
    return function(c) {
      return quil.helpers.calc.mul_add.call(null, quil.core.cos.call(null, c), a, b)
    }
  }(130, 250, 150, a, b, c, d, e, f), c), a = cljs.core.map.call(null, function(a, b, c) {
    return function(b) {
      return quil.helpers.calc.mul_add.call(null, quil.core.sin.call(null, b), a, c)
    }
  }(130, 250, 150, a, b, c, d, e, f, g), c);
  return cljs.core.doall.call(null, cljs.core.map.call(null, function(a, b, c, d, e) {
    quil.core.stroke.call(null, e);
    return quil.core.line.call(null, a, b, c, d)
  }, e, f, g, a, d))
};
var temp__4090__auto___4442 = document.getElementById("gen-art-17");
if(cljs.core.truth_(temp__4090__auto___4442)) {
  var canvas__3573__auto___4443 = temp__4090__auto___4442, state__3574__auto___4444 = cljs.core.atom.call(null, null), pjs__3575__auto___4445 = new Processing(canvas__3573__auto___4443), binding_fn__3576__auto___4446 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___4444, pjs__3575__auto___4445), draw__3578__auto___4447 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4444, pjs__3575__auto___4445, binding_fn__3576__auto___4446), mouse_moved__3579__auto___4448 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4444, pjs__3575__auto___4445, binding_fn__3576__auto___4446, draw__3578__auto___4447), key_typed__3580__auto___4449 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4444, pjs__3575__auto___4445, binding_fn__3576__auto___4446, draw__3578__auto___4447, mouse_moved__3579__auto___4448);
  pjs__3575__auto___4445.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4445, quil.core._STAR_state_STAR_ = state__3574__auto___4444, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___4445.size(500, 300, pjs__3575__auto___4445.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___4445.size(500, 300, pjs__3575__auto___4445.OPENGL) : pjs__3575__auto___4445.size(500, 300), quil.examples.gen_art.circle_from_fading_opposing_lines.setup.call(null), pjs__3575__auto___4445.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4445.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4445, quil.core._STAR_state_STAR_ = state__3574__auto___4444, draw__3578__auto___4447.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4445.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4445, quil.core._STAR_state_STAR_ = state__3574__auto___4444, key_typed__3580__auto___4449.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4445.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4445, quil.core._STAR_state_STAR_ = state__3574__auto___4444, mouse_moved__3579__auto___4448.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4445.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-17")
}
;quil.examples.gen_art.oo_circles = {};
quil.examples.gen_art.oo_circles.num = 10;
quil.examples.gen_art.oo_circles.mk_circle = function() {
  return cljs.core.PersistentArrayMap.fromArray(["\ufdd0:x", quil.core.random.call(null, quil.core.width.call(null)), "\ufdd0:y", quil.core.random.call(null, quil.core.height.call(null)), "\ufdd0:radius", 10 + quil.core.random.call(null, 100), "\ufdd0:line-col", quil.core.color.call(null, quil.core.random.call(null, 255), quil.core.random.call(null, 255), quil.core.random.call(null, 255)), "\ufdd0:fill-col", quil.core.color.call(null, quil.core.random.call(null, 255), quil.core.random.call(null, 
  255), quil.core.random.call(null, 255)), "\ufdd0:alph", quil.core.random.call(null, 255), "\ufdd0:xmove", quil.core.random.call(null, 10) - 5, "\ufdd0:ymove", quil.core.random.call(null, 10) - 5], !0)
};
quil.examples.gen_art.oo_circles.add_circles = function(a) {
  for(var b = quil.examples.gen_art.oo_circles.num, c = 0;;) {
    if(c < b) {
      var d = quil.examples.gen_art.oo_circles.mk_circle.call(null);
      cljs.core.swap_BANG_.call(null, a, cljs.core.conj, d);
      c += 1
    }else {
      return null
    }
  }
};
quil.examples.gen_art.oo_circles.mouse_released = function() {
  return quil.examples.gen_art.oo_circles.add_circles.call(null, quil.core.state.call(null, "\ufdd0:circles"))
};
quil.examples.gen_art.oo_circles.setup = function() {
  quil.core.background.call(null, 255);
  quil.core.smooth.call(null);
  quil.core.stroke_weight.call(null, 1);
  quil.core.fill_int.call(null, 150, 50);
  var a = cljs.core.atom.call(null, cljs.core.PersistentVector.EMPTY);
  quil.examples.gen_art.oo_circles.add_circles.call(null, a);
  return quil.core.set_state_BANG_.call(null, "\ufdd0:circles", a)
};
quil.examples.gen_art.oo_circles.update_circle = function(a) {
  var a = cljs.core.seq_QMARK_.call(null, a) ? cljs.core.apply.call(null, cljs.core.hash_map, a) : a, b = cljs.core.get.call(null, a, "\ufdd0:radius"), c = cljs.core.get.call(null, a, "\ufdd0:ymove"), d = cljs.core.get.call(null, a, "\ufdd0:xmove"), e = cljs.core.get.call(null, a, "\ufdd0:y"), d = cljs.core.get.call(null, a, "\ufdd0:x") + d, d = d < 0 - b ? quil.core.width.call(null) + b : d, d = d > quil.core.width.call(null) + b ? 0 - b : d, c = e + c, c = c < 0 - b ? quil.core.height.call(null) + 
  b : c, b = c > quil.core.height.call(null) + b ? 0 - b : c;
  return cljs.core.assoc.call(null, a, "\ufdd0:x", d, "\ufdd0:y", b)
};
quil.examples.gen_art.oo_circles.update_circles = function(a) {
  return cljs.core.map.call(null, quil.examples.gen_art.oo_circles.update_circle, a)
};
quil.examples.gen_art.oo_circles.draw_circle = function(a) {
  var b = cljs.core.seq_QMARK_.call(null, a) ? cljs.core.apply.call(null, cljs.core.hash_map, a) : a, a = cljs.core.get.call(null, b, "\ufdd0:alph"), c = cljs.core.get.call(null, b, "\ufdd0:fill-col"), d = cljs.core.get.call(null, b, "\ufdd0:line-col"), e = cljs.core.get.call(null, b, "\ufdd0:radius"), f = cljs.core.get.call(null, b, "\ufdd0:y"), b = cljs.core.get.call(null, b, "\ufdd0:x");
  quil.core.no_stroke.call(null);
  quil.core.fill_int.call(null, c, a);
  quil.core.ellipse.call(null, b, f, 2 * e, 2 * e);
  quil.core.stroke_int.call(null, d, 150);
  quil.core.no_fill.call(null);
  return quil.core.ellipse.call(null, b, f, 10, 10)
};
quil.examples.gen_art.oo_circles.draw = function() {
  quil.core.background.call(null, 255);
  for(var a = quil.core.state.call(null, "\ufdd0:circles"), a = cljs.core.swap_BANG_.call(null, a, quil.examples.gen_art.oo_circles.update_circles), a = cljs.core.seq.call(null, a), b = null, c = 0, d = 0;;) {
    if(d < c) {
      var e = cljs.core._nth.call(null, b, d);
      quil.examples.gen_art.oo_circles.draw_circle.call(null, e);
      d += 1
    }else {
      if(a = cljs.core.seq.call(null, a)) {
        b = a, cljs.core.chunked_seq_QMARK_.call(null, b) ? (a = cljs.core.chunk_first.call(null, b), c = cljs.core.chunk_rest.call(null, b), b = a, e = cljs.core.count.call(null, a), a = c, c = e) : (e = cljs.core.first.call(null, b), quil.examples.gen_art.oo_circles.draw_circle.call(null, e), a = cljs.core.next.call(null, b), b = null, c = 0), d = 0
      }else {
        return null
      }
    }
  }
};
var temp__4090__auto___4693 = document.getElementById("gen-art-31");
if(cljs.core.truth_(temp__4090__auto___4693)) {
  var canvas__3573__auto___4694 = temp__4090__auto___4693, state__3574__auto___4695 = cljs.core.atom.call(null, null), pjs__3575__auto___4696 = new Processing(canvas__3573__auto___4694), binding_fn__3576__auto___4697 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___4695, pjs__3575__auto___4696), draw__3578__auto___4698 = cljs.core.truth_(quil.examples.gen_art.oo_circles.draw) ? quil.examples.gen_art.oo_circles.draw : function() {
    return function() {
      return null
    }
  }(state__3574__auto___4695, pjs__3575__auto___4696, binding_fn__3576__auto___4697), mouse_moved__3579__auto___4699 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4695, pjs__3575__auto___4696, binding_fn__3576__auto___4697, draw__3578__auto___4698), key_typed__3580__auto___4700 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4695, pjs__3575__auto___4696, binding_fn__3576__auto___4697, draw__3578__auto___4698, mouse_moved__3579__auto___4699);
  pjs__3575__auto___4696.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4696, quil.core._STAR_state_STAR_ = state__3574__auto___4695, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___4696.size(500, 300, pjs__3575__auto___4696.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___4696.size(500, 300, pjs__3575__auto___4696.OPENGL) : pjs__3575__auto___4696.size(500, 300), quil.examples.gen_art.oo_circles.setup.call(null), pjs__3575__auto___4696.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4696.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4696, quil.core._STAR_state_STAR_ = state__3574__auto___4695, draw__3578__auto___4698.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4696.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4696, quil.core._STAR_state_STAR_ = state__3574__auto___4695, key_typed__3580__auto___4700.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4696.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4696, quil.core._STAR_state_STAR_ = state__3574__auto___4695, mouse_moved__3579__auto___4699.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4696.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-31")
}
;quil.examples.gen_art.fluffy_clouds_noise_grid = {};
quil.examples.gen_art.fluffy_clouds_noise_grid.draw_point = function(a, b, c) {
  quil.core.push_matrix.call(null);
  quil.core.translate.call(null, a, b);
  quil.core.rotate.call(null, c * quil.core.radians.call(null, 540));
  a = 35 * c;
  b = quil.helpers.calc.mul_add.call(null, c, 120, 150);
  c = quil.helpers.calc.mul_add.call(null, c, 120, 150);
  quil.core.no_stroke.call(null);
  quil.core.fill.call(null, b, c);
  quil.core.ellipse.call(null, 0, 0, a, a / 2);
  return quil.core.pop_matrix.call(null)
};
quil.examples.gen_art.fluffy_clouds_noise_grid.draw_all_points = function(a, b) {
  return cljs.core.dorun.call(null, function d(e) {
    return new cljs.core.LazySeq(null, !1, function() {
      for(var f = e;;) {
        var g = cljs.core.seq.call(null, f);
        if(g) {
          var h = g, i = cljs.core.first.call(null, h), g = function(d, e) {
            return function l(d) {
              return new cljs.core.LazySeq(null, !1, function() {
                for(;;) {
                  var f = cljs.core.seq.call(null, d);
                  if(f) {
                    if(cljs.core.chunked_seq_QMARK_.call(null, f)) {
                      var g = cljs.core.chunk_first.call(null, f), h = cljs.core.count.call(null, g), i = cljs.core.chunk_buffer.call(null, h);
                      return function() {
                        for(var d = 0;;) {
                          if(d < h) {
                            var f = cljs.core._nth.call(null, g, d);
                            cljs.core.chunk_append.call(null, i, function() {
                              var d = quil.helpers.calc.mul_add.call(null, f, 0.01, a), g = quil.helpers.calc.mul_add.call(null, e, 0.01, b);
                              return quil.examples.gen_art.fluffy_clouds_noise_grid.draw_point.call(null, f, e, quil.core.noise.call(null, d, g))
                            }());
                            d += 1
                          }else {
                            return!0
                          }
                        }
                      }() ? cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, i), l.call(null, cljs.core.chunk_rest.call(null, f))) : cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, i), null)
                    }
                    var j = cljs.core.first.call(null, f);
                    return cljs.core.cons.call(null, function() {
                      var d = quil.helpers.calc.mul_add.call(null, j, 0.01, a), f = quil.helpers.calc.mul_add.call(null, e, 0.01, b);
                      return quil.examples.gen_art.fluffy_clouds_noise_grid.draw_point.call(null, j, e, quil.core.noise.call(null, d, f))
                    }(), l.call(null, cljs.core.rest.call(null, f)))
                  }
                  return null
                }
              }, null)
            }
          }(f, i, h, g);
          if(g = cljs.core.seq.call(null, g.call(null, quil.helpers.seqs.range_incl.call(null, 0, quil.core.width.call(null), 5)))) {
            return cljs.core.concat.call(null, g, d.call(null, cljs.core.rest.call(null, f)))
          }
          f = cljs.core.rest.call(null, f)
        }else {
          return null
        }
      }
    }, null)
  }.call(null, quil.helpers.seqs.range_incl.call(null, 0, quil.core.height.call(null), 5)))
};
quil.examples.gen_art.fluffy_clouds_noise_grid.setup = function() {
  quil.core.smooth.call(null);
  quil.core.background.call(null, 0);
  return quil.examples.gen_art.fluffy_clouds_noise_grid.draw_all_points.call(null, quil.core.random.call(null, 10), quil.core.random.call(null, 10))
};
var temp__4090__auto___4294 = document.getElementById("gen-art-23");
if(cljs.core.truth_(temp__4090__auto___4294)) {
  var canvas__3573__auto___4295 = temp__4090__auto___4294, state__3574__auto___4296 = cljs.core.atom.call(null, null), pjs__3575__auto___4297 = new Processing(canvas__3573__auto___4295), binding_fn__3576__auto___4298 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___4296, pjs__3575__auto___4297), draw__3578__auto___4299 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4296, pjs__3575__auto___4297, binding_fn__3576__auto___4298), mouse_moved__3579__auto___4300 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4296, pjs__3575__auto___4297, binding_fn__3576__auto___4298, draw__3578__auto___4299), key_typed__3580__auto___4301 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4296, pjs__3575__auto___4297, binding_fn__3576__auto___4298, draw__3578__auto___4299, mouse_moved__3579__auto___4300);
  pjs__3575__auto___4297.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4297, quil.core._STAR_state_STAR_ = state__3574__auto___4296, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___4297.size(300, 300, pjs__3575__auto___4297.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___4297.size(300, 300, pjs__3575__auto___4297.OPENGL) : pjs__3575__auto___4297.size(300, 300), quil.examples.gen_art.fluffy_clouds_noise_grid.setup.call(null), pjs__3575__auto___4297.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4297.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4297, quil.core._STAR_state_STAR_ = state__3574__auto___4296, draw__3578__auto___4299.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4297.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4297, quil.core._STAR_state_STAR_ = state__3574__auto___4296, key_typed__3580__auto___4301.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4297.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4297, quil.core._STAR_state_STAR_ = state__3574__auto___4296, mouse_moved__3579__auto___4300.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4297.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-23")
}
;quil.examples.gen_art.aspiral = {};
quil.examples.gen_art.aspiral.setup = function() {
  quil.core.background.call(null, 255);
  quil.core.stroke_weight.call(null, 5);
  quil.core.smooth.call(null);
  var a = cljs.core.map.call(null, quil.core.radians, quil.helpers.seqs.range_incl.call(null, 0, 1440, 5)), b = quil.helpers.seqs.steps.call(null, 10, 0.5), c = cljs.core.map.call(null, function(a, b) {
    return function(a, c) {
      return b + c * quil.core.cos.call(null, a)
    }
  }(100, 250, 150, a, b), a, b), a = cljs.core.map.call(null, function(a, b, c) {
    return function(a, b) {
      return c + b * quil.core.sin.call(null, a)
    }
  }(100, 250, 150, a, b, c), a, b), c = quil.helpers.drawing.line_join_points.call(null, c, a);
  quil.core.stroke.call(null, 0, 30);
  quil.core.no_fill.call(null);
  quil.core.ellipse.call(null, 250, 150, 200, 200);
  quil.core.stroke.call(null, 20, 50, 70);
  return cljs.core.dorun.call(null, cljs.core.map.call(null, function(a) {
    return cljs.core.apply.call(null, quil.core.line, a)
  }, c))
};
var temp__4090__auto___4346 = document.getElementById("gen-art-12");
if(cljs.core.truth_(temp__4090__auto___4346)) {
  var canvas__3573__auto___4347 = temp__4090__auto___4346, state__3574__auto___4348 = cljs.core.atom.call(null, null), pjs__3575__auto___4349 = new Processing(canvas__3573__auto___4347), binding_fn__3576__auto___4350 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___4348, pjs__3575__auto___4349), draw__3578__auto___4351 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4348, pjs__3575__auto___4349, binding_fn__3576__auto___4350), mouse_moved__3579__auto___4352 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4348, pjs__3575__auto___4349, binding_fn__3576__auto___4350, draw__3578__auto___4351), key_typed__3580__auto___4353 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4348, pjs__3575__auto___4349, binding_fn__3576__auto___4350, draw__3578__auto___4351, mouse_moved__3579__auto___4352);
  pjs__3575__auto___4349.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4349, quil.core._STAR_state_STAR_ = state__3574__auto___4348, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___4349.size(500, 300, pjs__3575__auto___4349.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___4349.size(500, 300, pjs__3575__auto___4349.OPENGL) : pjs__3575__auto___4349.size(500, 300), quil.examples.gen_art.aspiral.setup.call(null), pjs__3575__auto___4349.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4349.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4349, quil.core._STAR_state_STAR_ = state__3574__auto___4348, draw__3578__auto___4351.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4349.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4349, quil.core._STAR_state_STAR_ = state__3574__auto___4348, key_typed__3580__auto___4353.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4349.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4349, quil.core._STAR_state_STAR_ = state__3574__auto___4348, mouse_moved__3579__auto___4352.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4349.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-12")
}
;quil.examples.gen_art.dotted_circle = {};
quil.examples.gen_art.dotted_circle.setup = function() {
  quil.core.background.call(null, 255);
  quil.core.stroke_weight.call(null, 5);
  quil.core.smooth.call(null);
  var a = cljs.core.map.call(null, quil.core.radians, quil.helpers.seqs.range_incl.call(null, 0, 360, 5)), b = cljs.core.map.call(null, function(a, b) {
    return function(e) {
      return b + a * quil.core.cos.call(null, e)
    }
  }(100, 250, 150, a), a), a = cljs.core.map.call(null, function(a, b, e) {
    return function(b) {
      return e + a * quil.core.sin.call(null, b)
    }
  }(100, 250, 150, a, b), a);
  quil.core.stroke.call(null, 0, 30);
  quil.core.no_fill.call(null);
  quil.core.ellipse.call(null, 250, 150, 200, 200);
  quil.core.stroke.call(null, 20, 50, 70);
  return cljs.core.dorun.call(null, cljs.core.map.call(null, quil.core.point, b, a))
};
var temp__4090__auto___3762 = document.getElementById("gen-art-11");
if(cljs.core.truth_(temp__4090__auto___3762)) {
  var canvas__3573__auto___3763 = temp__4090__auto___3762, state__3574__auto___3764 = cljs.core.atom.call(null, null), pjs__3575__auto___3765 = new Processing(canvas__3573__auto___3763), binding_fn__3576__auto___3766 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___3764, pjs__3575__auto___3765), draw__3578__auto___3767 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3764, pjs__3575__auto___3765, binding_fn__3576__auto___3766), mouse_moved__3579__auto___3768 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3764, pjs__3575__auto___3765, binding_fn__3576__auto___3766, draw__3578__auto___3767), key_typed__3580__auto___3769 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3764, pjs__3575__auto___3765, binding_fn__3576__auto___3766, draw__3578__auto___3767, mouse_moved__3579__auto___3768);
  pjs__3575__auto___3765.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3765, quil.core._STAR_state_STAR_ = state__3574__auto___3764, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___3765.size(500, 300, pjs__3575__auto___3765.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___3765.size(500, 300, pjs__3575__auto___3765.OPENGL) : pjs__3575__auto___3765.size(500, 300), quil.examples.gen_art.dotted_circle.setup.call(null), pjs__3575__auto___3765.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3765.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3765, quil.core._STAR_state_STAR_ = state__3574__auto___3764, draw__3578__auto___3767.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3765.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3765, quil.core._STAR_state_STAR_ = state__3574__auto___3764, key_typed__3580__auto___3769.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3765.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3765, quil.core._STAR_state_STAR_ = state__3574__auto___3764, mouse_moved__3579__auto___3768.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3765.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-11")
}
;quil.examples.gen_art.circle_from_opposing_lines = {};
quil.examples.gen_art.circle_from_opposing_lines.setup = function() {
  quil.core.background.call(null, 255);
  quil.core.stroke_weight.call(null, 0.5);
  quil.core.smooth.call(null);
  quil.core.no_fill.call(null);
  quil.core.stroke.call(null, 20, 50, 70);
  var a = quil.helpers.seqs.range_incl.call(null, 0, 360), b = cljs.core.map.call(null, quil.core.radians, a), c = cljs.core.map.call(null, cljs.core._PLUS_, b, cljs.core.repeat.call(null, quil.core.PI)), d = cljs.core.map.call(null, function(a, b) {
    return function(c) {
      return quil.helpers.calc.mul_add.call(null, quil.core.cos.call(null, c), a, b)
    }
  }(130, 250, 150, a, b, c), b), e = cljs.core.map.call(null, function(a, b, c) {
    return function(b) {
      return quil.helpers.calc.mul_add.call(null, quil.core.sin.call(null, b), a, c)
    }
  }(130, 250, 150, a, b, c, d), b), f = cljs.core.map.call(null, function(a, b) {
    return function(c) {
      return quil.helpers.calc.mul_add.call(null, quil.core.cos.call(null, c), a, b)
    }
  }(130, 250, 150, a, b, c, d, e), c), a = cljs.core.map.call(null, function(a, b, c) {
    return function(b) {
      return quil.helpers.calc.mul_add.call(null, quil.core.sin.call(null, b), a, c)
    }
  }(130, 250, 150, a, b, c, d, e, f), c);
  return cljs.core.doall.call(null, cljs.core.map.call(null, quil.core.line, d, e, f, a))
};
var temp__4090__auto___3660 = document.getElementById("gen-art-16");
if(cljs.core.truth_(temp__4090__auto___3660)) {
  var canvas__3573__auto___3661 = temp__4090__auto___3660, state__3574__auto___3662 = cljs.core.atom.call(null, null), pjs__3575__auto___3663 = new Processing(canvas__3573__auto___3661), binding_fn__3576__auto___3664 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___3662, pjs__3575__auto___3663), draw__3578__auto___3665 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3662, pjs__3575__auto___3663, binding_fn__3576__auto___3664), mouse_moved__3579__auto___3666 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3662, pjs__3575__auto___3663, binding_fn__3576__auto___3664, draw__3578__auto___3665), key_typed__3580__auto___3667 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3662, pjs__3575__auto___3663, binding_fn__3576__auto___3664, draw__3578__auto___3665, mouse_moved__3579__auto___3666);
  pjs__3575__auto___3663.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3663, quil.core._STAR_state_STAR_ = state__3574__auto___3662, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___3663.size(500, 300, pjs__3575__auto___3663.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___3663.size(500, 300, pjs__3575__auto___3663.OPENGL) : pjs__3575__auto___3663.size(500, 300), quil.examples.gen_art.circle_from_opposing_lines.setup.call(null), pjs__3575__auto___3663.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3663.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3663, quil.core._STAR_state_STAR_ = state__3574__auto___3662, draw__3578__auto___3665.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3663.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3663, quil.core._STAR_state_STAR_ = state__3574__auto___3662, key_typed__3580__auto___3667.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3663.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3663, quil.core._STAR_state_STAR_ = state__3574__auto___3662, mouse_moved__3579__auto___3666.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3663.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-16")
}
;quil.examples.gen_art.sine_wave_with_noise = {};
quil.examples.gen_art.sine_wave_with_noise.setup = function() {
  quil.core.background.call(null, 255);
  quil.core.stroke_weight.call(null, 5);
  quil.core.smooth.call(null);
  quil.core.stroke.call(null, 0, 30);
  quil.core.line.call(null, 20, 50, 480, 50);
  quil.core.stroke.call(null, 20, 50, 70);
  var a = quil.helpers.seqs.range_incl.call(null, 20, 480, 1), b = cljs.core.map.call(null, quil.core.radians, cljs.core.range.call(null)), c = cljs.core.map.call(null, quil.core.sin, b), c = cljs.core.map.call(null, function(a) {
    return quil.core.pow.call(null, a, 3)
  }, c), b = cljs.core.map.call(null, function(a, b) {
    return 30 * a * quil.core.noise.call(null, 2 * b)
  }, c, b), b = quil.helpers.calc.mul_add.call(null, b, 1, 50), a = quil.helpers.drawing.line_join_points.call(null, a, b);
  return cljs.core.dorun.call(null, cljs.core.map.call(null, function(a) {
    return cljs.core.apply.call(null, quil.core.line, a)
  }, a))
};
var temp__4090__auto___4720 = document.getElementById("gen-art-9");
if(cljs.core.truth_(temp__4090__auto___4720)) {
  var canvas__3573__auto___4721 = temp__4090__auto___4720, state__3574__auto___4722 = cljs.core.atom.call(null, null), pjs__3575__auto___4723 = new Processing(canvas__3573__auto___4721), binding_fn__3576__auto___4724 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___4722, pjs__3575__auto___4723), draw__3578__auto___4725 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4722, pjs__3575__auto___4723, binding_fn__3576__auto___4724), mouse_moved__3579__auto___4726 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4722, pjs__3575__auto___4723, binding_fn__3576__auto___4724, draw__3578__auto___4725), key_typed__3580__auto___4727 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4722, pjs__3575__auto___4723, binding_fn__3576__auto___4724, draw__3578__auto___4725, mouse_moved__3579__auto___4726);
  pjs__3575__auto___4723.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4723, quil.core._STAR_state_STAR_ = state__3574__auto___4722, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___4723.size(500, 100, pjs__3575__auto___4723.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___4723.size(500, 100, pjs__3575__auto___4723.OPENGL) : pjs__3575__auto___4723.size(500, 100), quil.examples.gen_art.sine_wave_with_noise.setup.call(null), pjs__3575__auto___4723.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4723.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4723, quil.core._STAR_state_STAR_ = state__3574__auto___4722, draw__3578__auto___4725.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4723.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4723, quil.core._STAR_state_STAR_ = state__3574__auto___4722, key_typed__3580__auto___4727.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4723.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4723, quil.core._STAR_state_STAR_ = state__3574__auto___4722, mouse_moved__3579__auto___4726.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4723.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-9")
}
;quil.examples.gen_art.warped_circle_from_fading_opposing_lines = {};
quil.examples.gen_art.warped_circle_from_fading_opposing_lines.setup = function() {
  quil.core.background.call(null, 255);
  quil.core.stroke_weight.call(null, 0.5);
  quil.core.smooth.call(null);
  quil.core.stroke.call(null, 20, 50, 70);
  var a = quil.helpers.seqs.range_incl.call(null, 0, 360), b = cljs.core.map.call(null, quil.core.radians, a), c = cljs.core.map.call(null, cljs.core._PLUS_, b, cljs.core.repeat.call(null, quil.core.PI)), d = cljs.core.cycle.call(null, quil.helpers.seqs.range_incl.call(null, 255, 0, -1)), e = quil.helpers.seqs.steps.call(null, quil.core.random.call(null, 10), 0.005), f = cljs.core.map.call(null, quil.core.noise, e), g = quil.helpers.calc.mul_add.call(null, f, 400, 1), h = cljs.core.map.call(null, 
  function(a) {
    return function(b, c) {
      return quil.helpers.calc.mul_add.call(null, quil.core.cos.call(null, c), b, a)
    }
  }(250, 150, a, b, c, d, e, f, g), g, b), i = cljs.core.map.call(null, function(a, b) {
    return function(a, c) {
      return quil.helpers.calc.mul_add.call(null, quil.core.sin.call(null, c), a, b)
    }
  }(250, 150, a, b, c, d, e, f, g, h), g, b), j = cljs.core.map.call(null, function(a) {
    return function(b, c) {
      return quil.helpers.calc.mul_add.call(null, quil.core.cos.call(null, c), b, a)
    }
  }(250, 150, a, b, c, d, e, f, g, h, i), g, c), a = cljs.core.map.call(null, function(a, b) {
    return function(a, c) {
      return quil.helpers.calc.mul_add.call(null, quil.core.sin.call(null, c), a, b)
    }
  }(250, 150, a, b, c, d, e, f, g, h, i, j), g, c);
  return cljs.core.doall.call(null, cljs.core.map.call(null, function(a, b, c, d, e) {
    quil.core.stroke.call(null, e);
    return quil.core.line.call(null, a, b, c, d)
  }, h, i, j, a, d))
};
var temp__4090__auto___4953 = document.getElementById("gen-art-18");
if(cljs.core.truth_(temp__4090__auto___4953)) {
  var canvas__3573__auto___4954 = temp__4090__auto___4953, state__3574__auto___4955 = cljs.core.atom.call(null, null), pjs__3575__auto___4956 = new Processing(canvas__3573__auto___4954), binding_fn__3576__auto___4957 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___4955, pjs__3575__auto___4956), draw__3578__auto___4958 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4955, pjs__3575__auto___4956, binding_fn__3576__auto___4957), mouse_moved__3579__auto___4959 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4955, pjs__3575__auto___4956, binding_fn__3576__auto___4957, draw__3578__auto___4958), key_typed__3580__auto___4960 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4955, pjs__3575__auto___4956, binding_fn__3576__auto___4957, draw__3578__auto___4958, mouse_moved__3579__auto___4959);
  pjs__3575__auto___4956.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4956, quil.core._STAR_state_STAR_ = state__3574__auto___4955, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___4956.size(500, 300, pjs__3575__auto___4956.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___4956.size(500, 300, pjs__3575__auto___4956.OPENGL) : pjs__3575__auto___4956.size(500, 300), quil.examples.gen_art.warped_circle_from_fading_opposing_lines.setup.call(null), pjs__3575__auto___4956.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4956.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4956, quil.core._STAR_state_STAR_ = state__3574__auto___4955, draw__3578__auto___4958.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4956.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4956, quil.core._STAR_state_STAR_ = state__3574__auto___4955, key_typed__3580__auto___4960.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4956.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4956, quil.core._STAR_state_STAR_ = state__3574__auto___4955, mouse_moved__3579__auto___4959.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4956.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-18")
}
;quil.examples.gen_art.sphere = {};
quil.examples.gen_art.sphere.setup = function() {
  quil.core.smooth.call(null);
  quil.core.sphere_detail.call(null, 100);
  quil.core.translate.call(null, quil.core.width.call(null) / 2, quil.core.height.call(null) / 2, 0);
  return quil.core.sphere.call(null, 100)
};
var temp__4090__auto___3685 = document.getElementById("gen-art-26");
if(cljs.core.truth_(temp__4090__auto___3685)) {
  var canvas__3573__auto___3686 = temp__4090__auto___3685, state__3574__auto___3687 = cljs.core.atom.call(null, null), pjs__3575__auto___3688 = new Processing(canvas__3573__auto___3686), binding_fn__3576__auto___3689 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___3687, pjs__3575__auto___3688), draw__3578__auto___3690 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3687, pjs__3575__auto___3688, binding_fn__3576__auto___3689), mouse_moved__3579__auto___3691 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3687, pjs__3575__auto___3688, binding_fn__3576__auto___3689, draw__3578__auto___3690), key_typed__3580__auto___3692 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3687, pjs__3575__auto___3688, binding_fn__3576__auto___3689, draw__3578__auto___3690, mouse_moved__3579__auto___3691);
  pjs__3575__auto___3688.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3688, quil.core._STAR_state_STAR_ = state__3574__auto___3687, cljs.core._EQ_.call(null, "\ufdd0:p3d", "\ufdd0:opengl") ? pjs__3575__auto___3688.size(500, 300, pjs__3575__auto___3688.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", "\ufdd0:opengl") ? pjs__3575__auto___3688.size(500, 300, pjs__3575__auto___3688.OPENGL) : pjs__3575__auto___3688.size(500, 300), quil.examples.gen_art.sphere.setup.call(null), pjs__3575__auto___3688.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3688.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3688, quil.core._STAR_state_STAR_ = state__3574__auto___3687, draw__3578__auto___3690.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3688.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3688, quil.core._STAR_state_STAR_ = state__3574__auto___3687, key_typed__3580__auto___3692.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3688.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3688, quil.core._STAR_state_STAR_ = state__3574__auto___3687, mouse_moved__3579__auto___3691.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3688.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-26")
}
;quil.examples.gen_art.cloud_cube = {};
quil.examples.gen_art.cloud_cube.side_length = 200;
quil.examples.gen_art.cloud_cube.spacing = 5;
quil.examples.gen_art.cloud_cube.draw_point = function(a, b, c, d) {
  quil.core.push_matrix.call(null);
  quil.core.translate.call(null, a, b, c);
  quil.core.fill.call(null, 255 * d, 10);
  quil.core.box.call(null, quil.examples.gen_art.cloud_cube.spacing, quil.examples.gen_art.cloud_cube.spacing, quil.examples.gen_art.cloud_cube.spacing);
  return quil.core.pop_matrix.call(null)
};
quil.examples.gen_art.cloud_cube.draw = function() {
  quil.core.background.call(null, 0);
  var a = quil.core.frame_count.call(null), b = quil.core.state.call(null, "\ufdd0:x-start"), c = quil.core.state.call(null, "\ufdd0:y-start"), d = quil.core.state.call(null, "\ufdd0:z-start"), e = 0.1 * a, f = 0.01 * a;
  quil.core.translate.call(null, 150, 20, -150);
  quil.core.rotate_z.call(null, e);
  quil.core.rotate_y.call(null, e);
  for(var g = cljs.core.seq.call(null, quil.helpers.seqs.indexed_range_incl.call(null, 0, quil.examples.gen_art.cloud_cube.side_length, quil.examples.gen_art.cloud_cube.spacing)), h = null, i = 0, j = 0;;) {
    if(j < i) {
      for(var k = cljs.core._nth.call(null, h, j), m = cljs.core.nth.call(null, k, 0, null), l = cljs.core.nth.call(null, k, 1, null), n = cljs.core.seq.call(null, quil.helpers.seqs.indexed_range_incl.call(null, 0, quil.examples.gen_art.cloud_cube.side_length, quil.examples.gen_art.cloud_cube.spacing)), p = null, q = 0, r = 0;;) {
        if(r < q) {
          for(var s = cljs.core._nth.call(null, p, r), t = cljs.core.nth.call(null, s, 0, null), u = cljs.core.nth.call(null, s, 1, null), w = cljs.core.seq.call(null, quil.helpers.seqs.indexed_range_incl.call(null, 0, quil.examples.gen_art.cloud_cube.side_length, quil.examples.gen_art.cloud_cube.spacing)), D = null, aa = 0, v = 0;;) {
            if(v < aa) {
              var x = cljs.core._nth.call(null, D, v), y = cljs.core.nth.call(null, x, 0, null), z = cljs.core.nth.call(null, x, 1, null), A = quil.helpers.calc.mul_add.call(null, m, 0.1, f + b), C = quil.helpers.calc.mul_add.call(null, t, 0.1, f + c), E = quil.helpers.calc.mul_add.call(null, y, 0.1, f + d);
              quil.examples.gen_art.cloud_cube.draw_point.call(null, z, u, l, quil.core.noise.call(null, A, C, E));
              v += 1
            }else {
              var F = cljs.core.seq.call(null, w);
              if(F) {
                var B = F;
                if(cljs.core.chunked_seq_QMARK_.call(null, B)) {
                  var G = cljs.core.chunk_first.call(null, B), H = cljs.core.chunk_rest.call(null, B), I = G, J = cljs.core.count.call(null, G), w = H, D = I, aa = J
                }else {
                  var K = cljs.core.first.call(null, B), L = cljs.core.nth.call(null, K, 0, null), M = cljs.core.nth.call(null, K, 1, null), N = quil.helpers.calc.mul_add.call(null, m, 0.1, f + b), O = quil.helpers.calc.mul_add.call(null, t, 0.1, f + c), Z = quil.helpers.calc.mul_add.call(null, L, 0.1, f + d);
                  quil.examples.gen_art.cloud_cube.draw_point.call(null, M, u, l, quil.core.noise.call(null, N, O, Z));
                  w = cljs.core.next.call(null, B);
                  D = null;
                  aa = 0
                }
                v = 0
              }else {
                break
              }
            }
          }
          r += 1
        }else {
          var $ = cljs.core.seq.call(null, n);
          if($) {
            var P = $;
            if(cljs.core.chunked_seq_QMARK_.call(null, P)) {
              var na = cljs.core.chunk_first.call(null, P), Oa = cljs.core.chunk_rest.call(null, P), Pa = na, Qa = cljs.core.count.call(null, na), n = Oa, p = Pa, q = Qa
            }else {
              for(var oa = cljs.core.first.call(null, P), pa = cljs.core.nth.call(null, oa, 0, null), qa = cljs.core.nth.call(null, oa, 1, null), ba = cljs.core.seq.call(null, quil.helpers.seqs.indexed_range_incl.call(null, 0, quil.examples.gen_art.cloud_cube.side_length, quil.examples.gen_art.cloud_cube.spacing)), ca = null, da = 0, Q = 0;;) {
                if(Q < da) {
                  var ra = cljs.core._nth.call(null, ca, Q), Ra = cljs.core.nth.call(null, ra, 0, null), Sa = cljs.core.nth.call(null, ra, 1, null), Ta = quil.helpers.calc.mul_add.call(null, m, 0.1, f + b), Ua = quil.helpers.calc.mul_add.call(null, pa, 0.1, f + c), Va = quil.helpers.calc.mul_add.call(null, Ra, 0.1, f + d);
                  quil.examples.gen_art.cloud_cube.draw_point.call(null, Sa, qa, l, quil.core.noise.call(null, Ta, Ua, Va));
                  Q += 1
                }else {
                  var sa = cljs.core.seq.call(null, ba);
                  if(sa) {
                    var R = sa;
                    if(cljs.core.chunked_seq_QMARK_.call(null, R)) {
                      var ta = cljs.core.chunk_first.call(null, R), Wa = cljs.core.chunk_rest.call(null, R), Xa = ta, Ya = cljs.core.count.call(null, ta), ba = Wa, ca = Xa, da = Ya
                    }else {
                      var ua = cljs.core.first.call(null, R), Za = cljs.core.nth.call(null, ua, 0, null), $a = cljs.core.nth.call(null, ua, 1, null), ab = quil.helpers.calc.mul_add.call(null, m, 0.1, f + b), bb = quil.helpers.calc.mul_add.call(null, pa, 0.1, f + c), cb = quil.helpers.calc.mul_add.call(null, Za, 0.1, f + d);
                      quil.examples.gen_art.cloud_cube.draw_point.call(null, $a, qa, l, quil.core.noise.call(null, ab, bb, cb));
                      ba = cljs.core.next.call(null, R);
                      ca = null;
                      da = 0
                    }
                    Q = 0
                  }else {
                    break
                  }
                }
              }
              n = cljs.core.next.call(null, P);
              p = null;
              q = 0
            }
            r = 0
          }else {
            break
          }
        }
      }
      j += 1
    }else {
      var va = cljs.core.seq.call(null, g);
      if(va) {
        var S = va;
        if(cljs.core.chunked_seq_QMARK_.call(null, S)) {
          var wa = cljs.core.chunk_first.call(null, S), db = cljs.core.chunk_rest.call(null, S), eb = wa, fb = cljs.core.count.call(null, wa), g = db, h = eb, i = fb
        }else {
          for(var xa = cljs.core.first.call(null, S), m = cljs.core.nth.call(null, xa, 0, null), l = cljs.core.nth.call(null, xa, 1, null), ea = cljs.core.seq.call(null, quil.helpers.seqs.indexed_range_incl.call(null, 0, quil.examples.gen_art.cloud_cube.side_length, quil.examples.gen_art.cloud_cube.spacing)), fa = null, ga = 0, T = 0;;) {
            if(T < ga) {
              for(var ya = cljs.core._nth.call(null, fa, T), za = cljs.core.nth.call(null, ya, 0, null), Aa = cljs.core.nth.call(null, ya, 1, null), ha = cljs.core.seq.call(null, quil.helpers.seqs.indexed_range_incl.call(null, 0, quil.examples.gen_art.cloud_cube.side_length, quil.examples.gen_art.cloud_cube.spacing)), ia = null, ja = 0, U = 0;;) {
                if(U < ja) {
                  var Ba = cljs.core._nth.call(null, ia, U), gb = cljs.core.nth.call(null, Ba, 0, null), hb = cljs.core.nth.call(null, Ba, 1, null), ib = quil.helpers.calc.mul_add.call(null, m, 0.1, f + b), jb = quil.helpers.calc.mul_add.call(null, za, 0.1, f + c), kb = quil.helpers.calc.mul_add.call(null, gb, 0.1, f + d);
                  quil.examples.gen_art.cloud_cube.draw_point.call(null, hb, Aa, l, quil.core.noise.call(null, ib, jb, kb));
                  U += 1
                }else {
                  var Ca = cljs.core.seq.call(null, ha);
                  if(Ca) {
                    var V = Ca;
                    if(cljs.core.chunked_seq_QMARK_.call(null, V)) {
                      var Da = cljs.core.chunk_first.call(null, V), lb = cljs.core.chunk_rest.call(null, V), mb = Da, nb = cljs.core.count.call(null, Da), ha = lb, ia = mb, ja = nb
                    }else {
                      var Ea = cljs.core.first.call(null, V), ob = cljs.core.nth.call(null, Ea, 0, null), pb = cljs.core.nth.call(null, Ea, 1, null), qb = quil.helpers.calc.mul_add.call(null, m, 0.1, f + b), rb = quil.helpers.calc.mul_add.call(null, za, 0.1, f + c), sb = quil.helpers.calc.mul_add.call(null, ob, 0.1, f + d);
                      quil.examples.gen_art.cloud_cube.draw_point.call(null, pb, Aa, l, quil.core.noise.call(null, qb, rb, sb));
                      ha = cljs.core.next.call(null, V);
                      ia = null;
                      ja = 0
                    }
                    U = 0
                  }else {
                    break
                  }
                }
              }
              T += 1
            }else {
              var Fa = cljs.core.seq.call(null, ea);
              if(Fa) {
                var W = Fa;
                if(cljs.core.chunked_seq_QMARK_.call(null, W)) {
                  var Ga = cljs.core.chunk_first.call(null, W), tb = cljs.core.chunk_rest.call(null, W), ub = Ga, vb = cljs.core.count.call(null, Ga), ea = tb, fa = ub, ga = vb
                }else {
                  for(var Ha = cljs.core.first.call(null, W), Ia = cljs.core.nth.call(null, Ha, 0, null), Ja = cljs.core.nth.call(null, Ha, 1, null), ka = cljs.core.seq.call(null, quil.helpers.seqs.indexed_range_incl.call(null, 0, quil.examples.gen_art.cloud_cube.side_length, quil.examples.gen_art.cloud_cube.spacing)), la = null, ma = 0, X = 0;;) {
                    if(X < ma) {
                      var Ka = cljs.core._nth.call(null, la, X), wb = cljs.core.nth.call(null, Ka, 0, null), xb = cljs.core.nth.call(null, Ka, 1, null), yb = quil.helpers.calc.mul_add.call(null, m, 0.1, f + b), zb = quil.helpers.calc.mul_add.call(null, Ia, 0.1, f + c), Ab = quil.helpers.calc.mul_add.call(null, wb, 0.1, f + d);
                      quil.examples.gen_art.cloud_cube.draw_point.call(null, xb, Ja, l, quil.core.noise.call(null, yb, zb, Ab));
                      X += 1
                    }else {
                      var La = cljs.core.seq.call(null, ka);
                      if(La) {
                        var Y = La;
                        if(cljs.core.chunked_seq_QMARK_.call(null, Y)) {
                          var Ma = cljs.core.chunk_first.call(null, Y), Bb = cljs.core.chunk_rest.call(null, Y), Cb = Ma, Db = cljs.core.count.call(null, Ma), ka = Bb, la = Cb, ma = Db
                        }else {
                          var Na = cljs.core.first.call(null, Y), Eb = cljs.core.nth.call(null, Na, 0, null), Fb = cljs.core.nth.call(null, Na, 1, null), Gb = quil.helpers.calc.mul_add.call(null, m, 0.1, f + b), Hb = quil.helpers.calc.mul_add.call(null, Ia, 0.1, f + c), Ib = quil.helpers.calc.mul_add.call(null, Eb, 0.1, f + d);
                          quil.examples.gen_art.cloud_cube.draw_point.call(null, Fb, Ja, l, quil.core.noise.call(null, Gb, Hb, Ib));
                          ka = cljs.core.next.call(null, Y);
                          la = null;
                          ma = 0
                        }
                        X = 0
                      }else {
                        break
                      }
                    }
                  }
                  ea = cljs.core.next.call(null, W);
                  fa = null;
                  ga = 0
                }
                T = 0
              }else {
                break
              }
            }
          }
          g = cljs.core.next.call(null, S);
          h = null;
          i = 0
        }
        j = 0
      }else {
        return null
      }
    }
  }
};
quil.examples.gen_art.cloud_cube.setup = function() {
  quil.core.background.call(null, 0);
  quil.core.no_stroke.call(null);
  return quil.core.set_state_BANG_.call(null, "\ufdd0:x-start", quil.core.random.call(null, 10), "\ufdd0:y-start", quil.core.random.call(null, 10), "\ufdd0:z-start", quil.core.random.call(null, 10))
};
var temp__4090__auto___4204 = document.getElementById("gen-art-28");
if(cljs.core.truth_(temp__4090__auto___4204)) {
  var canvas__3573__auto___4205 = temp__4090__auto___4204, state__3574__auto___4206 = cljs.core.atom.call(null, null), pjs__3575__auto___4207 = new Processing(canvas__3573__auto___4205), binding_fn__3576__auto___4208 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___4206, pjs__3575__auto___4207), draw__3578__auto___4209 = cljs.core.truth_(quil.examples.gen_art.cloud_cube.draw) ? quil.examples.gen_art.cloud_cube.draw : function() {
    return function() {
      return null
    }
  }(state__3574__auto___4206, pjs__3575__auto___4207, binding_fn__3576__auto___4208), mouse_moved__3579__auto___4210 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4206, pjs__3575__auto___4207, binding_fn__3576__auto___4208, draw__3578__auto___4209), key_typed__3580__auto___4211 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4206, pjs__3575__auto___4207, binding_fn__3576__auto___4208, draw__3578__auto___4209, mouse_moved__3579__auto___4210);
  pjs__3575__auto___4207.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4207, quil.core._STAR_state_STAR_ = state__3574__auto___4206, cljs.core._EQ_.call(null, "\ufdd0:p3d", "\ufdd0:p3d") ? pjs__3575__auto___4207.size(500, 300, pjs__3575__auto___4207.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", "\ufdd0:p3d") ? pjs__3575__auto___4207.size(500, 300, pjs__3575__auto___4207.OPENGL) : pjs__3575__auto___4207.size(500, 300), quil.examples.gen_art.cloud_cube.setup.call(null), pjs__3575__auto___4207.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4207.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4207, quil.core._STAR_state_STAR_ = state__3574__auto___4206, draw__3578__auto___4209.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4207.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4207, quil.core._STAR_state_STAR_ = state__3574__auto___4206, key_typed__3580__auto___4211.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4207.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4207, quil.core._STAR_state_STAR_ = state__3574__auto___4206, mouse_moved__3579__auto___4210.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4207.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-28")
}
;quil.examples.gen_art.growing_circle = {};
quil.examples.gen_art.growing_circle.setup = function() {
  quil.core.frame_rate.call(null, 24);
  quil.core.smooth.call(null);
  quil.core.background.call(null, 180);
  quil.core.stroke.call(null, 0);
  quil.core.stroke_weight.call(null, 5);
  quil.core.fill.call(null, 255, 25);
  var a = quil.helpers.seqs.range_incl.call(null, 10, 400, 10);
  return quil.core.set_state_BANG_.call(null, "\ufdd0:diam", quil.helpers.seqs.seq__GT_stream.call(null, a), "\ufdd0:cent-x", quil.core.width.call(null) / 2, "\ufdd0:cent-y", quil.core.height.call(null) / 2)
};
quil.examples.gen_art.growing_circle.draw = function() {
  var a = quil.core.state.call(null, "\ufdd0:cent-x"), b = quil.core.state.call(null, "\ufdd0:cent-y"), c = quil.core.state.call(null, "\ufdd0:diam").call(null);
  return cljs.core.truth_(c) ? (quil.core.background.call(null, 180), quil.core.ellipse.call(null, a, b, c, c)) : null
};
var temp__4090__auto___4255 = document.getElementById("gen-art-2");
if(cljs.core.truth_(temp__4090__auto___4255)) {
  var canvas__3573__auto___4256 = temp__4090__auto___4255, state__3574__auto___4257 = cljs.core.atom.call(null, null), pjs__3575__auto___4258 = new Processing(canvas__3573__auto___4256), binding_fn__3576__auto___4259 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___4257, pjs__3575__auto___4258), draw__3578__auto___4260 = cljs.core.truth_(quil.examples.gen_art.growing_circle.draw) ? quil.examples.gen_art.growing_circle.draw : function() {
    return function() {
      return null
    }
  }(state__3574__auto___4257, pjs__3575__auto___4258, binding_fn__3576__auto___4259), mouse_moved__3579__auto___4261 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4257, pjs__3575__auto___4258, binding_fn__3576__auto___4259, draw__3578__auto___4260), key_typed__3580__auto___4262 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4257, pjs__3575__auto___4258, binding_fn__3576__auto___4259, draw__3578__auto___4260, mouse_moved__3579__auto___4261);
  pjs__3575__auto___4258.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4258, quil.core._STAR_state_STAR_ = state__3574__auto___4257, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___4258.size(500, 300, pjs__3575__auto___4258.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___4258.size(500, 300, pjs__3575__auto___4258.OPENGL) : pjs__3575__auto___4258.size(500, 300), quil.examples.gen_art.growing_circle.setup.call(null), pjs__3575__auto___4258.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4258.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4258, quil.core._STAR_state_STAR_ = state__3574__auto___4257, draw__3578__auto___4260.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4258.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4258, quil.core._STAR_state_STAR_ = state__3574__auto___4257, key_typed__3580__auto___4262.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4258.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4258, quil.core._STAR_state_STAR_ = state__3574__auto___4257, mouse_moved__3579__auto___4261.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4258.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-2")
}
;quil.examples.gen_art.noisy_spiral = {};
quil.examples.gen_art.noisy_spiral.setup = function() {
  quil.core.background.call(null, 255);
  quil.core.stroke_weight.call(null, 5);
  quil.core.smooth.call(null);
  var a = quil.helpers.seqs.steps.call(null, cljs.core.rand.call(null, 10), 0.05), b = cljs.core.map.call(null, function(a) {
    return 200 * quil.core.noise.call(null, a)
  }, a), c = cljs.core.map.call(null, quil.core.radians, quil.helpers.seqs.range_incl.call(null, 0, 1440, 5)), d = quil.helpers.seqs.steps.call(null, 10, 0.5), e = cljs.core.map.call(null, function(a, b) {
    return a + b + -100
  }, d, b), f = cljs.core.map.call(null, function(a, b) {
    return function(a, c) {
      return quil.helpers.calc.mul_add.call(null, quil.core.cos.call(null, a), c, b)
    }
  }(100, 250, 150, a, b, c, d, e), c, e), a = cljs.core.map.call(null, function(a, b, c) {
    return function(a, b) {
      return quil.helpers.calc.mul_add.call(null, quil.core.sin.call(null, a), b, c)
    }
  }(100, 250, 150, a, b, c, d, e, f), c, e), f = quil.helpers.drawing.line_join_points.call(null, f, a);
  quil.core.stroke.call(null, 0, 30);
  quil.core.no_fill.call(null);
  quil.core.ellipse.call(null, 250, 150, 200, 200);
  quil.core.stroke.call(null, 20, 50, 70);
  return cljs.core.dorun.call(null, cljs.core.map.call(null, function(a) {
    return cljs.core.apply.call(null, quil.core.line, a)
  }, f))
};
var temp__4090__auto___5006 = document.getElementById("gen-art-13");
if(cljs.core.truth_(temp__4090__auto___5006)) {
  var canvas__3573__auto___5007 = temp__4090__auto___5006, state__3574__auto___5008 = cljs.core.atom.call(null, null), pjs__3575__auto___5009 = new Processing(canvas__3573__auto___5007), binding_fn__3576__auto___5010 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___5008, pjs__3575__auto___5009), draw__3578__auto___5011 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___5008, pjs__3575__auto___5009, binding_fn__3576__auto___5010), mouse_moved__3579__auto___5012 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___5008, pjs__3575__auto___5009, binding_fn__3576__auto___5010, draw__3578__auto___5011), key_typed__3580__auto___5013 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___5008, pjs__3575__auto___5009, binding_fn__3576__auto___5010, draw__3578__auto___5011, mouse_moved__3579__auto___5012);
  pjs__3575__auto___5009.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___5009, quil.core._STAR_state_STAR_ = state__3574__auto___5008, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___5009.size(500, 300, pjs__3575__auto___5009.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___5009.size(500, 300, pjs__3575__auto___5009.OPENGL) : pjs__3575__auto___5009.size(500, 300), quil.examples.gen_art.noisy_spiral.setup.call(null), pjs__3575__auto___5009.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___5009.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___5009, quil.core._STAR_state_STAR_ = state__3574__auto___5008, draw__3578__auto___5011.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___5009.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___5009, quil.core._STAR_state_STAR_ = state__3574__auto___5008, key_typed__3580__auto___5013.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___5009.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___5009, quil.core._STAR_state_STAR_ = state__3574__auto___5008, mouse_moved__3579__auto___5012.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___5009.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-13")
}
;quil.examples.gen_art.rotating_lines_noise_grid = {};
quil.examples.gen_art.rotating_lines_noise_grid.draw_point = function(a, b, c) {
  quil.core.push_matrix.call(null);
  quil.core.translate.call(null, a, b);
  quil.core.rotate.call(null, c * quil.core.radians.call(null, 360));
  quil.core.stroke.call(null, 0, 150);
  quil.core.line.call(null, 0, 0, 20, 0);
  return quil.core.pop_matrix.call(null)
};
quil.examples.gen_art.rotating_lines_noise_grid.draw_all_points = function(a, b) {
  return cljs.core.dorun.call(null, function d(e) {
    return new cljs.core.LazySeq(null, !1, function() {
      for(var f = e;;) {
        var g = cljs.core.seq.call(null, f);
        if(g) {
          var h = g, i = cljs.core.first.call(null, h), g = function(d, e) {
            return function l(d) {
              return new cljs.core.LazySeq(null, !1, function() {
                for(;;) {
                  var f = cljs.core.seq.call(null, d);
                  if(f) {
                    if(cljs.core.chunked_seq_QMARK_.call(null, f)) {
                      var g = cljs.core.chunk_first.call(null, f), h = cljs.core.count.call(null, g), i = cljs.core.chunk_buffer.call(null, h);
                      return function() {
                        for(var d = 0;;) {
                          if(d < h) {
                            var f = cljs.core._nth.call(null, g, d);
                            cljs.core.chunk_append.call(null, i, function() {
                              var d = quil.helpers.calc.mul_add.call(null, f, 0.01, a), g = quil.helpers.calc.mul_add.call(null, e, 0.01, b);
                              quil.core.noise.call(null, d, g);
                              return quil.examples.gen_art.rotating_lines_noise_grid.draw_point.call(null, f, e, quil.core.noise.call(null, d, g))
                            }());
                            d += 1
                          }else {
                            return!0
                          }
                        }
                      }() ? cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, i), l.call(null, cljs.core.chunk_rest.call(null, f))) : cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, i), null)
                    }
                    var j = cljs.core.first.call(null, f);
                    return cljs.core.cons.call(null, function() {
                      var d = quil.helpers.calc.mul_add.call(null, j, 0.01, a), f = quil.helpers.calc.mul_add.call(null, e, 0.01, b);
                      quil.core.noise.call(null, d, f);
                      return quil.examples.gen_art.rotating_lines_noise_grid.draw_point.call(null, j, e, quil.core.noise.call(null, d, f))
                    }(), l.call(null, cljs.core.rest.call(null, f)))
                  }
                  return null
                }
              }, null)
            }
          }(f, i, h, g);
          if(g = cljs.core.seq.call(null, g.call(null, quil.helpers.seqs.range_incl.call(null, 0, quil.core.width.call(null), 5)))) {
            return cljs.core.concat.call(null, g, d.call(null, cljs.core.rest.call(null, f)))
          }
          f = cljs.core.rest.call(null, f)
        }else {
          return null
        }
      }
    }, null)
  }.call(null, quil.helpers.seqs.range_incl.call(null, 0, quil.core.height.call(null), 5)))
};
quil.examples.gen_art.rotating_lines_noise_grid.setup = function() {
  quil.core.smooth.call(null);
  quil.core.background.call(null, 255);
  return quil.examples.gen_art.rotating_lines_noise_grid.draw_all_points.call(null, quil.core.random.call(null, 10), quil.core.random.call(null, 10))
};
var temp__4090__auto___3801 = document.getElementById("gen-art-22");
if(cljs.core.truth_(temp__4090__auto___3801)) {
  var canvas__3573__auto___3802 = temp__4090__auto___3801, state__3574__auto___3803 = cljs.core.atom.call(null, null), pjs__3575__auto___3804 = new Processing(canvas__3573__auto___3802), binding_fn__3576__auto___3805 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___3803, pjs__3575__auto___3804), draw__3578__auto___3806 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3803, pjs__3575__auto___3804, binding_fn__3576__auto___3805), mouse_moved__3579__auto___3807 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3803, pjs__3575__auto___3804, binding_fn__3576__auto___3805, draw__3578__auto___3806), key_typed__3580__auto___3808 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3803, pjs__3575__auto___3804, binding_fn__3576__auto___3805, draw__3578__auto___3806, mouse_moved__3579__auto___3807);
  pjs__3575__auto___3804.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3804, quil.core._STAR_state_STAR_ = state__3574__auto___3803, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___3804.size(300, 300, pjs__3575__auto___3804.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___3804.size(300, 300, pjs__3575__auto___3804.OPENGL) : pjs__3575__auto___3804.size(300, 300), quil.examples.gen_art.rotating_lines_noise_grid.setup.call(null), pjs__3575__auto___3804.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3804.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3804, quil.core._STAR_state_STAR_ = state__3574__auto___3803, draw__3578__auto___3806.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3804.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3804, quil.core._STAR_state_STAR_ = state__3574__auto___3803, key_typed__3580__auto___3808.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3804.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3804, quil.core._STAR_state_STAR_ = state__3574__auto___3803, mouse_moved__3579__auto___3807.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3804.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-22")
}
;quil.examples.gen_art.sine_save = {};
quil.examples.gen_art.sine_save.setup = function() {
  quil.core.background.call(null, 255);
  quil.core.stroke_weight.call(null, 5);
  quil.core.smooth.call(null);
  quil.core.stroke.call(null, 0, 30);
  quil.core.line.call(null, 20, 50, 480, 50);
  quil.core.stroke.call(null, 20, 50, 70);
  var a = quil.helpers.seqs.range_incl.call(null, 20, 480, 1), b = cljs.core.map.call(null, quil.core.radians, cljs.core.range.call(null)), b = cljs.core.map.call(null, quil.core.sin, b), b = quil.helpers.calc.mul_add.call(null, b, 40, 50), a = quil.helpers.drawing.line_join_points.call(null, a, b);
  return cljs.core.dorun.call(null, cljs.core.map.call(null, function(a) {
    return cljs.core.apply.call(null, quil.core.line, a)
  }, a))
};
var temp__4090__auto___4746 = document.getElementById("gen-art-8");
if(cljs.core.truth_(temp__4090__auto___4746)) {
  var canvas__3573__auto___4747 = temp__4090__auto___4746, state__3574__auto___4748 = cljs.core.atom.call(null, null), pjs__3575__auto___4749 = new Processing(canvas__3573__auto___4747), binding_fn__3576__auto___4750 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___4748, pjs__3575__auto___4749), draw__3578__auto___4751 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4748, pjs__3575__auto___4749, binding_fn__3576__auto___4750), mouse_moved__3579__auto___4752 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4748, pjs__3575__auto___4749, binding_fn__3576__auto___4750, draw__3578__auto___4751), key_typed__3580__auto___4753 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4748, pjs__3575__auto___4749, binding_fn__3576__auto___4750, draw__3578__auto___4751, mouse_moved__3579__auto___4752);
  pjs__3575__auto___4749.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4749, quil.core._STAR_state_STAR_ = state__3574__auto___4748, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___4749.size(500, 100, pjs__3575__auto___4749.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___4749.size(500, 100, pjs__3575__auto___4749.OPENGL) : pjs__3575__auto___4749.size(500, 100), quil.examples.gen_art.sine_save.setup.call(null), pjs__3575__auto___4749.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4749.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4749, quil.core._STAR_state_STAR_ = state__3574__auto___4748, draw__3578__auto___4751.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4749.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4749, quil.core._STAR_state_STAR_ = state__3574__auto___4748, key_typed__3580__auto___4753.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4749.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4749, quil.core._STAR_state_STAR_ = state__3574__auto___4748, mouse_moved__3579__auto___4752.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4749.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-8")
}
;quil.examples.gen_art.animated_rotated_lines = {};
quil.examples.gen_art.animated_rotated_lines.draw_point = function(a, b, c) {
  quil.core.push_matrix.call(null);
  quil.core.translate.call(null, a, b);
  quil.core.rotate.call(null, c * quil.core.radians.call(null, 360));
  quil.core.stroke.call(null, 0, 150);
  quil.core.line.call(null, 0, 0, 20, 0);
  return quil.core.pop_matrix.call(null)
};
quil.examples.gen_art.animated_rotated_lines.draw_all_points = function(a, b, c) {
  return cljs.core.dorun.call(null, function e(f) {
    return new cljs.core.LazySeq(null, !1, function() {
      for(var g = f;;) {
        var h = cljs.core.seq.call(null, g);
        if(h) {
          var i = h, j = cljs.core.first.call(null, i), k = cljs.core.nth.call(null, j, 0, null), m = cljs.core.nth.call(null, j, 1, null), h = function(c, e, f, g) {
            return function s(c) {
              return new cljs.core.LazySeq(null, !1, function() {
                for(;;) {
                  var e = cljs.core.seq.call(null, c);
                  if(e) {
                    if(cljs.core.chunked_seq_QMARK_.call(null, e)) {
                      var h = cljs.core.chunk_first.call(null, e), i = cljs.core.count.call(null, h), j = cljs.core.chunk_buffer.call(null, i);
                      a: {
                        for(var k = 0;;) {
                          if(k < i) {
                            var l = cljs.core._nth.call(null, h, k), m = cljs.core.nth.call(null, l, 0, null), l = cljs.core.nth.call(null, l, 1, null);
                            cljs.core.chunk_append.call(null, j, quil.examples.gen_art.animated_rotated_lines.draw_point.call(null, g, l, quil.core.noise.call(null, a + 0.1 * f, b + 0.1 * m)));
                            k += 1
                          }else {
                            h = !0;
                            break a
                          }
                        }
                        h = void 0
                      }
                      return h ? cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, j), s.call(null, cljs.core.chunk_rest.call(null, e))) : cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, j), null)
                    }
                    h = cljs.core.first.call(null, e);
                    j = cljs.core.nth.call(null, h, 0, null);
                    h = cljs.core.nth.call(null, h, 1, null);
                    return cljs.core.cons.call(null, quil.examples.gen_art.animated_rotated_lines.draw_point.call(null, g, h, quil.core.noise.call(null, a + 0.1 * f, b + 0.1 * j)), s.call(null, cljs.core.rest.call(null, e)))
                  }
                  return null
                }
              }, null)
            }
          }(g, j, k, m, i, h);
          if(h = cljs.core.seq.call(null, h.call(null, quil.helpers.seqs.indexed_range_incl.call(null, 0, quil.core.height.call(null), c)))) {
            return cljs.core.concat.call(null, h, e.call(null, cljs.core.rest.call(null, g)))
          }
          g = cljs.core.rest.call(null, g)
        }else {
          return null
        }
      }
    }, null)
  }.call(null, quil.helpers.seqs.indexed_range_incl.call(null, 0, quil.core.width.call(null), c)))
};
quil.examples.gen_art.animated_rotated_lines.starts_seq = function() {
  var a = quil.helpers.seqs.steps.call(null, quil.core.random.call(null, 20), 0.01), a = cljs.core.map.call(null, quil.core.noise, a), a = quil.helpers.calc.mul_add.call(null, a, 0.5, -0.25), a = quil.helpers.seqs.tally.call(null, a);
  return cljs.core.map.call(null, cljs.core._PLUS_, quil.helpers.seqs.steps.call(null, quil.core.random.call(null, 10), 0.01), a)
};
quil.examples.gen_art.animated_rotated_lines.setup = function() {
  quil.core.smooth.call(null);
  quil.core.background.call(null, 255);
  quil.core.frame_rate.call(null, 24);
  var a = quil.examples.gen_art.animated_rotated_lines.starts_seq.call(null), b = quil.examples.gen_art.animated_rotated_lines.starts_seq.call(null), a = quil.helpers.seqs.seq__GT_stream.call(null, cljs.core.map.call(null, cljs.core.list, a, b));
  return quil.core.set_state_BANG_.call(null, "\ufdd0:starts-str", a)
};
quil.examples.gen_art.animated_rotated_lines.draw = function() {
  quil.core.background.call(null, 255);
  var a = quil.core.state.call(null, "\ufdd0:starts-str").call(null), b = cljs.core.nth.call(null, a, 0, null), a = cljs.core.nth.call(null, a, 1, null);
  return quil.examples.gen_art.animated_rotated_lines.draw_all_points.call(null, b, a, 5)
};
var temp__4090__auto___4807 = document.getElementById("gen-art-25");
if(cljs.core.truth_(temp__4090__auto___4807)) {
  var canvas__3573__auto___4808 = temp__4090__auto___4807, state__3574__auto___4809 = cljs.core.atom.call(null, null), pjs__3575__auto___4810 = new Processing(canvas__3573__auto___4808), binding_fn__3576__auto___4811 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___4809, pjs__3575__auto___4810), draw__3578__auto___4812 = cljs.core.truth_(quil.examples.gen_art.animated_rotated_lines.draw) ? quil.examples.gen_art.animated_rotated_lines.draw : function() {
    return function() {
      return null
    }
  }(state__3574__auto___4809, pjs__3575__auto___4810, binding_fn__3576__auto___4811), mouse_moved__3579__auto___4813 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4809, pjs__3575__auto___4810, binding_fn__3576__auto___4811, draw__3578__auto___4812), key_typed__3580__auto___4814 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4809, pjs__3575__auto___4810, binding_fn__3576__auto___4811, draw__3578__auto___4812, mouse_moved__3579__auto___4813);
  pjs__3575__auto___4810.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4810, quil.core._STAR_state_STAR_ = state__3574__auto___4809, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___4810.size(300, 300, pjs__3575__auto___4810.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___4810.size(300, 300, pjs__3575__auto___4810.OPENGL) : pjs__3575__auto___4810.size(300, 300), quil.examples.gen_art.animated_rotated_lines.setup.call(null), pjs__3575__auto___4810.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4810.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4810, quil.core._STAR_state_STAR_ = state__3574__auto___4809, draw__3578__auto___4812.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4810.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4810, quil.core._STAR_state_STAR_ = state__3574__auto___4809, key_typed__3580__auto___4814.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4810.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4810, quil.core._STAR_state_STAR_ = state__3574__auto___4809, mouse_moved__3579__auto___4813.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4810.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-25")
}
;var key_capture = {};
key_capture.current_text_size = cljs.core.atom.call(null, 20);
key_capture.params = cljs.core.PersistentArrayMap.fromArray(["\ufdd0:big-text-size", 30, "\ufdd0:background-color", 25, "\ufdd0:foreground-color", 200], !0);
key_capture.setup = function() {
  quil.core.smooth.call(null);
  quil.core.no_stroke.call(null);
  return quil.core.set_state_BANG_.call(null, "\ufdd0:message", cljs.core.atom.call(null, "Click on screen and type a key"))
};
key_capture.draw = function() {
  quil.core.background_float.call(null, key_capture.params.call(null, "\ufdd0:background-color"));
  quil.core.stroke_weight.call(null, 20);
  quil.core.stroke_float.call(null, 10);
  quil.core.fill.call(null, key_capture.params.call(null, "\ufdd0:foreground-color"));
  quil.core.text_size.call(null, cljs.core.deref.call(null, key_capture.current_text_size));
  return quil.core.text.call(null, cljs.core.deref.call(null, quil.core.state.call(null, "\ufdd0:message")), 20, 60)
};
key_capture.key_press = function() {
  var a = key_capture.params.call(null, "\ufdd0:big-text-size");
  cljs.core.deref.call(null, key_capture.current_text_size) < a && cljs.core.reset_BANG_.call(null, key_capture.current_text_size, a);
  return cljs.core.reset_BANG_.call(null, quil.core.state.call(null, "\ufdd0:message"), [cljs.core.str("Key pressed: "), cljs.core.str(quil.core.raw_key.call(null))].join(""))
};
var temp__4090__auto___3604 = document.getElementById("key-listener");
if(cljs.core.truth_(temp__4090__auto___3604)) {
  var canvas__3573__auto___3605 = temp__4090__auto___3604, state__3574__auto___3606 = cljs.core.atom.call(null, null), pjs__3575__auto___3607 = new Processing(canvas__3573__auto___3605), binding_fn__3576__auto___3608 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___3606, pjs__3575__auto___3607), draw__3578__auto___3609 = cljs.core.truth_(key_capture.draw) ? key_capture.draw : function() {
    return function() {
      return null
    }
  }(state__3574__auto___3606, pjs__3575__auto___3607, binding_fn__3576__auto___3608), mouse_moved__3579__auto___3610 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3606, pjs__3575__auto___3607, binding_fn__3576__auto___3608, draw__3578__auto___3609), key_typed__3580__auto___3611 = cljs.core.truth_(key_capture.key_press) ? key_capture.key_press : function() {
    return function() {
      return null
    }
  }(state__3574__auto___3606, pjs__3575__auto___3607, binding_fn__3576__auto___3608, draw__3578__auto___3609, mouse_moved__3579__auto___3610);
  pjs__3575__auto___3607.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3607, quil.core._STAR_state_STAR_ = state__3574__auto___3606, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___3607.size(400, 100, pjs__3575__auto___3607.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___3607.size(400, 100, pjs__3575__auto___3607.OPENGL) : pjs__3575__auto___3607.size(400, 100), key_capture.setup.call(null), pjs__3575__auto___3607.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3607.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3607, quil.core._STAR_state_STAR_ = state__3574__auto___3606, draw__3578__auto___3609.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3607.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3607, quil.core._STAR_state_STAR_ = state__3574__auto___3606, key_typed__3580__auto___3611.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3607.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3607, quil.core._STAR_state_STAR_ = state__3574__auto___3606, mouse_moved__3579__auto___3610.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3607.setup()
}else {
  console.log("No canvas element with id : ", "key-listener")
}
;quil.examples.gen_art.random_clicked_circles = {};
quil.examples.gen_art.random_clicked_circles.num = 10;
quil.examples.gen_art.random_clicked_circles.draw_circles = function() {
  return cljs.core.dorun.call(null, function b(c) {
    return new cljs.core.LazySeq(null, !1, function() {
      for(;;) {
        var d = cljs.core.seq.call(null, c);
        if(d) {
          if(cljs.core.chunked_seq_QMARK_.call(null, d)) {
            var e = cljs.core.chunk_first.call(null, d), f = cljs.core.count.call(null, e), g = cljs.core.chunk_buffer.call(null, f);
            return function() {
              for(var b = 0;;) {
                if(b < f) {
                  cljs.core._nth.call(null, e, b), cljs.core.chunk_append.call(null, g, function() {
                    var b = quil.core.random.call(null, quil.core.width.call(null)), c = quil.core.random.call(null, quil.core.height.call(null)), d = quil.core.random.call(null, 100) + 10;
                    quil.core.no_stroke.call(null);
                    quil.core.ellipse.call(null, b, c, 2 * d, 2 * d);
                    quil.core.stroke.call(null, 0, 150);
                    return quil.core.ellipse.call(null, b, c, 10, 10)
                  }()), b += 1
                }else {
                  return!0
                }
              }
            }() ? cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, g), b.call(null, cljs.core.chunk_rest.call(null, d))) : cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, g), null)
          }
          cljs.core.first.call(null, d);
          return cljs.core.cons.call(null, function() {
            var b = quil.core.random.call(null, quil.core.width.call(null)), c = quil.core.random.call(null, quil.core.height.call(null)), d = quil.core.random.call(null, 100) + 10;
            quil.core.no_stroke.call(null);
            quil.core.ellipse.call(null, b, c, 2 * d, 2 * d);
            quil.core.stroke.call(null, 0, 150);
            return quil.core.ellipse.call(null, b, c, 10, 10)
          }(), b.call(null, cljs.core.rest.call(null, d)))
        }
        return null
      }
    }, null)
  }.call(null, cljs.core.range.call(null, 0, quil.examples.gen_art.random_clicked_circles.num)))
};
quil.examples.gen_art.random_clicked_circles.setup = function() {
  quil.core.background.call(null, 255);
  quil.core.smooth.call(null);
  quil.core.stroke_weight.call(null, 1);
  quil.core.fill.call(null, 150, 50);
  return quil.examples.gen_art.random_clicked_circles.draw_circles.call(null)
};
var temp__4090__auto___3870 = document.getElementById("gen-art-30");
if(cljs.core.truth_(temp__4090__auto___3870)) {
  var canvas__3573__auto___3871 = temp__4090__auto___3870, state__3574__auto___3872 = cljs.core.atom.call(null, null), pjs__3575__auto___3873 = new Processing(canvas__3573__auto___3871), binding_fn__3576__auto___3874 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___3872, pjs__3575__auto___3873), draw__3578__auto___3875 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3872, pjs__3575__auto___3873, binding_fn__3576__auto___3874), mouse_moved__3579__auto___3876 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3872, pjs__3575__auto___3873, binding_fn__3576__auto___3874, draw__3578__auto___3875), key_typed__3580__auto___3877 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___3872, pjs__3575__auto___3873, binding_fn__3576__auto___3874, draw__3578__auto___3875, mouse_moved__3579__auto___3876);
  pjs__3575__auto___3873.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3873, quil.core._STAR_state_STAR_ = state__3574__auto___3872, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___3873.size(500, 300, pjs__3575__auto___3873.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___3873.size(500, 300, pjs__3575__auto___3873.OPENGL) : pjs__3575__auto___3873.size(500, 300), quil.examples.gen_art.random_clicked_circles.setup.call(null), pjs__3575__auto___3873.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3873.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3873, quil.core._STAR_state_STAR_ = state__3574__auto___3872, draw__3578__auto___3875.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3873.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3873, quil.core._STAR_state_STAR_ = state__3574__auto___3872, key_typed__3580__auto___3877.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3873.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___3873, quil.core._STAR_state_STAR_ = state__3574__auto___3872, mouse_moved__3579__auto___3876.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___3873.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-30")
}
;quil.examples.gen_art.custom_rand = {};
quil.examples.gen_art.custom_rand.custom_rand = function() {
  return 1 - quil.core.pow.call(null, quil.core.random.call(null, 1), 5)
};
quil.examples.gen_art.custom_rand.setup = function() {
  quil.core.background.call(null, 255);
  quil.core.stroke_weight.call(null, 5);
  quil.core.smooth.call(null);
  quil.core.stroke.call(null, 0, 30);
  quil.core.line.call(null, 20, 50, 480, 50);
  quil.core.stroke.call(null, 20, 50, 70);
  var a = quil.helpers.seqs.range_incl.call(null, 20, 480, 5), b = cljs.core.repeatedly.call(null, quil.examples.gen_art.custom_rand.custom_rand), b = quil.helpers.calc.mul_add.call(null, b, 60, 20), a = quil.helpers.drawing.line_join_points.call(null, a, b);
  return cljs.core.dorun.call(null, cljs.core.map.call(null, function(a) {
    return cljs.core.apply.call(null, quil.core.line, a)
  }, a))
};
var temp__4090__auto___4320 = document.getElementById("gen-art-10");
if(cljs.core.truth_(temp__4090__auto___4320)) {
  var canvas__3573__auto___4321 = temp__4090__auto___4320, state__3574__auto___4322 = cljs.core.atom.call(null, null), pjs__3575__auto___4323 = new Processing(canvas__3573__auto___4321), binding_fn__3576__auto___4324 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___4322, pjs__3575__auto___4323), draw__3578__auto___4325 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4322, pjs__3575__auto___4323, binding_fn__3576__auto___4324), mouse_moved__3579__auto___4326 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4322, pjs__3575__auto___4323, binding_fn__3576__auto___4324, draw__3578__auto___4325), key_typed__3580__auto___4327 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4322, pjs__3575__auto___4323, binding_fn__3576__auto___4324, draw__3578__auto___4325, mouse_moved__3579__auto___4326);
  pjs__3575__auto___4323.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4323, quil.core._STAR_state_STAR_ = state__3574__auto___4322, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___4323.size(500, 100, pjs__3575__auto___4323.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___4323.size(500, 100, pjs__3575__auto___4323.OPENGL) : pjs__3575__auto___4323.size(500, 100), quil.examples.gen_art.custom_rand.setup.call(null), pjs__3575__auto___4323.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4323.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4323, quil.core._STAR_state_STAR_ = state__3574__auto___4322, draw__3578__auto___4325.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4323.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4323, quil.core._STAR_state_STAR_ = state__3574__auto___4322, key_typed__3580__auto___4327.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4323.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4323, quil.core._STAR_state_STAR_ = state__3574__auto___4322, mouse_moved__3579__auto___4326.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4323.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-10")
}
;quil.examples.gen_art.animated_fluffy_clouds = {};
quil.examples.gen_art.animated_fluffy_clouds.draw_point = function(a, b, c) {
  quil.core.push_matrix.call(null);
  quil.core.translate.call(null, a, b);
  quil.core.rotate.call(null, c * quil.core.radians.call(null, 540));
  a = 35 * c;
  b = quil.helpers.calc.mul_add.call(null, c, 120, 150);
  c = quil.helpers.calc.mul_add.call(null, c, 120, 150);
  quil.core.no_stroke.call(null);
  quil.core.fill.call(null, b, c);
  quil.core.ellipse.call(null, 0, 0, a, a / 2);
  return quil.core.pop_matrix.call(null)
};
quil.examples.gen_art.animated_fluffy_clouds.draw_all_points = function(a, b) {
  for(var c = quil.helpers.seqs.range_incl.call(null, 0, quil.core.width.call(null) / 5), d = quil.helpers.seqs.range_incl.call(null, 0, quil.core.height.call(null) / 5), e = cljs.core.seq.call(null, c), f = null, g = 0, h = 0;;) {
    if(h < g) {
      for(var c = cljs.core._nth.call(null, f, h), i = cljs.core.seq.call(null, d), j = null, k = 0, m = 0;;) {
        if(m < k) {
          var l = cljs.core._nth.call(null, j, m), n = 5 * c, p = 5 * l, q = quil.helpers.calc.mul_add.call(null, c, 0.1, a), l = quil.helpers.calc.mul_add.call(null, l, 0.1, b);
          quil.examples.gen_art.animated_fluffy_clouds.draw_point.call(null, n, p, quil.core.noise.call(null, q, l));
          m += 1
        }else {
          if(i = cljs.core.seq.call(null, i)) {
            cljs.core.chunked_seq_QMARK_.call(null, i) ? (k = cljs.core.chunk_first.call(null, i), i = cljs.core.chunk_rest.call(null, i), j = k, k = cljs.core.count.call(null, k)) : (n = cljs.core.first.call(null, i), j = 5 * c, k = 5 * n, m = quil.helpers.calc.mul_add.call(null, c, 0.1, a), n = quil.helpers.calc.mul_add.call(null, n, 0.1, b), quil.examples.gen_art.animated_fluffy_clouds.draw_point.call(null, j, k, quil.core.noise.call(null, m, n)), i = cljs.core.next.call(null, i), j = null, k = 
            0), m = 0
          }else {
            break
          }
        }
      }
      h += 1
    }else {
      if(c = cljs.core.seq.call(null, e)) {
        e = c;
        if(cljs.core.chunked_seq_QMARK_.call(null, e)) {
          f = cljs.core.chunk_first.call(null, e), e = cljs.core.chunk_rest.call(null, e), c = f, g = cljs.core.count.call(null, f), f = c
        }else {
          c = cljs.core.first.call(null, e);
          f = cljs.core.seq.call(null, d);
          g = null;
          for(i = h = 0;;) {
            if(i < h) {
              n = cljs.core._nth.call(null, g, i), j = 5 * c, k = 5 * n, m = quil.helpers.calc.mul_add.call(null, c, 0.1, a), n = quil.helpers.calc.mul_add.call(null, n, 0.1, b), quil.examples.gen_art.animated_fluffy_clouds.draw_point.call(null, j, k, quil.core.noise.call(null, m, n)), i += 1
            }else {
              if(f = cljs.core.seq.call(null, f)) {
                cljs.core.chunked_seq_QMARK_.call(null, f) ? (h = cljs.core.chunk_first.call(null, f), f = cljs.core.chunk_rest.call(null, f), g = h, h = cljs.core.count.call(null, h)) : (j = cljs.core.first.call(null, f), g = 5 * c, h = 5 * j, i = quil.helpers.calc.mul_add.call(null, c, 0.1, a), j = quil.helpers.calc.mul_add.call(null, j, 0.1, b), quil.examples.gen_art.animated_fluffy_clouds.draw_point.call(null, g, h, quil.core.noise.call(null, i, j)), f = cljs.core.next.call(null, f), g = null, 
                h = 0), i = 0
              }else {
                break
              }
            }
          }
          e = cljs.core.next.call(null, e);
          f = null;
          g = 0
        }
        h = 0
      }else {
        return null
      }
    }
  }
};
quil.examples.gen_art.animated_fluffy_clouds.draw = function() {
  quil.core.background.call(null, 0);
  var a = quil.core.state.call(null, "\ufdd0:starts-str").call(null), b = cljs.core.nth.call(null, a, 0, null), a = cljs.core.nth.call(null, a, 1, null);
  return quil.examples.gen_art.animated_fluffy_clouds.draw_all_points.call(null, b, a)
};
quil.examples.gen_art.animated_fluffy_clouds.setup = function() {
  quil.core.smooth.call(null);
  quil.core.background.call(null, 0);
  quil.core.frame_rate.call(null, 24);
  var a = quil.helpers.seqs.steps.call(null, quil.core.random.call(null, 10), 0.01), b = quil.helpers.seqs.steps.call(null, quil.core.random.call(null, 10), 0.01), a = cljs.core.map.call(null, cljs.core.list, a, b), a = quil.helpers.seqs.seq__GT_stream.call(null, a);
  return quil.core.set_state_BANG_.call(null, "\ufdd0:starts-str", a)
};
var temp__4090__auto___4928 = document.getElementById("gen-art-24");
if(cljs.core.truth_(temp__4090__auto___4928)) {
  var canvas__3573__auto___4929 = temp__4090__auto___4928, state__3574__auto___4930 = cljs.core.atom.call(null, null), pjs__3575__auto___4931 = new Processing(canvas__3573__auto___4929), binding_fn__3576__auto___4932 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___4930, pjs__3575__auto___4931), draw__3578__auto___4933 = cljs.core.truth_(quil.examples.gen_art.animated_fluffy_clouds.draw) ? quil.examples.gen_art.animated_fluffy_clouds.draw : function() {
    return function() {
      return null
    }
  }(state__3574__auto___4930, pjs__3575__auto___4931, binding_fn__3576__auto___4932), mouse_moved__3579__auto___4934 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4930, pjs__3575__auto___4931, binding_fn__3576__auto___4932, draw__3578__auto___4933), key_typed__3580__auto___4935 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4930, pjs__3575__auto___4931, binding_fn__3576__auto___4932, draw__3578__auto___4933, mouse_moved__3579__auto___4934);
  pjs__3575__auto___4931.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4931, quil.core._STAR_state_STAR_ = state__3574__auto___4930, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___4931.size(300, 300, pjs__3575__auto___4931.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___4931.size(300, 300, pjs__3575__auto___4931.OPENGL) : pjs__3575__auto___4931.size(300, 300), quil.examples.gen_art.animated_fluffy_clouds.setup.call(null), pjs__3575__auto___4931.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4931.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4931, quil.core._STAR_state_STAR_ = state__3574__auto___4930, draw__3578__auto___4933.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4931.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4931, quil.core._STAR_state_STAR_ = state__3574__auto___4930, key_typed__3580__auto___4935.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4931.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4931, quil.core._STAR_state_STAR_ = state__3574__auto___4930, mouse_moved__3579__auto___4934.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4931.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-24")
}
;quil.examples.gen_art.concentric_circles = {};
quil.examples.gen_art.concentric_circles.setup = function() {
  quil.core.frame_rate.call(null, 24);
  quil.core.smooth.call(null);
  quil.core.background.call(null, 180);
  quil.core.stroke.call(null, 0);
  quil.core.stroke_weight.call(null, 1);
  quil.core.no_fill.call(null);
  return quil.core.set_state_BANG_.call(null, "\ufdd0:diam", cljs.core.atom.call(null, 10), "\ufdd0:cent-x", quil.core.width.call(null) / 2, "\ufdd0:cent-y", quil.core.height.call(null) / 2)
};
quil.examples.gen_art.concentric_circles.draw = function() {
  var a = quil.core.state.call(null, "\ufdd0:cent-x"), b = quil.core.state.call(null, "\ufdd0:cent-y"), c = quil.core.state.call(null, "\ufdd0:diam");
  return 400 >= cljs.core.deref.call(null, c) ? (quil.core.ellipse.call(null, a, b, cljs.core.deref.call(null, c), cljs.core.deref.call(null, c)), cljs.core.swap_BANG_.call(null, c, cljs.core._PLUS_, 10)) : null
};
var temp__4090__auto___4413 = document.getElementById("gen-art-3");
if(cljs.core.truth_(temp__4090__auto___4413)) {
  var canvas__3573__auto___4414 = temp__4090__auto___4413, state__3574__auto___4415 = cljs.core.atom.call(null, null), pjs__3575__auto___4416 = new Processing(canvas__3573__auto___4414), binding_fn__3576__auto___4417 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___4415, pjs__3575__auto___4416), draw__3578__auto___4418 = cljs.core.truth_(quil.examples.gen_art.concentric_circles.draw) ? quil.examples.gen_art.concentric_circles.draw : function() {
    return function() {
      return null
    }
  }(state__3574__auto___4415, pjs__3575__auto___4416, binding_fn__3576__auto___4417), mouse_moved__3579__auto___4419 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4415, pjs__3575__auto___4416, binding_fn__3576__auto___4417, draw__3578__auto___4418), key_typed__3580__auto___4420 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4415, pjs__3575__auto___4416, binding_fn__3576__auto___4417, draw__3578__auto___4418, mouse_moved__3579__auto___4419);
  pjs__3575__auto___4416.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4416, quil.core._STAR_state_STAR_ = state__3574__auto___4415, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___4416.size(500, 300, pjs__3575__auto___4416.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___4416.size(500, 300, pjs__3575__auto___4416.OPENGL) : pjs__3575__auto___4416.size(500, 300), quil.examples.gen_art.concentric_circles.setup.call(null), pjs__3575__auto___4416.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4416.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4416, quil.core._STAR_state_STAR_ = state__3574__auto___4415, draw__3578__auto___4418.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4416.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4416, quil.core._STAR_state_STAR_ = state__3574__auto___4415, key_typed__3580__auto___4420.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4416.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4416, quil.core._STAR_state_STAR_ = state__3574__auto___4415, mouse_moved__3579__auto___4419.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4416.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-3")
}
;quil.examples.gen_art.hundred_noisy_spirals = {};
quil.examples.gen_art.hundred_noisy_spirals.setup = function() {
  quil.core.background.call(null, 255);
  quil.core.stroke_weight.call(null, 0.5);
  quil.core.smooth.call(null);
  for(var a = 0;;) {
    if(100 > a) {
      var b = cljs.core.rand.call(null, 360), c = 1440 + cljs.core.rand.call(null, 1440), d = 5 + cljs.core.rand.call(null, 3), e = quil.helpers.seqs.steps.call(null, cljs.core.rand.call(null, 10), 0.05), f = cljs.core.map.call(null, function() {
        return function(a) {
          return 200 * quil.core.noise.call(null, a)
        }
      }(a, 100, 250, 150, b, c, d, e), e), g = cljs.core.map.call(null, quil.core.radians, quil.helpers.seqs.range_incl.call(null, b, c, d)), h = quil.helpers.seqs.steps.call(null, 10, 0.5), i = cljs.core.map.call(null, function() {
        return function(a, b) {
          return a + b + -100
        }
      }(a, 100, 250, 150, b, c, d, e, f, g, h), h, f), j = cljs.core.map.call(null, function(a, b, c) {
        return function(a, b) {
          return quil.helpers.calc.mul_add.call(null, quil.core.cos.call(null, a), b, c)
        }
      }(a, 100, 250, 150, b, c, d, e, f, g, h, i), g, i), k = cljs.core.map.call(null, function(a, b, c, d) {
        return function(a, b) {
          return quil.helpers.calc.mul_add.call(null, quil.core.sin.call(null, a), b, d)
        }
      }(a, 100, 250, 150, b, c, d, e, f, g, h, i, j), g, i), m = quil.helpers.drawing.line_join_points.call(null, j, k);
      quil.core.stroke.call(null, cljs.core.rand.call(null, 20), cljs.core.rand.call(null, 50), cljs.core.rand.call(null, 70), 80);
      cljs.core.dorun.call(null, cljs.core.map.call(null, function() {
        return function(a) {
          return cljs.core.apply.call(null, quil.core.line, a)
        }
      }(a, 100, 250, 150, b, c, d, e, f, g, h, i, j, k, m), m));
      a += 1
    }else {
      return null
    }
  }
};
var temp__4090__auto___4388 = document.getElementById("gen-art-14");
if(cljs.core.truth_(temp__4090__auto___4388)) {
  var canvas__3573__auto___4389 = temp__4090__auto___4388, state__3574__auto___4390 = cljs.core.atom.call(null, null), pjs__3575__auto___4391 = new Processing(canvas__3573__auto___4389), binding_fn__3576__auto___4392 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___4390, pjs__3575__auto___4391), draw__3578__auto___4393 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4390, pjs__3575__auto___4391, binding_fn__3576__auto___4392), mouse_moved__3579__auto___4394 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4390, pjs__3575__auto___4391, binding_fn__3576__auto___4392, draw__3578__auto___4393), key_typed__3580__auto___4395 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4390, pjs__3575__auto___4391, binding_fn__3576__auto___4392, draw__3578__auto___4393, mouse_moved__3579__auto___4394);
  pjs__3575__auto___4391.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4391, quil.core._STAR_state_STAR_ = state__3574__auto___4390, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___4391.size(500, 300, pjs__3575__auto___4391.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___4391.size(500, 300, pjs__3575__auto___4391.OPENGL) : pjs__3575__auto___4391.size(500, 300), quil.examples.gen_art.hundred_noisy_spirals.setup.call(null), pjs__3575__auto___4391.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4391.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4391, quil.core._STAR_state_STAR_ = state__3574__auto___4390, draw__3578__auto___4393.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4391.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4391, quil.core._STAR_state_STAR_ = state__3574__auto___4390, key_typed__3580__auto___4395.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4391.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4391, quil.core._STAR_state_STAR_ = state__3574__auto___4390, mouse_moved__3579__auto___4394.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4391.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-14")
}
;quil.examples.gen_art.noise_grid = {};
quil.examples.gen_art.noise_grid.setup = function() {
  quil.core.smooth.call(null);
  quil.core.background.call(null, 255);
  return cljs.core.dorun.call(null, function() {
    var a = quil.core.random.call(null, 10), b = quil.core.random.call(null, 10);
    return function d(e) {
      return new cljs.core.LazySeq(null, !1, function() {
        for(var f = e;;) {
          var g = cljs.core.seq.call(null, f);
          if(g) {
            var h = g, i = cljs.core.first.call(null, h), g = function(d, e) {
              return function l(d) {
                return new cljs.core.LazySeq(null, !1, function() {
                  for(;;) {
                    var f = cljs.core.seq.call(null, d);
                    if(f) {
                      if(cljs.core.chunked_seq_QMARK_.call(null, f)) {
                        var g = cljs.core.chunk_first.call(null, f), h = cljs.core.count.call(null, g), i = cljs.core.chunk_buffer.call(null, h);
                        return function() {
                          for(var d = 0;;) {
                            if(d < h) {
                              var f = cljs.core._nth.call(null, g, d);
                              cljs.core.chunk_append.call(null, i, function() {
                                var d = quil.helpers.calc.mul_add.call(null, f, 0.01, a), g = quil.helpers.calc.mul_add.call(null, e, 0.01, b), d = 255 * quil.core.noise.call(null, d, g);
                                quil.core.stroke_int.call(null, 0, d);
                                return quil.core.line.call(null, f, e, f + 1, e + 1)
                              }());
                              d += 1
                            }else {
                              return!0
                            }
                          }
                        }() ? cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, i), l.call(null, cljs.core.chunk_rest.call(null, f))) : cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, i), null)
                      }
                      var j = cljs.core.first.call(null, f);
                      return cljs.core.cons.call(null, function() {
                        var d = quil.helpers.calc.mul_add.call(null, j, 0.01, a), f = quil.helpers.calc.mul_add.call(null, e, 0.01, b), d = 255 * quil.core.noise.call(null, d, f);
                        quil.core.stroke_int.call(null, 0, d);
                        return quil.core.line.call(null, j, e, j + 1, e + 1)
                      }(), l.call(null, cljs.core.rest.call(null, f)))
                    }
                    return null
                  }
                }, null)
              }
            }(f, i, h, g);
            if(g = cljs.core.seq.call(null, g.call(null, quil.helpers.seqs.range_incl.call(null, quil.core.width.call(null))))) {
              return cljs.core.concat.call(null, g, d.call(null, cljs.core.rest.call(null, f)))
            }
            f = cljs.core.rest.call(null, f)
          }else {
            return null
          }
        }
      }, null)
    }.call(null, quil.helpers.seqs.range_incl.call(null, quil.core.height.call(null)))
  }())
};
var temp__4090__auto___4640 = document.getElementById("gen-art-20");
if(cljs.core.truth_(temp__4090__auto___4640)) {
  var canvas__3573__auto___4641 = temp__4090__auto___4640, state__3574__auto___4642 = cljs.core.atom.call(null, null), pjs__3575__auto___4643 = new Processing(canvas__3573__auto___4641), binding_fn__3576__auto___4644 = function(a, b) {
    return function(c) {
      var d = quil.core._STAR_pjs_STAR_, e = quil.core._STAR_state_STAR_;
      try {
        return quil.core._STAR_pjs_STAR_ = b, quil.core._STAR_state_STAR_ = a, c.call(null)
      }finally {
        quil.core._STAR_state_STAR_ = e, quil.core._STAR_pjs_STAR_ = d
      }
    }
  }(state__3574__auto___4642, pjs__3575__auto___4643), draw__3578__auto___4645 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4642, pjs__3575__auto___4643, binding_fn__3576__auto___4644), mouse_moved__3579__auto___4646 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4642, pjs__3575__auto___4643, binding_fn__3576__auto___4644, draw__3578__auto___4645), key_typed__3580__auto___4647 = function() {
    return function() {
      return null
    }
  }(state__3574__auto___4642, pjs__3575__auto___4643, binding_fn__3576__auto___4644, draw__3578__auto___4645, mouse_moved__3579__auto___4646);
  pjs__3575__auto___4643.setup = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4643, quil.core._STAR_state_STAR_ = state__3574__auto___4642, cljs.core._EQ_.call(null, "\ufdd0:p3d", null) ? pjs__3575__auto___4643.size(300, 300, pjs__3575__auto___4643.P3D) : cljs.core._EQ_.call(null, "\ufdd0:opengl", null) ? pjs__3575__auto___4643.size(300, 300, pjs__3575__auto___4643.OPENGL) : pjs__3575__auto___4643.size(300, 300), quil.examples.gen_art.noise_grid.setup.call(null), pjs__3575__auto___4643.loop()
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4643.draw = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4643, quil.core._STAR_state_STAR_ = state__3574__auto___4642, draw__3578__auto___4645.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4643.keyTyped = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4643, quil.core._STAR_state_STAR_ = state__3574__auto___4642, key_typed__3580__auto___4647.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4643.mouseMoved = function() {
    var a = quil.core._STAR_pjs_STAR_, b = quil.core._STAR_state_STAR_;
    try {
      return quil.core._STAR_pjs_STAR_ = pjs__3575__auto___4643, quil.core._STAR_state_STAR_ = state__3574__auto___4642, mouse_moved__3579__auto___4646.call(null)
    }finally {
      quil.core._STAR_state_STAR_ = b, quil.core._STAR_pjs_STAR_ = a
    }
  };
  pjs__3575__auto___4643.setup()
}else {
  console.log("No canvas element with id : ", "gen-art-20")
}
;