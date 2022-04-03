
//Typically the model will access a database of some type, but this is omitted in this example for simplicity
class StudentModel {
	constructor() {
		this.initialize();
	}

	//initialize the studentList with students
	initialize() {
		this.studentList = 
			[
				{ id: 1, name: 'Chris Gammill', class: 'Junior', major: 'Engineering' },
				{ id: 2, name: 'Amy Zion', class: 'Junior', major: 'Computer Science' },
				{ id: 3, name: 'Kenneth Findley', class: 'Senior', major: 'Computer Science' },
				{ id: 4, name: 'Jason Kastounis', class: 'Senior', major: 'Computer Science' },	
				{ id: 5, name: 'Chan Lynn', class: 'Sophmore', major: 'Computer Science' },	
			];

		this.nextId = this.studentList.length;
	}

	reserveAndGetNextId() {
		this.nextId++;
		return this.nextId;
	}


	//return all students
	getAllStudents() {
		return this.studentList;
	}

	//return the student with the specific id
	getStudentById(id) {

		return this.studentList.find(id => {
			return id == id
		})
	}

	//delete the student with the specific id
	deleteStudentById(studentId) {
		this.studentList = this.studentList.filter(function(student){return student.id != studentId});
	}

	//add student to the server list array
	//follow the syntax of the array
	createNewStudent(){
		let newStudent ={id, Name, Class, Major}
		this.studentList.push(newStudent);
	}
	


}

module.exports = StudentModel;