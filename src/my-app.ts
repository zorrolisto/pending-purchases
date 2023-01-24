import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./components/my-form";
import "./components/my-list";

export interface PendingPurchase {
  id: number;
  name: string;
  price: number;
  alreadyBought: boolean;
}

@customElement("my-app")
export class App extends LitElement {
  @property()
  pendingPurchases: PendingPurchase[] = [];
  @property({ type: Number })
  count = 0;

  constructor() {
    super();
    const pendingPurchasesLocalStorage =
      localStorage.getItem("pendingPurchases");
    if (pendingPurchasesLocalStorage) {
      this.pendingPurchases = JSON.parse(
        pendingPurchasesLocalStorage
      ) as PendingPurchase[];
    }
  }
  updatePendingPurchasesInLocalStorage() {
    localStorage.setItem(
      "pendingPurchases",
      JSON.stringify(this.pendingPurchases)
    );
  }
  addNewPurchase(e: CustomEvent) {
    this.pendingPurchases = [...this.pendingPurchases, e.detail];
    this.updatePendingPurchasesInLocalStorage();
  }
  manageCheckPurchase(e: CustomEvent) {
    this.pendingPurchases = this.pendingPurchases.map((p) => {
      if (p.id === e.detail.idOfPurchase) {
        return { ...p, alreadyBought: !p.alreadyBought };
      }
      return p;
    });
    this.updatePendingPurchasesInLocalStorage();
  }
  deletePurchase(e: CustomEvent) {
    this.pendingPurchases = this.pendingPurchases.filter(
      (p) => p.id !== e.detail.idOfPurchase
    );
    this.updatePendingPurchasesInLocalStorage();
  }

  render() {
    return html`
      <h1>Pending Purchases</h1>
      <my-form @addNewPurchase=${this.addNewPurchase}></my-form>
      <my-list
        @manageCheckPurchase=${this.manageCheckPurchase}
        @deletePurchase=${this.deletePurchase}
        .pendingPurchases=${this.pendingPurchases}
      ></my-list>
    `;
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    h1 {
      font-size: 3.2em;
      line-height: 1.1;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "my-app": App;
  }
}
