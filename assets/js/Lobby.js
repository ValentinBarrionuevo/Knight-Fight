class Lobby extends Phaser.Scene {
  constructor() {
    super("lobby");
  }

  create() {
    camara = this.cameras.main;
    this.cameras.main.setBounds(0, 0, 3048, 1080);
    titulo.stop();
    nivel1.play({
      volume:0.15
    });
    this.add.image(1524, 540, "nivel1").setScale(1.3, 1);

    this.physics.world.setBounds(0, 0, 3048, 1080);

    platforms = this.physics.add.staticGroup();
    platforms.create(1400, 968, "ground").setScale(1.3, 1).refreshBody();

    ataque = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    pocionkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

    player = this.physics.add.sprite(100, 840, "dude");
    player.setCollideWorldBounds(true);
    player.setScale(1.2);
    player.setOrigin(0.5, 1);

    puerta = this.physics.add.sprite(2833, 840, "puerta");
    puerta.setScale(0.6);
    puerta.setOrigin(0.5, 1);

    espada = this.physics.add.sprite(0, 0, "espada");
    espada.setScale(1);
    espada.body.setAllowGravity(false);
    espada.visible = false;

    this.time.addEvent({
      delay: 3000,
      callback: () => {
        enemigo.movimiento();
        if (moverIZQ === true) {
          moverIZQ = false;
        } else {
          moverIZQ = true;
        }
      },
      loop: true,
    });
    this.time.addEvent({
      delay: 3000,
      callback: () => {
        enemigo2.movimiento();
        if (moverIZQ === true) {
          moverIZQ = false;
        } else {
          moverIZQ = true;
        }
      },
      loop: true,
    });
    this.time.addEvent({
      delay: 3000,
      callback: () => {
        enemigo3.movimiento();
        if (moverIZQ === true) {
          moverIZQ = false;
        } else {
          moverIZQ = true;
        }
      },
      loop: true,
    });

    enemigo = new Enemigo({ scene: this, x: 1139, y: 800 });
    enemigo.hp = 10;

    enemigo2 = new Enemigo({ scene: this, x: 600, y: 800 });
    enemigo2.hp = 10;

    enemigo3 = new Enemigo({ scene: this, x: 2300, y: 800 });
    enemigo3.hp = 10;

    pocion = new Pocion({ scene: this, x: enemigo.x, y: enemigo.x });
    pocion2 = new Pocion({ scene: this, x: enemigo2.x, y: enemigo2.x });
    pocion3 = new Pocion({ scene: this, x: enemigo3.x, y: enemigo3.x });

    rubi = new Rubi({ scene: this, x: enemigo.x, y: enemigo.x });
    rubi2 = new Rubi({ scene: this, x: enemigo2.x, y: enemigo2.x });
    rubi3 = new Rubi({ scene: this, x: enemigo3.x, y: enemigo3.x });

    moneda = new Moneda({ scene: this, x: enemigo.x, y: enemigo.x });
    moneda2 = new Moneda({ scene: this, x: enemigo2.x, y: enemigo2.x });
    moneda3 = new Moneda({ scene: this, x: enemigo3.x, y: enemigo3.x });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(puerta, platforms);

    this.physics.add.collider(enemigo, platforms);
    this.physics.add.collider(enemigo2, platforms);
    this.physics.add.collider(enemigo3, platforms);

    this.physics.add.collider(pocion, platforms);
    this.physics.add.collider(pocion2, platforms);
    this.physics.add.collider(pocion3, platforms);

    this.physics.add.collider(moneda, platforms);
    this.physics.add.collider(moneda2, platforms);
    this.physics.add.collider(moneda3, platforms);

    this.physics.add.collider(rubi, platforms);
    this.physics.add.collider(rubi2, platforms);
    this.physics.add.collider(rubi3, platforms);

    this.physics.add.overlap(espada, enemigo, this.golpear, null, this);
    this.physics.add.overlap(espada, enemigo2, this.golpear2, null, this);
    this.physics.add.overlap(espada, enemigo3, this.golpear3, null, this);

    this.physics.add.overlap(player, enemigo, this.daño, null, this);
    this.physics.add.overlap(player, enemigo2, this.daño2, null, this);
    this.physics.add.overlap(player, enemigo3, this.daño3, null, this);

    this.physics.add.overlap(player, pocion, this.collectPocion, null, this);
    this.physics.add.overlap(player, pocion2, this.collectPocion2, null, this);
    this.physics.add.overlap(player, pocion3, this.collectPocion3, null, this);

    this.physics.add.overlap(player, moneda, this.collectmoneda, null, this);
    this.physics.add.overlap(player, moneda2, this.collectmoneda2, null, this);
    this.physics.add.overlap(player, moneda3, this.collectmoneda3, null, this);

    this.physics.add.overlap(player, rubi, this.collectrubi, null, this);
    this.physics.add.overlap(player, rubi2, this.collectrubi2, null, this);
    this.physics.add.overlap(player, rubi3, this.collectrubi3, null, this);

    this.physics.add.overlap(player, puerta, this.entrarCastillo, null, this);

    if ((cursors = !undefined)) {
      cursors = this.input.keyboard.createCursorKeys();
    }
  }

  update() {
    if (enemigo.hp > 0) {
      pocion.x = enemigo.x;
      pocion.y = enemigo.y;
      moneda.x = enemigo.x;
      moneda.y = enemigo.y;
      rubi.x = enemigo.x;
      rubi.y = enemigo.y;
    }
    if (enemigo2.hp > 0) {
      pocion2.x = enemigo2.x;
      pocion2.y = enemigo2.y;
      moneda2.x = enemigo2.x;
      moneda2.y = enemigo2.y;
      rubi2.x = enemigo2.x;
      rubi2.y = enemigo2.y;
    }
    if (enemigo3.hp > 0) {
      pocion3.x = enemigo3.x;
      pocion3.y = enemigo3.y;
      moneda3.x = enemigo3.x;
      moneda3.y = enemigo3.y;
      rubi3.x = enemigo3.x;
      rubi3.y = enemigo3.y;
    }

   //if (enemigo.hp == 0 && drop1 == false) {
   //  enemigo.visible = false;
   //  patron = Phaser.Math.FloatBetween(0, 1);
   //  drop1 = true;
   //  score += 1000;
   //  morirEnemigo.play();

   //  if (patron < 0.5) {
   //    moneda.visible = true;
   //  } else if (patron < 0.75) {
   //    pocion.visible = true;
   //  } else {
   //    rubi.visible = true;
   //  }
   //}
    if (enemigo2.hp == 0 && drop2 == false) {
      enemigo2.visible = false;
      drop2 = true;
      score += 1000;
      morirEnemigo.play();

      patron = Phaser.Math.FloatBetween(0, 1);

      if (patron < 0.5) {
        moneda2.visible = true;
      } else if (patron < 0.75) {
        pocion2.visible = true;
      } else {
        rubi2.visible = true;
      }
    }
    if (enemigo3.hp == 0 && drop3 == false) {
      enemigo3.visible = false;
      drop3 = true;
      score += 1000;
      morirEnemigo.play();

      patron = Phaser.Math.FloatBetween(0, 1);

      if (patron < 0.5) {
        moneda3.visible = true;
      } else if (patron < 0.75) {
        pocion3.visible = true;
      } else {
        rubi3.visible = true;
      }
    }

    espada.y = player.y - 30;

    camara.centerOn(player.x, player.y);

    if (pocionkey.isDown && pociones > 0 && pocionusada == false && hp < 20) {
      hp += 5;
      pociones--;
      pocionusada = true;
      usarPocion.play();
      this.time.addEvent({
        delay: 1500,
        callback: () => {
          pocionusada = false;
        },
        loop: false,
      });
    }

    if (gameOver) {
      return;
    }

    if (hp <= 0) {
      this.gameOver();
    }

    if (ataque.isUp) {
      repetir = 0;
    }

    if (ataque.isDown && tiempoataque == true && repetir == 0) {
      (espada.visible = true), (tiempoataque = false);

      this.time.addEvent({
        delay: 500, // ms
        callback: () => {
          (tiempoataque = true), (repetir = 1);
        },
        loop: false,
      });
    } else {
      espada.visible = false;
    }

    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      orientacion = "left";
      player.anims.play("left", true);
      espada.x = player.x - 60;
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
      orientacion = "right";
      player.anims.play("right", true);
      espada.x = player.x + 60;
    } else {
      player.setVelocityX(0);
      if (orientacion == "left") {
        player.anims.play("leftidle", true);
      } else {
        player.anims.play("rightidle", true);
      }
    }
    console.log(hp);

    if (cursors.up.isDown && player.body.blocked.down) {
      player.setVelocityY(-330);
      if (DobleSalto == true) {
        tenersalto = true;
      }
      if (tenersalto == true) {
        tenersalto = false;
        this.time.addEvent({
          delay: 800, // ms
          callback: () => {
            doblesalto = true;
          },
          loop: false,
        });
      }
    }

    if (cursors.up.isDown && doblesalto == true) {
      player.setVelocityY(-330);
      doblesalto = false;
    }
  }

  entrarCastillo() {
    this.scene.start("a");
  }

  collectPocion(player, pocion) {
    if (pocion.visible == true) {
      pocion.destroy(true, true);
      pociones++;
      pocionPick.play();
    }
  }
  collectPocion2(player, pocion2) {
    if (pocion2.visible == true) {
      pocion2.destroy(true, true);
      pociones++;
      pocionPick.play();
    }
  }
  collectPocion3(player, pocion3) {
    if (pocion3.visible == true) {
      pocion3.destroy(true, true);
      pociones++;
      pocionPick.play();
    }
  }
  collectmoneda(player, moneda) {
    if (moneda.visible == true) {
      score += 2000;
      puntosPick.play();

      moneda.destroy(true, true);
    }
  }
  collectmoneda2(player, moneda2) {
    if (moneda2.visible == true) {
      score += 2000;
      puntosPick.play();

      moneda2.destroy(true, true);
    }
  }
  collectmoneda3(player, moneda3) {
    if (moneda3.visible == true) {
      score += 2000;
      puntosPick.play();

      moneda3.destroy(true, true);
    }
  }
  collectrubi(player, rubi) {
    if (rubi.visible == true) {
      score += 6000;
      puntosPick.play();

      rubi.destroy(true, true);
    }
  }
  collectrubi2(player, rubi2) {
    if (rubi2.visible == true) {
      score += 6000;
      puntosPick.play();

      rubi2.destroy(true, true);
    }
  }
  collectrubi3(player, rubi3) {
    if (rubi3.visible == true) {
      score += 6000;
      puntosPick.play();

      rubi3.destroy(true, true);
    }
  }

  golpear(espada, enemigo) {
    if (espada.visible == true && enemigo.visible == true) {
      if (enemigo.hp > 0) {
        enemigo.hp = enemigo.hp - 5;
        golpear.play();
      }
    }
  }
  golpear2(espada, enemigo2) {
    if (espada.visible == true && enemigo2.visible == true) {
      if (enemigo2.hp > 0) {
        enemigo2.hp = enemigo2.hp - 5;
        golpear.play();
      }
    }
  }
  golpear3(espada, enemigo3) {
    if (espada.visible == true && enemigo3.visible == true) {
      if (enemigo3.hp > 0) {
        enemigo3.hp = enemigo3.hp - 5;
        golpear.play();
      }
    }
  }

  daño(player, enemigo) {
    if (daño1 == true && enemigo.visible == true) {
      hp = hp - 5;
      daño1 = false;
      daño.play();

      this.time.addEvent({
        delay: 1000, // ms
        callback: () => {
          daño1 = true;
        },
        loop: false,
      });
    }
  }
  daño2(player, enemigo2) {
    if (daño1 == true && enemigo2.visible == true) {
      hp = hp - 5;
      daño1 = false;
      daño.play();

      this.time.addEvent({
        delay: 1000, // ms
        callback: () => {
          daño1 = true;
        },
        loop: false,
      });
    }
  }
  daño3(player, enemigo3) {
    if (daño1 == true && enemigo3.visible == true) {
      hp = hp - 5;
      daño1 = false;
      daño.play();

      this.time.addEvent({
        delay: 1000, // ms
        callback: () => {
          daño1 = true;
        },
        loop: false,
      });
    }
  }
  gameOver() {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    var gameOverButton = this.add
      .image(700, 500, "gameoverclick")
      .setScale(10, 10)
      .setInteractive()
      .on(
        "pointerdown",
        () => this.scene.start("gameover"),
        this.scene.stop("hud")
      );
    Phaser.Display.Align.In.Center(
      gameOverButton,
      this.add.zone(400, 300, 800, 600)
    );
  }
}
