// alert("Hello world!")

TrelloPowerUp.initialize({
    'board-buttons': function (t, opts) {
        return [{
            text: 'Recalculate',
            callback: onRecalculateBtn,
            condition: 'edit'
        }];
    }
});