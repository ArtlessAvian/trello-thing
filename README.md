# Story Points Based Automation of Trello
**(AKA Yet Another Redundant Productivity Tool)**

A Trello Powerup to determine how much work to do each day.

Enough to meet each deadline, but
not so much as to overwork yourself.

## Deployment
1) Host an http server serving this repository
    * Easily done with `python -m http.server --bind 127.0.0.1`
    * This will probably be unnecesary once testing is actually done.
2) Make a powerup for a team
    * Enable the `callbacks` and `board-buttons` capabilities.
    * Set the "Iframe connector URL" to the Github Page for this repository.
3) Add to a Trello board.

## Usage
1) *Create categories* with labels with names containing `### Points`.
2) *List tasks* with cards.
3) *Estimate work* for cards using labels and due dates.
4) *Calculate velocity* by hitting the calculate button on the board.
5) *Mark completed points* by adding `### Points` somewhere in the description.
