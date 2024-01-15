import { cookies } from "next/headers";

/**
 * Wraps the provided API instance with server-side rendering (SSR) capabilities.
 * @param api - The API instance to be wrapped.
 * @returns The wrapped API instance with SSR capabilities.
 */
export const ssrWrapper = (api: any) => {
  const cookie = cookies().toString();

  const instance = new api({
    Cookie: cookie,
  });

  return instance;
}