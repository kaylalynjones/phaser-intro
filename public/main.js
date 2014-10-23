var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update:update });

function preload(){
  game.load.image('dragon','/img/spyro.png');
  game.load.image('swirl', '/img/color_wheel_swirl.png');
  game.load.image('fashion', 'img/bubble-on.png');
  game.load.atlasJSONHash('bot', '/img/running_bot.png', '/img/running_bot.json');
}

var swirl, dragon, fashion;

function create(){
  swirl = game.add.sprite(0,0,'swirl');
  dragon = game.add.sprite(30,30,'dragon');
  dragon.anchor.set(0.5);
  dragon.scale.setTo(2);
  fashion = game.add.sprite(50,50,'fashion');

  fashion.scale.setTo(0.5);


  game.physics.enable(fashion, Phaser.Physics.ARCADE);
  game.physics.enable(swirl, Phaser.Physics.ARCADE);
  game.physics.enable(dragon, Phaser.Physics.ARCADE);

  swirl.body.velocity.y = 50;

  //  Here we create a tween on the sprite created above
  var tween = game.add.tween(fashion);

  //  The object defines the properties to tween.
  //  In this case it will move to x 600
  //  The 6000 is the duration in ms - 6000ms = 6 seconds
  tween.to({ x: 600 }, 2000);

  //  And this starts it going
  tween.start();

  var text = "Hello World.";
  var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
  var t = game.add.text(game.world.centerX-300, 100, text, style);

  //  This sprite is using a texture atlas for all of its animation data
  var bot = game.add.sprite(500, 500, 'bot');

  //  Here we add a new animation called 'run'
  //  We haven't specified any frames because it's using every frame in the texture atlas
  bot.animations.add('run');

  //  And this starts the animation playing by using its key ("run")
  //  15 is the frame rate (15fps)
  //  true means it will loop when it finishes
  bot.animations.play('run', 15, true);
  var botTween = game.add.tween(bot);
  botTween.to({ x: 5 }, 3000);
  botTween.start();

}

function update(){
    if (game.physics.arcade.distanceToPointer(dragon, game.input.activePointer) > 8)
    {
        game.physics.arcade.moveToPointer(dragon, 300);
    }
    else {
        dragon.body.velocity.set(0);
    }
}
