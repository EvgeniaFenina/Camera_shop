export type Camera = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  category: string;
  description: string;
  level: string;
  rating: number;
  price: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  reviewCount: number;
};

export type FetchCameraPayloadType = {
  params: {
    sort: string | null;
    order : string | null;
    category: string | null | string[];
    level: string | null | string[];
    type: string | null | string[];
    maxPrice: number | null;
    minPrice: number | null;
    startPage: number;
    endPage: number;
  };
};

export type FetchCameraMinMaxPricePayloadType = {
  params: {
    category: string | null | string[];
    level: string | null | string[];
    type: string | null | string[];
  };
};
