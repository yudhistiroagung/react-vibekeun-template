import React from 'react';

export type ComponentAndProps = [
  React.JSXElementConstructor<React.PropsWithChildren<any>>,
  any?,
];

export interface ComposeProviderProps {
  components: ComponentAndProps[];
  children?: React.ReactNode;
}

export const ComposeProvider: React.FC<ComposeProviderProps> = ({
  children = React.Fragment,
  components = [],
}) => {
  return components.reverse().reduce(
    (acc, componentWithProps) => {
      const [Component, props = {}] = componentWithProps;

      return (
        <Component key={Component.name} {...props}>
          {acc}
        </Component>
      );
    },
    children as React.ReactElement<any>,
  );
};
