import * as angular from 'angular'

let AngularComponent = Object.create(HTMLElement.prototype);

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
          $scope = angular.element(this).scope(),
          attrPropertyName = toPropertyName(attrName);

    if(component) component[attrPropertyName] = newVal;

    if($scope && !$scope.$root.$$phase) $scope.$apply();
}

AngularComponent.createdCallback = function() {

    this.dispatch = function(eventName: string, args?: {}) {
        var name = toAttributeName(eventName);
        this.dispatchEvent(new CustomEvent(name, { detail: args }));
    }
    
}

AngularComponent.detatchedCallback = function() {
    angular.element(this).scope().$rootScope.$destroy();
    console.debug('Destroyed AngularComponent')
}

function getComponent(el: HTMLElement) {

    const $element = angular.element(el),
          $scope = $element.isolateScope(),
          controllerName = toPropertyName(el.name),
          controller = $element.controller(controllerName);

    return controller || $scope;
}

function toAttributeName(attrName: string): string {
    return attrName.replace(/([A-Z])/g, (match) => '-' + match.toLowerCase());
}

function toPropertyName(attrName: string): string {
    return attrName.replace(/-(.)/g, (match) => match.toUpperCase()[1]);
}


export function registerAngularWebComponent(module, directives: {name: string, events: string[] }[]) {

    for(let directive of directives) {

        let componentName = toAttributeName(directive.name),
            events = [].concat(directive.events);

        document.registerElement(componentName, { 
            prototype: Object.create(AngularComponent, {
                module: { value: module.name },
                name: { value: componentName },
                events: { value: events }
            })
        })
    }

}

export default AngularComponent;