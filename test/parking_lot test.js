const assert = require('chai').assert;
const app = require('../src/controller')
const fs = require('fs')
var content;
var data = [];

const path = __dirname + '/parking_lot file_inputs.txt';

content = fs.readFileSync(path, { encoding: 'utf-8' })
data = content.split('\r\n')
console.log(data)

describe('App', () => {
    it('App should give slot', () => {
        var result = app.initInstruction(6)
        assert.equal(result, 200);
    });

    const dataPark = data.slice(1, 7)


    for (let i = 0; i < dataPark.length; i++) {
        let noRegis = dataPark[i].split(' ')[1]
        let colour = dataPark[i].split(' ')[2]
        it('Test for park', () => {
            const result = app.inputInstruction(noRegis, colour);
            assert.equal(result, 200);
        });
    }

    it('Test for leave', () => {
        const result = app.leaveInstruction(4);
        assert.equal(result, 200);
    });

    it('Test for Status instruction', () => {
        const result = app.statusInstruction(data);
        assert.equal(result, 200);
    })

    var dataPark2 = data.slice(9, 11)

    for (let i = 0; i < dataPark2.length; i++) {
        let noRegis = dataPark2[i].split(' ')[1]
        let colour = dataPark2[i].split(' ')[2]
        it('Test for park', () => {
            const result = app.inputInstruction(noRegis, colour);
            if (result === 500) {
                assert.equal(result, 500);
            } else {
                assert.equal(result, 200);
            }
        });
    }

    it('Test for Registration instruction', () => {
        const result = app.regisInstruction('White');
        assert.equal(result, 200);
    })

    it('Test for slotforColour instruction', () => {
        const result = app.slotforColour('White');
        assert.equal(result, 200);
    })

    var slotRegist = data.slice(13, 15)

    for (let i = 0; i < slotRegist.length; i++) {
        let noRegis = dataPark[i].split(' ')[1]
        it('Test for slotforRegist instruction', () => {
            const result = app.slotforRegist(noRegis);
            assert.equal(result, 200);
        })
    }
})

