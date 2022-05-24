import path from "path";

import initStoryshots from "@storybook/addon-storyshots";

// The required import from the @storybook/addon-storyshots-puppeteer addon
import { imageSnapshot } from "@storybook/addon-storyshots-puppeteer";

// Function to customize the snapshot location
const getMatchOptions = ({ context: { id, fileName } }) => {
  // Generates a custom path based on the file name and the custom directory.
  const snapshotPath = path.join(path.dirname(fileName), "__image_snapshots__");

  return {
    customSnapshotsDir: snapshotPath,
    customSnapshotIdentifier: id,
  };
};

initStoryshots({
  // your own configuration
  test: imageSnapshot({
    // invoke the function above here
    getMatchOptions,
  }),
});
