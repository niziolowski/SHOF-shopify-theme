import Alpine from "alpinejs";
import collapse from "@alpinejs/collapse";
import mobileMenu from "./mobileMenu";
Alpine.plugin(collapse);
Alpine.data("mobileMenu", mobileMenu);

window.Alpine = Alpine;

Alpine.start();
