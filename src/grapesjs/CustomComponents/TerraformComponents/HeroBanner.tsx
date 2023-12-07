import { DXHeroBanner } from "@base22/dx-micro-interaction-components";
import { ComponentAdd } from "grapesjs";

export const HeroBannerExport: ComponentAdd =
    {
        type: 'DXHeroBanner',
        component: DXHeroBanner,
        props: {
            attributes: {
                index: 1,
                header: "Hero Banner",
                textAlign: "",
                textColor: "",
            },
            traits: [
                {
                    type: "IDSelect",
                    label: "Content ID",
                    name: "contentId",
                },
                {
                    type: "TraitDivider",
                    name: "Divider 1",
                    label: "Content settings",
                },
                {
                    type: 'ContentText',
                    label: 'Index',
                    name: 'index',
                },
                {
                    type: 'ContentText',
                    label: 'Header',
                    name: 'header',
                },
                {
                    type: 'ContentText',
                    label: 'Sub Header',
                    name: 'subheader'
                },
                {
                    type: 'ContentBackground',
                    name: "background",
                    options: [
                        { id: 'light', name: 'Light' },
                        { id: 'dark', name: 'Dark' },
                    ]
                },
                {
                    type: "TraitDivider",
                    name: "Divider 2",
                    label: "Page settings"
                },
                {
                    type: "select",
                    name: "textAlign",
                    label: "Text Align",
                    options: [
                        { id: 'left', name: 'Left' },
                        { id: 'center', name: 'Center' },
                        { id: 'right', name: 'Right' },
                    ]
                },{
                    type: "color",
                    name: "textColor",
                    label: "Text Color",
                }
            ]
        }
    }