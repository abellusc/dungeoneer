# dungeoneer
A library to create your own text adventure game in the console with ease. Now you can create an adventure and others can play it using the `dungeoneer` command line tool. The entire thing runs in the command line, and even supports running inside a docker container environment if you want to run it in more of a sandboxed environment.

This library provides a number of easy to use classes and allows a developer to easily define logic and build out a world within the realm of the terminal window.

### Getting Started

To install the `dungeoneer` client, use the command `npm install -g dungeoneer`. Once you have this client installed, you can find plenty more adventures within the client and retrieve them separately. Adventures run in this client in the form of **plugins** which extend the dungeoneer engine and allow it to respond to events fired at run-time.

## License



## Player Guide

### Creating a Character
Some aspects of characters can be exported and moved between certain adventures, shared between adventures, etc. - an adventure creator may set the option that requires that a new character be created, or they may permit you to import an old character (or create a de-leveled copy of an existing character).

To create a new character, select the **Characters** option from the main menu and then select **Create Character** to enter the character creation wizard. Again, globally created characters are not always permitted by adventure settings, but may be allowed if the creator has enabled that feature.

### Importing a Character
Some adventures allow other characters to be imported that were used on other adventures. The rules on these types of imports vary from adventure to adventure and are usually stated in the initial splash screen for the adventure.

### Exporting a Character
Any character used in any adventure can be exported to a binary data file format which can be loaded by the client at any time.

## Developer Guide / API Documentation

Coming soon...
