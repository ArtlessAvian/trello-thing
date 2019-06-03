// alert("Hello world!")

TrelloPowerUp.initialize({
    'board-buttons': function (t, opts) {
        return [{
            text: 'Today\'s Velocity',
            callback: onTodayBtn,
            condition: 'edit'
        }];
    }
});

trelloThingLoaded = "yo waddup";