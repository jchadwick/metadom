import MetadomComponent, {IAttributeChange} from './metadom'
import $ from 'jquery'

export interface IJQueryComponent extends HTMLElement {
    name: string;
    webComponent: (name: string, plugin: (IAttributeChange) => void) => void;
}

let JQueryComponent = Object.create(MetadomComponent);

JQueryComponent.attachedCallback = function() {
    $(this).each(this.plugin);
}

JQueryComponent.attributeChangedCallback = function(attrName, oldValue, newValue) {
    $(this).each(x => this.plugin({ attr: attrName, oldValue: oldValue, newValue: newValue }));
}

JQueryComponent.webComponent = function(name: string, plugin: (IAttributeChange) => void) {

    const componentName = MetadomComponent.toAttributeName(name);

    document.registerElement(componentName, { 
        prototype: Object.create(JQueryComponent, {
            name: { value: componentName },
            plugin: { value: plugin }
        })
    })

    console.debug(`Registered JQueryComponent ${componentName}`)
}

export default <IJQueryComponent>JQueryComponent;