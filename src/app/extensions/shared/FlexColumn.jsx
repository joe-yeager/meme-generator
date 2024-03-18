import { Flex } from '@hubspot/ui-extensions';
export const FlexColumn = ({ children }) => {
  return (
    <Flex direction="column" justify="start" gap="medium">
      {children}
    </Flex>
  );
};
