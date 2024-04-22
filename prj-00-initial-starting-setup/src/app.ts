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
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected _listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this._listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
  private _projects: Project[] = [];
  private static _instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new ProjectState();
    return this._instance;
  }

  addProject(title: string, description: string, numberOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numberOfPeople,
      ProjectStatus.ACTIVE
    );

    this._projects.push(newProject);
    for (const listenerFn of this._listeners) {
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

// Component base class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this._attach(insertAtStart)
  }

  private _attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? 'afterbegin' : 'beforeend',
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

// ProjectItem class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
  private _project: Project;

  get people() {
    if (this._project.people === 1) {
      return '1 person';
    }
    return `${this._project.people} people`;
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this._project = project;

    this.configure();
    this.renderContent();
  }

  configure() {}

  renderContent() {
    this.element.querySelector('h2')!.textContent = this._project.title;
    this.element.querySelector('h3')!.textContent = this.people + ' assigned';
    this.element.querySelector('p')!.textContent = this._project.description;
  }
}

// ProjectList class
class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[];

  constructor(private _type: 'active' | 'finished') {
    super('project-list', 'app', false, `${_type}-projects`);

    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  configure() {
    projectState.addListener(
      (projects: Project[]) => {
        const relevantProjects: Project[] = projects.filter((project: Project) => {
          if (this._type === 'active') {
            return project.status === ProjectStatus.ACTIVE;
          }
          return project.status === ProjectStatus.FINISHED;
        })

        this.assignedProjects = relevantProjects;
        this._renderProjects();
      }
    );
  }

  renderContent() {
    const listId = `${this._type}-projects-list`;

    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
     this._type.toUpperCase() + ' PROJECTS';
  }

  private _renderProjects() {
    const listEl = document.getElementById(
      `${this._type}-projects-list`
    )! as HTMLUListElement;

    listEl.innerHTML = '';
    for (const projectItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, projectItem)
    }
  }
}

// ProjectInput class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this._submitHandler);
  }

  renderContent() {}

  private _clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
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

    if (
      !(validate(titleValidatable) &&
      validate(descriptionValidatable) &&
      validate(peopleValidatable))
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
