import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import TRFEditor from "./TRFEditor";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Editor",
    component: TRFEditor,
    excludeStories: /.*Args$/,
} as Meta<typeof TRFEditor>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<any> = ( args ) => <TRFEditor {...args} />;

export const HelloWorld = Template.bind( {} );
// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const HelloWorldArgs: any = {

};

HelloWorld.args = HelloWorldArgs;
