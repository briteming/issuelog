# gitblog

> A blog based on github issues, built with vuejs

## install

``` bash
# clone

git clone git@github.com:housne/issuelog.git

# install dependencies
npm install

# build for production with minification
npm run build
```

## setup

### repository config

Edit `/src/config/repository.js` file, replace `owner` and `repo` property with your own.

### site cofig

Edit `/src/config/repository.js` file with your site infomation.

### github token

Due to Github api rate Limiting, for unauthenticated requests, the rate limit allows you to make up to 60 requests per hour. But for requests using Basic Authentication or OAuth, you can make up to 5,000 requests per hour. So we will generate a personal access tokens with public permission only. Of course if  you don't need this, then skip it.

Go to [Github](https://github.com) -> `settings` -> `Personal access tokens` -> `Generate new token`

****DO NOT select any scopes**

Then replace the token with your new token.

Then you can start blogging with your Github repo's issues.


## development

`npm run dev`


