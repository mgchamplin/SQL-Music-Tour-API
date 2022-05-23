// DEPENDENCIES
const events = require('express').Router()
const db = require('../models')
const { Band, MeetGreet, Event, SetTime, StageEvents } = db 

// DEPENDENCIES 
const { Op } = require('sequelize')
const stageevents = require('../models/stageevents')
   
// FIND ALL EVENTS
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            
            order: [ [ 'start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        console.log("FOUND IT")
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})


events.get('/:name', async (req, res) => {
    try {
        console.log("HJER")

        const foundEvent = await Event.findOne({
            where: { name: req.params.name },
            include: [ 
                { 
                    model: MeetGreet, 
                    as: "meetgreets",
                    include :{
                        model:Band,
                        as:"bands"
                    }
                },
                { 
                    model: SetTime,
                    as: "settimes",
                },

            ]
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A EVENT
events.post('/', async (req, res) => {
    console.log("POST!")
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newEvent
        })
    } catch(err) {
        console.log("POST FAILED")
        res.status(500).json(err)
    }
})

// UPDATE A EVENT
events.put('/:id', async (req, res) => {
    console.log("PUT TIME")
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
               event_id: req.params.id
            }
        })
        console.log("ID = " + event_id)
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} event(s)`
        })
    } catch(err) {
        console.log("SOME ERROR")
        res.status(500).json(err)
    }
})

// DELETE A EVENT
events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = events