import 'webcomponents-lite'

export interface IAttributeChange {
    attr: string;
    oldValue: string;
    newValue: string;
}

let MetadomComponent = Object.create(HTMLElement.prototype);

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

export default MetadomComponent;