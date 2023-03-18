import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

import { CmsApi } from '@/api/cms-api';
import { ERROR_TOKEN, ROUTES } from '@/constant';

const handleRefreshToken = async (token: JWT) => {
  try {
    const tokenData = await CmsApi.refreshToken({
      refresh_token: token.refreshToken,
    });

    console.log('refresh token here:', tokenData);

    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expiresIn: accessTokenExpires,
    } = tokenData.data;
    // const accessTokenExpirationTime =
    //   (jwt_decode<JwtPayload>(accessToken).exp as number) * 1000 - 10;
    return {
      ...token,
      accessToken,
      accessTokenExpires,
      refreshToken: refreshToken ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log('error', error);

    return {
      ...token,
      error: ERROR_TOKEN,
    };
  }
};

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@domain.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          //login
          if (!credentials) {
            return null;
          }
          const res = await CmsApi.login({
            email: credentials.email,
            password: credentials.password,
            requestFrom: 'CMS',
          });

          if (res) {
            const {
              access_token: accessToken,
              refresh_token: refreshToken,
              expiresIn: accessTokenExpires,
            } = res.data.token; //We get the access token and the refresh token from the data object.

            // const accessTokenExpirationTime =
            //   (jwt_decode<JwtPayload>(accessToken).exp as number) * 1000 - 10;
            //minus 10 seconds before expiration time to prevent token expiration error in the browser side unit ms

            return {
              ...res.data.user,
              accessToken,
              accessTokenExpires,
              refreshToken,
            };
            //return new object user contain token
          }
          return null; //if the data is null, return null
        } catch (e: any) {
          console.log('error:', e);

          throw new Error(e.response.data.message); //if the server response is an error, throw an error with the message from the server
        }
      },
    }),
  ],
  callbacks: {
    //The jwt() callback is called when a new token is created.
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          user,
        };
      }

      const accessToken: any = token?.accessTokenExpires;
      const expirationTime = accessToken.exp * 1000;
      const currentTime = Date.now();

      if (expirationTime && expirationTime - currentTime > 30 * 60 * 1000) {
        // Token is still valid, just return it
        return token;
      }

      // Token has expired or will expire in the next 30 minutes, refresh it
      const refreshedToken = await handleRefreshToken(token);
      return refreshedToken;
    },
    //The session() callback is called when a user logs in or log out
    async session({ session, token }) {
      if (session) {
        return {
          ...session,
          token,
        };
      }
      return session;
    },
  },
  //The signIn page is the page that the user is redirected to when they are not logged in.
  pages: {
    signIn: ROUTES.LOGIN,
  },
});
