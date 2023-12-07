import Server from "../../utilities/Server";
import { CustomTrait } from "grapesjs";
import React from "react";
import { createRoot } from "react-dom/client";

const ContentText: CustomTrait<{}> = {
    onUpdate({ elInput, component, trait }){
        let contentID = component.getTrait("contentId").attributes.value;
        if( contentID ){
            const myInput: HTMLInputElement = elInput.querySelector('.contentText') || new HTMLInputElement();
            myInput.removeAttribute("disabled");
            myInput.setAttribute("value", trait.get("value") )
        }
    },
    createInput( { component, trait } ) {
        let contentID = component.getTrait("contentId");
        const el = document.createElement('div');
        el.innerHTML = `
            <input
                class="contentText contentInput"
                disabled=${ contentID && contentID.attributes.value ? false : true}
                type="text"
                value= ${ trait.get("value") || "" }
            />
        `
        return el;
    },

    onEvent({ elInput, component, trait}) {
        let traitName = trait.get("name") || "undefined";

        const myInput: HTMLInputElement = elInput.querySelector('.contentText') || new HTMLInputElement;
        let value =  "";
        if( myInput.value && traitName ){
            value = myInput.value;
            Server.updateContent( component.getTrait("contentId").getValue(),
                {
                    [traitName]: trait.getValue(),
                    ...component.getAttributes()["data"]
                }
            ).then( ()=>{
                    component.addAttributes({ [traitName]: value });
                    trait.setValue( value )
                }
            )
        }

    },
}

export default ContentText;
