class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
        //this.WallB
        this.dir = 1;
        //this.dir2 = 1;

        
        
    }

    init() {
        // useful variables
        this.SHOT_VELOCITY_X = 200
        this.SHOT_VELOCITY_Y_MIN= 700
        this.SHOT_VELOCITY_Y_MAX= 1100
        //this.togDir = true;

    }

    preload() {
        this.load.path = './assets/img/'
        this.load.image('grass', 'grass.jpg')
        this.load.image('cup', 'cup.jpg')
        this.load.image('ball', 'ball.png')
        this.load.image('wall', 'wall.png')
        this.load.image('oneway', 'one_way_wall.png')
    }



    create() {
        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)

        // add cup
        this.cup = this.physics.add.sprite(width /2, height / 10, 'cup')
        this.cup.body.setCircle(this.cup.width/4)
        this.cup.body.setOffset(this.cup.width/4)
        this.cup.body.setImmovable(true)

        // add ball
        this.ball = this.physics.add.sprite(width / 2, height - height /10,'ball')
        this.ball.body.setCircle(this.ball.width/2)
        this.ball.body.setCollideWorldBounds(true)
        this.ball.body.setBounce(0.5)
        this.ball.body.setDamping(true).setDrag(0.5)

        // add walls
        let WallA =  this.physics.add.sprite(0, height/4, 'wall')
        WallA.setX(Phaser.Math.Between(0+WallA.width/2, width - WallA.width/2))
        WallA.body.setImmovable(true)
        WallA.body.setVelocityX(100)

        let WallB =  this.physics.add.sprite(0, height/2, 'wall')
        WallB.setX(Phaser.Math.Between(0+WallB.width/2, width - WallB.width/2))
        WallB.body.setImmovable(true)
        //WallB.setVelocityX(100); 

        //console.log("WallB.x:", WallB.x, "width/10:", width/10, "width-width/10:", width-width/10);
       /*if (WallB.x <= width/10 || WallB.x >= width-width/10) {
            console.log("rawr")
            WallB.setVelocityX(-WallB.body.velocity.x);
        }*/
          
         

        this.walls = this.add.group([WallA, WallB])
        
        // add one-way
        this.oneWay = this.physics.add.sprite(width/2, height / 4*3, 'oneway')
        this.oneWay.setX(Phaser.Math.Between(0 + this.oneWay.width/2, width-this.oneWay.width/2))
        this.oneWay.body.setImmovable(true)
        this.oneWay.body.checkCollision.down = false

        // add pointer input
        this.input.on('pointerdown', (pointer)=>{
            let shotDirection = pointer.y <= this.ball.y ? 1 : -1
            let shootDirection2 = pointer.x <= this.ball.x ? 1: -1
            this.ball.body.setVelocityX((this.SHOT_VELOCITY_X)*shootDirection2)
            this.ball.body.setVelocityY(Phaser.Math.Between(this.SHOT_VELOCITY_Y_MIN, this.SHOT_VELOCITY_Y_MAX)*shotDirection)
            //this.WallA.body.setX(Phaser.Math.Between(0+WallA.width/2, width - WallA.width/2))
        })

        // cup/ball collision
        this.physics.add.collider(this.ball, this.cup, (ball, cup)=>{
            this.ball.setPosition(width / 2, height - height /10)
            this.ball.body.setVelocityX(0)
            this.ball.body.setVelocityY(0)
            WallB.setX(Phaser.Math.Between(0+WallB.width/2, width - WallB.width/2))
            WallA.setX(Phaser.Math.Between(0+WallA.width/2, width - WallA.width/2))


        })

        // ball/wall collision
        this.physics.add.collider(this.ball, this.walls)


        // ball/one-way collision
        this.physics.add.collider(this.ball, this.oneWay)

        //this.collider.add.collider(this.WallA)

        
    }

    update() {

        

        this.walls.children.iterate(wall => {
            if ((wall.x <= wall.width/2)&&this.dir==-1 || (wall.x >= width - wall.width / 2)&&this.dir == 1) {
                //console.log("WallWid",wall.width/2)
                //console.log("wallX",wall.x)
                //console.log("width",width-wall.width/2)
                this.dir = this.dir* -1

                //console.log(this.dir)
                wall.setVelocityX(100*this.dir);

                //this.togDir = false;

            /*}else if(wall.x > 0 && wall.x < width - wall.width){
                this.togDir = true;
*/
            }
        });
    }


}
/*
CODE CHALLENGE
Try to implement at least 3/4 of the following features during the remainder of class (hint: each takes roughly 15 or fewer lines of code to implement):
[ ] Add ball reset logic on successful shot
[ ] Improve shot logic by making pointer’s relative x-position shoot the ball in correct x-direction
[ ] Make one obstacle move left/right and bounce against screen edges
[ ] Create and display shot counter, score, and successful shot percentage
*/