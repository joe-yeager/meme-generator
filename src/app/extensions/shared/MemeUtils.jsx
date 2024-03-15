import { Input } from '@hubspot/ui-extensions';

export function generateTextInputs(theChosenOne, boxes, setBoxes) {
  const { box_count, id } = theChosenOne;
  const inputs = [];
  for (let boxNumber = 0; boxNumber < box_count; ++boxNumber) {
    inputs.push(
      <Input
        label={`Box Number ${boxNumber + 1}`}
        name={`box-number-${boxNumber}`}
        key={`${id}-${boxNumber}`}
        placeholder="Fill out at least one"
        onInput={(value) => {
          setBoxes({
            ...boxes,
            [boxNumber]: value,
          });
        }}
      />
    );
  }
  return inputs;
}

export function formatMemesForSelectInput(memes) {
  return memes.map((meme) => {
    const { name, id } = meme;
    return {
      label: name,
      value: id,
      avatarUrl: meme.url,
    };
  });
}
