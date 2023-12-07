import { Editor } from 'grapesjs';
import React from 'react';
import { createRoot } from 'react-dom/client';

const BaseReactComponent = (editor: Editor) => {
  const domc = editor.Components;
  const defType = domc.getType('default');
  const defModel = defType.model;
  const wrpChld = 'data-chld';

  // Main React component
  domc.addType("react-component", {
    model: {
      toHTML( opts = {} ){
        return defModel.prototype.toHTML.call(this, {
          ...opts,
          tag: this.get('type')
        });
      },
    },
    view: {
      tagName: () => "div",
      init(){
        const { model } = this;
        this.listenTo(model, 'change:attributes', this.render);
        this.listenTo(model.components(), 'add remove reset', this.__upRender);
      },
      getChildrenContainer() {
        const { childrenContainer } = this;
        if (childrenContainer) return childrenContainer;

        this.childrenContainer = document.createElement('childc');

        return this.childrenContainer;
      },
      createReactChildWrap() {
        let child =  React.createElement('span', { [wrpChld]:true });
        return child;
      },
      createReactEl(cmp: any, props: any) {
        return React.createElement(cmp, props, this.createReactChildWrap());
      },
      mountReact(cmp: any, el: any) {
        //ReactDOM.render(cmp, el);
        createRoot(el).render(cmp)
      },
      render() {
        const { model, el } = this;
        this.updateAttributes();
        this.renderChildren();
        let component = model.get('component');
        const reactEl = this.createReactEl( component, {
          ...model.get('attributes')
        });
        this.mountReact(reactEl, el);
        const chld = el.querySelector(`span[${wrpChld}]`);

        // If the container is found, the react component is able to render children
        if (chld) {
          const chldCont = this.getChildrenContainer();
          while (chldCont.firstChild) {
            chld.appendChild(chldCont.firstChild);
          }
        }

        return this;
      },

      __upRender() {
        clearTimeout(this._upr);
        this._upr = setTimeout(() => this.render());
      }
    }
  })
};


export default BaseReactComponent;
