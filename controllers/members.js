const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')
const Intl = require('intl')

//index
exports.index = function (req, res) {

    return res.render("members/index", { members: data.members })
}

//show
exports.show = function (req, res) {
    const { id } = req.params

    const findInstruc = data.members.find(function (member) {
        return member.id == id
    })

    if (!findInstruc) return res.send("Member not found!")

    const member = {
        ...findInstruc,
        birth: age(findInstruc.birth),
    }

    return res.render('members/show', { member })
}

//create
exports.create = function (req, res) {
    return res.render("./members/create")
}

//post
exports.post = function (req, res) {
    const keys = Object.keys(req.body)
    
    for (key of keys) {
        if (req.body[key] =="") {
            return res.send('Please fill all fields')
        }
    }
    
    let {avatar_url, name, birth, gender, services} = req.body
    
    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.members.length + 1)


    data.members.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if(err) return res.send("Write file error!")


        return res.redirect(`/members/${id}`)
    })

    //return res.send(req.body)
}

//edit
exports.edit = function (req, res) {
    const { id } = req.params

    const findInstruc = data.members.find(function (member) {
        return member.id == id
    })

    if (!findInstruc) return res.send("Member not found!")

    const member = {
        ...findInstruc,
        birth: date(findInstruc.birth)
    }

    return res.render("members/edit", {member})
}

//overwrite
exports.put = function (req, res) {
    const { id } = req.body
    let index = 0

    const findInstruc = data.members.find(function (member, foundIndex) {
        if (id == member.id) {
            index = foundIndex
            return true
        }

    })

    if (!findInstruc) return res.send("Member not found!")
    
    const member = {
        ...findInstruc,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }


    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file error!!")

        return res.redirect(`/members/${id}`)
    })
}

//delete
exports.delete = function (req, res) {
    const { id } = req.body

    const memberFilter = data.members.filter(function (member) {
        return member.id != id
    })

    data.members = memberFilter

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file error!!")

        return res.redirect("/members")
    })
}