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
        //let rock = this.add.sprite(400, 550, 'rock');
        let desk = this.add.sprite(50, 250, 'desk').setOrigin(0,0);
        desk.setPipeline('Light2D');
        let candle = this.add.sprite(615, 310, 'candle');
        candle.setPipeline('Light2D');
        let candle2 = this.add.image(150, 305, 'candle').setPipeline('Light2D');
        // let candle3 = this.add.image(400, 300, 'candle').setPipeline('Light2D');
        // candle3.setScale(0.8);
        //rock.setPipeline('Light2D');

        let light1 = this.lights.addLight (610, 260, 500, '0xFFFCBB').setIntensity(2);
        let light2 = this.lights.addLight (150, 250, 500, '0xFFFCBB').setIntensity(2);
        //let light3 = this.lights.addLight (400, 220, 500, '0xFFFCBB').setIntensity(2);
        this.lights.enable();
        this.lights.setAmbientColor('0x000000');

        // this.tweens.add({
        //     targets: light1,
        //     x: 612,
        //     y: 262,
        //     ease: "Elastic",
        //     yoyo: true,
        //     duration: 2000,
        //     repeat: -1
        // });
        this.tweens.add({
            targets: light2,
            x: 160,
            y: 240,
            ease: "ElasticOut",
            yoyo: true,
            duration: 2000,
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

        //let rock2 = this.add.image(450, 500, 'rock').setPipeline('Light2D');
        this.input.on('pointermove', function (pointer) {
            light1.x = pointer.x;
            light1.y = pointer.y - 40;
            candle.x = pointer.x;
            candle.y = pointer.y;
 
        });
    } 
}