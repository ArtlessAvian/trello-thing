// alert("Hello world!")

TrelloPowerUp.initialize({
    'board-buttons': function (t, opts) {
        return [
            {
                text: 'Today\'s Velocity',
                callback: onTodayButton,
                condition: 'edit'
            },
            {
                text: 'Instant Velocity',
                callback: onInstantButton,
                condition: 'edit'
            }
        ];
    }
});

trelloThingLoaded = "yo waddup";