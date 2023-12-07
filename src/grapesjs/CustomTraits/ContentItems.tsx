import { CustomTrait } from "grapesjs";

const ContentItems: CustomTrait<{}> = {
    onUpdate({ component, trait}){
        let traitName = trait.get("name") || "undefined";
        component.addAttributes({ [traitName]: trait.getValue() });
    },
    createInput( { } ) {
        //Use this element to store your Trait HTML Strucuture
        const el = document.createElement('div');
        
        //You can build your structure using a basic text html structure like this:
        el.innerHTML = 
        `
            <button>Edit</button>
        `
        return el;
    },
    
   
    onEvent({ elInput, component }) {
        const myInput: HTMLInputElement = elInput.querySelector('.myInput') || new HTMLInputElement;
        let value =  "";
        if( myInput.value ){
            value = myInput.value;
        }
        //Store the input value within the component attributes
        component.addAttributes({ myAttr: value });
    },
}

export default ContentItems;