class Intro extends Phaser.Scene{
    constructor() {
        super("intro");
    }

    preload() {
        this.load.image('amogus', './assets/images/amogus.png');
        this.load.audio('amongussound', './assets/audio/amongus.mp3');
    }

    create() {

        this.input.once('pointerdown', () => {
            this.scene.start('loadingscreen');
        });

        //create sprites
        let text = this.add.text(300, 280, "Suspicious Games", {font: "40px Georgia", color: "#eb4034"});
        let amogus1 = this.add.sprite(-200, 300, 'amogus');
        let amogus2 = this.add.sprite(1000, 300, 'amogus');
        let amogus3 = this.add.sprite(400, -200, 'amogus');
        let amogus4 = this.add.sprite(200, 300, 'amogus');
        
        //among us settings
        amogus1.scale = amogus2.scale = amogus3.scale =  .25;
        amogus4.scale =.1;

        amogus1.angle = 90;
        amogus2.angle = -90;
        amogus3.angle = 180;

        amogus4.setAlpha(0);

        //audio
        let sound = this.sound.add('amongussound', { loop: false });
        sound.play();

        //animation chain
        let chain = this.tweens.chain({
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

    }
}

class LoadingScreen extends Phaser.Scene{
    constructor() {
        super("loadingscreen");
    }

    preload() {
        this.load.image('stunfisk', './assets/images/stunfisk.png');
        this.load.image('fish', './assets/images/fish.png');
        this.load.audio('water', './assets/audio/water.mp3');


    }

    create() {

        this.input.once('pointerdown', () => {
            this.scene.start('title');
        });

        
        //background
        this.add.rectangle(400,300,800,600,0xa4c2f4);

        //create sprites
        
        this.add.text(500,500, "loading", {font: "40px Georgia", color: "#000000"});
        let fish1 = this.add.image(-200, 100, 'fish');
        let fish2 = this.add.image(-200, 250, 'fish');
        let fish3 = this.add.image(1000, 400, 'fish');
        let stunfisk = this.add.image(690, 525, 'stunfisk');

        //sprite settings
        fish1.scale = fish2.scale = fish3.scale = .1;
        fish3.flipX = true;
        stunfisk.scale = .05;

        //audio
        let sound = this.sound.add('water', { loop: false });
        sound.play();

        //fish animation chain
        let chain = this.tweens.chain({
            tweens: [
                {
                    targets: fish1,
                    x: 1000,
                    duration: 800
                },
                {
                    targets: fish2,
                    x: 1000,
                    duration: 800
                },
                {
                    targets: fish3,
                    x: -200,
                    duration: 800
                }
            ]
        })

        //loading
        this.add.tween({
            targets: stunfisk,
            angle: 360,
            repeat: -1,
            repeatDelay: 200
        })

        console.log("finished anim");
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