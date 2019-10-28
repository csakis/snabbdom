(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.tovnode = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createElement(tagName) {
    return document.createElement(tagName);
}
function createElementNS(namespaceURI, qualifiedName) {
    return document.createElementNS(namespaceURI, qualifiedName);
}
function createTextNode(text) {
    return document.createTextNode(text);
}
function createComment(text) {
    return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    node.removeChild(child);
}
function appendChild(node, child) {
    node.appendChild(child);
}
function parentNode(node) {
    return node.parentNode;
}
function nextSibling(node) {
    return node.nextSibling;
}
function tagName(elm) {
    return elm.tagName;
}
function setTextContent(node, text) {
    node.textContent = text;
}
function getTextContent(node) {
    return node.textContent;
}
function isElement(node) {
    return node.nodeType === 1;
}
function isText(node) {
    return node.nodeType === 3;
}
function isComment(node) {
    return node.nodeType === 8;
}
exports.htmlDomApi = {
    createElement: createElement,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    getTextContent: getTextContent,
    isElement: isElement,
    isText: isText,
    isComment: isComment,
};
exports.default = exports.htmlDomApi;

},{}],2:[function(require,module,exports){
'use strict';

const word = '[a-fA-F\\d:]';
const b = options => options && options.includeBoundaries ?
	`(?:(?<=\\s|^)(?=${word})|(?<=${word})(?=\\s|$))` :
	'';

const v4 = '(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}';

const v6seg = '[a-fA-F\\d]{1,4}';
const v6 = `
(
(?:${v6seg}:){7}(?:${v6seg}|:)|                                // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:${v6seg}:){6}(?:${v4}|:${v6seg}|:)|                         // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:${v6seg}:){5}(?::${v4}|(:${v6seg}){1,2}|:)|                 // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:${v6seg}:){4}(?:(:${v6seg}){0,1}:${v4}|(:${v6seg}){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:${v6seg}:){3}(?:(:${v6seg}){0,2}:${v4}|(:${v6seg}){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:${v6seg}:){2}(?:(:${v6seg}){0,3}:${v4}|(:${v6seg}){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:${v6seg}:){1}(?:(:${v6seg}){0,4}:${v4}|(:${v6seg}){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::((?::${v6seg}){0,5}:${v4}|(?::${v6seg}){1,7}|:))           // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(%[0-9a-zA-Z]{1,})?                                           // %eth0            %1
`.replace(/\s*\/\/.*$/gm, '').replace(/\n/g, '').trim();

const ip = options => options && options.exact ?
	new RegExp(`(?:^${v4}$)|(?:^${v6}$)`) :
	new RegExp(`(?:${b(options)}${v4}${b(options)})|(?:${b(options)}${v6}${b(options)})`, 'g');

ip.v4 = options => options && options.exact ? new RegExp(`^${v4}$`) : new RegExp(`${b(options)}${v4}${b(options)}`, 'g');
ip.v6 = options => options && options.exact ? new RegExp(`^${v6}$`) : new RegExp(`${b(options)}${v6}${b(options)}`, 'g');

module.exports = ip;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vnode_1 = require("./vnode");
var htmldomapi_1 = require("./htmldomapi");
var ipRegex = require("ip-regex");
// extend toVNode functon with extra parameter, if ip is true => scan for ip addresses 
function toVNode(node, domApi, ipFilter) {
    if (ipFilter === void 0) { ipFilter = false; }
    var api = domApi !== undefined ? domApi : htmldomapi_1.default;
    var text;
    if (api.isElement(node)) {
        var id = node.id ? '#' + node.id : '';
        var cn = node.getAttribute('class');
        var c = cn ? '.' + cn.split(' ').join('.') : '';
        var sel = api.tagName(node).toLowerCase() + id + c;
        var attrs = {};
        var children = [];
        var name_1;
        var i = void 0, n = void 0;
        var elmAttrs = node.attributes;
        var elmChildren = node.childNodes;
        for (i = 0, n = elmAttrs.length; i < n; i++) {
            name_1 = elmAttrs[i].nodeName;
            if (name_1 !== 'id' && name_1 !== 'class') {
                attrs[name_1] = elmAttrs[i].nodeValue;
            }
        }
        for (i = 0, n = elmChildren.length; i < n; i++) {
            children.push(toVNode(elmChildren[i], domApi));
        }
        return vnode_1.default(sel, { attrs: attrs }, children, undefined, node);
    }
    else if (api.isText(node)) {
        text = api.getTextContent(node);
        //check if ip scan is needed 
        if (ipFilter && ipRegex().test(text)) {
            text = '***.***.***.***';
        }
        return vnode_1.default(undefined, undefined, undefined, text, node);
    }
    else if (api.isComment(node)) {
        text = api.getTextContent(node);
        return vnode_1.default('!', {}, [], text, node);
    }
    else {
        return vnode_1.default('', {}, [], undefined, node);
    }
}
exports.toVNode = toVNode;
exports.default = toVNode;

},{"./htmldomapi":1,"./vnode":4,"ip-regex":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children, text: text, elm: elm, key: key };
}
exports.vnode = vnode;
exports.default = vnode;

},{}]},{},[3])(3)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJodG1sZG9tYXBpLmpzIiwibm9kZV9tb2R1bGVzL2lwLXJlZ2V4L2luZGV4LmpzIiwidG92bm9kZS5qcyIsInZub2RlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSkge1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZVVSSSwgcXVhbGlmaWVkTmFtZSkge1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIHF1YWxpZmllZE5hbWUpO1xyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZVRleHROb2RlKHRleHQpIHtcclxuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcclxufVxyXG5mdW5jdGlvbiBjcmVhdGVDb21tZW50KHRleHQpIHtcclxuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVDb21tZW50KHRleHQpO1xyXG59XHJcbmZ1bmN0aW9uIGluc2VydEJlZm9yZShwYXJlbnROb2RlLCBuZXdOb2RlLCByZWZlcmVuY2VOb2RlKSB7XHJcbiAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdOb2RlLCByZWZlcmVuY2VOb2RlKTtcclxufVxyXG5mdW5jdGlvbiByZW1vdmVDaGlsZChub2RlLCBjaGlsZCkge1xyXG4gICAgbm9kZS5yZW1vdmVDaGlsZChjaGlsZCk7XHJcbn1cclxuZnVuY3Rpb24gYXBwZW5kQ2hpbGQobm9kZSwgY2hpbGQpIHtcclxuICAgIG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG59XHJcbmZ1bmN0aW9uIHBhcmVudE5vZGUobm9kZSkge1xyXG4gICAgcmV0dXJuIG5vZGUucGFyZW50Tm9kZTtcclxufVxyXG5mdW5jdGlvbiBuZXh0U2libGluZyhub2RlKSB7XHJcbiAgICByZXR1cm4gbm9kZS5uZXh0U2libGluZztcclxufVxyXG5mdW5jdGlvbiB0YWdOYW1lKGVsbSkge1xyXG4gICAgcmV0dXJuIGVsbS50YWdOYW1lO1xyXG59XHJcbmZ1bmN0aW9uIHNldFRleHRDb250ZW50KG5vZGUsIHRleHQpIHtcclxuICAgIG5vZGUudGV4dENvbnRlbnQgPSB0ZXh0O1xyXG59XHJcbmZ1bmN0aW9uIGdldFRleHRDb250ZW50KG5vZGUpIHtcclxuICAgIHJldHVybiBub2RlLnRleHRDb250ZW50O1xyXG59XHJcbmZ1bmN0aW9uIGlzRWxlbWVudChub2RlKSB7XHJcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMTtcclxufVxyXG5mdW5jdGlvbiBpc1RleHQobm9kZSkge1xyXG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDM7XHJcbn1cclxuZnVuY3Rpb24gaXNDb21tZW50KG5vZGUpIHtcclxuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSA4O1xyXG59XHJcbmV4cG9ydHMuaHRtbERvbUFwaSA9IHtcclxuICAgIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnQsXHJcbiAgICBjcmVhdGVFbGVtZW50TlM6IGNyZWF0ZUVsZW1lbnROUyxcclxuICAgIGNyZWF0ZVRleHROb2RlOiBjcmVhdGVUZXh0Tm9kZSxcclxuICAgIGNyZWF0ZUNvbW1lbnQ6IGNyZWF0ZUNvbW1lbnQsXHJcbiAgICBpbnNlcnRCZWZvcmU6IGluc2VydEJlZm9yZSxcclxuICAgIHJlbW92ZUNoaWxkOiByZW1vdmVDaGlsZCxcclxuICAgIGFwcGVuZENoaWxkOiBhcHBlbmRDaGlsZCxcclxuICAgIHBhcmVudE5vZGU6IHBhcmVudE5vZGUsXHJcbiAgICBuZXh0U2libGluZzogbmV4dFNpYmxpbmcsXHJcbiAgICB0YWdOYW1lOiB0YWdOYW1lLFxyXG4gICAgc2V0VGV4dENvbnRlbnQ6IHNldFRleHRDb250ZW50LFxyXG4gICAgZ2V0VGV4dENvbnRlbnQ6IGdldFRleHRDb250ZW50LFxyXG4gICAgaXNFbGVtZW50OiBpc0VsZW1lbnQsXHJcbiAgICBpc1RleHQ6IGlzVGV4dCxcclxuICAgIGlzQ29tbWVudDogaXNDb21tZW50LFxyXG59O1xyXG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmh0bWxEb21BcGk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWh0bWxkb21hcGkuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB3b3JkID0gJ1thLWZBLUZcXFxcZDpdJztcbmNvbnN0IGIgPSBvcHRpb25zID0+IG9wdGlvbnMgJiYgb3B0aW9ucy5pbmNsdWRlQm91bmRhcmllcyA/XG5cdGAoPzooPzw9XFxcXHN8XikoPz0ke3dvcmR9KXwoPzw9JHt3b3JkfSkoPz1cXFxcc3wkKSlgIDpcblx0Jyc7XG5cbmNvbnN0IHY0ID0gJyg/OjI1WzAtNV18MlswLTRdXFxcXGR8MVxcXFxkXFxcXGR8WzEtOV1cXFxcZHxcXFxcZCkoPzpcXFxcLig/OjI1WzAtNV18MlswLTRdXFxcXGR8MVxcXFxkXFxcXGR8WzEtOV1cXFxcZHxcXFxcZCkpezN9JztcblxuY29uc3QgdjZzZWcgPSAnW2EtZkEtRlxcXFxkXXsxLDR9JztcbmNvbnN0IHY2ID0gYFxuKFxuKD86JHt2NnNlZ306KXs3fSg/OiR7djZzZWd9fDopfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMToyOjM6NDo1OjY6Nzo6ICAxOjI6Mzo0OjU6Njo3Ojhcbig/OiR7djZzZWd9Oil7Nn0oPzoke3Y0fXw6JHt2NnNlZ318Oil8ICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDE6MjozOjQ6NTo2OjogICAgMToyOjM6NDo1OjY6OjggICAxOjI6Mzo0OjU6Njo6OCAgMToyOjM6NDo1OjY6OjEuMi4zLjRcbig/OiR7djZzZWd9Oil7NX0oPzo6JHt2NH18KDoke3Y2c2VnfSl7MSwyfXw6KXwgICAgICAgICAgICAgICAgIC8vIDE6MjozOjQ6NTo6ICAgICAgMToyOjM6NDo1Ojo3OjggICAxOjI6Mzo0OjU6OjggICAgMToyOjM6NDo1Ojo3OjEuMi4zLjRcbig/OiR7djZzZWd9Oil7NH0oPzooOiR7djZzZWd9KXswLDF9OiR7djR9fCg6JHt2NnNlZ30pezEsM318Oil8IC8vIDE6MjozOjQ6OiAgICAgICAgMToyOjM6NDo6Njo3OjggICAxOjI6Mzo0Ojo4ICAgICAgMToyOjM6NDo6Njo3OjEuMi4zLjRcbig/OiR7djZzZWd9Oil7M30oPzooOiR7djZzZWd9KXswLDJ9OiR7djR9fCg6JHt2NnNlZ30pezEsNH18Oil8IC8vIDE6MjozOjogICAgICAgICAgMToyOjM6OjU6Njo3OjggICAxOjI6Mzo6OCAgICAgICAgMToyOjM6OjU6Njo3OjEuMi4zLjRcbig/OiR7djZzZWd9Oil7Mn0oPzooOiR7djZzZWd9KXswLDN9OiR7djR9fCg6JHt2NnNlZ30pezEsNX18Oil8IC8vIDE6Mjo6ICAgICAgICAgICAgMToyOjo0OjU6Njo3OjggICAxOjI6OjggICAgICAgICAgMToyOjo0OjU6Njo3OjEuMi4zLjRcbig/OiR7djZzZWd9Oil7MX0oPzooOiR7djZzZWd9KXswLDR9OiR7djR9fCg6JHt2NnNlZ30pezEsNn18Oil8IC8vIDE6OiAgICAgICAgICAgICAgMTo6Mzo0OjU6Njo3OjggICAxOjo4ICAgICAgICAgICAgMTo6Mzo0OjU6Njo3OjEuMi4zLjRcbig/OjooKD86OiR7djZzZWd9KXswLDV9OiR7djR9fCg/Ojoke3Y2c2VnfSl7MSw3fXw6KSkgICAgICAgICAgIC8vIDo6MjozOjQ6NTo2Ojc6OCAgOjoyOjM6NDo1OjY6Nzo4ICA6OjggICAgICAgICAgICAgOjoxLjIuMy40XG4pKCVbMC05YS16QS1aXXsxLH0pPyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAlZXRoMCAgICAgICAgICAgICUxXG5gLnJlcGxhY2UoL1xccypcXC9cXC8uKiQvZ20sICcnKS5yZXBsYWNlKC9cXG4vZywgJycpLnRyaW0oKTtcblxuY29uc3QgaXAgPSBvcHRpb25zID0+IG9wdGlvbnMgJiYgb3B0aW9ucy5leGFjdCA/XG5cdG5ldyBSZWdFeHAoYCg/Ol4ke3Y0fSQpfCg/Ol4ke3Y2fSQpYCkgOlxuXHRuZXcgUmVnRXhwKGAoPzoke2Iob3B0aW9ucyl9JHt2NH0ke2Iob3B0aW9ucyl9KXwoPzoke2Iob3B0aW9ucyl9JHt2Nn0ke2Iob3B0aW9ucyl9KWAsICdnJyk7XG5cbmlwLnY0ID0gb3B0aW9ucyA9PiBvcHRpb25zICYmIG9wdGlvbnMuZXhhY3QgPyBuZXcgUmVnRXhwKGBeJHt2NH0kYCkgOiBuZXcgUmVnRXhwKGAke2Iob3B0aW9ucyl9JHt2NH0ke2Iob3B0aW9ucyl9YCwgJ2cnKTtcbmlwLnY2ID0gb3B0aW9ucyA9PiBvcHRpb25zICYmIG9wdGlvbnMuZXhhY3QgPyBuZXcgUmVnRXhwKGBeJHt2Nn0kYCkgOiBuZXcgUmVnRXhwKGAke2Iob3B0aW9ucyl9JHt2Nn0ke2Iob3B0aW9ucyl9YCwgJ2cnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBpcDtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB2bm9kZV8xID0gcmVxdWlyZShcIi4vdm5vZGVcIik7XHJcbnZhciBodG1sZG9tYXBpXzEgPSByZXF1aXJlKFwiLi9odG1sZG9tYXBpXCIpO1xyXG52YXIgaXBSZWdleCA9IHJlcXVpcmUoXCJpcC1yZWdleFwiKTtcclxuLy8gZXh0ZW5kIHRvVk5vZGUgZnVuY3RvbiB3aXRoIGV4dHJhIHBhcmFtZXRlciwgaWYgaXAgaXMgdHJ1ZSA9PiBzY2FuIGZvciBpcCBhZGRyZXNzZXMgXHJcbmZ1bmN0aW9uIHRvVk5vZGUobm9kZSwgZG9tQXBpLCBpcEZpbHRlcikge1xyXG4gICAgaWYgKGlwRmlsdGVyID09PSB2b2lkIDApIHsgaXBGaWx0ZXIgPSBmYWxzZTsgfVxyXG4gICAgdmFyIGFwaSA9IGRvbUFwaSAhPT0gdW5kZWZpbmVkID8gZG9tQXBpIDogaHRtbGRvbWFwaV8xLmRlZmF1bHQ7XHJcbiAgICB2YXIgdGV4dDtcclxuICAgIGlmIChhcGkuaXNFbGVtZW50KG5vZGUpKSB7XHJcbiAgICAgICAgdmFyIGlkID0gbm9kZS5pZCA/ICcjJyArIG5vZGUuaWQgOiAnJztcclxuICAgICAgICB2YXIgY24gPSBub2RlLmdldEF0dHJpYnV0ZSgnY2xhc3MnKTtcclxuICAgICAgICB2YXIgYyA9IGNuID8gJy4nICsgY24uc3BsaXQoJyAnKS5qb2luKCcuJykgOiAnJztcclxuICAgICAgICB2YXIgc2VsID0gYXBpLnRhZ05hbWUobm9kZSkudG9Mb3dlckNhc2UoKSArIGlkICsgYztcclxuICAgICAgICB2YXIgYXR0cnMgPSB7fTtcclxuICAgICAgICB2YXIgY2hpbGRyZW4gPSBbXTtcclxuICAgICAgICB2YXIgbmFtZV8xO1xyXG4gICAgICAgIHZhciBpID0gdm9pZCAwLCBuID0gdm9pZCAwO1xyXG4gICAgICAgIHZhciBlbG1BdHRycyA9IG5vZGUuYXR0cmlidXRlcztcclxuICAgICAgICB2YXIgZWxtQ2hpbGRyZW4gPSBub2RlLmNoaWxkTm9kZXM7XHJcbiAgICAgICAgZm9yIChpID0gMCwgbiA9IGVsbUF0dHJzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBuYW1lXzEgPSBlbG1BdHRyc1tpXS5ub2RlTmFtZTtcclxuICAgICAgICAgICAgaWYgKG5hbWVfMSAhPT0gJ2lkJyAmJiBuYW1lXzEgIT09ICdjbGFzcycpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzW25hbWVfMV0gPSBlbG1BdHRyc1tpXS5ub2RlVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChpID0gMCwgbiA9IGVsbUNoaWxkcmVuLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBjaGlsZHJlbi5wdXNoKHRvVk5vZGUoZWxtQ2hpbGRyZW5baV0sIGRvbUFwaSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdm5vZGVfMS5kZWZhdWx0KHNlbCwgeyBhdHRyczogYXR0cnMgfSwgY2hpbGRyZW4sIHVuZGVmaW5lZCwgbm9kZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhcGkuaXNUZXh0KG5vZGUpKSB7XHJcbiAgICAgICAgdGV4dCA9IGFwaS5nZXRUZXh0Q29udGVudChub2RlKTtcclxuICAgICAgICAvL2NoZWNrIGlmIGlwIHNjYW4gaXMgbmVlZGVkIFxyXG4gICAgICAgIGlmIChpcEZpbHRlciAmJiBpcFJlZ2V4KCkudGVzdCh0ZXh0KSkge1xyXG4gICAgICAgICAgICB0ZXh0ID0gJyoqKi4qKiouKioqLioqKic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2bm9kZV8xLmRlZmF1bHQodW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGV4dCwgbm9kZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhcGkuaXNDb21tZW50KG5vZGUpKSB7XHJcbiAgICAgICAgdGV4dCA9IGFwaS5nZXRUZXh0Q29udGVudChub2RlKTtcclxuICAgICAgICByZXR1cm4gdm5vZGVfMS5kZWZhdWx0KCchJywge30sIFtdLCB0ZXh0LCBub2RlKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB2bm9kZV8xLmRlZmF1bHQoJycsIHt9LCBbXSwgdW5kZWZpbmVkLCBub2RlKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnRvVk5vZGUgPSB0b1ZOb2RlO1xyXG5leHBvcnRzLmRlZmF1bHQgPSB0b1ZOb2RlO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD10b3Zub2RlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmZ1bmN0aW9uIHZub2RlKHNlbCwgZGF0YSwgY2hpbGRyZW4sIHRleHQsIGVsbSkge1xyXG4gICAgdmFyIGtleSA9IGRhdGEgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IGRhdGEua2V5O1xyXG4gICAgcmV0dXJuIHsgc2VsOiBzZWwsIGRhdGE6IGRhdGEsIGNoaWxkcmVuOiBjaGlsZHJlbiwgdGV4dDogdGV4dCwgZWxtOiBlbG0sIGtleToga2V5IH07XHJcbn1cclxuZXhwb3J0cy52bm9kZSA9IHZub2RlO1xyXG5leHBvcnRzLmRlZmF1bHQgPSB2bm9kZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dm5vZGUuanMubWFwIl19
