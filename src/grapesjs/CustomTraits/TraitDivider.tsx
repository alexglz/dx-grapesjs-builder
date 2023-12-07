import { CustomTrait } from "grapesjs";
import React from "react";
import { createRoot } from 'react-dom/client';

const TraitDivider: CustomTrait<{}> = {
    noLabel: true,
    templateInput: ()=>"",
    createInput( { trait } ) {
        const el = document.createElement('div');
        const traitLabel = trait.get( 'label' );
            
        let content = React.createElement( "div", { className: "traitDivider"} ,
            <>
                {
                    traitLabel &&
                    <div className="traitDivider__label">
                        { traitLabel }
                    </div>
                }
                <hr className="traitDivider__divider"></hr>
            </>
        )
        createRoot(el).render(content)
        return el;
    },
    
}

export default TraitDivider;