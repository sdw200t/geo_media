import GeoService from "./GeoService";
import Printer from "./Printer";

export default class UIInteractionService {
  constructor() {
    this.geoService = new GeoService(this);
    this.setTextInputFunctionality();
  }

  async setTextInputFunctionality() {
    const modalWindow = document.getElementsByClassName("geo-error-modal")[0];
    const textArea = document.getElementsByClassName("feed-input")[0];

    textArea.addEventListener("keypress", async (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.geoService.checkGeoData();
      }
    });

    const geoTextArea = document.getElementsByClassName("geo-error-input")[0];
    geoTextArea.addEventListener("keypress", async (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        await this.validateInputInModal();
      }
    });

    const modalCancelBtn = document.getElementsByClassName(
      "geo-error-cancel-btn"
    )[0];
    modalCancelBtn.addEventListener("click", (event) => {
      event.preventDefault();
      modalWindow.classList.add("hidden");
    });

    const modalOkBtn = document.getElementsByClassName("geo-error-ok-btn")[0];
    modalOkBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      await this.validateInputInModal();
    });
  }

  async showModal() {
    const modalWindow = document.getElementsByClassName("geo-error-modal")[0];
    modalWindow.classList.remove("hidden");
  }

  async validateInputInModal() {
    const geoTextArea = document.getElementsByClassName("geo-error-input")[0];
    const modalWindow = document.getElementsByClassName("geo-error-modal")[0];

    try {
      await Printer.validateInputGeo();
      geoTextArea.value = "";
      modalWindow.classList.add("hidden");
    } catch (e) {
      console.log("wrong coordinates input");
      geoTextArea.value = "";
    }
  }
}
