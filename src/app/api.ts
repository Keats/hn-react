const BASE_URL = "https://hacker-news.firebaseio.com/v0/";

export async function getItem<T>(id: number): Promise<T> {
  return fetch(`${BASE_URL}item/${id}.json`)
    .then((response) => response.json());
}

export async function getTopStories(): Promise<Array<number>> {
  return fetch(`${BASE_URL}topstories.json`)
    .then((response) => response.json());
}
