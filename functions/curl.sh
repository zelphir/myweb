#!/usr/bin/env bash

source ../.env

URL=${1:-http://localhost:8010/myweb-195810/us-central1/instagram}

curl \
  -X POST \
  -H "Content-Type:application/json" \
  -H "X-Client-ID: $X_CLIENT_ID" \
  $URL \
  -d '{"tags": "lions,travel,naturephoto,etoshanationalpark,nature,wildlife,naturephotography,blackandwhitephotography,cats,lion,africa,natgeotravel,namibia,blackandwhitephoto,instanature,instatravel,picoftheday,cat,natgeo,natureonly,travelphotography,fujifilmxpro2,visitnamibia,etosha,lionsafari,naturelovers,nationalgeographic,pictureoftheday,wildlifephotography", "imageUrl": "https://scontent.cdninstagram.com/vp/93c7f4c9d16bc9d94e5cdc02b83bfd18/5B03E4D9/t51.2885-15/s640x640/sh0.08/e35/27576340_169406057019211_1177915787613044736_n.jpg", "caption": "A lion in London 🇳🇦 #africa #namibia #visitnamibia #etoshanationalpark #etosha #wildlife #nature #naturephotography #naturephoto #natureonly #naturelovers #instatravel #natgeotravel #natgeo #nationalgeographic #travel #travelphotography #pictureoftheday #picoftheday #instanature #lion #lions #cats #cat #wildlifephotography #lionsafari #fujifilmxpro2 #blackandwhitephotography #blackandwhitephoto", "link": "https://www.instagram.com/p/BfQu2W8hUo1/", "location": "Etosha National Park", "lat": "-19.2489223285", "lng": "15.9521484375", "date": "1518792401", "instagramId": "id1234"}'
