---
title: "Adventures in de-Googling"
description: "My successes and failures in trying to de-emphasize Google's presence in my life."
---

## Why

[Killed by Google](https://killedbygoogle.com/) should be reason enough to want to keep my reliance on Google to a minimum. In short, they have a terrible track record with killing off popular products, and they own too much data about all of us.

## Perspective

I run Windows 10, macOS, and Android on the various computers I own. I need solutions that work well with all three of those operating systems. Web solutions are great for Windows and macOS usually, but native apps tend to be a must for Android.

## Google Search

I already knew what it was like to remove Google Search from my life. For a year I used Bing, partially as an experiment, and partially because Microsoft literally gave you money (rewards points) for doing so.

Yes, Google still has the best results overall. Yes, I still search on Google sometimes. But overall, I'm perfectly happy searching for things on DuckDuckGo. And frankly, I'm often happier. DuckDuckGo respects my privacy _and_ has a better user interface.

Switching to **DuckDuckGo** has been painless and totally worth it.

## Gmail + Google Calendar

I thought this was gonna be the hardest thing to replace. And in a sense, it is. After all, I'm still using Gmail every day, sort of. I switched to Fastmail, which has an excellent and easy to use integration for Gmail and other popular providers. I was able to sync all of my contacts and emails over in about a day. It went _really_ fast considering how much data I have.

I have Fastmail connected to my Gmail so I can see the few Gmail emails that come through, and reply to them. It is tedious to update your accounts to use a new email address, but basically every service already has to support this.

The UI is cleaner and leaner than Google's, and it's not missing any significant Mail + Contacts + Calendar features, as far as I can tell.

I am loving **Fastmail**.

## Google Chrome

I was a diehard Firefox user and it took me at least a year to switch to Chrome after it finally came out for Linux (my main operating system at the time).

Sadly, Firefox lagged behind Chrome in features and importantly _speed_ for quite a long time. These days, the performance gap is not nearly so wide. And I actually like the user interface of Firefox far better. I also feel more comfortable trusting Firefox with my browsing data than I do Google.

The Android version of Firefox is definitely lacking in polish a bit, but unlike Chrome for Android, you can use an adblocker! Ad Blocking plus automatic bookmark sync with my desktop browser make it an easy pick.

I strongly recommend **Firefox**.

## Google Hangouts

This was an easy one for me. I hate using Google Hangouts for any purpose whatsoever. For large group chats, as well as voice/video conversations, Discord is an easy win for me. I actually prefer it to Slack too for communities.

Many of my close friends are also on LINE, an end-to-end encrypted instant messaging app made in Tokyo. It features custom themes and "stickers" that you can purchase with real money. Not only is this a great way to support niche artists, but it's super fun to customize the appearance and send stickers. The Windows 10 and macOS clients work well too, but there's a bizarre restriction of only being able to be signed in to one phone and one desktop app at a time. As someone who juggles three computers, this can be a bit annoying.

I strongly recommend **Discord** for most chat needs, as well as **LINE** if you're looking for something cute, or if you value encryption.

## Google Keyboard

I chose SwiftKey, now owned by Microsoft. I tried several keyboards, but this was the only one that worked well for both English _and_ Japanese input. In fact, I found that SwiftKey allows you to switch languages more quickly, and is incredibly superior to Google Keyboard at correcting typos in Japanese.

I don't know what Microsoft is doing with your typing data, but I'm sure they had some reason to buy SwiftKey.

My only real complaint is the SwiftKey themes overall do not look good compared to Google Keyboard.

**SwiftKey** has actually made me type faster and more accurately on my phone. I recommend it 100%.

## Google Translate

I essentially have put no effort into trying to migrate off of Google Translate. I am trying to use "Japanese", a Japanese/English dictionary app for Android instead. As well as the amazing [Jisho.org](https://jisho.org/) on my desktop. These are not the same as automated translation services obviously, but they have been useful.

I am still using **Google Translate**.

## Google Maps

This doesn't even seem worth solving at the moment to me. I guess some people use Apple Maps, but I have an Android phone, so that's not possible.

I am still using **Google Maps**.

## Google Drive

I switched to Dropbox for a while. This wasn't too bad, really. I installed both Dropbox and Google Drive on my computer, then started moving folders from one to the other.

Since then I've also tried [Sync.com](https://sync.com/) which I can't recommend due to poor Windows/macOS/Android apps, despite the awesome inclusion of fully encrypted data.

I am still trying to figure out what I want to do here. I ended up buying a [Synology NAS](https://www.synology.com/en-us/products/DS220+) with 4 TB of storage. It works great over SMB so far from my Windows PC. I haven't really tested it much from my MacBook Pro computers so far. Sadly, the Android apps seem kinda mediocre so far.

There is the huge plus of owning all my own data, but now I'm left with the fear that even though I'm using RAID 1 mirroring, I could lose all my personal data at once if something bad happened to my NAS. So now I'm contemplating long term cloud storage backup via [Backblaze B2](https://www.backblaze.com/b2/cloud-storage.html). The pricing is great since they optimize for long term storage, not frequent access.

I am leaning towards using my new **Synology NAS** for storage, and possibly cloud backup in the future. But I am very disappointed with the quality of the Android apps so far.

Edit: I am switching back to **Dropbox** because it works well, it is the primary product of a major company, and I already have a year subscription pre-paid.

## Google Photos

One of the big reasons I chose a Synology NAS for file storage is their Moments app. Moments looks very much like a clone of Google Photos, which is a great thing. I love Google Photos dearly. Even as they continue to degrade the UI, as Google always does, it's still a speedy and fantastic product.

Getting my data _out of_ Google Photos using Google Takeout was a nightmare. I had over 400 GB of photos and videos. I had Google export this data into 2 GB zip files in my Dropbox folder. I synced all of these to my 1 TB hard drive, and wrote a script that would take each zip, extract it, and organize its photos by timestamp.

This required several hours of computation, and hours of script writing and debugging. Not something any normal user should have to do. Perhaps there are specialized tools that could copy your Google Photos data with less fuss to another service.

Anyway, I loaded all 400+ GB of data into Moments on my Synology NAS and... it took days to make all the thumbnails. That's fine, I guess. It's just a low power PC that sits in the corner of my room. And that's not gonna happen every day.

I have had a few issues with it though:

- At one point, all file uploads and deletions did not work. No HTTP status codes, no error messages, and I couldn't even find logs after SSH'ing into the machine. How did I fix it? I uninstalled the Moments app and reinstalled it. Thankfully this did **not** delete the thumbnail database. This _might_ be my fault? I had been playing around over SSH, and perhaps I messed up some file permissions. Who knows.

- The Android app for Moments only sync photos while in the foreground. I shouldn't have to make it a chore to sync my photos. Plenty of Android apps can do background syncing via showing a notification so the operating system doesn't kill the process.

- Every photo that didn't have timestamp data (e.g. screenshots, photos I've downloaded from Twitter) showed up as being created on November 15, 2020. I have no idea why. My NAS wasn't deven delivered until November 25, so I have no idea why Moments picked November 15. My Google Takeout download was completed on November 13. Perhaps November 15 was the date I extracted all my data from the Google Takeout zip files. Anyway, it's annoying to have a large block of photos all in the wrong date near the top of the app.

- No easy bulk selection. I lost all of my photo album metadata, which is a huge bummer. I wanted to recreate albums from past trips, but there's no easy way to select a large amount of photos and add them to an album all at once. The best you can do is click each photo one at a time. Google Photos lets you shift-click to select a range. This is a must for handling bulk data.

I was unhappy with having hundreds of gigabytes of data locked behind Google Photos, but it has been extraordinarily difficult migrating my data elsewhere, and it has come at the cost of a good user experience.

I honestly don't know **what** I'm even going to do here. I'm writing this blog post half out of exasperation. Ideally, I will iron out my issues with Moments on my Synology NAS and keep using that, but we'll see.

The temptation to go back to using Google Photos is strong at this point.

**Edit:** I have gone back to Google Photos. It is really good.

## Thoughts

I've spent an extraordinary amount of energy trying to figure out how to de-Google myself, so I hope this summary has been useful. My number one takeaway has to be **please use Fastmail**. It's so great. And it's shockingly painless due to their amazing onboarding experience. Give it a shot.
