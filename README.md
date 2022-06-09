# angular-scalable-app
Angular architecture. How to build scalable web applications

https://www.udemy.com/course/angular-application-architecture/

stack:
- ts
- ngrx
- firebase
- scss + bem
- angular material
- rxjs

milestones:

4. Shared
4.1 
module can include:
- one component
- multiple components
- service
- all elements
- third party dependencies

Each module is to contain just the elements which are used in it. An element set must be sufficient for providing completed functionality.
Keep in the root module minimum essential set of services and common components.

4.2
division into modules and elements groupuing

- module
-- components
-- services
-- directives
-- pipes
-- guards
-- resolvers
-- models
-- store
-- pages
-- shared

4.3
when does a component become a module?

make a separate component if element has:
- its own logic of interaction with the user
- a complicated layout and animation
- any methods which can distract from understanding the logic of the parent component

algorithm:
1. take a look at the layout.
Visually separate elements can be converted into separate components.

2. do separate components have their own dependencies?
If a component needs a unique set of additional modules, which are not used any more neither in parent component nor neighbour components, it is necessary to make a separate module.

3. is it possible to divide components into subcomponents?
If a component can be divided into subcomponents, you need to add a module for it.
In a module of a parent component you should declare those components which are directly used by this module.

4.5
Shared mustn't be an all-in-one module if it consists of absolutely independent elements.
Import only ComponentOne instead of all SharedModule.
Each component included in SharedModule must have its own module.

4.8
Moving components to shared.
The more distant the component is from the endpoint of use, the more abstract it should be.
Avoid creating business logic components in shared.
