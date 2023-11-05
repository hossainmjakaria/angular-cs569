### Question 1
Write in a new markdown file `hw2-question1.md` the answer to the following questions:
1. Write a summary about how Angular application bootstrap.
    The following steps are involved in the Angular application bootstrap process:

    - The browser loads the index.html file.
    - The index.html file includes a script tag that loads the Angular runtime library.
    - The Angular runtime library bootstraps the application by loading the root module.
    - The root module is responsible for initializing the Angular application and its components.
    - The root module creates the root component and inserts it into the DOM.
    - The root component's template is rendered to the DOM.
    - The Angular application is now bootstrapped and ready for user interaction.

    ```
        main.ts
        -------------
        import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
        import { AppModule } from './app/app.module';


        platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.error(err));

    ```


2. Write a summary of the meta-data we covered that is passed to `@NgModule` factory decorator. Read more details on the [official Angular docs](https://angular.io/api/core/NgModule).
    - declarations: The components that are defined by the root module.
    - imports: The modules that the root module depends on. The BrowserModule module is always imported by the root module.
    - providers: The services that are provided by the root module.
    - bootstrap: The root component that Angular creates and inserts into the index.html host web page.

3. Write a summary of the meta-data we covered that is passed to `@Component` factory decorator. Read more details on the [official Angular docs](https://angular.io/api/core/Component).
    - selector: The CSS selector that is used to identify the element in the HTML template where the component will be rendered.
    - template: An inline template for an Angular component. If provided, do not supply a template file using templateUrl
    - templateUrl: The relative path or absolute URL of a template file for an Angular component. If provided, do not supply an inline template using template.
    - standalone: Angular components marked as standalone do not need to be declared in an NgModule
    - encapsulation
        The 3 states of view encapsulation in Angular are:
            None: All elements/styles are leaked - no Shadow DOM at all.
            Emulated: Tries to emulate Shadow DOM to give us the feel that we are scoping our styles. This is not a real Shadow DOM but a strategy that works in all browsers.
            ShadowDom: This is the real deal as shadow DOM is completely enabled. Not supported by older browsers.
    - styleUrls: One or more relative paths or absolute URLs for files containing CSS stylesheets to use in this component
    - styles: One or more inline CSS stylesheets to use in this component.
    
4. Explain the difference between the default Emulated style encapsulation and the ShadowDOM.
    - Emulated: Emulates Shadow DOM to scope CSS styles. Works in all browsers, but is not a true Shadow DOM.
    - ShadowDom: Uses the native Shadow DOM API to scope CSS styles. Only works in browsers that support Shadow DOM.