function Surveiller_niveau_sonore () {
    if (input.soundLevel() > 10) {
        radio.sendString("ON")
        basic.showIcon(IconNames.Surprised)
        basic.clearScreen()
    }
}
function EnvoyerONOFF (onoff: boolean) {
    if (onoff) {
        radio.sendString("ON")
        basic.showIcon(IconNames.Yes)
    } else {
        radio.sendString("OFF")
        basic.showIcon(IconNames.No)
    }
    basic.clearScreen()
}
input.onButtonPressed(Button.A, function () {
    ONOFFGENERAL = !(ONOFFGENERAL)
    for (let index = 0; index < 3; index++) {
        EnvoyerONOFF(ONOFFGENERAL)
        basic.pause(500)
    }
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "ON") {
        basic.showIcon(IconNames.Heart)
        ONOFFGENERAL = true
        basic.clearScreen()
    } else if (receivedString == "OFF") {
        basic.showIcon(IconNames.Skull)
        ONOFFGENERAL = false
        basic.clearScreen()
    }
})
let ONOFFGENERAL = false
radio.setGroup(1)
ONOFFGENERAL = true
let strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
basic.forever(function () {
    if (ONOFFGENERAL) {
        strip.showRainbow(1, 4)
    } else {
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
    }
})
