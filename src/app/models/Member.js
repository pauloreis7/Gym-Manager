const { date, blood } = require("../../lib/utils")
const db = require('../../config/db')
const { paginate } = require("./Instructor")

module.exports = {

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
                height,
                instructor_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
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
            data.instructor
        ]

        
        db.query(query, values, function (err, results) {
            if (err) throw `Erro ao criar membro! ${ err }`

            callback(results.rows[0])
        })
    },

    find(id, callback) {

        db.query(`SELECT members.*, instructors.name AS instructor_name 
        FROM members
        LEFT JOIN instructors ON (members.instructor_id = instructors.id)
        WHERE members.id = ${ id }`, function (err, results) {
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
            height = ($8),
            instructor_id = ($9)
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
            data.instructor
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
    },

    instructorSelectOptions(callback) {

        db.query(`SELECT name, id FROM instructors`, function (err, results) {
            if (err) throw `Erro inserir instrutores!! ${ err }`
            
            callback(results.rows)
        })
    },

    pagination(params) {

        let { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(SELECT count(*) FROM members) AS total`

            if (filter) {

                filterQuery = `
                WHERE members.name ILIKE '%${ filter }%'
                OR members.email ILIKE '%${ filter }%'
                `

                totalQuery = `(SELECT count(*) FROM members
                ${ filterQuery }) AS total`
            }

            query = `SELECT *, ${ totalQuery }
            FROM members
            ${ filterQuery }
            ORDER BY id ASC
            LIMIT $1 OFFSET $2`

            db.query(query, [ limit, offset ], function (err, results) {
                if (err) throw `Erro ao vizualizar membros! ${ err }`
                callback(results.rows)
            })
    }
}