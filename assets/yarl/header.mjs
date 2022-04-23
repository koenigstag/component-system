import ComponentLabel from "./componentLabel.mjs";

export default function Header(props) {
  return html`
    <header style="display: flex; padding: 20px 30px; border: 1px solid green">
      <${ComponentLabel} label="header" />
      <div style="color: white; margin-right: 20px">LOGO</div>
      <div style>
        ${props.children}
      </div>
    </header>
  `;
}