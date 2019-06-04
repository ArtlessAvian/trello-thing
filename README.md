# Story Points Based Automation of Trello
**(AKA Yet Another Redundant Productivity Tool)**

A Trello Powerup to determine a good amount of work to do each day.

Enough to meet each deadline, but
not so much as to overwork yourself.

## Setup
1) Enable the `callbacks` and `board-buttons` capabilities.
2) Set the "Iframe connector URL" to the Github Page for this repository.
3) Add to board.

## Usage
1) *Create categories* with labels with names containing `### Points`.
2) *List tasks* with cards.
3) *Estimate work* for cards using labels and due dates.
4) *Calculate velocity* by hitting the calculate button on the board.
5) *Mark completed points* by adding `### Points` somewhere in the description.

## Editing
1) Setup the powerup and board.
2) Host an http server serving this repository
    * Ex: `python -m http.server --bind 127.0.0.1`
    * The iframe will attempt to load the local sever's javascript before the hosted files.
