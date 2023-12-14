import { CustomTrait, Trait } from "grapesjs";
import Server, { ServerInterface } from "../../utilities/ServerInterface";

const IDSelect: CustomTrait<{}> = {
    onUpdate( { trait, elInput } ){
      let options = trait.getOptions();
      if( options && options.length){
        const idSelect = elInput.querySelector( ".idSelect" ) as HTMLSelectElement;
        if( idSelect.children.length > 1){
          if( trait.getValue() ){
            idSelect.value = trait.getValue();
          }
          return;
        }
        options.forEach( option => {
          let optionEl = document.createElement("option");
          optionEl.setAttribute("value", option.id )
          optionEl.innerText = option.label || option.id;
          idSelect.appendChild( optionEl );

        })
      }
    },
    createInput({ trait }) {
      const el = document.createElement( 'div' );
      const options = trait.get("options");
      el.innerHTML =
        `
            <select class="idSelect">
              <option value="" disabled selected hidden>Select a category</option>
              ${ options ? options.map( (opt: any) => `<option value="${opt.id}" >${opt.label}</option>` ).join( '' ) : []}
            </select>
        `;
      return el;
    },
    onEvent( { elInput, component, trait } ) {
        //@ts-ignore: component.server does exist
        const Server = component.server as ServerInterface;
        let traitName = trait.get("name") || "undefined";
        const idSelect = elInput.querySelector( ".idSelect" ) as HTMLSelectElement;
        if(idSelect.value){

            Server.getContent(idSelect.value).then( (data: any) =>{
            console.log("DATA", data)
            component.addAttributes( {
                data,
                [traitName]: idSelect.value
            } )

            trait.setValue( idSelect.value )

            let allTraits: Trait[] = component.getTraits() || [];
            allTraits.forEach( (trait: Trait) => {
                if( trait.attributes.name && trait.attributes.type?.indexOf("Content") != -1 ){
                component.updateTrait( trait.attributes.name, {
                    value: data[ trait.attributes.name ] || "",
                    type: trait.attributes.type
                })
                }
            })

        })

      }

    }
}

export default IDSelect;
