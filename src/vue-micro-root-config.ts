import {
  registerApplication,
  start,
  LifeCycles,
  navigateToUrl,
} from "single-spa";

registerApplication({
  name: "single-spa/welcome",
  app: () =>
    import(
      /* webpackIgnore: true */ // @ts-ignore-next
      "@single-spa/welcome"
    ),
  activeWhen: ["/welcome"],
});

registerApplication({
  name: "vue-micro/navbar",
  app: () =>
    System.import(
      /* webpackIgnore: true */ // @ts-ignore-next
      "@vue-micro/navbar"
    ).then((module) => ({
      bootstrap: module.bootstrap,
      mount: module.mount,
      unmount: module.unmount,
    })),
  activeWhen: ["/", "/sub"],
  customProps: {
    domElement: document.getElementById("app__navbar-slot"),
  },
});
registerApplication({
  name: "vue-micro/sub",
  app: () =>
    System.import(
      /* webpackIgnore: true */ // @ts-ignore-next
      "@vue-micro/sub"
    ).then((module) => ({
      bootstrap: module.bootstrap,
      mount: module.mount,
      unmount: module.unmount,
    })),
  activeWhen: ["/sub"],
  customProps: {
    domElement: document.getElementById("app__sub-slot"),
  },
});

registerApplication({
  name: "vue-micro/auth",
  app: () =>
    System.import("@vue-micro/auth").then((module) => ({
      bootstrap: module.bootstrap,
      mount: module.mount,
      unmount: module.unmount,
    })),
  activeWhen: ["/auth"],
  customProps: {
    domElement: document.getElementById("auth-app"), // ✅ 你自己定義的容器
  },
});

start({
  urlRerouteOnly: true,
});

if (window.location.pathname === "/") {
  // navigateToUrl("/auth");
  window.location.href = "/auth";
}
