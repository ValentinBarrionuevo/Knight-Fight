class Cueva extends Phaser.Scene {
  constructor() {
    super("cueva");
  }

  create() {
    this.physics.world.setBounds(0, 0, 2600, 2200);

    this.add.image(1300, 1100, "nivel3");
    nivel3.play({
      volume:0.15
    });
    nivel2.stop();

    const map = this.make.tilemap({ key: "cueva" });
    const tileset = map.addTilesetImage("pisocueva", "tiles");

    const piso = map.createStaticLayer("piso", tileset);
    piso.setCollisionByProperty({ collision: true });

    if ((cursors = !undefined)) {
      cursors = this.input.keyboard.createCursorKeys();
    }

    camara = this.cameras.main;
    this.cameras.main.setBounds(0, 0, 2600, 2200);

    ataque = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    pocionkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    bolakey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

    player = this.physics.add.sprite(120, 120, "dude");
    player.setCollideWorldBounds(true);
    player.setScale(1.2);
    player.setOrigin(0.5, 1);

    espada = this.physics.add.sprite(0, 0, "espada");
    espada.setScale(1);
    espada.body.setAllowGravity(false);
    espada.visible = false;

    enemigo = new Enemigo({ scene: this, x: 1831, y: 300 });
    enemigo.hp = 10;

    enemigo2 = new Enemigo({ scene: this, x: 2071, y: 1000 });
    enemigo2.hp = 10;

    enemigo3 = this.physics.add.sprite(1440, 2000, "rata").setScale(2);
    enemigo3.hp = 20;

    bola = this.physics.add.sprite(enemigo3.x, enemigo3.y, "bola");
    bola.visible = false;

    this.time.addEvent({
      delay: 3000,
      callback: () => {
        enemigo.movimiento();
        if (moverIZQ === true) {
          moverIZQ = false;
          console.log("asd1");
        } else {
          moverIZQ = true;
          console.log("asd");
        }
      },
      loop: true,
    });
    this.time.addEvent({
      delay: 3000,
      callback: () => {
        enemigo2.movimiento();
        if (moverIZQ2 === true) {
          moverIZQ2 = false;
          console.log("asd11");
        } else {
          moverIZQ2 = true;
          console.log("asd00");
        }
      },
      loop: true,
    });

    pocion = new Pocion({ scene: this, x: enemigo.x, y: enemigo.x });
    pocion2 = new Pocion({ scene: this, x: enemigo2.x, y: enemigo2.x });

    rubi = new Rubi({ scene: this, x: enemigo.x, y: enemigo.x });
    rubi2 = new Rubi({ scene: this, x: enemigo2.x, y: enemigo2.x });

    moneda = new Moneda({ scene: this, x: enemigo.x, y: enemigo.x });
    moneda2 = new Moneda({ scene: this, x: enemigo2.x, y: enemigo2.x });

    puerta = this.physics.add.sprite(173, 670, "puerta").setScale(0.2);

    this.physics.add.collider(player, piso);
    this.physics.add.collider(bola, piso);
    this.physics.add.collider(puerta, piso);

    this.physics.add.collider(enemigo, piso);
    this.physics.add.collider(enemigo2, piso);
    this.physics.add.collider(enemigo3, piso);

    this.physics.add.collider(pocion, piso);
    this.physics.add.collider(pocion2, piso);

    this.physics.add.collider(moneda, piso);
    this.physics.add.collider(moneda2, piso);

    this.physics.add.collider(rubi, piso);
    this.physics.add.collider(rubi2, piso);

    this.physics.add.overlap(player, bola, this.collectBola, null, this);
    this.physics.add.overlap(player, puerta, this.salirCueva, null, this);

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
  }

  update() {
    camara.centerOn(player.x, player.y);

    if (
      Phaser.Math.Distance.Between(enemigo3.x, enemigo3.y, player.x, player.y) <
        200 &&
      mover == true
    ) {
      this.time.addEvent({
        delay: 1000, // ms
        callback: () => {
          (mover = false),
            this.time.addEvent({
              delay: 1000, // ms
              callback: () => {
                mover = true;
              },
              loop: false,
            });
        },
        loop: false,
      });
      // if player to left of enemy AND enemy moving to right (or not moving)
      if (player.x < enemigo3.x && enemigo3.body.velocity.x >= 0) {
        // move enemy to leftjefe
        enemigo3.body.velocity.x = -80;
        enemigo3.anims.play("izqrata", true);
      }
      // if player to right of enemy AND enemy moving to left (or not moving)
      else if (player.x > enemigo3.x && enemigo3.body.velocity.x <= 0) {
        // move enemy to right
        enemigo3.body.velocity.x = 80;
        enemigo3.anims.play("derrata", true);
      }
    }
    console.log(hp);

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
      bola.x = enemigo3.x;
      bola.y = enemigo3.y;
    }

    if (enemigo.hp == 0 && drop1 == false) {
      enemigo.visible = false;
      patron = Phaser.Math.FloatBetween(0, 1);
      drop1 = true;
      morirEnemigo.play();

      score += 1000;

      if (patron < 0.5) {
        moneda.visible = true;
      } else if (patron < 0.75) {
        pocion.visible = true;
      } else {
        rubi.visible = true;
      }
    }
    if (enemigo2.hp == 0 && drop2 == false) {
      enemigo2.visible = false;
      drop2 = true;
      patron = Phaser.Math.FloatBetween(0, 1);
      score += 1000;
      morirEnemigo.play();

      if (patron < 0.5) {
        moneda2.visible = true;
      } else if (patron < 0.75) {
        pocion2.visible = true;
      } else {
        rubi2.visible = true;
      }
    }
    if (enemigo3.hp == 0 && drop3 == false) {
      bola.visible = true;
      enemigo3.visible = false;
      drop3 = true;
      score += 1000;
      morirEnemigo.play();
    }

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

    if (
      bolakey.isDown &&
      BolaObtenida == true &&
      bolausada == true &&
      tocarbola == true &&
      player.body.blocked.down
    ) {
      tocarbola = false;
      bolausada = false;
      player.setScale(0.4);
      usarBola.play({
        volume:0.20
      });

      this.time.addEvent({
        delay: 1000, // ms
        callback: () => {
          player.setScale(1.2),
            this.time.addEvent({
              delay: 200,
              callback: () => {
                (bolausada = true), bolaSalir.play({
                  volume:0.20
                });
              },
              loop: false,
            });
        },
        loop: false,
      });
    }

    if (hp <= 0) {
      this.gameOver();
    }

    if (ataque.isUp) {
      repetir = 0;
    }

    if (bolakey.isUp) {
      tocarbola = true;
    }

    if (ataque.isDown && tiempoataque == true && repetir == 0) {
      (espada.visible = true),
        (tiempoataque = false),

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

    espada.y = player.y - 30;

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

  salirCueva() {
    this.scene.start("final");
    this.scene.stop("hud");
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
      daño.play();

      daño1 = false;

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

  collectBola(player, bola) {
    if (bola.visible == true) {
      bola.destroy(true, true);
      BolaObtenida = true;
      powerup.play({
        volume:0.15
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
