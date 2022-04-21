var StudentModel = require('../models/studentModel');
StudentModel = new StudentModel();


const path = require("path");


// Display list of all students.
exports.student_list = function(req, res) {
	students = StudentModel.getAllStudents();
	res.send(students);	
};

// Display detail page for a specific student.
exports.student_detail = function(req, res) {
	student = StudentModel.getStudentById(req.params.id);
	res.send(student);
};

// Delete a specific student.
exports.student_delete = function(req, res) {
	StudentModel.deleteStudentById(req.params.id);
	result = {result:'success'}
    res.send(result);
};

//Update Student List
exports.student_update_post = function(req,res){
    student = this.studentModel.updateStudent(req.params.id, req.body);
    result = {result:`success`};
    res.send(result);
}



//NOT IMPLEMENTED

// Display student create form on GET.
exports.student_create_get = function(req, res) {
    student= this.StudentModel.getStudentById(req.body.name, req.body.class, req.body.major);
    result = {result:'sucess'}
    res.send(result);
};

// Handle student create on POST.
//MVC slide 49
exports.student_create_post = function(req, res) {
    //if the data is JSON, access the data using req.body.<field> ie. req.body.name
    student = this.studentModel.createStudent(req.body.Name, req.body.Class, req.body.Major);
    result = {result:'success'}
    res.send(result);
};

// Display student delete form on GET.
exports.student_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: student delete GET');
};

// Handle student delete on POST.
exports.student_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: student delete POST');
};

// Display student update form on GET.
exports.student_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: student update GET');
};

// Handle student update on POST.
exports.student_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: student update POST');
};