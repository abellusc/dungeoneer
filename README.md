# dungeoneer
A library to create your own text adventure game in the console with ease. Now you can create an adventure and others can play it using the `dungeoneer` command line tool. The entire thing runs in the command line, and even supports running inside a docker container environment if you want to run it in more of a sandboxed environment.

This library provides a number of easy to use classes and allows a developer to easily define logic and build out a world within the realm of the terminal window.

This is a side project and is maaintained, but not frequently. Issues will be answered *eventually* (generally-speaking) but may not be answered timely. **Oof.**

**Current Status:** In Development

## Roadmap
1. Develop core library - in progress
2. Unit/integration test core library extensively
3. Develop example adventure - incomplete
4. Test example adventure for broken game states
5. ???
999. Release - planned for: whenever it's ready

### Getting Started

To install the `dungeoneer` client, use the command `npm install -g dungeoneer`. Once you have this client installed, you can find plenty more adventures within the client and retrieve them separately. Adventures run in this client in the form of **plugins** which extend the dungeoneer engine and allow it to respond to events fired at run-time.

## Player Guide

### Creating a Character
Some aspects of characters can be exported and moved between certain adventures, shared between adventures, etc. - an adventure creator may set the option that requires that a new character be created, or they may permit you to import an old character (or create a de-leveled copy of an existing character).

To create a new character, select the **Characters** option from the main menu and then select **Create Character** to enter the character creation wizard. Again, globally created characters are not always permitted by adventure settings, but may be allowed if the creator has enabled that feature.

### Importing a Character
Some adventures allow other characters to be imported that were used on other adventures. The rules on these types of imports vary from adventure to adventure and are usually stated in the initial splash screen for the adventure.

### Exporting a Character
Any character used in any adventure can be exported to a binary data file format which can be loaded by the client at any time.

## Developer Guide / API Documentation

*This part of the README is boring technical information... :(*

In general, if a module is not exported from the root of the dungeoneer package, it is to be considered an internal usage. Additionally, some public modules have internal functions that should never be called which are defined like: `__internal__functionname__(...): ...` (note the internal tag). Internal classes generally shouldn't be used except if you're modifying the library code.

### Plugins

You can create plugins using dungoneer as a base. Then, you can implement the dungeoneer story modules to create your own world, story, etc. which can then be loaded as an adventure in the game.

In general, plugins respond to different events when called by the game engine. The API can be used to create a whole adventure using the Quest API. As an example, the adventure **Quest for the Shadowbound Flame** is an implementation of the dungeoneer Quest API. Plugins can also, if permitted by the player (client-side), enable online content. Plugins are run in VM2 sandboxes for security purposes, but essentially run isolated javascript code which can **only** implement the following NPM modules:
* dungeoneer
* nodejs: fs, events

**Online Content Warning:** Third-party plugins may contain untrusted code. The library implements a **VM2 sandbox** which should generally be a secure sandbox, however be advised that any sandbox may have unknown vulnerabilities and whenever running untrusted or third-party adventures, understand that you are running javascript code on your machine which, if the sandbox can be broken out of, may gain elevated permissions if exploited. Dungeoneer disclaims and offers no warranty for these sorts of problems and may not be held responsible for the failure of the sandbox. This warning is displayed on the README and whenever a user is prompted to approve downloading a third-party service from a registry. By acknowledging this notice and continuing to use the software (in line with the definition of "use" in the license), you affirm that you understand and agree with this message.

### Libraries

You can create libraries of items, maps, creatures, etc. by extending the library or modifying the library via Pull Request. Either is acceptable, but generally-speaking content will only be accepted into the core library after it is extensively tested and in use in at least a couple user-made adventures using dungeoneer.

You can submit a pull request to modify the code in the core library if you improve it. Generally speaking, changing an interface requires a prior approval, as it would generally be a *breaking change* and has to be planned for. Otherwise, enhancements of existing algorithms and *better ways* of doing things are generally accepted. Anyone can contribute to this library if they wish to do so. I welcome any help with it because honestly I have no interest in maintaining an open-source library (but I released it because /shrug)