import { AutofillOverlayPort } from "../../utils/autofill-overlay.enum";

import AutofillOverlayIframeElement from "./autofill-overlay-iframe-element";
import AutofillOverlayIframeService from "./autofill-overlay-iframe.service";

jest.mock("./autofill-overlay-iframe.service");

describe("AutofillOverlayIframeElement", () => {
  window.customElements.define(
    "autofill-overlay-iframe",
    class extends HTMLElement {
      constructor() {
        super();
        new AutofillOverlayIframeElement(
          this,
          AutofillOverlayPort.Button,
          { background: "transparent", border: "none" },
          "bitwardenOverlayButton",
        );
      }
    },
  );

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("creates a custom element that is an instance of the HTMLElement parent class", () => {
    document.body.innerHTML = "<autofill-overlay-iframe></autofill-overlay-iframe>";

    const iframe = document.querySelector("autofill-overlay-iframe");

    expect(iframe).toBeInstanceOf(HTMLElement);
  });

  it("attaches a closed shadow DOM", () => {
    document.body.innerHTML = "<autofill-overlay-iframe></autofill-overlay-iframe>";

    const iframe = document.querySelector("autofill-overlay-iframe");

    expect(iframe.shadowRoot).toBeNull();
  });

  it("instantiates the autofill overlay iframe service for each attached custom element", () => {
    expect(AutofillOverlayIframeService).toHaveBeenCalledTimes(2);
  });
});
