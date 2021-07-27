import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import './moment-import.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/**
 * `flip-clock`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class FlipClock extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }
      #clock {
        font-family: Arial, Verdana, sans-serif;
        font-weight: bold;
        font-size: var(--digits-size, 70px);
      }
      #clock .num {
        position: relative;
        display: inline-block;
        margin-right: 10px;
        padding: 5px 15px;
        border-radius: 4px;
        color: var(--digits-color, #fff);
        box-shadow: var(--box-shadow, 1px 1px 1px #555);
        background-color: var(--bg-color, #333);
      }
      #clock .num:after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 100%;
        height: 3px;
        background-color: #111;
      }
      #clock b {
        color: #333;
        margin-right: 10px;
      }
      .btn {
        margin: 20px 10px 10px 10px;
        padding: 5px 10px;
        border: 1px solid #000;
        border-radius: 2px;
        cursor: pointer;
        color: #dedede;
        background-color: #333;
      }
      .btn[disabled] {
        opacity: .5;
      }
    </style>
    <div id="clock">
      <span hidden\$="[[hideHours]]">
        <span class="num" id="hours0">[[time.0]]</span><span class="num" id="hours1">[[time.1]]</span><b>:</b>
      </span>
      <span class="num" id="minutes0">[[time.2]]</span><span class="num" id="minutes1">[[time.3]]</span>
      <span hidden\$="[[hideSeconds]]">
        <b>:</b><span class="num" id="seconds0">[[time.4]]</span><span class="num" id="seconds1">[[time.5]]</span>
      </span>

    </div>
    <div class="buttons" hidden\$="[[!showButtons]]">
      <button class="toggle btn" on-click="_startCount" disabled\$="[[isRunning]]">Start</button>
      <button class="toggle btn" on-click="_stopCount">Stop</button>
      <button class="reset btn" on-click="_resetCount">Reset</button>
    </div>
`;
  }

  static get is() { return 'flip-clock'; }
  static get properties() {
    return {
      displayMode: {
        type: String
      },
      showButtons: {
        type: Boolean,
        value: false
      },
      hideHours: {
        type: Boolean,
        value: false
      },
      hideSeconds: {
        type: Boolean,
        value: false
      },
      startFrom: {
        type: Number,
        value: null
      },
      auto: {
        type: Boolean,
        value: false
      },
      isRunning: {
        type: Boolean,
        value: false
      }
    };
  }
  constructor() {
    super();
    this.time = '000000';
    this.timer = null;
  }
  _createClock() {
    this.time = moment().format('HHmmss');
    setTimeout(() => this._createClock(), 1000);
  }
  _createTimer() {
    if(this.isRunning) {
      this.time = this.timer.add(1, 's').format('HHmmss');
      setTimeout(() => this._createTimer(), 1000);
    }
  }
  _createCountdown() {
    if(this.isRunning) {
      if(this.time > 0) {
        this.time = this.timer.subtract(1, 's').format('HHmmss');
        setTimeout(() => this._createCountdown(), 1000);
      }
    }
  }
  _startCount() {
    if(!this.timer) {
      this.timer = moment().hours(0).minutes(this.startFrom || 0).seconds(0);
    }
    this.isRunning = true;
    this.startFrom ? this._createCountdown() : this._createTimer();
  }
  _stopCount() {
    this.isRunning = false;
  }
  _resetCount() {
    this.isRunning = false;
    this.time = this.startFrom ? '00' + this.startFrom + '00' : '000000';
    this.timer = null;
  }
  ready() {
    super.ready();
    this._resetCount();

    if(this.displayMode === 'timer' || this.displayMode === 'countdown') {
      if(this.auto === true) {
        this._startCount();
      }
    }  else {
      this._createClock();
    }

    if(this.startFrom) {
      this.time = '00' + ('00' + this.startFrom).slice(-2) + '00';
    }
  }
}

window.customElements.define(FlipClock.is, FlipClock);
