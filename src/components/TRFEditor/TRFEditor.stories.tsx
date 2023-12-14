import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import TRFEditor, { TRFEditorProps } from "./TRFEditor";
import Server from "./utilities/Server";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Editor",
    component: TRFEditor,
    excludeStories: /.*Args$/,
} as Meta<typeof TRFEditor>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<TRFEditorProps> = ( args ) => <TRFEditor {...args} />;

export const HelloWorld = Template.bind( {} );
// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const HelloWorldArgs: TRFEditorProps = {
    server: new Server(),
    pageId: "my-page"
};

HelloWorld.args = HelloWorldArgs;
