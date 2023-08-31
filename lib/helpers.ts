import readingTime from "reading-time";
import { DateTime } from "luxon";

export const getReadingTime = (text: string, locale: string) => {
  // return readingTime(text).text;
  const minutes = readingTime(text).minutes;
  const minutesRoundedOff = Math.floor(minutes);
  if (locale == "de") {
    if (minutesRoundedOff === 1) {
      return `${minutesRoundedOff} minute`;
    } else {
      return `${minutesRoundedOff} minuten`;
    }
  } else {
    if (minutesRoundedOff === 1) {
      return `${minutesRoundedOff} minute`;
    } else {
      return `${minutesRoundedOff} minutes`;
    }
  }
};

export const getRelativeDate = (date: string, locale: string) => {
  return DateTime.fromISO(date).setLocale(locale).toRelative();
};
