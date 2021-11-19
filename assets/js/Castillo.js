var played1 = false;
var played2 = false;
var played3 = false;
class Castillo extends Phaser.Scene {
  constructor() {
    super("castillo");
  }

  create() {
    camara = this.cameras.main;

    this.cameras.main.setBounds(0, 0, 2555, 1080);
    this.physics.world.setBounds(0, 0, 2555, 1080);

    this.add.image(1277, 540, "nivel2");
    nivel1.stop();

    drop1 = false;
    drop2 = false;
    drop3 = false;

    if ((cursors = !undefined)) {
      cursors = this.input.keyboard.createCursorKeys();
    }

    ataque = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    bolakey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    pocionkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

    jefe = this.physics.add.sprite(2220, 750, "jefe1");
    jefe.setScale(1.2);
    jefe.hp = 30;

    pocion = new Pocion({ scene: this, x: jefe.x, y: jefe.x });

    platforms = this.physics.add.staticGroup();
    platforms.create(1400, 968, "ground").setScale(1.3, 1).refreshBody();

    platforms2 = this.physics.add.staticGroup();
    platforms2.create(885, 725, "plataforma2").setScale(0.5, 0.7).refreshBody();
    platforms2
      .create(1300, 725, "plataforma2")
      .setScale(0.5, 0.7)
      .refreshBody();
    platforms2
      .create(1300, 525, "plataforma2")
      .setScale(0.5, 0.7)
      .refreshBody();
    platforms2
      .create(1100, 625, "plataforma2")
      .setScale(0.07, 0.5)
      .refreshBody();
    platforms2
      .create(1500, 625, "plataforma2")
      .setScale(0.07, 0.5)
      .refreshBody();
    platforms2
      .create(1700, 725, "plataforma2")
      .setScale(0.5, 0.7)
      .refreshBody();
    platforms2
      .create(2460, 595, "plataforma2")
      .setScale(0.5, 0.7)
      .refreshBody();

    puerta = this.physics.add.sprite(2490, 500, "puerta").setScale(0.3);

    oraculo1 = this.physics.add.sprite(885, 660, "oraculo").setScale(1.3);
    oraculo1.body.setAllowGravity(false);
    oraculo1.visible = false;
    oraculo1.hp = 15;

    oraculo2 = this.physics.add.sprite(1300, 460, "oraculo").setScale(1.3);
    oraculo2.body.setAllowGravity(false);
    oraculo2.visible = false;
    oraculo2.hp = 15;

    oraculo3 = this.physics.add.sprite(1700, 660, "oraculo").setScale(1.3);
    oraculo3.body.setAllowGravity(false);
    oraculo3.visible = false;
    oraculo3.hp = 15;

    player = this.physics.add.sprite(100, 840, "dude");
    player.setCollideWorldBounds(true);
    player.setScale(1.2);
    player.setOrigin(0.5, 1);

    espada = this.physics.add.sprite(player.x + 56, 0, "espada");
    espada.setScale(1);
    espada.body.setAllowGravity(false);
    espada.visible = false;

    salto = this.physics.add.sprite(1300, 420, "salto");
    salto.body.setAllowGravity(false);
    salto.visible = false;

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(salto, platforms);
    this.physics.add.collider(puerta, platforms2);
    this.physics.add.collider(jefe, platforms);
    this.physics.add.collider(jefe, platforms2);
    this.physics.add.collider(player, platforms2);
    this.physics.add.collider(pocion, platforms);

    this.physics.add.overlap(espada, jefe, this.golpear, null, this);
    this.physics.add.overlap(espada, jefe, this.empezarJefe, null, this);
    this.physics.add.overlap(player, salto, this.collectSalto, null, this);
    this.physics.add.overlap(player, jefe, this.daño, null, this);
    this.physics.add.overlap(player, puerta, this.entrarCueva, null, this);
    this.physics.add.overlap(player, pocion, this.collectPocion, null, this);

    this.physics.add.overlap(
      espada,
      oraculo1,
      this.golpearOraculo1,
      null,
      this
    );
    this.physics.add.overlap(
      espada,
      oraculo2,
      this.golpearOraculo2,
      null,
      this
    );
    this.physics.add.overlap(
      espada,
      oraculo3,
      this.golpearOraculo3,
      null,
      this
    );
    this.physics.add.overlap(player, jefe, this.daño, null, this);
  }

