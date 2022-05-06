import ComponentLabel from "./componentLabel.mjs";

const [MainState, $] = newState({
  seconds: 0,
});

const array = ['one', 'two', 'three', 'four', 'five'];

export default function Main(props) {
  clearInterval(Main.timer);
  Main.timer = setInterval(() => MainState.seconds += 1, 1000);

  return html`
    <main style="padding: 20px 30px; border: 1px solid green">
      <${ComponentLabel} label="main" />
      <div>
        <span>Timer: </span>
        <span>
          ${$('seconds')}
        </span>
      </div>

      <div>
        ${$((state) => {
          // did mount doesnt work without read of exsisting state field
          // console.log('component did update', state.seconds);
          return state.seconds % 2 === 0 ? 'even' : 'odd';
        })}
      </div>

      <div>
        ${$((state) => {
          // console.log('component did update', state.seconds);
          // console.log(array.slice(state.seconds % array.length, array.length));
          
          return array.slice(state.seconds % array.length, array.length).map(v => html`<span>${v}</span>`);
        })}/five
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
