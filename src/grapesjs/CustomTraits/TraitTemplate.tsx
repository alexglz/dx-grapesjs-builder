//For more details and examples on how to build a new trait for GrapesJs
//please visit this site: https://grapesjs.com/docs/modules/Traits.html#define-new-trait-type 

import { CustomTrait } from "grapesjs";

const Template: CustomTrait<{}> = {
    // Expects as return a simple HTML string or an HTML element
    //Use this function to render all the desired HTML structures for your trait
    createInput( { } ) {
        //Use this element to store your Trait HTML Strucuture
        const el = document.createElement('div');
        
        //You can build your structure using a basic text html structure like this:
        el.innerHTML = 
        `
            <input class="myInput"></input>
        `

        // Or use create complex structures using JSX and Custom/Imported React Components, for example:
        //
        // let content = React.createElement( "div", {} ,
        //     <>
        //          <input className="myInput"></input>
        //     </>
        // )
        // createRoot(el).render(content)
        //
        // You can check an example of this implementation in the TraitDivider.tsx file.
        return el;
    },
    
    // Update the component based on element changes
    // `elInput` is the result HTMLElement you get from `createInput`
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