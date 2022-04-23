export default function ComponentLabel(props) {
  return html`
    <div style="position: absolute; transform: translate(-25px, -20px)">
      ${`<${props.label} />`}
    </div>
  `;
}