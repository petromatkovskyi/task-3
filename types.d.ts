type CustomResponse = {
  status: number;
  data?: any;
};

type PatchNote = {
  name?: string;
  category?: string;
  content?: string;
  archived?: boolean;
  dates?: string;
};

type Stats = {
  [key: string]: {
    archived: number;
    active: number;
  };
};

type Note = {
  name: string;
  category: string;
  content: string;
  created: string;
  id: string;
  archived: boolean;
  dates: string;
};
