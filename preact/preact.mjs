import { h, render } from "https://unpkg.com/preact?module";

// component
function Header(props) {
  // arguments h(tagname, attributes, child | children[])
  const html = 
  h(
    // tagname
    "header",
    // tag attributes
    { id: "header" },
    // children
    [
      h(
        "h1",
        null,
        `Hello World! Test ${props.test}`,
      ),
    ],
  );
  return html;
}

// component
const App = (props) =>
  h(
    // tagname
    "div",
    // tag attributes
    { id: "app" },
    [
      // children
      Header({ test: 1 }),
    ],
  );

render(App(), document.querySelector("simple-h"));
