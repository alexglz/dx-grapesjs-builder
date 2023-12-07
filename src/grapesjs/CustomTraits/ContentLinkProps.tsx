import { CustomTrait } from "grapesjs";

const ContentLinkProps: CustomTrait<{}> = {
    onUpdate({ elInput, component, trait}){
      const labelInput = elInput.querySelector( ".href-next__label" ) as HTMLInputElement;
      const urlInput = elInput.querySelector( ".href-next__url" ) as HTMLInputElement;
      const targetSelect = elInput.querySelector( ".href-next__type" ) as HTMLSelectElement;

      if( component.getTrait("contentId").attributes.value ){
        urlInput.removeAttribute("disabled");
        labelInput.removeAttribute("disabled");
        targetSelect.removeAttribute("disabled");

        urlInput.value = trait.get("value").url;
        labelInput.value = trait.get("value").label;
        targetSelect.value = trait.get("value").target;
      }
    },
    // Expects as return a simple HTML string or an HTML element
    createInput( { trait, component } ) {
      let attributeName = trait.get( 'name' ) || "";

      const options = [
        { id: '_blank', name: 'Blank' },
        { id: '_self', name: 'Self' },
        { id: '_parent', name: 'Parent' },
        { id: '_top', name: 'Top' },
      ];
      let contentID = component.getTrait("contentId").attributes.value;
      const el = document.createElement( 'div' );
      el.innerHTML = `
            <div class="href-next__url-inputs">
              <input 
                ${ contentID?"": "disabled"}
                class="href-next__label contentInput" 
                placeholder="Label" 
                value="${component.getAttributes()[attributeName].label || undefined}"
              />
            </div>
            <div class="href-next__url-inputs">
              <input 
                ${ contentID?"": "disabled"}
                class="href-next__url contentInput" 
                placeholder="Label" 
                value="${component.getAttributes()[attributeName].url || undefined}"
              />
            </div>
            <select class="href-next__type contentInput" ${ contentID?"": "disabled"}>
              ${options.map( opt => `<option value="${opt.id}">${opt.name}</option>` ).join( '' )}
            </select>
          `;

      return el;
    },
    onEvent( { elInput, component, trait } ) {
      const labelInput = elInput.querySelector( ".href-next__label" ) as HTMLInputElement;
      const urlInput = elInput.querySelector( ".href-next__url" ) as HTMLInputElement;
      const targetSelect = elInput.querySelector( ".href-next__type" ) as HTMLSelectElement;

      let attributeName = trait.get( 'name' ) || "";

      component.addAttributes( {
        [attributeName]: {
          label: labelInput.value,
          url: urlInput.value,
          target: targetSelect.value,
        },
      } );
    },
  } 

export default ContentLinkProps;