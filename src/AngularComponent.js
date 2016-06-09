System.register(['angular'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var angular;
    var AngularComponent;
    function toProperty(attrName) {
        return attrName.replace(/-(.)/g, function (match) { return match.toUpperCase()[1]; });
    }
    return {
        setters:[
            function (angular_1) {
                angular = angular_1;
            }],
        execute: function() {
            AngularComponent = Object.create(HTMLElement.prototype);
            AngularComponent.attachedCallback = function () {
                var element = this, name = element && element.name;
                if (!name)
                    throw 'Component name missing';
                angular.bootstrap(element, [this.name]);
                var $element = angular.element(element), $scope = $element.scope(), $injector = $element.injector();
                $injector.invoke(["$compile", function ($compile) {
                        $compile(element.outerHTML)($scope);
                        console.log("Initialized new AngularComponent " + name, element);
                    }]);
            };
            AngularComponent.attributeChangedCallback = function (attrName, oldVal, newVal) {
                var $element = angular.element(this), controllerName = toProperty(this.name), $scope = $element.scope(), attrPropertyName = toProperty(attrName), controller = $element.controller(controllerName), $injector = $element.injector();
                if (!$scope && !controller)
                    return;
                $injector.invoke(["$timeout", function ($timeout) {
                        $timeout(function () {
                            $scope[attrPropertyName] = newVal;
                            if (controller)
                                controller[attrPropertyName] = newVal;
                            console.debug("$scope[" + attrPropertyName + "] == " + $scope[attrPropertyName]);
                            if (controller)
                                console.debug("controller." + attrPropertyName + " == " + controller[attrPropertyName]);
                        });
                    }]);
            };
            exports_1("default",AngularComponent);
        }
    }
});
