// const app = require('./app')
const rl = require('readline')
const security = require('./security')
const controller = require('./controller')
var db = controller.db

    const readline = rl.createInterface({
        input: process.stdin,
        output: process.stdout
    })

console.log("Parking Slot")
prefix()

readline.on('line', (input) => {
    var instruction = security.sanitizeCommand(input)

    if (instruction === false) {
        prefix()
    } else {
        if (instruction[0] === 'exit') {
            exitInstruction()
        } else {
            if (security.isInitialized(db)) {
                switch (instruction[0]) {
                    case 'create_parking_lot':
                        console.log('[WARNING] Data locker has been initialized. No more creation are made. Last init : \n', controller.prettyPrintDB(db))
                        prefix()
                        break
                    case 'park':
                        controller.inputInstruction(instruction[1], instruction[2])
                        prefix()
                        break
                    case 'status':
                        controller.statusInstruction(instruction)
                        prefix()
                        break
                    case 'leave':
                        controller.leaveInstruction(instruction[1])
                        prefix()
                        break
                    case 'registration_numbers_for_cars_with_colour':
                        controller.regisInstruction(instruction[1])
                        prefix()
                        break
                    case 'slot_numbers_for_cars_with_colour':
                        controller.slotforColour(instruction[1])
                        prefix()
                        break
                    case 'slot_number_for_registration_number':
                        controller.slotforRegist(instruction[1])
                        prefix()
                        break
                    case '':
                        prefix()
                        break
                    default:
                        console.log(`"${instruction[0]}" Command is not found.`)
                        prefix()
                        break
                }
            } else {
                switch (instruction[0]) {
                    case 'create_parking_lot':
                        controller.initInstruction(instruction[1])
                        prefix()
                        break
                    case '':
                        prefix()
                        break
                    default:
                        console.log('[WARNING] Data locker has not been initialized yet => ', controller.prettyPrintDB(db))
                        console.log('[WARNING] Only "init <maximum Number of Locker>" instruction is permitted ', instruction)
                        prefix()
                        break
                }
                prefix()
            }
        }
    }
}).on('close', () => {
    console.log('Program Closed. Thanks. Bye!')
    process.exit()
})

function exitInstruction() {
    readline.question('> Are you sure want to exit? (Y/n) ', answer => {
        if (answer === 'n') {
            prefix()
        } else if (answer === '\n' || answer === 'Y') {
            console.log('Thanks. Bye!')
            process.exit()
        } else {
            console.log('Please answer "Y"/[ENTER] to exit or "n" to cancel.')
        }
    })
}

function prefix() {
    readline.setPrompt('> ', 2)
    readline.prompt()
}

