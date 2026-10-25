---
title: Is accessibility permission safe for a focus app?
description: Android's Accessibility permission is powerful, so ask what an app uses it for. Here is what it can do, what to check, and how to switch it off.
published: 2026-10-25
keywords: accessibility permission android focus app, is accessibility service safe, android accessibility permission, focus app accessibility service, app blocker permission
---

Android's Accessibility permission is powerful, so it is only safe to give to an app you trust that has a clear reason to ask. Some focus apps use it to see which app is in front, so they can tell when you have wandered off to something else. Before you say yes, check what the app says it does with it, who made it, and that you can switch it off again.

This guide explains what the permission is, why focus apps ask for it, and a short checklist for deciding.

## What is Android's Accessibility permission?

The Accessibility permission lets an app run as an accessibility service: a background app that is allowed to look at what is on screen and act on your behalf. Android's developer documentation describes an accessibility service as "an app that enhances the user interface to assist users with disabilities", and says these services "run in the background and communicate with the system to inspect screen content and interact with apps on the user's behalf" ([Android Developers](https://developer.android.com/guide/topics/ui/accessibility/service)).

That is why screen readers and similar assistive tools need it. It is also why you should not hand it out casually: what a service *can* technically do is broad, even if a given app only uses a sliver of it.

You turn it on yourself, in Android's Accessibility settings. The exact menu names vary by phone maker.

## Why do some focus apps ask for it?

Some focus apps need to know when you leave them during a session. On Android, one way to find out which app is in front is an accessibility service. Android's documentation itself calls an accessibility service "a specialized tool", so a fair question is whether the app really needs it.

The honest test is not "does it ask?" but "does it explain, and does it use only what it needs?"

## How does Pets on Focus use it?

Pets on Focus, a focus timer and Pomodoro app for Android, iPhone and iPad, with a pet who keeps you company, uses the Accessibility Service on Android for one job: noticing which app is in front.

- If you leave the app for more than 10 seconds during a session, the session ends without a reward. A notification arrives the moment you leave. Come back within 10 seconds and nothing happens.
- It does not read the screen, what you type or your messages.
- Nothing it sees leaves the phone.
- You can turn it off in Android settings at any time.
- It is not an app blocker. It does not stop you opening other apps; it only notices that you left.

If you would rather not grant it, that is a fair choice, and you can leave it off.

## A checklist before you grant Accessibility permission to any app

Run through these five questions. If an app fails one, say no.

1. **Does it say why it needs the permission?** A clear plain-language reason, before you reach the settings screen, is a good sign. Silence is not.
2. **Does the reason match the app?** A focus timer noticing which app is open makes sense. A wallpaper app asking for the same thing does not.
3. **Does it say what it does not do?** Look for statements about not reading the screen, your typing or your messages, and about data staying on the phone.
4. **Can you turn it off?** You should be able to revoke it in Android settings, and the app should still open without it.
5. **Do you know who made it?** Prefer apps from a developer with a real website and a privacy policy you can read.

Also worth doing now and then: open your Accessibility settings and switch off anything you no longer use. Fewer services with broad access is simply a smaller thing to worry about.

## What if you want to stay off your phone but don't want to give any permission?

You have options that need no special access:

- Put the phone out of reach, or in another room.
- Silence notifications for the length of a session.
- Use a plain timer and accept that it will not notice if you leave.

[How to stop checking your phone while studying](/guides/how-to-stop-checking-your-phone-while-studying/) covers these setups in detail. The trade-off is simple: an app that notices you left gives a gentle nudge, while a plain timer relies on your own habits.

<!-- cta -->

## How do you turn the permission off?

Open your phone's Settings, find the Accessibility section (it is sometimes under "Additional settings" or "System"), open the list of installed services, pick the app and switch it off. The wording differs between Android versions and phone makers, but it is always in that same area. Once it is off, a focus app that relied on it will no longer notice when you leave, but a timer should still run.

## Where does a focus timer fit in?

A focus timer works best when leaving it costs you something small and gentle. In Pets on Focus, leaving ends the session without a reward, and the pet is a little disappointed, never punished. If you are choosing session lengths, [how long should a focus session be?](/guides/how-long-should-a-focus-session-be/) can help, and the [Pomodoro technique for studying](/guides/pomodoro-technique-for-studying/) shows a rhythm of work and breaks. If streaks motivate you, [how to build a study streak](/guides/how-to-build-a-study-streak/) is the next read.

## Common questions

### Is Android Accessibility permission dangerous?

It is powerful, because accessibility services can inspect screen content and interact with apps for you. Grant it only to apps you trust that explain clearly why they need it, and switch it off for anything you no longer use.

### Can a focus app read my messages through Accessibility?

A service with this permission can technically see a great deal, so it depends on the app. Look for a clear statement from the developer. Pets on Focus says it does not read the screen, what you type or messages, and uses the permission only to see which app is in front.

### Can I use a focus app without Accessibility permission?

That depends on the app. A plain timer needs no special access, but it cannot tell when you leave. Whether a particular app still works without the permission is best checked in its own description.

## In short

- Accessibility permission is powerful; trust, purpose and an off switch matter more than the permission itself.
- Pets on Focus uses it only to see which app is in front, and ends a session without a reward if you leave for more than 10 seconds.
- Check why the app asks, whether it says what it does not do, and whether you can turn it off.
- You can always focus without it, with a plain timer and a phone out of reach.
