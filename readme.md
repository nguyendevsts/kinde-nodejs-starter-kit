# Kinde NodeJS Starter Kit - Express.JS

## Register an account on Kinde

To get started set up an account on [Kinde](https://app.kinde.com/register).

### Set your Callback and Logout URLs

1. In Kinde, go to **Settings** > **Applications** > **Backend app**.
2. Add your callback URLs in the relevant fields. For example:

    - Allowed callback URLs - for example, `https://localhost:3000/callback`
    > Important! This is required for your users to successfully log in to your app.
    - Allowed logout redirect URLs - for example, `https://localhost:3000`

3. Select **Save**.

## Setup your local environment

Clone this repo and install dependencies with `npm i`

Make a copy of `.env_sample` and name it simply `.env`. Set the following values from the Kinde `Settings -> Applications -> Backend app` page.

-   `KINDE_DOMAIN` - your Kinde domain - e.g. `https://your_kinde_domain.kinde.com`
-   `KINDE_CLIENT_ID` - you can find this on the **Backend app** page - e.g. `your_kinde_client_id`
-   `KINDE_CLIENT_SECRET` - you can find this on the **Backend app** page - e.g. `your_kinde_client_secret`
-   `KINDE_REDIRECT_URI` - your callback url, make sure this URL is under your allowed callback redirect URLs. - e.g. `http://localhost:3000/callback`
-   `KINDE_LOGOUT_REDIRECT_URI` - where you want users to be redirected to after logging out, make sure this URL is under your allowed logout redirect URLs. - e.g. `http://localhost:3000`

### Example

```
KINDE_DOMAIN=https://your_kinde_subdomain.kinde.com
KINDE_CLIENT_ID=yourId5romKind3
KINDE_CLIENT_SECRET=some5ecretFromappKey5pag3
KINDE_REDIRECT_URI=http://localhost:3000/callback
KINDE_LOGOUT_REDIRECT_URI=http://localhost:3000/
```
## Start the app

`npm start` and navigate to `http://localhost:3000`.

Click on `Sign up` and register your first user for your business! 🚀

Click on `Sign in` and login with your user to the app.
