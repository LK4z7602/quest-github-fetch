import { baseUrl, reposQuantity } from "../variables.js";

async function getEvents(username) {
  const response = await fetch(`${baseUrl}/${username}/events?per_page=${reposQuantity}`);
  return await response.json();
}

export { getEvents }