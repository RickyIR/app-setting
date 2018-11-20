export interface User {
  _id: string;
  name: {
    first: string;
    middle: string;
    last: string;
  };
  type: string;
  permalink: string;
  date: {
    created: Date;
    last_visit: string;
  };
  image: {
    url: string;
    alt: string;
  };
}
