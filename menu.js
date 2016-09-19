var menu = {
    preload: function() {
        game.load.spritesheet('playbtn', 'assets/play.png', 160, 160);
        game.load.spritesheet('instagram', 'assets/instagram.png', 504, 504);
    },

    create: function() {
        BEST = parseInt(this.readCookie("bestcookie"));
        TOTAL = parseInt(this.readCookie("totalcookie"));

        if (isNaN(BEST))
            BEST = 0;

        if (isNaN(TOTAL))
            TOTAL = 0;

        this.bgsky = game.add.sprite(0, 0, 'menu');
        
        this.playbtn = game.add.button(W/2-80, 760, 'playbtn', this.play_game, this, 0, 1);
        this.playbtn.scale.setTo(0.80, 0.8);



        /*this.button = game.add.button(500, 1000, 'soundbtn', this.toggle, this);

        if (SOUND == 1)
            this.button.frame = 1;
        else
            this.button.frame = 0;
        */

        this.totaltext = this.game.add.text(W/2, H-70, "TOTAL: " + TOTAL, {
            fontSize: "100px",
            fill: "#fff900",
            align: "center",
        });
        this.totaltext.fontWeight = "bold";
        this.totaltext.font = "Helvetica";
        this.totaltext.fontSize = "60px";
        this.totaltext.anchor.setTo(0.5, 0);

        this.besttext = this.game.add.text(W/2, H-145, "REKORD: " + BEST, {
            fontSize: "100px",
            fill: "#fff900",
            align: "center",
        });
        this.besttext.fontWeight = "bold";
        this.besttext.font = "Helvetica";
        this.besttext.fontSize = "60px";
        this.besttext.anchor.setTo(0.5, 0);

        if (LAST) {
            this.lasttext = this.game.add.text(W/2, H-200, "DU FIKK " + LAST + " POENG", {
                fill: "#fff900",
                //align: "center"
            });

            this.lasttext.fontWeight = "bold";
            this.lasttext.font = "Helvetica";
            this.lasttext.fontSize = "40px";
            this.lasttext.align = "center";
            this.lasttext.anchor.setTo(0.5, 0);
        }
    },

    update: function() {

    },

    play_game: function() {
        this.game.state.start('play');
    },

    play_next: function() {

            if (this.notyet)
                this.notyet.destroy();

            this.notyet = this.game.add.text(100, 615, "Du kan ikke spille denne banen enda", {
                fill: "#000",
                align: "center"
            });

            this.notyet.fontWeight = "bold";
            this.notyet.font = "Helvetica";
            this.notyet.fontSize = "30px";
        
    },

	readCookie: function(name) {

	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1,c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
	    return null;
	},

    toggle: function() {
        
        if (this.button.frame == 0) {
            this.button.frame = 1;
            SOUND = 1;
        }
        else {
            this.button.frame = 0;
            SOUND = 0;
        }
    },
};
