"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 622:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./components/SidebarNavigation.tsx
 // import { Link } from "react-router-dom";
// import logo from "../logos/Om-logos_white.png";



const TABS = [{
  id: "0",
  name: "DAO's",
  active: true,
  logo: /*#__PURE__*/jsx_runtime_.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "mr-4 flex-shrink-0 h-6 w-6 text-indigo-300",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2",
    children: /*#__PURE__*/jsx_runtime_.jsx("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    })
  })
}, {
  id: "1",
  name: "My Page",
  active: false,
  logo: /*#__PURE__*/jsx_runtime_.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "mr-4 flex-shrink-0 h-6 w-6 text-indigo-300",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2",
    children: /*#__PURE__*/jsx_runtime_.jsx("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    })
  })
}, {
  id: "2",
  name: "Data",
  logo: /*#__PURE__*/jsx_runtime_.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "mr-4 flex-shrink-0 h-6 w-6 text-indigo-300",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2,
    children: /*#__PURE__*/jsx_runtime_.jsx("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    })
  })
}];
const SidebarNavigation = () => {
  const {
    0: activeTab,
    1: setActiveTab
  } = (0,external_react_.useState)("DAO's");

  const handleSelectTab = newTab => {
    setActiveTab(newTab);
  };

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "relative z-40 md:hidden",
      role: "dialog",
      "aria-modal": "true",
      children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "fixed inset-0 bg-gray-600 bg-opacity-75"
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "fixed inset-0 flex z-40",
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700",
          children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "absolute top-0 right-0 -mr-12 pt-2",
            children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("button", {
              type: "button",
              className: "ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white",
              children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
                className: "sr-only",
                children: "Close sidebar"
              }), /*#__PURE__*/jsx_runtime_.jsx("svg", {
                className: "h-6 w-6 text-white",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: "2",
                stroke: "currentColor",
                "aria-hidden": "true",
                children: /*#__PURE__*/jsx_runtime_.jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M6 18L18 6M6 6l12 12"
                })
              })]
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "flex-shrink-0 flex items-center px-4"
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "mt-5 flex-1 h-0 overflow-y-auto",
            children: /*#__PURE__*/jsx_runtime_.jsx("nav", {
              className: "px-2 space-y-1",
              children: TABS.map(tab => /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
                className: "text-indigo-100 hover:bg-indigo-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                children: [tab.logo, tab.name]
              }, tab.name))
            })
          })]
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "flex-shrink-0 w-14",
          "aria-hidden": "true"
        })]
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "flex flex-col flex-grow pt-5 bg-indigo-700 overflow-y-auto",
        children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "flex items-center flex-shrink-0 px-4"
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "mt-5 flex-1 flex flex-col",
          children: /*#__PURE__*/jsx_runtime_.jsx("nav", {
            className: "flex-1 px-2 pb-4 space-y-1",
            children: TABS.map(tab => /*#__PURE__*/(0,jsx_runtime_.jsxs)("span", {
              onClick: () => handleSelectTab(tab.name),
              className: `cursor-pointer ${activeTab === tab.name ? "bg-indigo-800 text-white" : "text-indigo-100"} hover:bg-indigo-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md`,
              children: [tab.logo, tab.name]
            }, tab.name))
          })
        })]
      })
    })]
  });
};
;// CONCATENATED MODULE: ./pages/_app.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







function MyApp({
  Component,
  pageProps
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(SidebarNavigation, {}), /*#__PURE__*/jsx_runtime_.jsx(Component, _objectSpread({}, pageProps))]
  });
}

/* harmony default export */ const _app = (MyApp);

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(622));
module.exports = __webpack_exports__;

})();