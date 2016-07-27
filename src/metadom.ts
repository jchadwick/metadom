import 'webcomponents-lite'

interface IAttributeChange {
    attr: string;
    oldValue: string;
    newValue: string;
}

interface MetadomComponent extends HTMLElement {
    name: string;
    setData(data): void;
}

const DATA_PROPERTY = 'data';

const MetadomComponent = Object.create(HTMLElement.prototype);

MetadomComponent.createdCallback = function() {

    this.dispatch = function(eventName: string, args?: {}) {
        var name = toAttributeName(eventName);
        this.dispatchEvent(new CustomEvent(name, { detail: args }));
    }

    this.setData = function(data) {
        throw 'setData not implemented'
    }
   
}

function getComponent(el: HTMLElement, type) {
    return (el.__components || (el.__components = {}))[type];
}

function VanillaComponent(name: string, type) {
    const component = Object.create(MetadomComponent)

    component.createdCallback = function() {
        let instance = new type(this),
            components = (this.__components || (this.__components = {})),
            setDataThunk = instance.setData;

        (this.__components || (this.__components = {}))[type] = instance;

        this.setData = function(data) {
            if(setDataThunk) setDataThunk.call(instance, data);
        }
    }

    component.attachedCallback = function() {
        let instance = getComponent(this, type),
            renderThunk = instance.render;

        if(renderThunk) renderThunk.call(instance);
    }

    component.attributeChangedCallback = function(attrName, oldVal, newVal) {
        let instance = getComponent(this, type);

        instance[attrName] = newVal;

        triggerChanges(instance);
    }

    component.detatchedCallback = function() {
        let instance = getComponent(this, type),
            disposeThunk = instance.dispose;

        if(disposeThunk) disposeThunk.call(instance);
    }

    function triggerChanges(instance) {
        let onChangesThunk = instance.onChanges;
        if(onChangesThunk) onChangesThunk.call(instance);
    }

    webComponent(name, component);
}


function toAttributeName(attrName: string): string {
    return attrName.replace(/([A-Z])/g, (match) => '-' + match.toLowerCase()).toLowerCase();
}

function toPropertyName(attrName: string): string {
    return attrName.replace(/-(.)/g, (match) => match.toUpperCase()[1]);
}

function webComponent(name: string, prototype) {

    const componentName = toAttributeName(name);

    document.registerElement(componentName, { 
        prototype: Object.create(prototype, {
            name: { value: componentName }
        })
    })
}

export default MetadomComponent;

export {
    DATA_PROPERTY,
    IAttributeChange,
    getComponent,
    toAttributeName,
    toPropertyName,
    webComponent,
    MetadomComponent,
    VanillaComponent
};