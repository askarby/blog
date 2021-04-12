"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeTocFunc = exports.routeToc = void 0;
const scully_1 = require("@scullyio/scully");
const fs = __importStar(require("fs"));
exports.routeToc = "routeToc";
const routeTocFunc = async (routes) => {
  const options = scully_1.getMyConfig(exports.routeToc);
  console.log("found options >>\n", JSON.stringify(options, null, 2));
  return routes
    .filter((route) => route.templateFile)
    .map((route) => {
      if (route.route.startsWith(options.path)) {
        const content = fs.readFileSync(route.templateFile).toString("utf-8");
        console.log(content);
        // TODO: Add headings for toc-rendering of Angular App, eg.:
        // toc: [
        //   { id: '...', text: '...', level: 'h1' },
        //   { id: '...', text: '...', level: 'h2' },
        //   { id: '...', text: '...', level: 'h2' },
        //   ...
        // ]
        const newRoute = {
          ...route,
          data: {
            ...route.data,
            bob: true,
          },
        };
        return newRoute;
      }
      return route;
    });
};
exports.routeTocFunc = routeTocFunc;
console.log(
  `Registering ${exports.routeToc} plugin, with function: ${exports.routeTocFunc}!`
);
scully_1.registerPlugin("routeProcess", exports.routeToc, exports.routeTocFunc);
//# sourceMappingURL=route-toc-plugin.js.map
