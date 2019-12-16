import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
    namespace: "nds",
    outputTargets: [
        {
            type: "dist",
            dir: "../../design-system/public/assets/scripts"
        },
        {
            type: "docs"
        },
        {
            type: "www",
            serviceWorker: null // disable service workers
        }
    ],
    plugins: [sass()]
};
