import { setupWorker } from "msw/browser";
import { handlers } from "./__handlers__";
export const worker = setupWorker(...handlers);
