type CollapsedEntityType = "users" | "posts";

type CollapseActionType = (type: CollapsedEntityType, id: number) => void;

export { CollapseActionType };
