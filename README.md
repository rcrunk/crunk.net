crunk.net
=========

Source to crunk.net

This site has been around since the mid to late 90s. Originally as a vanity site, it had some jokes, book and movie
reviews, political quotes and observations, and links to other things I found interesting. It was hosted on a machine
running in my home.

Sometime in 2006 or thereabouts, I decided the performance was lousy for visitors, my machine was getting long
in the tooth, and I was spending more on a static IP than I felt proper. At this point I switched to a cable modem
and hosted my websites on a virtual machine at GoDaddy.com. I saved money and got much better internet performance,
both in terms of a consumer and producer. This evolution also prompted a refresh to crunk.net, where I tossed the
stale content, and went for minimalist approach with the ability to theme; also gave me an opportunity to play with
some CSS.

That was the origin of the site as it is today.

The initial implementation used Ruby on Rails (RoR) in the backend to cycle through the styles, loading a new page with
a different style sheet on each "here" click.  Somewhere circa 2011, I switched to a different hosting provider, and
found that my RoR's implementation didn't work on the latest version. At this point I ditched RoR (as it was overkill
anyway), and reimplemented using JavaScript which allowed the site to be completely static.

Fast forward to today (2015), CSS and client side technologies have advanced and mobile devices have become ubiquitous.


Mr. Crunk