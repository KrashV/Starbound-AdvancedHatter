# Starbound-AdvancedHatter
Now supports [HasiboundLite](https://github.com/TheFurryDevil/hasiboundlite) by TheFurryDevil and [StarExtensions v1.5+](https://github.com/StarExtensions/StarExtensions) by kae. Requires QuickBar / Stardust Core Lite

# Installation
Download the [latest release](https://github.com/KrashV/Starbound-AdvancedHatter/releases) and place the .pak file in the /starbound/mods folder.

# Usage

## General usage
For general use of Advanced Hatter, just load the spritesheet or the emotes separately, spawn the item in game and enjoy.
The guide below described the functionality to integrate the sprite sheet into the character itself

## StarExtensions v1.5+ / Hasiboundlite
1. Navigate to the [Creation site](https://krashv.github.io/Starbound-AdvancedHatter/) and create the head item.
2. In /mods folder, create a new subfolder with a preferable name
2. Add the generated json file to the **/animatedhats** folder of the mod.

![pierre.json in the folder](https://i.imgur.com/OHeXwZ8.png)

3. Open QuickBar, find the **Head setter** and enter the name of the created file in the *only* textfield
4. Click the "Set head" button: the title of the pane should change accordingly.

![Hat successfully set](https://i.imgur.com/pveXEvN.png)

5. Relog into the game for the changes to set place *(or do /reload)*

## !Important!
The mod changes the facialHair and facialHairType of your characters to work. Keep that in mind.
