import { createDirectus, staticToken } from "@directus/sdk";

// const client = createDirectus(`${process.env.NEXT_PUBLIC_API_URL}`);

const client = createDirectus(process.env.NEXT_PUBLIC_API_URL as string).with(
  staticToken(process.env.ADMIN_TOKEN as string)
);

export default client;
