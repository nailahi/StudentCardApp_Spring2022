
console.log('In Student.js');

class viewHelper {

	// Retrieve an element from the DOM
	static getElement(selector) {
		const element = document.querySelector(selector)

		return element;
	}

	// Create an element with an optional CSS class
	static createElement(tag, classNames) {
		const element = document.createElement(tag)
		
		for (var className of classNames) {
			element.classList.add(className)
		}
		return element;
	}



	static createDataRow(label, data) {
		let row = viewHelper.createElement('div', ['form-group', 'row']);
		let labelColumn = viewHelper.createElement('label', ['col-sm-2','col-form-label']);
		labelColumn.textContent = label;
		let fieldColumn = viewHelper.createElement('div', ['col-sm-10']);
		let fieldText = viewHelper.createElement('label', ['form-control-plaintext']);
		fieldText.textContent = data;
		fieldColumn.append(fieldText);
		row.append(labelColumn, fieldColumn);
		return row;
	}


}


class StudentModel {
	constructor() {
		this.initialize();
	}
	
	initialize() {
		this.getStudentData();
		
	}
	
	getStudentData() {
		console.log('In GetStudent()');
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.log(this.responseText);
				
				
				this.students = JSON.parse(this.responseText);
				
				const element = document.querySelector('#root');
				let event = new CustomEvent('GetStudentData', {detail:this.students});
				element.dispatchEvent(event);
			 
			}
		};
		xhttp.open("GET", "http://localhost:3050/api/students", true);
		xhttp.setRequestHeader("Content-type", "application/json");
		xhttp.send();
	}
	createNewStudent(Name,Class,Major) {
		console.log('In GetStudent()');
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.log(this.responseText);
				
				
				this.students = JSON.parse(this.responseText);
				
				const element = document.querySelector('#root');
				//add event handler in controller
				let event = new CustomEvent('StudentAdded', {detail:this.students});
				element.dispatchEvent(event);
			 
			}
		};
		//copy from let url to end (MVC3+4+5 48)
		let url= `http://localhost:3050/api/student/`;
		xhttp.open("POST", "http://localhost:3050/api/students", true);
		xhttp.setRequestHeader("Content-type", "application/json");
		xhttp.send(JSON.stringify({Name:nameValue, Class:classValue, Major:majorValue}));
	}

	deleteStudent(id){
		console.log('In DeleteStudent()');
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.log(this.responseText);
				
				const element = document.querySelector('#root');
				let event = new CustomEvent('StudentDeleted', {detail:'success'});
				element.dispatchEvent(event);
			 
			}

		};

		let url = `http://localhost:3050/api/student/${id}`;

		xhttp.open("DELETE", url, true);
		xhttp.setRequestHeader("Content-type", "application/json");
		xhttp.send();
	}

}

class StudentView {
	constructor() {
	//	this.createView();
		
	}
	createView(studentData) {
		
	//	consol.log(studentData);
		this.studentData = studentData;
		
		this.app = viewHelper.getElement('#root');
		let title = this.createTitle();
		let cards = this.createCards();
		
		let container = viewHelper.createElement('div', ['container']);
		container.append(title, cards);
		this.app.replaceChildren();
		this.app.append(container);
	}

	createTitle() {
		let title = viewHelper.createElement('div', ['title','h3', 'mt-4','mb-4']);
		title.textContent = 'Students: by Nailah';
		return title;
	}

	
	createCards() {
		console.log('Ready to Create Cards');
		
		let cardDeck = viewHelper.createElement('div', ['card-deck']);
		
		for(var student of this.studentData){
		
			let card = viewHelper.createElement('div', ['card']);
			card.setAttribute('onClick', 'app.handleCardClick('+student.id+');');
			
			let cardBody = viewHelper.createElement('div', ['card-body']);
			let cardTitle = viewHelper.createElement('div', ['card-title']);
			cardTitle.textContent = student.name;
			let cardText = viewHelper.createElement('p', ['card-text']);
			cardText.textContent = student.class;
		
			cardBody.append(cardTitle, cardText);
			card.append(cardBody);
			cardDeck.append(card);
		
		}
		return cardDeck;
	}

	createStudentModal(id){

		let student = this.studentData.find(x=>x.id === id);
		let modalTitle = viewHelper.getElement('#studentModalLabel');
		modalTitle.textContent = student.name;

		let classRow = this.createDataRow('Class', student.class);
		let majorRow = this.createDataRow('Major', student.major);
		let deleteRow = this.createDeleteRow(id);

		let modalBody = viewHelper.getElement('#studentModalBody');
		modalBody.replaceChildren();
		modalBody.append( classRow, majorRow, deleteRow);

		let btnFooterClose = viewHelper.createElement('button', ['btn','btn-primary']);
		btnFooterClose.setAttribute('type', 'button');
		btnFooterClose.setAttribute('data-dismiss', 'modal');
		btnFooterClose.textContent = 'Close';
		let modalFooter = viewHelper.getElement('#studentModalFooter');
		modalFooter.replaceChildren();
		modalFooter.append(btnFooterClose);

		const modal = document.querySelector('#studentModal');
		$('#studentModal').modal('toggle');

	}
	createAddModal(){
		let modalTitle = viewHelper.getElement('#studentModalLabel');
		modalTitle.textContent = 'add student';

		let nameRow = this.createInputRow('Name','placeholder');
		let classRow = this.createInputRow('Class','placeholder' );
		let majorRow = this.createInputRow('Major','placeholder' );

		let modalBody = viewHelper.getElement('#studentModalBody');
		modalBody.replaceChildren();
		modalBody.append( nameRow, classRow, majorRow);

		let btnFooterClose = viewHelper.createElement('button', ['btn','btn-secondary']);
		btnFooterClose.setAttribute('type', 'button');
		btnFooterClose.setAttribute('data-dismiss', 'modal');
		btnFooterClose.textContent = 'Close';
		//submit button
		let btnSubmit = viewHelper.createElement('button', ['btn','btn-primary']);
		btnSubmit.setAttribute('type', 'button');
		btnSubmit.setAttribute('onClick', 'app.handleSubmit()');
		btnSubmit.textContent = 'Submit';
		let modalFooter = viewHelper.getElement('#studentModalFooter');
		modalFooter.replaceChildren();
		modalFooter.append(btnFooterClose,btnSubmit);

		const modal = document.querySelector('#studentModal');
		$('#studentModal').modal('toggle');

	}

