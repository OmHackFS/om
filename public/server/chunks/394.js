"use strict";
exports.id = 394;
exports.ids = [394];
exports.modules = {

/***/ 5394:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "h": () => (/* binding */ Header)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@heroicons/react/solid"
var solid_ = __webpack_require__(1143);
// EXTERNAL MODULE: external "@web3-react/core"
var core_ = __webpack_require__(8054);
// EXTERNAL MODULE: external "@web3-react/injected-connector"
var injected_connector_ = __webpack_require__(6590);
;// CONCATENATED MODULE: ./utils/connectors.ts

const injected = new injected_connector_.InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 31337]
});
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./components/ConnectWalletButton.tsx





const ConnectWalletButton = () => {
  const context = (0,core_.useWeb3React)();
  const {
    activate
  } = context;

  const handleClick = event => {
    event.preventDefault();

    async function _activate(activate) {
      await activate(injected);
    }

    _activate(activate);
  };

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("button", {
    onClick: handleClick,
    className: "group relative flex w-48 justify-center py-2 border border-transparent text-sm font-medium rounded-md text-black bg-[#] hover:bg-[#] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#]",
    children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
      className: "absolute left-0 inset-y-0 flex items-center pl-3",
      children: /*#__PURE__*/jsx_runtime_.jsx(solid_.LinkIcon, {
        className: "h-5 w-5 text-black group-hover:text-black",
        "aria-hidden": "true"
      })
    }), "Connect Wallet"]
  });
};
;// CONCATENATED MODULE: ./components/Header.tsx




const Header = () => {
  const {
    0: showDropdown,
    1: setShowDropdown
  } = (0,external_react_.useState)(false);

  const handleToggleDropdown = () => setShowDropdown(!showDropdown);

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "flex-1 px-4 flex justify-between",
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "flex-1 flex",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("form", {
        className: "w-full flex md:ml-0",
        action: "#",
        method: "GET",
        children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
          className: "sr-only",
          children: "Search"
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "relative w-full text-gray-400 focus-within:text-gray-600",
          children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "absolute inset-y-0 left-0 flex items-center pointer-events-none",
            children: /*#__PURE__*/jsx_runtime_.jsx("svg", {
              className: "h-5 w-5",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 20 20",
              fill: "currentColor",
              "aria-hidden": "true",
              children: /*#__PURE__*/jsx_runtime_.jsx("path", {
                fillRule: "evenodd",
                d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
                clipRule: "evenodd"
              })
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("input", {
            id: "search-field",
            className: "block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm",
            placeholder: "Search",
            type: "search",
            name: "search"
          })]
        })]
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "ml-4 flex items-center md:ml-6 gap-4",
      children: [/*#__PURE__*/jsx_runtime_.jsx(ConnectWalletButton, {}), /*#__PURE__*/(0,jsx_runtime_.jsxs)("button", {
        type: "button",
        className: "bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
        children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
          className: "sr-only",
          children: "View notifications"
        }), /*#__PURE__*/jsx_runtime_.jsx("svg", {
          className: "h-6 w-6",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: "2",
          stroke: "currentColor",
          "aria-hidden": "true",
          children: /*#__PURE__*/jsx_runtime_.jsx("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          })
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "ml-3 relative",
        children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("button", {
            type: "button",
            onClick: handleToggleDropdown,
            className: "max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
            id: "user-menu-button",
            "aria-expanded": "false",
            "aria-haspopup": "true",
            children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
              className: "sr-only",
              children: "Open user menu"
            }), /*#__PURE__*/jsx_runtime_.jsx("img", {
              className: "h-8 w-8 rounded-full",
              src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
              alt: ""
            })]
          })
        }), showDropdown ? /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none",
          role: "menu",
          "aria-orientation": "vertical",
          "aria-labelledby": "user-menu-button",
          tabIndex: -1,
          children: [/*#__PURE__*/jsx_runtime_.jsx("a", {
            href: "#",
            className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
            role: "menuitem",
            tabIndex: -1,
            id: "user-menu-item-0",
            children: "Your Profile"
          }), /*#__PURE__*/jsx_runtime_.jsx("a", {
            href: "#",
            className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
            role: "menuitem",
            tabIndex: -1,
            id: "user-menu-item-1",
            children: "Settings"
          }), /*#__PURE__*/jsx_runtime_.jsx("a", {
            href: "#",
            className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
            role: "menuitem",
            tabIndex: -1,
            id: "user-menu-item-2",
            children: "Sign out"
          })]
        }) : null]
      })]
    })]
  });
};

/***/ })

};
;