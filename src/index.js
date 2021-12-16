import "@scss/index.scss";
import "./components";
import * as bootstrap from "bootstrap";

CKEDITOR.replace("body", {
  plugins: "wysiwygarea, toolbar, basicstyles, link",
});
