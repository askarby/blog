---
layout: post
title: "Automating things"
description: On automating things.
image: '/assets/img/2013/robot.jpg'
category: 'java'
test: 'scripting'
twitter_text: skarby.info blog post on automating things.
introduction: Lately, I’d been given a task of upgrading the Apache ServiceMix installation at work, and I must admit that the somewhat easy task of grabbing a binary, had been replaced with a “waiting game”.
published: true
published_date: 2013-02-03
---

Lately, I’d been given a task of upgrading the Apache ServiceMix installation at work, and I must admit that the somewhat easy task of grabbing a binary, had been replaced with a “waiting game”.

The Apache ServiceMix team didn’t (and still doesn’t) seem to be able to roll-out a new version of ServiceMix (and havn’t been able to do so for a long time). Let me correct that, they (as in the ServiceMix team) have kept things up to date, making minor releases (minor bug fixes), but not major updates, adding new versions of dependencies, fixing the issues we were facing. That’s why I decided to grab the parts we needed of the release and piece it together myself.

The used parts are basically limited to:

- Apache Karaf – The OSGi container part of ServiceMix
- ApacheMQ – The messaging queue part of ServiceMix, which is actually the reason for upgrading (we encountered a bug that kept KahaDB from reclaiming diskspace from queue caches / binary-log files).
- Apache Camel – The integration framework we use for integrating systems, which is a breeze to use, with it’s intuitive Java DSL, and testing framwork easing the task of testing routes within the JUnit testing framework.

Now, upgrading a Karaf installation is a breeze. It’s basically just grabbing a raw Karaf binary distribution, extracting it, adding a web-console (to ease the configuration steps) and configure-by-clicking until the container behaves as you desire.

But… (and let’s face it, there’s always a but)

We have 3 environments:

- A production environment
- A integration-testing environment
- A development environment (well, one per developer – so that would make 3+ environments)

Now, if I was an egoistical person I would choose the “easy way out” and follow the steps I just mentioned, but nope – I’m not like that. I love the concept of DRY (Don’t Repeat Yourself), so automating the installation and configuration process would ease the re-occuring task of setting up the various environments. This made my brain scream “Automate it, how hard can it be?”

If you’re a seasoned software developer (or even a “quasi”-seasoned developer) you would know that I’d more or less jinxed myself by thinking that (the “how hard can it be?” not the “automate it”-part).

I did accomplish the task, but with quite a few challenges – I won’t go into details of how it was done (at least not in this blog entry) . I’ll focus on the process of accomplishing the task and how-to ease the process of automating installations, if you should happen do the same.

## Investigate

Don’t start working on things that you havn’t investigated if are even possible. Scripting things may not be possible at all… fail fast – Google is your friend! (However, if you’re automating things on linux or unix, chances are that you’ll be able to automate basically anything – and things are improving with PowerShell on Windows). In case you’re interested… yes, Apache Camel does indeed allow for executing commands within its runtime from a scripting environment.

## You'll make mistakes

…everyone does, you’ll as well – this means that you should have a plan for reverting the changes.

1. Save your scripts in version control (I recommend git, but any will do), that way you can revert changes when you make a mistake.
2. Create your script on a PC  that won’t affect your productivity – that means: not your production environment (d’uh), not your testing environment, and not your development environment. Create your scripts in a virtual machine (VMWare or VirtualBox, it’s up to you) that way you can create snapshots and revert back your machine’s state when re-iterating executing steps from your script.

## Choice of language
What’s your target environment?

- **Windows-only?** Then use batch-scripting or PowerShell.
- **Unix/Linux-only?** Then use bash-scripting (or limit yourself to posix standard scripting, if you want to be portable across Linux and Unix).
- **Cross-platform?** Use tools that are truly cross-platform, since nobody wants to do their jobs twice (it’s all coming back to being DRY again) – a choice could be ant, groovy, ruby, python etc. or something completely different.

## Resumability (is that even a word?)

Touching upon the same point of reverting back to state as already touched upon (in the section of “using a virtual machine”): Make certain that you can resume your script, when you abruptly stop it (CTRL+C has a habit of becoming your best friend).

It can be a simple choice of accepting command line arguments, or reading from a log file? Which brings me to the next topic…

## What’s going on here?

When you write an application, you always log the state of your applications, right? (if you’re answering “no” to this question, you should start to do so). Since a script is an application (in my mind it is), you need to log what your script does  as well. Even more importantly that logging “what’s going on” you should also log “what’s supposed to happen”. That way you can determine if your requirements are being met. It’s entirely up to you to deside if you want to log to a file or to the console (whether that’s stdout or stderr).

“Exit codes” is another type of logging. Since you’ll rely heavily on those while determining if the commands executed, from within your script, are succesful, you should emit exit codes from your script as well. Remember that an 0 (zero)  is for indicating when things go well, while every other exit code indicates something went (terribly) wrong.

If you use exit codes wisely, you’ll be able to script interactions between your scripts.

## Summary

Someone said that preparation is half the work – if you consider the contents of this post, you’ll be of to a good start.
