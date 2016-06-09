import * as angular from 'angular'

let AngularComponent = Object.create(HTMLElement.prototype);

AngularComponent.attachedCallback = function() {

    const element = this,
          name = element && element.name;

    if(!name) throw 'Component name missing'

    angular.bootstrap(element, [this.name]);

    let $element = angular.element(element),
        $scope = $element.scope(),
        $injector = $element.injector();

    $injector.invoke(["$compile", ($compile) => {
        $compile(element.outerHTML)($scope);
        console.log(`Initialized new AngularComponent ${name}`, element)
    }])
}

AngularComponent.attributeChangedCallback = function(attrName, oldVal, newVal) {

    const $element = angular.element(this),
          controllerName = toProperty(this.name),
          $scope = $element.scope(),
          attrPropertyName = toProperty(attrName),
          controller = $element.controller(controllerName),
          $injector = $element.injector();

    if(!$scope && !controller) return;

    $injector.invoke(["$timeout", ($timeout) => {
        $timeout(() => {
            $scope[attrPropertyName] = newVal;
            if(controller) controller[attrPropertyName] = newVal;
            
            console.debug(`$scope[${attrPropertyName}] == ${$scope[attrPropertyName]}`)
            if(controller) console.debug(`controller.${attrPropertyName} == ${controller[attrPropertyName]}`)
        });
    }]);
}

function toProperty(attrName: string): string {
    return attrName.replace(/-(.)/g, (match) => match.toUpperCase()[1]);
}

export default AngularComponent;