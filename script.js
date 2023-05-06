//extra scene to make user click Chrome window to enable in game audio
class Start extends Phaser.Scene{
    constructor() {
        super("start");
    }

    create() {
        this.input.once('pointerdown', () => {
            this.scene.start('intro');
        });

        this.add.text(400,300, "click to start", {font: "40px Georgia"}).setOrigin(0.5);
    }
}

class Intro extends Phaser.Scene{
    constructor() {
        super("intro");
    }

    preload() {
        this.load.image('amogus', './assets/images/amogus.png');
        this.load.audio('amongussound', './assets/audio/amongus.mp3');
    }

    create() {

        //manual next
        this.input.once('pointerdown', () => {
            this.scene.start('loadingscreen');
        })

        //auto next
        this.time.delayedCall(12000, () => {
            this.scene.start('loadingscreen');
        })

        //create sprites
        let text = this.add.text(300, 270, "Suspicious Games", {font: "40px Georgia", color: "#eb4034"});
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
        this.cameras.main.fadeIn(1000);

        //effect
        let fx = this.cameras.main.postFX.addWipe();

        //manual next
        this.input.once('pointerdown', () => {  
            //transition
            this.scene.transition({
                target: 'title',
                duration: 2000,
                moveBelow: true,
                onUpdate: (progress) => {
                    fx.progress = progress;
                }
            });
        })
        
        //auto next
        this.time.delayedCall(4000, () => {
            //transition
            this.scene.transition({
                target: 'title',
                duration: 2000,
                moveBelow: true,
                onUpdate: (progress) => {
                    fx.progress = progress;
                }
            });
        })

        
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
        this.load.image('logo', './assets/images/logo.png');
        this.load.image('background', './assets/images/fish background.png');
    }

    create() {
        //background
        //let background = this.add.image(300,300,'background').setOrigin(.5);
        //background.scale(.01);

        //create assets
        let logo = this.add.image(275,100,'logo').setOrigin(.5);
        let rectangle1 = this.add.rectangle(298,180,512,10, 0x3c78d8).setOrigin(.5);

        let duel = this.add.text(50, 250, "DUEL", {font: "40px Arial", color: "#ffffff"});
        let options = this.add.text (50, 350, "Options", {font: "40px Arial", color: "#ffffff"});
        let exit = this.add.text (50, 450, "Exit", {font: "40px Arial", color: "#ffffff"});

        let text = this.add.text(650, 300, 
`The year is 2019. 
Unreal fish things have 
invaded the planet. 
Can you fish them all?`, {font: "20px Arial", color: "#ffffff"}).setOrigin(.5);
        let rectangle2 = this.add.rectangle(650,225,250,10,0x3c78d8);
        let rectangle3 = this.add.rectangle(650,375,250,10,0x3c78d8);


        let cursor = this.add.ellipse(350, 270, 200, 20, 0xd89040,1);

        this.add.tween({
            targets: cursor,
            alpha: 0,
            ease: 'Power2',
            duration: 1200,
            repeat: -1
        });

        

        
    }
}

//config
let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    scene: [Start, Intro, LoadingScreen, Title]
}

let game = new Phaser.Game(config);