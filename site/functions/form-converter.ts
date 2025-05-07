export const converter = (form: HTMLFormElement) => {
  const data = new FormData(form);
  return Object.fromEntries(data);
};
