# Team Activities App

This App enables teammates to propose some activities for the next team event as described in this tutorial:
[Team Activities App](https://docs.api.showpad.com/docs/appsv2/tutorials/team-activities-app)

It contains 3 extensions:

-   Admin settings: enables the admin to create the teams.
-   User settings: enables the user to select his team.
-   Experience: enables the user to propose some team activities.

It also uses 2 shared AppsDB stores to store the teams created by the admins and the activities created by the users.

## Develop

Install the dependencies: `npm i`

Each extension can be ran individually:

-   `npm run dev admin-settings`
-   `npm run dev user-settings`
-   `npm run dev experience`

## Build & Bundle

To build and bundle your App, run this command in the **root folder**: `npm run build && npm run bundle`

This generates a Showpad package you can upload to the Showpad platform 🚀
