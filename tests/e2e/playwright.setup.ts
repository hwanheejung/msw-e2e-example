import { test as testBase } from "@playwright/test";
import { createNetworkFixture, type NetworkFixture } from "@msw/playwright";
import { handlers } from "../mocks/__handlers__";

type TFixtures = {
  network: NetworkFixture;
};

export const test = testBase.extend<TFixtures>({
  network: createNetworkFixture({
    initialHandlers: handlers,
  }),
});
