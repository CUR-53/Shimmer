export function setCookie(name: string, value: string, minutes: number) {
  document.cookie = `${name}=${value};max-age=${minutes * 60};path=/`;
}

export function getCookie(name: string) {
  const cookies = document.cookie.split(';');
  const foundCookie = cookies.find((cookie) => {
    const [cookieName] = cookie.split('=');
    return cookieName.trim() === name;
  });
  return foundCookie?.split('=')[1];
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=;max-age=0;path=/`;
}
