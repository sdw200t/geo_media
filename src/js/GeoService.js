import Printer from "./Printer";

export default class GeoService {
  constructor(inputHandler) {
    this.inputHandler = inputHandler;
  }

  checkGeoData() {
    let printer = new Printer(this.inputHandler);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (coords) {
          let result =
            "[" + coords.coords.latitude + ", " + coords.coords.longitude + "]";
          printer.print(result);
        },
        function (err) {
          printer.showModal();
        },
        {
          timeout: 5000,
          maximumAge: 10000,
          enableHighAccuracy: true,
        }
      );
    } else {
      return null;
    }
  }
}
