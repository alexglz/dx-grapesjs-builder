import React, { ReactElement } from 'react';
import { Editor } from 'grapesjs';
import TRFExports from "../CustomComponents/TerraformComponents/index";
import Server from '../../utilities/Server';
import "@base22/dx-micro-interaction-components/dist/cjs/index.css";


export  const TerraformModule = ( editor: Editor ) => {
    const { Blocks, Components } = editor;

    //@ts-ignore
    const addCmp = ({ type, component, props }: ComponentAdd) => {
        Components.addType(type,
        {
            extend: 'react-component',
            model: {
                init(){
                    console.log( "GG" );
                    this.addTrait(["serverInstance", {
                        name: "serverInstance",
                        type: "serverInstance"
                    } ])
                    this.updateTrait("serverInstance", { type: "serverInstance", value:"test" })
                    console.log ( this.getTrait("serverInstance").getValue() )
                    this.loadContentIds();
                        if( this.getAttributes()["contentId"] && !this.getAttributes()["data"] ){
                            this.loadContentData();
                        }
                },
                loadContentData(){
                    Server.getContent( this.getAttributes()["contentId"] ).then( ( data: any ) => {
                        this.setAttributes( {...this.getAttributes() , ...data } )
                    })
                },
                loadContentIds(){
                    const traits = this.get("traits");
                    const componentType = this.get("type");
                    if(componentType && traits?.get("contentId")){
                        Server.getIds(componentType).then( data => {
                        this.updateTrait("contentId", {
                            type: "IDSelect",
                            options: data
                        } )
                        } )
                    }

                },
                defaults: {
                    ...props,
                    component
                },
            },
            view: {
                onAttrUpdate(){
                },
                createReactEl(cmp: any, props: any) {
                const cmpMain: ReactElement = React.createElement(
                    cmp,
                    props,
                    //@ts-ignore
                    this.createReactChildWrap()
                );
                return cmpMain;
                }
            },
            isComponent: (el: any) => el.tagName === type.toUpperCase()
        }
    );

    Blocks.add(type, {
      label: type,
      category: 'Terraform',
      content: { type }
    });
  };

  TRFExports.forEach( ( compontentExport ) => {
    addCmp( compontentExport );
  })

}

export default TerraformModule;
