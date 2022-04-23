import * as AppState from './app.mjs';
import ComponentLabel from './componentLabel.mjs';

export default function Footer() {
  console.log(AppState);

  return html`
    <footer style="display: flex; padding: 20px 30px; border: 1px solid green">
      <${ComponentLabel} label="footer" />
      <!-- context -->
      <div>
        <span style="margin-right: 20px">
          Context, link text value
        </span>
        <span>
          ${AppState.sub('test')}
        </span>
      </div>
    </footer>
  `;
}
