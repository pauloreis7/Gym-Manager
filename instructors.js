const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')
const Intl = require('intl')

//index
exports.index = function (req, res) {

    return res.render("instructors/index", { instructors: data.instructors })
}

//show
exports.show = function (req, res) {
    const { id } = req.params

    const findInstruc = data.instructors.find(function (instructor) {
        return instructor.id == id
    })

    if (!findInstruc) return res.send("Instructor not found!")

    const instructor = {
        ...findInstruc,
        birth: age(findInstruc.birth),
        services: findInstruc.services.split(","),
        created_at: new Intl.DateTimeFormat('pt-BR').format(findInstruc.created_at),
    }

    return res.render('instructors/show', { instructor })
}

//create
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
    const id = Number(data.instructors.length + 1)


    data.instructors.push({
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


        return res.redirect(`/instructors/${id}`)
    })

    //return res.send(req.body)
}

//edit
exports.edit = function (req, res) {
    const { id } = req.params

    const findInstruc = data.instructors.find(function (instructor) {
        return instructor.id == id
    })

    if (!findInstruc) return res.send("Instructor not found!")

    const instructor = {
        ...findInstruc,
        birth: date(findInstruc.birth)
    }

    return res.render("instructors/edit", {instructor})
}

//overwrite
exports.put = function (req, res) {
    const { id } = req.body
    let index = 0

    const findInstruc = data.instructors.find(function (instructor, foundIndex) {
        if (id == instructor.id) {
            index = foundIndex
            return true
        }

    })

    if (!findInstruc) return res.send("Instructor not found!")
    
    const instructor = {
        ...findInstruc,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }


    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file error!!")

        return res.redirect(`/instructors/${id}`)
    })
}

//delete
exports.delete = function (req, res) {
    const { id } = req.body

    const instructorFilter = data.instructors.filter(function (instructor) {
        return instructor.id != id
    })

    data.instructors = instructorFilter

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file error!!")

        return res.redirect("/instructors")
    })
}