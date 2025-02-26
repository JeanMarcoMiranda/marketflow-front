export interface CreateBranchDTO {
  name: string;
  location: string;
}

export interface UpdateBranchDTO {
  name?: string;
  location?: string;
}
