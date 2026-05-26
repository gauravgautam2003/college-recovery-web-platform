export interface College {
    id: string;
    name: string;
    location: string;
    description: string;
    rank?: number;
    shortName?: string;
    type?: string;
    rating?: number;
    fees?: string;
    feesValue?: number;
    averagePackage?: string;
    averagePackageValue?: number;
    courses?: string[];
    image?: string;
    acceptanceRate?: string;
    placementRate?: string;
    topRecruiters?: string[];
    facilities?: string[];
    admissionDeadline?: string;
    contactEmail?: string;
    phone?: string;
    website?: string;
    establishedAt?: number;
    ownerId?: string;
    createdAt?: string;
    updatedAt?: string;
}
