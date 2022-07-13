"use strict";
exports.id = 591;
exports.ids = [591];
exports.modules = {

/***/ 1591:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "b": () => (/* binding */ SubHeader)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);




const HEADERS = [{
  name: "Proposals",
  active: true,
  path: "/proposals_page",
  id: "0"
}, {
  name: "Memberships",
  active: false,
  path: "/dao_members",
  id: "1"
}, {
  name: "Dao Data",
  active: false,
  path: "/dao_data_page",
  id: "2"
}, {
  name: "My Page",
  active: false,
  path: "/my_page",
  id: "3"
}];
const SubHeader = () => {
  const {
    0: activeHeader,
    1: setActiveHeader
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("Proposals");

  const handleSelectHeader = newHeader => {
    setActiveHeader(newHeader);
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("nav", {
    className: "bg-white shadow",
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
      className: "max-w-7xl mx-auto sm:px-4 lg:px-8",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
        className: "flex justify-between h-8",
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
          className: "flex lg:px-0",
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
            className: "hidden lg:flex lg:space-x-8",
            children: HEADERS.map(header => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
              href: header.path,
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
                onClick: () => handleSelectHeader(header.name),
                className: `cursor-pointer
                    ${activeHeader === header.name ? "border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"}`,
                children: header.name
              }, header.id)
            }))
          })
        })
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
      className: "lg:hidden",
      id: "mobile-menu",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
        className: "pt-2 pb-3 space-y-1",
        children: HEADERS.map(header => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
          onClick: () => handleSelectHeader(header.name),
          className: `cursor-pointer
                    ${activeHeader === header.name ? "bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"}`,
          children: header.name
        }, header.id))
      })
    })]
  });
};

/***/ })

};
;