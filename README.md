# Automatic Battlemap Board/Generator (hack-the-planet)

## Inspiration
Everyone in our group enjoys TTRPGs (tabletop roleplaying games), the most famous of which is Dungeons & Dragons. TTRPGs tend to involve a lot of labour on the part of the gamemaster (the person telling the story and running the game) in creating and drawing combat maps (grids on which the player characters and their enemies can be placed and moved around on the table). We wanted to build something that helped us spend less time designing/drawing combat maps and more time playing the game.

## What it does
There are 4 main components:
* The board: A board on which player tokens can be placed and moved around. Each square on the board lights up in one of 8 possible colours. The 7x7 map displayed can be interactively scrolled with a builtin joystick to move the map through a much larger area.
* The web interface: An interface that generates maps to be used with the board. The gamemaster can paste in a description of a room, and we use an LLM to generate a map with corresponding terrain types. The gamemaster can make their own tweaks with our editing interface, and then the map is uploaded to the board!

## How we built it
* The board: We designed the board and laser-cut it from clear acrylic at the Elko Engineering Garage.
* The LED grid: We designed a circuit that allowed individual colour control for each of the 49 RGB LEDs in the grid. The grid is controlled by an Arduino Mega.
* The web interface: We used a Django backend with a ReactJS frontend.
* The querying: We designed a system to prompt Google Gemini such that we could provide an example room description with supplementary information about tile colours and generate a new room map.

## Challenges we ran into
* Soldering! Constructing and soldering the LED grid together took almost 2 days...
* Hardware assembly! We had a lot of trouble keeping track of the wires and getting them and the Arduino positioned neatly inside the board.
* Hardware constraints! We ended up with two different types of RGB LEDs (some common-cathode and some common-anode), which meant our embedded Arduino code actually had to handle two disconnected grids that work very differently.
* Learning new frameworks! Our software team had little-to-no experience with Django or React, so we had to learn a lot to build the finished web interface.

## Accomplishments that we're proud of
* The laser-cut board - it took 4.5 hours to print out, but it *looks* fantastic - we're excited to use it at our table.
* Cable management - we had a lot of wires to keep track of, and we're proud of how well-organized they are - everything is colour-coded and organized in a grid as neat as it could get.
* Website design - we had a lot of fun with CSS to make our website thematic.
* Working across different specialties - we all have different backgrounds (one of our team members is from each of Electrical Engineering, Computer Engineering, Software Engineering, and Computing Science), and we were able to touch on each of our areas of expertise in this project (with some added laser-cutting).

## What we learned
* A lot of web stuff - how to set up and use Django and React, and how to send information between them.
* Soldering and hardware management - we've gotten a lot better at working with and organizing a lot of physical components.
* Don't solder in a poorly-ventilated basement for 12 hours straight!

## What's next for Automatic Battlemap Board/Generator (hack-the-planet)
* We'll be using the board and web interface we built for maps in our own games!
* In the future, we might print another board that uses hexagons instead of squares to use the same grid for TTRPGs that use hexagonal map systems (like Lancer).
