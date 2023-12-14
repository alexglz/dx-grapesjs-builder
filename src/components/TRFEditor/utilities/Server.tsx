import { ServerInterface } from "../../../utilities";

class Server implements ServerInterface {
    async getIds( componentType: string): Promise<{id: string, label: string}[]>{
        //Simulating server response time
        await new Promise(resolve => setTimeout( resolve, 500 ));
        return new Promise( (resolve, reject) => {
            switch( componentType ){
                case "DXHeroBanner":
                    resolve( [ {id: "HB1", label:"HB1"} , {id: "HB2", label:"HB2"} ] );
                case "DXRiverOfNewsClassic":
                    resolve( [ {id: "RN1", label:"RN1"}, {id: "RN2", label:"RN2"} ] );
                default:
                    resolve( [] );
            }
        })
    }

    async getContent( id: string ){
        //Simulating server response time
        await new Promise(resolve => setTimeout( resolve, 500 ));
        return new Promise( (resolve, reject) => {
            switch( id ){
                case "HB1":
                    resolve( {
                        index: 1,
                        header: "HB1: Local News",
                        subheader: "Get updated on all events and news in your local zone",
                        background: {
                            url: "https://images.unsplash.com/photo-1554034483-04fda0d3507b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
                            opacity: "dark"
                        }
                    } );
                case "HB2":
                    resolve( {
                        index: 1,
                        header: "HB2: Finance",
                        subheader: "All stock prices and related news",
                        background: {
                            url: "https://images.unsplash.com/photo-1560221328-12fe60f83ab8?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            opacity: "dark"
                        }
                    } );
                case "RN1":
                    resolve( {
                        title: "Recent News",
                        viewAllLink: {
                            label: "View more",
                            url: "www.base22.com",
                            target: "_self",
                        },
                        riverOfNews: [
                            {
                              "image": {
                                "url": "https://images.unsplash.com/photo-1657819466043-2a4ae992f03f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80"
                              },
                              "link": {
                                "label": "News title, no more than two lines, then ellipsis",
                                "url": "www.base22.com"
                              },
                              "date": "01/01/2023",
                              "contentType": "PRESS RELEASE"
                            },
                            {
                              "image": {
                                "url": "https://images.unsplash.com/photo-1673101609020-4b5e203885bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
                              },
                              "link": {
                                "label": "News title",
                                "url": "www.base22.com"
                              },
                              "date": "06/30/1997"
                            },
                            {
                              "link": {
                                "label": "News title, no more than two lines, then ellipsis",
                                "url": "www.base22.com"
                              },
                              "date": "01/01/2023"
                            }
                          ]
                    } );
                default:
                    resolve( {} );
            }
        })
    }

    async savePage( pageName: string, pageSlug: string, pageStructure: any){
        return new Promise<boolean>((resolve, reject) => {
            localStorage.setItem(pageSlug, JSON.stringify({ pageName, pageStructure }))
            resolve( true );
        })
    }

    async getPage( id: string ){
        return new Promise((resolve, reject) => {
            let pageStructure = JSON.parse( localStorage.getItem(id) || "" );
            resolve( pageStructure );
        })
    }

    async updateContent( id: string, data: any ){
        return new Promise<boolean>((resolve, reject) => {
           resolve(true)
        })
    }
}

export default Server;
