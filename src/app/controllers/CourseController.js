const Course = require("../models/Course")

class CourseController{
    show(req, res, next){
        Course.findOne({slug: req.params.slug}).lean()
            .then(course => res.render('courses/show', {course}))
            .catch(next)
    }
    create(req, res, next){
        res.render('courses/create')
    }
    stored(req, res, next){
        const formData = req.body
        // formData.image = 'https://cdn.fullstack.edu.vn/f8-production/courses/2.png'
        const course = new Course(formData)
        course.save()
            .then(() => res.redirect('/'))
            .catch(err => {

            })
    }
    edit(req, res, next){
        Course.findById(req.params.id).lean()
            .then(course => res.render('courses/edit', { course }))
            .catch(next)
    }
    update(req, res, next){
       Course.updateOne({_id: req.params.id}, req.body) 
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }
    delete(req, res, next){
        Course.deleteOne({_id: req.params.id}).lean() 
             .then(() => res.redirect('/me/stored/courses'))
             .catch(next)
     }
}

module.exports = new CourseController