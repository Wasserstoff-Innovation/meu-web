export const AuthUrl = import.meta.env.VITE_AUTH_API_URL as string;
const clientId = import.meta.env.VITE_TWITTER_CLIENT_ID as string;
const redirectURI = import.meta.env.VITE_TWITTER_REDIRECT_URI as string;

export const TWITTER_STATE = "twitter-csrf-token";
const redirectURL = redirectURI;
const TWITTER_CODE_CHALLENGE = "challenge";
const TWITTER_AUTH_URL = "https://twitter.com/i/oauth2/authorize";
const TWITTER_SCOPE = ["tweet.read", "users.read", "offline.access"].join(" ");

export const getURLWithQueryParams = (
  baseUrl: string,
  params: Record<string, string | number | boolean>
) => {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  return `${baseUrl}?${query}`;
};
export const getTwitterOAuthUrl = () =>
  getURLWithQueryParams(TWITTER_AUTH_URL, {
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectURL,
    scope: TWITTER_SCOPE,
    state: TWITTER_STATE,
    code_challenge: TWITTER_CODE_CHALLENGE,
    code_challenge_method: "plain",
  });
