/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
export const delay = () => new Promise((res: any) => setTimeout(() => {
  return res();
}, 1500));
