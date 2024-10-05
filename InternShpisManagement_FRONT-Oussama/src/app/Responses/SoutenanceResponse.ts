export class SoutenanceResponse{
    id!: number;
	sfe!: string;
	encadreur!: string;
	president!: string;
	rapporteur!: string;
	salle!: string;
	date!: Date;
    files!: File[];

}

export class File{
	idFile!: string;
	fileDownloadUri!: string;
	rapport!: string;
}