import {
  Panel,
  PanelBody,
  PanelSection,
  Image,
  PanelFooter,
  Button,
  Flex,
} from '@hubspot/ui-extensions';

export const MemePanel = ({ imageUrl, reactions }) => {
  return (
    <Panel title="Meme Panel" id="meme-panel" width="medium">
      <PanelBody>
        <PanelSection>
          <Image src={imageUrl} href={imageUrl} />
        </PanelSection>
      </PanelBody>
      <PanelFooter>
        <Flex direction={'row'} justify={'end'}>
          <Button
            variant="destructive"
            onClick={() => reactions.closePanel('meme-panel')}
          >
            Close Panel
          </Button>
        </Flex>
      </PanelFooter>
    </Panel>
  );
};
