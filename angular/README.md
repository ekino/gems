# Angular Best Practices
This document contains a collection of best practices for developing Angular applications. Following these guidelines will help ensure your code is clean, maintainable, and follows the conventions of the Angular framework. 

*As new features and updates are released for Angular, we will continue to add relevant best practices for them.*

## Table of Contents

1. [Single Responsibility Principle](#single-responsibility-principle)
1. [Follow Consistent Angular Coding Styles](#follow-consistent-angular-coding-styles)
1. [Keep Up to Date](#keep-up-to-date)
1. [Strict Mode](#strict-mode)
1. [Use Angular CLI](#use-angular-cli)
1. [Use State Management](#use-state-management)
1. [Use Environment Variables](#use-environment-variables)
1. [Divide Imports](#divide-imports)
1. [Prefer Observables Over Promises](#prefer-observables-over-promises)
1. [Component Properties and Methods Order](#component-properties-and-methods-order)
1. [Lifecycle Hooks Interfaces and Order](#lifecycle-hooks-interfaces-and-order)
1. [Write Logic Outside Lifecycle Hook](#write-logic-outside-lifecycle-hook)
1. [Component Event Names Rules](#component-event-names-rules)
1. [HTML Wrapping and Order](#html-wrapping-and-order)
1. [Wrap Pipes Within Parenthesis](#wrap-pipes-within-parenthesis)
1. [Avoid Logic in Templates](#avoid-logic-in-templates)
1. [Prevent Memory Leaks](#prevent-memory-leaks)
1. [Subscribe in Template Using async Pipe](#subscribe-in-template-using-async-pipe)
1. [Use Change Detection OnPush](#use-change-detection-onpush)
1. [Avoid Having Subscriptions Inside Subscriptions](#avoid-having-subscriptions-inside-subscriptions)
1. [Use trackBy Along With ngFor](#use-trackby-along-with-ngfor)
1. [Strings Should Be Safe](#strings-should-be-safe)
1. [Avoid any Type](#avoid-any-type)
1. [Use Mandatory Inputs](#use-mandatory-inputs)
1. [Do Not Pass Streams to Components Directly](#do-not-pass-streams-to-components-directly)
1. [Do Not Pass Streams to Services](#do-not-pass-streams-to-services)
1. [Do Not Expose Subjects](#do-not-expose-subjects)
1. [Handle RxJS Errors](#handle-rxjs-errors)
1. [Avoid Changing the DOM Directly](#avoid-changing-the-dom-directly)
1. [Avoid Computing Values in the Template](#avoid-computing-values-in-the-template)
1. [Use Immutability](#use-immutability)
1. [Safe Navigation Operator in HTML Template](#safe-navigation-operator-in-html-template)
1. [Sanitize Untrusted Values](#sanitize-untrusted-values)
1. [Use InjectionToken for Dependency Injection](#use-injectiontoken-for-dependency-injection)
1. [Prevent Importing Module in Feature Modules](#prevent-importing-module-in-feature-modules)
1. [Break Down Into Small Reusable Components](#break-down-into-small-reusable-components)
1. [Use Smart and Dumb Components](#use-smart-and-dumb-components)
1. [Use Lazy Loading](#use-lazy-loading)
1. [Use index.ts](#use-index.ts)
1. [Isolate API Hacks](#isolate-api-hacks)
1. [Cache API Calls](#cache-api-calls)
1. [Provide Private Services](#provide-private-services)
1. [Avoid Risky Angular APIs](#avoid-risky-angular-apis)
1. [Avoid Poorly Structured CSS](#avoid-poorly-structured-css)
1. [Lack of Meaningful Unit Tests](#lack-of-meaningful-unit-tests)
1. [Avoid Useless Code Comments](#avoid-useless-code-comments)
1. [Remove Unused Code](#remove-unused-code)
1. [Avoid Using Third-Party Libraries](#avoid-using-third-party-libraries)
1. [Base Component Classes](#base-component-classes)
1. [Do Not Remove View Encapsulation](#do-not-remove-view-encapsulation)
1. [Analyze the Bundle Size](#analyze-the-bundle-size)
1. [Use CSP To Prevent XSS](#use-csp-to-prevent-xss)
1. [Use ECMAScript Features](#use-ecmascript-features)
1. [Use Reactive Forms](#use-reactive-forms)
1. [Use CDK Virtual Scroll](#use-cdk-virtual-scroll)
1. [Use Angular Service Workers and PWA](#use-angular-service-workers-and-pwa)
1. [Use Angular Universal](#use-angular-universal)
1. [Use Lint Rules](#use-lint-rules)
1. [Use Storybook](#use-storybook)
1. [Use Angular DevTools Chrome Extension](#use-angular-devtools-chrome-extension)
1. [Use Dependency Injection Functions Instead of Constructors](#use-dependency-injection-functions-instead-of-constructors)
1. [Use Standalone Components](#use-standalone-components)
1. [Use ng-template](#use-ng-template)
1. [Use Schematics for Migration](#use-schematics-for-migration)
1. [Use HttpContext in Interceptor](#use-httpcontext-in-interceptor)
1. [Use Control Flow](#use-control-flow)
1. [Use @defer](#use-defer)
1. [Signals API](#signals-api)
1. [Limiting the Use of Effects in Angular](#limiting-the-use-of-effects-in-angular)

## Single Responsibility Principle

It is essential to avoid defining multiple components, services, or directives in a single file. Each file should handle **one specific responsibility**.

**Why?**: This practice keeps the code organized, easier to read, and more maintainable.

## Follow Consistent Angular Coding Styles

Here are some rules we need to follow to maintain proper coding standards in our project:

- **Limit files to 400 lines of code**.
- **Keep functions small** and limit them to no more than 75 lines.
- **Use consistent naming conventions** for all symbols. The recommended pattern is `feature.[type].ts`.
- **Use `const`** when variable values remain unchanged.
- **Use dashes (`-`)** to separate words in descriptive names and dots (`.`) to separate the name from its type. Example: `movie-list.component.ts`.
- **Use lower camel case** for property and method names.
- **Leave one empty line** between import groups, such as third-party and application imports, and between third-party and custom modules.

For more information read it on [Angular coding style guide](https://angular.dev/style-guide)

## Keep Up to Date

Angular follows **semantic versioning**, with a new major version released every 6 months.

Semantic versioning uses the format `major.minor.patch` to track software versions. Angular updates each part based on the type of change—whether it’s a `major`, `minor`, or `patch` update.

Stay informed about the latest Angular releases by checking the [CHANGELOG](https://github.com/angular/angular/blob/master/CHANGELOG.md). Keeping your Angular version up to date ensures access to new features, bug fixes, and performance improvements like Ivy.

When upgrading your project, use [this official tool](https://update.angular.dev) to guide the process.


## Strict Mode

The Angular team introduced the option to apply **strict mode** progressively starting with Angular 10.

As of Angular 12, all new projects have strict mode enabled by default.

You should verify if your project is using strict mode, and if not, update it to enable strict mode.

**Why?**: This allows you to leverage TypeScript’s type system within your templates and follow best practices recommended by the Angular team.


```json
{
  "compilerOptions": {
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```
## Use Angular CLI

[Angular CLI](https://angular.dev/cli) is one of the most powerful tools available for developing Angular apps. It simplifies application creation while adhering to best practices. 

Angular CLI is a command-line interface tool used to initialize, develop, scaffold, maintain, test, and debug Angular applications.

Instead of manually creating files and folders, use Angular CLI to generate new `components`, `directives`, `modules`, `services`, `pipes`, and more.


```shell
# Install Angular CLI
npm i -g @angular/cli

# Check Angular CLI version
ng version
```

## Use State Management

One of the most challenging aspects of software development is **state management**. In Angular, state management helps manage state transitions by storing the state of various data.

There are several state management libraries available for Angular, such as [NGRX](https://ngrx.io), [NGXS](https://www.ngxs.io), [Redux Angular](https://github.com/reduxjs/angular-redux) and [Akita](https://datorama.github.io/akita), each serving different purposes and use cases.

Choosing the right state management solution for your application is crucial before implementation.

### Benefits of using state management:
1. Enables sharing data between different components
2. Provides centralized control for state transitions
3. Keeps the code clean and more readable
4. Simplifies debugging when issues arise
5. Dev tools are available for tracing and debugging state management libraries

However, the use of state management should be justified and only applied in projects where managing the state is global and complex. It’s recommended to consult an Angular expert to make the best choice for your application.

## Use Environment Variables

Angular provides **environment configurations** to define variables specific to each environment. The default environments are `development` and `production`. You can also add additional environments or include new variables in existing environment files.

Use this feature when your application depends on different values for different environments.

### Development environment (default)

> environment.ts

```ts
export const environment = {
  production: false,
  baseApiUrl: 'http://localhost:8080',
};
```

Production environment.

> environment.prod.ts

```ts
export const environment = {
  production: true,
  baseApiUrl: 'https://api.example.com',
};
```

## Divide Imports

Maintaining organized and neat file imports can be challenging, especially when using an IDE that auto-adds them as you type. As your files grow, imports can become messy.

It's good practice to organize imports into the following groups:

1. **Angular imports** always go at the top
2. **RxJS imports**
3. **Third-party imports** (non-core)
4. **Local/Project imports** at the end

It’s also a good practice to add a comment above each group, although it's not mandatory unless there are many imports.

```ts
// Angular.
import { ChangeDetectionStrategy, Component } from '@angular/core';

// RxJS.
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Third Parties.
import { MatDialog } from '@angular/material/dialog';

// Local.
import { AuthFacade } from '@my-project/auth';
```

## Prefer Observables Over Promises

[Observables](https://rxjs.dev/guide/observable) and the standard JavaScript [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) functionality overlap in handling asynchronous code. However, Observables offer much more than Promises. Unlike Promises, Observables can emit multiple values over time, as they represent a stream of values.

In Angular, Observables are used extensively. For instance, the Angular `HttpClient` returns Observables, even when an HTTP call can only yield a single response.

Mixing Observables with Promises is not recommended, as it leads to using two completely different implementations that are often incompatible, creating unnecessary complexity in different parts of the application.

## Component Properties and Methods Order

* **Add public and private properties** above the constructor.
* **Add public and private methods** immediately below the constructor, or after any lifecycle hooks if they are present.
* Group properties and methods with the same decorator (e.g., `@Input`, `@Output`, etc.) together, placing an empty line between groups with different decorators.


```ts
export class MyComponent implements OnInit {
  @Input() value = '';
  @Input() otherValue = '';

  @Output() valueChanged = new EventEmitter<string>();
  @Output() otherValueChanged = new EventEmitter<string>();

  @ViewChild(ChildDirective) child?: ChildDirective;

  @ViewChildren(ChildDirective) viewChildren?: QueryList<ChildDirective>;

  @ContentChild(ChildDirective) contentChild?: ChildDirective;

  @ContentChildren(ChildDirective) contentChildren?: QueryList<ChildDirective>;

  private hiddenValue = '';

  constructor() {}
  
  ngOnInit(): void {}

  @HostBinding('class.valid')
  isValid(): boolean {
    return true;
  }

  @HostListener('click', ['$event'])
  onClick(event): void {}

  myPublicFunc(): void {}
  
  private myPrivateFunc(): void {}
}
```

## Lifecycle Hooks Interfaces and Order

Adding lifecycle hook interfaces is not mandatory, but it is a recommended practice.

Ideally, lifecycle hooks should be defined in the same order they are executed, and placed after the `constructor`.


```ts
class MyComponent implements OnChanges, OnInit, DoCheck,
  AfterContentInit, AfterContentChecked, AfterViewInit,
  AfterViewChecked, OnDestroy {

  constructor() {}

  ngOnChanges(): void {}

  ngOnInit(): void {}

  ngDoCheck(): void {}

  ngAfterContentInit(): void {}

  ngAfterContentChecked(): void {}

  ngAfterViewInit(): void {}

  ngAfterViewChecked(): void {}

  ngOnDestroy(): void {}	
}
```
## Write Logic Outside Lifecycle Hook

Avoid writing logic directly within the lifecycle hooks. Instead, encapsulate the logic within **private methods** and call those methods from the lifecycle hooks.

```typescript
export class MyComponent implements OnInit {
  ngOnInit(): void {
    this.init();
  }
  
  private init(): void {
   // ...
  }
}
```

## Component Event Names Rules

Following these rules will help you decide better event names:

* **Do not prefix event/output names** with `on`. Instead, the handler can use such a prefix.
* **Always specify the entity** involved in the action, not just the action itself.  
  For example, if describing an event on a component whose **value changed**, the event name could be `valueChange`.
* **Use past tense or not** (e.g., `valueChange` or `valueChanged`), both are acceptable, but be consistent.

## HTML Wrapping and Order

Do not exceed 80 characters per column for all files, it’s simply much easier to read vertically than horizontally.

### Rules for Writing HTML Tags

* When an element has two or more attributes, write **one attribute** per line
* Attributes have to be written **in a specific order**
* Unless using a single attribute, the closing tag has to be written **on the next line**
* Add structural directives only to `ng-container` elements

Attributes order:

1. Structural directives (`*ngIf`, `*ngFor`, `*ngSwitch`)
1. Animations (`@myAnimation`)
1. Template variables (`#myElement`)
1. Static properties (`id`, `class`, `aria-label`)
1. Dynamic properties (`[id]`, `[class]`, `[attr.aria-label]`)
1. Events (`(click)`, `(myEvent)`)
1. Two-way binding (`[(value)]`)

***Why?***: This can facilitate reading through and understanding the structure of your templates.

**Before**

```html
<input #myElement (input)="onInputChanged($event)" [(value)]="myModel" *ngIf="canEdit" class="form-control" [attr.placeholder]="placeholder" @fadeIn type="text" />
```

**After**

```html
<ng-container *ngIf="canEdit"> 
  <input
    @fadeIn
    #myElement
    type="text"
    class="form-control"
    [attr.placeholder]="placeholder"
    (input)="onInputChanged($event)"
    [(value)]="myModel"
  />
</ng-container>
```

## Wrap Pipes Within Parenthesis

Wrap pipes expressions within parenthesis.

***Why?***: The feeling of division provided by the parenthesis gives a clue that the value is being transformed.

```html
<ng-container *ngIf="(movies$ | async) as movies">
  <!-- ... -->
</ng-container>
```

When using multiple pipes, it may even be more important:

```html
<input 
 [value]="(value$ | async | uppercase | trim)"
/>
```

## Avoid Logic in Templates

If you have any sort of logic in your templates, even if it is a simple && clause, it is good to extract it out into its component.

***Why?***: Having logic in the template means that it is not possible to unit test it, and therefore it is more prone to bugs when changing template code.

**Before**

```html
<p *ngIf="role === 'developer'">Status: Developer</p>
```

```ts
@Input() role?: Role;
```

**After**

```html
<p *ngIf="isDeveloper"></p>
```

```ts
isDeveloper: boolean;

@Input()
set role(role: Role) {
  this.isDeveloper = role === 'developer';
}
```

## Prevent Memory Leaks

When navigating from one component to another in Angular, the first component is destroyed, and the new component is initialized. If the first component was subscribed to an Observable, it may still hold references to that Observable even after it is destroyed, leading to potential memory leaks.

### Use of takeUntil Operator

`takeUntil` is also an operator. It allows monitoring the Observables and get rid of the subscriptions once the value is emitted by Observables. We can conclude that it secures the Observables from getting leaked.

```ts
ngUnsubscribe$ = new Subject<void>();

ngOnInit(): void {
  this.movieService.getListUpdates()
    .pipe(takeUntil(this.ngUnsubscribe$))
    .subscribe(movies => {
      this.movies = movies;
    });
}

ngOnDestroy(): void {
  this.ngUnsubscribe$.next();
}
```

### Use of async Pipe

It subscribes to an `Observable` or `Promise` and returns to the recent emitted value and unsubscribe when the component is destroyed.

```html
<ul *ngIf="(movieService.getListUpdates() | async) as movies">
  <li *ngFor="let movie of movies">
    {{ movie.title }}
  </li>
</ul>
```

### Use of take(1)

It takes the value and allows for not subscribing whenever a new value is diagnosed. It takes care that you receive data only once.

```ts
this.movieService.getList()
  .pipe(take(1))
  .subscribe(movies => {
    this.movies = movies;
  });
```

## Subscribe in Template Using async Pipe

Avoid subscribing to observables from components and instead subscribe to the observables from the template.

***Why?***: `async` pipe unsubscribe automatically, and it makes the code simpler by eliminating the need to manually manage subscriptions. It also reduces the risk of accidentally forgetting to unsubscribe a subscription in the component, which would cause a memory leak. This risk can also be mitigated by using a lint rule to detect unsubscribed observables.

**Before**

```html
<p>{{ textToDisplay }}</p>
```

```ts
textToDisplay = '';

ngOnInit(): void {
  this.textSubscriotion = this.textService
    .pipe(
      map(value => value.item),
    )
    .subscribe(item => this.textToDisplay = item);
}

ngOnDestroy(): void {
  if (this.textSubscriotion) {
    this.textSubscriotion.unsubscribe();
  }
}
```

**After**

```html
<p>{{ (textToDisplay$ | async) }}</p>
```

```ts
textToDisplay$ = this.textService.pipe(map(value => value.item));
```

## Use Change Detection OnPush

Use the `OnPush` change detection strategy to tell Angular there have been no changes. This lets you skip the entire change detection step.
This change detection works by detecting if some new data has been explicitly pushed into the component, either via a component input or an Observable subscribed to using the async pipe.

***Why?***: The more use of `OnPush` in components we have the fewer checks Angular needs to perform, means better performance.

```html
<app-todo *ngFor="let todo of todos" [todo]="todo"></app-todo>
```

```ts
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
}
```

## Avoid Having Subscriptions Inside Subscriptions

Sometimes you may want values from more than one observable to perform an action. In this case, avoid subscribing to one observable in to subscribe block of another observable. Instead, use appropriate chaining operators. Chaining operators run on observables from the operator before them. Some chaining operators are: `withLatestFrom`, `combineLatest`, etc.

**Before**

```ts
firstObservable$.pipe(
    take(1)
  )
  .subscribe(firstValue => {
    secondObservable$.pipe(
        take(1)
      )
      .subscribe(secondValue => {
        console.log(`Combined values are: ${firstValue} & ${secondValue}`);
      });
  });
```

**After**

```ts
firstObservable$.pipe(
    withLatestFrom(secondObservable$),
    first()
  )
  .subscribe(([firstValue, secondValue]) => {
      console.log(`Combined values are: ${firstValue} & ${secondValue}`);
  });
```

## Use trackBy Along With ngFor

When using `ngFor` to loop over an array in templates, use it with a `trackBy` function which will return a unique identifier for each item.

***Why?***: When an array changes, Angular re-renders the whole DOM tree. But if you use trackBy, Angular will know which element has changed and will only make DOM changes for that particular element.

**Before**

```html
<li *ngFor="let movie of movies">{{ movie.title }}</li>
```

**After**

```html
<li *ngFor="let movie of movies; trackBy: trackByFn">{{ movie.title }}</li>
```

```ts
trackByFn(index, movie: Movie): string {
  return movie.id;
}
```

## Strings Should Be Safe

If you have a variable of type string that can have only a set of values, instead of declaring it as a string type, you can declare the list of possible values as the type.

***Why?***: By declaring the type of the variable appropriately, we can avoid bugs while writing the code during compile time rather than during runtime.

```ts
export class ButtonComponent {
  @Input() type: string;
}
```

```ts
export class ButtonComponent {
  @Input() type: 'submit' | 'reset' | 'button' = 'button';
}
```

## Avoid any Type

Declare variables or constants with proper types other than any.

***Wny?***: This will reduce unintended problems. Another advantage of having good typings in our application is that it makes refactoring easier.

**Before**

```ts
export class MovieComponent {
  movie: any;
  
  constructor() {
    this.movie = {
      // Whatever we want can be decaler here...
    };
  }
}
```

**After**

```ts
interface Movie {
  title: string;
}

export class MovieComponent {
  movie: Movie;

  constructor() {
    this.movie = {
      title: 'Avengers',
      // We can't decalre other properties...
    };
  }
}
```

## Use Mandatory Inputs

To make the requirement explicit we can use the selector in the `@Component` decorator to require that the attribute on our component must exist.

```ts
@Component({
  selector: 'movie-list[movies]',
})
export class MovieListComponent {
  @Input() movies: Movies[];
}
```

Resulting an error, when we start the application or at compile time when the application is built Ahead of Time (AoT), if the `MovieListComponent` doesn't have a `movies` attribute. This approach improves the readability of the code because helps other developers to integrate this component into their projects, throwing errors, and we don't need to define explicit validations to check if it exists.

## Do Not Pass Streams to Components Directly

Passing streams to child components is a bad practice because it creates a very close link between the parent component and the child component. A component should always receive an object or value and should not even care if that object or value comes from a stream or not. It is better to handle the subscription in the parent component itself. Angular has a feature called the `async` pipe that can be used for this.

## Do Not Pass Streams to Services

By passing a stream to a service we don't know what's going to happen to it. The stream could be subscribed to, or even combined with another stream that has a longer lifecycle, that could eventually determine the state of our application. Subscriptions might trigger unwanted behavior. It's recommended to use higher order streams in the components for these situations.

## Do Not Expose Subjects

In order to avoid side effects to subject value it's better to hide the subject itself in the service and to expose the observable of the subject and function update his values.

```ts
export class CartService {
  private selectedItem: BehaviorSubject<CartItem | null> = new BehaviorSubject<CartItem | null>(null);

  readonly selectedItem$: Observable<CartItem | null> = this.selectedItem.asObservable();

  updateSelectedItem(item: CartItem): void {
    this.selectedItem.next(item);
  }
}
```

## Handle RxJS Errors

Error handling is an essential part of RxJS. By default, if something goes wrong with an Observable, it just dies. If we don't deal with such errors, it will happen silently, and we won't know why we are not receiving data anymore.

## Avoid Changing the DOM Directly

It's important to know that Angular uses Lifecycle Hooks that determine how and when components will be rendered and updated. Direct DOM access or manipulation can corrupt these lifecycle hooks, leading to unexpected behavior of the whole app. Direct access to the DOM can make our application more vulnerable to `XSS attacks`. Use `ElementRef` as the last resort when direct access to DOM is needed. Use templating and data-binding provided by Angular instead. Alternatively we can take a look at `Renderer2` which provides API that can safely be used even when direct access to native elements is not supported.

## Avoid Computing Values in the Template

Sometimes in Angular templates, we may be tempted to bind a method in the HTML template. The problem is that the methods are constantly getting called during the Angular Change Detection Cycle.

```html
<h1>{{ getTitle() }}</h1>
```

```ts
export class HomeComponent {
  getTitle(): string {
    return 'Home Page';
  }
}
```

It's highly recommended not to use methods calls in Angular template expressions. While method calls in Angular templates are super convenient and technically valid, they may cause serious performance issues because the method is called every time change detection runs. Instead, we can use pure `pipes` or manually calculate the values with `Lifecycle Hooks`.

## Use Immutability

Objects and arrays are the reference types in javascript. If we want to copy them into another object or an array and to modify them, the best practice is to do that in an immutable way using spread operator `…` this will prevent from changing the original object or array.

In Angular, it's very critical since we can modify the original array or object in the service or component and get unexpected behavior.

```ts
// Somewhere in the code we have list of movies...
const movies = [
  {
    title: 'Avengers',
    year: 2012
  },
];

// And in other place we get the movies list...
const updatedMovies = [...movies]; // Update with spread operator...
```

Please notice that using spread operator is copy only one level! you need to use spread operator to each level or instead to use deep cloning like this:

```ts
const updatedMovies = JSON.parse(JSON.stringify(movies));
```

## Safe Navigation Operator in HTML Template

To be on the safe side we should use the safe navigation operator while accessing a property from an object in a component’s template. If the object is null, and we try to access a property, we are going to get an exception. But if we use the save navigation `(?)` operator, the template will ignore the null value and will access the property once the object is not the null anymore.

```html
<ng-container *ngif="movie">
  <p>{{ movie.details?.description }}</p>
</ng-container>
```

## Sanitize Untrusted Values

Unless you enforce Trusted Types, the built-in browser DOM APIs don't automatically protect you from security vulnerabilities. For example, `document`, the node available through `ElementRef`, and many third-party APIs contain unsafe methods. In the same way, if you interact with other libraries that manipulate the DOM, you likely won't have the same automatic sanitization as with Angular interpolations. Avoid directly interacting with the DOM and instead use Angular templates where possible.

For cases where this is unavoidable, use `DomSanitizer.sanitize` method and the appropriate `SecurityContext` to sanitize untrusted values.

```ts
export class SomeComponent {
  private readonly domSanitizer:DomSanitizer = inject(DomSanitizer)

  content = this.domSanitizer.sanitize(
    SecurityContext.HTML,
    `<img src="" alt="" onerror="alert('You have been attacked')" />` // This data coule be come from outside API
  );
}
```

## Use InjectionToken for Dependency Injection

`InjectionToken` is both unique and symbolic, a JavaScript object that has a friendly name but won't conflict with another token that happens to have the same name.

Use `InjectionToken` in case you are not using classes as dependency injection.

***Why***: When using `string` instead of `InjectionToken` it can be led to conflicts.

`InjectionToken` variable name should be written as **UPPER_CASE** with **TOKEN** prefix.

***Why***: It will allow the developer to recognize it's `InjectionToken` which can be provided.

**Before**

```ts
@NgModule({
  providers: [
    {
      provide: 'TITLE',
      useValue: 'My Site',
    },
  ],
})
export class SomeModule {}
```

**After**

```ts
import { InjectionToken } from '@angular/core';

export const TITLE_TOKEN = new InjectionToken<string>('title');
```

```ts
@NgModule({
  providers: [
    {
      provide: TITLE_TOKEN,
      useValue: 'My Site',
    },
  ],
})
export class SomeModule {}
```

```ts
@Injectable({
  provided: 'root',
})
export class SomeService {
  constructor(@Inject(TITLE_TOKEN) private readonly title: string) {}
}
```

## Prevent Importing Module in Feature Modules

You can easily prevent from importing the module in feature modules and to enforce it to be used only in the `AppModule` (the root module) by checking who trying to create the class.

***Why***: It helps by accidentally providing the module on unappropriated modules and providing dependencies with configuration easier.

Please notice I provide the `AuthService` in the `forRoot` static method because I want to make sure the developer who want to use this service provide me also the configuration object.

```ts
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import {
  AUTH_CONFIG_TOKEN,
  AuthConfig,
  authConfigDefault,
  AuthService,
} from './auth';

@NgModule()
export class AuthModule {
  constructor(@Optional() @SkipSelf() parentModule?: AuthModule) {
    if (parentModule) {
      throw new Error(
        'AuthModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(
    config: Partial<AuthConfig> = {}
  ): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        {
          provide: AUTH_CONFIG_TOKEN,
          useValue: {
            ...authConfigDefault,
            ...config,
          },
        },
      ],
    };
  }
}
```

## Break Down Into Small Reusable Components

This might be an extension of the Single responsibility principle. Large components are very difficult to debug, manage and test. If the component becomes large, break it down into more reusable smaller components to reduce duplication of the code, so that we can easily manage, maintain and debug with less effort.

```text
--ParentComponent
----TitleComponent
----BodyComponent
----ListComponent
------ItemComponent
----FooterComponent
```

## Use Smart and Dumb Components

This pattern helps to use `OnPush` change detection strategy to tell Angular there have been no changes in the dumb components.

`Smart components` are used in manipulating data, calling the APIs, focussing more on functionalities, and managing states. While `dumb components` are all about cosmetics, they focus more on how they look.

## Use Lazy Loading

When possible, try to lazy load the modules in your Angular application. Lazy loading is when you load something only when it is used, for example, loading a component only when it is to be seen.

***Why?***: This will reduce the size of the application to be loaded and can improve the application boot time by not loading the modules that are not used.

**Before**

```ts
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
];
```

**After**

```ts
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
  },
];
```

## Use index.ts

Instead of remembering multiple source file names, there are some tiny import statements that will fulfill the purpose.

***Why?***: It helps to keep all correlated files in a single location.

**Before**

```ts
import { uuid } from './../utils/uuid';
import { convertToTitleCase } from './../utils/convert-to-title-case';
```

**After**

> utils/index.ts

```ts
export * from './uuid';
export * from './convert-to-title-case';
```

Now we can import all the files from one file.

```ts
import { uuid, convertToTitleCase } from './../utils';
```

## Isolate API Hacks

Sometimes, we need to add some logic in the code to make up for bugs in the APIs. Instead of having the hacks in components where they are needed, it is better to isolate them in one place like in a function or a service and use them. When fixing the bugs in the APIs, it is easier to look for them in one file rather than looking for the hacks that could be spread across the codebase.

## Cache API Calls

Caching API calls improves performance and saves memory by limiting server requests to fetch redundant information. Some API responses may not change frequently so we can put some caching mechanism and can store those values from the API. When the same API request is made, we can get a response from the cache. Thus, it speeds up the application and also makes sure that we are not downloading the same information frequently.

You can use for example RxJS `shareReplay` operator.

```ts
class MoviesService {
  private commonMovies$: Observable<Movie[]> | null = null;

  
  getCommonMovies(): Observable<Movie[]> {
    if (!this.commonMovies$) {
      this.commonMovies$ = this.httpClient.get<Movie[]>('/api/movies/common').pipe(
        shareReplay(1),
      );
    }

    return this.commonMovies$;
  }
}
```

## Provide Private Services

Most providers in angular are designed to act on a global scope. They are then provided at an application level (`AppModule`). This makes sense if the use of the global-singleton-pattern is required. However, there are services that do not need to be provided globally. Especially if they are used by just one component. In that case, it can make sense to provide that service inside the component, instead of globally. That is, if the service is directly tied to that component, as shown below.

```ts
@Component({
  selector: 'app-navbar',
  providers: [NavbarService],
})
export class NavbarComponent {}
```

Providers are `tree-shakable`, the Angular compiler removes the associated services from the final output when it determines that our application doesn't use those services. It also minimizes the risk of dead code and reduces the size of our bundles.

## Avoid Risky Angular APIs

Avoid Angular APIs marked in the documentation as **Security Risk**. The most common risky API we use is `ElementRef`. It permits direct access to the DOM and can make your application more vulnerable to XSS attacks. Review any use of [ElementRef](https://angular.dev/api/core/ElementRef) in your code carefully. Use this API as a last resort when direct access to the DOM is needed. Use templating and data binding provided by Angular, instead. Alternatively, you can take a look at [Renderer2](https://angular.dev/api/core/Renderer2), which provides an API that can safely be used even when direct access to native elements is not supported.

## Avoid Poorly Structured CSS

Common mistakes are excessive use of deep selectors and inline styles. Inline styles are considered as bad practice due to poor scalability and maintainability. As a rule of thumb, define all styles in the CSS files. Usage of `::ng-deep` to overwrite styles in other components is incredibly popular. Despite being a working solution, it's marked as `deprecated`. The main reason for that is that this mechanism for piercing the style isolation sandbox around a component can potentially encourage bad styling practices. Though, it isn't going away until Angular implements `::part()` and `::theme()` from the CSS Shadow Parts spec, as there is no better alternative.

## Lack of Meaningful Unit Tests

Angular CLI encourages writing unit tests by spanning out `*.spec.ts` files with every created component. However, don't leave them empty or be satisfied by configuring the TestBed with component initialization without actual tests. If developers don't write tests, then absence of a test file would clearly indicate the state of affairs to other developers, rather than misleading them by giving a false sense of security with a rudiment `*.spec.ts` file. We need to cover with tests the most fragile parts, rather than covering what's easier to test.

## Avoid Useless Code Comments

Comments are considered a best practice, but if we are adding a comment, it's because it's not self-explanatory, and we should choose a better way to implement it.

Good comments are informative comments, when be useful to provide basic information. For example, a comment that contains legal information, or are a warning, when we are working with multiple developers on a project, we could use a comment to warn other developers about certain consequences, or are a to-do comments for tasks a developer thinks should be done, but for some reason can't be done at this moment.

Bad Comments are commented-out code is a common practice, but we shouldn't do it, because other developers will think the code is there for a reason and won't have the courage to delete it. Just delete the code. We have got version control, so the code isn't lost forever. Another case is noise comments. Some comments that we see are just noise. They restate the obvious and serve no real purpose. Redundant comments are comments that are not more informative than the code. These comments only clutter the code.

## Remove Unused Code

Unused code or dead code is any code which will never be executed. It may be some condition, loop or any file which was simply created but wasn't used in our project. It is a problem because that code has no sense, and we can drop it. Dead-code Elimination also reduces the size of our bundles and repositories. Less code also increases maintenance, IDE performance and makes it easier to understand. Common mistakes in TypeScript projects are unused imports, variables, functions and private class members.

## Avoid Using Third-Party Libraries

Usage of third-party libraries should be avoided and should be as final destination.

If you decided to use third-party library try to explain to the team why it was chosen and why it can not be done with Angular built-in libraries, it will make good conversation with the team and maybe could lead to better solutions.

***Why***: Angular comes with a great set of built-in libraries such as routing, forms, HTTP Client, testing and many more. When deciding to add third-party library the bundle size will become bigger and that resulting to slower performance. 

## Base Component Classes

Create a base class component may come in handy when we have lots of reused stuff and don't want to pollute each component with the same code all over. Common situations are when we are creating form components, when we have pages with the same behavior, such as pages with HTML forms. In these examples, having the same code in multiple places means that if we want to make a change to the logic in that code, we must do it in multiple places. We can create a base class with the common data and methods. Thus, we don't have the same duplicate code in different locations in the code base.

## Do Not Remove View Encapsulation

In Angular, component CSS styles are encapsulated into the component's view and don't affect the rest of the application. To control how this encapsulation happens on a per component basis, we can set the view encapsulation mode in the component metadata. The default is `Emulated`, and it emulates the behavior of `Shadow DOM` by preprocessing the CSS code to effectively scope the CSS to the component's view. In the `None` mode, styles from the component propagate back to the main HTML and therefore are visible to all components on the page. We can use this option, but we need to be careful and adopt other strategies like nested CSS or naming conventions.

## Analyze the Bundle Size

There is a great tool [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) that can help us to identify how much size every library consume in the final bundle.

***Why***: Knowing what library or import impact on the final bundle can help us to shrink the size of the bundle by maybe removing the library or replace it with lighter one.

The usage is very easy:

```shell
npm i -D webpack-bundle-analyzer
ng build --stats-json # Build angular with stats JSON file
webpack-bundle-analyzer dist/my-app/stats.json
```

## Use CSP To Prevent XSS

CSP (Content Security Policy) help us to prevent XSS attacks very easily by restricting what resources can be used in the website.

[How to use CSP](https://developers.google.com/web/fundamentals/security/csp)

## Use ECMAScript Features

ECMAScript is one of the JavaScript versions which constantly get updated with new features and functionalities.

Because Angular using the TypeScript language, TypeScript is always updated according to the new ECMAScript features, so you can utilize them in Angular.

[TypeScript Updates](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html)

## Use Reactive Forms

Angular presents two different methods for creating forms: `template-driven` and `reactive forms`. Reactive forms provide a model-driven approach to handling form inputs whose values change over time. The Reactive approach removes validation logic from the template, keeping the templates clean of validation logic. Reactive forms use an explicit and immutable approach to managing the state of a form at a given point in time. Each change to the form state returns a new state, which maintains the integrity of the model between changes.

## Use CDK Virtual Scroll

CDK (Component Development Kit) Virtual Scroll can be used to display large lists of elements more efficiently. Virtual scrolling enables an efficient way to simulate all values by making the height of the container element equal to the height of the total number of elements.

For more info: [Angular material cdk virtual scroll](https://material.angular.dev/cdk/scrolling/overview)

## Use Angular Service Workers and PWA

Angular service worker is designed to optimize the end user experience of using an application over a slow or unreliable network connection, while also minimizing the risks of serving outdated content.

For more info: [How to use Angular service worker and pwa](https://angular.dev/guide/service-worker-getting-started)

## Use Angular Universal

A normal Angular application executes in the browser, rendering pages in the DOM in response to user actions. Angular Universal executes on the server, generating static application pages that later get bootstrapped on the client. This means that the application generally renders more quickly, giving users a chance to view the application layout before it becomes fully interactive.

For more info: [Server-side rendering (SSR) with Angular Universal](https://angular.dev/guide/universal)

## Use Lint Rules

[ESLint](https://github.com/eslint/eslint) and [Stylelint](https://github.com/stylelint/stylelint) have various inbuilt options, it forces the program to be cleaner and more consistent. It is widely supported across all modern editors and can be customized with your own lint rules and configurations. This will ensure consistency and readability of the code.

## Use Angular DevTools Chrome Extension

Angular DevTools extends Chrome DevTools adding Angular specific debugging and profiling capabilities.

* Understand the structure of your application
* Preview the state of the directive and the component instances
* See change detection cycles, what triggered them, and how much time Angular spent in them

[Angular DevTools Chrome Extension](https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh)

[Angular DevTools Overview](https://angular.dev/guide/devtools)

## Use Storybook

Storybook is an open source tool for building UI components and pages in isolation. It streamlines UI development, testing, and documentation.

***Why?***: By using storybook it enforces us to make better isolated components, easier to search for components that can be used for new developers in the team, great for product team to view the new UI and good documentation for the company UI design.

[Storybook](https://storybook.js.org)


## Use Dependency Injection Functions Instead of Constructors

In Angular, leveraging the `inject` function instead of traditional constructor-based dependency injection is becoming a best practice. This approach offers several advantages that enhance the development experience and the quality of the codebase.

- **More Accurate Types**: Angular's `inject` function offers more accurate types, enhancing code safety and robustness.
- **Improved Compatibility**: It provides better compatibility with standard decorators, making it easier to integrate and use dependencies within components.
- **Code Simplification**: Using `inject` makes the code more concise and readable by eliminating the need to declare dependencies in the constructor.
- **Inheritance Benefits**: When using inheritance, the `inject` function allows subclasses to easily access dependencies without needing to call the parent constructor, simplifying the code and reducing boilerplate.
- **Reusable Functions**: It allows moving logic to reusable functions, although this can hide dependencies within the function.

**For migrating to the new syntax, use**:

```bash
ng generate @angular/core:inject
```

**Before:**

```typescript
export class AppComponent {
  constructor(
    @Inject(FOO) private foo: string,
    @Optional() @Inject(BAR) private bar: string | null,
    private http: HttpClient,
    private todosService: TodosService
  ) {}
}
```

**After:**

```typescript
export class AppComponent {
  private foo = inject(FOO);
  private bar = inject(BAR, { optional: true });
  private http = inject(HttpClient);
  private todosService = inject(TodosService);
}
```

## Use Standalone Components

In Angular, standalone components provide a simplified way to build applications by reducing the need for NgModules. Here are some reasons why using standalone components is a good practice:

- **Simplified Architecture**: Standalone components allow you to build Angular applications without the need for NgModules, simplifying the overall architecture
- **Improved Modularity**: Each component can encapsulate its own functionality and dependencies, making the codebase more modular and easier to manage
- **Enhanced Reusability**: Standalone components can be reused across different parts of the application without being tied to a specific module
- **Better Performance**: By reducing the overhead associated with NgModules, standalone components can improve the performance of your application

**To migrate an existing Angular project to standalone, use**:

```bash
ng generate @angular/core:standalone
```

```ts
@Component({
  selector: "app-standalone",
  standalone: true,
  imports: [],
  template: `<p>Standalone component works!</p>`,
})
export class StandaloneComponent {}
```

## Use ng-template

Using `ng-template` and `ngTemplateOutlet` is a powerful way to reuse code within the same component without creating additional components. This approach enhances code reusability, maintainability, and readability.

```html
<ng-template #myTemp>
  <p>Repeated code</p>
</ng-template>

<div class="block1"><ng-container [ngTemplateOutlet]="myTemp" /></div>
...
<div class="block2"><ng-container [ngTemplateOutlet]="myTemp" /></div>
```

## Use Schematics for Migration

Using schematics for migration helps ensure a smooth, efficient, and consistent update process. By automating repetitive tasks and following best practices, schematics make it easier to keep your Angular applications up-to-date with the latest features and improvements. [docs](https://angular.dev/reference/migrations)

```bash
# Migrate an existing Angular project to standalone
ng generate @angular/core:standalone

# Migration to Control Flow syntax
ng generate @angular/core:control-flow

# Migration to the inject function
ng generate @angular/core:inject

# Migration to lazy-loaded routes
ng generate @angular/core:route-lazy-loading

# Migration to signal inputs
ng generate @angular/core:signal-input-migration

# Migration to signal queries
ng generate @angular/core:signal-queries-migration
```

## Use HttpContext in Interceptor

Using `HttpContext` in interceptors allows you to manage `HTTP` requests more effectively by providing additional context that can be used to conditionally apply logic. This approach enhances the flexibility, organization, and control of your HTTP request handling in Angular applications.

```ts
// Create a new HttpContextToken
const IS_PUBLIC_API = new HttpContextToken<boolean>(() => false);

// Service
getSomePublicData() {
  return this.http.get(<URL>, {
        context: new HttpContext().set(IS_PUBLIC_API, true),
      })
  }

// Interceptor
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.context.get(IS_PUBLIC_API)) {
      return next.handle(req);
    }
  //...
  }
}
```

## Use Control Flow

Angular 17 introduces a more declarative syntax for control flow, making it even more intuitive and closer to standard JavaScript.

- **Simplicity and Readability**: New shortcuts like **@if**, **@for**, and **@switch** make coding easier and more intuitive.
- **Performance Improvements**: Smarter loading techniques improve website speed, with pages loading more than 50% faster initially and updating 75% faster in some cases.

- **Cleaner Code**: The new syntax eliminates the need for special symbols and prefixes, making your code cleaner and more maintainable.

**For migrating to the new syntax, use**:

```bash
ng generate @angular/core:control-flow
```

## Use @defer

In Angular, the `@defer` directive is a powerful tool introduced to improve the performance and user experience of your applications by deferring the loading of certain parts of your template.

- **Performance Improvement**: By deferring the loading of heavy components, you can improve metrics like Largest Contentful Paint (LCP) and Time to First Byte (TTFB), leading to a faster initial load and better Core Web Vitals scores.
- **Reduced Initial Bundle Size**: Only the essential parts of your application are loaded initially, which reduces the amount of JavaScript that needs to be downloaded and parsed.
- **Improved User Experience**: Users can start interacting with the application sooner, as non-essential components are loaded in the background or when needed.

```tsx
@defer {
  <list-movies/>
}
@placeholder {
  <span>Placeholder content to display until the movies load </span>
}
@error {
  <span>Loading failed</span>
}
@loading(minimum 1s) {
  <span>Loading...</span>
}
```

## Signals API

Angular's Signals are designed with simplicity in mind, providing three core functions: `signal()` to create Signals,`computed()` for derived Signals, and `effect()` to handle side effects.

The last one, `effect()`, stands out. While still in developer preview (unlike signal() and computed(), which became stable in v17),

### Limiting the Use of Effects in Angular

In Angular, while effects (`effects`) can be useful for certain tasks, it's generally recommended to limit their use. Here are some reasons why and examples to illustrate these points:

**Why limit the use of effects:**

- **Complexity and Maintainability**: Effects can make your code more imperative and less declarative, which goes against the reactive programming paradigm. This can lead to code that is harder to understand and maintain.
- **Performance Issues**: Using effects for state propagation can result in performance problems such as unnecessary change detection cycles, which can slow down your application.
- **Circular Updates**: Effects can introduce circular updates, where changes trigger further changes in a loop, leading to potential infinite loops and difficult-to-debug issues.
- **Single Source of Truth**: By avoiding effects, you can focus on maintaining a single source of truth for your application's state. This approach simplifies state management and reduces the risk of errors.
- **Auto-Tracking Pitfalls**: Angular's auto-tracking behavior can lead to unintended dependencies being tracked, making the codebase more error-prone and harder to reason about.

**Use Cases for Effects:**
Effects are rarely needed in most application code but can be useful in specific circumstances:

- **Logging**: Logging data being displayed and when it changes, either for analytics or as a debugging tool.
- **Syncing with localStorage**: Keeping data in sync with `window.localStorage`.
- **Custom DOM Behavior**: Adding custom DOM behavior that can't be expressed with template syntax.
- **Custom Rendering**: Performing custom rendering to a `<canvas>`, charting library, or other third-party UI library.

**When Not to Use Effects:**
Avoid using effects for the propagation of state changes. This can result in `ExpressionChangedAfterItHasBeenChecked` errors, infinite circular updates, or unnecessary change detection cycles.

Because of these risks, Angular by default prevents you from setting signals in effects. It can be enabled if absolutely necessary by setting the `allowSignalWrites` flag when you create an effect.

Instead, use computed signals to model state that depends on other state.

For more details and use cases, refer to the following resources:

- **Article**: [Rainer Hahnekamp - Angular’s effect(): Use Cases & Enforced Asynchrony](https://www.rainerhahnekamp.com/en/angulars-effect-enforced-asynchrony/)
- **Video**: [Alex Rickabaugh at TechStackNation - Don't Use Effects 🚫 and What To Do Instead](https://youtu.be/aKxcIQMWSNU?si=Kn31zD8R19AWScTQ)

**Examples:**

- **State Propagation Example**: Using effects for state propagation can lead to issues.

```ts
const count = signal(0);
const doubleCount = signal(0);
effect(
  () => {
    doubleCount.set(count() * 2);
  },
  { allowSignalWrites: true }
);
count.set(1);
// This will now work but use cautiously
console.log(doubleCount()); // Outputs: 2
```

Instead, use **computed** signals to model state that depends on other state.

```ts
const count = signal(0);
const doubleCount = computed(() => count() * 2);
```