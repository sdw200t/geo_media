import DateService from "./DateService";

export default class Printer {
  constructor(inputHandler) {
    this.inputHandler = inputHandler;
  }

  static async validateInputGeo(rawInput) {
    let geoRaw;
    if (rawInput === null || rawInput === undefined) {
      const geoTextArea = document.getElementsByClassName("geo-error-input")[0];
      geoRaw = geoTextArea.value.trim();
    } else {
      geoRaw = rawInput;
    }

    if (geoRaw === null || geoRaw === undefined || geoRaw === "") {
      throw new Error("illegal geodata:" + geoRaw);
    }

    if (
      !geoRaw.includes("[") ||
      !geoRaw.includes("]") ||
      !geoRaw.includes(",") ||
      !geoRaw.includes(" ")
    ) {
      throw new Error("wrong input geodata. missed symbol.");
    }

    if (geoRaw.match(/[a-zA-Z]/))
      throw new Error("wrong input geodata. letters not allowed.");
    if (!geoRaw.match(/[0-9]/))
      throw new Error("wrong input geodata. digits not found.");

    if (
      geoRaw.split(".").length - 1 !== 2 &&
      geoRaw.split(".").length - 1 !== 1 &&
      geoRaw.split(".").length - 1 !== 0
    )
      throw new Error("wrong input geodata. more than 2 dots.");

    if (rawInput === null || rawInput === undefined) {
      await new Printer().print(geoRaw);
    } else {
      return true;
    }
  }

  async print(coords) {
    const textArea = document.getElementsByClassName("feed-input")[0];
    const postContainer = document.getElementsByClassName(
      "feed-posts-container"
    )[0];

    let post = await this.buildTxtPost(textArea.value, coords);
    postContainer.appendChild(post);
    textArea.value = "";
    postContainer.scroll(0, -1000);
  }

  async showModal() {
    this.inputHandler.showModal();
  }

  async buildTxtPost(txt, coords) {
    let feedPost = document.createElement("div");
    feedPost.classList.add("feed-post");

    let firstLine = document.createElement("div");
    firstLine.classList.add("feed-post-first_line");

    let postContent = document.createElement("div");
    postContent.classList.add("feed-post-content");
    postContent.textContent = txt;

    let postDate = document.createElement("div");
    postDate.classList.add("feed-post-date");
    postDate.textContent =
      DateService.getCurrentDate() + " " + DateService.getCurrentTime();

    firstLine.append(postContent);
    firstLine.append(postDate);

    let secondLine = document.createElement("div");
    secondLine.classList.add("feed-post-second_line");

    let postCoordinates = document.createElement("div");
    postCoordinates.classList.add("feed-post-coordinate");
    postCoordinates.textContent = coords;

    let postPic = document.createElement("div");
    postPic.classList.add("feed_post-watched-pic");

    secondLine.append(postCoordinates);
    secondLine.append(postPic);

    feedPost.appendChild(firstLine);
    feedPost.appendChild(secondLine);

    return feedPost;
  }
}
