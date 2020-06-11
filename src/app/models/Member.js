const { date, blood } = require("../../lib/utils")
const db = require('../../config/db')

module.exports = {

    all(callback) {

        db.query(`SELECT * FROM members ORDER BY name ASC`, function (err, results) {
            if (err) throw `Erro ao visualizar membros! ${ err }`

            callback(results.rows)
        })
    },

    create(data, callback) {

        const query = `
            INSERT INTO members (
                name,
                avatar_url,
                gender,
                email,
                birth,
                blood,
                weight,
                height
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.email,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height,
        ]

        
        db.query(query, values, function (err, results) {
            if (err) throw `Erro ao criar membro! ${ err }`

            callback(results.rows[0])
        })
    },

    find(id, callback) {

        db.query(`SELECT * FROM members WHERE id = ${ id }`, function (err, results) {
            if (err) throw `Erro ao encontrar membro! ${ err }`

            callback(results.rows[0])
        })
    },

    update(data, callback) {
        const query = `
            UPDATE members SET
            name = ($1),
            avatar_url = ($2),
            gender = ($3),
            email = ($4),
            birth = ($5),
            blood = ($6),
            weight = ($7),
            height = ($8)
            WHERE id = ${ data.id }
        `

        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.email,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height,
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Erro ao atualizar membro! ${ err }`

            callback()
        })
    },

    delete(id, callback) {

        db.query(`DELETE FROM members WHERE id = ${ id }`, function (err, results) {
            if (err) throw `Erro ao deletar membro! ${ err }`

            callback()
        })
    }
}