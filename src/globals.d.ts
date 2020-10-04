export {};

declare global {
  interface Window {
    orDie: <T>(arg: T) => T extends undefined | null ? never : T;
  }
}
