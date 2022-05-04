class Desk extends Phaser.Scene {
    constructor() {
        super('deskscene');
    }

    preload() {
        this.load.image('rock', './assets/singleRock.png');
    }

    create() {
        let rock = this.add.sprite(500, 300, 'rock');
        rock.setPipeline('Light2D');

        let light = this.lights.addLight (0, 0, 400, '0xFFFCBB').setIntensity(2);
        this.lights.enable();
        this.lights.setAmbientColor('0x555555');

        this.input.on('pointermove', function (pointer) {
            light.x = pointer.x;
            light.y = pointer.y;
        });

        this.add.image(400, 500, 'rock').setPipeline('Light2D');
    }
    
    update() {
        
    }
}