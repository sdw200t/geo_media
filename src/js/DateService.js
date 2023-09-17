import { format } from "date-fns";

export default class DateService {
  static getCurrentDate() {
    return format(new Date(), "dd.MM.yyyy");
  }

  static getCurrentTime() {
    let d = new Date();
    return d.getHours() + ":" + d.getMinutes();
  }
}
