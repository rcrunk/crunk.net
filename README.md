crunk.net
=========

Demo
----
The demo is the live site: http://www.crunk.net/

Description
-----------
Source to crunk.net

This site has been around since the mid to late 90s. Originally as a vanity site, it had some jokes, book and movie
reviews, political quotes and observations, and links to other things I found interesting. It was hosted on a machine
running in my home.

Sometime in 2006 or thereabouts, I decided the performance was lousy for visitors, my machine was getting long
in the tooth, and I was spending more on a static IP than I felt proper. At this point I switched to a cable modem
and hosted my websites on a virtual machine in the cloud. I saved money and got much better internet performance,
both in terms of a consumer and publisher. This evolution also prompted a refresh to crunk.net, where I tossed the
stale content, and went for minimalist approach with the ability to theme; also gave me an opportunity to play with
some CSS.

That was the origin of the site as it is today.

The initial implementation used Ruby on Rails (RoR) in the backend to cycle through the styles, loading a new page with
a different style sheet on each "here" click.  Somewhere circa 2011, I switched to a different hosting provider, and
found that my RoR's implementation didn't work on the latest version. At this point I ditched RoR (as it was overkill
anyway), and reimplemented using JavaScript which allowed the site to be completely static.

Fast forward to today (2015), CSS and client side technologies have advanced, mobile devices have become ubiquitous,
and crunk.net finally received a long overdue refresh. The changes include, but are not limited to:

* Mobile friendly (as deemed by: https://www.google.com/webmasters/tools/mobile-friendly/?url=www.crunk.net)
* Now a single page application.
* Responsive (leverage Bootstrap: http://getbootstrap.com)
* Leverage recent (and not so recent) capabilities of CSS; no longer are images for the logos, they are all
done now using CSS.
* All JavaScript rewritten in Dart/Angular.
* Google fonts.
* Social media tags for sharing on FB, G+, Twitter, ...
* Select favorite style page now switches styles immediately on selection of a style.
* Use local storage instead of cookies to maintain persistent state.
* CSS spinners appear when switching styles.

The one thing that has not undergone any significant change is the basic look (other than swapping styles Erozay
and Ivefay). This is not for any particular affinity or visual appeal for any of the existing styles, but rather 
for the challenge of transforming a pure desktop web client into a responsive client that works reasonably well
across different devices and different dimensions of screen real estate. If I were to have redone it using a clean
slate, it is likely that the look would be significantly different; perhaps I'll add a few other themes at some
point (you might be skeptical...).

Dependencies
------------
0. The code itself. Use git to clone or one of the other methods described at https://github.com/rcrunk/crunk.net.
0. Node and Node Package Manager (npm) (see: https://docs.npmjs.com/getting-started/installing-node 
or https://nodejs.org/download/). Do not proceed unless `npm -version` prints a version.
0. Dart SDK (see: https://www.dartlang.org/downloads). This will vary depending on your OS. Do not proceed unless
`pub help` prints a help message.
0. Bower: `npm install -g bower`; if on a *nix derived system, will need to be root or precede command with `sudo `.
0. Gulp: `npm install -g gulp`;  if on a *nix derived system, will need to be root or precede command with `sudo `.
0. Less: `npm install -g less`;  if on a *nix derived system, will need to be root or precede command with `sudo `.

Building
--------
All of the following commands are entered from the top level directory that was checked out or cloned. A directory
listing should show this file (README.md), package.json, bower.json, and gulpfile.js. 
None of the following steps require root permissions.

0. Pull npm locally managed dependencies: `npm install`.
0. Build and optimize: `gulp dist`; at the completion, the output will be in the dist folder.

Developing
----------
One can use their favorite editor or IDE to modify the code.  
Use `gulp watch` to create the development environment and watch for any code modifications you make.  
To see in browser, navigate to http://localhost:8080; a simple reload will refresh with any changes that you make.

Feedback
--------
If you have any feedback or suggestions, please feel free to do so by creating a new issue at
https://github.com/rcrunk/crunk.net/issues. 


Enjoy!

Mr. Crunk