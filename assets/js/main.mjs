import ComponentLabel from "./componentLabel.mjs";

const [MainState, sub] = newState({
  seconds: 0,
});

export default function Main(props) {
  clearInterval(Main.timer);
  Main.timer = setInterval(() => MainState.seconds += 1, 1000);

  return html`
    <main style="padding: 20px 30px; border: 1px solid green">
      <${ComponentLabel} label="main" />
      <div>
        <span>Timer: </span>
        <span>
          ${sub('seconds')}
        </span>
      </div>
      <div>
        <span>Prop, input value: </span>
        <span>
          ${props.testProp}
        </span>
      </div>
    </main>
  `;
}
