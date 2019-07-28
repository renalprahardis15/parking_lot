"use strict"

const security = require('./security')

var db = []
module.exports.db = db

    exports.initInstruction = (maxSlot) => {
        if (security.initInstructionSanitation(maxSlot)) {
            for (let i = 0; i < maxSlot; i++) {
                db.push({
                    'noSlot': i + 1,
                    'noRegist': '',
                    'colour': ''
                })
            }
            console.log(`Successfully to create ${maxSlot} slot.`)
            return 200
        } else {
            console.log("[ERROR] create slot failed.", `[${maxSlot}]`)
            return 400
        }
    }


    exports.inputInstruction = (NoRegist, Colour) => {
        var slotNumbMin = Number.MAX_SAFE_INTEGER
        let availableSpace = false

        for (let i = 0; i < db.length; i++) {
            const dataRow = db[i]
            let tmpMin = dataRow.noSlot


            if (tmpMin < slotNumbMin) {
                if (!dataRow.noRegist && !dataRow.colour) {
                    availableSpace = true
                    slotNumbMin = tmpMin
                    break
                }
            }
        }

        if (availableSpace) {
            db[slotNumbMin - 1].noRegist = NoRegist
            db[slotNumbMin - 1].colour = Colour
            console.log(`Car [${NoRegist}] [${Colour}] in slot number [${slotNumbMin}]`)
            return 200
        } else {
            console.log(`[ERROR] Sorry, slot is full.`)
            return 500
        }

    }

    exports.statusInstruction = (instruction) => {
        if (instruction.length > 1) {
            console.log('[WARNING] "status" take no parameter. Another parameter after "status" will be ignored.')
        }
        console.log('Showing all slot status \n')
        this.prettyPrintDB(db)
        return 200
    }


    exports.leaveInstruction = (lockerNo) => {
        if (security.leaveInstructionSanitation(lockerNo)) {

            for (let i = 0; i < db.length; i++) {
                const dataRow = db[i];
                if (dataRow.noSlot === (parseInt(lockerNo))) {
                    dataRow.noRegist = '';
                    dataRow.colour = '';

                }
            }
            console.log(`Slot number [${lockerNo}] was successfully emptied. `)
            return 200
        } else {
            console.log("[ERROR] Leave failed.", `"${lockerNo}"`)
            return 400
        }
    }

    exports.regisInstruction = (Colour) => {
        console.log(`Searching colour [${Colour}]`)
        var foundRow = []
        for (let i = 0; i < db.length; i++) {
            const dataRow = db[i];
            if (dataRow.colour === Colour) {
                foundRow.push(dataRow.noRegist)
            }
        }
        if (foundRow.length < 1) {
            console.log(`Searching ${Colour} is not found.`)
            return 404
        } else {
            foundRow = foundRow.toString();
            foundRow = foundRow.replace((/,/g, ", "))
            console.log(`Show founded car with type of ${Colour}\n`, foundRow)
            return 200
        }
    }

    exports.slotforColour = (Colour) => {
        console.log(`Searching colour [${Colour}]`)
        var foundRow = []
        for (let i = 0; i < db.length; i++) {
            const dataRow = db[i];
            if (dataRow.colour === Colour) {
                foundRow.push(dataRow.noSlot)
            }
        }
        if (foundRow.length < 1) {
            console.log(`Searching ${Colour} is not found.`)
            return 404
        } else {
            foundRow = foundRow.toString();
            foundRow = foundRow.replace((/,/g, ", "))
            console.log(`Show founded car with colour of ${Colour}\n`, foundRow)
            return 200
        }
    }

    exports.slotforRegist = (NoRegist) => {
        console.log(`Searching No Registration [${NoRegist}]`)
        var foundRow = []
        for (let i = 0; i < db.length; i++) {
            const dataRow = db[i];
            if (dataRow.noRegist === NoRegist) {
                foundRow.push(dataRow.noSlot)
            }
        }
        if (foundRow.length < 1) {
            console.log(`Searching ${NoRegist} is not found.`)
            return 404
        } else {
            foundRow = foundRow.toString();
            foundRow = foundRow.replace((/,/g, ", "))
            console.log(`Show founded car with No Registration of ${NoRegist}\n`, foundRow)
            return 200
        }
    }


    exports.prettyPrintDB = (db) => {
        console.log("Slot No.\t", "Registration No\t", "Colour")
        for (let i = 0; i < db.length; i++) {
            const row = db[i];
            const strSlotNumb = row.noSlot.toString()
            const strnoReg = row.noRegist.toString()
            const strcolour = row.colour.toString()

            console.log(strSlotNumb + '\t\t', strnoReg + '\t\t', strcolour)
        }

    }
