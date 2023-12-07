import { CustomTrait } from "grapesjs";

const ContentBackground: CustomTrait<{}> = {
    onUpdate({elInput, trait, component}){
      const urlInput = elInput.querySelector( ".href-next__url" ) as HTMLInputElement;
      const opacitySelect = elInput.querySelector( ".href-next__type" ) as HTMLSelectElement;

      if( component.getTrait("contentId").attributes.value ){
        urlInput.removeAttribute("disabled");
        opacitySelect.removeAttribute("disabled")
        urlInput.value = trait.get("value").url;
        opacitySelect.value = trait.get("value").opacity;
      }
    },
    // Expects as return a simple HTML string or an HTML element
    createLabel() {
      return `<span> Background Image </span>`;
    },
    createInput( { trait, component } ) {
      // Here we can decide to use properties from the trait
      const traitOpts = trait.get( 'options' ) || [];
      const options = traitOpts.length ? traitOpts : [
        { id: 'light', name: 'Light' },
        { id: 'dark', name: 'Dark' },
      ];
      // Create a new element container and add some content
      const el = document.createElement( 'div' );
      let contentID = component.getTrait("contentId").attributes.value;
      el.innerHTML = `
            <div class="href-next__url-inputs">
              <input class="href-next__url contentInput" placeholder="Image URL" ${ contentID?"": "disabled"}/>
            </div>
            <select class="href-next__type contentInput" ${ contentID?"": "disabled"}>
              ${options.map( opt => `<option value="${opt.id}">${opt.name}</option>` ).join( '' )}
            </select>
          `;

      // Let's make our content interactive
      const inputsUrl = el.querySelector( '.href-next__url-inputs' ) as HTMLElement;
      const inputsEmail = el.querySelector( '.href-next__email-inputs' ) as HTMLElement;
      const inputType = el.querySelector( '.href-next__type' );
      inputType!.addEventListener( 'change', ( ev: any ) => {
        switch ( ev.target.value ) {
          case 'url':
            inputsUrl.style.display = '';
            inputsEmail.style.display = 'none';
            break;
          case 'email':
            inputsUrl.style.display = 'none';
            inputsEmail.style.display = '';
            break;
        }
      } );

      return el;
    },
    onEvent( { elInput, component } ) {
      const urlInput = elInput.querySelector( ".href-next__url" ) as HTMLInputElement;
      const opacitySelect = elInput.querySelector( ".href-next__type" ) as HTMLSelectElement;

      component.addAttributes( {
        background: {
          opacity: opacitySelect.value,
          url: urlInput.value
        },
      } );
    },
  }

export default ContentBackground;