export const CLICKS = "clicks" as const;
export const FIRST_CLICKED_AT = "first_clicked_at" as const;

export const SORT_FIELDS = [CLICKS, FIRST_CLICKED_AT] as const;

export type SortField = (typeof SORT_FIELDS)[number];

export const ASC = "asc" as const;
export const DESC = "desc" as const;

export const SORT_ORDERS = [ASC, DESC] as const;

export type SortOrder = (typeof SORT_ORDERS)[number];
