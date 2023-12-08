import React, { useEffect, useState } from "react";
import Basics from "grapesjs-blocks-basic";
import grapesjs, { Editor, ProjectData } from "grapesjs";
import GjsEditor from '@grapesjs/react';
import ClayLayout from "@clayui/layout";
import { ClayInput } from "@clayui/form";
import ClayPanel from "@clayui/panel";
import TerraformModule from "../../grapesjs/GrapesJsPlugins/TerraformModule";
import BaseReactComponent from "../../grapesjs/GrapesJsPlugins/base-react-component";
import CustomTraits from "../../grapesjs/CustomTraits";
import Server from "../../utilities/Server";

//Styles imports
// import "./PageEditor.scss";
import 'grapesjs/dist/css/grapes.min.css';
import "@base22/dx-micro-interaction-components/dist/cjs/index.css";

export const TRFEditor = ( props: any ) => {
  const [editor, setEditor] = useState<Editor | undefined>( undefined );
  const [pageName, setPageName] = useState( "" );
  const [pageSlug, setPageSlug] = useState( "" );
  const [pageStructure, setPageStructure ] = useState<any[]>( [] );

  const searchParams = props.pageId;
  let slug: string | null = searchParams || null;

  useEffect( ()=> {
    if( slug != null ){
      Server.getPage( slug ).then( ( data: any )=>{
        setPageStructure( data.pageStructure );
        setPageName(data.pageName);
        setPageSlug( slug! );
      });
    }
  }, [])

  //This function creates a JSON structure for all the components in the page
  const getTree = ( tree: any[] ) => {
    let json: any[] = [];
    tree.forEach( ( component ) => {
      var type: string = component.type || component.name;

      let contentProps = Object.keys(component.attributes.data)

      let staticProps: any = {}
      for( const [key, value] of Object.entries( component.attributes ) ){
        if( !contentProps.includes( key ) && key!="data" ){
          staticProps[key] = value;
        }
      }

      json.push( {
        type,
        attributes: staticProps,
        children: component.components ? getTree( component.components ) : null
      } );
    } );

    return json;
  };

  const generateContentfulUpload = async ( data: string ) => {
    const components: Object[] = JSON.parse( data );
    let componentsTree = getTree( components );

    Server.savePage(pageName, pageSlug, componentsTree);

  };

  return (
    <div>
      <div className="Header" style={{ padding: "1rem 2rem 1rem 2rem" }}>
        <h2> Page Editor </h2>
        <ClayPanel
          collapsable
          displayTitle="Page settings"
          displayType="secondary"
        >
          <ClayPanel.Body>
            <ClayLayout.Row>
              <ClayLayout.Col size={12}>
                <label htmlFor={"label-pageName"}>Page Name</label>
                <ClayInput
                  id={"label-pageName"}
                  type={"text"}
                  value={pageName}
                  onChange={( e ) => {
                    setPageName( e.target.value );
                  }}
                >
                </ClayInput>
              </ClayLayout.Col>
              <ClayLayout.Col size={12}>
                <label htmlFor={"label-pageSlug"}>Page Url</label>
                <ClayInput
                  id={"label-pageSlug"}
                  type={"text"}
                  value={pageSlug}
                  onChange={( e ) => {
                    setPageSlug( e.target.value );
                  }}
                >
                </ClayInput>
              </ClayLayout.Col>
            </ClayLayout.Row>
          </ClayPanel.Body>
        </ClayPanel>
        <div id="actions"> {"Actions: "}
          <button
            onClick={() => {
              generateContentfulUpload( JSON.stringify( editor?.getComponents() ) );
            }}
          >
            Save
          </button>
        </div>
      </div>

      {
        ( (slug && pageStructure.length ) || !slug ) &&
        <GjsEditor
            grapesjs={grapesjs}
            options={{
                height: "100vh",
                storageManager: false,
                canvas: {
                    styles: [
                        "TRFStyles.css",
                        "design_system_styles.css",
                        "main.css",
                        "coolicons.css"
                    ]
                },

            }}
            plugins={[
                Basics,
                BaseReactComponent,
                TerraformModule
            ]}
            onEditor={( editor: Editor ) => {
                //Storing GrapesJs instance
                setEditor( editor );

                //
                editor.TraitManager.addType("serverInstance",{
                    noLabel: true,
                    onUpdate({ trait }){
                        console.log("UPDATED")
                        trait.setValue( "TEST!" );
                    },
                    createInput({ trait }){
                        console.log( trait.getValue() );
                        trait.setValue( "TEST!" );
                        console.log( trait.getValue() );
                        return document.createElement("div");
                    }
                })

                //Create custrom traits
                for (const [TraitName, TraitConfig] of Object.entries( CustomTraits ) ) {
                    editor.TraitManager.addType( TraitName, TraitConfig);
                }
                if( pageStructure ){
                    pageStructure.forEach( ( item: any )=>{
                    editor.addComponents(
                        {
                            type: item.type,
                            attributes: item.attributes
                        }
                    )
                    })
                }
            }}
        ></GjsEditor>
        }
    </div>
  );
};

export default TRFEditor;
