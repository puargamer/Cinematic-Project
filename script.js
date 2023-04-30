class Intro extends Phaser.Scene{
    constructor() {
        super("intro");
    }

    preload() {
        this.load.image('amogus', './assets/images/amogus.png');
        this.load.audio('amongussound', './assets/audio/amongus.mp3');
    }

    create() {
        //load sprites
        let text = this.add.text(400, 300, "Suspicious Games");
        let amogus1 = this.add.sprite(-200, 300, 'amogus');
        let amogus2 = this.add.sprite(1000, 300, 'amogus');
        let amogus3 = this.add.sprite(400, -200, 'amogus');
        let amogus4 = this.add.sprite(300, 300, 'amogus');
        
        //settings
        amogus1.scale = amogus2.scale = amogus3.scale =  .25;
        amogus4.scale =.1;

        amogus1.angle = 90;
        amogus2.angle = -90;
        amogus3.angle = 180;

        amogus4.setAlpha(0);

        let sound = this.sound.add('amongussound', { loop: false });
        sound.play();

        //animation chain
        chain = this.tweens.chain({
            tweens: [
                {
                    targets: amogus1,
                    x: 25,
                },
                {
                    targets: amogus1,
                    x: -200,
                    delay: 1000
                },
                {
                    targets: amogus2,
                    x: 775
                },
                {
                    targets: amogus2,
                    x: 1000,
                    delay: 1000
                },
                {
                    targets: amogus3,
                    y: 25
                },
                {
                    targets: amogus3,
                    y: -200,
                    delay: 1000
                },
                {
                    targets: amogus4,
                    alpha: 1
                }
            ]
        })

        this.input.once('pointerdown', () => {
            this.scene.start('loadingscreen');
        });
    }
}

class LoadingScreen extends Phaser.Scene{
    constructor() {
        super("loadingscreen");
    }

    preload() {

    }

    create() {
        this.add.text(20,20, "loading");
    
        this.input.once('pointerdown', () => {
            this.scene.start('title');
        });

    }
}

class Title extends Phaser.Scene{
    constructor() {
        super("title");
    }

    preload () {

    }

    create() {
        this.add.text(30,30, "title");
    }
}

//config
let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    scene: [Intro, LoadingScreen, Title]
}

let game = new Phaser.Game(config);