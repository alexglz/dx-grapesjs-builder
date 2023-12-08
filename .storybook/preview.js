import "@clayui/css/lib/css/atlas.css";
import "@base22/dx-micro-interaction-components/dist/cjs/index.css"

import {Title, Subtitle, Description, Controls, Stories} from '@storybook/blocks';

export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    docs: {
        page: () => (
            <>
                <Title />
                <Subtitle />
                <Description />
                <Controls />
                <Stories />
            </>
        ),
    }
}