controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 100, 0)
    if (doubleShooting) {
        doubleshot = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 100, 0)
        doubleshot.y += 5
        projectile.y += -5
    }
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    status.spriteAttachedTo().destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    doubleShooting = true
    otherSprite.destroy()
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    if (Math.percentChance(7)) {
        powerUp = sprites.create(img`
            f f f f f f f f f f f f f f f f 
            f f 1 1 1 1 1 1 1 1 1 1 1 1 f f 
            f 1 1 f f f f f f f f f f 1 1 f 
            f 1 f f f f f f f f f f f f 1 f 
            f 1 f f f f f f f f f f f f 1 f 
            f 1 f 2 2 2 2 2 2 2 2 2 2 f 1 f 
            f 1 f 2 2 2 2 2 2 2 2 2 2 f 1 f 
            f 1 f f f f f f f f f f f f 1 f 
            f 1 f 2 2 2 2 2 2 2 2 2 2 f 1 f 
            f 1 f 2 2 2 2 2 2 2 2 2 2 f 1 f 
            f 1 f f f f f f f f f f f f 1 f 
            f 1 f f f f f f f f f f f f 1 f 
            f 1 f f f f f f f f f f f f 1 f 
            f 1 1 f f f f f f f f f 1 1 1 f 
            f f 1 1 1 1 1 1 1 1 1 1 1 1 f f 
            f f f f f f f f f f f f f f f f 
            `, SpriteKind.Food)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -20
    sprite.destroy()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.disintegrate, 500)
})
let statusbar: StatusBarSprite = null
let enemyship: Sprite = null
let powerUp: Sprite = null
let doubleshot: Sprite = null
let doubleShooting = false
let projectile: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . 5 5 5 
    . . . . . 9 9 9 9 9 9 9 9 5 5 5 
    . . . . 9 9 9 9 9 9 9 9 9 5 5 5 
    . 1 1 1 1 1 1 1 1 1 1 1 . . . . 
    1 1 1 1 1 1 1 1 1 1 1 1 1 . . . 
    1 1 1 1 1 1 1 1 1 1 1 1 1 . . . 
    1 1 1 1 1 1 1 1 1 1 1 6 1 . . . 
    1 1 1 1 1 1 1 1 1 1 1 6 1 . . . 
    1 1 1 1 1 1 1 1 1 1 1 1 1 . . . 
    1 1 1 1 1 1 1 1 1 1 1 1 1 . . . 
    . 1 1 1 1 1 1 1 1 1 1 1 . . . . 
    . . . . 9 9 9 9 9 9 9 9 9 5 5 5 
    . . . . . 9 9 9 9 9 9 9 9 5 5 5 
    . . . . . . . . . . . . . 5 5 5 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(2000, function () {
    enemyship = sprites.create(img`
        . . . . . 2 2 2 2 2 2 2 2 2 2 2 
        . . . . 2 2 2 2 2 2 2 . . . . . 
        . . . . 2 2 2 2 2 2 2 . . . . . 
        . . . . 2 2 2 2 2 2 2 2 2 2 2 2 
        . . . 2 2 2 2 2 2 2 2 . . . . . 
        . . 2 2 2 2 2 2 2 2 2 . . . . . 
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 . . . . . 
        2 2 2 2 2 2 2 2 2 2 2 . . . . . 
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        . . 2 2 2 2 2 2 2 2 2 . . . . . 
        . . . 2 2 2 2 2 2 2 2 . . . . . 
        . . . . 2 2 2 2 2 2 2 2 2 2 2 2 
        . . . . 2 2 2 2 2 2 2 . . . . . 
        . . . . 2 2 2 2 2 2 2 . . . . . 
        . . . . . 2 2 2 2 2 2 2 2 2 2 2 
        `, SpriteKind.Enemy)
    enemyship.x = scene.screenWidth()
    enemyship.vx = -20
    enemyship.y = randint(10, scene.screenHeight() - 10)
    statusbar = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    statusbar.attachToSprite(enemyship)
})
