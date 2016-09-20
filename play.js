var play = {
    create: function() {
        this.colortime = 0;
        this.sky = game.add.sprite(0, 0, 'sky');
        this.skymirror = game.add.sprite(2048, 0, 'skymirror');
        this.sky.scale.y = 1.4;
        this.skymirror.scale.y = 1.4;
        //this.nisse = this.game.add.audio('nisse');
        //this.nisse.volume = 1.5;
        //this.nisse.play()
        this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.william = game.add.group();
        this.william.createMultiple(5, 'william');
        this.william.setAll('checkWorldBounds', true);
        this.william.setAll('outOfBoundsKill', true);
        this.william.enableBody = true;
        this.william.scale.setTo(1.27, 1.27);
        this.william2 = game.add.group();
        this.william2.createMultiple(5, 'william2');
        this.william2.setAll('checkWorldBounds', true);
        this.william2.setAll('outOfBoundsKill', true);
        this.william2.enableBody = true;
        this.william2.scale.setTo(1.27, 1.27);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.player = this.game.add.sprite(W / 2, H / 2 - 100, 'bird');

        this.player.scale.setTo(2.5, 2.5);
        this.player.animations.add('jump1', [1, 0], 4, false);
        this.player.animations.add("start", [0], 1, false);
        game.physics.arcade.enable(this.player);
        game.physics.arcade.enable(this.william);
        game.physics.arcade.enable(this.william2);
        this.player.anchor.setTo(0.5, 0.5);
        this.score = 0;

        this.dick = this.game.add.audio("dick");
        this.dick.loop = true;
        this.dick.volume = 0.3;

        if (SOUND) {

            this.m1 = this.game.add.audio("herreguddritkult")
            this.m2 = this.game.add.audio('m2');
            this.m3 = this.game.add.audio('m3');
            this.m4 = this.game.add.audio('m4');
            this.m5 = this.game.add.audio('m5');
            this.m6 = this.game.add.audio("nooraokey")
            this.m7 = this.game.add.audio("harderenomat");
            this.m8 = this.game.add.audio("iloveyou")
            this.m9 = this.game.add.audio("javel")
            this.m10 = this.game.add.audio("jeggiropp")
            this.m11 = this.game.add.audio("russebuss")
            this.m12 = this.game.add.audio("lagenoaent")
            this.m13 = this.game.add.audio("ikkenoespise")



            this.m1.volume = 1.0;
            this.m2.volume = 1.2;
            this.m3.volume = 1.0;
            this.m4.volume = 1.2;
            this.m5.volume = 0.6;
            this.m6.volume = 1.3;
            this.m7.volume = 1.3;
            this.m8.volume = 1.3;
            this.m9.volume = 1.4;
            this.m10.volume = 1.4;
            this.m11.volume = 1.4;
            this.m12.volume = 0.8;
            this.m13.volume = 1.0;

            this.d1 = this.game.add.audio("dutrengerpikknoora")
            this.d2 = this.game.add.audio("erduserr")
            this.d3 = this.game.add.audio("omg")
            this.d4 = this.game.add.audio("nooramedtooer")

        }

        this.player.animations.play("start");        

        this.scoretext = this.game.add.text(230, 20, "POENG: 0", {
            font: "35px Helvetica",
            fill: "#E4DF01",
            align: "center"
        });

        this.besttext = this.game.add.text(210, 80, "REKORD: " + BEST, {
            font: "35px Helvetica",
            fill: "#E4DF01",
            align: "center"
        });
        this.scoretext.fontWeight = "bold";
        this.scoretext.font = "Helvetica";
        this.besttext.fontWeight = "bold";
        this.besttext.font = "Helvetica"

        this.player.body.setSize(32, 80, 25, 25);
        this.player.body.gravity.y = 1600;
        this.timer = this.game.time.events.loop(1800, this.add_p, this);
        this.game.time.events.loop(1800, this.updateScore, this);
        if (SOUND) {
            this.randomS = this.game.time.events.loop(10000, this.randomSound, this);
        }

        this.dick.play();

        this.backgroundSpeed = 0.4;

    },
    update: function() {
        if (this.player.angle < 20) this.player.angle += 1;
        game.input.onDown.add(this.jump, this);
        this.space.onDown.add(this.jump, this);
        if (this.player.inWorld == false) this.restart();
        game.physics.arcade.collide(this.player, this.william, 0, this.restart, this);
        game.physics.arcade.collide(this.player, this.william2, 0, this.restart, this);

        if (this.score > 9 && this.score < 21) {
            this.player.body.position.y += Math.cos(Date.now()) * 7;
            this.playerTint(487);
        }

        if (this.score > 21 && this.score < 23) {
            this.player.tint = 0xffffff;
        }

        if (this.score > 30 && this.score < 41) {
            this.player.body.position.y += Math.cos(Date.now()) * 7;
            this.playerTint(487);
            this.obstacle.tint = 0xffffff;
            this.obstacle2.tint = 0xffffff;
        }

        if (this.score > 41 && this.score < 43) {
            this.player.tint = 0xffffff;
        }

        if (this.score > 60) {
            this.player.body.position.y += Math.cos(Date.now()) * 7;
            this.playerTint(243);
        }

      if (this.sky.x < -2048) {
        this.sky.x = 2048;
        this.sky.x -= this.backgroundSpeed;
      } else {}
        this.sky.x -= this.backgroundSpeed;

      if (this.skymirror.x < -2048) {
        this.skymirror.x = 2048;
        this.skymirror.x -= this.backgroundSpeed;
      } else {}
        this.skymirror.x -= this.backgroundSpeed;

    },
    render: function() {
        game.debug.body(this.william)
    },
    jump: function() {
        //var change_expression = Math.floor(Math.random() * 20);

        this.backgroundSpeed += 0.03;

        if (!this.score%50==0 || this.score==0) {
        this.player.animations.stop(null, true);
        this.player.animations.play("jump1");
        }

        this.player.body.velocity.y = -600;
        tweenz = this.game.add.tween(this.player);
        tweenz.to({
            angle: -20
        }, 100);
        tweenz.start();

    },
    restart: function() {

        if (this.score==1) {
            SANACOUNT += 1;

            if (SANACOUNT%3==0) {
                if (SANA) {
                    SANA = 0;
                } else {
                    SANA = 1;
                }
            }
        } else {
            SANACOUNT = 0;
        }

        this.dick.stop();

        TOTAL += this.score;

        document.cookie = 'totalcookie='+TOTAL+'; expires=Fri, 1 Aug 2020 20:47:11 UTC; path=/';

        if (this.score >= BEST) {
            BEST = this.score;
            document.cookie = 'bestcookie='+BEST+'; expires=Fri, 1 Aug 2020 20:47:11 UTC; path=/';
        }

        LAST = this.score;

        if (SOUND) {
            this.randomDeathSound();
        }

        game.state.start('menu');

    },
    add_p: function() {
        this.obstacle = this.william.getFirstDead();
        this.obstacle2 = this.william2.getFirstDead();
        this.obstacle.body.setSize(169, 581, 50, 90);
        this.obstacle2.body.setSize(169, 581, 50, 40);
        var random = Math.floor(Math.random() * 400) - 200;
        this.obstacle.reset(W, -275 + random);
        this.obstacle2.reset(W, 575 + random);
        this.obstacle.body.velocity.x = -250;
        this.obstacle2.body.velocity.x = -250;

        if (this.score > 21 && this.score < 30) {
            this.obstacle.tint = 0xff00000;
            this.obstacle2.tint = 0x0000ff;
            this.slide(40);
        }

        if (this.score > 41 && this.score < 60) {
            this.obstacle.tint = 0xab238c;
            this.obstacle2.tint = 0x42bbff;
            this.slide(80);
        }

    },
    updateScore: function() {
        this.score += 1;
        this.scoretext.text = "POENG: " + this.score;
        if (this.score > BEST)
            BEST = this.score;
        this.besttext.text = "REKORD: " + BEST;
    },
    randomDeathSound: function() {
        switch(Math.floor((Math.random() * 4) + 1)) {
            case 1:
                this.d1.play();
                break;
            case 2:
                this.d2.play();
                break;
            case 3:
                this.d3.play();
                break;
            case 4:
                this.d4.play();
                break;
        }
    },
    randomSound: function() {
        switch(Math.floor((Math.random() * 13) + 1)) {
            case 1:
                this.m1.play();
                break;
            case 2:
                this.m2.play();
                break;
            case 3:
                this.m3.play();
                break;
            case 4:
                this.m4.play();
                break;
            case 5:
                this.m5.play();
                break;
            case 6:
                this.m6.play();
                break;
            case 7:
                this.m7.play();
                break;
            case 8:
                this.m8.play();
                break;
            case 9:
                this.m9.play();
                break;
            case 10:
                this.m10.play();
                break;
            case 11:
                this.m11.play();
                break;
            case 12:
                this.m12.play();
                break;
            case 13:
                this.m13.play();
                break;
        }
    },
    playerTint: function(frequency) {
        if (game.time.now > this.colortime) {
            var c = Math.random() * 0xffffff;
            this.player.tint = c;
            this.colortime = game.time.now + frequency;
        }
    },
    slide: function(velocity) {
        if ((Math.floor(Math.random() * 2) + 1) == 1)
            rr = velocity;
        else
            rr = - velocity;
        this.obstacle.body.velocity.y = rr;
        this.obstacle2.body.velocity.y = rr;
    }

}
