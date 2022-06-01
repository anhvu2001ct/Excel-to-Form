import { customAlphabet } from "nanoid";
export function genHTMLId() {
  return customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 5)();
}
