// Project type
enum ProjectStatus {
  ACTIVE,
  FINISHED
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

// Project state management
type Listener = (items: Project[]) => void;

class ProjectState {
  private _listeners: Listener[] = [];
  private _projects: Project[] = [];
  private static _instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new ProjectState();
    return this._instance;
  }

  addListener(listenerFn: Listener) {
    this._listeners.push(listenerFn);
  }

  addProject(title: string, description: string, numberOfPeople: number) {
    /* const newProject = {
      id: Math.random().toString(),
      title: title,
      description: description,
      people: numberOfPeople
    }; */
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numberOfPeople,
      ProjectStatus.ACTIVE
    );

    this._projects.push(newProject);
    for (const listenerFn of this._listeners) {
      // listenerFn(this._projects.slice());
      listenerFn([...this._projects]);
    }
  }
}

const projectState = ProjectState.getInstance();

// Validation
interface IValidatable {
  value: string | number;
  // required: boolean | undefined;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: IValidatable) {
  let isValid = true;

  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (
   validatableInput.minLength != null &&
   validatableInput.minLength && typeof validatableInput.value === 'string'
  ) {
    isValid = isValid && validatableInput.value.trim().length >= validatableInput.minLength;
  }
  if (
   validatableInput.maxLength != null &&
   validatableInput.maxLength && typeof validatableInput.value === 'string'
  ) {
    isValid = isValid && validatableInput.value.trim().length <= validatableInput.maxLength;
  }
  if (validatableInput.min != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (validatableInput.max != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }

  return isValid;
}

// autobind decorator
function autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get () {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjustedDescriptor;
}

// ProjectList class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: Project[];

  constructor(private _type: 'active' | 'finished') {
    this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    this.assignedProjects = [];

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this._type}-projects`;

    projectState.addListener(
      (projects: Project[]) => {
        this.assignedProjects = projects;
        this._renderProjects();
      }
    );

    this._attach();
    this._renderContent();
  }

  private _attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }

  private _renderContent() {
    const listId = `${this._type}-projects-list`;

    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this._type.toUpperCase() + ' PROJECTS';
  }

  private _renderProjects() {
    const listEl = document.getElementById(`${this._type}-projects-list`)! as HTMLUListElement;

    for (const projectItem of this.assignedProjects) {
      const listItem = document.createElement('li');
      listItem.textContent = projectItem.title;
      listEl.appendChild(listItem);
    }
  }
}

// ProjectInput class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    // this.templateElement = <HTMLTemplateElement>document.getElementById('project-input')!;
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this._configure();
    this._attach();
  }

  private _attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }

  private _clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  private _configure() {
    // this.element.addEventListener('submit', this._submitHandler.bind(this));
    this.element.addEventListener('submit', this._submitHandler);
  }

  private _gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: IValidatable = {
      value: enteredTitle,
      required: true
    };
    const descriptionValidatable: IValidatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    };
    const peopleValidatable: IValidatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5
    };

    // if (enteredTitle.trim().length === 0 || enteredDescription.trim().length == 0 ||
    //  enteredPeople.trim().length === 0) {
    if (
      !(validate(titleValidatable) &&
      validate(descriptionValidatable) &&
      validate(peopleValidatable))
      /* !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable) */
    ) {
      window.alert('Invalid input, please try again!');
      return;
    } else {
      // return [enteredTitle, enteredDescription, parseInt(enteredPeople, 10)];
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  @autobind
  private _submitHandler(event: Event) {
    event.preventDefault();

    const userInput = this._gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, numberOfPeople] = userInput;

      // console.log(title, description, people);
      projectState.addProject(title, description, numberOfPeople);

      this._clearInputs();
    }
  }
}

const projectInput = new ProjectInput();

const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
