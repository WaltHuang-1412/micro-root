import { registerApplication, start, navigateToUrl } from "single-spa";

// ✅ 自動判斷 base prefix
const isProd = location.pathname.startsWith("/micro-root");
const basePrefix = isProd ? "/micro-root" : "";

// ✅ 動態 activeWhen 建立器
const withBase = (path: string) => `${basePrefix}${path}`;

// ✅ welcome
// registerApplication({
//   name: "single-spa/welcome",
//   app: () => import(/* webpackIgnore: true */ "@single-spa/welcome"),
//   activeWhen: [withBase("/welcome")],
// });

// ✅ navbar
registerApplication({
  name: "vue-micro/navbar",
  app: () =>
    System.import("@vue-micro/navbar").then((module) => ({
      bootstrap: module.bootstrap,
      mount: module.mount,
      unmount: module.unmount,
    })),
  activeWhen: [
    (location) =>
      location.pathname === withBase("/") ||
      location.pathname.startsWith(withBase("/sub")),
  ],
  customProps: {
    domElement: document.getElementById("app__navbar-slot"),
  },
});

// ✅ sub
registerApplication({
  name: "vue-micro/sub",
  app: () =>
    System.import("@vue-micro/sub").then((module) => ({
      bootstrap: module.bootstrap,
      mount: module.mount,
      unmount: module.unmount,
    })),
  activeWhen: [withBase("/sub")],
  customProps: {
    domElement: document.getElementById("app__sub-slot"),
  },
});

// ✅ auth
registerApplication({
  name: "vue-micro/auth",
  app: () =>
    System.import("@vue-micro/auth").then((module) => ({
      bootstrap: module.bootstrap,
      mount: module.mount,
      unmount: module.unmount,
    })),
  activeWhen: [withBase("/auth")],
  customProps: {
    domElement: document.getElementById("auth-app"),
  },
});

// ✅ 啟動 single-spa
start({ urlRerouteOnly: true });

if (window.location.pathname === `${basePrefix}/`) {
  setTimeout(() => {
    navigateToUrl(`${basePrefix}/auth`);
  }, 0); // ✅ 或用微延遲確保順序
}
