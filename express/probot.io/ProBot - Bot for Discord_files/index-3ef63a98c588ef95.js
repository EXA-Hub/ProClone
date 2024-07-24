(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [5405],
  {
    45728: function (e, a, n) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/",
        function () {
          return n(69009);
        },
      ]);
    },
    69009: function (e, a, n) {
      "use strict";
      n.r(a);
      var s = n(85893),
        t = n(47354),
        c = n.n(t),
        i = n(36465),
        l = n.n(i);
      n(29883);
      var r = n(24141);
      n(25675);
      var d = n(67294),
        o = n(2711),
        x = n.n(o);
      n(3497);
      var w = n(11163);
      a.default = function () {
        let { locale: e } = (0, w.useRouter)();
        (0, d.useEffect)(() => {
          x().init({ once: !0 }), x().refresh();
        }, []);
        let a = "tw-max-w-[1240px] tw-m-auto tw-px-3 lg:tw-px-8";
        return (0, s.jsxs)(s.Fragment, {
          children: [
            (0, s.jsx)(l(), {
              id: "1070e35b29a6e0d3",
              children:
                "body,html,#__next,.wrapper{height:auto;background:#12131a}",
            }),
            (0, s.jsxs)("div", {
              className:
                "jsx-1070e35b29a6e0d3 " +
                "".concat(
                  ["ar", "fa"].includes(e) ? "" : c().className,
                  " landing-page landing-text tw-h-fit tw-bg-gray-900"
                ),
              children: [
                (0, s.jsx)(r.wp, {}),
                (0, s.jsx)("div", {
                  className: "jsx-1070e35b29a6e0d3 " + "".concat(a),
                  children: (0, s.jsx)(r.VM, {}),
                }),
                (0, s.jsx)("div", {
                  className:
                    "jsx-1070e35b29a6e0d3 " +
                    "".concat(a, " sm:tw-max-w-full sm:tw-px-0"),
                  children: (0, s.jsx)(r.jk, {}),
                }),
                (0, s.jsx)("div", {
                  className: "jsx-1070e35b29a6e0d3 " + "".concat(a),
                  children: (0, s.jsx)(r.AN, {}),
                }),
                (0, s.jsx)("div", {
                  className: "jsx-1070e35b29a6e0d3 landing-footer ",
                  children: (0, s.jsx)("div", {
                    className: "jsx-1070e35b29a6e0d3 " + "".concat(a),
                    children: (0, s.jsx)(r.$_, {}),
                  }),
                }),
                (0, s.jsx)("div", {
                  className:
                    "jsx-1070e35b29a6e0d3 tw-pointer-events-none tw-absolute tw-top-0 tw-w-[100vw] tw-overflow-clip",
                  children: (0, s.jsx)("img", {
                    src: "/static/landing/landing-bg-min.png",
                    width: 1131,
                    height: 739,
                    alt: "bg-min",
                    priority: !0,
                    className: "jsx-1070e35b29a6e0d3",
                  }),
                }),
              ],
            }),
          ],
        });
      };
    },
    47354: function (e) {
      e.exports = {
        style: {
          fontFamily: "'__Manrope_027979', '__Manrope_Fallback_027979'",
          fontStyle: "normal",
        },
        className: "__className_027979",
      };
    },
  },
  function (e) {
    e.O(0, [9774, 2888, 179], function () {
      return e((e.s = 45728));
    }),
      (_N_E = e.O());
  },
]);
