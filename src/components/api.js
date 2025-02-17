const requestCardsUrl = "https://mesto.nomoreparties.co/v1/wff-cohort-31/cards";
const requestProfileUrl = "https://nomoreparties.co/v1/wff-cohort-31/users/me";
const headersConfig = {
  authorization: "8e63200c-4f89-4ed9-91de-2e19efedd1ca",
  "Content-Type": "application/json",
};

export async function fetchData(requestUrl, requestConfig) {
  const response = await fetch(requestUrl, requestConfig);
  if (response.ok) {
    return await response.json();
  } else {
    return await Promise.reject(response.status);
  }
}

export function getCardsData() {
  return fetchData(requestCardsUrl, {
    method: "GET",
    headers: headersConfig,
  });
}

export function getProfileData() {
  return fetchData(requestProfileUrl, {
    method: "GET",
    headers: headersConfig,
  });
}

export function sendUserData(name, description) {
  return fetchData(requestProfileUrl, {
    method: "PATCH",
    headers: headersConfig,
    body: JSON.stringify({
      name: name,
      about: description,
    }),
  });
}

export function sendNewAvatar(link) {
  return fetchData(`${requestProfileUrl}/avatar`, {
    method: "PATCH",
    headers: headersConfig,
    body: JSON.stringify({
      avatar: link,
    }),
  });
}

export function sendNewCardData(obj) {
  return fetchData(requestCardsUrl, {
    method: "POST",
    headers: headersConfig,
    body: JSON.stringify({
      name: obj.name,
      link: obj.link,
    }),
  });
}
export async function deleteCardData(cardId) {
  return fetchData(`${requestCardsUrl}/${cardId}`, {
    method: "DELETE",
    headers: headersConfig,
  });
}

export function sendLikesData(cardId) {
  return fetchData(`${requestCardsUrl}/likes/${cardId}`, {
    method: "PUT",
    headers: headersConfig,
  });
}

export function deleteLikesData(cardId) {
  return fetchData(`${requestCardsUrl}/likes/${cardId}`, {
    method: "DELETE",
    headers: headersConfig,
  });
}
