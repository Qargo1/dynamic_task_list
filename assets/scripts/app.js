const submitBtn = document.querySelector('#new-project-btn');
const activeProjectsList = document.querySelector('#active-projects-list');
const finishedProjectsList = document.querySelector('#finished-projects-list');
allProjects = [];

class Project {
    static id = 0;

    constructor(name, date, description, additionalInfo) {
        this.id = Project.id++;
        this.isActive = true;
        this.element = null;

        this.name = name;
        this.date = date;
        this.description = description;
        this.additionalInfo = additionalInfo;
    }

    toggleStatus() {
        this._active = !this._active;
        this.render();
    }

    createCardElement() {
        const card = document.createElement('li');
        card.classList.add('card');
        card.setAttribute('data-extra-info', this.additionalInfo);
        card.setAttribute('id', this.id);
        
        const createCardContent = (tag, text) => {
            const element = document.createElement(tag);
            element.textContent = text;
            card.appendChild(element);
            return element;
        }

        createCardContent('h2', this.name);
        createCardContent('p', this.description);
        createCardContent('p', this.date);
        
        const moreInfoBtn = createCardContent('button', 'More Info');
        moreInfoBtn.classList.add('alt');
        moreInfoBtn.addEventListener('click', () => {
            alert(`More Info: ${this.additionalInfo}`);
        });
        
        const statusBtn = createCardContent('button', 'Finish');
        statusBtn.addEventListener('click', () => {
            this.toggleStatus()
            statusBtn.textContent = this._active ? 'Finish' : 'Activate';
        });
        
        this.element = card;
        this.render();
    }

    render() {
        if (this.element) {
            this.element.remove();
        }
        (this._active ? finishedProjectsList : activeProjectsList).appendChild(this.element);
    }
}

class App {
    static init() {
        const name = document.querySelector('#new-project-name').value.trim();
        const date = document.querySelector('#new-project-date').value.trim();
        const description = document.querySelector('#new-project-description').value.trim();
        const additionalInfo = document.querySelector('#new-project-additional-info').value.trim();

        if (!name) {
            alert('Please enter a project name');
            return;
        }

        const project = new Project(name, date, description, additionalInfo);
        allProjects.push(project);
        project.createCardElement();
        App.clearInputs();
    };

    static clearInputs() {
        document.querySelector('#new-project-name').value = '';
        document.querySelector('#new-project-date').value = '';
        document.querySelector('#new-project-description').value = '';
        document.querySelector('#new-project-additional-info').value = '';
    }
}

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();  // Prevent the form from submitting
    App.init();
});
