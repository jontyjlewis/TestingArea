let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    pixelArt: true,
    zoom: 1,
    scene: [Desk, Book]
}

let textConfig = {
    // fontFamily: 'Bahnschrift Light',
    fontFamily: 'Century Gothic',
    fontSize: '14px',
    color: '#FFFFFF',
    align: 'left',
    wordWrap: {
        width: 200
    }
}

let game = new Phaser.Game(config);

// reserve keybinds
let key1, keySPACE;