	createDataRow(label, data) {
		let row = viewHelper.createElement('div', ['form-group', 'row']);
		let labelColumn = viewHelper.createElement('label', ['col-sm-2','col-form-label']);
		labelColumn.textContent = label;
		let fieldColumn = viewHelper.createElement('div', ['col-sm-10']);
		let fieldText = viewHelper.createElement('label', ['form-control-plaintext']);
		fieldText.textContent = data;
		fieldColumn.append(fieldText);
		row.append(labelColumn, fieldColumn);
		return row;
	}

	createDeleteRow(id) {
		let row = viewHelper.createElement('div', ['form-group', 'row']);
		let labelColumn = viewHelper.createElement('label', ['col-sm-2','col-form-label']);
		labelColumn.textContent = '';
		let fieldColumn = viewHelper.createElement('div', ['col-sm-10']);

		let button = viewHelper.createElement('button', ['btn','btn-secondary']);
		button.textContent = 'Delete';
		button.setAttribute('onClick', 'app.handleDeleteCard('+id+');');
		fieldColumn.append(button);
		row.append(labelColumn, fieldColumn);
		return row;
	}
	createInputRow(label, data) {
		let row = viewHelper.createElement('div', ['form-group', 'row']);
		let labelColumn = viewHelper.createElement('label', ['col-sm-2','col-form-label']);
		labelColumn.textContent = label;
		let fieldColumn = viewHelper.createElement('div', ['col-sm-10']);
		let fieldText = viewHelper.createElement('input', ['form-control']);
		fieldText.setAttribute('id', label);
		fieldText.textContent = data;
		fieldColumn.append(fieldText);
		row.append(labelColumn, fieldColumn);
		return row;
	}
	addNewStudent(id){
		let student = this.studentData.find(x=>x.id === id);
		let modalTitle = viewHelper.getElement('#studentAddModalLabel');
		modalTitle.textContent = student.name;

		let classRow = this.createDeleteRow('Type Class', InputEvent);
		let majorRow = this.createDeleteRow('Type Major', InputEvent);
		let deleteRow = this.createDeleteRow(id);

		let modalBody = viewHelper.getElement('#studentAddModalBody');
		modalBody.replaceChildren();
		modalBody.append( classRow, majorRow, deleteRow);

		let btnFooterClose = viewHelper.createElement('button', ['btn','btn-primary']);
		btnFooterClose.setAttribute('type', 'button');
		btnFooterClose.setAttribute('data-dismiss', 'modal');
		btnFooterClose.textContent = 'Cancel';
		btnFooterClose.setAttribute('type', 'button');
		btnFooterClose.setAttribute('data-save', 'modal');
		btnFooterClose.textContent = 'Submit';
		let modalFooter = viewHelper.getElement('#studentModalFooter');
		modalFooter.replaceChildren();
		modalFooter.append(btnFooterClose);

		const modal = document.querySelector('#studentModal');
		$('#studentModal').modal('toggle');
	}

	
}

class StudentController {
	constructor(model, view) {
		this.model = model;
		this.view = view;


		const element = document.querySelector('#root');
		element.addEventListener('GetStudentData', function(event) {
			app.handleStudentData(event.detail);
		});
		element.addEventListener('StudentDeleted', function(event) {
			app.handleStudentDeleted(event.detail);
		});
	}
	
	handleStudentData(student){
		console.log('create view');
		this.view.createView(student);
	}
	

	handleCardClick(id) {
		console.log('modal ' + id + ' clicked');
		this.view.createStudentModal(id);
	}
	handleAddClick() {
		console.log('modal ' + ' clicked');
		this.view.createAddModal();
	}
	handleSubmit(){
		//retrieve value of text boxes
		let Name = document.getElementById('Name').value;
		let Class = document.getElementById('Class').value;
		let Major = document.getElementById('Major').value;
		this.model.createNewStudent(Name,Class,Major);
	}


	handleDeleteCard(id) {
		console.log('modal ' + id + ' delete');
		this.model.deleteStudent(id);
	}

	handleStudentDeleted() {
		$('#studentModal').modal('toggle');
		this.model.getStudentData();
	}


}


const app = new StudentController(new StudentModel(), new StudentView());
