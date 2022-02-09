import { customAlphabet } from "nanoid";

export const ALPHABET = ' !\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~';
export const ALPHABET_URL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const secure8 = customAlphabet(ALPHABET, 8);
export const secure16 = customAlphabet(ALPHABET, 16);
export const secure32 = customAlphabet(ALPHABET, 32);
export const secure64 = customAlphabet(ALPHABET, 64);

export const secure8url = customAlphabet(ALPHABET_URL, 8);
export const secure16url = customAlphabet(ALPHABET_URL, 16);
export const secure32url = customAlphabet(ALPHABET_URL, 32);
export const secure64url = customAlphabet(ALPHABET_URL, 64);


export const now = () => (new Date()).toJSON(); // YYYY-MM-DDThh:mm:ss.SSSZ


export const initURL8 = () => `${now()}${secure8url()}`;                                    // [TIME][08]
export const initURL16 = () => `${now()}${secure16url()}`;                                  // [TIME][16]
export const initURL24 = () => `${now()}${secure16url()}${secure8url()}`;                   // [TIME][24]
export const initURL32 = () => `${now()}${secure32url()}`;                                  // [TIME][32]
export const initURL40 = () => `${now()}${secure32url()}${secure8url()}`;                   // [TIME][40]
export const initURL48 = () => `${now()}${secure32url()}${secure16url()}`;                  // [TIME][48]
export const initURL56 = () => `${now()}${secure32url()}${secure16url()}${secure8url()}`;   // [TIME][56]
export const initURL64 = () => `${now()}${secure64url()}`;                                  // [TIME][64]
