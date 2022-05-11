class Book extends Phaser.Scene {
    constructor() {
        super('bookscene');
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('cover', 'journalCover.png');
        this.load.image('page1-2', 'journal1-2.png');
        this.load.image('page3-4', 'journal3-4.png');
    }
    create() {
        this.add.text(100, 100, 'Press (SPACE) to change to deskscene', textConfig).setDepth(5);
        // define key
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        // *************************************************************************
        // Based off the SecretOfTheOoze Project from CMPM120 with Adam Smith UCSC Spring 2022
        // *************************************************************************

        // change bg color
        this.cameras.main.setBackgroundColor('#555555');

        // add book cover
        this.book = this.add.sprite(650, 350, 'cover').setScale(1.5);

        // creating book states as JSON object
        this.bookStates = [
            {
                'name': 'cover',
                'initial': true,
                'content1': '',
                'content2': '',
                'events': {
                    'open': 'page1-2'
                }
            },
            {
                'name': 'page1-2',
                'content1': 'TEXT HERE FOR PAGE 1',
                'content2': 'TEXT HERE FOR PAGE 2',
                'events': {
                    'forward': 'page3-4',
                    'close': 'cover'
                }
            },
            {
                'name': 'page3-4',
                'content1': 'TEXT HERE FOR PAGE 3 . . .' +
                ' WITH MOAR TEXT... huzzah!',
                'content2': 'TEXT HERE FOR PAGE 4 is just gonna ramble on for a bit in this long string where i doesnt really stop and it just keeps on going and going and well here we are',
                'events': {
                    'back': 'page1-2',
                    'close': 'cover'
                }
            },
        ];

        // define transition time
        this.transitionTime = 500;

        // create state machine on book object, passes JSON states object & target object
        this.book.bookFSM = new StateMachine(this.bookStates, this.book);

        // init transition flag
        this.transitioning = false;

        // display info text
        this.statusText = this.add.text(75, 475, `State: ${this.book.bookFSM.getState().name}`);
        this.content1Text = this.add.text(410, 210, `${this.book.bookFSM.getState().content1}`, textConfig);
        this.content2Text = this.add.text(690, 210, `${this.book.bookFSM.getState().content2}`, textConfig);
        this.transitionText = this.add.text(75, 500, ``);
        this.syncDisplayInfo();

        // ask for keydown events as they happen
        this.input.keyboard.on('keydown', this.keydown, this);
    }
    keydown(event) {
        // ignore keydown during transitions
        if(this.transitioning) {
            return;
        }

        // which event are they trying to enact?
        let index = Number.parseInt(event.key) - 1; // starts at 1
        let availableEvents = Object.keys(this.book.bookFSM.currentState.events);

        // we only have a few of them
        if(index >= availableEvents.length) {
            return;
        }
        let selectedEvent = availableEvents[index];

        // set a timer while transitioning
        this.transitioning = true;
        this.transitionText.text = `Turning to ${selectedEvent}...`;
        this.time.delayedCall(this.transitionTime, () => {
            this.transitioning = false;
            this.book.bookFSM.consumeEvent(selectedEvent);
            this.syncDisplayInfo();
        });
    }

    syncDisplayInfo() {
        this.book.setTexture(this.book.bookFSM.currentState.name);
        let options = Object.keys(this.book.bookFSM.currentState.events).map((k,i) => `(${i+1}) ${k}`);
        this.transitionText.text = `Actions: ${options.join(' ')}`;
        this.statusText.text = `State: ${this.book.bookFSM.currentState.name}`;
        this.content1Text.text = `${this.book.bookFSM.currentState.content1}`;
        this.content2Text.text = `${this.book.bookFSM.currentState.content2}`;
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('deskscene');
        }
    }
}