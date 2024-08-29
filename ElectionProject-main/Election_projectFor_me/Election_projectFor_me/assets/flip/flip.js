!(function () {
    "use strict";
    function l(t) {
        return "function" == typeof t || "[object Function]" === e.call(t);
    }
    function s(t) {
        return (
            (t = (function (t) {
                t = Number(t);
                return isNaN(t)
                    ? 0
                    : 0 !== t && isFinite(t)
                        ? (0 < t ? 1 : -1) * Math.floor(Math.abs(t))
                        : t;
            })(t)),
            Math.min(Math.max(t, 0), n)
        );
    }
    var e, n, i, o, a, u;
    Array.prototype.fill ||
        Object.defineProperty(Array.prototype, "fill", {
            value: function (t) {
                if (null == this) throw new TypeError("this is null or not defined");
                for (
                    var e = Object(this),
                    n = e.length >>> 0,
                    r = arguments[1] >> 0,
                    i = r < 0 ? Math.max(n + r, 0) : Math.min(r, n),
                    r = arguments[2],
                    r = void 0 === r ? n : r >> 0,
                    o = r < 0 ? Math.max(n + r, 0) : Math.min(r, n);
                    i < o;

                )
                    (e[i] = t), i++;
                return e;
            },
        }),
        Array.prototype.find ||
        Object.defineProperty(Array.prototype, "find", {
            value: function (t) {
                if (null == this)
                    throw new TypeError(
                        "Array.prototype.find called on null or undefined"
                    );
                if ("function" != typeof t)
                    throw new TypeError("predicate must be a function");
                for (
                    var e = Object(this), n = e.length >>> 0, r = arguments[1], i = 0;
                    i !== n;
                    i++
                )
                    if (t.call(r, this[i], i, e)) return this[i];
            },
        }),
        Array.from ||
        (Array.from =
            ((e = Object.prototype.toString),
                (n = Math.pow(2, 53) - 1),
                function (t) {
                    var e = Object(t);
                    if (null == t)
                        throw new TypeError(
                            "Array.from requires an array-like object - not null or undefined"
                        );
                    var n,
                        r = 1 < arguments.length ? arguments[1] : void 0;
                    if (void 0 !== r) {
                        if (!l(r))
                            throw new TypeError(
                                "Array.from: when provided, the second argument must be a function"
                            );
                        2 < arguments.length && (n = arguments[2]);
                    }
                    for (
                        var i,
                        o = s(e.length),
                        a = l(this) ? Object(new this(o)) : new Array(o),
                        u = 0;
                        u < o;

                    )
                        (i = e[u]),
                            (a[u] = r ? (void 0 === n ? r(i, u) : r.call(n, i, u)) : i),
                            (u += 1);
                    return (a.length = o), a;
                })),
        (Array.prototype.includes =
            Array.prototype.includes ||
            function (t, e) {
                if (!this)
                    throw new TypeError(
                        "Array.prototype.includes called on null or undefined"
                    );
                if (void 0 === e) {
                    for (var n = this.length; n--;) if (this[n] === t) return !0;
                } else
                    for (var n = e, r = this.length; n++ !== r;)
                        if (this[n] === t) return !0;
                return !1;
            }),
        "function" != typeof Object.assign &&
        (Object.assign = function (t, e) {
            if (null == t)
                throw new TypeError("Cannot convert undefined or null to object");
            for (var n = Object(t), r = 1; r < arguments.length; r++) {
                var i = arguments[r];
                if (null != i)
                    for (var o in i)
                        Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
            }
            return n;
        }),
        Object.keys ||
        (Object.keys =
            ((i = Object.prototype.hasOwnProperty),
                (o = !{ toString: null }.propertyIsEnumerable("toString")),
                (u = (a = [
                    "toString",
                    "toLocaleString",
                    "valueOf",
                    "hasOwnProperty",
                    "isPrototypeOf",
                    "propertyIsEnumerable",
                    "constructor",
                ]).length),
                function (t) {
                    if ("object" != typeof t && ("function" != typeof t || null === t))
                        throw new TypeError("Object.keys called on non-object");
                    var e,
                        n,
                        r = [];
                    for (e in t) i.call(t, e) && r.push(e);
                    if (o) for (n = 0; n < u; n++) i.call(t, a[n]) && r.push(a[n]);
                    return r;
                }));
})(),
    (function (t) {
        "use strict";
        function r(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    "value" in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        var e, m;
        t.Tick || (t.Tick = []),
            t.Tick.push([
                "view",
                "flip",
                ((e = e || {}),
                    "function" == typeof Symbol &&
                    Symbol.asyncIterator &&
                    (Symbol.asyncIterator, 0),
                    (m = function (t, e, n) {
                        return e && r(t.prototype, e), n && r(t, n), t;
                    }),
                    (e.exports = function (t) {
                        function n(o) {
                            var t, e, a;
                            o.isInitialValue() &&
                                ((o.root.textContent = ""),
                                    (o.spacer = l.create("span", "tick-flip-spacer")),
                                    o.root.appendChild(o.spacer),
                                    (e = l.create(
                                        "span",
                                        "tick-flip-shadow-top tick-flip-shadow tick-flip-front"
                                    )),
                                    (t = l.create(
                                        "span",
                                        "tick-flip-shadow-bottom tick-flip-shadow tick-flip-back"
                                    )),
                                    o.root.appendChild(e),
                                    o.root.appendChild(t),
                                    (o.shadowCard = l.create("span", "tick-flip-card-shadow")),
                                    o.root.appendChild(o.shadowCard)),
                                (o.spacer.textContent = o.value),
                                o.isInitialValue() || l.visible(o.root)
                                    ? ((e = o.cards[o.cards.length - 1]) &&
                                        ((e.waiting = !1), (e.offset = u()), (e.back = o.value)),
                                        o.isInitialValue() &&
                                        (((t = new h()).back = o.value),
                                            (t.offset = null),
                                            (t.progress = 1),
                                            o.root.insertBefore(t.root, o.root.firstChild),
                                            o.cards.push(t)),
                                        ((e = new h()).offset = null),
                                        (e.progress = 0),
                                        (e.visual_progress = 0),
                                        (e.waiting = !0),
                                        (e.front = o.value),
                                        e.rotate(0),
                                        o.root.insertBefore(e.root, o.root.firstChild),
                                        o.cards.push(e),
                                        o.animating ||
                                        ((o.animating = !0),
                                            (a = r.getExtension(
                                                r.Type.EASING_FUNCTION,
                                                o.style.flipEasing
                                            )),
                                            (function t() {
                                                var n,
                                                    r,
                                                    e,
                                                    i = o.cards.filter(function (t) {
                                                        return !t.done && !t.waiting;
                                                    });
                                                0 === i.length
                                                    ? (o.animating = !1)
                                                    : (i.forEach(function (t) {
                                                        null !== t.offset &&
                                                            (t.progress =
                                                                (u() - t.offset) / o.style.flipDuration),
                                                            1 <= t.progress &&
                                                            ((t.progress = 1), (t.done = !0)),
                                                            (t.visual_progress = a(t.progress));
                                                    }),
                                                        i.reverse().forEach(function (t, e) {
                                                            e = i[e - 1];
                                                            e &&
                                                                t.visual_progress <= e.visual_progress &&
                                                                (t.visual_progress = e.visual_progress + 0.01);
                                                        }),
                                                        i.reverse(),
                                                        o.cards.forEach(function (t, e) {
                                                            var n = 1 - 2 * Math.abs(t.visual_progress - 0.5),
                                                                r = 1 - (t.visual_progress - 0.5) / 0.5,
                                                                n =
                                                                    ((t.shadowFront = n),
                                                                        (t.highlightBack = r),
                                                                        o.cards[e + 1]);
                                                            n &&
                                                                0.5 < t.visual_progress &&
                                                                0 < t.visual_progress &&
                                                                (t.shadowBack = f(n.visual_progress));
                                                        }),
                                                        i.forEach(function (t, e) {
                                                            var n = t.visual_progress;
                                                            0.5 < n && !t.done
                                                                ? (t.root.style.zIndex = 10 + e)
                                                                : t.root.style.removeProperty("z-index"),
                                                                t.rotate(-180 * n);
                                                        }),
                                                        (n = 0),
                                                        (r = 1),
                                                        i.forEach(function (t) {
                                                            var e = Math.abs(t.visual_progress - 0.5);
                                                            e < r && ((r = e), (n = t.visual_progress));
                                                        }),
                                                        (e = d(n < 0.5 ? n / 0.5 : (1 - n) / 0.5)),
                                                        (o.shadowCard.style.opacity = e),
                                                        l.transform(o.shadowCard, "scaleY", e),
                                                        o.cards
                                                            .filter(function (t) {
                                                                return t.done;
                                                            })
                                                            .slice(0, -1)
                                                            .forEach(function (e) {
                                                                (o.cards = o.cards.filter(function (t) {
                                                                    return t !== e;
                                                                })),
                                                                    e.root.parentNode && o.root.removeChild(e.root);
                                                            }),
                                                        requestAnimationFrame(t));
                                            })()))
                                    : o.cards.forEach(function (t) {
                                        (t.back = o.value), (t.front = o.value);
                                    });
                        }
                        var l = t.DOM,
                            r = (t.Animation.animate, t.Extension),
                            u = t.Date.performance,
                            t = t.View,
                            i = t.rooter,
                            o = t.destroyer,
                            a = t.drawer,
                            s = t.updater,
                            c = t.styler,
                            f = r.getExtension(r.Type.EASING_FUNCTION, "ease-out-cubic"),
                            d = r.getExtension(r.Type.EASING_FUNCTION, "ease-out-sine"),
                            h =
                                (m(p, [
                                    {
                                        key: "rotate",
                                        value: function (t) {
                                            (this._front.style.transform = "rotateX(" + t + "deg)"),
                                                (this._back.style.transform =
                                                    "rotateX(" + (-180 + t) + "deg)");
                                        },
                                    },
                                    {
                                        key: "root",
                                        get: function () {
                                            return this._root;
                                        },
                                    },
                                    {
                                        key: "front",
                                        set: function (t) {
                                            (this._frontValue = t), (this._textFront.textContent = t);
                                        },
                                        get: function () {
                                            return this._frontValue;
                                        },
                                    },
                                    {
                                        key: "back",
                                        set: function (t) {
                                            (this._backValue = t), (this._textBack.textContent = t);
                                        },
                                        get: function () {
                                            return this._backValue;
                                        },
                                    },
                                    {
                                        key: "highlightBack",
                                        set: function (t) {
                                            this._highlightBack.style.opacity = t;
                                        },
                                    },
                                    {
                                        key: "shadowBack",
                                        set: function (t) {
                                            this._shadowBack.style.opacity = t;
                                        },
                                    },
                                    {
                                        key: "shadowFront",
                                        set: function (t) {
                                            this._shadowFront.style.opacity = t;
                                        },
                                    },
                                ]),
                                    p);
                        function p() {
                            if (!(this instanceof p))
                                throw new TypeError("Cannot call a class as a function");
                            this._root = l.create("span", "tick-flip-card");
                            var t = l.create(
                                "span",
                                "tick-flip-panel-front tick-flip-front tick-flip-panel"
                            ),
                                e = l.create("span", "tick-flip-panel-front-text"),
                                n = l.create("span", "tick-flip-panel-text-wrapper"),
                                r =
                                    (e.appendChild(n),
                                        l.create("span", "tick-flip-panel-front-shadow")),
                                e =
                                    (t.appendChild(e),
                                        t.appendChild(r),
                                        l.create(
                                            "span",
                                            "tick-flip-panel-back tick-flip-back tick-flip-panel"
                                        )),
                                i = l.create("span", "tick-flip-panel-back-text"),
                                o = l.create("span", "tick-flip-panel-text-wrapper"),
                                a =
                                    (i.appendChild(o),
                                        l.create("span", "tick-flip-panel-back-highlight")),
                                u = l.create("span", "tick-flip-panel-back-shadow");
                            e.appendChild(i),
                                e.appendChild(a),
                                e.appendChild(u),
                                this._root.appendChild(t),
                                this._root.appendChild(e),
                                (this._front = t),
                                (this._back = e),
                                (this._shadowFront = r),
                                (this._shadowBack = u),
                                (this._highlightBack = a),
                                (this._textBack = o),
                                (this._textFront = n),
                                (this._frontValue = null),
                                (this._backValue = null);
                        }
                        return function (t) {
                            var e = {
                                cards: [],
                                lastCard: null,
                                initialCard: null,
                                shadowAbove: null,
                                shadowBelow: null,
                                shadowCard: null,
                                currentValue: null,
                                lastValue: null,
                                front: null,
                                back: null,
                            };
                            return Object.assign(
                                {},
                                i(e, t, "flip"),
                                s(e),
                                c(e, { flipDuration: 800, flipEasing: "ease-out-bounce" }),
                                a(e, n),
                                o(e)
                            );
                        };
                    }),
                    (e.exports.identifier = { name: "flip", type: "view" }),
                    e.exports),
            ]);
    })(window),
    (function (t, e, pn) {
        "use strict";
        var n;
        function r(t) {
            n.plugin.add.apply(null, t);
        }
        function i() {
            n.DOM.parse(document);
        }
        t &&
            "MutationObserver" in t &&
            "requestAnimationFrame" in t &&
            (((n = (function () {
                function t(t, e) {
                    if (r[t])
                        for (var n in e)
                            if (e.hasOwnProperty(n)) {
                                if (r[t][n]) return;
                                r[t][n] = e[n];
                            }
                }
                function F(t, e, n) {
                    if (!r[t])
                        throw (
                            "Can't add extension with type of \"" +
                            t +
                            '", "' +
                            t +
                            '" is not a valid extension type. The following types are valid: ' +
                            je(r)
                        );
                    if (!/^[-a-z]+$/.test(e))
                        throw (
                            "Can't add extension with name \"" +
                            e +
                            '", "' +
                            e +
                            '" is contains invalid characters. Only lowercase alphabetical characters and dashes are allowed.'
                        );
                    if (r[t][e])
                        throw (
                            "Can't add extension with name \"" +
                            e +
                            '", "' +
                            e +
                            '" is already added.'
                        );
                    r[t][e] = n;
                }
                var e,
                    n,
                    U = U || {},
                    s = {
                        FONT: "font",
                        VIEW: "view",
                        TRANSFORM: "transform",
                        EASING_FUNCTION: "easing-function",
                        TRANSITION: "transition",
                    },
                    r = {},
                    c =
                        ((r[s.FONT] = {}),
                            (r[s.VIEW] = {}),
                            (r[s.TRANSFORM] = {}),
                            (r[s.EASING_FUNCTION] = {}),
                            (r[s.TRANSITION] = {}),
                            function (t, e) {
                                if (!r[t])
                                    throw (
                                        "Can't get extension with type of \"" +
                                        t +
                                        '", "' +
                                        t +
                                        '" is not a valid extension type. The following types are available: ' +
                                        je(r)
                                    );
                                if (r[t][e]) return r[t][e];
                                throw (
                                    "Can't get extension with name \"" +
                                    e +
                                    '", "' +
                                    e +
                                    '" is not available. The following extensions are available: ' +
                                    je(r[t])
                                );
                            }),
                    p = {
                        Week: 6048e5,
                        Day: 864e5,
                        Hour: 36e5,
                        Minute: 6e4,
                        Second: 1e3,
                        Millisecond: 1,
                        Month: 2628e6,
                        Year: 31536e6,
                    },
                    P = [
                        "Januari",
                        "Februari",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ];
                for (e in p)
                    p.hasOwnProperty(e) &&
                        (1 === (n = p[e])
                            ? ((p.mi = n), (p.ms = n))
                            : 2628e6 === n
                                ? (p.M = n)
                                : (p[e.charAt(0).toLowerCase()] = n),
                            (p[e.toLowerCase()] = n),
                            (p[e.toLowerCase() + "s"] = n));
                function o(t) {
                    return t instanceof Date;
                }
                function z(t, e) {
                    return (e -= t.getDay()), t.setDate(t.getDate() + e), t;
                }
                function m(t, e) {
                    var n = W(t.getMonth() + 1, t.getFullYear());
                    return (
                        (e = "last" === e ? n : Math.max(1, Math.min(n, e))),
                        t.setDate(e),
                        t
                    );
                }
                function j(t, e) {
                    return (
                        t.setMonth(
                            P.map(function (t) {
                                return t.toLowerCase();
                            }).indexOf(e)
                        ),
                        t
                    );
                }
                function q(t) {
                    return new Date(Date.now() + t);
                }
                function G(t, e) {
                    return t.toDateString() === e.toDateString();
                }
                function W(t, e) {
                    return new Date(e, t, 0).getDate();
                }
                function Y(t) {
                    return new Date(t.getTime() + 6e4 * t.getTimezoneOffset());
                }
                function V(n, t) {
                    return t.map(function (t) {
                        var t = p[t],
                            e = Math.max(0, Math.floor(n / t));
                        return (n %= t), e;
                    });
                }
                function f(t, e, n) {
                    var r = e - t,
                        i = !1;
                    r < 0 && ((r = t - e), (t = (a = [e, t])[0]), (e = a[1]), (i = !0));
                    0 <= (a = (n = n || ["d", "h", "m"]).indexOf("m")) &&
                        ("y" === n[a - 1] || "d" === n[a + 1]) &&
                        (n[a].key = "M");
                    var e = void 0,
                        o = void 0,
                        a = n.includes("y"),
                        u =
                            (((u = n.includes("M")) || a) &&
                                ((e = new Date(t.valueOf() + r)),
                                    (o = tt(e, t)),
                                    (a = u ? Math.floor(o) : 12 * Math.floor(o / 12)),
                                    (r = e.valueOf() - g(v(t), a).valueOf())),
                                n.map(function (t) {
                                    var e;
                                    return "y" === t || "M" === t
                                        ? ((e = Math.max(0, Math.floor(o / J[t]))),
                                            (o -= e * J[t]),
                                            e)
                                        : ((e = p[t]),
                                            (t = Math.max(0, Math.floor(r / e))),
                                            (r %= e),
                                            t);
                                }));
                    return i
                        ? u.map(function (t) {
                            return 0 < t ? -t : t;
                        })
                        : u;
                }
                function B() {
                    for (var t = arguments.length, e = Array(t), n = 0; n < t; n++)
                        e[n] = arguments[n];
                    if ("number" != typeof e[0] || "string" != typeof e[1])
                        return o(e[0])
                            ? f.apply(pn, e)
                            : "number" == typeof e[0] && Array.isArray(e[1])
                                ? V.apply(pn, e)
                                : null;
                    if (p[e[1]]) return e[0] * p[e[1]];
                    throw '"' + e[1] + '" is not a valid amount.';
                }
                function a(t) {
                    return {
                        destroy: function () {
                            (t.destroyed = !0),
                                t.frame && cancelAnimationFrame(t.frame),
                                t.styleObserver && t.styleObserver.disconnect(),
                                t.didResizeWindow &&
                                window.removeEventListener("resize", t.didResizeWindow),
                                t.root &&
                                t.root.parentNode &&
                                t.root.parentNode.removeChild(t.root);
                        },
                    };
                }
                function u(n) {
                    var t =
                        1 < arguments.length && arguments[1] !== pn
                            ? arguments[1]
                            : document.createElement("span"),
                        e =
                            2 < arguments.length && arguments[2] !== pn ? arguments[2] : null;
                    return (
                        (n.root = t),
                        (n.aligned = null),
                        (n.destroyed = !1),
                        t &&
                        e &&
                        (n.root.classList.add("tick-" + e),
                            n.root.setAttribute("data-view", e)),
                        t &&
                        t.dataset.layout &&
                        (n.align =
                            (t.dataset.layout.match(/left|right|center/) || [])[0] ||
                            "left"),
                        {
                            appendTo: function (t) {
                                var e =
                                    1 < arguments.length && arguments[1] !== pn
                                        ? arguments[1]
                                        : "last";
                                !n.root ||
                                    (n.root && n.root.parentNode) ||
                                    ("last" === e
                                        ? t.childNodes.length &&
                                            t.childNodes[t.childNodes.length - 1].nodeType ===
                                            Node.TEXT_NODE
                                            ? t.insertBefore(
                                                n.root,
                                                t.childNodes[t.childNodes.length - 1]
                                            )
                                            : t.appendChild(n.root)
                                        : ("first" === e &&
                                            (0 === t.childNodes.length
                                                ? t.appendChild(n.root)
                                                : 0 === t.children.length && t.childNodes.length
                                                    ? t.insertBefore(
                                                        n.root,
                                                        t.childNodes[t.childNodes.length - 1]
                                                    )
                                                    : t.insertBefore(n.root, t.children[0])),
                                            "string" != typeof e && t.insertBefore(n.root, e)));
                            },
                        }
                    );
                }
                function H(e, t) {
                    return (
                        (e.definition = t),
                        {
                            setDefinition: function (t) {
                                e.definition = t;
                            },
                        }
                    );
                }
                function l(t, e, n, r) {
                    return {
                        draw: function () {
                            return t.dirty
                                ? (e(t, r), $(t), !(t.dirty = !1))
                                : (n && n(t) && $(t), !1);
                        },
                    };
                }
                function $(t) {
                    if (!t.fit) {
                        if (
                            !t.root ||
                            !(t.root.getAttribute("data-layout") || "").match(/fit/)
                        )
                            return void (t.fit = !1);
                        var e = window.getComputedStyle(t.root, null);
                        (t.fit = !0),
                            (t.fitInfo = {
                                currentFontSize: parseInt(e.getPropertyValue("font-size"), 10),
                            });
                    }
                    (t.fitInfo.availableWidth = t.root.parentNode.clientWidth),
                        (t.fitInfo.currentWidth = t.root.scrollWidth),
                        (e = Math.min(
                            Math.max(
                                4,
                                (t.fitInfo.availableWidth / t.fitInfo.currentWidth) *
                                t.fitInfo.currentFontSize
                            ),
                            1024
                        )),
                        Math.abs(e - t.fitInfo.currentFontSize) <= 1 ||
                        ((t.fitInfo.currentFontSize = e),
                            (t.root.style.fontSize = t.fitInfo.currentFontSize + "px"),
                            t.fitInfo.currentWidth / t.fitInfo.availableWidth < 0.5 &&
                            requestAnimationFrame(function () {
                                return $(t);
                            }));
                }
                function d(e) {
                    return (
                        (e.dirty = !0),
                        (e.value = null),
                        (e.valueUpdateCount = 0),
                        (e.isInitialValue = function () {
                            return e.valueUpdateCount <= 1;
                        }),
                        {
                            reset: function () {
                                (e.dirty = !0), (e.value = null), (e.valueUpdateCount = 0);
                            },
                            update: function (t) {
                                Fe(e.value, t) ||
                                    ((e.value = t), e.valueUpdateCount++, (e.dirty = !0));
                            },
                        }
                    );
                }
                function X(t) {
                    (t.didResizeWindow = function () {
                        t.dirty = !0;
                    }),
                        window.addEventListener("resize", t.didResizeWindow);
                }
                var Z = {
                    Monday: 1,
                    Tuesday: 2,
                    Wednesday: 3,
                    Thursday: 4,
                    Friday: 5,
                    Saturday: 6,
                    Sunday: 0,
                },
                    J = { M: 1, y: 12 },
                    K = function (n) {
                        var r = new XMLHttpRequest(),
                            i = Date.now();
                        r.open("HEAD", window.location + "?noCache=" + i),
                            r.setRequestHeader("Content-Type", "text/html"),
                            r.setRequestHeader("Cache-Control", "no-cache"),
                            (r.onload = function () {
                                var t = 0.5 * (i - Date.now()),
                                    e = new Date(r.getResponseHeader("Date"));
                                n(new Date(e.getTime() + t));
                            }),
                            r.send();
                    },
                    h = function (t) {
                        return t.match(/(Z)|([+\-][0-9]{2}:?[0-9]*$)/g)
                            ? new Date(t)
                            : ((t += -1 !== t.indexOf("T") ? "Z" : ""), Y(new Date(t)));
                    },
                    Q = function () {
                        return new Date();
                    },
                    v = function (t) {
                        return new Date(t.valueOf());
                    },
                    g = function (t, e) {
                        return t.setMonth(t.getMonth() + e), t;
                    },
                    tt = function (t, e) {
                        var n =
                            12 * (e.getFullYear() - t.getFullYear()) +
                            (e.getMonth() - t.getMonth()),
                            r = g(v(t), n);
                        return -(
                            n +
                            (e - r < 0
                                ? (e - r) / (r - g(v(t), n - 1))
                                : (e - r) / (g(v(t), 1 + n) - r))
                        );
                    },
                    et =
                        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                            ? function (t) {
                                return typeof t;
                            }
                            : function (t) {
                                return t &&
                                    "function" == typeof Symbol &&
                                    t.constructor === Symbol &&
                                    t !== Symbol.prototype
                                    ? "symbol"
                                    : typeof t;
                            };
                var i = function (t, e, n) {
                    return e && nt(t.prototype, e), n && nt(t, n), t;
                };
                function nt(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        (r.enumerable = r.enumerable || !1),
                            (r.configurable = !0),
                            "value" in r && (r.writable = !0),
                            Object.defineProperty(t, r.key, r);
                    }
                }
                function rt(e, n) {
                    var t = (e.definition || []).concat(),
                        r =
                            ("right" === e.align && t.reverse(),
                                Array.isArray(e.value)
                                    ? e.value.concat()
                                    : "object" === et(e.value)
                                        ? Re(e.value)
                                        : e.value);
                    t.forEach(function (t) {
                        t.presenter ||
                            ((e.update = n(t)), t.presenter && t.presenter.appendTo(e.root));
                    }),
                        t
                            .filter(function (t) {
                                return t.presenter !== pn;
                            })
                            .forEach(function (t) {
                                Array.isArray(r) && e.valueMapping
                                    ? e.update(
                                        t,
                                        "indexes" === e.valueMapping
                                            ? "right" === e.align
                                                ? r.pop()
                                                : r.shift()
                                            : r
                                    )
                                    : t.key && r[t.key] !== pn
                                        ? e.update(t, r[t.key])
                                        : e.update(t, r);
                            }),
                        (e.views = t),
                        it(e);
                }
                function it(t) {
                    var e = !1;
                    return (
                        t.views
                            .filter(function (t) {
                                return t.presenter !== pn;
                            })
                            .forEach(function (t) {
                                t.presenter.draw() && (e = !0);
                            }),
                        e
                    );
                }
                function ot(r, i, t) {
                    var e = Le(
                        Array.isArray(r.value) ? r.value : (r.value + "").split("")
                    );
                    if (
                        ("right" === r.align && e.reverse(),
                            r.definitions.length > e.length)
                    )
                        for (; r.definitions.length > e.length;)
                            r.definitions.pop().presenter.destroy();
                    e.forEach(function (t, e) {
                        var n = r.definitions[e];
                        n ||
                            ((n = r.definitions[e] = xt(r.definition)),
                                (r.update = i(n)),
                                n.presenter.appendTo(
                                    r.root,
                                    "right" === r.align ? "first" : "last"
                                ));
                    }),
                        e.forEach(function (t, e) {
                            return r.update(r.definitions[e], t);
                        }),
                        (r.views = e),
                        at(r);
                }
                function at(n) {
                    var r = !1;
                    return (
                        n.views.forEach(function (t, e) {
                            n.definitions[e].presenter.draw() && (r = !0);
                        }),
                        r
                    );
                }
                function ut(t, e) {
                    return (t = document.createElement(t)), e && (t.className = e), t;
                }
                function lt(n, r, i) {
                    var t = new MutationObserver(function (e) {
                        r.forEach(function (t) {
                            e.filter(function (t) {
                                return r.includes(t.attributeName);
                            }).length && i(n.getAttribute(t));
                        });
                    });
                    return t.observe(n, { attributes: !0 }), t;
                }
                function st(t) {
                    return t instanceof HTMLElement;
                }
                function y(t, e, n) {
                    var r =
                        3 < arguments.length && arguments[3] !== pn ? arguments[3] : "",
                        i =
                            (t.transforms || (t.transforms = []),
                                t.transforms.find(function (t) {
                                    return t.name === e;
                                }));
                    i ? (i.value = n) : t.transforms.push({ name: e, value: n, unit: r }),
                        Bt(t, t.transforms);
                }
                function ct(t) {
                    return (
                        !((t = t.getBoundingClientRect()).bottom < 0) &&
                        !(t.top > window.scrollY + window.innerHeight)
                    );
                }
                function ft(t) {
                    return t.trim();
                }
                function w(t, e) {
                    var n = e.toString();
                    return C[n] || (C[n] = {}), C[n][t] || (C[n][t] = e(t)), C[n][t];
                }
                function dt(t) {
                    return t
                        .match(
                            /[a-z]+(?:\(.*?\))?\s?(?:origin\(.*?\))?\s?(?:[a-z]+\(.*?\))?[ .a-z-0-9]*/g
                        )
                        .map(ht);
                }
                function ht(t) {
                    var t = t.match(
                        /([a-z]+(?:\(.*?\))?)\s?(?:origin\((.*?)\))?\s?([a-z]+(?:\(.*?\))?)?\s?(?:([.0-9ms]+)?\s?(?:(ease-[a-z-]+))?\s?([.0-9ms]+)?)?/
                    ),
                        e = Ae(t[1]),
                        n = pn,
                        r = pn,
                        i = pn,
                        o = pn,
                        a = pn;
                    return (
                        t
                            .slice(2)
                            .filter(function (t) {
                                return void 0 !== t;
                            })
                            .forEach(function (t) {
                                Qt.test(t)
                                    ? void 0 === r
                                        ? (r = D(t))
                                        : (o = D(t))
                                    : / /.test(t)
                                        ? (n = t)
                                        : /^ease-[a-z-]+$/.test(t)
                                            ? (i = t)
                                            : /^[a-z]+/.test(t) && (a = Ae(t));
                            }),
                        a && (i = r = pn),
                        {
                            name: e.name,
                            parameters: e.parameters,
                            duration: r,
                            ease: i,
                            delay: o,
                            origin: n,
                            resolver: a,
                        }
                    );
                }
                function pt(t) {
                    var e = t.match(
                        /follow-gradient|horizontal-gradient|vertical-gradient/
                    )[0];
                    return {
                        type: e,
                        colors: t
                            .substring(e.length)
                            .match(
                                /(?:transparent|rgb\(.*?\)|hsl\(.*?\)|hsla\(.*?\)|rgba\(.*?\)|[a-z]+|#[abcdefABCDEF\d]+)\s?(?:[\d]{1,3}%?)?/g
                            )
                            .map(mt),
                    };
                }
                function mt(t) {
                    var e = t.match(ne);
                    return {
                        offset: e ? parseFloat(e[1]) / 100 : null,
                        value: ie(t.replace(ne, "")),
                    };
                }
                function vt(t) {
                    return "string" != typeof t
                        ? t
                        : t.match(
                            /([-.\d]+(?:%|ms|s|deg|cm|em|ch|ex|q|in|mm|pc|pt|px|vh|vw|vmin|vmax)?)|[%#A-Za-z0-9,.()]+/g
                        );
                }
                function gt(t) {
                    var e,
                        n,
                        r = (t = t.split(":").map(ft))[0]
                            .trim()
                            .split("-")
                            .map(function (t, e) {
                                return 0 < e ? (e = t).charAt(0).toUpperCase() + e.slice(1) : t;
                            })
                            .join(""),
                        t =
                            ((e = t[1]),
                                (t = t[0]),
                                $t.test(e)
                                    ? "string" == typeof (n = e)
                                        ? "true" === n
                                        : n
                                    : Ht.test(e)
                                        ? parseInt(e, 10)
                                        : Xt.test(e)
                                            ? parseFloat(e)
                                            : ee.test(e)
                                                ? 1 ===
                                                    (n = (n = e).match(/url\((.*?)\)/g).map(function (t) {
                                                        return t.substring(4, t.length - 1);
                                                    })).length
                                                    ? n[0]
                                                    : n
                                                : Zt.test(t)
                                                    ? Kt.test(e)
                                                        ? w(e, pt)
                                                        : w(e, ie)
                                                    : Jt.test(t)
                                                        ? w(e, vt)
                                                        : !te.test(t) || "none" === e
                                                            ? e
                                                            : w(e, dt));
                    return r && null != t ? { property: r, value: t } : null;
                }
                function b(t) {
                    return t < 0.5 ? 2 * t * t : (4 - 2 * t) * t - 1;
                }
                function yt(e, t) {
                    var n =
                        2 < arguments.length && arguments[2] !== pn ? arguments[2] : 500,
                        r = 3 < arguments.length && arguments[3] !== pn ? arguments[3] : ae;
                    return ue(
                        function (t) {
                            e(r(t));
                        },
                        t,
                        n,
                        4 < arguments.length && arguments[4] !== pn ? arguments[4] : 0
                    );
                }
                function wt(t) {
                    for (
                        var e = arguments.length, n = Array(1 < e ? e - 1 : 0), r = 1;
                        r < e;
                        r++
                    )
                        n[r - 1] = arguments[r];
                    var i = le(),
                        o = { update: null, cancel: i.cancel, getPosition: i.getPosition };
                    return (
                        "arrive" === t
                            ? (o.update = se.apply(pn, [i.translate].concat(n)))
                            : "spring" === t
                                ? (o.update = fe.apply(pn, [i.translate].concat(n)))
                                : "step" === t &&
                                (o.update = ce.apply(pn, [i.translate].concat(n))),
                        o
                    );
                }
                function bt(t, e, n) {
                    var r =
                        3 < arguments.length && arguments[3] !== pn ? arguments[3] : 0.001;
                    return Math.abs(t - e) < r && Math.abs(n) < r;
                }
                function _t(t, r, e) {
                    var i = e && c(s.EASING_FUNCTION, e),
                        o = c(s.TRANSITION, t);
                    return function (t, e, n) {
                        o.apply(pn, [t, n, e, i].concat(M(r)));
                    };
                }
                function At(r) {
                    var i =
                        1 < arguments.length && arguments[1] !== pn
                            ? arguments[1]
                            : "50% 50% 0",
                        o =
                            2 < arguments.length && arguments[2] !== pn ? arguments[2] : 500,
                        a = arguments[3];
                    return function (e) {
                        var n =
                            1 < arguments.length && arguments[1] !== pn ? arguments[1] : 1,
                            t = arguments[2];
                        Vt(e, i),
                            ue(
                                function (t) {
                                    r(e, n, t);
                                },
                                t,
                                o,
                                a
                            );
                    };
                }
                function Et(e) {
                    var n =
                        1 < arguments.length && arguments[1] !== pn ? arguments[1] : {};
                    return (
                        (e.lastAppliedStyles = null),
                        Mt(e, n, e.root.dataset.style),
                        (e.styleObserver = lt(e.root, ["data-style"], function (t) {
                            Mt(e, n, t);
                        })),
                        {
                            setStyle: function (t) {
                                Mt(e, n, t);
                            },
                        }
                    );
                }
                function Mt(t, e, n) {
                    var r, i;
                    t.lastAppliedStyles !== n &&
                        ((t.lastAppliedStyles = n),
                            (t.style = n ? k(e, oe(n)) : e),
                            (r = []),
                            (i = []),
                            t.style.transitionIn && t.style.transitionIn.length
                                ? ((r = t.style.transitionIn), (i = t.style.transitionOut))
                                : t.style.transition &&
                                "none" !== t.style.transition &&
                                t.style.transition.forEach(function (t) {
                                    t = he(t);
                                    (r = r.concat(t.intro)), (i = i.concat(t.outro));
                                }),
                            r &&
                            i &&
                            ((t.transitionIn = de(r)),
                                (t.transitionOut = de(i)),
                                (t.skipToTransitionInEnd = de(r.map(pe))),
                                (t.skipToTransitionOutEnd = de(i.map(pe)))),
                            (t.dirty = !0));
                }
                function Ct(t) {
                    return (
                        t[Yt + "BackingStorePixelRatio"] || t.backingStorePixelRatio || 1
                    );
                }
                function Dt() {
                    return window.devicePixelRatio || 1;
                }
                function Nt(t) {
                    t.getContext("2d").clearRect(0, 0, t.width, t.height);
                }
                function kt(t) {
                    return 0 !== t.trim().length;
                }
                function It(t, e) {
                    t.push(e.trim());
                }
                function Ot(t, e) {
                    return kt(e) ? (It(t, e), "") : e;
                }
                function St(t, e) {
                    return t.length && e.push(1 < t.length ? t.concat() : t[0]), [];
                }
                function Tt(t, e, n) {
                    for (var r, i, o = "", a = [], u = null, l = !1; t < e.length;)
                        if ("(" === (c = e[t])) {
                            var l = !1,
                                s = [o.trim()],
                                c = e[(t = Tt(t + 1, e, s))];
                            a.push(s), (o = "");
                        } else {
                            if (")" === c)
                                return (
                                    l &&
                                    o.trim().length &&
                                    (a.push([o.trim()]), (o = ""), (l = !1)),
                                    kt(o) && It(a, o),
                                    (a = St(a, n)),
                                    t + 1
                                );
                            null !== u && c !== u
                                ? (o += c)
                                : c === u
                                    ? (a.push(o), (o = ""), (u = null))
                                    : "'" === (s = c) || '"' === s
                                        ? ((o = ""), (u = c))
                                        : "-" === (r = e)[(i = t)] && ">" === r[i + 1]
                                            ? ((l = !0),
                                                o.trim().length && (a.push([o.trim()]), (o = "")),
                                                (t += 2))
                                            : "," === c
                                                ? (l &&
                                                    o.trim().length &&
                                                    (a.push([o.trim()]), (o = ""), (l = !1)),
                                                    (a = St(a, n)),
                                                    (o = Ot(n, o)))
                                                : (o += c),
                                t++;
                        }
                    return (
                        ((l && o.trim().length) || (!l && o.trim().length && !a.length)) &&
                        (a.push([o.trim()]), (o = "")),
                        St(a, n),
                        Ot(n, o),
                        t
                    );
                }
                function xt(t) {
                    var e,
                        n = {};
                    for (e in t)
                        t.hasOwnProperty(e) &&
                            (n[e] =
                                "root" === e
                                    ? t[e].cloneNode()
                                    : "children" === e
                                        ? null === t[e]
                                            ? null
                                            : t[e].map(xt)
                                        : "repeat" === e
                                            ? null === t[e]
                                                ? null
                                                : xt(t[e])
                                            : t[e]);
                    return (n.presenter = null), n;
                }
                function Rt(t) {
                    return Array.from(t).map(function (t) {
                        var e,
                            n = k(be, { root: t });
                        for (e in t.dataset)
                            t.dataset.hasOwnProperty(e) &&
                                void 0 !== n[e] &&
                                (n[e] = t.dataset[e]);
                        return (
                            n.repeat
                                ? ((n.repeat = Rt(t.children).pop()),
                                    Array.from(t.children).forEach(function (t) {
                                        t.parentNode.removeChild(t);
                                    }))
                                : t.children.length && (n.children = Rt(t.children)),
                            n
                        );
                    });
                }
                function Lt(t) {
                    return t.map(function (e) {
                        return (
                            "string" == typeof (e = k(be, e)).root
                                ? (e.root = document.createElement(e.root))
                                : (e.root = document.createElement("span")),
                            e.transform && (e.root.dataset.transform = e.transform),
                            e.className && (e.root.className = e.className),
                            e.overlay && (e.root.dataset.overlay = e.overlay),
                            e.view
                                ? ((e.root.dataset.view = e.view),
                                    e.style && (e.root.dataset.style = e.style),
                                    (e.repeat = null))
                                : (e.layout && (e.root.dataset.layout = e.layout),
                                    e.repeat
                                        ? ((e.root.dataset.repeat = !0),
                                            (e.repeat = Lt(e.children).pop()))
                                        : e.children &&
                                        ((e.children = Lt(e.children)),
                                            e.children.forEach(function (t) {
                                                e.root.appendChild(t.root);
                                            }))),
                            e
                        );
                    });
                }
                function Ft(o) {
                    function a(e, t) {
                        e.transform(
                            t,
                            function (t) {
                                e.presenter.update(t);
                            },
                            o
                        ),
                            n || ((n = !0), r());
                    }
                    var n = !1,
                        r = function t() {
                            o.baseDefinition.presenter.draw(), requestAnimationFrame(t);
                        };
                    return (function t(e) {
                        var n, r, i;
                        return (
                            (e.presenter =
                                ((r = t),
                                    (i = void 0),
                                    (n = e).repeat
                                        ? (i = ve(n.root, n.repeat, r))
                                        : "string" == typeof n.view
                                            ? (i = ge(n.view, n.root, n.style))
                                            : we(n) && (i = me(n.root, n.children, r)),
                                    i)),
                            (e.transform = zt(e.transform, o)),
                            a
                        );
                    })(o.baseDefinition);
                }
                function Ut(i) {
                    for (
                        var t = arguments.length, o = Array(1 < t ? t - 1 : 0), e = 1;
                        e < t;
                        e++
                    )
                        o[e - 1] = arguments[e];
                    return function (t, r) {
                        !(function t(e, n) {
                            o.length <= e ? r(n) : o[e](n, Pt(t, [e + 1]), i);
                        })(0, t);
                    };
                }
                function Pt(e) {
                    var n =
                        1 < arguments.length && arguments[1] !== pn ? arguments[1] : [],
                        r = arguments[2];
                    return function () {
                        var t = Array.from(n);
                        return Array.prototype.push.apply(t, arguments), e.apply(r, t);
                    };
                }
                function zt(t, e) {
                    return t
                        ? "function" == typeof t
                            ? t
                            : ((t = ye(
                                "transform(" + (/^[a-z]+$/.test(t) ? t + "()" : t) + ")"
                            )),
                                _e(t, e))
                        : function (t, e) {
                            return e(t);
                        };
                }
                function _(t) {
                    return (
                        (t = (t + "").match(
                            /(-?[.\d]+)(%|ms|s|deg|cm|em|ch|ex|q|in|mm|pc|pt|px|vh|vw|vmin|vmax)?/
                        )),
                        { value: parseFloat(t[1]), units: t[2] }
                    );
                }
                function A(t) {
                    var n = window,
                        r = t.split(".");
                    return (
                        r.forEach(function (t, e) {
                            n[r[e]] && (n = n[r[e]]);
                        }),
                        n !== window ? n : null
                    );
                }
                function jt(t) {
                    return /^(?:[\w]+\s?:\s?[\w.]+,\s?)+(?:[\w]+\s?:\s?[\w.]+)$/g.test(t)
                        ? t.match(/(?:(\w+)\s?:\s?([\w.]+))/g).reduce(function (t, e) {
                            e = e.split(":");
                            return (t[e[0]] = Te(e[1])), t;
                        }, {})
                        : Te(t);
                }
                function qt(t) {
                    return parseInt(t, 10);
                }
                function Gt() {
                    return window.performance.now();
                }
                function Wt(t, e, n, r) {
                    var i = new XMLHttpRequest();
                    r && r(i),
                        i.open("GET", t, !0),
                        (i.onload = function () {
                            e(i.response);
                        }),
                        n &&
                        (i.onerror = function () {
                            n(i, i.status);
                        }),
                        i.send();
                }
            var E =
                Object.assign ||
                function (t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n,
                            r = arguments[e];
                        for (n in r)
                            Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
                    }
                    return t;
                },
                M = function (t) {
                    if (Array.isArray(t)) {
                        for (var e = 0, n = Array(t.length); e < t.length; e++)
                            n[e] = t[e];
                        return n;
                    }
                    return Array.from(t);
                },
                Yt =
                    "undefined" == typeof document
                        ? null
                        : (function () {
                            for (
                                var t = ["webkit", "Moz", "ms", "O"],
                                e = 0,
                                n = t.length,
                                r = document.createElement("div").style;
                                e < n;
                                e++
                            )
                                if (t[e] + "Transform" in r) return t[e];
                            return null;
                        })(),
                Vt = function (t, e) {
                    t.style.transformOrigin = e;
                },
                Bt = function (t, e) {
                    t.style.transform = e
                        .map(function (t) {
                            return t.name + "(" + t.value + t.unit + ")";
                        })
                        .join(" ");
                },
                C = {},
                Ht = new RegExp("^[0-9]+$"),
                $t = new RegExp("^(true|false)$");