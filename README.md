# Team Activities App

This App enables teammates to propose some activities for the next team event as described in this tutorial:
[Team Activities App](https://docs.api.showpad.com/docs/appsv2/tutorials/advanced-team-activities)

It contains 3 extensions:

-   Admin settings: enables the admin to create the teams.
-   User settings: enables the user to select his team.
-   Experience: enables the user to propose some team activities.

It also uses 2 shared AppsDB stores to store the teams created by the admins and the activities created by the users.

## Develop

Install the dependencies: `npm i`

Each extension can be ran individually. In order to test your local changes please refer to these articles:

-   [Test your Admin Settings extension](https://docs.api.showpad.com/docs/appsv2/tutorials/advanced-team-activities#test-extension)
-   [Test your User Settings extension](https://docs.api.showpad.com/docs/appsv2/tutorials/advanced-team-activities#test-extension-1)
-   [Test your Experience Type extension](https://docs.api.showpad.com/docs/appsv2/tutorials/advanced-team-activities#test-extension-2)

## Build & Bundle

To build and bundle your App, run this command in the **root folder**: `npm run build && npm run bundle`

This generates a Showpad package you can upload to the Showpad platform 🚀
