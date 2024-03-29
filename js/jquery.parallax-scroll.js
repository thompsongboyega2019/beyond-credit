$(function () {
    ParallaxScroll.init()
});
var ParallaxScroll = {
    showLogs: !1,
    round: 1e3,
    init: function () {
        if (this._log("init"), this._inited) return this._log("Already Inited"), void(this._inited = !0);
        this._requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a, t) {
            window.setTimeout(a, 1e3 / 60)
        }, this._onScroll(!0)
    },
    _inited: !1,
    _properties: ["x", "y", "z", "rotateX", "rotateY", "rotateZ", "scaleX", "scaleY", "scaleZ", "scale"],
    _requestAnimationFrame: null,
    _log: function (a) {
        this.showLogs && console.log("Parallax Scroll / " + a)
    },
    _onScroll: function (X) {
        var Y = $(document).scrollTop(),
            Z = $(window).height();
        this._log("onScroll " + Y), $("[data-parallax]").each($.proxy(function (a, t) {
            var o = $(t),
                i = [],
                c = !1,
                e = o.data("style");
            null == e && (e = o.attr("style") || "", o.data("style", e));
            for (var l = [o.data("parallax")], n = 2; o.data("parallax" + n); n++) l.push(o.data("parallax-" + n));
            var s, r, u, d = l.length;
            for (n = 0; n < d; n++) {
                var m = l[n],
                    h = m["from-scroll"];
                null == h && (h = Math.max(0, $(t).offset().top - Z)), h |= 0;
                var p = m.distance,
                    w = m["to-scroll"];
                null == p && null == w && (p = Z), p = Math.max(0 | p, 1);
                var x, g, _, y = m.easing,
                    f = m["easing-return"];
                null != y && $.easing && $.easing[y] || (y = null), null != f && $.easing && $.easing[f] || (f = y), y && (null == (x = m.duration) && (x = p), x = Math.max(0 | x, 1), null == (g = m["duration-return"]) && (g = x), p = 1, null == (_ = o.data("current-time")) && (_ = 0)), null == w && (w = h + p), w |= 0;
                var v = m.smoothness;
                null == v && (v = 30), v |= 0, !X && 0 != v || (v = 1), v |= 0;
                var A = Y,
                    A = Math.max(A, h);
                A = Math.min(A, w), y && (null == o.data("sens") && o.data("sens", "back"), h < A && ("back" == o.data("sens") ? (_ = 1, o.data("sens", "go")) : _++), A < w && ("go" == o.data("sens") ? (_ = 1, o.data("sens", "back")) : _++), X && (_ = x), o.data("current-time", _)), this._properties.map($.proxy(function (a) {
                    var t, e, l, n, s = 0,
                        r = m[a];
                    null != r && ("scale" == a || "scaleX" == a || "scaleY" == a || "scaleZ" == a ? s = 1 : r |= 0, null == (t = o.data("_" + a)) && (t = s), l = t + ((e = (A - h) / (w - h) * (r - s) + s) - t) / v, y && 0 < _ && _ <= x && (n = s, "back" == o.data("sens") && (r = -(n = r), y = f, x = g), l = $.easing[y](null, _, n, r, x)), (l = Math.ceil(l * this.round) / this.round) == t && e == r && (l = r), i[a] || (i[a] = 0), i[a] += l, t != i[a] && (o.data("_" + a, i[a]), c = !0))
                }, this))
            }
            c && (null != i.z && (null == (s = m.perspective) && (s = 800), (r = o.parent()).data("style") || r.data("style", r.attr("style") || ""), r.attr("style", "perspective:" + s + "px; -webkit-perspective:" + s + "px; " + r.data("style"))), null == i.scaleX && (i.scaleX = 1), null == i.scaleY && (i.scaleY = 1), null == i.scaleZ && (i.scaleZ = 1), null != i.scale && (i.scaleX *= i.scale, i.scaleY *= i.scale, i.scaleZ *= i.scale), u = "translate3d(" + (i.x ? i.x : 0) + "px, " + (i.y ? i.y : 0) + "px, " + (i.z ? i.z : 0) + "px)" + " " + ("rotateX(" + (i.rotateX ? i.rotateX : 0) + "deg) rotateY(" + (i.rotateY ? i.rotateY : 0) + "deg) rotateZ(" + (i.rotateZ ? i.rotateZ : 0) + "deg)") + " " + ("scaleX(" + i.scaleX + ") scaleY(" + i.scaleY + ") scaleZ(" + i.scaleZ + ")") + ";", this._log(u), o.attr("style", "transform:" + u + " -webkit-transform:" + u + " " + e))
        }, this)), window.requestAnimationFrame ? window.requestAnimationFrame($.proxy(this._onScroll, this, !1)) : this._requestAnimationFrame($.proxy(this._onScroll, this, !1))
    }
};