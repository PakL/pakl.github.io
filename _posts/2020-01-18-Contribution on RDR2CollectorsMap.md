---
layout: post
title: Contribution on jeanropke's RDR2CollectorsMap
author: PakL
categories: [Development]
---
Hello friends!

I recently got involved in creating a path finding module for a companion website, that helps you find hidden objects in Red Dead Redemption 2 Online.
For that the roads had to be traced and a GeoJSON object had to be created. After that I looked into using [`geojson-path-finder`](https://github.com/perliedman/geojson-path-finder) to find a good route between objects that doesn't take to long.
To solve that I'm sorting the objects into groups and only calculate the closest item inside those groups to improve performance.

Go check it out at [jeanropke.github.io/RDR2CollectorsMap](<https://jeanropke.github.io/RDR2CollectorsMap/>).