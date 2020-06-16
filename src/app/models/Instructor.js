const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {

    create(data, callback) {

        const query = `
            INSERT INTO instructors (
                name,
                avatar_url,
                gender,
                services,
                birth,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.services,
            date(data.birth).iso,
            date(Date.now()).iso
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Erro ao cadastrar instrutor! ${ err }`

            callback(results.rows[0])
        })
    },

    find(id, callback) {

        db.query(`SELECT * FROM instructors WHERE id = ${ id }`, function (err, results) {
            if (err) throw `Erro ao encontrar instructor! ${ err }`
            
            callback(results.rows[0])
        })
    },

    findFilter(search, callback) {
        db.query(`SELECT instructors.*, count(members) AS total_students
        FROM instructors
        LEFT JOIN members ON (members.instructor_id = instructors.id)
        WHERE instructors.name ILIKE '%${ search }%'
        OR instructors.services ILIKE '%${ search }%'
        GROUP BY instructors.id
        ORDER BY total_students DESC`, function (err, results) {
            if (err) throw `Erro ao visualizar instrutores com ${ search }! ${ err }`
            
            callback(results.rows)
        })
        
    },

    update( data, callback ) {
        const query = `
            UPDATE instructors SET
            avatar_url = ($1),
            name = ($2),
            birth = ($3),
            gender = ($4),
            services = ($5)
            WHERE id = ${ data.id }
        ` 

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Erro ao atualizar instructor! ${ err }`
            
            callback()
        })
    },

    delete(id, callback) {

        db.query(`DELETE FROM instructors WHERE id = ${ id }`, function (err, results) {
            if (err) throw `Erro ao deletar instructor! ${ err }`

            callback()
        })
    },

    paginate(params) {

        let { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(SELECT count(*) FROM instructors)
            AS total`

        if (filter) {
            filterQuery = `
            WHERE instructors.name ILIKE '%${ filter }%'
            OR instructors.services ILIKE '%${ filter }%'
            `

            totalQuery = ` (SELECT count(*) FROM instructors
            ${ filterQuery }
            ) AS total`
        }

        query = `
        SELECT instructors.*,${ totalQuery }, count(members) AS total_students
        FROM instructors
        LEFT JOIN members ON (instructors.id = members.instructor_id)
        ${ filterQuery }
        GROUP BY instructors.id
        ORDER BY total_students DESC
        LIMIT $1 OFFSET $2`

        db.query(query, [ limit, offset ], function (err, results) {
            if (err) throw `Erro ao visualizar instrutores! ${ err }`
            
            callback(results.rows)
        })
    }
}