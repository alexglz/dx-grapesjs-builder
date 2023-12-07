import { DXRiverOfNewsClassic } from "@base22/dx-micro-interaction-components";
import { ComponentAdd } from "grapesjs";

interface Props {
    category?: string;
    title: string;
    viewAllLink?: any;
}

export const RiverOfNewsClassicExport: ComponentAdd = {
    type: "DXRiverOfNewsClassic",
    component: DXRiverOfNewsClassic,
    props: {
      attributes: {
        title: "Title",
        viewAllLink: {
          label: "View all link",
          url: "www.base22.com"
        }
      },
      traits: [
        {
            type: "select",
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
          label: 'Title',
          name: 'title',
        },
        {
          type: 'ContentLinkProps',
          label: "View all link",
          name: "viewAllLink"
        },
        {
            type: "ContentItems",
            label: "Items",
            name: "riverOfNews",
            default: []
        }

      ]
    }
}
