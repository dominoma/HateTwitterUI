# HateTwitterUI

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3001
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# start from terminal
$ nohup npm run start &
$ jobs -l # use job id from the job you started for the next command
$ disown <job-id>
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

Note: Node >= 12 is required!

## Change REST-API endpoint url

If you move the REST-server to a different url you have to change the url in the `base` variable in `rest/index.ts` to the according url.
Then you have to rebuild the project.

## Change webpage suburl

This project is currently built to run in the `/twitter-analysis/` subpath. If you want to change that you have to change the `router.base` property in `nuxt.config.ts` and rebuild the project.

Note: If the server is not reachable, try setting the `router.base: ''` after building the server and restart (not rebuild!) the server.

## Change host and port

If you want to change the host (or the port) the server is running you have to change the according values in `nuxt.config.ts` (`server` key) and restart the project.