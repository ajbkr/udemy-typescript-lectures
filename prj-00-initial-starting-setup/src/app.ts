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

    if (enteredTitle.trim().length === 0 || enteredDescription.trim().length == 0 ||
     enteredPeople.trim().length === 0) {
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
      const [title, description, people] = userInput;

      console.log(title, description, people);

      this._clearInputs();
    }
  }
}

const projectInput = new ProjectInput();
