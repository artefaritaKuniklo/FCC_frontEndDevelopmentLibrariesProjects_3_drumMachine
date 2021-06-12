import "./App.scss";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React from "react";
import btnPower from "./btn.svg";

function App() {
  let [panel, setPanel] = React.useState({
    power: false,
    bank: "Heater Kit",
    screen: "",
    vol: window.localStorage.getItem("volLocal") | 20,
    lastKey: "",
  });

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });
  const handleKeyPress = (e) => {
    console.log(e.key);
    if (keyArr.indexOf(e.key.toUpperCase()) !== -1) {
      playMusic(e.key.toUpperCase(), keyArr.indexOf(e.key.toUpperCase()));
    } else {
      switch (e.key) {
        case "p":
          panel.power
            ? setPanel(
                Object.assign({}, panel, { power: false, screen: "OFF" })
              )
            : setPanel(Object.assign({}, panel, { power: true, screen: "ON" }));
          break;
        case "b":
          !panel.power
            ? console.log()
            : panel.bank === "Heater Kit"
            ? setPanel(
                Object.assign({}, panel, {
                  bank: "Piano Kit",
                  screen: "Piano Kit",
                })
              )
            : setPanel(
                Object.assign({}, panel, {
                  bank: "Heater Kit",
                  screen: "Heater Kit",
                })
              );
          break;
        case "ArrowUp":
          console.log(panel);
          setPanel(
            Object.assign({}, panel, {
              vol: Math.min(panel.vol + 10, 100),
              screen: "VOL:" + Math.min(panel.vol + 10, 100),
            })
          );
          break;
        case "ArrowDown":
          setPanel(
            Object.assign({}, panel, {
              vol: Math.max(panel.vol - 10, 0),
              screen: "VOL:" + Math.max(panel.vol - 10, 0),
            })
          );
          break;
        default:
          break;
      }
    }
  };
  const playMusic = (sourceId, ind) => {
    if (panel.power) {
      console.log(panel.bank.replace(" ", "-") + sourceId);
      let audioDOM = document.getElementsByClassName(
        panel.bank.replace(" ", "-") + sourceId
      )[0];
      audioDOM.volume = panel.vol / 100;
      audioDOM.play();
      setPanel(
        Object.assign({}, panel, {
          lastKey: sourceId,
          screen:
            panel.bank == "Heater Kit" ? bankOne[ind].id : bankTwo[ind].id,
        })
      );
    }
  };
  const keyArr = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
  return (
    <div className="App" id="drum-machine">
      <div id="main-frame">
        <div id="title-frame">
          <h2>A Useless Drum Machine</h2>
        </div>
        <div id="misc-container">
          <div className="btn-group">
            <button
              id="powerSwitch"
              className="switch"
              onClick={() => {
                panel.power
                  ? setPanel(
                      Object.assign({}, panel, { power: false, screen: "OFF" })
                    )
                  : setPanel(
                      Object.assign({}, panel, { power: true, screen: "ON" })
                    );
              }}
            >
              <img src={btnPower} alt=""></img>
            </button>
            <div>[P]ower</div>
          </div>
          <div className="btn-group">
            <button
              id="bankSwitch"
              className="switch"
              onClick={() => {
                !panel.power
                  ? console.log()
                  : panel.bank === "Heater Kit"
                  ? setPanel(
                      Object.assign({}, panel, {
                        bank: "Piano Kit",
                        screen: "Piano Kit",
                      })
                    )
                  : setPanel(
                      Object.assign({}, panel, {
                        bank: "Heater Kit",
                        screen: "Heater Kit",
                      })
                    );
              }}
            >
              <div
                className="led"
                style={
                  panel.bank === "Piano Kit" ? { backgroundColor: "red" } : {}
                }
              ></div>
            </button>
            <div>[B]ank</div>
          </div>
          <div className="btn-group">
            <div id="display">{panel.power ? panel.screen : "OFF"}</div>
            <div>State</div>
          </div>
          <div className="btn-group">
            <div id="vol-tuner">
              <Slider
                value={panel.vol}
                onChange={(value) => {
                  setPanel(
                    Object.assign({}, panel, {
                      vol: value,
                      screen: "VOL:" + value,
                    })
                  );
                }}
                onAfterChange={() => {
                  window.localStorage.setItem("volLocal", panel.vol);
                }}
                vertical="true"
              ></Slider>
            </div>
            <div>Vol</div>
          </div>
        </div>
        <div id="keys-container">
          {keyArr.map((it, ind) => (
            <button
              className="drum-pad"
              id="drum pad"
              key={it}
              onClick={() => {
                playMusic(it, ind);
              }}
            >
              <div
                className="led"
                style={panel.lastKey == it ? { backgroundColor: "red" } : {}}
              ></div>
              {it}
              <audio
                // className="audioSrc"
                id={it}
                src={bankOne[ind].url}
                className={"Heater-Kit" + it + " clip"}
              />
              <audio
                // className="audioSrc"
                src={bankTwo[ind].url}
                className={"Piano-Kit" + it}
              />
            </button>
          ))}
        </div>
      </div>
      <p>
        1-9 for keypad control
        <br />
        ArrowUp/Down for volume control
      </p>
    </div>
  );
}

// from FCC sample https://codepen.io/freeCodeCamp/pen/MJyNMd
const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

export default App;
