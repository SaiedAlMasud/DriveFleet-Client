import { betterAuth } from "better-auth/minimal";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("drivefleet");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: { 
    enabled: true, 
  },
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 24 * 60 * 60, // 24 hours in seconds
    }
  },
  plugins: [
    jwt(),
  ]
});