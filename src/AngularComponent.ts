import * as metadom from './metadom'
import * as angular from 'angular'

export interface IAngularComponent extends HTMLElement {
    module: string;
    name: string;
    events: string[];

	webComponent(directive: IAngularComponent)
	webComponent(directives: IAngularComponent[])
}

let AngularComponent = Object.create(metadom.MetadomComponent);

AngularComponent.createdCallback = function() {

    metadom.MetadomComponent.createdCallback();

    this.setData = (function(data) {
        let component = getComponent(this);
        angular.extend(component, data);
        sync(this);
    }).bind(this)

}

AngularComponent.attachedCallback = function() {
    const module = this && this.module;

    if(!module) throw 'Component name missing'

    angular.bootstrap(this, [module]);

    let el = this,
        events = this.events,
        component = getComponent(this);

    for(let evt of events) {
        component[evt] = el.dispatch.bind(this, evt);
    }
}

AngularComponent.attributeChangedCallback = function(attrName, oldVal, newVal) {

    const component = getComponent(this),
          attrPropertyName = metadom.toPropertyName(attrName);

    if(component) component[attrPropertyName] = newVal;

    sync(this);
}

AngularComponent.detatchedCallback = function() {
    angular.element(this).scope().$rootScope.$destroy();
}

AngularComponent.webComponent = registerWebComponent;

function registerWebComponent(directive: IAngularComponent)
function registerWebComponent(directives: IAngularComponent[]) 
function registerWebComponent(arg: any) {

    let directives = [].concat(arg);

    for(let directive of directives) {

        let componentName = metadom.toAttributeName(directive.name),
            events = [].concat(directive.events);

        document.registerElement(componentName, { 
            prototype: Object.create(AngularComponent, {
                module: { value: directive.module },
                name: { value: componentName },
                events: { value: events }
            })
        })

        console.debug(`Registered AngularComponent ${componentName}`)
    }
}

function sync(el: HTMLElement) {
    let $scope = angular.element(el).scope()
    if($scope && !$scope.$root.$$phase) $scope.$apply();
}

function getComponent(el: IAngularComponent) {

    const $element = angular.element(el),
          $scope = $element.isolateScope(),
          controllerName = metadom.toPropertyName(el.name),
          controller = $element.controller(controllerName);

    return controller || $scope;
}



export default <IAngularComponent>AngularComponent;