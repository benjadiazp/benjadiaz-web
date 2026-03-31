import type { ProjectMeta } from "@/lib/content-types";
import { meta as drizip } from "./drizip/meta";
import { meta as roldic } from "./roldic/meta";
import { meta as oso } from "./oso/meta";
import { meta as perroWaton } from "./perro-waton/meta";

export const projects: ProjectMeta[] = [drizip, roldic, oso, perroWaton];
