!function (e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("./searchcursor"), require("../dialog/dialog")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "./searchcursor", "../dialog/dialog"], e) : e(CodeMirror)
}(function (e) {
    "use strict";
    function o(e, o) {
        return "string" == typeof e ? e = new RegExp(e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), o ? "gi" : "g") : e.global || (e = new RegExp(e.source, e.ignoreCase ? "gi" : "g")), {
            token: function (o) {
                e.lastIndex = o.pos;
                var n = e.exec(o.string);
                return n && n.index == o.pos ? (o.pos += n[0].length, "searching") : void(n ? o.pos = n.index : o.skipToEnd())
            }
        }
    }

    function n() {
        this.posFrom = this.posTo = this.query = null, this.overlay = null
    }

    function t(e) {
        return e.state.search || (e.state.search = new n)
    }

    function r(e) {
        return "string" == typeof e && e == e.toLowerCase()
    }

    function i(e, o, n) {
        return e.getSearchCursor(o, n, r(o))
    }

    function c(e, o, n, t, r) {
        e.openDialog ? e.openDialog(o, r, {value: t}) : r(prompt(n, t))
    }

    function a(e, o, n, t) {
        e.openConfirm ? e.openConfirm(o, t) : confirm(n) && t[0]()
    }

    function u(e) {
        var o = e.match(/^\/(.*)\/([a-z]*)$/);
        return o ? (e = new RegExp(o[1], o[2].indexOf("i") == -1 ? "" : "i"), e.test("") && (e = /x^/)) : "" == e && (e = /x^/), e
    }

    function s(e, n) {
        var i = t(e);
        return i.query ? f(e, n) : void c(e, m, "Search for:", e.getSelection(), function (t) {
                e.operation(function () {
                    t && !i.query && (i.query = u(t), e.removeOverlay(i.overlay, r(i.query)), i.overlay = o(i.query, r(i.query)), e.addOverlay(i.overlay), i.posFrom = i.posTo = e.getCursor(), f(e, n))
                })
            })
    }

    function f(o, n) {
        o.operation(function () {
            var r = t(o), c = i(o, r.query, n ? r.posFrom : r.posTo);
            (c.find(n) || (c = i(o, r.query, n ? e.Pos(o.lastLine()) : e.Pos(o.firstLine(), 0)), c.find(n))) && (o.setSelection(c.from(), c.to()), o.scrollIntoView({
                from: c.from(),
                to: c.to()
            }), r.posFrom = c.from(), r.posTo = c.to())
        })
    }

    function l(e) {
        e.operation(function () {
            var o = t(e);
            o.query && (o.query = null, e.removeOverlay(o.overlay))
        })
    }

    function p(e, o) {
        c(e, d, "Replace:", e.getSelection(), function (n) {
            n && (n = u(n), c(e, y, "Replace with:", "", function (t) {
                if (o) e.operation(function () {
                    for (var o = i(e, n); o.findNext();)if ("string" != typeof n) {
                        var r = e.getRange(o.from(), o.to()).match(n);
                        o.replace(t.replace(/\$(\d)/g, function (e, o) {
                            return r[o]
                        }))
                    } else o.replace(t)
                }); else {
                    l(e);
                    var r = i(e, n, e.getCursor()), c = function () {
                        var o, t = r.from();
                        !(o = r.findNext()) && (r = i(e, n), !(o = r.findNext()) || t && r.from().line == t.line && r.from().ch == t.ch) || (e.setSelection(r.from(), r.to()), e.scrollIntoView({
                            from: r.from(),
                            to: r.to()
                        }), a(e, g, "Replace?", [function () {
                            u(o)
                        }, c]))
                    }, u = function (e) {
                        r.replace("string" == typeof n ? t : t.replace(/\$(\d)/g, function (o, n) {
                                return e[n]
                            })), c()
                    };
                    c()
                }
            }))
        })
    }

    var m = 'Search: <input type="text" style="width: 10em"/> <span style="color: #888">(Use /re/ syntax for regexp search)</span>', d = 'Replace: <input type="text" style="width: 10em"/> <span style="color: #888">(Use /re/ syntax for regexp search)</span>', y = 'With: <input type="text" style="width: 10em"/>', g = "Replace? <button>Yes</button> <button>No</button> <button>Stop</button>";
    e.commands.find = function (e) {
        l(e), s(e)
    }, e.commands.findNext = s, e.commands.findPrev = function (e) {
        s(e, !0)
    }, e.commands.clearSearch = l, e.commands.replace = p, e.commands.replaceAll = function (e) {
        p(e, !0)
    }
});