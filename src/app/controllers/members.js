const { age, date, blood } = require('../../lib/utils')
const Member = require('../models/Member')
const Intl = require('intl')

module.exports = {

    //index
    index(req, res) {

        let { filter, page, limit } = req.query

            page = page || 1,
            limit = limit || 3
        let offset = limit * (page - 1)

        // console.log(offset)
        const params = {
            filter,
            page,
            limit,
            offset,
            callback (members) {

                 const pagination = {
                     total: Math.ceil(members[0].total / limit),
                    page
                 }

                return res.render("members/index", { members, pagination, filter })
            }
        }

        Member.pagination(params)
    },

    //createPage
    create(req, res) {

        Member.instructorSelectOptions(function (options) {
            
            return res.render("members/create", { instructorOptions: options })
        })

    },

    //createUser
    post(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] =="") {
                return res.send('Please fill all fields')
            }
        }

        Member.create(req.body, function (member) {
            return res.redirect(`members/${ member.id }`)
        })
        
    },

    //showData
    show(req, res) {

        Member.find(req.params.id, function (member) {
            if (!member) return res.send("Membro não encontrado!")
            
            member.birth = date(member.birth).birthDate
            member.blood = blood(member.blood)

            return res.render("members/show", { member })
        })
    },

    //editPage
    edit(req, res) {

        Member.find(req.params.id, function (member) {
            if (!member) return res.send("Membro não encontrado!")

            member.birth = date(member.birth).iso

            Member.instructorSelectOptions(function (options) {
                return res.render("members/edit", { member, instructorOptions: options })
            })
        })
    },

    //putUser
    put(req, res) {

        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] =="") {
                return res.send('Please fill all fields')
            }
        }

        Member.update(req.body, function () {
            
            return res.redirect(`/members/${ req.body.id }`)
        })
    },

    //deleteUser
    delete(req, res) {

        Member.delete(req.body.id, function () {
            
            return res.redirect("/members")
        })
    },
}