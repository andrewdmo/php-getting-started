/*!
 * jQuery UI Position @VERSION
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
!function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function (t) {
    return function () {
        function i(t, i, e) {
            return [parseFloat(t[0]) * (a.test(t[0]) ? i / 100 : 1), parseFloat(t[1]) * (a.test(t[1]) ? e / 100 : 1)]
        }

        function e(i, e) {
            return parseInt(t.css(i, e), 10) || 0
        }

        function o(i) {
            var e = i[0];
            return 9 === e.nodeType ? {
                    width: i.width(),
                    height: i.height(),
                    offset: {top: 0, left: 0}
                } : t.isWindow(e) ? {
                        width: i.width(),
                        height: i.height(),
                        offset: {top: i.scrollTop(), left: i.scrollLeft()}
                    } : e.preventDefault ? {
                            width: 0,
                            height: 0,
                            offset: {top: e.pageY, left: e.pageX}
                        } : {width: i.outerWidth(), height: i.outerHeight(), offset: i.offset()}
        }

        t.ui = t.ui || {};
        var n, l, f = Math.max, s = Math.abs, h = Math.round, r = /left|center|right/, p = /top|center|bottom/, c = /[\+\-]\d+(\.[\d]+)?%?/, d = /^\w+/, a = /%$/, g = t.fn.position;
        t.position = {
            scrollbarWidth: function () {
                if (void 0 !== n)return n;
                var i, e, o = t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), l = o.children()[0];
                return t("body").append(o), i = l.offsetWidth, o.css("overflow", "scroll"), e = l.offsetWidth, i === e && (e = o[0].clientWidth), o.remove(), n = i - e
            }, getScrollInfo: function (i) {
                var e = i.isWindow || i.isDocument ? "" : i.element.css("overflow-x"), o = i.isWindow || i.isDocument ? "" : i.element.css("overflow-y"), n = "scroll" === e || "auto" === e && i.width < i.element[0].scrollWidth, l = "scroll" === o || "auto" === o && i.height < i.element[0].scrollHeight;
                return {width: l ? t.position.scrollbarWidth() : 0, height: n ? t.position.scrollbarWidth() : 0}
            }, getWithinInfo: function (i) {
                var e = t(i || window), o = t.isWindow(e[0]), n = !!e[0] && 9 === e[0].nodeType;
                return {
                    element: e,
                    isWindow: o,
                    isDocument: n,
                    offset: e.offset() || {left: 0, top: 0},
                    scrollLeft: e.scrollLeft(),
                    scrollTop: e.scrollTop(),
                    width: o || n ? e.width() : e.outerWidth(),
                    height: o || n ? e.height() : e.outerHeight()
                }
            }
        }, t.fn.position = function (n) {
            if (!n || !n.of)return g.apply(this, arguments);
            n = t.extend({}, n);
            var a, u, m, w, W, v, y = t(n.of), b = t.position.getWithinInfo(n.within), H = t.position.getScrollInfo(b), x = (n.collision || "flip").split(" "), T = {};
            return v = o(y), y[0].preventDefault && (n.at = "left top"), u = v.width, m = v.height, w = v.offset, W = t.extend({}, w), t.each(["my", "at"], function () {
                var t, i, e = (n[this] || "").split(" ");
                1 === e.length && (e = r.test(e[0]) ? e.concat(["center"]) : p.test(e[0]) ? ["center"].concat(e) : ["center", "center"]), e[0] = r.test(e[0]) ? e[0] : "center", e[1] = p.test(e[1]) ? e[1] : "center", t = c.exec(e[0]), i = c.exec(e[1]), T[this] = [t ? t[0] : 0, i ? i[0] : 0], n[this] = [d.exec(e[0])[0], d.exec(e[1])[0]]
            }), 1 === x.length && (x[1] = x[0]), "right" === n.at[0] ? W.left += u : "center" === n.at[0] && (W.left += u / 2), "bottom" === n.at[1] ? W.top += m : "center" === n.at[1] && (W.top += m / 2), a = i(T.at, u, m), W.left += a[0], W.top += a[1], this.each(function () {
                var o, r, p = t(this), c = p.outerWidth(), d = p.outerHeight(), g = e(this, "marginLeft"), v = e(this, "marginTop"), L = c + g + e(this, "marginRight") + H.width, P = d + v + e(this, "marginBottom") + H.height, D = t.extend({}, W), I = i(T.my, p.outerWidth(), p.outerHeight());
                "right" === n.my[0] ? D.left -= c : "center" === n.my[0] && (D.left -= c / 2), "bottom" === n.my[1] ? D.top -= d : "center" === n.my[1] && (D.top -= d / 2), D.left += I[0], D.top += I[1], l || (D.left = h(D.left), D.top = h(D.top)), o = {
                    marginLeft: g,
                    marginTop: v
                }, t.each(["left", "top"], function (i, e) {
                    t.ui.position[x[i]] && t.ui.position[x[i]][e](D, {
                        targetWidth: u,
                        targetHeight: m,
                        elemWidth: c,
                        elemHeight: d,
                        collisionPosition: o,
                        collisionWidth: L,
                        collisionHeight: P,
                        offset: [a[0] + I[0], a[1] + I[1]],
                        my: n.my,
                        at: n.at,
                        within: b,
                        elem: p
                    })
                }), n.using && (r = function (t) {
                    var i = w.left - D.left, e = i + u - c, o = w.top - D.top, l = o + m - d, h = {
                        target: {
                            element: y,
                            left: w.left,
                            top: w.top,
                            width: u,
                            height: m
                        },
                        element: {element: p, left: D.left, top: D.top, width: c, height: d},
                        horizontal: e < 0 ? "left" : i > 0 ? "right" : "center",
                        vertical: l < 0 ? "top" : o > 0 ? "bottom" : "middle"
                    };
                    u < c && s(i + e) < u && (h.horizontal = "center"), m < d && s(o + l) < m && (h.vertical = "middle"), f(s(i), s(e)) > f(s(o), s(l)) ? h.important = "horizontal" : h.important = "vertical", n.using.call(this, t, h)
                }), p.offset(t.extend(D, {using: r}))
            })
        }, t.ui.position = {
            fit: {
                left: function (t, i) {
                    var e, o = i.within, n = o.isWindow ? o.scrollLeft : o.offset.left, l = o.width, s = t.left - i.collisionPosition.marginLeft, h = n - s, r = s + i.collisionWidth - l - n;
                    i.collisionWidth > l ? h > 0 && r <= 0 ? (e = t.left + h + i.collisionWidth - l - n, t.left += h - e) : r > 0 && h <= 0 ? t.left = n : h > r ? t.left = n + l - i.collisionWidth : t.left = n : h > 0 ? t.left += h : r > 0 ? t.left -= r : t.left = f(t.left - s, t.left)
                }, top: function (t, i) {
                    var e, o = i.within, n = o.isWindow ? o.scrollTop : o.offset.top, l = i.within.height, s = t.top - i.collisionPosition.marginTop, h = n - s, r = s + i.collisionHeight - l - n;
                    i.collisionHeight > l ? h > 0 && r <= 0 ? (e = t.top + h + i.collisionHeight - l - n, t.top += h - e) : r > 0 && h <= 0 ? t.top = n : h > r ? t.top = n + l - i.collisionHeight : t.top = n : h > 0 ? t.top += h : r > 0 ? t.top -= r : t.top = f(t.top - s, t.top)
                }
            }, flip: {
                left: function (t, i) {
                    var e, o, n = i.within, l = n.offset.left + n.scrollLeft, f = n.width, h = n.isWindow ? n.scrollLeft : n.offset.left, r = t.left - i.collisionPosition.marginLeft, p = r - h, c = r + i.collisionWidth - f - h, d = "left" === i.my[0] ? -i.elemWidth : "right" === i.my[0] ? i.elemWidth : 0, a = "left" === i.at[0] ? i.targetWidth : "right" === i.at[0] ? -i.targetWidth : 0, g = -2 * i.offset[0];
                    p < 0 ? (e = t.left + d + a + g + i.collisionWidth - f - l, (e < 0 || e < s(p)) && (t.left += d + a + g)) : c > 0 && (o = t.left - i.collisionPosition.marginLeft + d + a + g - h, (o > 0 || s(o) < c) && (t.left += d + a + g))
                }, top: function (t, i) {
                    var e, o, n = i.within, l = n.offset.top + n.scrollTop, f = n.height, h = n.isWindow ? n.scrollTop : n.offset.top, r = t.top - i.collisionPosition.marginTop, p = r - h, c = r + i.collisionHeight - f - h, d = "top" === i.my[1], a = d ? -i.elemHeight : "bottom" === i.my[1] ? i.elemHeight : 0, g = "top" === i.at[1] ? i.targetHeight : "bottom" === i.at[1] ? -i.targetHeight : 0, u = -2 * i.offset[1];
                    p < 0 ? (o = t.top + a + g + u + i.collisionHeight - f - l, t.top + a + g + u > p && (o < 0 || o < s(p)) && (t.top += a + g + u)) : c > 0 && (e = t.top - i.collisionPosition.marginTop + a + g + u - h, t.top + a + g + u > c && (e > 0 || s(e) < c) && (t.top += a + g + u))
                }
            }, flipfit: {
                left: function () {
                    t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments)
                }, top: function () {
                    t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments)
                }
            }
        }, function () {
            var i, e, o, n, f, s = document.getElementsByTagName("body")[0], h = document.createElement("div");
            i = document.createElement(s ? "div" : "body"), o = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            }, s && t.extend(o, {position: "absolute", left: "-1000px", top: "-1000px"});
            for (f in o)i.style[f] = o[f];
            i.appendChild(h), e = s || document.documentElement, e.insertBefore(i, e.firstChild), h.style.cssText = "position: absolute; left: 10.7432222px;", n = t(h).offset().left, l = n > 10 && n < 11, i.innerHTML = "", e.removeChild(i)
        }()
    }(), t.ui.position
});