import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PendingPurchase } from "../my-app";

@customElement("my-list")
export class MyList extends LitElement {
  @property()
  pendingPurchases: PendingPurchase[] = [];
  constructor() {
    super();
    this.pendingPurchases = [];
  }
  manageCheckPurchase(id: number) {
    const event = new CustomEvent("manageCheckPurchase", {
      detail: { idOfPurchase: id },
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(event);
  }
  deletePurchase(id: number) {
    const event = new CustomEvent("deletePurchase", {
      detail: { idOfPurchase: id },
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(event);
  }
  render() {
    return html`
      <div>
        <table>
          <tr>
            <th id="bougthTH">Bought</th>
            <th id="nameTH">Name</th>
            <th id="priceTH">Price</th>
            <th id="actionTH">Action</th>
          </tr>
          ${this.pendingPurchases.map(
            (p) => html`
              <tr>
                <td>
                  <input
                    @input=${() => this.manageCheckPurchase(p.id)}
                    ?checked=${p.alreadyBought}
                    type="checkbox"
                  />
                </td>
                <td>${p.name}</td>
                <td>${p.price}</td>
                <td>
                  <button @click=${() => this.deletePurchase(p.id)}>x</button>
                </td>
              </tr>
            `
          )}
        </table>
        ${this.pendingPurchases.length === 0
          ? html`<p>There is no pending purchases</p>`
          : ""}
      </div>
    `;
  }
  static styles = css`
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    p {
      font-weight: bold;
      font-size: 1rem;
    }
    table {
      width: 100%;
      border-radius: 8px;
      border: 2px solid #888;
    }
    tr:nth-child(even) {
      background-color: #565656;
    }
    tr {
      width: 100%;
    }
    #bougthTH {
      width: min-content;
    }
    #nameTH {
      width: 50%;
    }
    #actionTH {
      width: 30%;
    }
    #priceTH {
      width: 30%;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.3em 0.6em;
      font-size: 1rem;
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
    "my-list": MyList;
  }
}
