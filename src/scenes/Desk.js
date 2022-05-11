class Desk extends Phaser.Scene {
    constructor() {
        super('deskscene');
    }

    preload() {
        this.load.image('rock', './assets/singleRock.png');
        this.load.image('candle', './assets/candle.png');
        this.load.image('desk', './assets/desk_test.png');
    }

    create() {
        // Testing Lighting
        let rock = this.add.sprite(825, 475, 'rock').setDepth(1);   // setDepth controls the layer
        rock.setPipeline('Light2D');
        let desk = this.add.sprite(50, 250, 'desk').setOrigin(0,0).setPipeline('Light2D');  // setPipeline('Light2D') allows dynamic lighting
        let candle = this.add.sprite(615, 310, 'candle').setPipeline('Light2D').setDepth(2);
        let candle2 = this.add.image(150, 305, 'candle').setPipeline('Light2D');
        let candle3 = this.add.image(400, 300, 'candle').setPipeline('Light2D').setScale(0.8);
       
        // setting up lights
        let light1 = this.lights.addLight (200, 300, 500, '0xFFFCBB').setIntensity(0.5);
        let light2 = this.lights.addLight (150, 260, 1000, '0xFFFCBB').setIntensity(1.2);
        let light3 = this.lights.addLight (400, 220, 500, '0xFFFCBB').setIntensity(2);

        this.lights.enable();   // allows for dynamic lighting in the scene
        this.lights.setAmbientColor('0x555555');    // sets the scene's overall light (0x000000) == black/darkness

        // some tweens to play with lights
        this.tweens.add({
            targets: light1,
            x: 150,
            y: 260,
            ease: "ElasticInOut",
            yoyo: true,
            duration: 2000,
            repeat: -1
        });
        this.tweens.add({
            targets: light2,
            x: 155,
            y: 240,
            ease: "SineInOut",
            yoyo: true,
            duration: 1000,
            repeat: -1
        });
        // this.tweens.add({
        //     targets: light3,
        //     x: 402,
        //     y: 222,
        //     ease: "Elastic",
        //     yoyo: true,
        //     duration: 5000,
        //     repeat: -1
        // });

        // let rock2 = this.add.image(450, 500, 'rock').setPipeline('Light2D');

        // make a candle and light fixed to cursor
        this.input.on('pointermove', function (pointer) {
            light3.x = pointer.x;
            light3.y = pointer.y - 40;
            candle.x = pointer.x;
            candle.y = pointer.y;
 
        });

        
        let text = this.add.text(100, 100, 'Press (SPACE) to change to bookscene', textConfig).setDepth(5);
        //text.setPipeline('Light2D');

        // define key1
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    } 

    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('bookscene');
        }
    }
}