export interface FigmaNode {
  id: string;
  name: string;
  type: string; // DOCUMENT | CANVAS | FRAME | SECTION | COMPONENT | COMPONENT_SET | INSTANCE | TEXT | ...
  children?: FigmaNode[];
  componentId?: string;        // on INSTANCE → main component node id
  absoluteBoundingBox?: { width: number; height: number } | null;
  styles?: Record<string, string>; // styleType (fill/text/effect/grid) → style key
  transitionNodeID?: string | null; // prototype target node id
}

export interface FigmaDocument {
  name: string;
  document: FigmaNode; // root (DOCUMENT) whose children are CANVAS (pages)
  components?: Record<string, { key: string; name: string; componentSetId?: string }>;
  componentSets?: Record<string, { key: string; name: string }>;
}

export interface FigmaStyles {
  meta?: { styles?: Array<{ key: string; name: string; style_type: string }> };
}

export interface FigmaSource {
  fetchDocument(): Promise<FigmaDocument>;
  fetchStyles(): Promise<FigmaStyles>;
  renderImages(nodeIds: string[]): Promise<Record<string, string>>;
}
