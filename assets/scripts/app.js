// Ensure the class NewProject correctly initializes and the event listener is bound properly.
const submitBtn = document.querySelector('#new-project-btn');
const activeProjectsList = document.querySelector('#active-projects-list');
const finishedProjectsList = document.querySelector('#finished-projects-list');
const allProjects = [];
// const allProjectCards = [];

class NewProject {
    static id = 0;

    constructor(projectName, date, description, additionalInfo) {
        this.id = NewProject.id++;
        this._active = true;
        this.element = null;

        this.projectName = projectName;
        this.date = date;
        this.description = description;
        this.additionalInfo = additionalInfo;
    }

    createNewCard() {
        this.element = this._createCardElement();
        activeProjectsList.appendChild(this.element);
    }

    _cardElement(tag, value, parent) {
        const newElement = document.createElement(tag);
        newElement.textContent = value;
        parent.appendChild(newElement);
        return newElement;
    }

    _createCardElement() {
        const newList = document.createElement('li');
        newList.classList.add('card');
        newList.setAttribute('data-extra-info', this.additionalInfo);
        newList.setAttribute('id', this.id);

        this._cardElement('h2', this.projectName, newList);
        this._cardElement('p', this.description, newList);
        this._cardElement('p', this.date, newList);

        const projectBtnMoreInfoTag = this._cardElement('button', 'More Info', newList);
        projectBtnMoreInfoTag.classList.add('alt');
        projectBtnMoreInfoTag.addEventListener('click', () => {
            alert(`More Info: ${this.additionalInfo}`);
        });

        const projectBtnFinishTag = this._cardElement('button', 'Finish', newList);
        projectBtnFinishTag.addEventListener('click', () => {
            this.updateStatus()
        });

        return newList;
    }

    updateStatus() {
        if (this.element) {
            this._active = !this._active
            this.element.remove();
            const projectBtnFinishTag = this.element.querySelector('button:not(.alt)');

            projectBtnFinishTag.textContent = this._active ? 'Finish' : 'Activate';
            (this._active ? activeProjectsList : finishedProjectsList).appendChild(this.element);
        }
    }
}


submitBtn.addEventListener('click', (event) => {
    event.preventDefault();  // Prevent the form from submitting

    const projectName = document.querySelector('#new-project-name');

    if (!projectName.value.trim()) {
        alert('Please enter a project name');
        return;
    }

    const date = document.querySelector('#new-project-date');
    const description = document.querySelector('#new-project-description');
    const additionalInfo = document.querySelector('#new-project-additional-info');

    const newProject = new NewProject(
        projectName.value.trim(), 
        date.value.trim(), 
        description.value.trim(), 
        additionalInfo.value.trim()
    );
    allProjects.push(newProject);
    newProject.createNewCard();

    projectName.value = '';
    date.value = '';
    description.value = '';
    additionalInfo.value = '';
});
