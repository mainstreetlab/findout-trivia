"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@ethersproject+base64@5.7.0";
exports.ids = ["vendor-chunks/@ethersproject+base64@5.7.0"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@ethersproject+base64@5.7.0/node_modules/@ethersproject/base64/lib.esm/base64.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@ethersproject+base64@5.7.0/node_modules/@ethersproject/base64/lib.esm/base64.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   decode: () => (/* binding */ decode),\n/* harmony export */   encode: () => (/* binding */ encode)\n/* harmony export */ });\n/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/bytes */ \"(ssr)/./node_modules/.pnpm/@ethersproject+bytes@5.7.0/node_modules/@ethersproject/bytes/lib.esm/index.js\");\n\n\nfunction decode(textData) {\n    textData = atob(textData);\n    const data = [];\n    for (let i = 0; i < textData.length; i++) {\n        data.push(textData.charCodeAt(i));\n    }\n    return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__.arrayify)(data);\n}\nfunction encode(data) {\n    data = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__.arrayify)(data);\n    let textData = \"\";\n    for (let i = 0; i < data.length; i++) {\n        textData += String.fromCharCode(data[i]);\n    }\n    return btoa(textData);\n}\n//# sourceMappingURL=base64.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQGV0aGVyc3Byb2plY3QrYmFzZTY0QDUuNy4wL25vZGVfbW9kdWxlcy9AZXRoZXJzcHJvamVjdC9iYXNlNjQvbGliLmVzbS9iYXNlNjQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7QUFDbUM7QUFDekM7QUFDUDtBQUNBO0FBQ0Esb0JBQW9CLHFCQUFxQjtBQUN6QztBQUNBO0FBQ0EsV0FBVyw4REFBUTtBQUNuQjtBQUNPO0FBQ1AsV0FBVyw4REFBUTtBQUNuQjtBQUNBLG9CQUFvQixpQkFBaUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpbmRvdXQvLi9ub2RlX21vZHVsZXMvLnBucG0vQGV0aGVyc3Byb2plY3QrYmFzZTY0QDUuNy4wL25vZGVfbW9kdWxlcy9AZXRoZXJzcHJvamVjdC9iYXNlNjQvbGliLmVzbS9iYXNlNjQuanM/ZmU1ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCB7IGFycmF5aWZ5IH0gZnJvbSBcIkBldGhlcnNwcm9qZWN0L2J5dGVzXCI7XG5leHBvcnQgZnVuY3Rpb24gZGVjb2RlKHRleHREYXRhKSB7XG4gICAgdGV4dERhdGEgPSBhdG9iKHRleHREYXRhKTtcbiAgICBjb25zdCBkYXRhID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0RGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICBkYXRhLnB1c2godGV4dERhdGEuY2hhckNvZGVBdChpKSk7XG4gICAgfVxuICAgIHJldHVybiBhcnJheWlmeShkYXRhKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBlbmNvZGUoZGF0YSkge1xuICAgIGRhdGEgPSBhcnJheWlmeShkYXRhKTtcbiAgICBsZXQgdGV4dERhdGEgPSBcIlwiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICB0ZXh0RGF0YSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGRhdGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYnRvYSh0ZXh0RGF0YSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNlNjQuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@ethersproject+base64@5.7.0/node_modules/@ethersproject/base64/lib.esm/base64.js\n");

/***/ })

};
;