  update() {
    if (jefe.hp > 0) {
      pocion.x = jefe.x;
      pocion.y = jefe.y - 40;
    }

    if (
      Phaser.Math.Distance.Between(jefe.x, jefe.y, player.x, player.y) <
        10000 &&
      dañojefe1 == false &&
      empezar == 0
    ) {
      // if player to left of enemy AND enemy moving to right (or not moving)
      if (player.x < jefe.x && jefe.body.velocity.x >= 0) {
        // move enemy to leftjefe
        jefe.body.velocity.x = -105;
        jefe.anims.play("left1", true);
      }
      // if player to right of enemy AND enemy moving to left (or not moving)
      else if (player.x > jefe.x && jefe.body.velocity.x <= 0) {
        // move enemy to right
        jefe.body.velocity.x = 105;
        jefe.anims.play("right1", true);
      }
    }

    if (player.x > 1600) {
      this.cameras.main.setBounds(634, 0, 1286, 1080);
      this.physics.world.setBounds(634, 0, 1925, 1080);
    }

    if (empezar == 1) {
      empezar = 0;
      this.oraculos();
    }

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

    if (
      bolakey.isDown &&
      BolaObtenida == true &&
      bolausada == true &&
      tocarbola == true &&
      player.body.blocked.down
    ) {
      tocarbola = false;
      bolausada = false;
      player.setScale(0.5);

      this.time.addEvent({
        delay: 1000, // ms
        callback: () => {
          player.setScale(1.2),
            this.time.addEvent({
              delay: 200,
              callback: () => {
                bolausada = true;
              },
              loop: false,
            });
        },
        loop: false,
      });
    }

    console.log(hp);

    if (hp <= 0) {
      this.gameOver();
    }

    if (oraculo1.hp == 0) {
      oraculo1.visible = false;
      if (played1 == false) {
        morirEnemigo.play();
        played1 = true;
      }
    }

    if (oraculo2.hp == 0) {
      oraculo2.visible = false;
      if (played2 == false) {
        morirEnemigo.play();
        played2 = true;
      }
    }

    if (oraculo3.hp == 0) {
      oraculo3.visible = false;
      if (played3 == false) {
        morirEnemigo.play();
        played3 = true;
      }
    }

    if (ataque.isUp) {
      repetir = 0;
    }

    if (
      oraculo1.hp == 0 &&
      oraculo2.hp == 0 &&
      oraculo3.hp == 0 &&
      jefe.hp > 0
    ) {
      oraculo1.hp = 15;
      oraculo2.hp = 15;
      oraculo3.hp = 15;

      jefe.body.velocity.x = 0;
      jefe.anims.play("turn1", true);
      jefe.setTint(0xffff99);

      dañojefe1 = true;

      this.time.addEvent({
        delay: 4000, // ms
        callback: () => {
          if ((dañojefe1 = true) && jefe.hp > 0) {
            (dañojefe1 = false), this.oraculos(), jefe.clearTint();
          }
        },
        loop: false,
      });

      switch (fase) {
        case 1:
          fase = 2;
          played1 = false;
          played2 = false;
          played3 = false;
          break;
        case 2:
          fase = 3;

          break;
        case 3:
          if (jefe.hp > 0) {
            fase = 1;
          } else {
            fase = 4;
          }

          break;
        default:
          break;
      }
    }

    if (jefe.hp == 20 && dañohecho == 1) {
      dañohecho = 2;
      dañojefe1 = false;
    } else if (jefe.hp == 10 && dañohecho == 2) {
      dañohecho = 3;
      dañojefe1 = false;
    }

    if (jefe.hp == 0 && pocion.visible == false) {
      dañojefe1 = false;
      salto.visible = true;
      jefe.visible = false;
      empezar = 5;
      score += 4000;
      pocion.visible = true;
      jefeMorir.play();
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

  entrarCueva() {
    this.scene.start("cueva");
  }

  collectPocion(player, pocion) {
    if (pocion.visible == true) {
      pocion.destroy(true, true);
      pociones++;
      pocionPick.play();
    }
  }

  collectSalto(player, salto) {
    if (salto.visible == true) {
      salto.destroy(true, true);
      DobleSalto = true;
      powerup.play({
        volume:0.15
      });
    }
  }

  golpear(espada, jefe) {
    if (espada.visible == true && dañojefe1 == true) {
      jefe.hp = jefe.hp - 5;
      golpear.play();
    }
  }

  empezarJefe(espada, jefe) {
    if (espada.visible == true && start == true) {
      start = false;
      jefeGrito.play();
      nivel2.play({
        volume:0.15
      });

      this.time.addEvent({
        delay: 2000, // ms
        callback: () => {
          empezar = 1;
        },
        loop: false,
      });
    }
  }

  golpearOraculo1(espada, oraculo1) {
    if (espada.visible == true && oraculo1.visible == true) {
      if (oraculo1.hp > 0) {
        oraculo1.hp = oraculo1.hp - 5;
        golpear.play();
      }
    }
  }

  golpearOraculo2(espada, oraculo2) {
    if (espada.visible == true && oraculo2.visible == true) {
      if (oraculo2.hp > 0) {
        oraculo2.hp = oraculo2.hp - 5;
        golpear.play();
      }
    }
  }

  golpearOraculo3(espada, oraculo3) {
    if (espada.visible == true && oraculo3.visible == true) {
      if (oraculo3.hp > 0) {
        oraculo3.hp = oraculo3.hp - 5;
        golpear.play();
      }
    }
  }

  daño(player, jefe) {
    if (daño1 == true && empezar == 0 && jefe.visible == true) {
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

  oraculos() {
    switch (fase) {
      case 1:
        this.time.addEvent({
          delay: 3000,
          callback: () => {
            oraculo1.visible = true;
          },
          loop: false,
        });
        this.time.addEvent({
          delay: 5500,
          callback: () => {
            oraculo2.visible = true;
          },
          loop: false,
        });
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            oraculo3.visible = true;
          },
          loop: false,
        });
        break;

      case 2:
        if (dañojefe1 == false) {
          this.time.addEvent({
            delay: 3000,
            callback: () => {
              oraculo3.visible = true;
            },
            loop: false,
          });
          this.time.addEvent({
            delay: 5500,
            callback: () => {
              oraculo1.visible = true;
            },
            loop: false,
          });
          this.time.addEvent({
            delay: 8000,
            callback: () => {
              oraculo2.visible = true;
            },
            loop: false,
          });
        }
        break;
      case 3:
        if (dañojefe1 == false) {
          this.time.addEvent({
            delay: 3000,
            callback: () => {
              oraculo2.visible = true;
            },
            loop: false,
          });
          this.time.addEvent({
            delay: 5500,
            callback: () => {
              oraculo3.visible = true;
            },
            loop: false,
          });
          this.time.addEvent({
            delay: 8000,
            callback: () => {
              oraculo1.visible = true;
            },
            loop: false,
          });
        }
        break;
      default:
        break;
    }
  }
  gameOver() {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    var gameOverButton = this.add
      .image(700, 500, "gameoverclick").setScale(10,10)
      .setInteractive()
      .on(
        "pointerdown",
        () => this.scene.start("gameover"), this.scene.stop("hud")
      );
    Phaser.Display.Align.In.Center(
      gameOverButton,
      this.add.zone(400, 300, 800, 600)
    );
  }
}
