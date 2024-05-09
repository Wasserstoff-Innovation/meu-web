import { getURLWithQueryParams } from "./twitter";

const LinkedIn_AUTH_URL = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&";
const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID as string;
const frontendURL = import.meta.env.VITE_FRONTEND_URL as string;
const state = import.meta.env.VITE_CSRF_TOKEN;

export const getLinkedinOAuthUrl = () =>
  getURLWithQueryParams(LinkedIn_AUTH_URL, {
    response_type: "code",
    client_id: clientId,
    redirect_uri: `${frontendURL}/auth/linkedin/callback`,
    state: state,
    scope: "openid profile w_member_social email",
  });
