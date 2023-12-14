export interface ServerInterface {
    getIds: ( componentType: string) => Promise<{ id: string, label: string }[]>;
    getContent: ( id: string ) => Promise<any>;
    updateContent: ( id: string, data: any ) => Promise<boolean>;
    savePage: ( pageName: string, pageSlug: string, pageStructure: any) => Promise<boolean>;
    getPage: ( id: string ) => Promise<any>;
}

export default ServerInterface;
