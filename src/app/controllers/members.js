const { age, date, blood } = require('../../lib/utils')
const Member = require('../models/Member')
const Intl = require('intl')

module.exports = {

    //index
    index(req, res) {

        Member.all(function ( members ) {
            return res.render("members/index", { members })
        })
    },

    //createPage
    create(req, res) {

        return res.render("members/create")
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

            return res.render("members/edit", { member })
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