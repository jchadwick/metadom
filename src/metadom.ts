import 'webcomponents-lite'

export interface IAttributeChange {
    attr: string;
    oldValue: string;
    newValue: string;
}

export interface IMetadomComponent extends HTMLElement {
    setData(data): void;
}

export let MetadomComponent = Object.create(HTMLElement.prototype);

MetadomComponent.DATA_PROPERTY = 'data';

MetadomComponent.createdCallback = function() {

    this.dispatch = function(eventName: string, args?: {}) {
        var name = MetadomComponent.toAttributeName(eventName);
        this.dispatchEvent(new CustomEvent(name, { detail: args }));
    }
    
}

MetadomComponent.toAttributeName = function(attrName: string): string {
    return attrName.replace(/([A-Z])/g, (match) => '-' + match.toLowerCase()).toLowerCase();
}

MetadomComponent.toPropertyName = function(attrName: string): string {
    return attrName.replace(/-(.)/g, (match) => match.toUpperCase()[1]);
}

MetadomComponent.setData = function(data) {
    let oldValue = this.data,
        newValue = data;

    this.data = newValue;

    this.attributeChangedCallback(MetadomComponent.DATA_PROPERTY, oldValue, newValue);
}


export default MetadomComponent;