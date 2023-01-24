import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PendingPurchase } from "../my-app";

@customElement("my-form")
export class MyForm extends LitElement {
  @property()
  nameOfPurchase: string = "";
  @property()
  priceOfPurchase: number | null = null;
  @property()
  test: () => void = () => {};

  constructor() {
    super();
    this.test = () => {};
  }

  changeNameOfPurchase(event: Event) {
    const input = event.target as HTMLInputElement;
    this.nameOfPurchase = input.value;
  }
  changePriceOfPurchase(event: Event) {
    const input = event.target as HTMLInputElement;
    this.priceOfPurchase = Number(input.value);
  }
  private _addNewPurchase() {
    const newPurchase: PendingPurchase = {
      id: new Date().getTime(),
      name: this.nameOfPurchase,
      price: Number(this.priceOfPurchase),
      alreadyBought: false,
    };
    const event = new CustomEvent("addNewPurchase", {
      detail: newPurchase,
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(event);
    this.nameOfPurchase = "";
    this.priceOfPurchase = null;
  }

  render() {
    return html`
      <input
        @input=${this.changeNameOfPurchase}
        .value=${this.nameOfPurchase}
        placeholder="Name"
      />
      <input
        @input=${this.changePriceOfPurchase}
        .value=${this.priceOfPurchase}
        type="number"
        placeholder="Price"
      />
      <button @click=${this._addNewPurchase}>Add</button>
    `;
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    input {
      padding: 1rem;
      border-radius: 8px;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      button {
        background-color: #f9f9f9;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "my-form": MyForm;
  }
}
