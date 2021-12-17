import "@scss/index.scss";
import "@css/index.css";
import "./components";
import * as bootstrap from "bootstrap";

CKEDITOR.replace("body", {
  plugins: "wysiwygarea, toolbar, basicstyles, link",
});
