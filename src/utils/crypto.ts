import { generateRandomString, RandomReader } from "@oslojs/crypto/random";
import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";

export const generateRandomToken = () => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  return encodeBase32LowerCaseNoPadding(bytes);
};

export const hasToken = (token: string) => {
  return encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
};

const alphabet =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const random: RandomReader = {
  read(bytes: Uint8Array) {
    crypto.getRandomValues(bytes);
  },
};

export const generateRandomCode = () => {
  return generateRandomString(random, alphabet, 6);
};
