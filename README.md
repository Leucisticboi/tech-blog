# Milo's Tech Blog

## Directory

[Overview](#overview)

[License](#license)

[Usage](#usage)

[References](#references)

[Deployed URL](#deployed-url)

## Overview

As a developer who writes about tech, I want a CMS-style blog site so that I can publish articles, blog posts, and my thoughts and opinions.

When you visit the site for the first time, then you are presented with a homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in.

## License
![MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

[LICENSE](./LICENSE)

## Usage
When you click on the homepage option, you will be taken to the homepage. When you click on any other links in the navigation, you will be prompted to either sign up or sign in. 

If you choose to sign up, you will be prompted to create a username and password. Once you click the sign up button then your credentials are saved and you are logged into the site. When you revisit the site at a later time and choose to sign in, you may use the same credentials.

Once you are signed into the site, you will see links for the homepage, the dashboard, and the option to log out. If you click the homepage option you will be taken to the homepage and presented with existing blog posts that include the post title and the date created. You may enter a comment on an existing blog post, and the post will be automatically updated to display the comment, along with the comment creator's username and the date created.

When you click on the dashboard option in the navigation, you will be taken to the dashboard and presented with any blog posts you have already created. You will also be presented with an option to create a new blog post. When you click on one of the pre-existing blog posts in your dashboard, you will then have the option to update or delete the post. If you are idle for more than 10 minutes then you will have to log back in again before you can add, update, comment on, or delete posts.

## References

For my CSS I chose MUI. I referenced [Example Blog Layout](https://www.muicss.com/docs/v1/example-layouts/blog) to create a basic layout/style. I also customized some of the CSS to look more fun and appealing. 

I referenced Heroku's documentation to debug deployment issues.
Git has a hard time updating filename casing, which led to a lot of issues with deploying this application. I updated all file names and paths, alonng with import/export statements so that casing was consistent across every file. 

## Deployed URL
[Milo's Tech Blog](https://milos-tech-blog-8d2ab6a0e819.herokuapp.com/)