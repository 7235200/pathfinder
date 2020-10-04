// @ts-ignore
window.orDie = (arg) => {
  if (arg === null || arg === undefined) throw new Error('Arguments is empty');
  return arg;
};
