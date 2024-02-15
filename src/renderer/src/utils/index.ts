import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args));
};

const formatDateTime = new Intl.DateTimeFormat(window.context.locale, {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "UTC",
});

export const formatMS = (ms: number) => formatDateTime.format(ms);
