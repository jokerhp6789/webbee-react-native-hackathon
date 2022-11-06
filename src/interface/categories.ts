export enum CategoryAttributeType {
  DATE = 'DATE',
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
}

export interface ICategoryAttribute {
  name: string;
  type: CategoryAttributeType;
  id?: string;
}

export interface IMachine {
  id: string;
  attributes: Array<{id: string; value: string}>;
}

export interface ICategory {
  id: string;
  name?: string;
  titleField?: string;
  created?: Date;
  attributes?: Array<ICategoryAttribute>;
  machines?: Array<{id: string; [key: string]: any}>;
}

export const CATEGORY_ATTRIBUTE_TYPES = [
  {
    id: CategoryAttributeType.DATE,
    label: 'Date',
  },
  {
    id: CategoryAttributeType.NUMBER,
    label: 'Number',
  },
  {
    id: CategoryAttributeType.TEXT,
    label: 'Text',
  },
  {
    id: CategoryAttributeType.BOOLEAN,
    label: 'Checkbox',
  },
];
